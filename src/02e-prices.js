/* ================================================================ prices
   Price levels, the CPI and inflation. Two sections, from Problem Set 4 and
   the Comparing Dollar Figures exercise.                                      */
CH.prices = {n:4, title:"Price Levels, CPI and Inflation", short:"Prices",
 notes:[
  {id:"pri-index", h:"CPI, the Deflator and Converting Dollars", body:
   '<div class="point"><b>The point</b><p>A price index compares the cost of a <b>fixed basket</b> today with its cost in the <b>base year</b>, and the base year is set to <b>100</b>. The GDP deflator does the same job with nominal and real GDP. Inflation is the percent change in the index &mdash; <b>divided by the earlier year</b>. And to move a dollar figure between years, multiply by the ratio of the two indexes.</p><p class="able"><b>Be able to</b> price a basket in two years, turn it into a CPI, compute the inflation rate, compute a deflator, and convert dollars between years.</p></div>'+
   '<p class="knowline"><span class="know">Problem Set 4 Q1&ndash;10 &middot; Comparing Dollar Figures &mdash; you missed the inflation-rate question</span></p>'+
   '<div class="formula">CPI<sub>t</sub> = cost of basket<sub>t</sub> &divide; cost of basket<sub>base</sub> &times; 100 &nbsp;&nbsp;&middot;&nbsp;&nbsp; Deflator<sub>t</sub> = nominal GDP<sub>t</sub> &divide; real GDP<sub>t</sub> &times; 100</div>'+
   '<div class="formula">Inflation = (P<sub>new</sub> &minus; P<sub>old</sub>) &divide; P<sub>old</sub> &times; 100 &nbsp;&nbsp;&middot;&nbsp;&nbsp; $ in year A = $ in year B &times; CPI<sub>A</sub> &divide; CPI<sub>B</sub></div>'+
   '<h3 class="sub" id="pri-worked">Worked examples</h3>'+
   '<div class="tblwrap"><table class="tbl fit"><colgroup><col style="width:34%"><col></colgroup><thead><tr><th class="f" colspan="2">Problem Set 4, Q2 &mdash; basket: 5 apples, 2 jackets, 1 TV &middot; base year 2025</th></tr></thead><tbody>'+
   '<tr><td class="head">Basket in 2024</td><td class="sm">5 &times; $2 + 2 &times; $40 + $300 = <b>$390</b></td></tr>'+
   '<tr><td class="head">Basket in 2025</td><td class="sm">5 &times; $4 + 2 &times; $50 + $400 = <b>$520</b></td></tr>'+
   '<tr><td class="head">CPI 2024</td><td class="sm">390 &divide; 520 &times; 100 = <b>75</b></td></tr>'+
   '<tr><td class="head">CPI 2025</td><td class="sm"><b>100</b> (the base year)</td></tr>'+
   '<tr><td class="head">Inflation 2024 &rarr; 2025</td><td class="sm">(100 &minus; 75) &divide; 75 = <b>33.33%</b> &mdash; <b>not</b> &minus;25%</td></tr>'+
   '</tbody></table></div>'+
   '<div class="exam-tip"><b>You missed this one</b>Always divide by the <b>earlier</b> year&rsquo;s index. From 75 to 100 the rise is 25 points on a base of 75, so 33.33%. Dividing by 100 gives 25%, and getting the sign wrong gives &minus;25%.</div>'+
   '<ul><li><b>Comparing dollar figures</b>: CPI 100 in 1980, 300 in 2020. $30 in 2020 = 30 &times; 100 &divide; 300 = <b>$10</b> in 1980 dollars.</li></ul>'},

  {id:"pri-concepts", h:"Inflation, Disinflation, Deflation and the CPI’s Bias", body:
   '<div class="point"><b>The point</b><p><b>Inflation</b>: the price level rises, so each dollar buys less. <b>Disinflation</b>: inflation slows &mdash; from 6% to 3% &mdash; but prices <i>still rise</i>. <b>Deflation</b>: the price level falls, and it is the <b>only</b> way prices return to an earlier level. Then the measurement issues: which index, and why the CPI <b>overstates</b> inflation.</p><p class="able"><b>Be able to</b> tell the three apart from a number, say what 0% inflation after years of inflation means, contrast the CPI with the PPI and core with headline, and give the reasons the CPI overstates inflation.</p></div>'+
   '<p class="knowline"><span class="know">Problem Set 4 &middot; Sep 17&ndash;22</span></p>'+
   '<div class="levels">'+
   '<div class="lv"><b>Inflation</b><span>The price level rises; the value of money falls.</span></div>'+
   '<div class="lv"><b>Disinflation</b><span>Inflation slows but prices still rise &mdash; 6% to 3%.</span></div>'+
   '<div class="lv"><b>Deflation</b><span>The price level falls. Only deflation brings prices back to an earlier level.</span></div>'+
   '<div class="lv"><b>0% inflation</b><span>After years of inflation, prices are <b>frozen at the higher level</b> &mdash; they do not go back.</span></div></div>'+
   '<h3 class="sub" id="pri-bias">CPI vs PPI, and the bias</h3>'+
   '<ul><li><b>CPI</b> = prices of the goods consumers buy; <b>PPI</b> = prices producers receive. <b>Core CPI</b> excludes food and energy; <b>headline</b> includes them.</li>'+
   '<li>The CPI tends to <b>overstate</b> inflation: <b>quality improvements</b> are hard to measure, and it also ignores <b>substitution</b> and <b>new goods</b>.</li>'+
   '<li><b>Cost of living</b> is about changes in <b>prices</b>; <b>standard of living</b> is about changes in <b>purchasing power</b>.</li></ul>'}
 ],
 decks:[
  {id:"terms", label:"Key terms", cards:[
   ["Price index","The cost of a fixed basket compared with its cost in the base year, base year = 100","g-pri-index"],
   ["Consumer price index (CPI)","Cost of the basket this year ÷ cost in the base year × 100","g-pri-index"],
   ["GDP deflator","Nominal GDP ÷ real GDP × 100","g-pri-index"],
   ["Inflation rate","(P new − P old) ÷ P old × 100 — divide by the earlier year","g-pri-index"],
   ["Converting dollars between years","$ in year A = $ in year B × CPI A ÷ CPI B","g-pri-index"],
   ["Base year (index)","The year whose basket cost is set to 100","g-pri-index"],
   ["Fixed basket","The same goods in the same quantities, priced each year","g-pri-index"],
   ["Inflation","The price level rises, so each dollar buys less","g-pri-concepts"],
   ["Disinflation","Inflation slows but prices still rise — 6% to 3%","g-pri-concepts"],
   ["Deflation","The price level falls — the only way back to an earlier level","g-pri-concepts"],
   ["Zero inflation after years of inflation","Prices frozen at the higher level","g-pri-concepts"],
   ["Producer price index (PPI)","The prices producers receive for their output","g-pri-concepts"],
   ["Core CPI","The CPI excluding food and energy","g-pri-concepts"],
   ["Headline CPI","The CPI including food and energy","g-pri-concepts"],
   ["Why the CPI overstates inflation","Quality improvements are hard to measure; substitution and new goods are ignored","g-pri-concepts"],
   ["Cost of living","Changes in prices","g-pri-concepts"],
   ["Standard of living","Changes in purchasing power","g-pri-concepts"]]},
  {id:"lists", label:"Formulas & lists", cards:[
   ["Basket 5 apples, 2 jackets, 1 TV in 2024 ($2, $40, $300)","$390","g-pri-index"],
   ["Same basket in 2025 ($4, $50, $400)","$520","g-pri-index"],
   ["CPI 2024 with base 2025","390 ÷ 520 × 100 = 75","g-pri-index"],
   ["Inflation from CPI 75 to 100","(100 − 75) ÷ 75 = 33.33%","g-pri-index"],
   ["$30 in 2020 (CPI 300) in 1980 dollars (CPI 100)","30 × 100 ÷ 300 = $10","g-pri-index"],
   ["Which year to divide by","The earlier year","g-pri-index"],
   ["The three -flations in one line","Inflation: prices up · disinflation: up more slowly · deflation: down","g-pri-concepts"],
   ["The only way prices return to an earlier level","Deflation","g-pri-concepts"],
   ["CPI vs PPI","Consumers pay vs producers receive","g-pri-concepts"],
   ["Core vs headline","Core excludes food and energy; headline includes them","g-pri-concepts"],
   ["Three sources of CPI bias","Quality improvements, substitution, new goods","g-pri-concepts"]]}
 ]
};

/* ---- prices questions ---- */
QB = QB.concat([
 {tp:"prices",sec:"g-pri-index",m:1,t:"mc",q:"A price index compares:",a:"the cost of a fixed basket today with its cost in the base year",w:["the price of one good with the price of another good","nominal GDP with the quantity of money in circulation","average wages today with average wages in the base year"],e:"Base year = 100."},
 {tp:"prices",sec:"g-pri-index",m:1,t:"mc",q:"The CPI in year t is:",a:"cost of the basket in t ÷ cost in the base year × 100",w:["cost in the base year ÷ cost of the basket in t × 100","nominal GDP in t ÷ real GDP in t × 100","(P new − P old) ÷ P old × 100"],e:"Basket over base."},
 {tp:"prices",sec:"g-pri-index",m:1,t:"mc",q:"The GDP deflator is:",a:"nominal GDP ÷ real GDP × 100",w:["real GDP ÷ nominal GDP × 100","the CPI × real GDP ÷ 100","nominal GDP − real GDP"],e:"How much of nominal GDP is prices."},
 {tp:"prices",sec:"g-pri-index",m:1,t:"mc",q:"The inflation rate between two years is:",a:"(P new − P old) ÷ P old × 100",w:["(P new − P old) ÷ P new × 100","P new ÷ P old × 100","(P old − P new) ÷ P old × 100"],e:"Always divide by the earlier year."},
 {tp:"prices",sec:"g-pri-index",m:1,t:"mc",q:"Basket: 5 apples, 2 jackets, 1 TV. In 2024 apples cost $2, jackets $40, the TV $300. The basket costs:",a:"$390",w:["$342","$520","$400"],e:"10 + 80 + 300."},
 {tp:"prices",sec:"g-pri-index",m:1,t:"mc",q:"Same basket in 2025: apples $4, jackets $50, the TV $400. It costs:",a:"$520",w:["$454","$390","$540"],e:"20 + 100 + 400."},
 {tp:"prices",sec:"g-pri-index",m:1,t:"mc",q:"With 2025 as the base year, the CPI for 2024 is:",a:"75",w:["133.3","100","25"],e:"390 ÷ 520 × 100."},
 {tp:"prices",sec:"g-pri-index",m:2,t:"mc",q:"With a CPI of 75 in 2024 and 100 in 2025, the inflation rate is:",a:"33.33%",w:["25%","−25%","33%"],e:"(100 − 75) ÷ 75 — divide by the earlier year, not by 100. You missed this on Problem Set 4."},
 {tp:"prices",sec:"g-pri-index",m:1,t:"mc",q:"The CPI was 100 in 1980 and 300 in 2020. $30 in 2020 is worth, in 1980 dollars:",a:"$10",w:["$90","$30","$100"],e:"30 × 100 ÷ 300."},
 {tp:"prices",sec:"g-pri-index",m:1,t:"mc",q:"To convert a dollar figure from year B into year A dollars:",a:"multiply by CPI in A ÷ CPI in B",w:["multiply by CPI in B ÷ CPI in A","add the difference between the two CPIs","divide by the inflation rate between the years"],e:"$ in A = $ in B × CPI A ÷ CPI B."},
 {tp:"prices",sec:"g-pri-index",ap:true,t:"mc",q:"The CPI was 200 in 2010 and 250 in 2020. A salary of $50,000 in 2010 equals, in 2020 dollars:",a:"$62,500",w:["$40,000","$45,000","$55,000"],e:"50,000 × 250 ÷ 200."},
 {tp:"prices",sec:"g-pri-index",ap:true,t:"mc",q:"Nominal GDP is $22 trillion and real GDP is $20 trillion. The GDP deflator is:",a:"110",w:["90.9","102","120"],e:"22 ÷ 20 × 100."},
 {tp:"prices",sec:"g-pri-index",t:"tf",q:"In the base year, the CPI equals 100.",a:true,e:"True — the basket costs exactly what it costs in the base year."},

 {tp:"prices",sec:"g-pri-concepts",m:1,t:"mc",q:"Inflation means:",a:"the price level rises, so each dollar buys less",w:["the price level falls, so each dollar buys more","inflation slows down, but prices are still rising","the price level returns to where it was in an earlier year"],e:"The value of money falls."},
 {tp:"prices",sec:"g-pri-concepts",m:1,t:"mc",q:"Disinflation means:",a:"inflation slows but prices still rise — 6% to 3%",w:["the price level falls from one year to the next","prices return to the level of an earlier year","inflation stops entirely and prices are frozen"],e:"Slower, not reversed."},
 {tp:"prices",sec:"g-pri-concepts",m:1,t:"mc",q:"Deflation means:",a:"the price level falls",w:["the inflation rate slows","prices are frozen at their current level","real GDP falls for two quarters"],e:"Only deflation returns prices to an earlier level."},
 {tp:"prices",sec:"g-pri-concepts",m:1,t:"mc",q:"After years of inflation, an economy records 0% inflation. Prices are:",a:"frozen at the higher level — they do not return to where they were",w:["back to where they were before the inflation began","falling toward where they were before the inflation","rising, but more slowly than in the previous years"],e:"Zero inflation is not deflation."},
 {tp:"prices",sec:"g-pri-concepts",m:1,t:"mc",q:"The difference between the CPI and the PPI is that:",a:"the CPI tracks the prices consumers pay; the PPI tracks the prices producers receive",w:["the CPI excludes food and energy; the PPI includes both of them","the CPI covers goods only; the PPI covers services only","the CPI is published yearly; the PPI is published monthly"],e:"Consumer versus producer."},
 {tp:"prices",sec:"g-pri-concepts",m:1,t:"mc",q:"Core CPI:",a:"excludes food and energy",w:["includes only food and energy","excludes housing and transport","is another name for headline CPI"],e:"Headline includes them."},
 {tp:"prices",sec:"g-pri-concepts",m:1,t:"mc",q:"The CPI tends to overstate inflation because:",a:"quality improvements are hard to measure, and it also ignores substitution and new goods",w:["it counts intermediate goods as well as final goods, so prices are double counted","it uses base-year quantities that are too small to capture what people buy today","it leaves out services, which have had lower inflation than goods"],e:"A better product at a higher price is not pure inflation."},
 {tp:"prices",sec:"g-pri-concepts",m:1,t:"mc",q:"Cost of living versus standard of living:",a:"cost of living is about changes in prices; standard of living is about changes in purchasing power",w:["they are two names for the same thing, measured by the CPI","cost of living is about wages; standard of living is about prices","cost of living is a micro concept; standard of living is a macro one"],e:"Prices versus what you can afford."},
 {tp:"prices",sec:"g-pri-concepts",ap:true,t:"mc",q:"Inflation falls from 9% to 4%. That is:",a:"disinflation — prices are still rising, more slowly",w:["deflation — prices are now falling","zero inflation — prices are frozen","stagflation — prices and unemployment are both rising"],e:"Slower inflation is not falling prices."},
 {tp:"prices",sec:"g-pri-concepts",t:"tf",q:"Deflation is the only way the price level returns to an earlier level.",a:true,e:"True."},
 {tp:"prices",sec:"g-pri-concepts",t:"tf",q:"The CPI measures the prices producers receive for their output.",a:false,e:"False — that is the PPI."}
]);
