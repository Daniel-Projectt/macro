const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

let fails = 0, checks = 0;
function ok(cond, label, detail) { checks++; if (!cond) { fails++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + detail : '')); } }
function head(t) { console.log('\n== ' + t + ' =='); }

// ---------- load ----------
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) { console.log('NO SCRIPT'); process.exit(1); }
const src = m[1];
try { new vm.Script(src); } catch (e) { console.log('JS PARSE ERROR: ' + e.message); process.exit(1); }
const sandbox = { module: { exports: {} }, console };
vm.createContext(sandbox);
vm.runInContext(src, sandbox);
const A = sandbox.module.exports;
console.log('script parsed and loaded, exports: ' + Object.keys(A).length);
const tps = ['gdp', 'growth', 'labor', 'prices', 'saving', 'formulas'];
const PREFIX = { gdp: 'gdp-', growth: 'gro-', labor: 'lab-', prices: 'pri-', saving: 'sav-', formulas: 'for-' };
const body = tp => A.CH[tp].notes.map(n => n.body).join(' ');
const allBodies = tps.map(body).join(' ');
const anchorExists = id => tps.some(tp => A.CH[tp].notes.some(n => n.id === id)) || allBodies.includes('id="' + id + '"');

// ---------- 1. the outline ----------
head('the outline');
ok(A.COURSE.code === 'Principles of Macroeconomics' && A.COURSE.term === 'First Exam' && /September 29/.test(A.COURSE.exam), 'course, exam and date');
ok(/38 questions, 60 points, 75 minutes/.test(A.COURSE.scope) && /Problem Sets 1–4/.test(A.COURSE.scope), 'scope line: the exam at a glance');
ok(A.COURSE.rules.length === 4 && /exactly as asked/.test(A.COURSE.rules[0]) && /misses/.test(A.COURSE.rules[1]) && /Formulas tab/.test(A.COURSE.rules[2]) && /calculations/.test(A.COURSE.rules[3]), 'the four instructions');
const HEADS = ['Intro to Macro and GDP', 'Long-Run Growth and the Solow Model', 'The Labor Market', 'Price Levels, CPI and Inflation', 'Saving and Investment', 'Formulas — What Divides by What'];
ok(A.GUIDE.sections.length === 6 && A.GUIDE.sections.every((s, i) => s.tp === tps[i] && s.h === HEADS[i]), 'five units in class order, then the formulas', A.GUIDE.sections.map(s => s.h).join(' | '));
const OUTLINE = {
  gdp: ['Macro Basics', 'GDP and the Expenditure Approach', 'What Counts in GDP', 'Limits of GDP', 'Real vs Nominal GDP'],
  growth: ['Growth Facts, Per Capita and the Rule of 70', 'Catch-up vs Innovative Growth, Factors, Diminishing Returns', 'The Solow Model and the Steady State', 'What Shifts What', 'Policy, Institutions and Solow’s Weaknesses'],
  labor: ['Classifying People', 'The Rates and the Worked Examples', 'Types of Unemployment and the Natural Rate', 'How the Rates Move, U-3, Technology and Work'],
  prices: ['CPI, the Deflator and Converting Dollars', 'Inflation, Disinflation, Deflation and the CPI’s Bias'],
  saving: ['National Saving and the Open Economy', 'Investment and Direct vs Indirect Financing'],
  formulas: ['Formula Sheet', 'Ways to Remember Them', 'What Divides by What', 'What Multiplies, Adds and Subtracts', 'How to Do Each Calculation', 'The Traps'] };
A.GUIDE.sections.forEach(s => {
  ok(JSON.stringify(s.items.map(i => i.t)) === JSON.stringify(OUTLINE[s.tp]), 'sections match the outline for ' + s.tp, s.items.map(i => i.t).join(' | '));
  s.items.forEach(it => {
    ok(it.short && it.short.length > 60, 'item has a one-breath answer: ' + it.t);
    ok(A.CH[s.tp].notes.some(n => n.id === it.a), 'item points at a note section: ' + it.t, it.a);
    ok(it.subs.length >= 1 && it.subs.every(sb => sb[0] && anchorExists(sb[1])), 'every subsection anchor exists: ' + it.t, it.subs.map(sb => sb[1]).join(','));
  });
});
const items = A.GUIDE.sections.flatMap(s => s.items);
ok(items.length === 24 && new Set(items.map(i => i.id)).size === 24, 'twenty-four sections, unique ids');

// ---------- 2. topics ----------
head('topics');
const noteIds = [];
tps.forEach(tp => {
  const c = A.CH[tp];
  ok(c.title && c.short, 'topic header: ' + tp);
  ok(c.notes.length === OUTLINE[tp].length && c.notes.every(n => n.id && n.h && n.body && n.body.length > 400), 'one note section per outline item, each with substance: ' + tp, c.notes.length);
  ok(c.notes.map(n => n.h).join('|') === OUTLINE[tp].join('|'), 'the note sections carry the outline headings: ' + tp, c.notes.map(n => n.h).join(' | '));
  c.notes.forEach(n => { ok(n.id.indexOf(PREFIX[tp]) === 0, 'note id prefixed: ' + n.id); noteIds.push(n.id); });
  ok(c.decks.length >= 2 && c.decks.every(d => d.id && d.label && d.match !== false && d.cards.length >= 8), 'two decks with 8+ cards, all in play: ' + tp, c.decks.map(d => d.cards.length).join(','));
  c.decks.forEach(d => {
    ok(d.cards.every(x => x.length >= 3 && x[0] && x[1] && x[2]), 'cards have front, back and section: ' + tp + '/' + d.id);
    ok(new Set(d.cards.map(x => x[0])).size === d.cards.length, 'card fronts unique: ' + tp + '/' + d.id);
  });
  ok(A.PAIRSETS[tp].pairs.length >= 17, 'enough pairs to match: ' + tp, A.PAIRSETS[tp].pairs.length);
  ok(new Set(A.PAIRSETS[tp].pairs.map(p => p[1])).size === A.PAIRSETS[tp].pairs.length, 'pair meanings unique: ' + tp);
});
ok(new Set(noteIds).size === noteIds.length, 'note ids unique across topics');
const subIds = [...new Set((allBodies.match(/ id="([a-z0-9-]+)"/g) || []).map(s => s.slice(5, -1)))];
ok(new Set(subIds.concat(noteIds)).size === subIds.length + noteIds.length, 'subsection ids do not collide with section ids');
// the formulas and the worked numbers from the study guide, on the page
['GDP = C + I + G + (X &minus; M)', 'Real GDP<sub>t</sub> = &Sigma; (price<sub>base</sub>', '$6,200', '$42,000', '$56,100', '$46,200', 'I up, net exports down', 'Canada&rsquo;s</b> GDP'].forEach(v => ok(body('gdp').includes(v), 'gdp: ' + v));
['Y = A&radic;K', 'I = sY', 'D = &delta;K', 'C = Y &minus; I', 'K* = (sA &divide; &delta;)<sup>2</sup>', '$8.94', '$0.89', '$8.05', '$0.80', 'K* = 121', '$12.10', '$10.89', '90 units', '3.5 years', '1.75 years', '<b>No shift</b>'].forEach(v => ok(body('growth').includes(v), 'growth: ' + v));
['LF = E + U', 'u = U &divide; LF', 'LFPR = LF &divide; adult population', 'EPR = E &divide; adult population', '2,700,000', '42,300,000', '15.4%', '37.5%', '86.7%', '60%', '<b>2%</b>', 'Frictional', 'Structural', 'Cyclical', 'Seasonal'].forEach(v => ok(body('labor').includes(v), 'labor: ' + v));
['CPI<sub>t</sub> = cost of basket<sub>t</sub>', 'Deflator<sub>t</sub> = nominal GDP<sub>t</sub>', 'Inflation = (P<sub>new</sub> &minus; P<sub>old</sub>) &divide; P<sub>old</sub>', '$390', '$520', '<b>75</b>', '33.33%', '<b>$10</b>', 'Disinflation', 'Deflation'].forEach(v => ok(body('prices').includes(v), 'prices: ' + v));
['S = Y &minus; C &minus; G = (Y &minus; T &minus; C) + (T &minus; G)', 'I = S + (M &minus; X)', 'Direct financing', 'Indirect financing'].forEach(v => ok(body('saving').includes(v), 'saving: ' + v));
['GDP', 'Real GDP', 'GDP per capita', 'Growth rate', 'Rule of 70', 'Solow', 'Labor force', 'Unemployment rate', 'LFPR', 'EPR', 'Natural rate', 'CPI', 'GDP deflator', 'Inflation', 'Convert dollars', 'National saving', 'Open economy'].forEach(v => ok(A.CH.formulas.notes[0].body.includes('<td class="head">' + v + '</td>'), 'formula sheet row: ' + v));
['<td class="head">Unemployment rate</td><td class="sm">unemployed</td><td class="sm"><b>labor force</b>', '<td class="head">Participation rate (LFPR)</td><td class="sm">labor force</td><td class="sm"><b>adult population</b>', '<td class="head">Employment-population ratio</td><td class="sm">employed</td>', '<td class="head">GDP deflator</td><td class="sm">nominal GDP</td><td class="sm"><b>real GDP</b>', '<td class="head">Growth rate</td><td class="sm">new &minus; old</td><td class="sm"><b>old</b>', 'Going backwards from a rate', 'From rates to counts', 'The steady state', 'Divide by the earlier year', 'Labor force, not population', 'Want over have', 'SAD, squared', 'Base = basement = bottom', 'N before R', 'Change over original'].forEach(v => ok(body('formulas').includes(v), 'formulas: ' + v.replace(/<[^>]+>/g, ' ').trim()));
ok((body('growth').match(/<td class="head">(Technology \(A\) rises|Savings rate rises|Depreciation rate rises)<\/td>/g) || []).length === 3, 'growth: the shift table');

// ---------- 2a. his problem-set misses are on the page and in the bank ----------
head('the problem-set misses');
tps.forEach(tp => A.CH[tp].notes.forEach(n => {
  ok(n.body.indexOf('<div class="point"><b>The point</b>') === 0, 'section opens with “The point”: ' + n.h);
  ok(/<p class="able"><b>Be able to<\/b>/.test(n.body), 'section says what to be able to do: ' + n.h);
  ok(/<span class="know">/.test(n.body), 'section names its source: ' + n.h);
}));
ok((allBodies.match(/You missed this one/g) || []).length >= 4, 'the notes call out the misses', (allBodies.match(/You missed this one/g) || []).length);
const misses = A.QB.filter(q => q.m === 2);
ok(misses.length >= 13, 'every problem-set miss has a question', misses.length);
misses.forEach((q, i) => ok(/You missed this on Problem Set [1-4]/.test(q.e), 'miss #' + i + ' says which problem set', q.q));
const MISS_ANSWERS = ['$6,200', 'I rises, net exports fall', '$56,100', 'accounting tautology', 'larger, because sales include intermediate goods', 'A firm’s purchase of new machinery', 'Y = $8.94, I = $0.89, C = $8.05, D = $0.80', 'K* = 121, Y* = $12.10, C* = $10.89', 'not necessarily become rich', 'A new production method that reduces waste', 'only the investment curve up', '42,300,000', '2%', '33.33%'];
MISS_ANSWERS.forEach(a => ok(misses.some(q => String(q.a).includes(a)), 'the miss list is covered: ' + a));
// the stems never mention the sets or the page
const META = /this page|the study guide|according to the report|the notes above/i;
A.QB.forEach((q, i) => ok(!META.test(q.q), 'question #' + i + ' asks about macroeconomics, not about the page', q.q));
const SLANG = /\bbruh\b|\bcheeks\b|\bGOAT\b|no cap|\bbro\b|\bnah\b|\bdawg\b|lock in|\bcooked\b/i;
const everyText = allBodies + ' ' + A.QB.map(q => [q.q, q.a, q.e].concat(q.w || []).join(' ')).join(' ') + ' ' + tps.map(tp => A.CH[tp].decks.map(d => d.cards.map(c => c[0] + ' ' + c[1]).join(' ')).join(' ')).join(' ');
ok(!SLANG.test(everyText), 'no slang anywhere', (everyText.match(SLANG) || []).join(' | '));
A.QB.filter(q => q.t === 'tf').forEach((q, i) => {
  const rest = String(q.e).replace(/^(True|False)\s*[—-]\s*/, '');
  const stem = new Set(q.q.toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter(x => x.length > 4));
  const said = rest.toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter(x => x.length > 4);
  const echo = said.length ? said.filter(x => stem.has(x)).length / said.length : 0;
  ok(echo < 0.75, 'true/false #' + i + ' is not answered by its own wording', q.q + ' || ' + q.e);
});
Object.keys(A.SEC_CHAPTER).forEach(id => {
  const mine = A.QB.filter(q => q.sec === id);
  ok(mine.length >= 7, 'at least seven written questions for “' + A.SEC_TITLES[id] + '”', mine.length);
  ok(mine.filter(q => q.ap).length >= 1, 'at least one application question for “' + A.SEC_TITLES[id] + '”', mine.filter(q => q.ap).length);
  ok(mine.filter(q => q.t === 'tf').length >= 1, 'at least one true/false for “' + A.SEC_TITLES[id] + '”');
});

// ---------- 3. every question and card belongs to a section ----------
head('every question and card belongs to a section of the outline');
const SEC = A.SEC_CHAPTER;
ok(Object.keys(SEC).length === 24 && Object.keys(A.SEC_TITLES).length === 24, 'twenty-four sections known to the engine');
for (let i = 0; i < A.QB.length; i++) ok(A.QB[i] && typeof A.QB[i] === 'object', 'no empty slot in the question list at #' + i);
A.QB.forEach((q, i) => ok(q.sec && SEC[q.sec] === q.tp, 'question #' + i + ' is tagged with a section of its own topic', q.sec + ' / ' + q.q.slice(0, 60)));
tps.forEach(tp => A.CH[tp].decks.forEach(d => d.cards.forEach(c => ok(c[2] && SEC[c[2]] === tp, 'card is tagged with a section of its topic: ' + c[0], c[2]))));
Object.keys(SEC).forEach(id => ok(A.CH[SEC[id]].decks.some(d => d.cards.some(c => c[2] === id)), 'at least one flashcard for “' + A.SEC_TITLES[id] + '”'));
console.log('  questions per section: ' + Object.keys(SEC).map(id => id.replace(/^g-/, '') + '=' + A.QB.filter(q => q.sec === id).length).join(' '));

// ---------- 3c. the source tiers ----------
head('where questions come from');
ok(A.TIERS.length === 3 && A.TIERS.map(t => t.w).join() === '2,1,0', 'three source tiers, misses first');
ok(/missed/.test(A.TIERS[0].t) && /Problem-set/.test(A.TIERS[1].t) && /readings/.test(A.TIERS[2].t), 'tier labels');
A.QB.forEach((q, i) => ok(q.hot === (q.m || 0) && [0, 1, 2].includes(q.hot), 'question #' + i + ' carries its source tier'));
const byTier = {}; [0, 1, 2].forEach(t => { byTier[t] = A.QB.filter(q => (q.hot || 0) === t); });
ok(byTier[2].length >= 13 && byTier[1].length >= 80 && byTier[0].length >= 40, 'every tier has enough questions to draw on', [2, 1, 0].map(t => t + ':' + byTier[t].length).join(' '));
const wantTopics = {}; [0, 1, 2].forEach(t => { wantTopics[t] = tps.filter(tp => byTier[t].filter(q => q.tp === tp).length >= 4); });
const seenTiers = new Set();
for (let r = 0; r < 60; r++) {
  const n = [15, 25, 40][r % 3];
  const all = A.mockQuestions({ n: n, types: 'all', focus: 'all' });
  ok(all.length === n, 'the exam returns the asked-for length', all.length + ' vs ' + n);
  ok(new Set(all.map(q => q.key)).size === all.length, 'no repeats inside one exam');
  all.forEach(q => seenTiers.add(q.hot || 0));
  if (n >= 40) ok(new Set(all.map(q => q.hot || 0)).size >= 2, 'a full-length unfiltered exam reaches at least two tiers');
  [['misses', 2], ['ps', 1], ['rest', 0]].forEach(([f, want]) => {
    const got = A.mockQuestions({ n: n, types: 'all', focus: f });
    if (want === 2) ok(got.length >= 12, 'focus ' + f + ' draws the misses', got.length);
    else if (n <= 25 || want === 1) ok(got.length === n, 'focus ' + f + ' fills the exam', got.length + '/' + n);
    ok(got.every(q => (q.hot || 0) === want), 'focus ' + f + ' draws only that tier');
    ok(got.every(q => q.sec && A.SEC_CHAPTER[q.sec] === q.tp), 'focus ' + f + ' questions name their section');
    if (n >= 25 && want !== 2) ok(wantTopics[want].every(tp => got.some(q => q.tp === tp)), 'focus ' + f + ' spreads across every topic that has that tier', wantTopics[want].join(',') + ' vs ' + [...new Set(got.map(q => q.tp))].join(','));
  });
  ok(A.mockQuestions({ n: n, types: 'ap', focus: 'rest' }).every(q => q.ap && !(q.hot || 0)), 'the filters combine: application questions from the readings');
  ok(A.mockQuestions({ n: n, types: 'mc', focus: 'ps' }).every(q => q.kind !== 'tf' && q.hot === 1), 'the filters combine: multiple choice, problem-set style');
}
ok(seenTiers.size === 3, 'unfiltered exams draw on all three tiers', [...seenTiers].join(','));
// my list: 24 lines as written, their flashcards, and a quiz with one question per line
const LR = A.LIST_ROWS;
const llen = s => String(s).replace(/<[^>]+>/g, '').length;
ok(A.LIST.length === 5 && A.LIST.map(g => g.rows.length).join() === '5,5,4,6,4' && LR.length === 24, 'the list: 24 lines in five chapters, as written', A.LIST.map(g => g.rows.length).join());
ok(new Set(LR.map(r => r.id)).size === 24 && new Set(LR.map(r => r.cue)).size === 24, 'every line has its own id and cue');
LR.forEach(r => ok(r.cue && r.line && A.SEC_CHAPTER[r.sec], 'line ' + r.id + ' has a cue, a line and a real section', r.sec));
const plain = id => LR.find(r => r.id === id).line.replace(/<b>([A-Z])<\/b>/g, '$1');
[['goals', /^Growth, Employment, Prices$/], ['gdp', /^C \+ I \+ G \+ \(X − M\)\. Transfers out\. Imports cancel\.$/], ['counts', /^New, Final, Here, Market$/],
 ['gmisses', /^Leisure, Income, Environment, Sustainability, Home$/], ['real', /^Now prices vs Reference prices\. Same in the base year\.$/],
 ['double', /^70 ÷ growth rate\. Growth is not guaranteed\.$/], ['rates', /^Unemployment rate ÷ <b>labor force<\/b>\. The other two ÷ <b>all adults<\/b>\.$/],
 ['cpi', /Base = bottom/], ['infl', /^\(new − old\) ÷ <b>old<\/b>\. Divide by the earlier one\.$/], ['defl', /N before R/],
 ['convert', /CPI <b>want<\/b> ÷ CPI <b>have<\/b>/], ['saving', /^National Y − C − G · Private Y − T − C · Public T − G$/],
 ['finance', /hand to hand.*bank in the middle/]].forEach(([id, re]) => ok(re.test(plain(id)), 'the line reads as written: ' + id, plain(id)));
const lByRow = {};
A.LISTQ.forEach((b, i) => { (lByRow[b.row] = lByRow[b.row] || []).push(i); });
LR.forEach(r => ok((lByRow[r.id] || []).length >= 2, 'line ' + r.id + ' has at least two questions', (lByRow[r.id] || []).length));
ok(A.LISTQ.every(b => LR.some(r => r.id === b.row)), 'every list question belongs to a line');
ok(new Set(A.LISTQ.map(b => b.q)).size === A.LISTQ.length, 'no two list questions are the same');
A.LISTQ.forEach((b, i) => {
  ok(b.q && b.e, 'list question #' + i + ' has a question and a reason');
  if (b.t === 'mc') ok(b.w.length === 3 && !b.w.includes(b.a) && new Set([b.a].concat(b.w)).size === 4, 'list question #' + i + ' has four distinct options', b.q);
  else ok(b.t === 'tf' && typeof b.a === 'boolean', 'list true/false #' + i + ' has a boolean answer');
});
A.LISTQ.filter(b => b.t === 'tf').forEach((b, i) => {
  const rest = String(b.e).replace(/^(True|False)\s*[—-]\s*/, '');
  const stem = new Set(b.q.toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter(x => x.length > 4));
  const said = rest.toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter(x => x.length > 4);
  ok(!said.length || said.filter(x => stem.has(x)).length / said.length < 0.75, 'list true/false #' + i + ' is not answered by its own wording', b.q);
});
const lmc = A.LISTQ.filter(b => b.t === 'mc');
const lLongest = lmc.filter(b => llen(b.a) > Math.max(...b.w.map(llen))).length / lmc.length;
const lRatio = lmc.reduce((t, b) => t + llen(b.a) / (b.w.reduce((u, x) => u + llen(x), 0) / b.w.length), 0) / lmc.length;
ok(lLongest <= 0.30, 'on the list quiz the right answer is not the longest by habit', (lLongest * 100).toFixed(1) + '%');
ok(lRatio <= 1.10, 'and not wordier than the wrong ones', lRatio.toFixed(2));
console.log('  list quiz: ' + A.LISTQ.length + ' questions; right answer longest ' + (lLongest * 100).toFixed(1) + '%, length ratio ' + lRatio.toFixed(2));
const seenListQ = new Set();
for (let r = 0; r < 300; r++) {
  const lq = A.listQuestions();
  ok(lq.length === 24, 'a list quiz round is 24 questions', lq.length);
  ok(new Set(lq.map(q => q.row)).size === 24, 'one question for every line');
  ok(new Set(lq.map(q => q.key)).size === 24, 'no repeats in a round');
  ok(lq.every(q => q.opts.filter(o => o.ok).length === 1 && q.opts.length === (q.kind === 'tf' ? 2 : 4)), 'every list question has exactly one right answer');
  ok(lq.every(q => /On your list/.test(q.explain) && q.cue && q.ch && A.SEC_CHAPTER[q.sec] === q.tp), 'every answer shows the line again and names its cue');
  lq.forEach(q => seenListQ.add(q.key));
}
ok(seenListQ.size === A.LISTQ.length, 'over a few rounds every list question comes up', seenListQ.size + ' of ' + A.LISTQ.length);
const lkeys = A.listQuestions().map(q => q.key);
const lback = A.questionsByKeys(lkeys);
ok(lback.length === 24 && lback.every((q, i) => q.key === lkeys[i] && q.row), 'practice-the-misses rebuilds list questions');
ok(A.questionsByKeys(['list:9999']).length === 0, 'a bad list key is ignored');
const ldeck = A.listDeck();
ok(ldeck.length === 24 && ldeck.every((c, i) => c.front.includes(LR[i].cue) && c.back.includes(LR[i].line)), 'the flashcards are the list, in order');
// the 38
const allSecs = A.GUIDE.sections.flatMap(s => s.items.map(i => i.id));
for (let r = 0; r < 40; r++) {
  const f = A.finalFifty(38);
  ok(f.length === 38, 'the thirty-eight is thirty-eight questions', f.length);
  ok(new Set(f.map(q => q.key)).size === 38, 'no repeated question');
  const covered = new Set(f.map(q => q.sec));
  ok(covered.size === 24 && allSecs.every(s => covered.has(s)), 'the thirty-eight covers every section', covered.size);
  allSecs.forEach(s => ok(f.filter(q => q.sec === s).length >= 1, 'at least one question on ' + A.SEC_TITLES[s], f.filter(q => q.sec === s).length));
  ok(new Set(f.map(q => q.tp)).size === 6, 'the thirty-eight spans all six topics');
  ok(f.every(q => q.text && q.explain && q.opts.some(o => o.ok)), 'every question is answerable and explained');
  ok(f.filter(q => q.hot === 2).length >= 6, 'the thirty-eight leans on the misses', f.filter(q => q.hot === 2).length);
  const means = f.map(q => A.meaningOf(q));
  let clash = 0;
  for (let x = 0; x < means.length; x++) for (let y = x + 1; y < means.length; y++) if (A.sameThing(means[x], means[y])) clash++;
  ok(clash === 0, 'no two questions in the thirty-eight ask the same thing', clash);
}
for (let r = 0; r < 40; r++) {
  const list = r % 2 ? A.mockQuestions({ n: 40, types: 'all', focus: 'all' }) : A.topicQuestions(tps[r % 6], null, 10);
  const mn = list.map(q => A.meaningOf(q));
  let clash = 0;
  for (let x = 0; x < mn.length; x++) for (let y = x + 1; y < mn.length; y++) if (A.sameThing(mn[x], mn[y])) clash++;
  ok(clash === 0, 'no duplicate meanings in a generated quiz', clash);
}
console.log('  tiers: missed=' + byTier[2].length + ' problem-set=' + byTier[1].length + ' readings=' + byTier[0].length);

// ---------- 4. question bank ----------
head('question bank');
tps.forEach(tp => {
  const mine = A.QB.filter(q => q.tp === tp && !q.off);
  ok(mine.length >= 15, 'at least 15 questions on ' + tp, mine.length);
  ok(mine.filter(q => q.t === 'tf').length >= 3, 'true/false on ' + tp, mine.filter(q => q.t === 'tf').length);
  ok(mine.filter(q => q.ap).length >= 3, 'application questions on ' + tp, mine.filter(q => q.ap).length);
});
A.QB.forEach((q, i) => {
  ok(tps.includes(q.tp), 'known topic #' + i);
  ok(q.q && q.e, 'question and explanation #' + i);
  if (q.t === 'mc') {
    ok(q.w.length === 3, 'three wrong answers #' + i, q.q);
    ok(!q.w.includes(q.a), 'right answer not among the wrong #' + i, q.q);
    ok(new Set([q.a].concat(q.w)).size === 4, 'four distinct options #' + i, q.q);
  } else ok(q.t === 'tf' && typeof q.a === 'boolean', 'true/false has a boolean answer #' + i);
});
ok(new Set(A.QB.map(q => q.q)).size === A.QB.length, 'no duplicate questions');

head('option length is not a tell');
const mcq = A.QB.filter(q => q.t === 'mc');
const olen = s => String(s).replace(/<[^>]+>/g, '').length;
const longestShare = mcq.filter(q => olen(q.a) > Math.max(...q.w.map(olen))).length / mcq.length;
const lenRatio = mcq.reduce((t, q) => t + olen(q.a) / (q.w.reduce((u, x) => u + olen(x), 0) / q.w.length), 0) / mcq.length;
ok(longestShare <= 0.42, 'the right answer is not almost always the longest option', (longestShare * 100).toFixed(1) + '% (chance 25%, target <35%)');
ok(lenRatio <= 1.20, 'the right answer is not far wordier than the wrong ones', lenRatio.toFixed(2) + ' (target 1.00)');
console.log('  right answer longest: ' + (longestShare * 100).toFixed(1) + '%   length ratio: ' + lenRatio.toFixed(2));
mcq.forEach((q, i) => ok(!(olen(q.a) > 60 && q.w.some(x => olen(x) < 20)), 'question #' + i + ' has no throwaway distractor beside a long answer', q.q));
console.log('  questions: ' + A.QB.length);

head('question generators (100 runs)');
for (let run = 0; run < 100; run++) {
  tps.forEach(tp => {
    const qs = A.topicQuestions(tp, null, 10);
    ok(qs.length === 10, tp + ': ten questions', qs.length);
    ok(new Set(qs.map(q => q.key.replace(/r$/, ''))).size === qs.length, tp + ': no repeated question', qs.map(q => q.key).join(','));
    ok(qs.every(q => q.sec && SEC[q.sec] === tp), tp + ': every quiz question names its section', qs.map(q => q.sec).join(','));
    qs.forEach(q => {
      ok(q.opts.filter(o => o.ok).length === 1, tp + ': exactly one right answer', q.text);
      ok(new Set(q.opts.map(o => o.html)).size === q.opts.length, tp + ': options distinct', q.opts.map(o => o.html).join(' | '));
      ok(q.opts.length === (q.kind === 'tf' ? 2 : 4), tp + ': option count', q.kind + ' ' + q.opts.length);
      ok(q.tp === tp && q.explain && q.miss, tp + ': question complete');
    });
    ok(qs.filter(q => q.kind === 'id').length <= 3, tp + ': identification at most a third');
  });
  [15, 25, 38, 60].forEach(n => {
    const mx = A.mockQuestions({ n, types: 'all', topics: [] });
    ok(mx.length === n, 'practice exam fills to ' + n, mx.length);
    tps.forEach(tp => ok(mx.some(q => q.tp === tp), 'practice exam of ' + n + ' covers ' + tp));
    ok(new Set(mx.map(q => q.key)).size === mx.length, 'practice exam has no repeats');
  });
  ok(A.mockQuestions({ n: 25, types: 'tf', topics: [] }).every(q => q.kind === 'tf'), 'true/false-only exam');
  ok(A.mockQuestions({ n: 25, types: 'ap', topics: [] }).every(q => q.ap), 'application-only exam');
  ok(A.mockQuestions({ n: 15, types: 'all', topics: ['labor'] }).every(q => q.tp === 'labor'), 'single-topic exam');
}
const sampleKeys = A.topicQuestions('growth', null, 10).map(q => q.key);
const back = A.questionsByKeys(sampleKeys);
ok(back.length === sampleKeys.length && back.every((q, i) => q.key === sampleKeys[i]), 'practice-the-misses rebuilds the same questions');
ok(A.questionsByKeys(['nonsense:99', 'gdp:999999', 'c9:1']).length === 0, 'bad keys are ignored');

head('decks, match and verdicts');
tps.forEach(tp => {
  A.CH[tp].decks.forEach(d => ok(A.deckFor(tp, d.id).length === d.cards.length, 'deck loads: ' + tp + '/' + d.id));
  ok(A.deckFor(tp, A.CH[tp].decks[0].id).every(c => /Section · /.test(c.back)), 'card backs name their section: ' + tp);
  for (let run = 0; run < 30; run++) {
    const r = A.matchRound(tp, 6);
    ok(r.items.length === 6 && new Set(r.items.map(x => x.right)).size === 6 && new Set(r.items.map(x => x.left)).size === 6, tp + ' match round: six unique pairs');
  }
});
const lines = A.VERDICTS.flatMap(v => v.t.concat([v.a])).join(' | ');
ok(!/cheeks|goat|bruh|cooked|twin|\bbro\b|\bchat\b|aura|npc|crack a|\bnah\b|ain.t|dawg|\bW\b|no cap|lock in|\bhim\b|\bL\b|mid\.|headlock|trenches/i.test(lines), 'no slang anywhere in the verdicts', lines);
ok(/<b>Correct\.<\/b>/.test(src) && /<b>Not this one\.<\/b>/.test(src), 'answer feedback is plain');
[100, 90, 75, 55, 10].forEach(p => ok(!!A.verdictFor(p).t, 'verdict for ' + p));

head('markup');
const ids = [...new Set((src.match(/\$\("#([A-Za-z0-9_-]+)"/g) || []).map(s => s.slice(4, -1)))];
const dynamic = ['gCount', 'gBar', 'gPrint', 'mxN', 'mxT', 'mxP', 'mxF', 'mxStart', 'mxFifty', 'mlCover', 'mlHint', 'mlTable', 'mlQuiz', 'mlCards'];
const missing = ids.filter(id => !html.includes('id="' + id + '"') && !dynamic.includes(id));
ok(missing.length === 0, 'every element referenced by id exists', missing.join(', '));
tps.forEach(tp => ['Notes', 'Cards', 'Match', 'Quiz'].forEach(s => ok(html.includes('id="' + tp + s + '"'), 'topic root exists: ' + tp + s)));
const panels = [...new Set((html.match(/data-panel="([^"]+)"/g) || []).map(s => s.slice(12, -1)))];
panels.forEach(pn => {
  const [t, mo] = pn.split('/');
  ok(html.includes('data-modes="' + t + '"'), 'panel ' + pn + ' has a mode switch');
  ok(new RegExp('data-modes="' + t + '"[\\s\\S]*?data-mode="' + mo + '"').test(html), 'panel ' + pn + ' has its mode button');
});
['list', 'guide'].concat(tps, ['exam']).forEach(t => ok(html.includes('data-topic="' + t + '"') && html.includes('id="topic-' + t + '"'), 'topic ' + t + ' has a tab and a section'));
ok((html.match(/class="topic-btn"/g) || []).length === 9, 'nine tabs');
ok(/data-topic="list"\s+aria-selected="true"/.test(html) && html.indexOf('data-topic="list"') < html.indexOf('data-topic="formulas"') && /My List<\/button>/.test(html) && !/data-topic="start"/.test(html), 'My List is the first, default tab');
ok((html.match(/<script>/g) || []).length === 1, 'a single script block');
['div', 'section', 'button', 'nav', 'main', 'header', 'footer', 'svg', 'symbol', 'table', 'g', 'ol', 'ul', 'h3', 'h4', 'thead', 'tbody', 'tr', 'span', 'sub', 'sup'].forEach(t => {
  const open = (html.match(new RegExp('<' + t + '[\\s>]', 'g')) || []).length;
  const close = (html.match(new RegExp('</' + t + '>', 'g')) || []).length;
  ok(open === close, t + ' tags balanced', open + ' vs ' + close);
});
ok(html.includes('id="flourish"') && html.includes('id="emblem"') && html.includes('class="rail left"') && html.includes('class="emblem"'), 'ornaments, emblem and side rails present');
ok(/M34 86C44 60 58 46 84 40/.test(html), 'the emblem is the production curve');
ok(/\.formula\{/.test(html), 'formula style present');
ok(html.includes('rel="manifest"') && html.includes('sw.js') && fs.existsSync(path.join(ROOT, 'sw.js')) && fs.existsSync(path.join(ROOT, 'manifest.webmanifest')), 'PWA pieces: manifest and service worker');
ok(/"macro-v\d+"/.test(fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8')) && /Macroeconomics/.test(fs.readFileSync(path.join(ROOT, 'manifest.webmanifest'), 'utf8')), 'service worker and manifest are this page’s own');
ok(html.includes('og:image') && html.includes('/macro/preview.png'), 'link preview metadata');
ok(!/Quizlet|"mgmt\.|"pom\.|Kotler/.test(src.replace(/\/\*[\s\S]*?\*\//g, '')), 'nothing left over from the earlier pages in the code');
ok(!/The 50 |Another fifty|sixteen sections/.test(src), 'the exam button is the 38');
ok(!/�/.test(html), 'no broken characters');
console.log('  file size: ' + (fs.statSync(path.join(ROOT, 'index.html')).size / 1024).toFixed(1) + ' KB');

console.log('\n' + (fails === 0 ? 'ALL ' + checks + ' CHECKS PASSED' : fails + ' FAILURES out of ' + checks + ' checks'));
process.exit(fails ? 1 : 0);
