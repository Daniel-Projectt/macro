/* ================================================================ inflation and deflation (Unit 2)
   Lecture, Nov 5: "Inflation and Deflation" (1:00:21) — the last lecture before
   Exam 2 — and the class lecture "Tax Distortions and Inflation" (13:46).     */
CH.infl = {n:12, title:"Inflation and Deflation", short:"Inflation",
 notes:[
  {id:"infl-costs", h:"The Inflation Fallacy, the Seven Costs, and Hyperinflation", body:
   '<div class="point"><b>The point</b><p>The <b>inflation fallacy</b> &mdash; that inflation erodes real income for the economy as a whole &mdash; is wrong: every price rise is someone&rsquo;s income rise, and real income comes from <b>productivity</b>. Inflation still has <b>seven real costs</b>, and they grow the <b>higher and more variable</b> inflation is. <b>Hyperinflation</b> (&ge;50% a month) is &ldquo;inflation on steroids,&rdquo; always from excessive money growth.</p><p class="able"><b>Be able to</b> explain why the fallacy fails (two reasons), list and explain all seven costs, and define hyperinflation with its examples and two extra dangers.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Nov 5 &middot; Problem Set 12 &middot; last lecture before Exam 2</span></p>'+
   '<h3 class="sub" id="infl-fallacy">The inflation fallacy</h3>'+
   '<ul><li>The claim: &ldquo;inflation will erode real income at the aggregate level.&rdquo; <b>Invalid, for two reasons:</b></li>'+
   '<li>(1) <b>Every transaction has two sides</b>: &ldquo;one person&rsquo;s price increase is another person&rsquo;s income increase.&rdquo; Believing otherwise is the <b>fallacy of composition</b>.</li>'+
   '<li>(2) <b>Real income comes from real factors</b> &mdash; above all <b>productivity</b> &mdash; and money is neutral in the long run.</li></ul>'+
   '<h3 class="sub" id="infl-seven">The seven costs of inflation</h3>'+
   '<ol><li><b>Inflation tax</b> &mdash; money held (cash under the mattress) loses purchasing power.</li>'+
   '<li><b>Shoe-leather costs</b> &mdash; time and resources spent converting income into money and managing money holdings.</li>'+
   '<li><b>Menu costs</b> &mdash; the actual cost of changing prices (the restaurant&rsquo;s leather-bound menu).</li>'+
   '<li><b>Misallocation of resources</b> &mdash; prices rise at different speeds, relative prices change, and labor and capital move around, then move back.</li>'+
   '<li><b>Confusion and inconvenience for long-term planning</b> &mdash; rule of 70: at 1% prices double in 70 years, at 2% in 35, at 3% in 23.3.</li>'+
   '<li><b>Tax distortions</b> &mdash; taxes on <b>nominal</b> gains rise even when real income doesn&rsquo;t.</li>'+
   '<li><b>Redistribution between borrowers and creditors</b> &mdash; with <b>unanticipated</b> inflation on <b>nominal</b> loans: inflation <b>higher</b> than expected helps <b>borrowers</b>, hurts creditors; <b>lower</b> than expected helps <b>creditors</b>. A real cost, because lenders cut the supply of credit.</li></ol>'+
   '<p><b>Hook:</b> &ldquo;<b>T</b>ax, <b>S</b>hoes, <b>M</b>enus, <b>M</b>isallocation, <b>C</b>onfusion, <b>T</b>ax again, <b>R</b>edistribution&rdquo; &mdash; <i>The Shoe Menu Makes Confused Taxpayers Redistribute.</i></p>'+
   '<h3 class="sub" id="infl-hyper">Hyperinflation</h3>'+
   '<ul><li><b>Definition:</b> the price level rising by at least <b>50% per month</b>.</li>'+
   '<li><b>Examples:</b> <b>Germany after WWI</b> (printing money for Versailles reparations), <b>Hungary after WWII</b> (the largest ever), <b>Zimbabwe 2007&ndash;08</b>. Prices doubled every day.</li>'+
   '<li><b>Two dangers beyond the normal costs:</b> (1) it is <b>harder to control</b> &mdash; expectations can&rsquo;t settle; (2) it <b>erodes confidence in public institutions</b> (Weimar Germany, then the Nazis).</li>'+
   '<li>Always caused by <b>excessive money growth</b> (the quantity theory).</li></ul>'},

  {id:"infl-benefits", h:"Why Low, Stable Inflation Helps: The Two Benefits", body:
   '<div class="point"><b>The point</b><p>Central banks target <b>positive</b> inflation (the Fed about 2%) because low, stable inflation has <b>two benefits</b>: (1) it prevents <b>dynamic inefficiency</b> from sticky wages and prices &mdash; <b>the more important one</b>; (2) it keeps nominal rates away from the <b>zero lower bound</b>. <b>Low</b> keeps costs down; <b>stable</b> anchors expectations.</p><p class="able"><b>Be able to</b> tell the 0% vs 2% layoff story and use r = n &minus; &pi;<sup>e</sup> to show the room-to-cut benefit.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Nov 5 &middot; he says benefit 1 matters more</span></p>'+
   '<h3 class="sub" id="infl-grease">Benefit 1: inflation greases the wheels</h3>'+
   '<ul><li><b>Dynamic inefficiency:</b> markets don&rsquo;t clear over time because of a rigidity. <b>Price stickiness:</b> prices don&rsquo;t change quickly with supply and demand.</li>'+
   '<li><b>At 0% inflation</b>, a firm hit by a recession must cut costs 5%. People hate <b>nominal pay cuts</b> (<b>downward nominal wage rigidity</b>), so it <b>lays people off</b> &rarr; less spending &rarr; more layoffs: a <b>spiral</b>.</li>'+
   '<li><b>At 2% inflation</b>, it only needs a 1% cut: a <b>1% nominal raise</b> is a <b>1% real cut</b>. No layoffs, no spiral. Inflation &ldquo;greases the wheels of the labor market.&rdquo;</li></ul>'+
   '<h3 class="sub" id="infl-zlb">Benefit 2: room to cut rates</h3>'+
   '<ul><li>With r = 3%: if &pi;<sup>e</sup> = 0%, n = 3%; if &pi;<sup>e</sup> = 2%, n = <b>5%</b> &mdash; more room to cut in a downturn.</li>'+
   '<li>Rates can go a little negative, but not far, because people can switch to cash.</li>'+
   '<li>Weaker today because the Fed has other tools (QE), but it still matters when growth is slow.</li></ul>'},

  {id:"infl-defl", h:"Good and Bad Deflation, and Inflation Expectations", body:
   '<div class="point"><b>The point</b><p><b>Deflation</b> is a general fall in the price level. <b>Good deflation</b> comes from <b>productivity</b> (the Industrial Revolution) &mdash; nothing wrong with it. <b>Bad deflation</b> comes from <b>falling nominal spending</b> (the Great Depression, when the money supply fell about a third). <b>Expectations</b> matter because they drive behavior today; <b>forward guidance</b> anchors them.</p><p class="able"><b>Be able to</b> tell good from bad deflation, give bad deflation&rsquo;s two problems, and explain how the Fed measures expected inflation.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Nov 5</span></p>'+
   '<h3 class="sub" id="infl-gb">Good vs bad deflation</h3>'+
   '<div class="boxrow"><div class="box"><h4>Good deflation</h4><p>Technology lowers costs; firms keep margins, consumers buy more, wealth rises. The Industrial Revolution.</p></div><div class="box"><h4>Bad deflation</h4><p>Nominal spending (M &times; V) falls. Great Depression: prices fell about 33% and nominal GDP about 50% (1929&ndash;32); money supply fell about a third.</p></div></div>'+
   '<ul><li><b>Why bad deflation hurts &mdash; two problems:</b> (1) <b>downward nominal wage rigidity</b> &rarr; unemployment and a spiral; (2) it <b>raises debt burdens</b> &mdash; dollars owed are worth more while your income falls.</li>'+
   '<li><b>1896 election</b> &mdash; the only one centered on monetary policy: after 30 years of gentle deflation hurt farmers (debtors), <b>William Jennings Bryan</b> (&ldquo;Cross of Gold&rdquo;) wanted gold plus silver. <b>FDR</b> left the gold standard in 1933 to end bad deflation.</li></ul>'+
   '<h3 class="sub" id="infl-exp">Inflation expectations</h3>'+
   '<ul><li>Bernanke: when the public trusts the central bank to keep inflation low and stable, shocks have <b>transitory</b> effects.</li>'+
   '<li><b>Two ways to measure:</b> (1) <b>surveys</b> of businesses; (2) <b>market measures</b>:</li>'+
   '<li><b>Breakeven inflation</b> = the yield on a <b>conventional Treasury</b> minus the yield on a <b>TIPS</b> of the same maturity. A <b>larger spread</b> means <b>higher</b> expected inflation.</li>'+
   '<li><b>5-year, 5-year forward</b>: expected inflation over the 5 years that <b>start 5 years from now</b>.</li>'+
   '<li>Anchored expectations make planning easier and shrink the costs of inflation and bad deflation. &ldquo;<b>Forward guidance is about anchoring inflation expectations.</b>&rdquo;</li></ul>'},

  {id:"infl-tax", h:"Tax Distortions and Inflation", body:
   '<div class="point"><b>The point</b><p>When the government taxes <b>nominal</b> gains, inflation raises the tax bill with <b>no rise in real income</b>, so the <b>after-tax real return falls</b>. With no inflation, there is no distortion.</p><p class="able"><b>Be able to</b> compute nominal and real gains, the tax, the after-tax nominal rate and the after-tax real rate.</p></div>'+
   '<p class="knowline"><span class="know">Class lecture &middot; Nov 5</span></p>'+
   '<h3 class="sub" id="infl-taxf">The formulas and his two scenarios</h3>'+
   '<div class="formula">After-tax nominal rate = (1 &minus; tax rate) &times; nominal rate &nbsp;&middot;&nbsp; After-tax real rate = after-tax nominal rate &minus; inflation<small>tax = tax rate &times; <b>nominal</b> gain &middot; real rate = nominal &minus; inflation</small></div>'+
   '<div class="tblwrap"><table class="tbl fit c3"><thead><tr><th>$1,000, 25% tax</th><th>10% nominal, 0% inflation</th><th>20% nominal, 10% inflation</th></tr></thead><tbody>'+
   '<tr><td class="head">Nominal gain</td><td class="sm">$100</td><td class="sm">$200</td></tr>'+
   '<tr><td class="head">Real gain</td><td class="sm">$100</td><td class="sm">$100</td></tr>'+
   '<tr><td class="head">Tax paid</td><td class="sm">$25</td><td class="sm"><b>$50</b></td></tr>'+
   '<tr><td class="head">After-tax nominal rate</td><td class="sm">7.5%</td><td class="sm">15%</td></tr>'+
   '<tr><td class="head">After-tax real rate</td><td class="sm">7.5%</td><td class="sm"><b>5%</b></td></tr></tbody></table></div>'+
   '<p>Same real gain ($100), but the tax doubles and the after-tax real return falls from 7.5% to 5%. <b>That gap is the distortion.</b></p>'}
 ],
 decks:[
  {id:"terms", label:"Key terms", cards:[
   ["Inflation fallacy","The false claim that inflation erodes real income for the economy as a whole","g-infl-costs"],
   ["Inflation tax","Money held loses purchasing power","g-infl-costs"],
   ["Shoe-leather costs","Time and resources spent converting income into money and managing it","g-infl-costs"],
   ["Menu costs","The actual cost of changing prices","g-infl-costs"],
   ["Hyperinflation","The price level rising at least 50% per month","g-infl-costs"],
   ["Dynamic inefficiency","Markets don’t clear over time because of a rigidity","g-infl-benefits"],
   ["Price stickiness","Prices don’t change quickly with supply and demand","g-infl-benefits"],
   ["Downward nominal wage rigidity","People resist nominal pay cuts","g-infl-benefits"],
   ["Deflation","A general fall in the aggregate price level","g-infl-defl"],
   ["Good deflation","Prices fall because productivity rises — the Industrial Revolution","g-infl-defl"],
   ["Bad deflation","Prices fall because nominal spending falls — the Great Depression","g-infl-defl"],
   ["Breakeven inflation","Conventional Treasury yield minus TIPS yield, same maturity","g-infl-defl"],
   ["5-year, 5-year forward","Expected inflation over the 5 years starting 5 years from now","g-infl-defl"]]},
  {id:"lists", label:"Lists and numbers", cards:[
   ["Two reasons the fallacy fails","Every transaction has two sides; real income comes from productivity","g-infl-costs"],
   ["The seven costs","Inflation tax · shoe leather · menu · misallocation · planning confusion · tax distortions · borrower–creditor redistribution","g-infl-costs"],
   ["Inflation higher than expected","Helps borrowers, hurts creditors","g-infl-costs"],
   ["Three hyperinflations","Germany after WWI, Hungary after WWII, Zimbabwe 2007–08","g-infl-costs"],
   ["Two extra dangers of hyperinflation","Harder to control; erodes confidence in institutions","g-infl-costs"],
   ["Two benefits of low, stable inflation","Greases the wheels (the more important); room to cut rates","g-infl-benefits"],
   ["Rule of 70 at 2% inflation","Prices double in 35 years","g-infl-costs"],
   ["Two problems of bad deflation","Nominal wage rigidity and heavier debt burdens","g-infl-defl"],
   ["1896 election","Bryan’s “Cross of Gold”: add silver to help indebted farmers","g-infl-defl"],
   ["Forward guidance","Anchors inflation expectations","g-infl-defl"],
   ["After-tax real rate, 20% nominal, 10% inflation, 25% tax","15% − 10% = 5%","g-infl-tax"]]}
 ]
};
GUIDE.sections.splice(GUIDE.sections.length - 1, 0, {h:"Inflation and Deflation", tp:"infl", items:[
 {id:"g-infl-costs", t:"The Inflation Fallacy, the Seven Costs, and Hyperinflation", a:"infl-costs",
  short:"The fallacy fails: two sides to every transaction; real income from productivity. Seven costs: inflation tax, shoe leather, menu, misallocation, planning confusion, tax distortions, borrower–creditor redistribution. Hyperinflation ≥ 50% a month (Germany, Hungary, Zimbabwe).",
  subs:[["The fallacy","infl-fallacy"],["The seven costs","infl-seven"],["Hyperinflation","infl-hyper"]]},
 {id:"g-infl-benefits", t:"Why Low, Stable Inflation Helps: The Two Benefits", a:"infl-benefits",
  short:"(1) Greases the wheels: a 1% nominal raise at 2% inflation is a 1% real cut, no layoffs (more important). (2) Room to cut: r = 3%, πᵉ = 2% → n = 5%.",
  subs:[["Greasing the wheels","infl-grease"],["Room to cut rates","infl-zlb"]]},
 {id:"g-infl-defl", t:"Good and Bad Deflation, and Inflation Expectations", a:"infl-defl",
  short:"Good (productivity) vs bad (falling spending, the Depression). Bad: wage rigidity and heavier debts. 1896, Bryan. Expectations: surveys, breakeven (Treasury − TIPS), 5y5y forward; forward guidance anchors them.",
  subs:[["Good vs bad deflation","infl-gb"],["Inflation expectations","infl-exp"]]},
 {id:"g-infl-tax", t:"Tax Distortions and Inflation", a:"infl-tax",
  short:"After-tax nominal = (1 − t) × n; after-tax real = that − inflation. $1,000, 25%: 10%/0% → $25 tax, 7.5% real; 20%/10% → $50 tax, 5% real.",
  subs:[["Formulas and scenarios","infl-taxf"]]}]});

QB = QB.concat([
 {tp:"infl",sec:"g-infl-costs",t:"mc",q:"The inflation fallacy is the belief that:",a:"inflation erodes real income for the economy as a whole",w:["inflation is always caused by money growth","inflation helps borrowers when it is unexpected","inflation has no costs at all"],e:"Invalid: one person’s price increase is another’s income increase, and real income comes from productivity."},
 {tp:"infl",sec:"g-infl-costs",t:"mc",q:"According to the lecture, the number one factor that changes real income is:",a:"productivity",w:["the inflation rate","the money supply","the nominal interest rate"],e:"Money is neutral in the long run; real factors set real income."},
 {tp:"infl",sec:"g-infl-costs",t:"mc",q:"A restaurant must reprint its leather-bound menus every time its costs rise. This is:",a:"a menu cost",w:["a shoe-leather cost","the inflation tax","a tax distortion"],e:"The actual cost of changing prices."},
 {tp:"infl",sec:"g-infl-costs",t:"mc",q:"Cash kept under a mattress buys less each year because of inflation. This cost is:",a:"the inflation tax",w:["a menu cost","a shoe-leather cost","misallocation of resources"],e:"Money held loses purchasing power: value of money = 1/P."},
 {tp:"infl",sec:"g-infl-costs",ap:true,t:"mc",q:"Inflation turns out higher than expected on a fixed-rate nominal mortgage. Who gains?",a:"The borrower, who repays with less valuable dollars",w:["The lender, who receives more valuable dollars","Neither, since the loan was fixed","Both equally"],e:"Unanticipated inflation redistributes from creditors to borrowers — and lenders then supply less credit."},
 {tp:"infl",sec:"g-infl-costs",t:"mc",q:"Why is borrower–creditor redistribution a real cost, not just a transfer?",a:"With ongoing, unpredictable inflation, lenders reduce the overall supply of credit",w:["Borrowers always spend their gains on imports, so domestic output falls", "The government taxes the transfer, which reduces what both sides keep", "It raises the natural rate of unemployment by making workers less willing to work"],e:"Less credit is a real loss to the economy."},
 {tp:"infl",sec:"g-infl-costs",t:"mc",q:"Hyperinflation is defined as the price level rising by at least:",a:"50% per month",w:["50% per year","10% per month","100% per year"],e:"Germany after WWI, Hungary after WWII (the largest), Zimbabwe 2007–08."},
 {tp:"infl",sec:"g-infl-costs",t:"mc",q:"Which is one of hyperinflation’s two dangers beyond the normal costs of inflation?",a:"It erodes confidence in public institutions",w:["It lowers the natural rate of unemployment","It raises the value of money","It makes menu costs disappear"],e:"The other: it is harder to control, since expectations can’t settle. Weimar Germany’s collapse is his example."},
 {tp:"infl",sec:"g-infl-costs",ap:true,t:"mc",q:"At 3% inflation, roughly how long until the price level doubles?",a:"About 23.3 years",w:["About 35 years, the same as at 2% inflation", "About 70 years, since prices rise slowly", "About 3 years, one year for each point of inflation"],e:"Rule of 70: 70 ÷ 3 ≈ 23.3. The value of money halves over the same period."},
 {tp:"infl",sec:"g-infl-costs",t:"tf",q:"All seven costs of inflation get bigger the higher and more variable inflation is.",a:true,e:"True — his summary of the seven costs."},
 {tp:"infl",sec:"g-infl-costs",t:"tf",q:"Believing inflation lowers real income for everyone is an example of the fallacy of composition.",a:true,e:"True: what is true for one buyer (paying more) isn’t true for the whole, since sellers receive more."},

 {tp:"infl",sec:"g-infl-benefits",t:"mc",q:"Which benefit of low, stable inflation did he say is the more important one?",a:"Preventing dynamic inefficiency from sticky wages and prices",w:["Keeping nominal rates away from the zero lower bound","Raising the inflation tax revenue","Making menu costs smaller"],e:"Inflation “greases the wheels of the labor market.”"},
 {tp:"infl",sec:"g-infl-benefits",ap:true,t:"mc",q:"Inflation is 2% and a firm must cut real labor costs 1% in a downturn. Without layoffs, it can:",a:"give a 1% nominal raise, which is a 1% real pay cut",w:["cut nominal pay by 3%","give a 3% nominal raise","freeze pay, which is a 1% real raise"],e:"1% − 2% = −1% real. At 0% inflation it would need a nominal cut, which people hate, so it would lay people off."},
 {tp:"infl",sec:"g-infl-benefits",t:"mc",q:"Downward nominal wage rigidity means:",a:"people strongly resist cuts to their nominal pay",w:["wages never rise","wages rise automatically with inflation","the minimum wage is always binding"],e:"It is why firms lay people off instead of cutting pay when there is no inflation."},
 {tp:"infl",sec:"g-infl-benefits",ap:true,t:"mc",q:"The real interest rate is 3%. If expected inflation is 2% instead of 0%, the nominal rate is:",a:"5% instead of 3%, leaving more room to cut in a downturn",w:["1% instead of 3%, leaving less room to cut rates in a downturn", "3% either way, since the nominal rate doesn’t depend on expectations", "6% instead of 3%, since expected inflation doubles the nominal rate"],e:"n = r + πᵉ: 3 + 2 = 5."},
 {tp:"infl",sec:"g-infl-benefits",t:"mc",q:"Dynamic inefficiency is:",a:"when markets do not clear over time because of some rigidity",w:["when prices change too quickly","when the central bank targets zero inflation","when output grows faster than money"],e:"Examples: binding price floors or ceilings, regulatory barriers, sticky wages."},
 {tp:"infl",sec:"g-infl-benefits",t:"mc",q:"Why can’t nominal interest rates go far below zero?",a:"People can switch to holding cash",w:["The law forbids negative rates","Banks cannot pay interest","The Fed has no tools below zero"],e:"Cash pays 0%, so deeply negative rates push people into cash."},
 {tp:"infl",sec:"g-infl-benefits",t:"tf",q:"At 0% inflation, a firm facing a recession is more likely to lay workers off than to cut everyone’s pay.",a:true,e:"True — because of downward nominal wage rigidity, and the layoffs can start a spiral."},
 {tp:"infl",sec:"g-infl-benefits",t:"tf",q:"Central banks target 0% inflation because any inflation is harmful.",a:false,e:"False. They target low positive inflation (the Fed about 2%) for its two benefits."},

 {tp:"infl",sec:"g-infl-defl",t:"mc",q:"Good deflation happens when prices fall because:",a:"technological progress lowers the cost of production",w:["nominal spending falls as households and firms cut back", "the money supply shrinks after the central bank tightens", "velocity collapses as people hoard money in a panic"],e:"The Industrial Revolution — “make more with less.”"},
 {tp:"infl",sec:"g-infl-defl",t:"mc",q:"Bad deflation happens when prices fall because:",a:"nominal spending falls",w:["productivity rises","new technology lowers costs","imports become cheaper"],e:"A fall in M, V or both. The Great Depression is the example."},
 {tp:"infl",sec:"g-infl-defl",t:"mc",q:"During the Great Depression, the money supply fell by about:",a:"one third",w:["one tenth","one half","two thirds"],e:"From 1929 to 1932 prices fell about 33% and nominal GDP about 50%."},
 {tp:"infl",sec:"g-infl-defl",t:"mc",q:"Which are the two problems with bad deflation?",a:"Downward nominal wage rigidity and heavier debt burdens",w:["Menu costs and shoe-leather costs","Higher velocity and lower money demand","Higher real wages and lower unemployment"],e:"Unemployment spirals, and debts are repaid in more valuable dollars while incomes fall."},
 {tp:"infl",sec:"g-infl-defl",ap:true,t:"mc",q:"A 5-year Treasury yields 4.5% and a 5-year TIPS yields 2.0%. The breakeven inflation rate is:",a:"2.5%",w:["6.5%","2.0%","4.5%"],e:"Conventional minus TIPS, same maturity: 4.5 − 2.0 = 2.5%. A bigger spread means higher expected inflation."},
 {tp:"infl",sec:"g-infl-defl",t:"mc",q:"The 5-year, 5-year forward inflation expectation measures expected inflation:",a:"over the 5 years that begin 5 years from today",w:["over the next 5 years, starting from today", "over the full 10 years starting from today", "in the single year exactly 5 years from now"],e:"There is also a 10-year, 10-year version."},
 {tp:"infl",sec:"g-infl-defl",t:"mc",q:"The 1896 presidential election is notable because:",a:"it was the only one centered on monetary policy, with Bryan urging silver to help indebted farmers",w:["it ended the gold standard after decades of inflation had hurt farmers and other creditors", "it created the Federal Reserve so that a central bank could stop repeated bank panics", "it followed a hyperinflation caused by printing money to pay off Civil War debts"],e:"Thirty years of gentle deflation had hurt debtors. FDR later left gold in 1933."},
 {tp:"infl",sec:"g-infl-defl",t:"mc",q:"He summed up forward guidance as being about:",a:"anchoring inflation expectations",w:["setting the discount rate","raising the money supply","ending deflation by law"],e:"Anchored expectations make shocks transitory (Bernanke)."},
 {tp:"infl",sec:"g-infl-defl",t:"tf",q:"If prices are falling because of technological progress, there’s nothing wrong with deflation.",a:true,e:"True. When technology lowers costs, firms keep their margins and buyers get more for less — the Industrial Revolution was good deflation."},
 {tp:"infl",sec:"g-infl-defl",t:"tf",q:"A smaller spread between a conventional Treasury and a TIPS means higher expected inflation.",a:false,e:"False. A larger spread means higher expected inflation."},

 {tp:"infl",sec:"g-infl-tax",m:1,ap:true,t:"mc",q:"$1,000 is deposited for a year at a 10% nominal rate, with no inflation and a 25% tax on nominal interest. The tax paid and the after-tax real rate are:",a:"$25 and 7.5%",w:["$25 and 10%","$50 and 5%","$100 and 7.5%"],e:"Tax = 25% × $100. After-tax nominal = 0.75 × 10% = 7.5%; minus 0% inflation = 7.5%."},
 {tp:"infl",sec:"g-infl-tax",m:1,ap:true,t:"mc",q:"$1,000 is deposited at a 20% nominal rate with 10% inflation and a 25% tax on nominal interest. The tax paid and the after-tax real rate are:",a:"$50 and 5%",w:["$25 and 7.5%","$50 and 15%","$25 and 5%"],e:"Tax = 25% × $200 = $50. After-tax nominal = 0.75 × 20% = 15%; minus 10% = 5%."},
 {tp:"infl",sec:"g-infl-tax",t:"mc",q:"The after-tax nominal rate is:",a:"(1 − tax rate) × nominal rate",w:["nominal rate − tax rate","nominal rate − inflation","(1 + tax rate) × nominal rate"],e:"Then subtract inflation for the after-tax real rate."},
 {tp:"infl",sec:"g-infl-tax",t:"mc",q:"Why does inflation distort taxes on interest and capital gains?",a:"The tax falls on nominal gains, which rise with inflation even when real gains don’t",w:["Tax rates rise automatically every year with the rate of inflation", "Inflation lowers nominal interest rates, so savers earn less before tax", "Real gains are taxed twice, once as income and again as capital gains"],e:"His two scenarios: same $100 real gain, but the tax doubles from $25 to $50."},
 {tp:"infl",sec:"g-infl-tax",ap:true,t:"mc",q:"In his two scenarios the real gain is $100 both times. What changes when inflation goes from 0% to 10%?",a:"The tax doubles and the after-tax real rate falls from 7.5% to 5%",w:["Nothing, since the real gain is the same","The tax falls and the after-tax real rate rises","The nominal gain falls to $50"],e:"That gap is the distortion."},
 {tp:"infl",sec:"g-infl-tax",ap:true,t:"mc",q:"A saver earns 8% nominal, pays a 25% tax on nominal interest, and inflation is 4%. The after-tax real rate is:",a:"2%",w:["4%","6%","3%"],e:"0.75 × 8% = 6% after tax; 6% − 4% = 2%."},
 {tp:"infl",sec:"g-infl-tax",t:"tf",q:"With zero inflation, taxing nominal interest creates no inflation distortion: after-tax nominal and after-tax real rates are equal.",a:true,e:"True — Q4 and Q5 in his first scenario are both 7.5%."},
 {tp:"infl",sec:"g-infl-tax",t:"tf",q:"Taxes on nominal gains are fair under inflation because the real gain rises with the nominal gain.",a:false,e:"False. The nominal gain rises with inflation while the real gain doesn’t, so the tax takes a bigger share of the real return."}
]);

PRACTICE_TOPICS.push(["infl","Inflation"]);
TOPIC_LABEL.infl = "Inflation";
GENS.push(
 {id:"infl-tax", topic:"infl", name:"Taxes, inflation and after-tax returns", variants:2,
  remind:"Tax = rate × nominal gain. After-tax nominal = (1 − tax) × nominal. After-tax real = after-tax nominal − inflation.",
  make:function(v){
   v = v || ri(1, 2);
   var dep = ri(1, 10) * 1000, tax = rp([10, 20, 25, 30, 40]), infl = ri(0, 8), nom = infl + ri(2, 10), atn = (1 - tax / 100) * nom, atr = atn - infl, gain = dep * nom / 100;
   var text = usd(dep) + " is deposited for one year at a " + nom + "% nominal rate. Inflation is " + infl + "% and nominal interest is taxed at " + tax + "%.";
   if(v === 1) return {v:v, vals:{}, text:text,
    parts:[P("tax", "the tax paid", gain * tax / 100, 2, "$", tax + "% × " + usd(gain) + " (the nominal gain) = " + usd(gain * tax / 100) + ".", {wrong:[dep * (nom - infl) / 100 * tax / 100, gain, gain * (1 - tax / 100)]}),
           P("real", "the growth in the real value (before tax)", dep * (nom - infl) / 100, 2, "$", usd(dep) + " × (" + nom + "% − " + infl + "%) = " + usd(dep * (nom - infl) / 100) + ".", {wrong:[gain, gain * (1 - tax / 100), dep * infl / 100]})]};
   return {v:v, vals:{}, text:text,
    parts:[P("atn", "the after-tax nominal rate", atn, 2, "%", "(1 − " + num(tax / 100, 2) + ") × " + nom + "% = " + num(atn, 2) + "%.", {wrong:[nom - tax / 10, nom * tax / 100, atr]}),
           P("atr", "the after-tax real rate", atr, 2, "%", num(atn, 2) + "% − " + infl + "% = " + num(atr, 2) + "%." + (atr < 0 ? " Negative: taxes plus inflation eat the whole return." : ""), {signed:true, wrong:[atn, nom - infl, (1 - tax / 100) * (nom - infl)]})]};
  }},
 {id:"infl-be", topic:"infl", name:"Breakeven inflation", remind:"Breakeven = conventional Treasury yield − TIPS yield, same maturity. Bigger spread, higher expected inflation.",
  make:function(){
   var tips = ri(0, 6) / 2, be = ri(2, 10) / 2, conv = tips + be, yrs = rp([5, 10, 20, 30]);
   return {vals:{}, text:"A " + yrs + "-year Treasury yields " + num(conv, 1) + "% and a " + yrs + "-year TIPS yields " + num(tips, 1) + "%.",
    parts:[P("be", "the breakeven (expected) inflation rate", be, 1, "%", num(conv, 1) + " − " + num(tips, 1) + " = " + num(be, 1) + "%.", {wrong:[conv + tips, conv, tips]})]};
  }});
GEN_BY_ID["infl-tax"] = GENS[GENS.length - 2]; GEN_BY_ID["infl-be"] = GENS[GENS.length - 1];
[{id:"ex-tax", gen:"infl-tax", src:"Class lecture", make:function(){
   return {text:"$1,000 is deposited for one year and nominal interest is taxed at 25%. Scenario 1: 10% nominal, no inflation. Scenario 2: 20% nominal, 10% inflation.",
    parts:[P("t1", "the tax paid in scenario 1", 25, 2, "$", "25% × $100 = $25.", {wrong:[50, 100, 75]}),
           P("r1", "the after-tax real rate in scenario 1", 7.5, 2, "%", "0.75 × 10% − 0% = 7.5%.", {wrong:[10, 5, 2.5]}),
           P("t2", "the tax paid in scenario 2", 50, 2, "$", "25% × $200 = $50 — double, with the same real gain.", {wrong:[25, 200, 100]}),
           P("n2", "the after-tax nominal rate in scenario 2", 15, 2, "%", "0.75 × 20% = 15%.", {wrong:[5, 20, 10]}),
           P("r2", "the after-tax real rate in scenario 2", 5, 2, "%", "15% − 10% = 5%.", {wrong:[7.5, 15, 10]})]};
  }}].forEach(function(f){ f.topic = GEN_BY_ID[f.gen].topic; FIXED.push(f); FIXED_BY_ID[f.id] = f; });
