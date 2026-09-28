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

head('landing');
ok(errors.length === 0, 'no errors while loading', errors.join(' || '));
ok(visible($('#topic-start')) && visible(panel('start/page')) && !visible($('#topic-guide')) && !visible($('#topic-gdp')), 'opens on Start Here');
ok($$('#topic-start .note-sec').length === 4 && $$('#topic-start table tr').length === 12 && $$('#start-misses li').length === 13, 'Start Here: four short lists', $$('#topic-start .note-sec').length);
ok(w.localStorage.getItem('macro.seenStart') === '1', 'the first visit is remembered');
const items = $$('#guideRoot .gitem');
ok(items.length === 24, 'guide shows the 24 sections', items.length);
ok(/0 of 24/.test($('#gCount').textContent), 'progress starts at 0 of 24', $('#gCount').textContent);
ok(!!$('#guideRoot .handout') && $$('#guideRoot .handout .hrules li').length === 4 && /September 29/.test($('#guideRoot .handout h2').textContent), 'the header card: the exam and its four instructions');
ok(/38 questions/.test($('#guideRoot .handout').textContent), 'the exam at a glance');
ok($$('.topic-btn').length === 9 && $$('.topic-btn')[0].getAttribute('data-topic') === 'start' && $$('.topic-btn')[1].getAttribute('data-topic') === 'formulas' && $$('.topic-btn')[2].getAttribute('data-topic') === 'exam', 'nine tabs: Start Here, Formulas, Practice Exam first');

head('guide checkboxes and jumps');
const cb = $('#guideRoot input[data-g="g-for-divide"]'); cb.checked = true; cb.dispatchEvent(new w.Event('change', { bubbles: true }));
ok(/1 of 24/.test($('#gCount').textContent), 'checking an item moves the progress', $('#gCount').textContent);
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
ok(Object.keys(modes).length === 9, 'nine sections with modes', Object.keys(modes).join(','));
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

head('start here: the short quiz');
topic('start');
click($('#startGo'));
ok(visible(panel('start/quiz')) && $$('#startQuiz .dots i').length === 15, 'the button opens a fifteen-question quiz', $$('#startQuiz .dots i').length);
ok(Array.from($$('#startQuiz .qtag.tier')).every(t => /missed|Problem-set/.test(t.textContent)), 'it asks misses and drills');
const sres = answerQuiz($('#startQuiz'), 'start');
ok(!!sres && /\d+\/15/.test(sres.querySelector('.big').textContent), 'and reaches a score out of fifteen', sres && sres.querySelector('.big').textContent);
click(sres.querySelector('.again')); ok($$('#startQuiz .dots i').length === 15, 'another fifteen');

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
ok($$('#mxP button').length === 7 && /All six/.test($('#mxP').textContent) && /Formulas/.test($('#mxP').textContent), 'the topic row offers all six topics, formulas included');
click($('#mxN button[data-n="15"]')); click($('#mxT button[data-t="all"]')); click($('#mxP button[data-p="all"]')); click($('#mxF button[data-f="all"]'));
click($('#mxStart'));
ok($$('#mockExam .dots i').length === 15, 'fifteen-question exam', $$('#mockExam .dots i').length);
ok(!!$('#mockExam .qtag.tier') && /missed|Problem-set|readings/.test($('#mockExam .qtag.tier').textContent), 'every exam question shows where it comes from', $('#mockExam .qtag.tier') && $('#mockExam .qtag.tier').textContent);
const mres = answerQuiz($('#mockExam'), 'exam');
const secTbl = mres && mres.querySelectorAll('.tbl')[0], tierTbl = mres && mres.querySelectorAll('.tbl')[1];
ok(secTbl && secTbl.querySelectorAll('tr').length >= 4 && secTbl.querySelectorAll('tr').length <= 24 && secTbl.querySelectorAll('.secch').length === secTbl.querySelectorAll('tr').length, 'results break down by section', secTbl && secTbl.querySelectorAll('tr').length);
ok(tierTbl && tierTbl.querySelectorAll('tr').length >= 1 && tierTbl.querySelectorAll('tr').length <= 3, 'and by where the questions come from', tierTbl && tierTbl.querySelectorAll('tr').length);
click(mres.querySelector('.setupbtn')); ok(!!$('#mxStart'), 'change settings returns to setup');
click($('#mxP button[data-p="formulas"]')); click($('#mxN button[data-n="25"]')); click($('#mxStart'));
ok($$('#mockExam .dots i').length === 25, 'a formulas-only exam of twenty-five', $$('#mockExam .dots i').length);
ok(/"topic":"formulas"/.test(w.localStorage.getItem('macro.mockcfg') || ''), 'exam settings remembered');

head('remembers where you were');
topic('labor'); mode('labor', 'cards');
ok(w.localStorage.getItem('macro.topic') === 'labor' && w.localStorage.getItem('macro.mode.labor') === 'cards', 'topic and mode saved');

head('the exam’s source filter');
topic('exam');
if (!$('#mxStart')) {
  const fin = answerQuiz($('#mockExam'), 'exam in progress');
  ok(!!(fin && fin.querySelector('.setupbtn')), 'an exam in progress can be finished and reset');
  click(fin.querySelector('.setupbtn'));
}
ok(!!$('#mxF') && $$('#mxF button').length === 4, 'the exam setup has a four-way source row');
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
ok(fSec && fSec.querySelectorAll('tr').length === 24, 'the results list all twenty-four sections', fSec && fSec.querySelectorAll('tr').length);

head('errors');
ok(errors.length === 0, 'no runtime errors anywhere', errors.join(' || '));
console.log('\n' + (fails === 0 ? 'ALL ' + checks + ' DOM CHECKS PASSED' : fails + ' FAILURES out of ' + checks + ' DOM checks'));
w.close();
process.exit(fails ? 1 : 0);
