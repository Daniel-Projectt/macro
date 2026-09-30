/* ================================================================ the Phillips curve (Unit 3, for the final)
   Lecture, Nov 17: "Phillips Curve" (50:44, a newer recording). The Keynesian
   background, the original curve and the "menu", the 1960s–80s data,
   Friedman–Phelps, the short- and long-run curves, and the three graphing rules. */
function srpc(shift){ var k = 70 / 80; return function(x){ return 45 + shift + (50 - x) * k; }; }
function pcGraph(cap, mode){
  var s1 = srpc(0), s2 = srpc(24), lines = [{a:[50, 4], b:[50, 96], lab:"LRPC", lx:50, ly:96}, {a:[12, s1(12)], b:[90, s1(90)], lab:"SRPC₁"}], pts = [{x:50, y:45, lab:"A", yl:"π₁", xl:"NRU"}];
  if(mode === "expand"){
    lines.push({a:[20, s2(20)], b:[92, s2(92)], cls:"new dash", lab:"SRPC₂"});
    pts.push({x:34, y:s1(34), lab:"B", cls:"new", yl:"π₂"});
    pts.push({x:50, y:s2(50), lab:"C", cls:"new", drop:false});
  } else if(mode === "supply"){
    lines.push({a:[66, 4], b:[66, 96], cls:"new dash", lab:"LRPC₂", lx:66, ly:90});
    var s3 = function(x){ return 62 + (66 - x) * 70 / 80; };
    lines.push({a:[30, s3(30)], b:[96, s3(96)], cls:"new dash", lab:"SRPC₂"});
    pts.push({x:66, y:62, lab:"B", cls:"new", yl:"π₂", xl:"NRU₂"});
  }
  return gfx({cap:cap, x:"Unemployment rate", y:"Inflation rate", lines:lines, pts:pts});
}

CH.phillips = {n:14, title:"The Phillips Curve", short:"Phillips Curve",
 notes:[
  {id:"pc-history", h:"From Keynes to Stagflation: The Original Phillips Curve", body:
   '<div class="point"><b>The point</b><p>After the Depression, <b>Keynesians</b> believed economies can get stuck below potential and that <b>managing demand</b> can fix it. <b>Phillips (1958)</b> found an inverse link between unemployment and <b>wage</b> inflation; <b>Samuelson and Solow</b> turned it into a price-inflation &ldquo;<b>menu</b>.&rdquo; The <b>1970s stagflation</b> broke it: there was <b>no permanent long-run trade-off</b>.</p><p class="able"><b>Be able to</b> give the three Keynesian beliefs, tell the story of the original curve and the menu, and describe what the 1960s, 1970s and 1980s data showed.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Nov 17 &middot; Problem Set 14 (answers hidden)</span></p>'+
   '<h3 class="sub" id="pc-keynes">The Keynesian revolution: three beliefs</h3>'+
   '<ol><li>Economies can get <b>stuck with idle resources</b>: output below potential &mdash; the <b>output gap</b> &mdash; and unemployment above the natural rate.</li>'+
   '<li>Swings in output and jobs are largely driven by <b>inadequate demand</b> (too little spending).</li>'+
   '<li><b>Active demand management</b> &mdash; fiscal or monetary &mdash; can steer back to full employment.</li></ol>'+
   '<h3 class="sub" id="pc-orig">The original curve and the menu</h3>'+
   '<ul><li><b>A. W. Phillips (1958):</b> nearly a century of <b>UK</b> data &mdash; low unemployment went with high <b>wage</b> inflation (firms compete for scarce workers).</li>'+
   '<li><b>Lipsey</b>, and <b>Samuelson and Solow</b>, recast it as <b>price</b> inflation vs unemployment: wages are a big cost, so firms pass them on.</li>'+
   '<li><b>The &ldquo;menu of choices&rdquo;</b>: pick a point by adjusting nominal spending &mdash; &ldquo;<b>fine-tuning</b>,&rdquo; best seen under <b>Kennedy and Johnson</b> in the 1960s.</li></ul>'+
   '<h3 class="sub" id="pc-data">What the data showed</h3>'+
   '<ul><li><b>1960s:</b> a smooth, stable curve (1961 low inflation/high unemployment; 1969 the reverse).</li>'+
   '<li><b>1970s: stagflation</b> &mdash; &ldquo;high inflation and high unemployment at the same time.&rdquo; The curve kept shifting <b>up and to the right</b> (1970&ndash;73, 1974&ndash;75, 1976&ndash;79).</li>'+
   '<li><b>1980s:</b> no stable relationship. &ldquo;Perhaps the 1960s was the anomaly and not the rule.&rdquo;</li>'+
   '<li><b>Conclusion:</b> &ldquo;there was no permanent long-run trade-off&hellip; any movement along the Phillips curve was temporary.&rdquo;</li></ul>'},

  {id:"pc-model", h:"Expectations, the Long-Run Curve, and the Three Graphing Rules", body:
   '<div class="point"><b>The point</b><p><b>Friedman and Phelps</b> added <b>expectations</b>: the <b>long-run Phillips curve is vertical</b> at the <b>natural rate of unemployment</b>, where actual inflation = expected inflation. Pushing unemployment below it gives <b>accelerating inflation</b>, not lasting lower unemployment. The short-run trade-off exists only when <b>actual &ne; expected inflation</b>.</p><p class="able"><b>Be able to</b> draw the SRPC and LRPC, walk through repeated expansion (A&rarr;B&rarr;C), and apply the three rules: spending moves you along, expectations shift the SRPC, supply shocks shift both.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Nov 17 &middot; on the Final graph list</span></p>'+
   '<h3 class="sub" id="pc-fp">Friedman and Phelps</h3>'+
   '<ol><li><b>The LRPC is vertical at the natural rate (NRU)</b>, set by real factors: demographics, institutions, productivity. At the NRU, actual = expected inflation.</li>'+
   '<li><b>Unemployment always returns to the natural rate</b> in the long run &mdash; &ldquo;the lowest sustainable rate of unemployment.&rdquo; Money is neutral.</li>'+
   '<li><b>Expectations adjust</b> to past prices and expected policy.</li></ol>'+
   '<p><b>The story:</b> more spending &rarr; firms hire &rarr; unemployment falls &rarr; wages and prices rise (along the SRPC) &rarr; workers see lower real wages &rarr; they demand raises &rarr; costs rise &rarr; firms cut back &rarr; <b>back to the NRU at higher inflation</b>.</p>'+
   '<h3 class="sub" id="pc-graph">The graph</h3>'+
   '<div class="lfgrid">'+
   pcGraph("<b>Expansion:</b> A&rarr;B along SRPC&#8321; (less unemployment, more inflation); expectations rise, SRPC shifts up, B&rarr;C: back at the NRU with higher inflation.", "expand")+
   pcGraph("<b>Negative supply shock:</b> LRPC shifts right and SRPC shifts up and right &mdash; a higher natural rate and higher inflation.", "supply")+
   '</div>'+
   '<ul><li>Repeat the expansion (C&rarr;D&rarr;E) and inflation <b>accelerates</b> &mdash; the 1970s.</li>'+
   '<li>&#9888; Expectations can also cause inflation in the short run (firms raise prices in anticipation), but in the long run inflation is always a monetary phenomenon.</li></ul>'+
   '<h3 class="sub" id="pc-rules">The three graphing rules</h3>'+
   '<ol><li><b>Spending shocks</b> (fiscal or monetary) <b>move you along</b> the SRPC: more spending up and left; less spending down and right.</li>'+
   '<li><b>Inflation expectations shift the SRPC</b>: higher expectations shift it up; lower, down.</li>'+
   '<li><b>Supply shocks shift both</b>: a <b>negative</b> shock moves the LRPC <b>right</b> and the SRPC up and right (higher NRU and inflation &mdash; the Strait of Hormuz, about 20% of world oil); a <b>positive</b> shock moves the LRPC <b>left</b> and the SRPC down and left, further.</li></ol>'+
   '<ul><li>&#9888; &ldquo;Whenever the LRPC shifts, the SRPC must shift as well&rdquo; (not the reverse).</li>'+
   '<li>&#9888; Here a productivity <b>increase</b> shifts the LRPC <b>left</b> (the axis is unemployment). In AD&ndash;AS the axis is output, so it shifts <b>right</b>.</li>'+
   '<li><b>Early 1980s:</b> credible contractionary policy &rarr; two recessions &rarr; expectations fell, SRPC shifted down: &ldquo;very successful.&rdquo;</li>'+
   '<li><b>Monetary offset</b> can move you back along the same SRPC (B&rarr;A) before expectations adjust.</li></ul>'+
   '<h3 class="sub" id="pc-take">His three takeaways</h3>'+
   '<ol><li>Only a <b>short-run</b> trade-off; in the long run the economy returns to the natural rate.</li>'+
   '<li>Repeatedly pushing unemployment down gives <b>higher and accelerating inflation</b>.</li>'+
   '<li>The trade-off exists only when <b>actual inflation &ne; expected inflation</b>.</li></ol>'}
 ],
 decks:[
  {id:"terms", label:"Key terms", cards:[
   ["Output gap","The difference between actual and potential output","g-pc-history"],
   ["Original Phillips curve (1958)","An inverse link between UK unemployment and wage inflation","g-pc-history"],
   ["The “menu of choices”","Samuelson and Solow: pick an inflation–unemployment point by adjusting spending","g-pc-history"],
   ["Fine-tuning","Adjusting nominal spending to guide the economy — the 1960s","g-pc-history"],
   ["Stagflation","High inflation and high unemployment at the same time — the 1970s","g-pc-history"],
   ["Long-run Phillips curve","Vertical at the natural rate of unemployment","g-pc-model"],
   ["Short-run Phillips curve","Downward sloping — a trade-off only while expectations lag","g-pc-model"],
   ["Natural rate of unemployment","The lowest sustainable rate; where actual = expected inflation","g-pc-model"],
   ["Friedman and Phelps","Added expectations; predicted the breakdown in the late 1960s","g-pc-model"],
   ["Monetary offset","The central bank reverses a spending change before expectations adjust","g-pc-model"]]},
  {id:"rules", label:"Rules and history", cards:[
   ["Three Keynesian beliefs","Economies get stuck with idle resources; swings come from inadequate demand; demand management can fix it","g-pc-history"],
   ["1960s data","A smooth, stable inverse curve","g-pc-history"],
   ["1970s data","The curve kept shifting up and to the right","g-pc-history"],
   ["More nominal spending","Move up and to the left along the SRPC","g-pc-model"],
   ["Higher inflation expectations","The SRPC shifts up","g-pc-model"],
   ["Negative supply shock","LRPC shifts right; SRPC up and right — higher NRU and inflation","g-pc-model"],
   ["Positive supply shock","LRPC shifts left; SRPC down and left, further","g-pc-model"],
   ["Repeated expansion","Accelerating inflation, not lasting lower unemployment","g-pc-model"],
   ["When a trade-off exists","Only when actual inflation ≠ expected inflation","g-pc-model"],
   ["Early 1980s","Credible disinflation: expectations fell and the SRPC shifted down","g-pc-model"],
   ["Productivity up, Phillips vs AD–AS","Phillips: LRPC left (unemployment axis). AD–AS: right (output axis)","g-pc-model"]]}
 ]
};
GUIDE.sections.splice(GUIDE.sections.length - 1, 0, {h:"The Phillips Curve", tp:"phillips", items:[
 {id:"g-pc-history", t:"From Keynes to Stagflation: The Original Phillips Curve", a:"pc-history",
  short:"Keynesian beliefs: idle resources, inadequate demand, demand management. Phillips 1958 (wage inflation, UK); Samuelson–Solow menu; 1960s fine-tuning. 1970s stagflation shifted it up and right; no permanent trade-off.",
  subs:[["Three Keynesian beliefs","pc-keynes"],["The original curve","pc-orig"],["What the data showed","pc-data"]]},
 {id:"g-pc-model", t:"Expectations, the Long-Run Curve, and the Three Graphing Rules", a:"pc-model",
  short:"LRPC vertical at the NRU. Spending moves you along the SRPC; expectations shift it; supply shocks shift both (negative: LRPC right, higher NRU and inflation). Repeated expansion → accelerating inflation. Trade-off only when actual ≠ expected.",
  subs:[["Friedman and Phelps","pc-fp"],["The graph","pc-graph"],["Three graphing rules","pc-rules"],["Takeaways","pc-take"]]}]});

QB = QB.concat([
 {tp:"phillips",sec:"g-pc-history",t:"mc",q:"Which is NOT one of the three core Keynesian beliefs he described?",a:"Money is neutral in both the short run and the long run",w:["Economies can get stuck with idle resources","Swings in output and jobs are largely driven by inadequate demand","Active demand management can steer the economy back to full employment"],e:"Neutrality is the long-run quantity theory; Keynesians stressed short-run demand problems."},
 {tp:"phillips",sec:"g-pc-history",t:"mc",q:"A. W. Phillips’s original 1958 finding was an inverse relationship between unemployment and:",a:"wage inflation, in UK data",w:["price inflation, in U.S. data","real GDP growth, in UK data","interest rates, in U.S. data"],e:"It was wage inflation. Lipsey, Samuelson and Solow later recast it as price inflation."},
 {tp:"phillips",sec:"g-pc-history",t:"mc",q:"Samuelson and Solow’s “menu of choices” meant policymakers could:",a:"pick a point on the inflation–unemployment trade-off by adjusting nominal spending",w:["choose any level of real output they wanted permanently","set the natural rate of unemployment by law","eliminate inflation and unemployment at the same time"],e:"More spending: more inflation, less unemployment. Fine-tuning — the Kennedy and Johnson years."},
 {tp:"phillips",sec:"g-pc-history",t:"mc",q:"Stagflation is:",a:"high inflation and high unemployment at the same time",w:["low inflation and low unemployment at the same time","falling prices with rising output","a recession with no change in prices"],e:"The 1970s, which the original curve couldn’t explain."},
 {tp:"phillips",sec:"g-pc-history",t:"mc",q:"In the 1970s, the short-run Phillips curves he showed:",a:"kept shifting up and to the right",w:["kept shifting down and to the left","stayed exactly where the 1960s curve was","became horizontal"],e:"1970–73, 1974–75, 1976–79 — each higher."},
 {tp:"phillips",sec:"g-pc-history",t:"mc",q:"What did the data of the 1960s through the 1980s show about the Phillips curve?",a:"There was no permanent long-run trade-off; movements along it were temporary",w:["The 1960s trade-off held in every later decade","Inflation and unemployment always move together","Unemployment has no relationship with inflation even in the short run"],e:"“Perhaps the 1960s was the anomaly and not the rule.”"},
 {tp:"phillips",sec:"g-pc-history",ap:true,t:"mc",q:"Unemployment is very low, so firms compete for scarce workers. According to the original Phillips curve reasoning:",a:"wages, and then prices, are pushed up",w:["wages fall because workers compete for jobs","prices fall because firms are more productive","nothing happens to wages"],e:"Few unemployed means firms bid for workers."},
 {tp:"phillips",sec:"g-pc-history",t:"tf",q:"The output gap is the difference between actual output and potential output.",a:true,e:"True — the first Keynesian belief is that economies can get stuck with one."},
 {tp:"phillips",sec:"g-pc-history",t:"tf",q:"The 1960s data showed stagflation.",a:false,e:"False. The 1960s showed a smooth, stable inverse curve; stagflation was the 1970s."},

 {tp:"phillips",sec:"g-pc-model",t:"mc",q:"According to Friedman and Phelps, the long-run Phillips curve is:",a:"vertical at the natural rate of unemployment",w:["downward sloping, like the short-run curve","horizontal at 2% inflation","upward sloping"],e:"In the long run unemployment depends on real factors, not inflation."},
 {tp:"phillips",sec:"g-pc-model",t:"mc",q:"At the natural rate of unemployment:",a:"actual inflation equals expected inflation",w:["inflation is always zero","unemployment is zero","actual inflation is above expected inflation"],e:"Point A, where the SRPC crosses the LRPC."},
 {tp:"phillips",sec:"g-pc-model",m:1,ap:true,t:"mc",q:"The economy starts at the natural rate. Policymakers raise nominal spending. In the short run:",a:"the economy moves up and to the left along the SRPC: unemployment falls, inflation rises",w:["the SRPC shifts up and unemployment rises above the natural rate", "the LRPC shifts left and the natural rate of unemployment falls", "the economy moves down and to the right along the SRPC, lowering inflation"],e:"Spending shocks move you along the SRPC (A to B)."},
 {tp:"phillips",sec:"g-pc-model",m:1,ap:true,t:"mc",q:"After the move from A to B, workers’ inflation expectations rise. What happens next?",a:"The SRPC shifts up and unemployment returns to the natural rate at higher inflation",w:["The SRPC shifts down and unemployment stays low","The LRPC shifts left to the new unemployment rate","Nothing: the economy stays at B"],e:"B to C — the gain in unemployment was temporary; the higher inflation is permanent."},
 {tp:"phillips",sec:"g-pc-model",m:1,ap:true,t:"mc",q:"A major oil route closes, and a key input becomes much more expensive. On the Phillips curve graph:",a:"the LRPC shifts right and the SRPC shifts up and right: a higher natural rate and higher inflation",w:["the economy moves up and to the left along the SRPC, with lower unemployment and higher inflation", "only the SRPC shifts up, while the natural rate of unemployment stays exactly where it was", "the LRPC shifts left and the SRPC shifts down, giving a lower natural rate and less inflation"],e:"A negative supply shock shifts both (his Strait of Hormuz example)."},
 {tp:"phillips",sec:"g-pc-model",ap:true,t:"mc",q:"A productivity boom raises output per worker across the economy. On the Phillips curve graph:",a:"the LRPC shifts left and the SRPC shifts down and left, further",w:["the LRPC shifts right and the SRPC shifts up","only the SRPC shifts down","the economy moves along the SRPC"],e:"A lower natural rate and lower inflation — “sort of the best of all worlds.”"},
 {tp:"phillips",sec:"g-pc-model",t:"mc",q:"What shifts the short-run Phillips curve without shifting the long-run curve?",a:"A change in inflation expectations",w:["A change in government spending","A change in the money supply","A change in productivity"],e:"Spending moves you along the SRPC; productivity shifts both curves."},
 {tp:"phillips",sec:"g-pc-model",t:"mc",q:"Repeatedly pushing unemployment below the natural rate leads to:",a:"accelerating inflation, not permanently lower unemployment",w:["permanently lower unemployment at stable inflation","deflation and higher unemployment","a lower natural rate of unemployment"],e:"The 1970s: C → D → E, inflation rising each time."},
 {tp:"phillips",sec:"g-pc-model",t:"mc",q:"According to his third takeaway, the short-run trade-off exists only when:",a:"actual inflation differs from expected inflation",w:["the central bank targets zero inflation","unemployment equals the natural rate","productivity is rising"],e:"Policy moves you along the curve only before expectations adjust."},
 {tp:"phillips",sec:"g-pc-model",ap:true,t:"mc",q:"In the early 1980s the Fed ran credible, aggressive contractionary policy. On the Phillips curve graph, after the recessions:",a:"expectations fell, the SRPC shifted down, and the economy returned to the natural rate with lower inflation",w:["the LRPC shifted right permanently, raising the natural rate of unemployment for good", "the SRPC shifted up, so inflation and unemployment both stayed higher than before", "the economy stayed below the natural rate, trading lasting unemployment for low inflation"],e:"“Very successful” — because it was credible."},
 {tp:"phillips",sec:"g-pc-model",t:"mc",q:"Why is it wrong to shift only the LRPC after a productivity shock?",a:"Whenever the LRPC shifts, the SRPC must shift too, or you get the price effect backwards",w:["Because the LRPC never shifts, whatever happens to productivity", "Because only the SRPC matters once the economy reaches the long run", "Because productivity changes only expectations, which move the SRPC alone"],e:"Shifting only the LRPC would wrongly say higher productivity raises prices."},
 {tp:"phillips",sec:"g-pc-model",t:"tf",q:"In the Phillips curve model, a rise in productivity shifts the long-run curve to the left.",a:true,e:"True — the horizontal axis is unemployment, so a lower natural rate is a shift left. (In AD–AS, it shifts right.)"},
 {tp:"phillips",sec:"g-pc-model",t:"tf",q:"Expansionary monetary policy shifts the short-run Phillips curve to the right.",a:false,e:"False. Spending shocks move you along the SRPC (up and to the left). Expectations shift it."}
]);

PRACTICE_TOPICS.push(["phillips","Phillips"]);
TOPIC_LABEL.phillips = "Phillips";
var PC_EVENTS = [
 ["The central bank raises the money supply to push unemployment down.", 0, "A spending shock: move along the SRPC."],
 ["Congress passes a large spending bill while the economy is at the natural rate.", 0, "More nominal spending: move along the SRPC."],
 ["The government cuts spending sharply.", 1, "Less nominal spending: move along the SRPC, down and to the right."],
 ["Workers and firms come to expect higher inflation next year.", 2, "Expectations shift the SRPC."],
 ["A credible central bank convinces everyone inflation will fall.", 3, "Lower expectations shift the SRPC down."],
 ["A key shipping route for oil closes, raising input costs everywhere.", 4, "A negative supply shock shifts both curves."],
 ["A technological revolution raises productivity across the economy.", 5, "A positive supply shock shifts both curves."]];
var PC_OPTS = ["Move up and to the left along the SRPC", "Move down and to the right along the SRPC", "The SRPC shifts up", "The SRPC shifts down", "The LRPC shifts right and the SRPC shifts up and right", "The LRPC shifts left and the SRPC shifts down and left"];
GENS.push({id:"pc-shift", topic:"phillips", name:"Phillips curve: along, shift, or both?", remind:"Spending moves you along the SRPC. Expectations shift the SRPC. Supply shocks shift both.",
 make:function(){ var s = rp(PC_EVENTS); return {vals:{}, text:s[0], choice:{q:"What happens on the Phillips curve graph?", opts:PC_OPTS.slice(), right:s[1], work:s[2] + " " + PC_OPTS[s[1]] + "."}}; }});
GEN_BY_ID["pc-shift"] = GENS[GENS.length - 1];
