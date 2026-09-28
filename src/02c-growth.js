/* ================================================================ growth
   Long-run growth and the Solow model. Five sections, from Problem Set 2 and
   the two Solow documents.                                                    */
CH.growth = {n:2, title:"Long-Run Growth and the Solow Model", short:"Growth",
 notes:[
  {id:"gro-facts", h:"Growth Facts, Per Capita and the Rule of 70", body:
   '<div class="point"><b>The point</b><p>Four facts frame the topic: <b>every country was once poor</b>; GDP per capita <b>varies enormously</b> today; <b>growth rates differ</b>; and long-run growth is <b>not guaranteed</b> &mdash; a middle-income country need not become rich. The arithmetic is per-capita GDP and the rule of 70.</p><p class="able"><b>Be able to</b> state the growth facts, compute GDP per capita and its growth rate, and use the rule of 70 for doubling and halving times.</p></div>'+
   '<p class="knowline"><span class="know">Problem Set 2 &middot; Sep 1&ndash;8</span></p>'+
   '<ul><li>Every country was once poor. GDP per capita varies enormously across countries today. Growth rates differ. <b>Long-run growth is not guaranteed.</b></li></ul>'+
   '<h3 class="sub" id="gro-rule70">The rule of 70 and per capita</h3>'+
   '<div class="formula">GDP per capita = real GDP &divide; population &nbsp;&nbsp;&middot;&nbsp;&nbsp; growth rate = (new &minus; old) &divide; old &times; 100 &nbsp;&nbsp;&middot;&nbsp;&nbsp; years to double &asymp; 70 &divide; growth %</div>'+
   '<ul><li>The rule works for halving too: <b>20% growth</b> doubles in <b>3.5 years</b>; <b>&minus;40%</b> halves in <b>1.75 years</b>.</li>'+
   '<li><b>Problem Set 2, Q3</b>: $50M &divide; 10,000 = <b>$5,000</b>; $60M &divide; 20,000 = <b>$3,000</b>. GDP grew <b>20%</b>; per-capita GDP fell <b>40%</b>, because population doubled.</li></ul>'},

  {id:"gro-terms", h:"Catch-up vs Innovative Growth, Factors, Diminishing Returns", body:
   '<div class="point"><b>The point</b><p>Two ways to grow. <b>Catch-up growth</b> comes from <b>more factors of production</b> &mdash; more capital, more workers, new resources &mdash; and the poorer country gains more from each extra unit, so it catches up. <b>Innovative growth</b> comes from <b>higher productivity</b> of the factors, from new ideas; ideas are limitless, so it is <b>sustainable</b>. Behind catch-up sits <b>diminishing returns</b>.</p><p class="able"><b>Be able to</b> classify a change as catch-up or innovative, list the factors of production, tell physical from human capital, and show diminishing returns with Y = &radic;K.</p></div>'+
   '<p class="knowline"><span class="know">Brief Summary of the Solow Growth Model &middot; Problem Set 2</span></p>'+
   '<div class="boxrow"><div class="box"><h4>Catch-up growth</h4><p><b>More factors</b>: more machines of the same kind, more workers, a new oil field. Runs into diminishing returns &mdash; it slows as the country gets richer.</p></div><div class="box"><h4>Innovative growth</h4><p><b>Better productivity</b> from new ideas and technology &mdash; a production method that wastes less. Ideas are limitless, so this is the sustainable kind.</p></div></div>'+
   '<div class="exam-tip"><b>You missed this one</b>&ldquo;A new production method that reduces waste&rdquo; is <b>not</b> catch-up growth &mdash; nothing was added, the same inputs produce more. That is innovative growth.</div>'+
   '<h3 class="sub" id="gro-factors">Factors of production and diminishing returns</h3>'+
   '<ul><li>The <b>factors of production</b>: <b>capital, labor, land or natural resources, entrepreneurship</b>. <b>Physical capital</b> = machines and structures; <b>human capital</b> = education, training and experience.</li>'+
   '<li><b>Diminishing returns</b>: output rises at a <b>decreasing rate</b> as one input is added, ceteris paribus. With Y = &radic;K, raising K from 25 to 36 raises Y by only <b>1 unit</b> (5 &rarr; 6).</li>'+
   '<li>That is why the poorer country catches up: where capital is scarce, one more unit adds a lot; where it is plentiful, it adds little.</li></ul>'},

  {id:"gro-model", h:"The Solow Model and the Steady State", body:
   '<div class="point"><b>The point</b><p>Four equations. Output comes from capital with diminishing returns; a fixed share of output is invested; a fixed share of capital wears out; the rest is consumed. If <b>investment exceeds depreciation</b> the capital stock grows; if it falls short, the stock shrinks. It settles where the two are equal &mdash; the <b>steady state</b> &mdash; and there, only technology can raise output for good.</p><p class="able"><b>Be able to</b> write the four equations, compute Y, I, C and D from K, say whether capital grows, and solve for the steady state.</p></div>'+
   '<p class="knowline"><span class="know">Brief Summary &middot; Mathematical Example &middot; Problem Set 2 Q1 &mdash; you missed the calculation</span></p>'+
   '<div class="formula">Y = A&radic;K &nbsp;&nbsp;&middot;&nbsp;&nbsp; I = sY = sA&radic;K &nbsp;&nbsp;&middot;&nbsp;&nbsp; D = &delta;K &nbsp;&nbsp;&middot;&nbsp;&nbsp; C = Y &minus; I<small>output &middot; investment &middot; depreciation &middot; consumption</small></div>'+
   '<h3 class="sub" id="gro-steady">The steady state</h3>'+
   '<ul><li>I &gt; D: the economy <b>adds capital</b>. I &lt; D: it <b>loses capital</b>. Either way it converges to the steady state.</li>'+
   '<li>At the steady state <b>investment = depreciation</b>: sA&radic;K = &delta;K, so &radic;K = sA/&delta; and</li></ul>'+
   '<div class="formula">K* = (sA &divide; &delta;)<sup>2</sup><small>then Y* = A&radic;K* and C* = (1 &minus; s) Y*</small></div>'+
   '<ul><li>At the steady state, adding capital cannot raise output for good; <b>technology or better institutions</b> are the only way up.</li></ul>'+
   '<h3 class="sub" id="gro-worked">Worked examples</h3>'+
   '<div class="tblwrap"><table class="tbl fit"><colgroup><col style="width:34%"><col></colgroup><thead><tr><th class="f" colspan="2">Problem Set 2, Q1 &mdash; Y = A&radic;K, s = 10%, &delta; = 1%, A = 1, K = 80</th></tr></thead><tbody>'+
   '<tr><td class="head">Output</td><td class="sm">Y = &radic;80 = <b>$8.94</b></td></tr>'+
   '<tr><td class="head">Investment</td><td class="sm">I = 0.10 &times; 8.94 = <b>$0.89</b></td></tr>'+
   '<tr><td class="head">Consumption</td><td class="sm">C = 8.94 &minus; 0.89 = <b>$8.05</b></td></tr>'+
   '<tr><td class="head">Depreciation</td><td class="sm">D = 0.01 &times; 80 = <b>$0.80</b></td></tr>'+
   '<tr><td class="head">Add capital?</td><td class="sm">I &gt; D, so <b>yes</b></td></tr>'+
   '<tr><td class="head">With A = 1.1</td><td class="sm">0.11&radic;K = 0.01K &rarr; &radic;K = 11 &rarr; <b>K* = 121</b>; Y* = 1.1 &times; 11 = <b>$12.10</b>; C* = 0.9 &times; 12.10 = <b>$10.89</b></td></tr>'+
   '</tbody></table></div>'+
   '<p><b>Mathematical Example document</b> (Y = AK<sup>1/3</sup>, s = 20%, &delta; = 1%, A = 1): the steady state is near <b>90 units</b> of capital, where investment equals depreciation. Spreadsheet: A = capital, B = technology, C = output <code>=A2^(1/3)*B2</code>, D = investment <code>=C2*0.2</code>, E = consumption <code>=C2-D2</code>, F = depreciation <code>=A2*0.01</code>. Raise A to 1.1 and the old steady state has I &gt; D, so capital keeps growing.</p>'},

  {id:"gro-shifts", h:"What Shifts What", body:
   '<div class="point"><b>The point</b><p>Three things can change in the diagram, and each moves a different curve. <b>Technology</b> lifts the production curve <i>and</i> the investment curve. A higher <b>savings rate</b> lifts <b>only the investment curve</b> &mdash; the production curve does not move. A higher <b>depreciation rate</b> steepens the depreciation line. The first two raise the steady state; the third lowers it.</p><p class="able"><b>Be able to</b> say, for each change, which curves shift and what happens to steady-state K and Y.</p></div>'+
   '<p class="knowline"><span class="know">Problem Set 2 &mdash; you missed the savings-rate question</span></p>'+
   '<div class="tblwrap"><table class="tbl"><thead><tr><th>Change</th><th>Production curve</th><th>Investment curve</th><th>Depreciation line</th><th>Steady-state K and Y</th></tr></thead><tbody>'+
   '<tr><td class="head">Technology (A) rises</td><td class="sm">Shifts up</td><td class="sm">Shifts up</td><td class="sm">No shift</td><td class="sm"><b>Increase</b></td></tr>'+
   '<tr><td class="head">Savings rate rises</td><td class="sm"><b>No shift</b></td><td class="sm">Shifts up</td><td class="sm">No shift</td><td class="sm"><b>Increase</b></td></tr>'+
   '<tr><td class="head">Depreciation rate rises</td><td class="sm">No shift</td><td class="sm">No shift</td><td class="sm">Steeper (shifts up)</td><td class="sm"><b>Decrease</b></td></tr>'+
   '</tbody></table></div>'+
   '<div class="exam-tip"><b>You missed this one</b>A higher savings rate does <b>not</b> shift the production curve. Output per unit of capital is what it was; more of that output is invested, so the investment curve rises and the steady state moves up along the same production curve.</div>'},

  {id:"gro-policy", h:"Policy, Institutions and Solow’s Weaknesses", body:
   '<div class="point"><b>The point</b><p>What raises output per worker in both the short run <i>and</i> the long run is <b>better education and institutions that boost technology</b>. Higher saving raises only the <b>level</b>, not long-run growth. Institutions are <b>permanent and broad</b> (rule of law, property rights); policies are narrower. And Solow has known weaknesses.</p><p class="able"><b>Be able to</b> tell institutions from policies, say what strong or weak institutions do, state Friedman&rsquo;s claim, and list Solow&rsquo;s four weaknesses.</p></div>'+
   '<p class="knowline"><span class="know">Brief Summary of the Solow Growth Model &middot; Problem Set 2</span></p>'+
   '<ul><li><b>Institutions</b> are permanent and broad &mdash; the rule of law, property rights. <b>Policies</b> are narrower and easier to change.</li>'+
   '<li><b>Strong institutions</b> attract investment and entrepreneurship; <b>weak ones</b> &mdash; corruption, confiscation &mdash; produce stagnation.</li>'+
   '<li><b>Constraints on the political class</b> limit arbitrary policy changes and predation.</li>'+
   '<li><b>Friedman</b>: development comes from economic and political freedom enlarging the private sphere of individuals.</li>'+
   '<li>&ldquo;<b>Be fruitful and multiply</b>&rdquo; fits the view that more people generate more ideas.</li></ul>'+
   '<h3 class="sub" id="gro-weak">Weaknesses of the Solow model</h3>'+
   '<div class="levels">'+
   '<div class="lv"><b>Institutions given</b><span>The model takes them as fixed, though they decide who invests.</span></div>'+
   '<div class="lv"><b>Same technology everywhere</b><span>It assumes every country has the same A.</span></div>'+
   '<div class="lv"><b>Ideas unexplained</b><span>It does not say where new ideas come from.</span></div>'+
   '<div class="lv"><b>Population as a negative</b><span>It treats population growth like depreciation, though ideas come from people.</span></div></div>'}
 ],
 decks:[
  {id:"terms", label:"Key terms", cards:[
   ["The four growth facts","Every country was once poor; GDP per capita varies enormously; growth rates differ; long-run growth is not guaranteed","g-gro-facts"],
   ["GDP per capita","Real GDP ÷ population","g-gro-facts"],
   ["Rule of 70","Years to double (or halve) ≈ 70 ÷ the growth rate in percent","g-gro-facts"],
   ["Catch-up growth","Growth from more factors of production — more capital, more workers, new resources","g-gro-terms"],
   ["Innovative growth","Growth from higher productivity of the factors — new ideas and technology; sustainable","g-gro-terms"],
   ["Factors of production","Capital, labor, land or natural resources, entrepreneurship","g-gro-terms"],
   ["Physical capital","Machines and structures","g-gro-terms"],
   ["Human capital","Education, training and experience","g-gro-terms"],
   ["Diminishing returns","Output rises at a decreasing rate as one input is added, ceteris paribus","g-gro-terms"],
   ["Production function (class)","Y = A√K — output from capital, with diminishing returns","g-gro-model"],
   ["Investment (Solow)","I = sY — the savings rate times output","g-gro-model"],
   ["Depreciation (Solow)","D = δK — a fraction of the capital stock wearing out","g-gro-model"],
   ["Consumption (Solow)","C = Y − I","g-gro-model"],
   ["Steady state","Where investment equals depreciation, so the capital stock stops changing","g-gro-model"],
   ["Steady-state capital","K* = (sA ÷ δ)²","g-gro-model"],
   ["Savings rate (s)","The share of output that is invested","g-gro-model"],
   ["Depreciation rate (δ)","The share of the capital stock that wears out each period","g-gro-model"],
   ["Technology (A)","The productivity term — the only thing that raises output for good","g-gro-shifts"],
   ["Institutions","Permanent, broad rules — the rule of law, property rights","g-gro-policy"],
   ["Policies","Narrower measures that are easier to change than institutions","g-gro-policy"],
   ["Friedman’s claim","Development comes from economic and political freedom enlarging the private sphere","g-gro-policy"]]},
  {id:"lists", label:"Formulas & lists", cards:[
   ["20% growth doubles in","3.5 years (70 ÷ 20)","g-gro-facts"],
   ["−40% growth halves in","1.75 years (70 ÷ 40)","g-gro-facts"],
   ["$50M ÷ 10,000 and $60M ÷ 20,000","$5,000 and $3,000: GDP +20%, per capita −40%","g-gro-facts"],
   ["A less wasteful production method is","Innovative growth — not catch-up","g-gro-terms"],
   ["Y = √K, K from 25 to 36","Y rises by 1, from 5 to 6","g-gro-terms"],
   ["Why the poorer country catches up","It gains more output from one extra unit of capital","g-gro-terms"],
   ["K = 80, s = 10%, δ = 1%, A = 1","Y $8.94, I $0.89, C $8.05, D $0.80 — I > D, add capital","g-gro-model"],
   ["Steady state with A = 1.1","K* = 121, Y* = $12.10, C* = $10.89","g-gro-model"],
   ["Mathematical Example steady state","About 90 units of capital (Y = AK^(1/3), s = 20%, δ = 1%)","g-gro-model"],
   ["Technology rises — what shifts","Production and investment curves up; steady state rises","g-gro-shifts"],
   ["Savings rate rises — what shifts","Only the investment curve; steady state rises","g-gro-shifts"],
   ["Depreciation rate rises — what shifts","The depreciation line steepens; steady state falls","g-gro-shifts"],
   ["Raises output per worker short and long run","Better education and institutions that boost technology","g-gro-policy"],
   ["Solow’s four weaknesses","Institutions given; same technology everywhere; ideas unexplained; population treated like depreciation","g-gro-policy"]]}
 ]
};

/* ---- growth questions ---- */
QB = QB.concat([
 {tp:"growth",sec:"g-gro-facts",m:1,t:"mc",q:"Which of these is one of the growth facts?",a:"All of these — every country was once poor, GDP per capita varies enormously, growth rates differ, and long-run growth is not guaranteed",w:["Only that every country was once poor — today all countries grow at about the same rate and are converging to the same income","Only that GDP per capita varies enormously today — every country grew at the same rate to get there","Only that growth rates differ — long-run growth is guaranteed for any country that keeps saving"],e:"All four."},
 {tp:"growth",sec:"g-gro-facts",m:2,t:"mc",q:"A middle-income country today will:",a:"not necessarily become rich — long-run growth is not guaranteed",w:["certainly become rich, because growth is automatic over time","certainly stay middle-income, because catch-up growth has ended","become rich only if it lowers its savings rate to raise consumption"],e:"You missed this on Problem Set 2."},
 {tp:"growth",sec:"g-gro-facts",m:1,t:"mc",q:"By the rule of 70, an economy growing 20% a year doubles in about:",a:"3.5 years",w:["5 years","7 years","14 years"],e:"70 ÷ 20."},
 {tp:"growth",sec:"g-gro-facts",m:1,t:"mc",q:"By the rule of 70, per-capita GDP falling 40% a year halves in about:",a:"1.75 years",w:["4 years","2.5 years","0.7 years"],e:"70 ÷ 40."},
 {tp:"growth",sec:"g-gro-facts",m:1,t:"mc",q:"Real GDP is $50 million and the population is 10,000. GDP per capita is:",a:"$5,000",w:["$500","$50,000","$5,000,000"],e:"50,000,000 ÷ 10,000."},
 {tp:"growth",sec:"g-gro-facts",m:1,t:"mc",q:"Real GDP rises from $50M to $60M while population rises from 10,000 to 20,000. Per-capita GDP:",a:"falls 40%, from $5,000 to $3,000",w:["rises 20%, from $5,000 to $6,000","falls 50%, from $5,000 to $2,500","is unchanged at $5,000 per person"],e:"GDP grew 20%, but population doubled."},
 {tp:"growth",sec:"g-gro-facts",m:1,t:"mc",q:"The growth rate of a variable is:",a:"(new − old) ÷ old × 100",w:["(new − old) ÷ new × 100","new ÷ old × 100","(old − new) ÷ old × 100"],e:"Always divide by the starting value."},
 {tp:"growth",sec:"g-gro-facts",ap:true,t:"mc",q:"A country’s GDP per capita grows 2% a year. About how long until it doubles?",a:"35 years",w:["50 years","20 years","70 years"],e:"70 ÷ 2."},
 {tp:"growth",sec:"g-gro-facts",t:"tf",q:"GDP per capita is nominal GDP divided by the labor force.",a:false,e:"False — real GDP divided by the population."},

 {tp:"growth",sec:"g-gro-terms",m:1,t:"mc",q:"Catch-up growth comes from:",a:"more factors of production — more capital, more workers, new natural resources",w:["new ideas that raise the productivity of the factors already in use","a higher price level that raises the nominal value of output","a lower depreciation rate on the existing stock of capital"],e:"More inputs; the poorer country gains more from each extra unit."},
 {tp:"growth",sec:"g-gro-terms",m:1,t:"mc",q:"Innovative growth comes from:",a:"higher productivity of the factors, from new ideas and technology",w:["adding more machines of the kind the economy already uses","adding more workers to run the machines the economy already has","discovering new deposits of oil, gas or minerals"],e:"Ideas are limitless, so this growth is sustainable."},
 {tp:"growth",sec:"g-gro-terms",m:2,t:"mc",q:"Which of these is NOT catch-up growth?",a:"A new production method that reduces waste",w:["Building more factories of the existing type","Hiring more workers to run the existing machines","Opening a newly discovered oil field"],e:"A better method is innovative growth. You missed this on Problem Set 2."},
 {tp:"growth",sec:"g-gro-terms",m:1,t:"mc",q:"Why does a poorer country catch up with a richer one?",a:"It gains more output from one extra unit of capital than the richer country does",w:["It has better institutions than the richer country, so it attracts more investment","Its workers accept lower wages, which raises the productivity of capital","It receives new technology before the richer country can adopt it"],e:"Diminishing returns — where capital is scarce, each unit adds more."},
 {tp:"growth",sec:"g-gro-terms",m:1,t:"mc",q:"The factors of production are:",a:"capital, labor, land or natural resources, and entrepreneurship",w:["consumption, investment, government purchases and net exports","money, credit, interest and profit","wages, rent, interest and taxes"],e:"Physical capital is machines and structures; human capital is education, training and experience."},
 {tp:"growth",sec:"g-gro-terms",m:1,t:"mc",q:"Human capital is:",a:"education, training and experience",w:["machines, tools and structures","the number of workers in the labor force","the money a firm keeps in the bank"],e:"Skills embodied in people."},
 {tp:"growth",sec:"g-gro-terms",m:1,t:"mc",q:"Diminishing returns means that:",a:"output rises at a decreasing rate as one input is added, holding the others fixed",w:["output falls whenever more of an input is added to production","output rises at an increasing rate as one input is added to the others","each input must be added in a fixed proportion to every other input"],e:"Ceteris paribus."},
 {tp:"growth",sec:"g-gro-terms",m:1,t:"mc",q:"With Y = √K, raising K from 25 to 36 raises Y by:",a:"1 unit, from 5 to 6",w:["11 units, from 25 to 36","6 units, from 5 to 11","2 units, from 5 to 7"],e:"√25 = 5, √36 = 6."},
 {tp:"growth",sec:"g-gro-terms",ap:true,t:"mc",q:"A software firm replaces its process with one that does the same work with half the inputs. Which kind of growth is that?",a:"Innovative growth — higher productivity from a new idea",w:["Catch-up growth — more factors of production in use","Diminishing returns — less output for each unit of input","Cyclical growth — a recovery from a recession"],e:"Same inputs, more output."},
 {tp:"growth",sec:"g-gro-terms",t:"tf",q:"Innovative growth is sustainable because ideas are limitless.",a:true,e:"True."},

 {tp:"growth",sec:"g-gro-model",m:1,t:"mc",q:"The production function used in class for the Solow model is:",a:"Y = A√K",w:["Y = A + K","Y = AK²","Y = K ÷ A"],e:"Output rises with capital at a diminishing rate."},
 {tp:"growth",sec:"g-gro-model",m:1,t:"mc",q:"Investment in the Solow model is:",a:"I = sY — the savings rate times output",w:["I = δK — the depreciation rate times capital","I = Y − D — output minus depreciation","I = A√K — technology times the root of capital"],e:"What is saved is invested."},
 {tp:"growth",sec:"g-gro-model",m:1,t:"mc",q:"Depreciation in the Solow model is:",a:"D = δK — a fraction of the capital stock wears out each period",w:["D = sY — a fraction of output is set aside for repairs","D = Y − C — whatever is not consumed","D = A ÷ K — technology divided by capital"],e:"The bigger the stock, the more wears out."},
 {tp:"growth",sec:"g-gro-model",m:1,t:"mc",q:"Consumption in the Solow model is:",a:"C = Y − I",w:["C = Y + I","C = sY","C = I − D"],e:"What is not invested is consumed."},
 {tp:"growth",sec:"g-gro-model",m:1,t:"mc",q:"If investment exceeds depreciation, the capital stock:",a:"grows, and the economy moves toward the steady state",w:["shrinks, and output falls toward the steady state","stays the same — the economy is already at the steady state","grows forever, with no steady state to reach"],e:"I > D adds capital; I < D loses it; at I = D it stops."},
 {tp:"growth",sec:"g-gro-model",m:1,t:"mc",q:"The steady state is where:",a:"investment equals depreciation, so the capital stock stops changing",w:["consumption equals investment, so saving stops changing","output equals the capital stock, so growth stops","the savings rate equals the depreciation rate"],e:"sA√K = δK."},
 {tp:"growth",sec:"g-gro-model",m:1,t:"mc",q:"For Y = A√K, the steady-state capital stock is:",a:"K* = (sA ÷ δ)²",w:["K* = sA ÷ δ","K* = (δ ÷ sA)²","K* = √(sA ÷ δ)"],e:"From sA√K = δK → √K = sA ÷ δ."},
 {tp:"growth",sec:"g-gro-model",m:2,t:"mc",q:"Y = A√K, s = 10%, δ = 1%, A = 1, K = 80. Output, investment, consumption and depreciation are:",a:"Y = $8.94, I = $0.89, C = $8.05, D = $0.80 — and since I > D, the economy adds capital",w:["Y = $8.94, I = $0.80, C = $8.14, D = $0.89 — and since I < D, the economy loses capital","Y = $80.00, I = $8.00, C = $72.00, D = $0.80 — and since I > D, the economy adds capital","Y = $8.94, I = $0.89, C = $8.05, D = $0.80 — and since I = D, it is at the steady state"],e:"√80 = 8.94; 10% of it is 0.89; 1% of 80 is 0.80. You missed this on Problem Set 2."},
 {tp:"growth",sec:"g-gro-model",m:2,t:"mc",q:"Same model with A = 1.1 (s = 10%, δ = 1%). The steady state is:",a:"K* = 121, Y* = $12.10, C* = $10.89",w:["K* = 100, Y* = $11.00, C* = $9.90","K* = 121, Y* = $11.00, C* = $10.00","K* = 110, Y* = $12.10, C* = $10.89"],e:"0.11√K = 0.01K → √K = 11 → K = 121; Y = 1.1 × 11; C = 0.9 × 12.10. You missed this on Problem Set 2."},
 {tp:"growth",sec:"g-gro-model",m:1,t:"mc",q:"In the Mathematical Example document (Y = AK^(1/3), s = 20%, δ = 1%, A = 1), the steady-state capital stock is near:",a:"90 units, where investment equals depreciation",w:["20 units, where consumption equals investment","1 unit, where output equals the capital stock","900 units, where depreciation falls to zero"],e:"The spreadsheet converges around 90."},
 {tp:"growth",sec:"g-gro-model",m:1,ap:true,t:"mc",q:"In that spreadsheet, technology rises to A = 1.1 while capital is still at the old steady state. What happens?",a:"Investment now exceeds depreciation, so capital keeps growing to a higher steady state",w:["Depreciation now exceeds investment, so capital shrinks to a lower steady state","Nothing — the steady state does not depend on the level of technology","Consumption falls to zero until the capital stock catches up"],e:"Higher A lifts output and investment; depreciation is unchanged."},
 {tp:"growth",sec:"g-gro-model",t:"tf",q:"At the steady state, adding more capital raises output permanently.",a:false,e:"False — only technology or better institutions raise it for good."},

 {tp:"growth",sec:"g-gro-shifts",m:1,t:"mc",q:"A rise in technology (A) shifts:",a:"the production curve and the investment curve up; the depreciation line does not move",w:["only the depreciation line, which becomes steeper as output rises","only the investment curve, since the production curve is fixed by capital","the production curve down and the investment curve up, leaving the steady state unchanged"],e:"Steady-state K and Y both rise."},
 {tp:"growth",sec:"g-gro-shifts",m:2,t:"mc",q:"A rise in the savings rate shifts:",a:"only the investment curve up — the production curve does not shift",w:["the production curve and the investment curve up together","the production curve up only, leaving investment unchanged","the depreciation line up, lowering the steady state"],e:"Output per unit of capital is unchanged; more of it is invested. You missed this on Problem Set 2."},
 {tp:"growth",sec:"g-gro-shifts",m:1,t:"mc",q:"A rise in the depreciation rate:",a:"makes the depreciation line steeper and lowers the steady-state capital stock",w:["shifts the production curve up and raises the steady-state capital stock","shifts the investment curve up and raises the steady-state capital stock","has no effect on the steady state, because saving is unchanged"],e:"More wears out at every level of K."},
 {tp:"growth",sec:"g-gro-shifts",m:1,t:"mc",q:"Which change raises the steady-state level of output?",a:"A rise in technology or a rise in the savings rate",w:["A rise in the depreciation rate or a fall in technology","A fall in the savings rate or a rise in depreciation","A fall in technology or a fall in the savings rate"],e:"Both lift investment above depreciation until a higher K*."},
 {tp:"growth",sec:"g-gro-shifts",ap:true,t:"mc",q:"A country doubles its savings rate. In the long run its output per worker:",a:"rises to a higher level, but its long-run growth rate returns to what technology allows",w:["grows faster forever, since more saving means more investment every year","is unchanged, because saving does not affect the capital stock","falls, because consumption falls when saving rises"],e:"Saving changes the level, not the long-run growth rate."},
 {tp:"growth",sec:"g-gro-shifts",ap:true,t:"mc",q:"A hurricane destroys a third of a country’s capital but leaves technology and the savings rate unchanged. Afterwards:",a:"investment exceeds depreciation, so capital grows back toward the same steady state",w:["the steady state falls permanently to match the smaller capital stock","depreciation exceeds investment, so capital keeps falling","output is unchanged, because the steady state has not moved"],e:"Below K*, I > D."},
 {tp:"growth",sec:"g-gro-shifts",t:"tf",q:"A higher savings rate shifts the production curve up.",a:false,e:"False — only the investment curve moves."},
 {tp:"growth",sec:"g-gro-shifts",t:"tf",q:"A higher depreciation rate lowers steady-state output.",a:true,e:"True — the depreciation line gets steeper."},

 {tp:"growth",sec:"g-gro-policy",m:1,t:"mc",q:"Which raises output per worker in both the short run and the long run?",a:"Better education and institutions that boost technology",w:["A higher savings rate on its own, with no change in technology","A higher depreciation rate that forces firms to buy new machines","A larger population working with the same stock of capital"],e:"Higher saving raises only the level."},
 {tp:"growth",sec:"g-gro-policy",m:1,t:"mc",q:"Institutions differ from policies in that institutions are:",a:"permanent and broad — the rule of law, property rights — while policies are narrower and easier to change",w:["narrow and temporary, while policies are the permanent rules of the game that last for generations","set by firms and households, while policies are set by the government and the central bank","the same thing as policies, described from the point of view of the country rather than the state"],e:"Institutions are the rules of the game."},
 {tp:"growth",sec:"g-gro-policy",m:1,t:"mc",q:"Strong institutions matter for growth because they:",a:"attract investment and entrepreneurship, while corruption and confiscation produce stagnation",w:["raise the depreciation rate of capital, which forces constant renewal of the stock","guarantee that every country grows at the same rate as the world leader","replace the need for saving and investment with government spending"],e:"Nobody invests where the return can be taken away."},
 {tp:"growth",sec:"g-gro-policy",m:1,t:"mc",q:"Constraints on the political class matter because they:",a:"limit arbitrary policy changes and predation by those in power",w:["raise the tax revenue available for public investment","ensure that the national savings rate stays high","keep the population from growing faster than capital"],e:"Predictability protects investment."},
 {tp:"growth",sec:"g-gro-policy",m:1,t:"mc",q:"According to Milton Friedman, development comes from:",a:"economic and political freedom enlarging the private sphere of individuals",w:["central planning of investment by a strong, technocratic state","a high savings rate enforced by law and monitored by the central bank","government ownership of the means of production in key industries"],e:"Freedom first."},
 {tp:"growth",sec:"g-gro-policy",m:1,t:"mc",q:"“Be fruitful and multiply” fits the view that:",a:"more people generate more ideas, and ideas drive growth",w:["population growth acts like depreciation and lowers output per person","only capital, and never people, is the source of economic growth","a larger population always lowers living standards in the long run"],e:"People are the source of ideas — which is one of Solow’s weaknesses."},
 {tp:"growth",sec:"g-gro-policy",m:1,t:"mc",q:"Which of these is a weakness of the Solow model?",a:"All of these — it treats institutions as given, assumes the same technology everywhere, does not explain where ideas come from, and treats population growth like depreciation",w:["Only that it treats institutions as given — its treatment of technology, ideas and population is a strength of the model","Only that it assumes the same technology everywhere — institutions, ideas and population are handled well by the model","Only that it does not explain where ideas come from — institutions, technology and population are handled well"],e:"All four, from the Brief Summary."},
 {tp:"growth",sec:"g-gro-policy",ap:true,t:"mc",q:"Two countries have identical savings rates and capital, but one has secure property rights and the other confiscates businesses at random. The Solow model on its own predicts:",a:"the same steady state for both — a weakness, since it treats institutions as given",w:["a higher steady state for the confiscating country, since confiscation raises public saving","that the confiscating country will catch up faster, since its capital is scarcer","a lower savings rate in the country with secure rights, since its citizens feel safe"],e:"Institutions are outside the model."},
 {tp:"growth",sec:"g-gro-policy",t:"tf",q:"The Solow model treats population growth as a negative, like depreciation, even though ideas come from people.",a:true,e:"True — one of its listed weaknesses."},
 {tp:"growth",sec:"g-gro-policy",t:"tf",q:"A higher savings rate is the surest route to permanently faster growth.",a:false,e:"False — saving raises the level; technology and institutions raise growth."}
]);
