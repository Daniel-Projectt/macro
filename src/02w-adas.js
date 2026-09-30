/* ================================================================ business cycles and AD–AS (Unit 3, for the final)
   Lectures, Nov 19 and Nov 24: "Business Cycles" Parts I–III (23:35, 46:30, 46:44).
   What cycles are and who dates them, supply vs demand shocks, the AD–AS model
   in growth rates, and every shock-and-policy scenario he walked through.     */
function adasGraph(cap, mode){
  var k = 70 / 80;
  function sras(dx){ return function(x){ return 15 + (x - 10 - dx) * k; }; }
  function ad(dx){ return function(x){ return 85 - (x - 10 - dx) * k; }; }
  var S = sras(0), D = ad(0);
  var lines = [{a:[50, 4], b:[50, 96], lab:"LRAS", lx:50, ly:96}, {a:[12, S(12)], b:[88, S(88)], lab:"SRAS"}, {a:[12, D(12)], b:[88, D(88)], lab:"AD"}];
  var pts = [{x:50, y:50, lab:"A", yl:"π₁", xl:"Y"}];
  if(mode === "ad"){
    var D2 = ad(20), S2 = function(x){ return 67.5 + (x - 50) * k; };
    lines.push({a:[32, D2(32)], b:[96, D2(96)], cls:"new dash", lab:"AD₂"});
    lines.push({a:[20, S2(20)], b:[72, S2(72)], cls:"new dash", lab:"SRAS₂", lx:20, ly:S2(20) - 8});
    pts.push({x:60, y:58.75, lab:"B", cls:"new", xl:"Y₁"});
    pts.push({x:50, y:67.5, lab:"C", cls:"new", yl:"π₂"});
  } else if(mode === "supply"){
    var S3 = sras(-24);
    lines.push({a:[38, 4], b:[38, 96], cls:"new dash", lab:"LRAS₂", lx:39, ly:74});
    lines.push({a:[12, S3(12)], b:[70, S3(70)], cls:"new dash", lab:"SRAS₂"});
    pts.push({x:38, y:60.5, lab:"B", cls:"new", yl:"π₂", xl:"Y₁"});
  }
  return gfx({cap:cap, x:"Real GDP growth rate", y:"Inflation rate", lines:lines, pts:pts});
}

CH.adas = {n:15, title:"Business Cycles and the AD–AS Model", short:"AD–AS",
 notes:[
  {id:"bc-cycles", h:"Business Cycles and What Causes Them", body:
   '<div class="point"><b>The point</b><p><b>Business cycles</b> are the fluctuations in economic activity over time: <b>expansions</b> up to a <b>peak</b>, <b>contractions</b> down to a <b>trough</b>. The <b>NBER</b> dates U.S. recessions using the <b>three Ds</b>. Cycles have two broad causes: <b>supply shocks</b> (productivity) and <b>demand shocks</b> (spending).</p><p class="able"><b>Be able to</b> define the phases, give the NBER&rsquo;s definition and three Ds (and the 2020 exception), and sort examples into positive/negative supply and demand shocks.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Nov 19 &middot; Problem Set 15</span></p>'+
   '<h3 class="sub" id="bc-defs">The phases</h3>'+
   '<ul><li><b>Expansion:</b> real GDP and employment rise; the economy uses <b>more</b> of its factors. Its top is the <b>peak</b>.</li>'+
   '<li><b>Contraction:</b> real GDP and employment fall; factors are <b>underused</b>. Its bottom is the <b>trough</b>.</li>'+
   '<li><b>Recession:</b> &ldquo;a wide-scale decline in economic activity across multiple sectors for a given length of time.&rdquo; The U.S. has had <b>13</b> since WWII. <b>Expansion is the normal state.</b></li></ul>'+
   '<h3 class="sub" id="bc-nber">Who dates recessions: the NBER</h3>'+
   '<ul><li>A <b>private nonprofit</b> (founded 1920); its <b>Business Cycle Dating Committee</b> (1978) dates recessions back to <b>1854</b>. No official authority, but trusted.</li>'+
   '<li>Definition: &ldquo;a significant decline in economic activity that is spread across the economy and lasts more than a few months.&rdquo;</li>'+
   '<li><b>The three Ds: depth, diffusion, duration</b> &mdash; usually all three.</li>'+
   '<li><b>2020</b>: only <b>2 months</b>, the shortest on record, but so deep and widespread it counted.</li></ul>'+
   '<h3 class="sub" id="bc-causes">Supply shocks and demand shocks</h3>'+
   '<div class="tblwrap"><table class="tbl fit c3"><thead><tr><th></th><th>Supply (productivity)</th><th>Demand (spending)</th></tr></thead><tbody>'+
   '<tr><td class="head">Positive</td><td class="sm">The 1990s <b>computer revolution</b>; the <b>end of the Cold War</b> (a global economy)</td><td class="sm">Rising net exports (Soviet-bloc markets, China opening); more optimistic expectations</td></tr>'+
   '<tr><td class="head">Negative</td><td class="sm">The 1970s <b>OPEC oil shock</b> (oil price more than doubled); the <b>2020 COVID shutdowns</b></td><td class="sm">The <b>2007&ndash;09 housing bust</b> (people felt poorer); less investment from worse regulation or higher taxes on capital</td></tr></tbody></table></div>'+
   '<ul><li>Demand shocks change output and jobs <b>only in the short run, while prices are sticky</b>. <b>Only supply-side changes affect long-run growth</b> (Solow).</li></ul>'},

  {id:"bc-model", h:"The AD–AS Model", body:
   '<div class="point"><b>The point</b><p>AD&ndash;AS shows how shocks and policy change <b>real GDP growth</b> (horizontal) and <b>inflation</b> (vertical) &mdash; this version is in <b>growth rates</b>. <b>LRAS is vertical</b> (only real factors), <b>SRAS slopes up</b> (sticky wages, sticky prices, misperceptions), <b>AD slopes down</b> (all P&ndash;Y combinations for one growth rate of nominal spending).</p><p class="able"><b>Be able to</b> draw all three curves, say why each has its shape, and list what shifts each &mdash; including that <b>higher expected inflation shifts SRAS left</b>.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Nov 19 &middot; on the Final graph list</span></p>'+
   '<h3 class="sub" id="bc-srlr">Short run and long run</h3>'+
   '<ul><li><b>Short run:</b> prices are <b>sticky</b> because of rigidities (minimum wage, downward nominal wage rigidity, imperfect information), so <b>money is non-neutral</b>.</li>'+
   '<li><b>Long run:</b> prices are <b>flexible</b>, markets clear, <b>money is neutral</b>, and only real factors matter.</li>'+
   '<li>Are we ever in the long run? &ldquo;<b>Yes and no</b>&rdquo; &mdash; the long run of past shocks and the short run of current ones, at once.</li></ul>'+
   adasGraph("The model: LRAS vertical at sustainable growth, SRAS up, AD down, all meeting at A (e.g. 3% growth, 2% inflation = 5% nominal spending growth).", "")+
   '<h3 class="sub" id="bc-curves">The three curves</h3>'+
   '<div class="tblwrap"><table class="tbl fit c4"><thead><tr><th>Curve</th><th>Shape</th><th>Why</th><th>Shifted by</th></tr></thead><tbody>'+
   '<tr><td class="head">LRAS (&ldquo;Solow growth curve&rdquo;)</td><td class="sm">Vertical</td><td class="sm">Flexible prices; money neutral</td><td class="sm"><b>Only real factors</b>: + productivity right, &minus; left</td></tr>'+
   '<tr><td class="head">SRAS</td><td class="sm">Upward</td><td class="sm">Sticky wages, sticky prices, misperceptions</td><td class="sm">Everything that shifts LRAS, <b>plus expectations</b>: expected inflation &uarr; &rarr; <b>left (up)</b></td></tr>'+
   '<tr><td class="head">AD</td><td class="sm">Downward</td><td class="sm">P + Y combinations for one nominal-spending growth rate</td><td class="sm"><b>M, V, C, I, G, NX</b>: &uarr; right, &darr; left</td></tr></tbody></table></div>'+
   '<ul><li><b>Output can be above LRAS</b> for a while (capacity strain, <b>inflationary</b> pressure) or <b>below</b> it (&ldquo;slack,&rdquo; <b>deflationary</b> pressure), but not permanently.</li>'+
   '<li><b>SRAS&rsquo;s three explanations:</b> (1) <b>sticky wages</b> &mdash; prices rise, contracted wages don&rsquo;t, so profit and output rise; (2) <b>sticky prices</b> &mdash; relative prices shift demand between firms; (3) <b>misperceptions</b> &mdash; firms mistake a general price rise for demand for their product. Forward guidance corrects misperceptions.</li>'+
   '<li>&#9888; &ldquo;A common mistake&rdquo;: shifting SRAS <b>right</b> when expectations rise. <b>Wrong &mdash; it shifts left (up).</b></li>'+
   '<li><b>AD is not a micro demand curve.</b> It comes from %&Delta;M + %&Delta;V = %&Delta;P + %&Delta;Y: at 5% spending growth, 0% growth means 5% inflation; 3% growth means 2%.</li></ul>'},

  {id:"bc-shocks", h:"Shocks and Policy in AD–AS", body:
   '<div class="point"><b>The point</b><p><b>Demand shocks</b> move growth and inflation the <b>same</b> way in the short run, but in the long run only <b>inflation</b> changes: &ldquo;changes in AD will not change the growth rate of output in the long run.&rdquo; <b>Supply shocks</b> move them in <b>opposite</b> ways. A <b>negative supply shock</b> (stagflation) forces a <b>trade-off</b>: prop up output with permanently higher prices, or hold prices with a short-run loss of output.</p><p class="able"><b>Be able to</b> walk through every scenario: AD up or down, perfect and too-much stimulus, monetary offset, positive and negative supply shocks with each policy option, and the double shock.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Nov 24 &middot; the final lecture &middot; Problem Set 15</span></p>'+
   '<h3 class="sub" id="bc-demand">Demand shocks</h3>'+
   adasGraph("<b>AD &uarr;</b>: A&rarr;B, growth and inflation rise. Output is above LRAS, expectations rise, SRAS shifts left: B&rarr;C. <b>Long run: same growth, permanently higher inflation.</b>", "ad")+
   '<ul><li><b>AD &darr;</b>: growth and inflation fall; slack lowers expectations, SRAS shifts right. <b>Long run: same growth, permanently lower inflation.</b></li>'+
   '<li><b>AD &darr; + perfect, timely stimulus</b> (before expectations change): AD shifts back; no lasting change.</li>'+
   '<li><b>AD &darr; + too much stimulus</b>: AD overshoots, expectations rise, SRAS shifts left &mdash; <b>permanently higher inflation</b>.</li>'+
   '<li><b>Monetary offset:</b> the Fed counters fiscal policy to hit its own inflation target &mdash; why &ldquo;many economists will support monetary policy before fiscal policy&rdquo; for spending shocks.</li></ul>'+
   '<h3 class="sub" id="bc-supply">Supply shocks</h3>'+
   adasGraph("<b>Negative productivity shock</b>: LRAS and SRAS shift left, A&rarr;B: <b>stagflation</b> &mdash; lower growth, higher inflation. The old LRAS no longer exists.", "supply")+
   '<ul><li><b>Positive productivity shock</b>: LRAS and SRAS shift right &mdash; higher growth, lower inflation (&ldquo;good deflation&rdquo;). &ldquo;The best of all worlds&rdquo;; no need to intervene.</li>'+
   '<li><b>After a negative shock, the trade-off:</b></li>'+
   '<li>&nbsp;&nbsp;&bull; <b>Expansionary</b>: a short-run boost in output and jobs, but <b>permanently higher prices</b>. Choose it if the job loss is big and the price jump small.</li>'+
   '<li>&nbsp;&nbsp;&bull; <b>Contractionary</b>: a short-run loss of output and jobs, but <b>permanently lower prices</b>. Choose it if the price jump is big and the job loss small.</li>'+
   '<li>&ldquo;A negative productivity shock leads to a trade-off. There is not a best of all worlds here.&rdquo;</li></ul>'+
   '<h3 class="sub" id="bc-double">The double shock (COVID-19)</h3>'+
   '<ul><li>Shutdown orders (productivity) and fearful households (spending): <b>LRAS, SRAS and AD all shift left</b>.</li>'+
   '<li><b>Productivity shock bigger:</b> growth down, inflation <b>higher</b> &mdash; the same trade-off.</li>'+
   '<li><b>Spending shock bigger:</b> growth down, inflation <b>lower</b> &mdash; expansionary policy makes sense; contractionary does not. <b>The Great Depression made this mistake</b>: the Fed let the monetary base shrink and taxes rose under Hoover and FDR.</li>'+
   '<li>&ldquo;Policymaking is incredibly difficult.&rdquo;</li></ul>'}
 ],
 decks:[
  {id:"terms", label:"Key terms", cards:[
   ["Business cycles","The fluctuation in economic activity an economy experiences over time","g-bc-cycles"],
   ["Peak","The top of an expansion","g-bc-cycles"],
   ["Trough","The bottom of a contraction","g-bc-cycles"],
   ["NBER recession definition","A significant decline in activity spread across the economy, lasting more than a few months","g-bc-cycles"],
   ["The three Ds","Depth, diffusion, duration","g-bc-cycles"],
   ["Supply shock","Output changes because a real variable (productivity) changes","g-bc-cycles"],
   ["Demand shock","Output changes because nominal spending changes","g-bc-cycles"],
   ["Aggregate supply","The total quantity an economy can produce at various price levels","g-bc-model"],
   ["Aggregate demand","Total demand for goods and services = nominal spending","g-bc-model"],
   ["LRAS","Vertical at sustainable growth; shifted only by real factors","g-bc-model"],
   ["SRAS","Upward sloping; shifted by real factors and inflation expectations","g-bc-model"],
   ["Stagflation","Lower growth and higher inflation — a negative supply shock","g-bc-shocks"],
   ["Monetary offset","The Fed counters fiscal policy to meet its own goals","g-bc-shocks"]]},
  {id:"rules", label:"Shifts and scenarios", cards:[
   ["AD shifters","M, V, C, I, G, NX","g-bc-model"],
   ["Three reasons SRAS slopes up","Sticky wages, sticky prices, misperceptions","g-bc-model"],
   ["Expected inflation rises","SRAS shifts LEFT (up) — not right","g-bc-model"],
   ["AD’s axes in this course","Real GDP growth rate (horizontal), inflation rate (vertical)","g-bc-model"],
   ["AD ↑, no policy, long run","Same growth; permanently higher inflation","g-bc-shocks"],
   ["AD ↓, no policy, long run","Same growth; permanently lower inflation","g-bc-shocks"],
   ["Positive productivity shock","LRAS and SRAS right: higher growth, lower inflation — no policy needed","g-bc-shocks"],
   ["Negative shock + expansionary policy","Short-run output boost, permanently higher prices","g-bc-shocks"],
   ["Negative shock + contractionary policy","Short-run output loss, permanently lower prices","g-bc-shocks"],
   ["Double shock, spending bigger","Inflation lower: expand; contracting was the Great Depression mistake","g-bc-shocks"],
   ["2020 recession","Two months — the shortest on record","g-bc-cycles"],
   ["Recessions since WWII","13","g-bc-cycles"]]}
 ]
};
GUIDE.sections.splice(GUIDE.sections.length - 1, 0, {h:"Business Cycles and the AD–AS Model", tp:"adas", items:[
 {id:"g-bc-cycles", t:"Business Cycles and What Causes Them", a:"bc-cycles",
  short:"Expansion to peak, contraction to trough. NBER (private, dates back to 1854): depth, diffusion, duration; 2020 lasted 2 months. Supply shocks (productivity: computers, Cold War's end; OPEC, COVID) vs demand shocks (spending: exports, optimism; housing bust).",
  subs:[["The phases","bc-defs"],["The NBER","bc-nber"],["Supply and demand shocks","bc-causes"]]},
 {id:"g-bc-model", t:"The AD–AS Model", a:"bc-model",
  short:"Growth rate across, inflation up. LRAS vertical (real factors only). SRAS up (sticky wages, prices, misperceptions); expectations up shift it LEFT. AD down (%ΔM + %ΔV = %ΔP + %ΔY); shifted by M, V, C, I, G, NX.",
  subs:[["Short run and long run","bc-srlr"],["The three curves","bc-curves"]]},
 {id:"g-bc-shocks", t:"Shocks and Policy in AD–AS", a:"bc-shocks",
  short:"AD shocks change only inflation in the long run. Positive supply: higher growth, lower inflation. Negative supply: stagflation and a trade-off (expand: permanently higher prices; contract: short-run output loss). Double shock: if spending is bigger, expand.",
  subs:[["Demand shocks","bc-demand"],["Supply shocks","bc-supply"],["The double shock","bc-double"]]}]});

QB = QB.concat([
 {tp:"adas",sec:"g-bc-cycles",t:"mc",q:"The NBER defines a recession as:",a:"a significant decline in economic activity spread across the economy, lasting more than a few months",w:["two consecutive quarters of falling real GDP, with no other test applied", "any month in which the unemployment rate rises by a quarter point or more", "a fall in the aggregate price level that lasts for at least a full year"],e:"Judged by the three Ds: depth, diffusion and duration."},
 {tp:"adas",sec:"g-bc-cycles",t:"mc",q:"The NBER’s three Ds are:",a:"depth, diffusion and duration",w:["deficit, debt and deflation","demand, depreciation and duration","depth, deflation and debt"],e:"Usually all three must be met."},
 {tp:"adas",sec:"g-bc-cycles",t:"mc",q:"Why did the 2020 recession count even though it lasted only two months?",a:"It was so deep and widespread that it met the other criteria overwhelmingly",w:["The government declared it a recession by law","Every recession must last exactly two months","It was a supply shock, which the NBER always counts"],e:"The shortest recession on record since 1854."},
 {tp:"adas",sec:"g-bc-cycles",t:"mc",q:"The NBER is:",a:"a private nonprofit research organization with no official authority",w:["a division of the Federal Reserve that sets the official recession dates", "a department of the Treasury that measures GDP and announces recessions", "a congressional committee that votes on when a recession has begun"],e:"Economists accept its impartiality."},
 {tp:"adas",sec:"g-bc-cycles",ap:true,t:"mc",q:"OPEC cuts oil shipments and the price of oil more than doubles. This is a:",a:"negative supply shock",w:["negative demand shock","positive supply shock","positive demand shock"],e:"A real input becomes scarcer, lowering productivity."},
 {tp:"adas",sec:"g-bc-cycles",ap:true,t:"mc",q:"Falling home values make households feel poorer, and they spend less. This is a:",a:"negative demand shock",w:["negative supply shock","positive supply shock","positive demand shock"],e:"The 2007–09 housing bust — a fall in spending."},
 {tp:"adas",sec:"g-bc-cycles",ap:true,t:"mc",q:"The computer revolution of the 1990s let workers do more with fewer inputs. This is a:",a:"positive supply shock",w:["positive demand shock","negative supply shock","negative demand shock"],e:"Higher productivity; with the end of the Cold War, it explains the strong 1990s."},
 {tp:"adas",sec:"g-bc-cycles",t:"mc",q:"Which kind of change affects long-run growth?",a:"Only supply-side changes",w:["Only demand-side changes","Both equally","Neither — growth is constant"],e:"Spending is neutral in the long run (the QTM); the Solow model sets growth."},
 {tp:"adas",sec:"g-bc-cycles",t:"tf",q:"Expansion is the normal state of the U.S. economy; recessions are abnormal.",a:true,e:"True. The NBER treats expansions as normal; recessions are the unusual, temporary declines it dates."},
 {tp:"adas",sec:"g-bc-cycles",t:"tf",q:"A demand shock is about productivity; a supply shock is about spending.",a:false,e:"False. It is the other way round: a supply shock changes how much can be produced, while a demand shock changes how much people buy."},

 {tp:"adas",sec:"g-bc-model",t:"mc",q:"In this course’s AD–AS model, the axes are:",a:"real GDP growth rate (horizontal) and inflation rate (vertical)",w:["real GDP level and the price level","unemployment rate and inflation rate","quantity of money and nominal interest rate"],e:"This version is in growth rates."},
 {tp:"adas",sec:"g-bc-model",t:"mc",q:"The long-run aggregate supply curve is vertical because:",a:"in the long run growth depends only on real factors, not the price level",w:["the Fed holds the inflation rate constant at its 2% target in the long run", "prices stay sticky in the long run, so output can’t respond to them", "aggregate demand never changes once the economy reaches the long run"],e:"Flexible prices, money is neutral — the “Solow growth curve.”"},
 {tp:"adas",sec:"g-bc-model",t:"mc",q:"Which is NOT one of the three explanations for an upward-sloping SRAS?",a:"Flexible prices",w:["Sticky wages","Sticky prices","Misperceptions"],e:"The short run is defined by sticky prices; flexible prices are the long run."},
 {tp:"adas",sec:"g-bc-model",m:1,ap:true,t:"mc",q:"Firms and workers come to expect higher inflation. The SRAS curve:",a:"shifts left (up)",w:["shifts right (down)","does not shift; the economy moves along it","becomes vertical"],e:"“A common mistake… students want to shift it to the right.” Wrong."},
 {tp:"adas",sec:"g-bc-model",t:"mc",q:"Which of these shifts aggregate demand?",a:"A change in velocity",w:["A change in productivity","A change in inflation expectations only","A change in the number of workers"],e:"AD shifters: M, V, C, I, G, NX."},
 {tp:"adas",sec:"g-bc-model",t:"mc",q:"What shifts the LRAS curve?",a:"Only real factors, such as productivity, workers and institutions",w:["Changes in money growth and velocity, since they change nominal spending", "Changes in inflation expectations, which move firms’ pricing decisions", "Changes in government purchases and taxes, through the fiscal multiplier"],e:"A positive productivity shock shifts it right; a negative one, left."},
 {tp:"adas",sec:"g-bc-model",ap:true,t:"mc",q:"Nominal spending grows 5% a year. If real growth is 3%, inflation along this AD curve is:",a:"2%",w:["8%","5%","3%"],e:"%ΔP + %ΔY = 5 → %ΔP = 2. At 0% growth it would be 5%."},
 {tp:"adas",sec:"g-bc-model",t:"mc",q:"Output above the LRAS creates:",a:"inflationary pressure, since firms bid for scarce workers",w:["deflationary pressure from slack","no pressure, since LRAS doesn’t matter in the short run","a permanent rise in the growth rate"],e:"Below LRAS is slack, which creates deflationary pressure."},
 {tp:"adas",sec:"g-bc-model",t:"mc",q:"The misperceptions explanation for SRAS says firms:",a:"mistake a rise in the overall price level for more demand for their own product",w:["always know the true aggregate price level, so they never change their output", "cut their output whenever the overall price level rises, fearing lower demand", "raise workers’ wages first and only later decide whether to raise their prices"],e:"That is why forward guidance matters — it corrects misperceptions."},
 {tp:"adas",sec:"g-bc-model",t:"tf",q:"Aggregate demand is just a large microeconomic demand curve for one good.",a:false,e:"False. AD covers all goods and services: combinations of inflation and growth for one rate of nominal spending growth."},
 {tp:"adas",sec:"g-bc-model",t:"tf",q:"Money is non-neutral in the short run because prices are sticky.",a:true,e:"True — a money injection raises production until prices adjust."},

 {tp:"adas",sec:"g-bc-shocks",m:1,ap:true,t:"mc",q:"Consumers become more optimistic and spending rises, with no policy response. In the long run:",a:"growth returns to its original rate and inflation is permanently higher",w:["growth is permanently higher and inflation unchanged","growth and inflation both return to where they started","growth is permanently higher and inflation permanently higher"],e:"AD right (A→B), then expectations rise and SRAS shifts left (B→C)."},
 {tp:"adas",sec:"g-bc-shocks",m:1,ap:true,t:"mc",q:"Spending falls and policymakers do nothing. In the long run:",a:"growth returns to its original rate and inflation is permanently lower",w:["growth is permanently lower and inflation unchanged","both growth and inflation are permanently lower","inflation is permanently higher"],e:"Slack lowers expectations, SRAS shifts right. “Changes in AD will not change the growth rate of output in the long run.”"},
 {tp:"adas",sec:"g-bc-shocks",m:1,ap:true,t:"mc",q:"A negative productivity shock hits. In the short run:",a:"growth falls and inflation rises — stagflation",w:["growth and inflation both fall","growth rises and inflation falls","growth falls and inflation is unchanged"],e:"LRAS and SRAS both shift left."},
 {tp:"adas",sec:"g-bc-shocks",m:1,ap:true,t:"mc",q:"After a negative productivity shock, policymakers use expansionary policy. The result is:",a:"a short-run boost in output and jobs, but permanently higher prices",w:["growth permanently back to the old LRAS","permanently lower prices and higher growth","no change in prices at all"],e:"The old LRAS no longer exists; growth ends at the new, lower rate."},
 {tp:"adas",sec:"g-bc-shocks",ap:true,t:"mc",q:"A negative supply shock causes a big jump in inflation but only a small fall in output. The lecture suggests:",a:"contractionary policy",w:["expansionary policy","no possible policy","raising government spending sharply"],e:"Choose contractionary if the price harm is bigger; expansionary if the job loss is bigger."},
 {tp:"adas",sec:"g-bc-shocks",t:"mc",q:"A positive productivity shock leads to:",a:"higher growth and lower inflation, with no need for policy",w:["lower growth and higher inflation","higher growth and higher inflation","a trade-off between growth and prices"],e:"“Good deflation” — “the best of all worlds.”"},
 {tp:"adas",sec:"g-bc-shocks",t:"mc",q:"Monetary offset means:",a:"the central bank counters fiscal policy to meet its own inflation target",w:["fiscal policy cancels monetary policy","the Fed buys government bonds to fund a deficit","prices adjust instantly to spending"],e:"Why many economists prefer monetary policy for spending shocks."},
 {tp:"adas",sec:"g-bc-shocks",t:"mc",q:"In a double shock where the spending shock is bigger than the productivity shock, contractionary policy:",a:"makes no sense, since inflation is already lower — the Great Depression mistake",w:["is the best choice, since inflation has risen above where it was before the shocks", "has no effect on output, because the productivity shock already set the new growth rate", "raises long-run growth, because it restores confidence and lowers expected inflation"],e:"The Fed let the base shrink and taxes rose under Hoover and FDR."},
 {tp:"adas",sec:"g-bc-shocks",t:"mc",q:"After a negative demand shock, a perfect and timely stimulus:",a:"shifts AD back to where it was, with no lasting change",w:["raises the growth rate permanently above its old long-run rate", "lowers inflation permanently below where it started before the shock", "shifts LRAS to the right by the amount of the new spending"],e:"The “textbook case” — it must come before expectations change."},
 {tp:"adas",sec:"g-bc-shocks",t:"tf",q:"Too much stimulus after a negative demand shock leaves inflation permanently higher once expectations adjust.",a:true,e:"True: AD overshoots, SRAS shifts left, growth returns to LRAS at higher inflation."},
 {tp:"adas",sec:"g-bc-shocks",t:"tf",q:"After a negative productivity shock, there is a policy that restores both the old growth rate and the old inflation rate.",a:false,e:"False. “There is not a best of all worlds here” — the old LRAS no longer exists, so policy trades output against prices."}
]);

PRACTICE_TOPICS.push(["adas","AD–AS"]);
TOPIC_LABEL.adas = "AD–AS";
var ADAS_SHOCKS = [
 ["Consumers grow optimistic and spend more.", 0, 0],
 ["Foreign demand for U.S. exports jumps.", 0, 0],
 ["The Fed speeds up money growth.", 0, 0],
 ["Falling home prices make households cut spending.", 1, 1],
 ["Higher taxes on capital make firms cut investment.", 1, 1],
 ["Velocity falls as people hold on to their money.", 1, 1],
 ["A technological revolution raises productivity everywhere.", 2, 2],
 ["Countries integrate into one global economy, raising productivity.", 2, 2],
 ["An oil embargo more than doubles the price of oil.", 3, 3],
 ["Government orders close restaurants and theaters.", 3, 3],
 ["Everyone comes to expect higher inflation next year.", 4, 0]];
var ADAS_SR = ["AD shifts right: growth up, inflation up", "AD shifts left: growth down, inflation down", "LRAS and SRAS shift right: growth up, inflation down", "LRAS and SRAS shift left: growth down, inflation up (stagflation)", "Only SRAS shifts left: growth down, inflation up"];
var ADAS_LR = ["Growth back at the original rate; inflation permanently higher", "Growth back at the original rate; inflation permanently lower", "Permanently higher growth and lower inflation; no policy needed", "Permanently lower growth; policy must trade output against prices"];
GENS.push(
 {id:"adas-sr", topic:"adas", name:"AD–AS: the short run", remind:"Spending (M, V, C, I, G, NX) moves AD. Productivity moves LRAS and SRAS together. Expectations up move SRAS left.",
  make:function(){ var s = rp(ADAS_SHOCKS); return {vals:{}, text:s[0], choice:{q:"What happens in the short run?", opts:ADAS_SR.slice(), right:s[1], work:ADAS_SR[s[1]] + "."}}; }},
 {id:"adas-lr", topic:"adas", name:"AD–AS: the long run, no policy", remind:"Demand shocks change only inflation in the long run. Supply shocks change growth.",
  make:function(){ var s = rp(ADAS_SHOCKS.filter(function(x){ return x[1] < 4; })); return {vals:{}, text:s[0] + " Policymakers do nothing.", choice:{q:"What is the long-run result?", opts:ADAS_LR.slice(), right:s[2], work:ADAS_SR[s[1]] + " in the short run; then " + ADAS_LR[s[2]].toLowerCase() + "."}}; }});
GEN_BY_ID["adas-sr"] = GENS[GENS.length - 2]; GEN_BY_ID["adas-lr"] = GENS[GENS.length - 1];
