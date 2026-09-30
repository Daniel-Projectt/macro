/* Clicks through the real page in a simulated browser (jsdom).
   Usage: node test-dom.js <path-to-node_modules-containing-jsdom>             */
const path = require('path');
const fs = require('fs');
const NM = process.argv[2];
const { JSDOM, VirtualConsole } = require(path.join(NM, 'jsdom'));
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

let fails = 0, checks = 0; const errors = [];
function ok(c, label, d) { checks++; if (!c) { fails++; console.log('  FAIL  ' + label + (d !== undefined ? '  -> ' + d : '')); } }
function head(t) { console.log('\n== ' + t + ' =='); }

const vc = new VirtualConsole();
vc.on('jsdomError', e => errors.push(e.message + (e.detail ? ' | ' + e.detail : '')));
vc.on('error', e => errors.push(String(e)));
const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://example.test/', virtualConsole: vc,
  beforeParse(w) {
    w.scrollTo = () => {}; w.print = () => { w.__printed = (w.__printed || 0) + 1; };
    w.Element.prototype.scrollIntoView = function () { w.__scrolledTo = this.id; };
    w.addEventListener('error', e => errors.push('window.onerror: ' + e.message));
  } });
const w = dom.window, d = w.document;
const $ = s => d.querySelector(s), $$ = s => Array.from(d.querySelectorAll(s));
const visible = el => { for (let n = el; n && n !== d; n = n.parentNode) if (n.hidden) return false; return true; };
const click = el => el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
const key = k => d.dispatchEvent(new w.KeyboardEvent('keydown', { key: k, bubbles: true }));
const topic = t => click($('.topic-btn[data-topic="' + t + '"]'));
const mode = (t, m) => click($('.seg[data-modes="' + t + '"] button[data-mode="' + m + '"]'));
const panel = p => $('[data-panel="' + p + '"]');
const tps = ['gdp', 'growth', 'labor', 'prices', 'saving', 'formulas'];

function answerQuiz(root, label) {
  let guard = 0;
  while (guard++ < 80) {
    const opts = Array.from(root.querySelectorAll('.qbody .opt'));
    if (!opts.length) break;
    click(opts[Math.floor(Math.random() * opts.length)]);
    ok(root.querySelectorAll('.qbody .opt.correct').length === 1, label + ': the right answer is revealed');
    ok(root.querySelector('.qbody .feedback').textContent.length > 10, label + ': feedback explains');
    const nb = root.querySelector('.qbody .next'); ok(nb && !nb.hidden, label + ': next appears');
    click(nb);
  }
  return root.querySelector('.qbody .result');
}

function answerPractice(root, labels) {
  let guard = 0;
  while (guard++ < 120) {
    const body = root.querySelector('.qbody');
    if (!body || body.querySelector('.result')) break;
    if (labels) { const t = body.querySelector('.qtag'); if (t) labels.add(t.textContent); }
    const ins = body.querySelectorAll('.numin');
    if (ins.length) { ins.forEach(i => { i.value = i.getAttribute('inputmode') === 'text' ? 'yes' : '12345.678'; }); click(body.querySelector('.check')); }
    else { const opts = Array.from(body.querySelectorAll('.opt')); if (!opts.length) break; click(opts[Math.floor(Math.random() * opts.length)]); }
    ok(/Correct|Not this one/.test(body.querySelector('.feedback').textContent), 'practice: every answer gets feedback');
    const nb = body.querySelector('.next'); if (!nb || nb.hidden) break;
    click(nb);
  }
  return root.querySelector('.qbody .result');
}

head('landing');
ok(errors.length === 0, 'no errors while loading', errors.join(' || '));
ok(visible($('#topic-list')) && visible(panel('list/page')) && !visible($('#topic-guide')) && !visible($('#topic-gdp')), 'opens on My List');
ok($$('#mlTable tr.mrow').length === 24 && $$('#mlTable tr.chrow').length === 5, 'My List: 24 lines in five chapters', $$('#mlTable tr.mrow').length);
ok(w.localStorage.getItem('macro.seenList') === '1', 'the first visit is remembered');
const items = $$('#guideRoot .gitem');
ok(items.length === 28, 'guide shows the 28 sections', items.length);
ok(/0 of 28/.test($('#gCount').textContent), 'progress starts at 0 of 28', $('#gCount').textContent);
ok(!!$('#guideRoot .handout') && $$('#guideRoot .handout .hrules li').length === 6 && /cumulative/.test($('#guideRoot .handout h2').textContent), 'the header card: the exam and its six instructions');
ok(/47.07 of 60/.test($('#guideRoot .handout').textContent), 'Exam 1 score at a glance');
ok($$('.topic-btn').length === 12 && ['list', 'practice', 'formulas', 'exam'].every((t, i) => $$('.topic-btn')[i].getAttribute('data-topic') === t), 'twelve tabs: My List, Math Practice, Formulas, Practice Exam first');

head('guide checkboxes and jumps');
const cb = $('#guideRoot input[data-g="g-for-divide"]'); cb.checked = true; cb.dispatchEvent(new w.Event('change', { bubbles: true }));
ok(/1 of 28/.test($('#gCount').textContent), 'checking an item moves the progress', $('#gCount').textContent);
ok(/g-for-divide":true/.test(w.localStorage.getItem('macro.guide') || ''), 'the check is saved on the device');
click($('#gPrint')); ok(w.__printed === 1, 'print button prints');
click($('#guideRoot .gitem[data-gi="g-for-divide"] > button[data-go]'));
ok(visible($('#topic-formulas')) && visible(panel('formulas/notes')) && !!d.getElementById('for-divide'), 'What Divides by What: jumps to the formulas notes');
topic('guide');
click($('#guideRoot .gitem[data-gi="g-gro-model"] .gsub .btn[data-a="gro-steady"]'));
ok(visible(panel('growth/notes')) && d.getElementById('gro-steady').closest('.note-sec').id === 'gro-model', 'a subsection button lands inside its section');
topic('guide');
click($('#guideRoot .gitem[data-gi="g-for-steps"] .gsub .btn[data-a="for-s-labor"]'));
ok(visible(panel('formulas/notes')) && d.getElementById('for-s-labor').closest('.note-sec').id === 'for-steps', 'the labor recipes live inside How to Do Each Calculation');
topic('guide');
click($('#guideRoot [data-go="exam/mock"]'));
ok(visible(panel('exam/mock')) && !!$('#mxStart'), 'the practice-exam button opens the exam setup');

head('every tab and mode');
const modes = {};
$$('.seg[data-modes]').forEach(s => { modes[s.getAttribute('data-modes')] = Array.from(s.querySelectorAll('button[data-mode]')).map(b => b.getAttribute('data-mode')); });
ok(Object.keys(modes).length === 12, 'twelve sections with modes', Object.keys(modes).join(','));
Object.keys(modes).forEach(t => {
  topic(t);
  ok(visible($('#topic-' + t)), 'tab opens: ' + t);
  ok($$('.topic').filter(visible).length === 1, 'only one section visible: ' + t);
  modes[t].forEach(m => {
    mode(t, m);
    ok(visible(panel(t + '/' + m)), 'mode opens: ' + t + '/' + m);
    ok($$('#topic-' + t + ' .panel').filter(visible).length === 1, 'one panel at a time: ' + t + '/' + m);
    ok(panel(t + '/' + m).textContent.trim().length > 20, 'panel has content: ' + t + '/' + m);
  });
});
ok(errors.length === 0, 'no errors after visiting every mode', errors.join(' || '));

head('my list');
topic('list');
const mlt = $('#mlTable');
click($('#mlCover'));
ok(mlt.classList.contains('covered') && !$('#mlHint').hidden, 'Hide the answers covers the right column');
const r0 = $$('#mlTable tr.mrow')[0];
click(r0); ok(r0.classList.contains('shown'), 'tapping a line shows it');
click(r0); ok(!r0.classList.contains('shown'), 'tapping it again hides it');
click($('#mlCover')); ok(!mlt.classList.contains('covered') && $('#mlHint').hidden, 'Show all the answers uncovers them');
click($('#mlCards'));
const lcp = panel('list/cards');
ok(visible(lcp) && /^1 of 24$/.test(lcp.querySelector('.counter').textContent), 'the flashcards are the 24 lines', lcp.querySelector('.counter').textContent);
click(lcp.querySelector('.flip'));
ok(lcp.querySelector('.flash').classList.contains('flipped') && /rowth/.test(lcp.querySelector('.face.back').textContent), 'the first card flips to its line');
click($('#listShuffle')); ok(/^1 of 24$/.test(lcp.querySelector('.counter').textContent), 'shuffle keeps all 24');
click($('#listOrder')); ok(/Macro goals/.test(lcp.querySelector('.face.front').textContent), 'in order starts from the first line');
mode('list', 'page'); click($('#mlQuiz'));
ok(visible(panel('list/quiz')) && $$('#listQuiz .dots i').length === 24, 'the quiz is 24 questions, one per line', $$('#listQuiz .dots i').length);
ok(!!$('#listQuiz .qtag.sec') && /Question 1 of 24 · \d · /.test($('#listQuiz .qnum').textContent), 'each question names its line and chapter', $('#listQuiz .qnum').textContent);
click($$('#listQuiz .qbody .opt')[0]);
ok(/On your list/.test($('#listQuiz .qbody .feedback').textContent), 'after each answer the line is shown again');
click($('#listQuiz .qbody .next'));
const lres = answerQuiz($('#listQuiz'), 'list');
ok(!!lres && /\d+\/24/.test(lres.querySelector('.big').textContent), 'the round ends with a score out of 24', lres && lres.querySelector('.big').textContent);
ok(lres.querySelectorAll('.lres tr').length === 24, 'with a check or a cross for every line', lres.querySelectorAll('.lres tr').length);
const lmiss = lres.querySelector('.missed');
if (lmiss) {
  const n = lres.querySelectorAll('.misslist > div').length;
  click(lmiss);
  ok($$('#listQuiz .dots i').length === n, 'practice the misses asks exactly the missed lines', $$('#listQuiz .dots i').length + ' vs ' + n);
  answerQuiz($('#listQuiz'), 'list misses');
}
click($('#listQuiz .again')); ok($$('#listQuiz .dots i').length === 24, 'another round of 24');
ok(JSON.parse(w.localStorage.getItem('macro.listseen') || '[]').length >= 1, 'recently asked questions are remembered, so the next rounds ask others');

head('math practice');
topic('practice');
ok(visible(panel('practice/run')) && !!$('#pxStart'), 'the practice setup shows');
click($('#pxT button[data-t="solow"]'));
ok($$('#pxG option').length >= 4, 'the formula menu lists the Solow problems', $$('#pxG option').length);
click($('#pxF button[data-f="type"]')); click($('#pxS button[data-s="fresh"]')); click($('#pxN button[data-n="10"]')); click($('#pxStart'));
ok($$('#practiceRoot .dots i').length === 10, 'ten Solow problems', $$('#practiceRoot .dots i').length);
const pb1 = $('#practiceRoot .qbody');
ok(!!pb1.querySelector('.numin') && /Solow/.test(pb1.querySelector('.qnum').textContent), 'a typed Solow problem');
click(pb1.querySelector('.check'));
ok(/Type an answer/.test(pb1.querySelector('.feedback').textContent) && !pb1.querySelector('.numin').disabled, 'an empty box is not marked');
pb1.querySelectorAll('.numin').forEach(i => { i.value = 'abc'; });
click(pb1.querySelector('.check'));
ok(/Type a number/.test(pb1.querySelector('.feedback').textContent) && !pb1.querySelector('.numin').disabled, 'letters are not marked either');
pb1.querySelectorAll('.numin').forEach(i => { i.value = i.getAttribute('inputmode') === 'text' ? 'maybe' : '999999'; });
click(pb1.querySelector('.check'));
ok(/Not this one/.test(pb1.querySelector('.feedback').textContent) && /Remember:/.test(pb1.querySelector('.feedback').textContent), 'a wrong answer shows the answer, the working and the reminder');
ok(Array.from(pb1.querySelectorAll('.numin')).every(i => i.disabled && i.classList.contains('wrong')), 'the boxes lock and turn red');
click(pb1.querySelector('.next'));
const pb2 = $('#practiceRoot .qbody'), ins2 = pb2.querySelectorAll('.numin');
ins2.forEach(i => { i.value = '1'; });
ins2[ins2.length - 1].dispatchEvent(new w.KeyboardEvent('keydown', {key: 'Enter', bubbles: true}));
ok(ins2[0].disabled, 'Enter in the last box checks the answer');
click(pb2.querySelector('.next'));
const pres = answerPractice($('#practiceRoot'));
ok(!!pres && /\d+\/10/.test(pres.querySelector('.big').textContent), 'the set ends with a score', pres && pres.querySelector('.big').textContent);
ok(pres.querySelectorAll('.gres tr').length >= 1, 'with a line for each kind of problem');
if (pres.querySelector('.misslist > div')) ok(!!pres.querySelector('.misslist .mqtext') && !!pres.querySelector('.misslist .wline') && /How to get it/.test(pres.querySelector('.misslist').textContent), 'each miss shows the question and the working');
const pm = pres.querySelector('.missed');
if (pm) {
  const n = pres.querySelectorAll('.misslist > div').length;
  click(pm);
  ok($$('#practiceRoot .dots i').length === n, 'practice the misses: the same kinds again, new numbers', $$('#practiceRoot .dots i').length + ' vs ' + n);
  answerPractice($('#practiceRoot'));
}
click($('#practiceRoot .setupbtn'));
click($('#pxT button[data-t="all"]')); click($('#pxF button[data-f="mc"]')); click($('#pxS button[data-s="class"]')); click($('#pxN button[data-n="40"]')); click($('#pxStart'));
const nClass = $$('#practiceRoot .dots i').length;
ok(nClass >= 15 && nClass <= 40, 'the class and problem-set problems', nClass);
ok(/Class|Problem Set|Course|Exam 1|Lecture/.test(($('#practiceRoot .qtag.src') || {}).textContent || ''), 'each one says where it comes from');
const plabels = new Set();
answerPractice($('#practiceRoot'), plabels);
ok(plabels.size >= 2, 'tapped answers come in more than one format', [...plabels].join(', '));
ok(/"source":"class"/.test(w.localStorage.getItem('macro.practicecfg') || ''), 'practice settings are remembered');
ok(/sol-/.test(w.localStorage.getItem('macro.pstats') || ''), 'results are remembered, so misses come back more often');

head('notes');
tps.forEach(t => { topic(t); mode(t, 'notes'); ok($$('#' + t + 'Notes .note-sec').length >= 2, t + ': note sections rendered'); ok($$('#' + t + 'Notes .secnav a').length >= 2, t + ': section nav rendered'); ok($$('#' + t + 'Notes h3.sub').length >= 1, t + ': subsection headings rendered'); ok($$('#' + t + 'Notes .know').length >= 2, t + ': every section names its source'); });
ok($$('#formulasNotes .note-sec').length === 6 && $$('#formulasNotes table').length >= 5, 'the formulas tab: six sections and the memorising tables', $$('#formulasNotes table').length);
ok($$('#formulasNotes .flow .step').length >= 12, 'the step-by-step recipes rendered', $$('#formulasNotes .flow .step').length);
ok($$('#gdpNotes .formula, #growthNotes .formula, #laborNotes .formula, #pricesNotes .formula, #savingNotes .formula').length >= 9, 'formulas set on their own lines');

head('flashcards');
tps.forEach(t => {
  topic(t); mode(t, 'cards');
  const p = panel(t + '/cards'), c = p.querySelector('.counter');
  ok(/^1 of \d+$/.test(c.textContent), t + ': counter starts at 1', c.textContent);
  click(p.querySelector('.flip')); ok(p.querySelector('.flash').classList.contains('flipped'), t + ': flips');
  ok(/Section · /.test(p.querySelector('.face.back').textContent), t + ': the card back names its section');
  click(p.querySelector('.next')); ok(/^2 of /.test(c.textContent) && !p.querySelector('.flash').classList.contains('flipped'), t + ': next card, unflipped');
  key('ArrowLeft'); ok(/^1 of /.test(c.textContent), t + ': arrow key goes back');
  const decks = Array.from(p.querySelectorAll('[data-deck]'));
  ok(decks.length === (t === 'formulas' ? 3 : 2), t + ': its decks', decks.length);
  click(decks[1]); ok(/^1 of \d+$/.test(c.textContent) && decks[1].getAttribute('aria-pressed') === 'true', t + ': second deck loads');
});
ok(/Top ÷ bottom/.test(panel('formulas/cards').textContent) && /Memory hooks/.test(panel('formulas/cards').textContent), 'the formulas tab has the top-over-bottom deck and the memory hooks deck');

head('match');
tps.forEach(t => {
  topic(t); mode(t, 'match');
  const p = panel(t + '/match');
  const L = Array.from(p.querySelectorAll('.L .tile')), R = Array.from(p.querySelectorAll('.R .tile'));
  ok(L.length === 6 && R.length === 6, t + ': six pairs', L.length + '/' + R.length);
  click(L[0]); click(R[R.length - 1]);
  L.filter(l => !l.classList.contains('done')).forEach(l => { for (const r of R) { if (r.classList.contains('done')) continue; click(l); click(r); if (l.classList.contains('done')) break; } });
  ok(p.querySelectorAll('.tile.done').length === 12, t + ': every pair can be matched', p.querySelectorAll('.tile.done').length);
  ok(p.querySelector('.banner') && p.querySelector('.banner').textContent.length > 10, t + ': round-complete banner with a verdict');
  click(p.querySelector('.toolbar .btn')); ok(p.querySelectorAll('.tile.done').length === 0, t + ': new round resets');
});

head('topic quizzes');
tps.forEach(t => {
  topic(t); mode(t, 'quiz');
  const root = $('#' + t + 'Quiz');
  ok(root.querySelectorAll('.dots i').length === 10, t + ': ten dots');
  ok(root.querySelector('.qtag.sec') && root.querySelector('.qtag.sec').textContent.length > 5, t + ': the question card names its section', root.querySelector('.qtag.sec') && root.querySelector('.qtag.sec').textContent);
  const res = answerQuiz(root, t);
  ok(!!res, t + ': results screen');
  ok(res && res.querySelector('h3') && res.querySelector('h3').textContent.length > 3, t + ': verdict line shown');
  ok(res && /\d+\/10/.test(res.querySelector('.big').textContent), t + ': score shown', res && res.querySelector('.big').textContent);
  const missed = res.querySelector('.missed');
  if (missed) {
    const n = res.querySelectorAll('.misslist > div').length;
    click(missed);
    ok(root.querySelectorAll('.dots i').length === n, t + ': practice the misses asks exactly the missed ones', root.querySelectorAll('.dots i').length + ' vs ' + n);
    answerQuiz(root, t + ' (misses)');
  }
  click(root.querySelector('.again')); ok(root.querySelectorAll('.dots i').length === 10, t + ': new quiz has ten');
});
topic('gdp'); mode('gdp', 'quiz');
key('1'); ok($$('#gdpQuiz .qbody .opt:disabled').length > 0, 'key 1 answers');
key('Enter'); ok(/Question 2/.test($('#gdpQuiz .qnum').textContent), 'Enter moves on', $('#gdpQuiz .qnum').textContent);

head('practice exam');
topic('exam'); mode('exam', 'mock');
ok(!!$('#mxStart'), 'setup screen shows');
ok($$('#mxP button').length === 8 && /All/.test($('#mxP').textContent) && /Formulas/.test($('#mxP').textContent) && /Loanable Funds/.test($('#mxP').textContent), 'the topic row offers all seven topics, formulas and loanable funds included');
click($('#mxN button[data-n="15"]')); click($('#mxT button[data-t="all"]')); click($('#mxP button[data-p="all"]')); click($('#mxF button[data-f="all"]'));
click($('#mxStart'));
ok($$('#mockExam .dots i').length === 15, 'fifteen-question exam', $$('#mockExam .dots i').length);
ok(!!$('#mockExam .qtag.tier') && /missed|Problem-set|readings/.test($('#mockExam .qtag.tier').textContent), 'every exam question shows where it comes from', $('#mockExam .qtag.tier') && $('#mockExam .qtag.tier').textContent);
const mres = answerQuiz($('#mockExam'), 'exam');
const secTbl = mres && mres.querySelectorAll('.tbl')[0], tierTbl = mres && mres.querySelectorAll('.tbl')[1];
ok(secTbl && secTbl.querySelectorAll('tr').length >= 4 && secTbl.querySelectorAll('tr').length <= 24 && secTbl.querySelectorAll('.secch').length === secTbl.querySelectorAll('tr').length, 'results break down by section', secTbl && secTbl.querySelectorAll('tr').length);
ok(tierTbl && tierTbl.querySelectorAll('tr').length >= 1 && tierTbl.querySelectorAll('tr').length <= 4, 'and by where the questions come from', tierTbl && tierTbl.querySelectorAll('tr').length);
click(mres.querySelector('.setupbtn')); ok(!!$('#mxStart'), 'change settings returns to setup');
click($('#mxP button[data-p="formulas"]')); click($('#mxN button[data-n="25"]')); click($('#mxStart'));
ok($$('#mockExam .dots i').length === 25, 'a formulas-only exam of twenty-five', $$('#mockExam .dots i').length);
ok(/"topic":"formulas"/.test(w.localStorage.getItem('macro.mockcfg') || ''), 'exam settings remembered');

head('remembers where you were');
topic('labor'); mode('labor', 'cards');
ok(w.localStorage.getItem('macro.topic') === 'labor' && w.localStorage.getItem('macro.mode.labor') === 'cards', 'topic and mode saved');

head('readings');
topic('readings');
const rmode = m => click($('.seg[data-modes="readings"] button[data-mode="' + m + '"]'));
ok($$('#rdPick .rdbtn').length === 16, 'sixteen readings listed: seven coming up, nine taken');
click($('#rdPick .rdbtn[data-rd="rq10"]'));
rmode('page');
ok(/Christian Approach to Interest/.test($('#rdPage .rdtitle').textContent) && /thesis/i.test($('#rdPage').textContent), 'Start here opens with the thesis');
rmode('cards');
ok(!!$('#rdCards .flash') && /cards/.test($('#rdCardsBar').textContent), 'flashcards load');
rmode('match');
ok($$('#rdMatch .tiles.L button, #rdMatch .tiles.L .tile, #rdMatch .L > *').length >= 4, 'who said what deals a round', $$('#rdMatch .L > *').length);
rmode('quiz');
const rq = answerQuiz($('#rdQuizBox'), 'reading practice');
ok(!!rq, 'practice reaches results');
rmode('real');
click($('#rdRealGo'));
ok(/left/.test($('#rdTimer').textContent), 'the real thing starts a four-minute clock', $('#rdTimer').textContent);
ok($$('#rdRealBox .dots i').length === 5, 'the real thing is five questions', $$('#rdRealBox .dots i').length);
const rr = answerQuiz($('#rdRealBox'), 'the real thing');
ok(!!rr, 'the real thing reaches results');
rmode('how');
ok(/32 times/.test($('#rdHow').textContent) && $$('#rdHow .missl li').length === 7, 'How he asks: the longest-answer count and all 7 misses');
rmode('past');
ok($$('#rdPastBox .pqi').length === 45, 'Past quizzes: every question listed', $$('#rdPastBox .pqi').length);
ok($$('#rdPastBox .pqo li.right').length === 45 && $$('#rdPastBox .pqo li.mine').length === 7, 'each shows the answer, and the 7 wrong picks');
click($('#rdPastBar [data-pq="miss"]'));
ok($$('#rdPastBox .dots i').length === 7, 'Only my 7 misses runs seven questions');
answerQuiz($('#rdPastBox'), 'past misses');
click($('#rdPick .rdbtn[data-rd="past4"]'));
rmode('page');
ok(/you scored 4\/5/.test($('#rdPage').textContent) && $$('#rdPage .pqi').length === 5, 'a past quiz shows its five questions');
click($('#rdPick .rdbtn[data-rd="rq12"]'));
ok(/Not built yet/.test($('#rdPage').textContent), 'a reading not built yet says so');
click($('#rdPick .rdbtn[data-rd="rq10"]'));
rmode('page');
head('the exam’s source filter');
topic('exam');
if (!$('#mxStart')) {
  const fin = answerQuiz($('#mockExam'), 'exam in progress');
  ok(!!(fin && fin.querySelector('.setupbtn')), 'an exam in progress can be finished and reset');
  click(fin.querySelector('.setupbtn'));
}
ok(!!$('#mxF') && $$('#mxF button').length === 5, 'the exam setup has a five-way source row');
ok(/problem-set/i.test(panel('exam/mock').textContent), 'the setup explains where the tags come from');
click($('#mxN button[data-n="15"]')); click($('#mxT button[data-t="all"]'));
click($('#mxP button[data-p="all"]')); click($('#mxF button[data-f="misses"]')); click($('#mxStart'));
const miss = $('#mockExam');
ok(miss.querySelectorAll('.dots i').length >= 12 && miss.querySelectorAll('.dots i').length <= 15, 'the misses, all of them', miss.querySelectorAll('.dots i').length);
ok(Array.from(miss.querySelectorAll('.qtag.tier')).every(t => /missed/i.test(t.textContent)), 'the misses draw shows only missed questions', miss.querySelector('.qtag.tier') && miss.querySelector('.qtag.tier').textContent);
ok(/"focus":"misses"/.test(w.localStorage.getItem('macro.mockcfg') || ''), 'the source focus is remembered');
const missRes = answerQuiz(miss, 'misses');
ok(!!missRes, 'the filtered exam reaches results');
ok(/You missed this on a problem set/.test(missRes.textContent), 'the breakdown names the tier drawn');
click(missRes.querySelector('.setupbtn')); click($('#mxF button[data-f="rest"]')); click($('#mxStart'));
ok(Array.from($('#mockExam').querySelectorAll('.qtag.tier')).every(t => /readings/i.test(t.textContent)), 'switching the focus switches the draw');

head('the 38 for the exam');
const restRes = answerQuiz($('#mockExam'), 'readings draw');
click(restRes.querySelector('.setupbtn'));
ok(!!$('#mxFifty') && /The 38/.test($('#mxFifty').textContent), 'the setup offers the one-button thirty-eight');
click($('#mxFifty'));
const ex = $('#mockExam');
ok(ex.querySelectorAll('.dots i').length === 38, 'thirty-eight questions', ex.querySelectorAll('.dots i').length);
const fRes = answerQuiz(ex, 'the 38');
ok(!!fRes, 'the thirty-eight reaches results');
const fSec = fRes.querySelectorAll('.tbl')[0];
ok(fSec && fSec.querySelectorAll('tr').length === 28, 'the results list all twenty-eight sections', fSec && fSec.querySelectorAll('tr').length);

head('opening a tab from a link');
const dom2 = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://example.test/?v=7#practice', virtualConsole: vc,
  beforeParse(w2) { w2.scrollTo = () => {}; w2.Element.prototype.scrollIntoView = function () {}; } });
const d2 = dom2.window.document;
ok(!d2.getElementById('topic-practice').hidden && d2.getElementById('topic-list').hidden, 'a link ending in #practice opens Math Practice');
ok(!!d2.getElementById('pxStart'), 'with the practice settings ready');
dom2.window.close();

head('errors');
ok(errors.length === 0, 'no runtime errors anywhere', errors.join(' || '));
console.log('\n' + (fails === 0 ? 'ALL ' + checks + ' DOM CHECKS PASSED' : fails + ' FAILURES out of ' + checks + ' DOM checks'));
w.close();
process.exit(fails ? 1 : 0);
