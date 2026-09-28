/* ================================================================ the course
   The First Exam in Principles of Macroeconomics: everything through Sep 24,
   built from Problem Sets 1–4 and the two Solow documents. Nineteen sections. */
var COURSE = {
 code:"Principles of Macroeconomics", term:"First Exam",
 exam:"First Exam — Tuesday, September 29",
 scope:"Opens 12:30 pm, closes 1:45 pm · <b>38 questions, 60 points, 75 minutes</b> · everything through September 24: Problem Sets 1–4, <i>Brief Summary of the Solow Growth Model</i>, <i>Mathematical Example of the Solow Model</i>, <i>Pitfalls in GDP Accounting</i>",
 rules:[
  "Type calculations exactly as asked — dollar signs, commas and percent signs.",
  "Review your problem-set misses first — every question they touch is marked.",
  "Know the formulas cold: the Formulas tab drills what divides by what and the steps of every calculation.",
  "Expect the problem-set styles: fill-in calculations plus concept multiple choice."],
 about:"Each heading below is one section of the exam's material. Every question and flashcard is tagged with its section and with where it comes from — a problem-set question you missed, a problem-set-style question, or a concept from the readings."
};

var GUIDE = {sections:[
 {h:"Intro to Macro and GDP", tp:"gdp", items:[
  {id:"g-gdp-basics", t:"Macro Basics", a:"gdp-basics",
   short:"Macro policy goals: steady growth, high employment, stable prices. Micro is one café’s coffee demand; macro is inflation, national unemployment, stabilization policy. Microfoundation models rest on behavioral assumptions; ad hoc models do not. The fallacy of composition: what is true for one part need not be true for the whole.",
   subs:[["Goals, micro vs macro","gdp-basics"],["Fallacy of composition","gdp-fallacy"]]},
  {id:"g-gdp-def", t:"GDP and the Expenditure Approach", a:"gdp-def",
   short:"GDP = the market value of all final goods and services produced within a country in a period. GDP = C + I + G + (X − M). Firm machinery is I, not C; transfers are excluded; an import raises I (or C) and M equally, so GDP is unchanged; the identity is an accounting tautology.",
   subs:[["The definition","gdp-def"],["C + I + G + NX","gdp-expenditure"]]},
  {id:"g-gdp-counts", t:"What Counts in GDP", a:"gdp-counts",
   short:"Only final goods — the final sale equals the sum of value added. Not counted: intermediate sales, home production, illegal activity, transfers, used goods, financial assets. Location, not citizenship. Total sales are larger than GDP.",
   subs:[["Final goods and value added","gdp-counts"],["What is left out","gdp-leftout"]]},
  {id:"g-gdp-limits", t:"Limits of GDP", a:"gdp-limits",
   short:"The broadest measure of production, but it ignores leisure, income distribution, environmental quality and home production, and it overstates sustainability when capital wears out without being replaced.",
   subs:[["The pitfalls","gdp-limits"]]},
  {id:"g-gdp-real", t:"Real vs Nominal GDP", a:"gdp-real",
   short:"Nominal = current-year prices × current-year quantities. Real = base-year prices × current-year quantities; in the base year, real = nominal. Nominal can rise from inflation alone. Worked: crystals and pearls, base year 2024 — $42,000, $56,100, $46,200, $56,100.",
   subs:[["The two measures","gdp-real"],["Worked example","gdp-realworked"]]}]},

 {h:"Long-Run Growth and the Solow Model", tp:"growth", items:[
  {id:"g-gro-facts", t:"Growth Facts, Per Capita and the Rule of 70", a:"gro-facts",
   short:"Every country was once poor; GDP per capita varies enormously; growth rates differ; long-run growth is not guaranteed. Per capita = real GDP ÷ population. Rule of 70: doubling (or halving) time ≈ 70 ÷ growth rate. $50M/10,000 = $5,000; $60M/20,000 = $3,000: GDP +20%, per capita −40%.",
   subs:[["The facts","gro-facts"],["Rule of 70 and per capita","gro-rule70"]]},
  {id:"g-gro-terms", t:"Catch-up vs Innovative Growth, Factors, Diminishing Returns", a:"gro-terms",
   short:"Catch-up growth = more factors (capital, workers, resources); the poorer country gains more from each unit of capital. Innovative growth = higher productivity from new ideas — sustainable, because ideas are limitless. Factors: capital, labor, land, entrepreneurship; physical vs human capital. Diminishing returns: Y = √K, K 25 → 36 adds only 1.",
   subs:[["Two kinds of growth","gro-terms"],["Factors and diminishing returns","gro-factors"]]},
  {id:"g-gro-model", t:"The Solow Model and the Steady State", a:"gro-model",
   short:"Y = A√K, I = sY, D = δK, C = Y − I. I > D adds capital, I < D loses it; the steady state is where I = D: K* = (sA ÷ δ)². There, only technology raises output for good. Worked: K = 80, s = 10%, δ = 1% → $8.94, $0.89, $8.05, $0.80; with A = 1.1, K* = 121, Y* = $12.10, C* = $10.89.",
   subs:[["The equations","gro-model"],["The steady state","gro-steady"],["Worked examples","gro-worked"]]},
  {id:"g-gro-shifts", t:"What Shifts What", a:"gro-shifts",
   short:"Technology up: production and investment curves shift up, steady state rises. Savings rate up: only the investment curve shifts — the production curve does not — and the steady state rises. Depreciation up: the depreciation line steepens and the steady state falls.",
   subs:[["The shift table","gro-shifts"]]},
  {id:"g-gro-policy", t:"Policy, Institutions and Solow’s Weaknesses", a:"gro-policy",
   short:"Education and institutions raise output per worker in the short and long run; higher saving raises only the level. Institutions are permanent and broad; policies are narrower. Constraints on the political class; Friedman on freedom; more people, more ideas. Solow’s weaknesses: institutions given, same technology everywhere, ideas unexplained, population treated like depreciation.",
   subs:[["Policy and institutions","gro-policy"],["Weaknesses of Solow","gro-weak"]]}]},

 {h:"The Labor Market", tp:"labor", items:[
  {id:"g-lab-classify", t:"Classifying People", a:"lab-classify",
   short:"Employed: working, full- or part-time. Unemployed: no job, wants one, searched in the last four weeks. Not in the labor force: full-time students not seeking work, retirees, and discouraged workers who stopped searching.",
   subs:[["The three groups","lab-classify"]]},
  {id:"g-lab-rates", t:"The Rates and the Worked Examples", a:"lab-rates",
   short:"LF = E + U; u = U ÷ LF; LFPR = LF ÷ adult population; EPR = E ÷ adult population; natural rate = (frictional + structural) ÷ LF. Gondor 2,700,000 and 42,300,000; Dale 15.4%; Dog River 2,800, 37.5%, 86.7%, 60%; Osgiliath 2%.",
   subs:[["The formulas","lab-rates"],["Worked examples","lab-worked"]]},
  {id:"g-lab-types", t:"Types of Unemployment and the Natural Rate", a:"lab-types",
   short:"Frictional (search and matching), structural (skill or location mismatch; wages above market-clearing), cyclical (recession), seasonal. Natural rate = frictional + structural. Zero unemployment would be inefficient.",
   subs:[["The four types","lab-types"],["The natural rate","lab-natural"]]},
  {id:"g-lab-moves", t:"How the Rates Move, U-3, Technology and Work", a:"lab-moves",
   short:"EPR and u can both rise if LFPR rises; the labor force can grow while LFPR falls. U-3 understates distress. Technology raises productivity but strands old skills. Rising real GDP means firms need more labor. Work is meaningful: participating in improving creation.",
   subs:[["Rates moving together","lab-moves"],["U-3, technology, work","lab-u3"]]}]},

 {h:"Price Levels, CPI and Inflation", tp:"prices", items:[
  {id:"g-pri-index", t:"CPI, the Deflator and Converting Dollars", a:"pri-index",
   short:"CPI = basket cost ÷ base-year basket cost × 100 (base year = 100). Deflator = nominal ÷ real × 100. Inflation = (P new − P old) ÷ P old × 100 — divide by the earlier year. $ in A = $ in B × CPI A ÷ CPI B. Worked: apples, jackets and a TV — $390, $520, CPI 75 and 100, 33.33%; $30 in 2020 = $10 in 1980.",
   subs:[["The formulas","pri-index"],["Worked examples","pri-worked"]]},
  {id:"g-pri-concepts", t:"Inflation, Disinflation, Deflation and the CPI’s Bias", a:"pri-concepts",
   short:"Inflation: each dollar buys less. Disinflation: inflation slows, prices still rise. Deflation: prices fall — the only way back to an earlier level. CPI vs PPI; core excludes food and energy. The CPI overstates inflation (quality, substitution, new goods). Cost of living is prices; standard of living is purchasing power.",
   subs:[["The three -flations","pri-concepts"],["CPI vs PPI and the bias","pri-bias"]]}]},

 {h:"Saving and Investment", tp:"saving", items:[
  {id:"g-sav-identity", t:"National Saving and the Open Economy", a:"sav-identity",
   short:"S = Y − C − G = private (Y − T − C) + public (T − G). Closed economy: S = I. Open economy: I = S + (M − X) — foreign saving fills the gap. If I exceeds national saving, the economy is using foreign savings.",
   subs:[["The identity","sav-identity"]]},
  {id:"g-sav-finance", t:"Investment and Direct vs Indirect Financing", a:"sav-finance",
   short:"Investment means buying new capital goods and replacing worn ones — not buying stocks or bonds. Saving finances investment; they are not the same activity. Direct financing: a Treasury bond, an IPO, a firm issuing shares. Indirect: saving in a bank that lends to businesses.",
   subs:[["Investment","sav-finance"],["Direct vs indirect","sav-direct"]]}]},

 {h:"Formulas — What Divides by What", tp:"formulas", items:[
  {id:"g-formulas", t:"Formula Sheet", a:"for-sheet",
   short:"Every formula on the exam in one table: GDP, real GDP, per capita, growth rate, rule of 70, the Solow equations and the steady state, the four labor rates, the natural rate, CPI, deflator, inflation, converting dollars, national saving, the open economy.",
   subs:[["The sheet","for-sheet"]]},
  {id:"g-for-hooks", t:"Ways to Remember Them", a:"for-hooks",
   short:"A memory hook for every formula. Nominal = Now prices, Real = Reference prices. Change over original. Base = basement = bottom. N before R. Want over have. You save out of income; machines wear out. K* is SAD, squared. And which curve moves: ask which equation the letter lives in.",
   subs:[["The hooks","for-hooks"],["Which curve moves","for-h-curves"]]},
  {id:"g-for-divide", t:"What Divides by What", a:"for-divide",
   short:"Every ratio as top ÷ bottom. Unemployment rate = unemployed ÷ labor force. LFPR = labor force ÷ adult population. EPR = employed ÷ adult population. CPI = this year’s basket ÷ base-year basket. Deflator = nominal ÷ real. Any percent change divides by the OLD value.",
   subs:[["The table","for-divide"],["Three rules","for-rules"]]},
  {id:"g-for-build", t:"What Multiplies, Adds and Subtracts", a:"for-build",
   short:"GDP adds C, I, G and net exports. Real GDP multiplies base prices by current quantities. Solow multiplies: I = s × Y, D = δ × K. Going backwards from a rate is a multiplication: U = rate × LF, LF = LFPR × population, then E = LF − U.",
   subs:[["Building up","for-build"],["Going backwards from a rate","for-backwards"]]},
  {id:"g-for-steps", t:"How to Do Each Calculation", a:"for-steps",
   short:"Step-by-step recipes for every calculation on the exam: GDP from its parts, nominal and real GDP, per capita and growth, Solow at a given K and at the steady state, labor counts and rates, the natural rate, CPI and inflation, converting dollars, the three savings.",
   subs:[["GDP","for-s-gdp"],["Solow","for-s-solow"],["Labor","for-s-labor"],["Prices","for-s-prices"],["Saving","for-s-saving"]]},
  {id:"g-for-traps", t:"The Traps", a:"for-traps",
   short:"Divide by the earlier year. The unemployment rate divides by the labor force, not the population. Transfers are not G; firm machinery is I; an import cancels. In the base year real = nominal and the CPI = 100. Cyclical stays in the labor force. 10% is 0.10. Check every digit.",
   subs:[["The list","for-traps"]]}]}
]};
