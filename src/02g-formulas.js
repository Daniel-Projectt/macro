/* ================================================================ formulas
   What divides by what, what multiplies what, and how to do each calculation.
   The tab for memorising: a hook for every formula, every rate as top ÷
   bottom, every recipe in steps.                                             */
CH.formulas = {n:6, title:"Formulas — What Divides by What", short:"Formulas",
 notes:[
  {id:"for-sheet", h:"Formula Sheet", body:
   '<div class="point"><b>The point</b><p>Every formula on the exam, in one place. Read it top to bottom once, then use the rest of this tab to drill it: what goes on top, what goes on the bottom, and the steps for each calculation.</p><p class="able"><b>Be able to</b> write each one from memory and say which numbers go where.</p></div>'+
   '<p class="knowline"><span class="know">All five topics</span></p>'+
   '<div class="tblwrap"><table class="tbl fit c2"><thead><tr><th>Topic</th><th>Formula</th></tr></thead><tbody>'+
   '<tr><td class="head">GDP</td><td class="sm">C + I + G + (X &minus; M)</td></tr>'+
   '<tr><td class="head">Real GDP</td><td class="sm">base-year prices &times; current quantities</td></tr>'+
   '<tr><td class="head">GDP per capita</td><td class="sm">real GDP &divide; population</td></tr>'+
   '<tr><td class="head">Growth rate</td><td class="sm">(new &minus; old) &divide; old &times; 100</td></tr>'+
   '<tr><td class="head">Rule of 70</td><td class="sm">years to double &asymp; 70 &divide; growth %</td></tr>'+
   '<tr><td class="head">Solow</td><td class="sm">Y = A&radic;K; I = sY; D = &delta;K; C = Y &minus; I; steady state I = D, K* = (sA &divide; &delta;)<sup>2</sup></td></tr>'+
   '<tr><td class="head">Labor force</td><td class="sm">E + U</td></tr>'+
   '<tr><td class="head">Unemployment rate</td><td class="sm">U &divide; LF</td></tr>'+
   '<tr><td class="head">LFPR</td><td class="sm">LF &divide; adult population</td></tr>'+
   '<tr><td class="head">EPR</td><td class="sm">E &divide; adult population</td></tr>'+
   '<tr><td class="head">Natural rate</td><td class="sm">(frictional + structural) &divide; LF</td></tr>'+
   '<tr><td class="head">CPI</td><td class="sm">basket cost &divide; base-year basket cost &times; 100</td></tr>'+
   '<tr><td class="head">GDP deflator</td><td class="sm">nominal &divide; real &times; 100</td></tr>'+
   '<tr><td class="head">Inflation</td><td class="sm">(P new &minus; P old) &divide; P old &times; 100</td></tr>'+
   '<tr><td class="head">Convert dollars</td><td class="sm">$ then = $ now &times; CPI then &divide; CPI now</td></tr>'+
   '<tr><td class="head">National saving</td><td class="sm">Y &minus; C &minus; G = private (Y &minus; T &minus; C) + public (T &minus; G)</td></tr>'+
   '<tr><td class="head">Open economy</td><td class="sm">I = S + (M &minus; X)</td></tr>'+
   '</tbody></table></div>'},

  {id:"for-hooks", h:"Ways to Remember Them", body:
   '<div class="point"><b>The point</b><p>A formula you understand is a formula you can rebuild. Each hook below is either a <b>phrase</b> that tells you what goes where, or the <b>reason</b> the formula has to be that way. Say each one out loud once, then use the Memory hooks deck.</p><p class="able"><b>Be able to</b> give the hook for any formula, and rebuild the formula from it.</p></div>'+
   '<p class="knowline"><span class="know">One hook per formula</span></p>'+
   '<div class="tblwrap"><table class="tbl fit c2"><thead><tr><th>Formula</th><th>How to remember it</th></tr></thead><tbody>'+
   '<tr><td class="head f">GDP = C + I + G + (X &minus; M)</td><td class="sm"><b>Who bought it?</b> Households (C), firms (I), the government (G), foreigners (X). Imports come off because they were counted inside C, I or G but <b>were not made here</b>.</td></tr>'+
   '<tr><td class="head f">Nominal vs real GDP</td><td class="sm"><b>N</b>ominal = <b>N</b>ow prices. <b>R</b>eal = <b>R</b>eference-year prices. The quantities are always this year&rsquo;s.</td></tr>'+
   '<tr><td class="head f">Any percent change</td><td class="sm"><b>Change over original.</b> (New &minus; Old) &divide; Old &mdash; &ldquo;N-O over O.&rdquo; You measure from where you started, so the start is the bottom.</td></tr>'+
   '<tr><td class="head f">Rule of 70</td><td class="sm"><b>70 over the rate</b>, and the rate stays a whole number: 70 &divide; 20, never 70 &divide; 0.20.</td></tr>'+
   '<tr><td class="head f">Unemployment rate = U &divide; LF</td><td class="sm">The unemployed <b>out of the people in the game</b>. If you are not looking for work you are not in the game, so you are not on the bottom.</td></tr>'+
   '<tr><td class="head f">LFPR and EPR</td><td class="sm"><b>&ldquo;Population&rdquo; in the name, population on the bottom.</b> Participation = who shows up, out of everyone who could.</td></tr>'+
   '<tr><td class="head f">Natural rate</td><td class="sm">The two kinds that <b>never go away</b>: <b>F</b>rictional and <b>S</b>tructural. Cyclical comes and goes with the cycle, so it is left off the top.</td></tr>'+
   '<tr><td class="head f">The four types</td><td class="sm"><b>F</b>rictional = <b>f</b>inding a job. <b>S</b>tructural = <b>s</b>kills do not fit. <b>C</b>yclical = the business <b>c</b>ycle. <b>S</b>easonal = the <b>s</b>eason.</td></tr>'+
   '<tr><td class="head f">CPI = basket now &divide; basket base &times; 100</td><td class="sm"><b>Base = basement = bottom.</b> The base year always sits underneath, and in the base year the index is 100.</td></tr>'+
   '<tr><td class="head f">Deflator = nominal &divide; real &times; 100</td><td class="sm"><b>N before R</b> in the alphabet: <b>N</b>ominal goes first, on top.</td></tr>'+
   '<tr><td class="head f">Converting dollars</td><td class="sm"><b>Want over have.</b> Multiply by the CPI of the year you <b>want</b>, divide by the CPI of the year you <b>have</b>.</td></tr>'+
   '<tr><td class="head f">The three -flations</td><td class="sm"><b>In</b>flation: prices up. <b>Dis</b>inflation: up, but at a <b>dis</b>count &mdash; slower. <b>De</b>flation: prices <b>de</b>crease.</td></tr>'+
   '<tr><td class="head f">I = sY and D = &delta;K</td><td class="sm"><b>You save out of income; machines wear out.</b> So s goes with Y (income), and &delta; goes with K (the machines).</td></tr>'+
   '<tr><td class="head f">K* = (sA &divide; &delta;)<sup>2</sup></td><td class="sm"><b>&ldquo;SAD, squared&rdquo;</b>: <b>s</b> times <b>A</b>, over <b>d</b>elta, squared. Or rebuild it: saved = worn out, sA&radic;K = &delta;K.</td></tr>'+
   '<tr><td class="head f">Catch-up vs innovative</td><td class="sm">Catch-up = <b>more</b> stuff. Innovative = <b>better</b> use of the same stuff.</td></tr>'+
   '<tr><td class="head f">S = Y &minus; C &minus; G</td><td class="sm"><b>What is left of the pie</b> after households and the government have eaten.</td></tr>'+
   '<tr><td class="head f">Private and public saving</td><td class="sm">Private: <b>my</b> income, minus taxes, minus what I spend. Public: the <b>government&rsquo;s</b> income (taxes) minus what it spends.</td></tr>'+
   '<tr><td class="head f">I = S + (M &minus; X)</td><td class="sm">If we invest more than we save, <b>foreigners lend the difference</b> &mdash; and it shows up as imports above exports.</td></tr>'+
   '<tr><td class="head f">Direct vs indirect</td><td class="sm">Direct: you hand the money <b>to the borrower</b> (a bond, an IPO). Indirect: <b>a bank in the middle</b>.</td></tr>'+
   '</tbody></table></div>'+
   '<h3 class="sub" id="for-h-curves">Which curve moves &mdash; read it off the equations</h3>'+
   '<p>You do not have to memorise the shift table. Ask <b>which equation the letter lives in</b>:</p>'+
   '<div class="levels">'+
   '<div class="lv"><b>A is in Y = A&radic;K</b><span>So the <b>production</b> curve moves &mdash; and investment is sY, so the <b>investment</b> curve follows it.</span></div>'+
   '<div class="lv"><b>s is only in I = sY</b><span>So <b>only the investment</b> curve moves. Production has no s in it.</span></div>'+
   '<div class="lv"><b>&delta; is only in D = &delta;K</b><span>So <b>only the depreciation line</b> moves &mdash; it gets steeper.</span></div></div>'},

  {id:"for-divide", h:"What Divides by What", body:
   '<div class="point"><b>The point</b><p>Most of the exam&rsquo;s calculations are one division, and the only way to get them wrong is to put the wrong number on the bottom. Learn each one as <b>top &divide; bottom</b>. Three rules cover nearly all of them.</p><p class="able"><b>Be able to</b> say, for every rate, what goes on top and what goes on the bottom &mdash; without looking.</p></div>'+
   '<p class="knowline"><span class="know">Memorise this table</span></p>'+
   '<div class="tblwrap"><table class="tbl fit c4"><thead><tr><th>You want</th><th>Top</th><th>Bottom</th><th>Then</th></tr></thead><tbody>'+
   '<tr><td class="head">Unemployment rate</td><td class="sm">unemployed</td><td class="sm"><b>labor force</b> (not the population)</td><td class="sm">&times; 100</td></tr>'+
   '<tr><td class="head">Participation rate (LFPR)</td><td class="sm">labor force</td><td class="sm"><b>adult population</b></td><td class="sm">&times; 100</td></tr>'+
   '<tr><td class="head">Employment-population ratio</td><td class="sm">employed</td><td class="sm"><b>adult population</b></td><td class="sm">&times; 100</td></tr>'+
   '<tr><td class="head">Natural rate</td><td class="sm">frictional + structural</td><td class="sm"><b>the whole labor force</b> (cyclical included)</td><td class="sm">&times; 100</td></tr>'+
   '<tr><td class="head">GDP per capita</td><td class="sm">real GDP</td><td class="sm"><b>population</b></td><td class="sm">&mdash;</td></tr>'+
   '<tr><td class="head">Growth rate</td><td class="sm">new &minus; old</td><td class="sm"><b>old</b></td><td class="sm">&times; 100</td></tr>'+
   '<tr><td class="head">Inflation rate</td><td class="sm">new index &minus; old index</td><td class="sm"><b>old index</b></td><td class="sm">&times; 100</td></tr>'+
   '<tr><td class="head">CPI</td><td class="sm">this year&rsquo;s basket cost</td><td class="sm"><b>base-year basket cost</b></td><td class="sm">&times; 100</td></tr>'+
   '<tr><td class="head">GDP deflator</td><td class="sm">nominal GDP</td><td class="sm"><b>real GDP</b></td><td class="sm">&times; 100</td></tr>'+
   '<tr><td class="head">Years to double</td><td class="sm">70</td><td class="sm"><b>growth rate in percent</b> (20, not 0.20)</td><td class="sm">&mdash;</td></tr>'+
   '<tr><td class="head">Dollars in another year</td><td class="sm">$ &times; CPI of the year you <b>want</b></td><td class="sm"><b>CPI of the year you have</b></td><td class="sm">&mdash;</td></tr>'+
   '<tr><td class="head">Steady-state capital</td><td class="sm">s &times; A</td><td class="sm"><b>&delta;</b></td><td class="sm">square it</td></tr>'+
   '</tbody></table></div>'+
   '<h3 class="sub" id="for-rules">Three rules that cover almost everything</h3>'+
   '<div class="levels">'+
   '<div class="lv"><b>1 &middot; The name tells you the bottom</b><span>A rate of the <b>labor force</b> (unemployment, natural) divides by the labor force. A ratio with <b>population</b> in its name or meaning (participation, employment-population, per capita) divides by the population.</span></div>'+
   '<div class="lv"><b>2 &middot; A percent change divides by the old value</b><span>Growth and inflation are both (new &minus; old) &divide; <b>old</b>. From 75 to 100 is 25 &divide; 75 = 33.33%, never 25 &divide; 100.</span></div>'+
   '<div class="lv"><b>3 &middot; An index puts the base on the bottom</b><span>CPI = this year &divide; <b>base year</b>. Deflator = nominal &divide; <b>real</b> (real is the base-price one). Converting dollars = want &divide; <b>have</b>.</span></div></div>'},

  {id:"for-build", h:"What Multiplies, Adds and Subtracts", body:
   '<div class="point"><b>The point</b><p>The rest of the calculations are built by <b>adding</b> (GDP, the labor force, a basket), <b>multiplying</b> (real GDP, the Solow equations) or <b>subtracting</b> (consumption, saving). And when a question gives you a <b>rate</b> and asks for a <b>count</b>, you run the division backwards &mdash; you multiply.</p><p class="able"><b>Be able to</b> build each total from its parts, and go from a rate back to a number of people.</p></div>'+
   '<p class="knowline"><span class="know">Memorise this table</span></p>'+
   '<div class="tblwrap"><table class="tbl fit c2"><thead><tr><th>You want</th><th>Do this</th></tr></thead><tbody>'+
   '<tr><td class="head">GDP</td><td class="sm"><b>Add</b> C + I + G, then add exports and <b>subtract</b> imports. Transfers never go in.</td></tr>'+
   '<tr><td class="head">Nominal GDP</td><td class="sm"><b>Multiply</b> each good&rsquo;s price this year by its quantity this year; add up.</td></tr>'+
   '<tr><td class="head">Real GDP</td><td class="sm"><b>Multiply</b> each good&rsquo;s <b>base-year</b> price by its quantity this year; add up.</td></tr>'+
   '<tr><td class="head">Value added</td><td class="sm"><b>Subtract</b> the cost of inputs from the sale price.</td></tr>'+
   '<tr><td class="head">Output (Solow)</td><td class="sm"><b>Multiply</b> A by the square root of K.</td></tr>'+
   '<tr><td class="head">Investment (Solow)</td><td class="sm"><b>Multiply</b> the savings rate by <b>output</b>.</td></tr>'+
   '<tr><td class="head">Depreciation (Solow)</td><td class="sm"><b>Multiply</b> the depreciation rate by <b>capital</b>.</td></tr>'+
   '<tr><td class="head">Consumption (Solow)</td><td class="sm"><b>Subtract</b> investment from output.</td></tr>'+
   '<tr><td class="head">Basket cost</td><td class="sm"><b>Multiply</b> each quantity by its price; add up.</td></tr>'+
   '<tr><td class="head">National saving</td><td class="sm"><b>Subtract</b> C and G from Y.</td></tr>'+
   '<tr><td class="head">Private / public saving</td><td class="sm">Y &minus; T &minus; C &nbsp;/&nbsp; T &minus; G. They <b>add</b> up to national saving.</td></tr>'+
   '<tr><td class="head">Foreign saving</td><td class="sm"><b>Subtract</b> national saving from investment: I &minus; S = M &minus; X.</td></tr>'+
   '</tbody></table></div>'+
   '<h3 class="sub" id="for-backwards">Going backwards from a rate</h3>'+
   '<div class="tblwrap"><table class="tbl fit c3"><thead><tr><th>Given</th><th>You want</th><th>Do this</th></tr></thead><tbody>'+
   '<tr><td class="head">LFPR and population</td><td class="sm">labor force</td><td class="sm">LFPR &times; population</td></tr>'+
   '<tr><td class="head">Unemployment rate and LF</td><td class="sm">unemployed</td><td class="sm">rate &times; labor force</td></tr>'+
   '<tr><td class="head">LF and unemployed</td><td class="sm">employed</td><td class="sm">labor force &minus; unemployed</td></tr>'+
   '<tr><td class="head">EPR and population</td><td class="sm">employed</td><td class="sm">EPR &times; population</td></tr>'+
   '<tr><td class="head">Employed and unemployed</td><td class="sm">labor force</td><td class="sm">employed + unemployed</td></tr>'+
   '</tbody></table></div>'+
   '<p>A percent always goes into a calculation as a decimal: <b>10% is 0.10</b>, 6% is 0.06, 1% is 0.01.</p>'},

  {id:"for-steps", h:"How to Do Each Calculation", body:
   '<div class="point"><b>The point</b><p>Every calculation on the exam is one of these recipes. Each is three to five steps, always in the same order. Work the example beside each one on paper, then cover it and do it again.</p><p class="able"><b>Be able to</b> do each recipe from a blank page with new numbers.</p></div>'+
   '<p class="knowline"><span class="know">Problem Sets 1&ndash;4, as methods</span></p>'+
   '<h3 class="sub" id="for-s-gdp">GDP</h3>'+
   '<div class="flow"><div class="step"><b>GDP from its parts</b>1 &middot; Cross out transfers.<br>2 &middot; If I is a share of C, compute it.<br>3 &middot; Net exports = X &minus; M (it can be negative).<br>4 &middot; Add C + I + G + net exports.<i>Gondor: 4,000 + 1,200 + 1,200 &minus; 200 = $6,200.</i></div>'+
   '<div class="step"><b>Nominal and real GDP</b>1 &middot; Nominal: each year&rsquo;s prices &times; that year&rsquo;s quantities.<br>2 &middot; Real: base-year prices &times; that year&rsquo;s quantities.<br>3 &middot; In the base year, copy nominal.<i>Real 2023 = 16.50 &times; 800 + 220 &times; 150 = $46,200.</i></div>'+
   '<div class="step"><b>Per capita and growth</b>1 &middot; Real GDP &divide; population, for each year.<br>2 &middot; Growth = (new &minus; old) &divide; old &times; 100.<br>3 &middot; Doubling time = 70 &divide; growth %.<i>$5,000 &rarr; $3,000 is &minus;40%.</i></div></div>'+
   '<h3 class="sub" id="for-s-solow">Solow</h3>'+
   '<div class="flow"><div class="step"><b>At a given K</b>1 &middot; Y = A &times; &radic;K.<br>2 &middot; I = s &times; Y.<br>3 &middot; C = Y &minus; I.<br>4 &middot; D = &delta; &times; K.<br>5 &middot; If I &gt; D, capital grows.<i>K = 80: 8.94, 0.89, 8.05, 0.80 &mdash; grows.</i></div>'+
   '<div class="step"><b>The steady state</b>1 &middot; Compute sA &divide; &delta;.<br>2 &middot; Square it: that is K*.<br>3 &middot; Y* = A &times; &radic;K*.<br>4 &middot; C* = (1 &minus; s) &times; Y*.<i>0.11 &divide; 0.01 = 11; K* = 121; Y* = 12.10; C* = 10.89.</i></div></div>'+
   '<h3 class="sub" id="for-s-labor">Labor</h3>'+
   '<div class="flow"><div class="step"><b>From rates to counts</b>1 &middot; LF = LFPR &times; population.<br>2 &middot; U = rate &times; LF.<br>3 &middot; E = LF &minus; U.<i>Gondor: 45,000,000; 2,700,000; 42,300,000.</i></div>'+
   '<div class="step"><b>From counts to rates</b>1 &middot; LF = E + U.<br>2 &middot; u = U &divide; LF.<br>3 &middot; LFPR = LF &divide; population; EPR = E &divide; population.<i>Dale: 5 &divide; 32.5 = 15.4%.</i></div>'+
   '<div class="step"><b>The natural rate</b>1 &middot; Add frictional + structural.<br>2 &middot; LF = employed + <u>all</u> the unemployed.<br>3 &middot; Divide.<i>Osgiliath: 1 &divide; 50 = 2%.</i></div></div>'+
   '<h3 class="sub" id="for-s-prices">Prices</h3>'+
   '<div class="flow"><div class="step"><b>CPI and inflation from a basket</b>1 &middot; Cost the basket in each year.<br>2 &middot; CPI = cost &divide; base-year cost &times; 100.<br>3 &middot; Inflation = (new CPI &minus; old CPI) &divide; old CPI &times; 100.<i>390 and 520; 75 and 100; 33.33%.</i></div>'+
   '<div class="step"><b>Converting dollars</b>1 &middot; Name the year you want and the year you have.<br>2 &middot; $ &times; CPI want &divide; CPI have.<i>$30 &times; 100 &divide; 300 = $10.</i></div>'+
   '<div class="step"><b>The deflator</b>1 &middot; Nominal &divide; real.<br>2 &middot; &times; 100.<i>22 &divide; 20 &times; 100 = 110.</i></div></div>'+
   '<h3 class="sub" id="for-s-saving">Saving</h3>'+
   '<div class="flow"><div class="step"><b>The three savings</b>1 &middot; National = Y &minus; C &minus; G.<br>2 &middot; Private = Y &minus; T &minus; C.<br>3 &middot; Public = T &minus; G.<br>4 &middot; Check: private + public = national.<i>200 = 250 + (&minus;50).</i></div>'+
   '<div class="step"><b>Foreign saving</b>1 &middot; I &minus; national saving.<br>2 &middot; If it is positive, the economy is open and imports exceed exports by that amount.<i>260 &minus; 200 = 60.</i></div></div>'},

  {id:"for-traps", h:"The Traps", body:
   '<div class="point"><b>The point</b><p>The problem sets were lost on a handful of repeatable slips, not on hard ideas. Each one below has cost marks once already. Read the list before you start the exam, and again before you submit.</p><p class="able"><b>Be able to</b> name the trap in a wrong answer.</p></div>'+
   '<p class="knowline"><span class="know">From your problem-set misses</span></p>'+
   '<div class="levels">'+
   '<div class="lv"><b>Divide by the earlier year</b><span>CPI 75 to 100 is <b>33.33%</b>, not 25%. The bottom is always where you started.</span></div>'+
   '<div class="lv"><b>Labor force, not population</b><span>The unemployment rate and the natural rate divide by the <b>labor force</b>.</span></div>'+
   '<div class="lv"><b>Cyclical stays in the bottom</b><span>In the natural rate, cyclical unemployment is left off the top but its people remain in the labor force.</span></div>'+
   '<div class="lv"><b>Transfers are not G</b><span>Social Security and unemployment benefits are crossed out before you add.</span></div>'+
   '<div class="lv"><b>Firm machinery is I</b><span>Not C, however much it looks like a purchase.</span></div>'+
   '<div class="lv"><b>An import cancels</b><span>It raises I (or C) and M equally; GDP does not move.</span></div>'+
   '<div class="lv"><b>The base year</b><span>Real GDP = nominal GDP, and the CPI = 100. No second calculation.</span></div>'+
   '<div class="lv"><b>Saving shifts one curve</b><span>A higher savings rate moves the investment curve only. The production curve stays.</span></div>'+
   '<div class="lv"><b>Percent as a decimal</b><span>10% is 0.10. Rule of 70 is the exception: it uses 20, not 0.20.</span></div>'+
   '<div class="lv"><b>Type it as asked</b><span>Dollar signs, commas, percent signs, and <b>every digit</b> &mdash; 42,300,000, not 42,000,000.</span></div></div>'}
 ],
 decks:[
  {id:"terms", label:"Top ÷ bottom", cards:[
   ["Unemployment rate — top ÷ bottom","unemployed ÷ labor force","g-for-divide"],
   ["LFPR — top ÷ bottom","labor force ÷ adult population","g-for-divide"],
   ["EPR — top ÷ bottom","employed ÷ adult population","g-for-divide"],
   ["Natural rate — top ÷ bottom","(frictional + structural) ÷ the whole labor force","g-for-divide"],
   ["GDP per capita — top ÷ bottom","real GDP ÷ population","g-for-divide"],
   ["Growth rate — top ÷ bottom","(new − old) ÷ old","g-for-divide"],
   ["Inflation rate — top ÷ bottom","(new index − old index) ÷ old index","g-for-divide"],
   ["CPI — top ÷ bottom","this year’s basket cost ÷ base-year basket cost, × 100","g-for-divide"],
   ["GDP deflator — top ÷ bottom","nominal GDP ÷ real GDP, × 100","g-for-divide"],
   ["Years to double — top ÷ bottom","70 ÷ the growth rate in percent","g-for-divide"],
   ["Dollars in another year","$ × CPI of the year you want ÷ CPI of the year you have","g-for-divide"],
   ["Steady-state capital K*","(s × A ÷ δ), squared","g-for-divide"],
   ["Rule 1: what the name tells you","A rate of the labor force divides by the labor force; a population ratio divides by the population","g-for-divide"],
   ["Rule 2: a percent change","Always divides by the old value","g-for-divide"],
   ["Rule 3: an index","Puts the base on the bottom","g-for-divide"]]},
  {id:"lists", label:"Build it & steps", cards:[
   ["GDP — how to build it","Add C + I + G, add exports, subtract imports; transfers never go in","g-for-build"],
   ["Real GDP — how to build it","Base-year prices × this year’s quantities, added up","g-for-build"],
   ["Solow investment — how to build it","Savings rate × output","g-for-build"],
   ["Solow depreciation — how to build it","Depreciation rate × capital","g-for-build"],
   ["Solow consumption — how to build it","Output − investment","g-for-build"],
   ["Number unemployed, from a rate","Unemployment rate × labor force","g-for-build"],
   ["Labor force, from the LFPR","LFPR × adult population","g-for-build"],
   ["Number employed, from the labor force","Labor force − unemployed","g-for-build"],
   ["Foreign saving — how to build it","Investment − national saving","g-for-build"],
   ["Steps: rates to counts","LF = LFPR × population → U = rate × LF → E = LF − U","g-for-steps"],
   ["Steps: the steady state","sA ÷ δ → square it for K* → Y* = A√K* → C* = (1 − s)Y*","g-for-steps"],
   ["Steps: Solow at a given K","Y = A√K → I = sY → C = Y − I → D = δK → compare I and D","g-for-steps"],
   ["Steps: CPI and inflation","Cost the basket each year → ÷ base cost × 100 → (new − old) ÷ old","g-for-steps"],
   ["Steps: GDP from its parts","Cross out transfers → find I → X − M → add","g-for-steps"],
   ["Steps: the three savings","Y − C − G → Y − T − C → T − G → check they add up","g-for-steps"],
   ["Trap: CPI 75 to 100","33.33%, not 25% — divide by the earlier year","g-for-traps"],
   ["Trap: the base year","Real = nominal, and the CPI = 100","g-for-traps"],
   ["Trap: cyclical unemployment in the natural rate","Off the top, still in the labor force on the bottom","g-for-traps"],
   ["Trap: 10% in a calculation","0.10 — except the rule of 70, which uses the percent itself","g-for-traps"],
   ["The whole sheet in one line","GDP · real GDP · per capita · growth · rule of 70 · Solow · four labor rates · CPI · deflator · inflation · dollars · saving","g-formulas"]]},
  {id:"hooks", label:"Memory hooks", cards:[
   ["GDP — how to remember it","Who bought it? Households, firms, government, foreigners — minus imports, which were not made here","g-for-hooks"],
   ["Nominal vs real — how to remember it","Nominal = Now prices; Real = Reference-year prices","g-for-hooks"],
   ["A percent change — how to remember it","Change over original: N-O over O","g-for-hooks"],
   ["Unemployment rate — how to remember it","The unemployed out of the people in the game — the labor force","g-for-hooks"],
   ["LFPR and EPR — how to remember them","Population in the name, population on the bottom","g-for-hooks"],
   ["Natural rate — how to remember it","The two kinds that never go away: Frictional and Structural","g-for-hooks"],
   ["The four types of unemployment — how to remember them","Finding, Skills, Cycle, Season","g-for-hooks"],
   ["CPI — how to remember it","Base = basement = bottom","g-for-hooks"],
   ["Deflator — how to remember it","N before R: Nominal goes first, on top","g-for-hooks"],
   ["Converting dollars — how to remember it","Want over have","g-for-hooks"],
   ["The three -flations — how to remember them","In = up; Dis = up at a discount, slower; De = decrease","g-for-hooks"],
   ["I = sY and D = δK — how to remember them","You save out of income; machines wear out","g-for-hooks"],
   ["K* — how to remember it","SAD, squared: s times A over delta, squared","g-for-hooks"],
   ["Catch-up vs innovative — how to remember them","More stuff vs better use of the same stuff","g-for-hooks"],
   ["National saving — how to remember it","What is left of the pie after households and government have eaten","g-for-hooks"],
   ["I = S + (M − X) — how to remember it","Invest more than you save and foreigners lend the difference","g-for-hooks"],
   ["Direct vs indirect financing — how to remember them","Straight to the borrower vs a bank in the middle","g-for-hooks"],
   ["Which curve a change moves — how to tell","Ask which equation the letter lives in: A in Y, s in I, δ in D","g-for-hooks"]]}
 ]
};

/* ---- formula questions ---- */
QB = QB.concat([
 {tp:"formulas",sec:"g-formulas",m:1,t:"mc",q:"Which formula gives real GDP?",a:"base-year prices × current-year quantities",w:["current-year prices × current-year quantities","nominal GDP × the CPI ÷ 100","current-year prices × base-year quantities"],e:"From the formula sheet."},
 {tp:"formulas",sec:"g-formulas",m:1,t:"mc",q:"Which formula gives the natural rate of unemployment?",a:"(frictional + structural) ÷ labor force",w:["(frictional + cyclical) ÷ labor force","unemployed ÷ adult population","structural ÷ employed"],e:"Cyclical is left out."},
 {tp:"formulas",sec:"g-formulas",m:1,t:"mc",q:"Which formula gives the steady-state capital stock for Y = A√K?",a:"K* = (sA ÷ δ)²",w:["K* = sA ÷ δ","K* = δ ÷ sA","K* = (A ÷ sδ)²"],e:"Investment equals depreciation."},
 {tp:"formulas",sec:"g-formulas",m:1,t:"mc",q:"Which formula converts a dollar figure between years?",a:"$ then = $ now × CPI then ÷ CPI now",w:["$ then = $ now × CPI now ÷ CPI then","$ then = $ now + (CPI now − CPI then)","$ then = $ now ÷ the inflation rate"],e:"Multiply by the ratio of the indexes."},
 {tp:"formulas",sec:"g-formulas",m:1,t:"mc",q:"Which formula gives the GDP deflator?",a:"nominal GDP ÷ real GDP × 100",w:["real GDP ÷ nominal GDP × 100","basket cost ÷ base-year basket cost × 100","(nominal − real) ÷ real × 100"],e:"From the formula sheet."},
 {tp:"formulas",sec:"g-formulas",m:1,t:"mc",q:"Which formula gives the open-economy link between investment and saving?",a:"I = S + (M − X)",w:["I = S − (M − X)","I = S + (X − M)","S = I + G − T"],e:"Foreign saving is the trade deficit."},
 {tp:"formulas",sec:"g-formulas",ap:true,t:"mc",q:"An exam question gives you E, U and the adult population and asks for the LFPR. You compute:",a:"(E + U) ÷ adult population",w:["E ÷ adult population","U ÷ (E + U)","E ÷ (E + U)"],e:"The labor force over the population."},
 {tp:"formulas",sec:"g-formulas",t:"tf",q:"The rule of 70 says years to double ≈ 70 ÷ the growth rate in percent.",a:true,e:"True. Example: 5% growth → 70 ÷ 5 = 14 years to double. Use the percent as a whole number — 5, not 0.05."},

 {tp:"formulas",sec:"g-for-divide",m:1,t:"mc",q:"To get the unemployment rate, you divide:",a:"the unemployed by the labor force",w:["the unemployed by the adult population","the unemployed by the employed","the labor force by the unemployed"],e:"U ÷ LF. The population is the commonest wrong bottom."},
 {tp:"formulas",sec:"g-for-divide",m:1,t:"mc",q:"To get the labor force participation rate, you divide:",a:"the labor force by the adult population",w:["the employed by the adult population","the labor force by the employed","the adult population by the labor force"],e:"LF ÷ population."},
 {tp:"formulas",sec:"g-for-divide",m:1,t:"mc",q:"To get the employment-population ratio, you divide:",a:"the employed by the adult population",w:["the employed by the labor force","the labor force by the adult population","the adult population by the employed"],e:"E ÷ population — the name says it."},
 {tp:"formulas",sec:"g-for-divide",m:1,t:"mc",q:"To get a growth rate or an inflation rate, you divide the change by:",a:"the old (earlier) value",w:["the new (later) value","the average of the two","one hundred"],e:"(new − old) ÷ old."},
 {tp:"formulas",sec:"g-for-divide",m:1,t:"mc",q:"To get the CPI, you divide:",a:"this year’s basket cost by the base-year basket cost, then × 100",w:["the base-year basket cost by this year’s basket cost, then × 100","this year’s basket cost by last year’s basket cost, then × 100","nominal GDP by real GDP for the same year, then × 100"],e:"The base goes on the bottom."},
 {tp:"formulas",sec:"g-for-divide",m:1,t:"mc",q:"In the GDP deflator, what goes on top?",a:"Nominal GDP — nominal ÷ real × 100",w:["Real GDP — real ÷ nominal × 100","The CPI — CPI ÷ real GDP × 100","The base-year basket — base ÷ current × 100"],e:"Real GDP is the base-price one, so it goes on the bottom."},
 {tp:"formulas",sec:"g-for-divide",m:1,t:"mc",q:"To get GDP per capita, you divide:",a:"real GDP by the population",w:["nominal GDP by the labor force","real GDP by the number employed","the population by real GDP"],e:"Per capita means per head."},
 {tp:"formulas",sec:"g-for-divide",m:1,t:"mc",q:"In the rule of 70, you divide:",a:"70 by the growth rate in percent",w:["the growth rate by 70","70 by the growth rate as a decimal","the starting value by 70"],e:"20% growth: 70 ÷ 20 = 3.5 years."},
 {tp:"formulas",sec:"g-for-divide",m:1,t:"mc",q:"To move a dollar figure into another year’s dollars, you multiply it by:",a:"the CPI of the year you want ÷ the CPI of the year you have",w:["the CPI of the year you have ÷ the CPI of the year you want","the difference between the two years’ CPIs","the inflation rate between the two years"],e:"Want over have."},
 {tp:"formulas",sec:"g-for-divide",m:1,t:"mc",q:"In the natural rate, what goes on top and what on the bottom?",a:"Frictional + structural on top; the whole labor force on the bottom",w:["Frictional + cyclical on top; the whole labor force on the bottom","Frictional + structural on top; the adult population on the bottom","All of the unemployed on top; the employed on the bottom"],e:"Cyclical is off the top but its people stay in the bottom."},
 {tp:"formulas",sec:"g-for-divide",ap:true,t:"mc",q:"A town has 300 unemployed, 2,700 employed and 5,000 adults. Its unemployment rate is:",a:"10%",w:["6%","11.1%","60%"],e:"LF = 3,000; 300 ÷ 3,000. 6% divides by the population; 11.1% by the employed."},
 {tp:"formulas",sec:"g-for-divide",ap:true,t:"mc",q:"A town has 300 unemployed, 2,700 employed and 5,000 adults. Its LFPR and EPR are:",a:"60% and 54%",w:["54% and 60%","60% and 90%","90% and 54%"],e:"3,000 ÷ 5,000 and 2,700 ÷ 5,000."},
 {tp:"formulas",sec:"g-for-divide",t:"tf",q:"The unemployment rate divides the unemployed by the adult population.",a:false,e:"False — it divides by the labor force (employed + unemployed), not by all adults."},
 {tp:"formulas",sec:"g-for-divide",t:"tf",q:"A percent change always divides by the starting value.",a:true,e:"True — growth and inflation alike."},

 {tp:"formulas",sec:"g-for-build",m:1,t:"mc",q:"To get the number unemployed from an unemployment rate, you:",a:"multiply the rate by the labor force",w:["multiply the rate by the adult population","divide the labor force by the rate","subtract the rate from the labor force"],e:"U = u × LF."},
 {tp:"formulas",sec:"g-for-build",m:1,t:"mc",q:"To get the labor force from the LFPR, you:",a:"multiply the LFPR by the adult population",w:["divide the adult population by the LFPR","multiply the LFPR by the number employed","add the LFPR to the unemployment rate"],e:"LF = LFPR × population."},
 {tp:"formulas",sec:"g-for-build",m:1,t:"mc",q:"To get the number employed from the labor force, you:",a:"subtract the unemployed from the labor force",w:["add the unemployed to the labor force","multiply the labor force by the unemployment rate","divide the labor force by the participation rate"],e:"E = LF − U."},
 {tp:"formulas",sec:"g-for-build",m:1,t:"mc",q:"To get real GDP for a year, you multiply:",a:"base-year prices by that year’s quantities",w:["that year’s prices by that year’s quantities","that year’s prices by base-year quantities","base-year prices by base-year quantities"],e:"Prices frozen at the base; quantities move."},
 {tp:"formulas",sec:"g-for-build",m:1,t:"mc",q:"In the Solow model, investment is found by:",a:"multiplying the savings rate by output",w:["multiplying the savings rate by capital","multiplying the depreciation rate by output","subtracting depreciation from output"],e:"I = s × Y."},
 {tp:"formulas",sec:"g-for-build",m:1,t:"mc",q:"In the Solow model, depreciation is found by:",a:"multiplying the depreciation rate by capital",w:["multiplying the depreciation rate by output","multiplying the savings rate by capital","subtracting investment from output"],e:"D = δ × K — capital, not output."},
 {tp:"formulas",sec:"g-for-build",m:1,t:"mc",q:"The cost of a basket is found by:",a:"multiplying each quantity by its price and adding up",w:["adding the prices and multiplying by the number of goods","dividing each price by its quantity and adding up","multiplying all of the prices together"],e:"5 apples at $2 is $10, and so on."},
 {tp:"formulas",sec:"g-for-build",ap:true,t:"mc",q:"Adult population 8,000; LFPR 75%; unemployment rate 5%. The number employed is:",a:"5,700",w:["6,000","7,600","5,600"],e:"LF = 6,000; U = 300; E = 5,700. 7,600 takes the 5% off the population."},
 {tp:"formulas",sec:"g-for-build",ap:true,t:"mc",q:"Y = A√K with A = 2, K = 49, s = 20%, δ = 5%. Investment and depreciation are:",a:"I = 2.80 and D = 2.45",w:["I = 2.45 and D = 2.80","I = 9.80 and D = 0.70","I = 2.80 and D = 0.70"],e:"Y = 2 × 7 = 14; I = 0.20 × 14; D = 0.05 × 49."},
 {tp:"formulas",sec:"g-for-build",t:"tf",q:"National saving is found by adding C and G to Y.",a:false,e:"False — subtract them: S = Y − C − G."},
 {tp:"formulas",sec:"g-for-build",t:"tf",q:"Consumption in the Solow model is output minus investment.",a:true,e:"True — C = Y − I: what is left after the saved part (I = s × Y) is taken out."},

 {tp:"formulas",sec:"g-for-steps",m:1,ap:true,t:"mc",q:"C = $5,000, I = $1,500, G = $2,000, transfers = $800, X = $700, M = $900. GDP is:",a:"$8,300",w:["$9,100","$8,700","$10,100"],e:"5,000 + 1,500 + 2,000 + (700 − 900). $9,100 adds the transfers."},
 {tp:"formulas",sec:"g-for-steps",m:1,ap:true,t:"mc",q:"Year 1: 10 units at $3 and 5 units at $10. Year 2: 12 units at $4 and 6 units at $12. With year 1 as the base, real GDP in year 2 is:",a:"$96",w:["$120","$80","$100"],e:"Base prices × year-2 quantities: 3 × 12 + 10 × 6. $120 is nominal; $80 is year 1."},
 {tp:"formulas",sec:"g-for-steps",m:1,ap:true,t:"mc",q:"Real GDP rises from $200 million to $230 million. The growth rate is:",a:"15%",w:["13%","30%","11.5%"],e:"(230 − 200) ÷ 200. 13% divides by the new value."},
 {tp:"formulas",sec:"g-for-steps",m:1,ap:true,t:"mc",q:"Y = A√K, s = 20%, δ = 2%, A = 1. The steady-state capital stock is:",a:"100",w:["10","400","50"],e:"K* = (0.20 ÷ 0.02)² = 10²."},
 {tp:"formulas",sec:"g-for-steps",m:1,ap:true,t:"mc",q:"Y = A√K, with s = 20%, δ = 2% and A = 1, so K* = 100. Steady-state output and consumption are:",a:"Y* = 10 and C* = 8",w:["Y* = 100 and C* = 80","Y* = 10 and C* = 2","Y* = 20 and C* = 16"],e:"Y = √100 = 10; C = 0.8 × 10."},
 {tp:"formulas",sec:"g-for-steps",m:1,ap:true,t:"mc",q:"A basket costs $400 in the base year and $460 this year. The CPI this year is:",a:"115",w:["87","160","60"],e:"460 ÷ 400 × 100."},
 {tp:"formulas",sec:"g-for-steps",m:1,ap:true,t:"mc",q:"The CPI rises from 120 to 150. Inflation is:",a:"25%",w:["20%","30%","125%"],e:"(150 − 120) ÷ 120. 20% divides by the new value."},
 {tp:"formulas",sec:"g-for-steps",m:1,ap:true,t:"mc",q:"The CPI was 150 in 2000 and 225 in 2020. $60 in 2000 is worth, in 2020 dollars:",a:"$90",w:["$40","$75","$135"],e:"60 × 225 ÷ 150 — want over have."},
 {tp:"formulas",sec:"g-for-steps",m:1,ap:true,t:"mc",q:"30 million employed; 2 million unemployed, of whom 1.2 million are frictional or structural. The natural rate is:",a:"3.75%",w:["6.25%","4.0%","2.4%"],e:"1.2 ÷ 32. 6.25% is the whole unemployment rate; 4% divides by the employed."},
 {tp:"formulas",sec:"g-for-steps",m:1,t:"mc",q:"Given a population, an LFPR and an unemployment rate, the first step toward the number employed is:",a:"find the labor force: LFPR × adult population",w:["find the unemployed: rate × adult population","find the EPR: employed ÷ adult population","subtract the unemployment rate from 100%"],e:"LF first, then U, then E."},
 {tp:"formulas",sec:"g-for-steps",t:"tf",q:"To find the steady state you set investment equal to depreciation.",a:true,e:"True — sA√K = δK: new machines equal worn-out ones, so capital stops changing."},

 {tp:"formulas",sec:"g-for-traps",m:1,t:"mc",q:"A student computes inflation from a CPI of 75 to a CPI of 100 and gets 25%. The mistake was:",a:"dividing by the later year’s index instead of the earlier one",w:["forgetting to multiply the answer by one hundred","subtracting the two indexes in the wrong order","using the GDP deflator instead of the CPI"],e:"25 ÷ 100 = 25%; the right answer is 25 ÷ 75 = 33.33%."},
 {tp:"formulas",sec:"g-for-traps",m:1,t:"mc",q:"A student’s unemployment rate comes out far too low. The likeliest mistake is:",a:"dividing the unemployed by the adult population instead of the labor force",w:["dividing the unemployed by the employed instead of the labor force","counting part-time workers among the employed","leaving discouraged workers out of the labor force"],e:"The population is bigger than the labor force, so the rate shrinks."},
 {tp:"formulas",sec:"g-for-traps",m:1,t:"mc",q:"A student adds $500 of unemployment benefits into G. The mistake is that:",a:"transfers are not government purchases — nothing is produced",w:["unemployment benefits belong in C, not in G","benefits should be subtracted from GDP, not added","G includes only spending on the military"],e:"Cross transfers out first."},
 {tp:"formulas",sec:"g-for-traps",m:1,t:"mc",q:"In the natural-rate calculation, the cyclically unemployed are:",a:"left off the top but kept in the labor force on the bottom",w:["left out of both the top and the bottom","kept on the top but left out of the bottom","counted on the top as if they were frictional"],e:"(0.5 + 0.5) ÷ 50, not ÷ 46."},
 {tp:"formulas",sec:"g-for-traps",m:1,t:"mc",q:"A savings rate of 10% enters the Solow equations as:",a:"0.10",w:["10","0.010","1.10"],e:"A percent goes in as a decimal."},
 {tp:"formulas",sec:"g-for-traps",m:1,t:"mc",q:"The rule for fill-in answers on this exam is:",a:"type dollar signs, commas and percent signs exactly as the question asks",w:["leave out every symbol and type the digits only","always round to the nearest whole number","always type a percent as a decimal"],e:"From the study guide: the same styles as the problem sets."},
 {tp:"formulas",sec:"g-for-traps",m:2,ap:true,t:"mc",q:"Gondor has 45,000,000 in the labor force and 2,700,000 unemployed. A student types 42,000,000 employed. The mistake is:",a:"a slip in the subtraction — it is 42,300,000",w:["using the population instead of the labor force","adding the unemployed instead of subtracting","dividing by the rate instead of subtracting"],e:"45,000,000 − 2,700,000. You missed this on Problem Set 3 — check every digit."},
 {tp:"formulas",sec:"g-for-traps",t:"tf",q:"In the base year, real GDP equals nominal GDP and the CPI equals 100.",a:true,e:"True — no second calculation needed."},
 {tp:"formulas",sec:"g-for-traps",t:"tf",q:"An imported machine bought by a U.S. firm raises U.S. GDP.",a:false,e:"False — it raises I and M equally, so GDP is unchanged."},

 {tp:"formulas",sec:"g-for-hooks",m:1,t:"mc",q:"In the Solow model, which rate goes with output and which with capital?",a:"the savings rate goes with output (I = sY); depreciation goes with capital (D = δK)",w:["the savings rate goes with capital (I = sK); depreciation goes with output (D = δY)","both rates go with output — investment is sY and depreciation is δY","both rates go with capital — investment is sK and depreciation is δK"],e:"You save out of income; machines wear out."},
 {tp:"formulas",sec:"g-for-hooks",m:1,t:"mc",q:"Nominal GDP uses which prices, and real GDP which?",a:"nominal uses this year’s prices; real uses the base year’s",w:["nominal uses the base year’s prices; real uses this year’s","both use this year’s prices, with different quantities","both use the base year’s prices, with different quantities"],e:"Nominal = Now; Real = Reference year."},
 {tp:"formulas",sec:"g-for-hooks",m:1,t:"mc",q:"A higher savings rate moves only the investment curve because:",a:"s appears only in I = sY, not in the production function Y = A√K",w:["s appears in the production function, which then lifts investment","saving lowers depreciation, which leaves more for investment","s appears in D = δK, which moves the depreciation line as well"],e:"Ask which equation the letter lives in."},
 {tp:"formulas",sec:"g-for-hooks",m:1,t:"mc",q:"Why are imports subtracted in the GDP formula?",a:"They were counted inside C, I or G but were not produced in the country",w:["They lower the income of the households that buy them","They are a transfer payment made to foreign governments","They are intermediate goods, which GDP never counts"],e:"Who bought it includes imported things — so they come back off."},
 {tp:"formulas",sec:"g-for-hooks",m:1,t:"mc",q:"Public saving is T − G. In words, that is:",a:"the government’s income from taxes minus what it spends on purchases",w:["households’ income after taxes minus what they consume","the country’s output minus consumption and government purchases","the country’s investment minus its national saving"],e:"The second option is private saving; the third is national saving."},
 {tp:"formulas",sec:"g-for-hooks",m:1,t:"mc",q:"In the CPI, which year’s basket cost goes on the bottom?",a:"The base year’s",w:["This year’s","Last year’s","The most expensive year’s"],e:"Base = basement = bottom."},
 {tp:"formulas",sec:"g-for-hooks",m:1,ap:true,t:"mc",q:"You forget the steady-state formula during the exam. How do you rebuild it for Y = A√K?",a:"Set saved equal to worn out — sA√K = δK — so √K = sA ÷ δ and K = (sA ÷ δ)²",w:["Set output equal to capital — A√K = K — so √K = A and K = A², whatever s and δ are","Set consumption equal to investment — (1 − s)Y = sY — so s = 0.5 and K follows","Set depreciation equal to output — δK = A√K — so √K = A ÷ δ and K = (A ÷ δ)²"],e:"Steady state means investment = depreciation."},
 {tp:"formulas",sec:"g-for-hooks",m:1,ap:true,t:"mc",q:"A question gives the CPI for 1990 and for 2020 and a price in 1990 dollars, and asks for 2020 dollars. Which CPI goes on top?",a:"The 2020 CPI — the year you want",w:["The 1990 CPI — the year you have","Neither — you subtract the two","Whichever of the two is smaller"],e:"Want over have."},
 {tp:"formulas",sec:"g-for-hooks",t:"tf",q:"Disinflation means prices are falling.",a:false,e:"False — that is deflation. With disinflation prices still rise, only more slowly."},
 {tp:"formulas",sec:"g-for-hooks",t:"tf",q:"In the GDP deflator, nominal GDP goes on top.",a:true,e:"True — deflator = nominal ÷ real × 100. N before R: nominal goes first, on top."}
]);
