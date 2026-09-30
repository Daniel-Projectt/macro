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
const tps = ['gdp', 'growth', 'labor', 'prices', 'saving', 'lf', 'money', 'tvm', 'bank', 'fed', 'qtm', 'infl', 'fiscal', 'phillips', 'adas', 'formulas'];
const PREFIX = { gdp: 'gdp-', growth: 'gro-', labor: 'lab-', prices: 'pri-', saving: 'sav-', lf: 'lf-', money: 'mon-', tvm: 'tvm-', bank: 'bank-', fed: 'fed-', qtm: 'qtm-', infl: 'infl-', fiscal: 'fis-', phillips: 'pc-', adas: 'bc-', formulas: 'for-' };
const body = tp => A.CH[tp].notes.map(n => n.body).join(' ');
const allBodies = tps.map(body).join(' ');
const anchorExists = id => tps.some(tp => A.CH[tp].notes.some(n => n.id === id)) || allBodies.includes('id="' + id + '"');

// ---------- 1. the outline ----------
head('the outline');
ok(A.COURSE.code === 'Principles of Macroeconomics' && A.COURSE.term === 'The whole course' && /cumulative/.test(A.COURSE.exam), 'course and the cumulative final');
ok(/47\.07 of 60/.test(A.COURSE.scope) && /Problem Sets 1–4/.test(A.COURSE.scope), 'scope line: Exam 1 and Unit 1 at a glance');
ok(A.COURSE.rules.length === 6 && /\$ sign/.test(A.COURSE.rules[0]) && /True, false or uncertain/.test(A.COURSE.rules[1]) && /Inflation/.test(A.COURSE.rules[2]) && /misses/.test(A.COURSE.rules[3]) && /Formulas tab/.test(A.COURSE.rules[4]) && /calculator/.test(A.COURSE.rules[5]), 'the six instructions');
const HEADS = ['Intro to Macro and GDP', 'Long-Run Growth and the Solow Model', 'The Labor Market', 'Price Levels, CPI and Inflation', 'Saving and Investment', 'Loanable Funds and the Real Interest Rate', 'Money and the Liquidity Preference Model', 'Time Value of Money', 'Banking and Money Creation', 'The Federal Reserve and Monetary Policy', 'Money Growth and Inflation', 'Inflation and Deflation', 'Fiscal Policy', 'The Phillips Curve', 'Business Cycles and the AD–AS Model', 'Formulas — What Divides by What'];
ok(A.GUIDE.sections.length === 16 && A.GUIDE.sections.every((s, i) => s.tp === tps[i] && s.h === HEADS[i]), 'fifteen units in class order, then the formulas', A.GUIDE.sections.map(s => s.h).join(' | '));
const OUTLINE = {
  gdp: ['Macro Basics', 'GDP and the Expenditure Approach', 'What Counts in GDP', 'Limits of GDP', 'Real vs Nominal GDP'],
  growth: ['Growth Facts, Per Capita and the Rule of 70', 'Catch-up vs Innovative Growth, Factors, Diminishing Returns', 'The Solow Model and the Steady State', 'What Shifts What', 'Policy, Institutions and Solow’s Weaknesses'],
  labor: ['Classifying People', 'The Rates and the Worked Examples', 'Types of Unemployment and the Natural Rate', 'How the Rates Move, U-3, Technology and Work'],
  prices: ['CPI, the Deflator and Converting Dollars', 'Inflation, Disinflation, Deflation and the CPI’s Bias'],
  saving: ['National Saving and the Open Economy', 'Investment and Direct vs Indirect Financing'],
  money: ['What Money Is', 'Measuring the Money Supply', 'Money Demand and the Liquidity Preference Model', 'More Money: Short Run Down, Long Run Up'],
  tvm: ['Discounting and Present Value', 'Compounding and Future Value', 'Depreciation', 'Risk, Simple vs Compound Interest, and the Takeaways'],
  bank: ['Fractional Reserve Banking and the T-Account', 'Money Creation and the Money Multiplier'],
  fed: ['Monetary Policy and the Dual Mandate', 'Structure, Independence and the Five Functions', 'The Six Tools of Monetary Policy', 'The Market for Reserves', 'Difficulties, and Rules versus Discretion'],
  qtm: ['The Value of Money: Money Supply and Money Demand', 'The Exchange Equation and the Quantity Theory', 'How More Money Raises Prices, and the Two Reserve Regimes'],
  infl: ['The Inflation Fallacy, the Seven Costs, and Hyperinflation', 'Why Low, Stable Inflation Helps: The Two Benefits', 'Good and Bad Deflation, and Inflation Expectations', 'Tax Distortions and Inflation'],
  fiscal: ['Fiscal Policy and the Multipliers', 'When Fiscal Policy Works, Its Eight Limits, and Automatic Stabilizers'],
  phillips: ['From Keynes to Stagflation: The Original Phillips Curve', 'Expectations, the Long-Run Curve, and the Three Graphing Rules'],
  adas: ['Business Cycles and What Causes Them', 'The AD–AS Model', 'Shocks and Policy in AD–AS'],
  lf: ['Interest Rates: Nominal and Real', 'The Loanable Funds Model', 'Shifts: What Happens to r and Investment', 'Crowding Out, Deficits and Debt'],
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
ok(items.length === 57 && new Set(items.map(i => i.id)).size === 57, 'fifty-seven sections, unique ids');

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
ok(Object.keys(SEC).length === 57 && Object.keys(A.SEC_TITLES).length === 57, 'fifty-seven sections known to the engine');
for (let i = 0; i < A.QB.length; i++) ok(A.QB[i] && typeof A.QB[i] === 'object', 'no empty slot in the question list at #' + i);
A.QB.forEach((q, i) => ok(q.sec && SEC[q.sec] === q.tp, 'question #' + i + ' is tagged with a section of its own topic', q.sec + ' / ' + q.q.slice(0, 60)));
tps.forEach(tp => A.CH[tp].decks.forEach(d => d.cards.forEach(c => ok(c[2] && SEC[c[2]] === tp, 'card is tagged with a section of its topic: ' + c[0], c[2]))));
Object.keys(SEC).forEach(id => ok(A.CH[SEC[id]].decks.some(d => d.cards.some(c => c[2] === id)), 'at least one flashcard for “' + A.SEC_TITLES[id] + '”'));
console.log('  questions per section: ' + Object.keys(SEC).map(id => id.replace(/^g-/, '') + '=' + A.QB.filter(q => q.sec === id).length).join(' '));

// ---------- 3c. the source tiers ----------
head('where questions come from');
ok(A.TIERS.length === 4 && A.TIERS.map(t => t.w).join() === '3,2,1,0', 'four source tiers, misses first');
ok(/Exam 1/.test(A.TIERS[0].t) && /problem set/.test(A.TIERS[1].t) && /Problem-set/.test(A.TIERS[2].t) && /readings/.test(A.TIERS[3].t), 'tier labels');
A.QB.forEach((q, i) => ok(q.hot === (q.m || 0) && [0, 1, 2, 3].includes(q.hot) && (q.hot !== 3 || q.ex), 'question #' + i + ' carries its source tier'));
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
  [['exam1', 3], ['misses', 2], ['ps', 1], ['rest', 0]].forEach(([f, want]) => {
    const got = A.mockQuestions({ n: n, types: 'all', focus: f });
    if (want === 2) ok(got.length >= 12, 'focus ' + f + ' draws the misses', got.length);
    else if (want === 3) ok(got.length === Math.min(n, 10), 'focus ' + f + ' draws the Exam 1 misses', got.length);
    else if (n <= 25 || want === 1) ok(got.length === n, 'focus ' + f + ' fills the exam', got.length + '/' + n);
    ok(got.every(q => (q.hot || 0) === want), 'focus ' + f + ' draws only that tier');
    ok(got.every(q => q.sec && A.SEC_CHAPTER[q.sec] === q.tp), 'focus ' + f + ' questions name their section');
    if (want < 2 && n >= 2 * wantTopics[want].length) ok(wantTopics[want].every(tp => got.some(q => q.tp === tp)), 'focus ' + f + ' spreads across every topic that has that tier', wantTopics[want].join(',') + ' vs ' + [...new Set(got.map(q => q.tp))].join(','));
  });
  ok(A.mockQuestions({ n: n, types: 'ap', focus: 'rest' }).every(q => q.ap && !(q.hot || 0)), 'the filters combine: application questions from the readings');
  ok(A.mockQuestions({ n: n, types: 'mc', focus: 'ps' }).every(q => q.kind !== 'tf' && q.hot === 1), 'the filters combine: multiple choice, problem-set style');
}
ok(seenTiers.size === 4, 'unfiltered exams draw on all four tiers', [...seenTiers].join(','));
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
const seenListQ = new Set(), listKinds = new Set();
for (let r = 0; r < 300; r++) {
  const lq = A.listQuestions();
  ok(lq.length === 24, 'a list quiz round is 24 questions', lq.length);
  ok(new Set(lq.map(q => q.row)).size === 24, 'one question for every line');
  ok(new Set(lq.map(q => q.key)).size === 24, 'no repeats in a round');
  ok(lq.every(q => q.opts.filter(o => o.ok).length === 1 && q.opts.length >= (q.kind === 'tf' ? 2 : 3) && new Set(q.opts.map(o => o.html)).size === q.opts.length), 'every list question has exactly one right answer among distinct options');
  ok(lq.every(q => /On your list/.test(q.explain) && q.cue && q.ch && A.SEC_CHAPTER[q.sec] === q.tp), 'every answer shows the line again and names its cue');
  lq.forEach(q => { if (/^list:/.test(q.key)) seenListQ.add(q.key); listKinds.add(q.key.split(':')[0]); });
}
ok(seenListQ.size === A.LISTQ.length, 'over a few rounds every written question comes up', seenListQ.size + ' of ' + A.LISTQ.length);
ok(['list', 'lgen', 'lid'].every(k => listKinds.has(k)), 'a round mixes written questions, new-number problems and picking the line', [...listKinds].join(','));
['gdp', 'real', 'counts', 'defl', 'double', 'steady', 'rates', 'types', 'cpi', 'infl', 'convert', 'saving', 'open'].forEach(id => ok((A.LIST_GENS[id] || []).length >= 1, 'formula line ' + id + ' gets problems with new numbers'));
for (let r = 0; r < 20; r++) {
  const lq0 = A.listQuestions(), lkeys = lq0.map(q => q.key), lback = A.questionsByKeys(lkeys);
  ok(lback.length === 24 && lback.every((q, i) => q.row === lq0[i].row && (q.key.split(':')[0] === lkeys[i].split(':')[0] || /^list:/.test(q.key))), 'practice-the-misses rebuilds the same kind of question for the same line');
  ok(lback.every(q => /On your list/.test(q.explain) && q.opts.filter(o => o.ok).length === 1), 'rebuilt questions are complete');
}
ok(A.questionsByKeys(['list:9999']).length === 0, 'a bad list key is ignored');
const ldeck = A.listDeck();
ok(ldeck.length === 24 && ldeck.every((c, i) => c.front.includes(LR[i].cue) && c.back.includes(LR[i].line)), 'the flashcards are the list, in order');
// the Exam 2 set: 33 questions, every Unit 2 section
const u2Secs = A.GUIDE.sections.filter(s => A.UNIT2.includes(s.tp)).flatMap(s => s.items.map(i => i.id));
for (let r = 0; r < 20; r++) {
  const f2 = A.finalFifty(33, A.UNIT2);
  ok(f2.length === 33 && new Set(f2.map(q => q.key)).size === 33, 'the Exam 2 set is 33 different questions', f2.length);
  ok(u2Secs.every(s => f2.some(q => q.sec === s)) && f2.every(q => A.UNIT2.includes(q.tp)), 'the Exam 2 set covers every Unit 2 section and nothing else');
}
// the Final set: 40 questions from the whole course
for (let r = 0; r < 10; r++) {
  const ff = A.finalFifty(40, A.CHAPTERS);
  ok(ff.length === 40 && new Set(ff.map(q => q.key)).size === 40, 'the Final set is 40 different questions', ff.length);
  ok([A.UNIT1, A.UNIT2, A.UNIT3].every(u => ff.some(q => u.includes(q.tp))), 'the Final set reaches all three units');
}
// the 38
const allSecs = A.GUIDE.sections.filter(s => A.UNIT1.includes(s.tp)).flatMap(s => s.items.map(i => i.id));
for (let r = 0; r < 40; r++) {
  const f = A.finalFifty(38);
  ok(f.length === 38, 'the thirty-eight is thirty-eight questions', f.length);
  ok(new Set(f.map(q => q.key)).size === 38, 'no repeated question');
  const covered = new Set(f.map(q => q.sec));
  ok(covered.size === 24 && allSecs.every(s => covered.has(s)), 'the thirty-eight covers every section', covered.size);
  allSecs.forEach(s => ok(f.filter(q => q.sec === s).length >= 1, 'at least one question on ' + A.SEC_TITLES[s], f.filter(q => q.sec === s).length));
  ok(new Set(f.map(q => q.tp)).size === 6, 'the thirty-eight spans the six Unit 1 topics');
  ok(f.every(q => q.text && q.explain && q.opts.some(o => o.ok)), 'every question is answerable and explained');
  ok(f.filter(q => q.hot >= 2).length >= 6, 'the thirty-eight leans on the misses', f.filter(q => q.hot >= 2).length);
  const means = f.map(q => A.meaningOf(q));
  let clash = 0;
  for (let x = 0; x < means.length; x++) for (let y = x + 1; y < means.length; y++) if (A.sameThing(means[x], means[y])) clash++;
  ok(clash === 0, 'no two questions in the thirty-eight ask the same thing', clash);
}
for (let r = 0; r < 40; r++) {
  const list = r % 2 ? A.mockQuestions({ n: 40, types: 'all', focus: 'all' }) : A.topicQuestions(tps[r % tps.length], null, 10);
  const mn = list.map(q => A.meaningOf(q));
  let clash = 0;
  for (let x = 0; x < mn.length; x++) for (let y = x + 1; y < mn.length; y++) if (A.sameThing(mn[x], mn[y])) clash++;
  ok(clash === 0, 'no duplicate meanings in a generated quiz', clash);
}
console.log('  tiers: missed=' + byTier[2].length + ' problem-set=' + byTier[1].length + ' readings=' + byTier[0].length);

// ---------- math practice ----------
head('math practice');
const calc = s => {
  const js = String(s).replace(/\$/g, '').replace(/(\d),(?=\d{3}\b)/g, '$1').replace(/−/g, '-').replace(/×/g, '*').replace(/÷/g, '/')
    .replace(/√\(/g, 'Math.sqrt(').replace(/√([\d.]+)/g, 'Math.sqrt($1)').replace(/∛([\d.]+)/g, 'Math.cbrt($1)').replace(/²/g, '**2').replace(/e\^/g, 'Math.E**').replace(/\^/g, '**');
  if (/[^0-9+\-*/(). MathsqrcbE]/.test(js)) return NaN;
  try { return Function('"use strict"; return (' + js + ');')(); } catch (e) { return NaN; }
};
const numsIn = t => (String(t).replace(/\$/g, '').match(/−?\d[\d,]*\.?\d*/g) || []).map(x => parseFloat(x.replace(/,/g, '').replace('−', '-')));
ok(A.GENS.length >= 20, 'enough kinds of problem', A.GENS.length);
['gdp', 'growth', 'solow', 'labor', 'prices', 'saving'].forEach(t => ok(A.GENS.some(g => g.topic === t), 'practice covers ' + t));
ok(A.GENS.every(g => g.name && g.remind && g.topic), 'every kind of problem has a name and a reminder');
ok(A.GENS.filter(g => g.row).every(g => A.LIST_ROWS.some(r => r.id === g.row)), 'the reminders point at real lines of the list');
[['$4,700', 4700], ['4700', 4700], ['33.33%', 33.33], ['−200', -200], ['-$200', -200], ['(200)', -200], ['2.7 million', 2700000], ['1.2 billion', 1200000000], ['.5', 0.5], ['$1,234.50', 1234.5], ['14 years', 14]]
  .forEach(([s, v]) => ok(Math.abs(A.parseAnswer(s) - v) < 1e-6, 'reads a typed answer: ' + s, A.parseAnswer(s)));
['', 'abc', '1.2.3', '   '].forEach(s => ok(A.parseAnswer(s) === null, 'rejects "' + s + '"'));
const pc = {a: 33.33, d: 2, unit: '%'};
ok(A.checkPart('33.33', pc).ok && A.checkPart('33.33%', pc).ok && !A.checkPart('33.3', pc).ok && !A.checkPart('25', pc).ok, 'a percent must be right to the second decimal');
ok(A.checkPart('0.3333', pc).slip === 'decimal', 'a decimal typed for a percent is spotted');
ok(A.checkPart('-33.33', pc).slip === 'sign', 'a wrong sign is spotted');
ok(A.checkPart('', pc).blank, 'a blank box is not marked');
const cnt = {a: 42300000, d: 0, unit: ''};
ok(A.checkPart('42,300,000', cnt).ok && A.checkPart('42.3 million', cnt).ok && !A.checkPart('42,000,000', cnt).ok, 'a count must be exact — every digit');
const yn = {kind: 'word', accept: ['yes', 'y']};
ok(A.checkPart('yes', yn).ok && A.checkPart('Yes!', yn).ok && !A.checkPart('no', yn).ok && A.checkPart('', yn).blank, 'yes-or-no answers are read');
// every generator, every variant, many times: the math has to check out
let partsSeen = 0;
const checkBase = (id, b) => {
  ok(b && typeof b.text === 'string' && b.text.length > 20, id + ': a scenario');
  if (b.choice && !(b.parts && b.parts.length)) {
    ok(b.choice.opts.length >= 3 && b.choice.opts[b.choice.right] && b.choice.work && new Set(b.choice.opts).size === b.choice.opts.length, id + ': a complete choice question');
    return;
  }
  ok(Array.isArray(b.parts) && b.parts.length >= 1, id + ': at least one thing to find');
  b.parts.concat(b.multi || []).forEach(p => {
    if (p.kind === 'word') { ok(p.accept && p.accept.length && p.shown && p.work && p.label, id + '/' + p.key + ': a complete yes-or-no part'); return; }
    partsSeen++;
    ok(p.key && p.name && typeof p.a === 'number' && isFinite(p.a) && typeof p.d === 'number' && p.work, id + '/' + p.key + ': a complete part', JSON.stringify(p).slice(0, 160));
    ok(numsIn(p.work).some(n => Math.abs(n - p.a) <= (p.d ? Math.pow(10, -p.d) : 0.5) + 1e-9), id + '/' + p.key + ': the working reaches the answer', p.work + ' || ' + p.a);
    ok(A.checkPart(A.shown(p), p).ok, id + '/' + p.key + ': typing the answer as shown counts as right', A.shown(p));
    const w = A.wrongFor(p);
    ok(w.length === 3 && new Set(w.map(x => A.show(x, p.unit, p.d))).size === 3 && w.every(x => A.show(x, p.unit, p.d) !== A.shown(p)), id + '/' + p.key + ': three different wrong answers', w.join(', ') + ' vs ' + A.shown(p));
    ok(w.every(x => !A.checkPart(A.show(x, p.unit, p.d), p).ok), id + '/' + p.key + ': a wrong answer is never marked right');
    if (!p.signed) ok(w.every(x => x >= 0), id + '/' + p.key + ': no negative distractor where the answer cannot be negative', w.join(', '));
    if (p.setup) {
      const rv = calc(p.setup.right);
      ok(Math.abs(rv - p.a) <= Math.max(0.02, (p.d ? 0.5 * Math.pow(10, -p.d) : 0.5) + 1e-9, Math.abs(p.a) * 0.003), id + '/' + p.key + ': the right calculation gives the answer', p.setup.right + ' = ' + rv + ' vs ' + p.a);
      ok(p.setup.wrong.length >= 3, id + '/' + p.key + ': three wrong calculations');
      p.setup.wrong.forEach(x => ok(isFinite(calc(x)) && A.show(calc(x), p.unit, p.d) !== A.shown(p), id + '/' + p.key + ': a wrong calculation never gives the answer', x + ' = ' + calc(x)));
    }
  });
};
A.GENS.forEach(g => {
  const vs = g.variants ? Array.from({length: g.variants}, (_, i) => i + 1) : [undefined];
  vs.forEach(v => { for (let r = 0; r < 150; r++) checkBase(g.id + (v ? '/' + v : ''), g.make(v)); });
});
A.FIXED.forEach(f => checkBase(f.id, f.make()));
console.log('  practice: ' + A.GENS.length + ' kinds of problem, ' + A.FIXED.length + ' class and problem-set problems, ' + partsSeen + ' parts checked');
// the professor's own numbers
const fx = id => A.FIXED_BY_ID[id].make();
const part = (b, key) => b.parts.find(p => p.key === key).a;
// Exam 1: the real answers, worked out independently
ok(['pri', 'pub', 'inv'].map(k => part(fx('ex1-saving'), k)).join() === [2000 - 700 - 1200, 700 - 500, 2000 - 1200 - 500].join(), 'Exam 1 Q11: saving with a surplus');
ok(['nom2024', 'nom2025', 'real2024', 'real2025', 'pc2024', 'pc2025'].map(k => part(fx('ex1-leaf'), k)).join() === [10*150 + 3*1000, 9*175 + 3.5*1200, 9*150 + 3.5*1000, 9*175 + 3.5*1200, 48.5, 52.5].join(), 'Exam 1 Q17: Longbottom Leaf');
ok(['d2024', 'd2025', 'inf'].map(k => part(fx('ex1-deflator'), k)).join() === [100, 1150 / 920 * 100, (1150 / 920 * 100 - 100)].join(), 'Exam 1 Q23: deflator and inflation');
ok(part(fx('ex1-hogsville'), 'yrs') === 70 / 1.4, 'Exam 1 Q24: rule of 70');
ok(['LF', 'u', 'lfpr', 'epr'].map(k => part(fx('ex1-labor'), k)).join() === [150e6, 20, 75, 60].join(), 'Exam 1 Q25: labor');
const b27 = [10*3 + 6*2, 10*3.75 + 6*2.5]; const c27 = b27[0] / b27[1] * 100;
ok(['cost2024', 'cost2025', 'cpi2024', 'cpi2025', 'inf'].map(k => part(fx('ex1-basket'), k)).join() === [b27[0], b27[1], c27, 100, (100 - c27) / c27 * 100].join(), 'Exam 1 Q27: notebooks and tea');
ok(['E', 'u'].map(k => part(fx('ex1-fairmont'), k)).join() === [0.75 * 20e6, 5 / 20 * 100].join(), 'Exam 1 Q37: Fairmont');
const exQ = A.QB.filter(q => q.ex);
ok(exQ.length === 35 && exQ.filter(q => q.m === 3).length === 10, 'every Exam 1 multiple-choice question is in, ten misses marked', exQ.length + ' / ' + exQ.filter(q => q.m === 3).length);
exQ.filter(q => q.m === 3).forEach(q => ok(/Exam 1/.test(q.e), 'an Exam 1 miss says so', q.q));
ok(A.exam1Questions().length === 35, 'Exam 1 again draws them all');
ok(['nom2023', 'nom2024', 'nom2025', 'real2023', 'real2024', 'real2025'].map(k => part(fx('class-gdp'), k)).join() === '200,600,1200,200,350,500', 'class exercise: nominal and real GDP (hot dogs and hamburgers)');
ok(part(fx('class-growth'), 'mexico') === 2.46 && part(fx('class-growth'), 'china') === 5.31, 'class exercise: Mexico 2.46%, China 5.31%');
ok(part(fx('class-labor'), 'LF') === 1800 && part(fx('class-labor'), 'u') === 11.11 && part(fx('class-labor'), 'lfpr') === 56.25 && part(fx('class-labor'), 'epr') === 50, 'class exercise: 1,800, 11.11%, 56.25%, 50%');
ok(part(fx('class-cpi'), 'cost2024') === 89.75 && part(fx('class-cpi'), 'cost2025') === 93 && part(fx('class-cpi'), 'cpi2025') === 103.62 && part(fx('class-cpi'), 'inf') === 3.62, 'class exercise: $89.75, $93.00, 103.62, 3.62%');
ok(['y2', 'y3', 'mp2', 'mp3', 'mp4'].map(k => part(fx('class-mpk'), k)).join() === '1.41,1.73,0.41,0.32,0.27', 'class table: diminishing returns');
ok(part(fx('class-70'), 'yrs') === 35, 'class example: 70 ÷ 2 = 35 years');
ok(part(fx('ps2-solow'), 'Y') === 8.94 && part(fx('ps2-steady'), 'K') === 121 && part(fx('ps2-steady'), 'C') === 10.89, 'problem set 2: the Solow numbers');
ok(part(fx('ps3-gondor'), 'E') === 42300000 && part(fx('ps3-osgiliath'), 'nat') === 2 && part(fx('ps4-basket'), 'inf') === 33.33 && part(fx('ps1-gondor'), 'gdp') === 6200, 'the problem-set misses keep their numbers');
// every problem can be asked every way
const allowed = {mixed: ['type', 'multi', 'mc', 'tf', 'setup', 'choice'], type: ['type', 'multi', 'choice'], mc: ['mc', 'tf', 'setup', 'choice']};
const checkQ = (label, q, fmt) => {
  ok(allowed[fmt].includes(q.fmt), label + ' (' + fmt + '): an allowed format', q.fmt);
  ok(q.text && q.name && q.remind && q.topicName, label + ': a complete question');
  if (q.opts) {
    ok(q.opts.filter(o => o.ok).length === 1, label + ': exactly one right option', q.opts.map(o => o.html).join(' | '));
    ok(new Set(q.opts.map(o => o.html)).size === q.opts.length && q.opts.length >= (q.fmt === 'tf' ? 2 : 3), label + ': distinct options', q.opts.map(o => o.html).join(' | '));
    if (q.fmt === 'mc') ok(q.opts.find(o => o.ok).html === A.shown(q.parts[0]), label + ': the right option is the answer');
    if (q.fmt === 'tf') ok((A.show(q.claimed, q.parts[0].unit, q.parts[0].d) === A.shown(q.parts[0])) === q.opts[0].ok, label + ': true means the claim is the answer');
    if (q.fmt === 'setup') q.opts.forEach(o => ok(o.ok === (A.show(calc(o.html), q.parts[0].unit, q.parts[0].d) === A.shown(q.parts[0])) || (o.ok && Math.abs(calc(o.html) - q.parts[0].a) <= Math.max(0.02, (q.parts[0].d ? 0.5 * Math.pow(10, -q.parts[0].d) : 0.5) + 1e-9, Math.abs(q.parts[0].a) * 0.003)), label + ': only the right calculation gives the answer', o.html));
  } else {
    ok(q.parts && q.parts.length >= 1, label + ': boxes to type in');
    if (q.fmt === 'multi') ok(q.parts.length >= 2, label + ': several parts');
  }
};
A.GENS.forEach(g => ['mixed', 'type', 'mc'].forEach(fmt => { for (let r = 0; r < 25; r++) checkQ(g.id, A.formatProblem(g, A.baseOf(g), fmt), fmt); }));
A.FIXED.forEach(f => ['mixed', 'type', 'mc'].forEach(fmt => { for (let r = 0; r < 10; r++) checkQ(f.id, A.formatProblem(A.GEN_BY_ID[f.gen], A.baseOf(null, 0, f.id), fmt), fmt); }));
// the practice sets
for (let r = 0; r < 30; r++) {
  [10, 20, 40].forEach(n => {
    const qs = A.practiceQuestions({topic: 'all', format: 'mixed', source: 'mixed', n: n});
    ok(qs.length === n && new Set(qs.map(q => q.key)).size === n, 'a set of ' + n + ', no repeats', qs.length);
    if (n === 40) ok(new Set(A.practiceQuestions({topic: 'all', format: 'mixed', source: 'fresh', n: 160}).map(q => q.topic)).size === A.PRACTICE_TOPICS.length - 1, 'a long run reaches every practice topic', [...new Set(qs.map(q => q.topic))].join(','));
  });
  ['gdp', 'growth', 'solow', 'labor', 'prices', 'saving'].forEach(t => ok(A.practiceQuestions({topic: t, n: 10}).every(q => q.topic === t), 'only ' + t + ' when asked'));
  ok(A.practiceQuestions({topic: 'all', format: 'type', n: 20}).every(q => q.fmt === 'type' || q.fmt === 'multi'), 'type-the-answer sets have only typed answers');
  ok(A.practiceQuestions({topic: 'all', format: 'mc', n: 20}).every(q => ['mc', 'tf', 'setup', 'choice'].includes(q.fmt)), 'tap-an-answer sets have only tapped answers');
  ok(A.practiceQuestions({topic: 'all', source: 'fresh', n: 20}).every(q => !q.fixed), 'new numbers only when asked');
  const cls = A.practiceQuestions({topic: 'all', source: 'class', n: 40});
  ok(cls.length === A.FIXED.filter(f => !/^Exam 1/.test(f.src)).length && cls.every(q => q.fixed && q.src && !/^Exam 1/.test(q.src)), 'every class and problem-set problem, once each', cls.length);
  const ex1 = A.practiceQuestions({topic: 'all', source: 'exam', n: 40});
  ok(ex1.length === 7 && ex1.every(q => /^Exam 1/.test(q.src)), 'the seven Exam 1 calculations, once each', ex1.length);
  const one = A.practiceQuestions({gen: 'sol-atk', n: 10});
  ok(one.length === 10 && one.every(q => q.gen === 'sol-atk'), 'one formula only');
}
const firstSet = A.practiceQuestions({topic: 'all', n: 20});
const again = A.practiceQuestions({again: firstSet.map(q => ({gen: q.gen, v: q.v, fixed: q.fixed, fmt: q.fmt, part: q.part}))});
ok(again.length === 20 && again.every((q, i) => q.gen === firstSet[i].gen && (q.fmt === firstSet[i].fmt || (firstSet[i].fmt === 'setup' && q.fmt === 'type'))), 'practice the misses: the same kinds of problem again');
ok(again.every((q, i) => !firstSet[i].fixed || q.fixed === firstSet[i].fixed), 'a missed class problem comes back as itself');
const bag = A.bagOf(A.GENS.slice(0, 4), {[A.GENS[0].id]: [1, 0], [A.GENS[1].id]: [1, 1]});
ok(bag.length === 5 && bag.filter(g => g === A.GENS[0]).length === 2, 'a recently missed kind of problem comes up twice as often');

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
A.QB.filter(q => q.t === 'tf').forEach(q => ok(String(q.e).replace(/^(True|False)[.\s—-]*/, '').length > 25, 'every true/false says why: ' + q.q.slice(0, 60), q.e));
// questions are shuffled, so none may lean on another one's numbers
const LEANS = /^(Same |In that )|again|same data|that (chain|economy|spreadsheet|model|basket|town)|^With 2025 as the base year/i;
A.QB.concat(A.LISTQ).forEach((q, i) => ok(!LEANS.test(q.q), 'question stands on its own: ' + q.q.slice(0, 70)));

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
    if (n >= tps.length * 2) tps.forEach(tp => ok(mx.some(q => q.tp === tp), 'practice exam of ' + n + ' covers ' + tp));
    else ok(new Set(mx.map(q => q.tp)).size >= Math.min(n, tps.length) - 2, 'a short practice exam still spreads across topics', new Set(mx.map(q => q.tp)).size);
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
const dynamic = ['gCount', 'gBar', 'gPrint', 'mxN', 'mxT', 'mxP', 'mxF', 'mxStart', 'mxFifty', 'mlCover', 'mlHint', 'mlTable', 'mlQuiz', 'mlCards', 'pxT', 'pxG', 'pxF', 'pxS', 'pxN', 'pxStart'];
const missing = ids.filter(id => !html.includes('id="' + id + '"') && !dynamic.includes(id));
ok(missing.length === 0, 'every element referenced by id exists', missing.join(', '));
tps.forEach(tp => ['Notes', 'Cards', 'Match', 'Quiz'].forEach(s => ok(html.includes('id="' + tp + s + '"'), 'topic root exists: ' + tp + s)));
const panels = [...new Set((html.match(/data-panel="([^"]+)"/g) || []).map(s => s.slice(12, -1)))];
panels.forEach(pn => {
  const [t, mo] = pn.split('/');
  ok(html.includes('data-modes="' + t + '"'), 'panel ' + pn + ' has a mode switch');
  ok(new RegExp('data-modes="' + t + '"[\\s\\S]*?data-mode="' + mo + '"').test(html), 'panel ' + pn + ' has its mode button');
});
['list', 'practice', 'guide'].concat(tps, ['exam']).forEach(t => ok(html.includes('data-topic="' + t + '"') && html.includes('id="topic-' + t + '"'), 'topic ' + t + ' has a tab and a section'));
ok((html.match(/class="topic-btn"/g) || []).length === 21, 'twenty-one tabs');
// ---------- readings ----------
head('readings');
const built = A.READINGS.filter(r => r.q);
ok(built.length >= 1 && A.READINGS.length === 7, 'reading quizzes 10-16 listed, at least one built', built.length + ' / ' + A.READINGS.length);
let rdLongest = 0, rdN = 0;
built.forEach(r => {
  ok(/The thesis/.test(r.start), r.id + ': opens with the thesis');
  ok(new Set(r.q.map(b => b.q)).size === r.q.length, r.id + ': no duplicate questions');
  r.q.forEach((b, i) => {
    ok(b.e && b.e.length > 25, r.id + ' #' + i + ': explains why', b.q);
    if (b.t === 'mc') {
      ok(b.w.length === 3 && !b.w.includes(b.a) && new Set(b.w).size === 3, r.id + ' #' + i + ': three distinct wrong answers');
      rdN++; if (b.a.length > Math.max(...b.w.map(w => w.length))) rdLongest++;
    } else ok(b.a === true || b.a === false, r.id + ' #' + i + ': true/false has a boolean answer');
  });
  const qs = A.readingQuestions(r.id);
  ok(qs.length === r.q.length && qs.every(q => q.opts.filter(o => o.ok).length === 1), r.id + ': every practice question has exactly one right answer');
  ok(A.questionsByKeys(qs.map(q => q.key)).length === qs.length, r.id + ': misses can be practiced again by key');
});
// the reading quizzes already taken: word for word, scores must match the picks
ok(A.PAST_RQ.length === 9 && A.PAST_RQ.every((p, i) => p.n === i + 1 && p.qs.length === 5), 'reading quizzes 1-9, five questions each');
A.PAST_RQ.forEach(p => {
  ok(p.qs.filter(b => b.mine === b.right).length === p.score, 'quiz #' + p.n + ': the score matches the picks', p.score);
  p.qs.forEach((b, i) => {
    ok(b.o.length === 4 && b.mine >= 0 && b.mine < 4 && b.right >= 0 && b.right < 4, 'quiz #' + p.n + ' q' + (i + 1) + ': four options, valid picks');
    ok(!b.likely || b.mine !== b.right, 'quiz #' + p.n + ' q' + (i + 1) + ': "most likely" only on a miss');
    if (b.mine !== b.right) ok(b.why && b.why.length > 25, 'quiz #' + p.n + ' q' + (i + 1) + ': a miss explains the answer');
  });
});
const ps = A.pastStats();
ok(ps.n === 45 && ps.missed === 7 && ps.sure === 39, 'past quizzes: 45 questions, 7 misses, 39 answers known', JSON.stringify(ps));
ok(ps.longest === 32, 'past quizzes: the right answer was the longest 32 of 39 times (quoted in How he asks)', ps.longest);
const allPast = A.pastQuestions(), missPast = A.pastQuestions(b => b.mine !== b.right);
ok(allPast.length === 45 && missPast.length === 7, 'past quiz runs: all 45, or the 7 misses');
ok(allPast.every(q => q.opts.filter(o => o.ok).length === 1), 'every past question has exactly one right answer');
ok(A.questionsByKeys(missPast.map(q => q.key)).length === 7, 'past misses can be practiced again by key');
ok(A.rdQuestions('past3', 5).length === 5 && A.rdQuestions('rq10', 5).length === 5, 'the real thing draws five');
const rq10 = A.READINGS.find(r => r.id === 'rq10');
ok(rq10.q.length >= 30 && rq10.cards.length >= 25 && rq10.match.length >= 10, 'Stein: 30+ questions, 25+ flashcards, 10+ who-said-what pairs', rq10.q.length + '/' + rq10.cards.length + '/' + rq10.match.length);
ok(new Set(rq10.match.map(m => m[0])).size === rq10.match.length && new Set(rq10.match.map(m => m[1])).size === rq10.match.length, 'Stein: who-said-what has no duplicate names or sayings');
ok(rdLongest / rdN <= 0.45, 'readings: the right answer is not usually the longest', (100 * rdLongest / rdN).toFixed(1) + '%');
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
