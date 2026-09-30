/* ================================================================ money growth and inflation (Unit 2)
   Lecture, Oct 29: "Money Growth and Inflation" (58:04) and the class exercise
   "Quantity Theory of Money" (5:14). The value-of-money graph, the exchange
   equation, the quantity theory, money neutrality, the hot-potato adjustment,
   and money injections under scarce vs abundant reserves.                    */

/* a general diagram in a 0–100 box: lines [{a:[x,y], b:[x,y], cls, lab, lx, ly}], points [{x,y,lab,cls}] */
function gfx(o){
  var L = 46, R = 256, T = 20, B = 188;
  function X(v){ return (L + (R - L) * v / 100).toFixed(1); }
  function Y(v){ return (B - (B - T) * v / 100).toFixed(1); }
  var svg = '<line x1="' + L + '" y1="' + T + '" x2="' + L + '" y2="' + B + '" class="ax"/><line x1="' + L + '" y1="' + B + '" x2="' + (R + 6) + '" y2="' + B + '" class="ax"/>';
  (o.bands || []).forEach(function(b){ svg += '<rect x="' + X(b.x1) + '" y="' + Y(b.y2) + '" width="' + (X(b.x2) - X(b.x1)).toFixed(1) + '" height="' + (Y(b.y1) - Y(b.y2)).toFixed(1) + '" class="band"/>'; });
  (o.lines || []).forEach(function(l){
    svg += '<line x1="' + X(l.a[0]) + '" y1="' + Y(l.a[1]) + '" x2="' + X(l.b[0]) + '" y2="' + Y(l.b[1]) + '" class="cv' + (l.cls ? ' ' + l.cls : '') + '"/>';
    if(l.lab) svg += '<text x="' + X(l.lx !== undefined ? l.lx : l.b[0]) + '" y="' + Y(l.ly !== undefined ? l.ly : l.b[1]) + '" class="cl' + (l.cls && /new/.test(l.cls) ? ' new' : '') + '" dx="3" dy="-3">' + l.lab + '</text>';
  });
  (o.pts || []).forEach(function(p){
    var c = p.cls || "old";
    if(p.drop !== false) svg += '<line x1="' + L + '" y1="' + Y(p.y) + '" x2="' + X(p.x) + '" y2="' + Y(p.y) + '" class="drop ' + c + '"/><line x1="' + X(p.x) + '" y1="' + Y(p.y) + '" x2="' + X(p.x) + '" y2="' + B + '" class="drop ' + c + '"/>';
    svg += '<circle cx="' + X(p.x) + '" cy="' + Y(p.y) + '" r="3.2" class="dot ' + c + '"/>';
    if(p.lab) svg += '<text x="' + X(p.x) + '" y="' + Y(p.y) + '" class="lab ' + c + '" dx="5" dy="-5">' + p.lab + '</text>';
    if(p.yl) svg += '<text x="' + (L - 5) + '" y="' + (+Y(p.y) + 4) + '" class="lab ' + c + '" text-anchor="end">' + p.yl + '</text>';
    if(p.xl) svg += '<text x="' + X(p.x) + '" y="' + (B + 13) + '" class="lab ' + c + '" text-anchor="middle">' + p.xl + '</text>';
  });
  svg += '<text x="' + (L - 30) + '" y="' + ((T + B) / 2) + '" class="axl" transform="rotate(-90 ' + (L - 30) + ' ' + ((T + B) / 2) + ')" text-anchor="middle">' + o.y + '</text>';
  if(o.y2) svg += '<text x="' + (R + 22) + '" y="' + ((T + B) / 2) + '" class="axl" transform="rotate(90 ' + (R + 22) + ' ' + ((T + B) / 2) + ')" text-anchor="middle">' + o.y2 + '</text>';
  svg += '<text x="' + ((L + R) / 2) + '" y="' + (B + 30) + '" class="axl" text-anchor="middle">' + o.x + '</text>';
  return '<figure class="lfg"><svg viewBox="0 0 ' + (o.y2 ? 300 : 280) + ' 226" role="img" aria-label="' + strip(o.cap) + '">' + svg + '</svg><figcaption>' + o.cap + '</figcaption></figure>';
}
/* the value-of-money graph: value of money (1/P) up the left, price level (P) up the right, inverted */
function vomGraph(cap, dS, dD){
  var lines = [{a:[50, 5], b:[50, 95], lab:"MS", lx:50, ly:95}, {a:[10, 90], b:[90, 10], lab:"MD"}], pts = [];
  var e0 = [50, 50];
  if(dS) lines.push({a:[50 + dS, 5], b:[50 + dS, 95], cls:"new dash", lab:"MS₂", lx:50 + dS, ly:88});
  if(dD) lines.push({a:[10 + dD, 90], b:[90 + dD > 98 ? 98 : 90 + dD, 90 + dD > 98 ? 10 + (90 + dD - 98) : 10], cls:"new dash", lab:"MD₂"});
  pts.push({x:e0[0], y:e0[1], yl:"1/P₁", cls:"old"});
  if(dS) pts.push({x:50 + dS, y:50 - dS, yl:"1/P₂", xl:"", cls:"new"});
  if(dD) pts.push({x:50, y:50 + dD, yl:"1/P₂", cls:"new"});
  return gfx({cap:cap, x:"Quantity of money", y:"Value of money (1/P) ↑", y2:"Price level (P) ↓", lines:lines, pts:pts});
}

CH.qtm = {n:11, title:"Money Growth and Inflation", short:"Money & Inflation",
 notes:[
  {id:"qtm-graph", h:"The Value of Money: Money Supply and Money Demand", body:
   '<div class="point"><b>The point</b><p>The price level adjusts to bring <b>money supply and money demand</b> into equilibrium. The graph has <b>two vertical axes that are inverses</b>: the <b>value of money (1/P)</b> and the <b>price level (P)</b>. &ldquo;Here is the trick&rdquo;: going <b>up</b> the value-of-money axis means the price level is <b>falling</b>.</p><p class="able"><b>Be able to</b> draw it and say what happens to the price level, the value of money and the quantity of money when supply or demand shifts.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 29 &middot; on the Exam 2 and Final graph lists</span></p>'+
   '<h3 class="sub" id="qtm-curves">The curves</h3>'+
   '<ul><li><b>Money supply:</b> vertical &mdash; the central bank sets it (think of the monetary base).</li>'+
   '<li><b>Money demand:</b> slopes down against the value of money &mdash; each dollar buying less means you need more of them (a move <b>along</b> the curve).</li>'+
   '<li>He prefers saying the <b>price level</b> adjusts, since value of money = 1/P.</li></ul>'+
   '<div class="lfgrid">'+
   vomGraph("<b>MS &uarr;</b> (QE or expansionary OMO): <b>P rises, value of money falls, quantity rises.</b>", 22, 0)+
   vomGraph("<b>MD &uarr;</b> (income rises): <b>P falls, value of money rises, quantity unchanged.</b>", 0, 18)+
   '</div>'+
   '<div class="tblwrap"><table class="tbl fit c4"><thead><tr><th>Shock</th><th>P</th><th>Value of money</th><th>Quantity</th></tr></thead><tbody>'+
   '<tr><td class="head">MS &uarr;</td><td class="sm">Rises</td><td class="sm">Falls</td><td class="sm">Rises</td></tr>'+
   '<tr><td class="head">MS &darr;</td><td class="sm">Falls</td><td class="sm">Rises</td><td class="sm">Falls</td></tr>'+
   '<tr><td class="head">MD &uarr;</td><td class="sm">Falls</td><td class="sm">Rises</td><td class="sm">No change</td></tr>'+
   '<tr><td class="head">MD &darr;</td><td class="sm">Rises</td><td class="sm">Falls</td><td class="sm">No change</td></tr></tbody></table></div>'+
   '<p><b>Takeaway:</b> with a vertical money supply, a change in money demand does <b>not</b> change the quantity of money.</p>'},

  {id:"qtm-eq", h:"The Exchange Equation and the Quantity Theory", body:
   '<div class="point"><b>The point</b><p><b>M &times; V = P &times; Y</b> is an <b>identity</b>, &ldquo;not a theory&rdquo;: buyers&rsquo; total spending equals sellers&rsquo; nominal output. Because <b>V and Y</b> barely change in the long run, the only realistic cause of persistent inflation is <b>money growth</b>. Friedman: &ldquo;<b>Inflation is always and everywhere a monetary phenomenon.</b>&rdquo; Money is <b>neutral</b> in the long run.</p><p class="able"><b>Be able to</b> define every letter, derive the equation, solve it for any letter in levels or growth rates, and explain money neutrality.</p></div>'+
   '<p class="knowline"><span class="know">Lecture and class exercise &middot; Oct 29 &middot; Problem Set 11</span></p>'+
   '<h3 class="sub" id="qtm-letters">The letters</h3>'+
   '<div class="tblwrap"><table class="tbl fit c2"><tbody>'+
   '<tr><td class="head">M</td><td class="sm">Money supply</td></tr>'+
   '<tr><td class="head">V</td><td class="sm"><b>Velocity</b>: the number of times a unit of money is spent a year. <b>k = 1/V</b>: velocity is the inverse of money demand.</td></tr>'+
   '<tr><td class="head">P</td><td class="sm">Aggregate price level (any index)</td></tr>'+
   '<tr><td class="head">Y</td><td class="sm">Real output (real GDP)</td></tr>'+
   '<tr><td class="head">P &times; Y</td><td class="sm"><b>Nominal GDP</b></td></tr>'+
   '<tr><td class="head">k</td><td class="sm">The &ldquo;Cambridge k&rdquo;: the share of income people want to hold as money</td></tr></tbody></table></div>'+
   '<ul><li><b>What changes velocity:</b> <b>technology</b> (credit cards &mdash; &ldquo;not a form of money,&rdquo; a short-term loan) and <b>institutions</b> (rules on currency and cards). They change slowly, so V is fairly stable.</li></ul>'+
   '<h3 class="sub" id="qtm-derive">The derivation, and the growth form</h3>'+
   '<ol><li>Equilibrium: M = M<sub>D</sub>.</li><li>Money demand: M<sub>D</sub> = k &times; P &times; Y.</li><li>So M = k &times; P &times; Y.</li><li>k = 1/V, so M = (P &times; Y) &divide; V.</li><li>Multiply by V: <b>M &times; V = P &times; Y</b>.</li></ol>'+
   '<div class="formula">M &times; V = P &times; Y &nbsp;&middot;&nbsp; %&Delta;M + %&Delta;V = %&Delta;P + %&Delta;Y<small>left = total expenditures (buyers) &middot; right = nominal output (sellers)</small></div>'+
   '<ul><li>P = (M &times; V) &divide; Y: three possible causes &mdash; M, V or Y. V and Y don&rsquo;t move much or consistently in the long run, so <b>persistent inflation comes from M</b>.</li>'+
   '<li>If V and Y don&rsquo;t change: <b>%&Delta;M = %&Delta;P</b>. A permanent doubling of M roughly doubles P.</li>'+
   '<li><b>Money neutrality:</b> &ldquo;money doesn&rsquo;t affect output in the long run. All it affects is changes in prices.&rdquo; Monopoly: double the money without adding spaces, and the properties just cost more.</li>'+
   '<li><b>His two-point summary:</b> (1) the central bank is the primary driver of the price level; (2) money is neutral in the long run.</li></ul>'+
   '<h3 class="sub" id="qtm-ex">The class exercise</h3>'+
   '<ol><li>M = $100 billion, P = 5, Y = $45 billion &rarr; 100 &times; V = 225 &rarr; <b>V = 2.25</b> (no $ or %).</li>'+
   '<li>V = 5, nominal GDP = $20 billion &rarr; M &times; 5 = 20 &rarr; <b>M = $4 billion</b>. (Nominal GDP is P &times; Y.)</li>'+
   '<li>Money grows 6%, velocity 1% &rarr; nominal GDP grows <b>7%</b>.</li></ol>'},

  {id:"qtm-adjust", h:"How More Money Raises Prices, and the Two Reserve Regimes", body:
   '<div class="point"><b>The point</b><p>A permanent injection leaves people holding <b>more money than they want</b> at the old price level. They spend it &mdash; &ldquo;like a <b>hot potato</b>&rdquo; &mdash; but the injection added <b>no productive capacity</b>, so prices rise. With <b>scarce</b> reserves, a bigger Fed balance sheet means inflation; with <b>abundant</b> reserves the Fed can <b>sterilize</b> new reserves by raising IOR &mdash; at a cost.</p><p class="able"><b>Be able to</b> tell the four-step adjustment story and the three trade-offs of the abundant regime.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 29 &middot; links to the Fed lectures</span></p>'+
   '<h3 class="sub" id="qtm-hot">The hot potato</h3>'+
   '<ol><li>Start in equilibrium. The central bank injects money permanently ($400 instead of $200 for passing Go).</li>'+
   '<li>At the old price level there is an <b>excess supply of money</b>.</li>'+
   '<li>People <b>spend</b> the excess on consumption and investment. &ldquo;Holding money is different than income&rdquo;: it&rsquo;s not extra income, so they don&rsquo;t just save it.</li>'+
   '<li>Output capacity didn&rsquo;t grow, so more spending on the same output means <b>higher prices</b>. &ldquo;If all we needed to do to make the world wealthier was print more money, boy, that would make life a lot easier.&rdquo;</li></ol>'+
   '<h3 class="sub" id="qtm-regimes">Scarce vs abundant reserves</h3>'+
   '<ul><li><b>Scarce:</b> the Fed buys bonds, reserves rise, the fed funds rate falls, banks lend, spending and prices rise. &ldquo;The Fed cannot increase its balance sheet without causing inflation.&rdquo;</li>'+
   '<li><b>Abundant:</b> the fed funds rate doesn&rsquo;t move; the Fed can <b>sterilize</b> reserves by <b>raising IOR</b>, &ldquo;divorcing the quantity of money from the interest rate target.&rdquo;</li>'+
   '<li><b>&ldquo;No such thing as a free lunch&rdquo; &mdash; three trade-offs:</b> (1) <b>political limits</b> on how high IOR can go; (2) <b>fewer remittances to the Treasury</b>, which raises the deficit (the bigger problem); (3) it <b>may lead to higher inflation</b> &mdash; &ldquo;the high inflation rates of 2021 and 2022 are a testament to the fact that the Fed waited far too long to increase the rate it paid on reserves.&rdquo;</li></ul>'}
 ],
 decks:[
  {id:"terms", label:"Key terms", cards:[
   ["Value of money","1/P — how many goods and services $1 buys","g-qtm-graph"],
   ["Going up the value-of-money axis","The price level is falling","g-qtm-graph"],
   ["Quantity theory of money","A long-run model: changes in the money supply drive changes in the price level","g-qtm-eq"],
   ["Friedman’s line","“Inflation is always and everywhere a monetary phenomenon”","g-qtm-eq"],
   ["Velocity (V)","The number of times a unit of money is spent a year","g-qtm-eq"],
   ["Cambridge k","The share of income people want to hold as money; k = 1/V","g-qtm-eq"],
   ["Exchange equation","M × V = P × Y — an identity, not a theory","g-qtm-eq"],
   ["M × V","Total expenditures — the buyers","g-qtm-eq"],
   ["P × Y","Nominal GDP — the sellers","g-qtm-eq"],
   ["Money neutrality","In the long run money changes prices, not real output","g-qtm-eq"],
   ["Credit card","Not money — a short-term loan; it changes velocity","g-qtm-eq"],
   ["Sterilize reserves","Raise interest on reserves so banks hold new reserves instead of lending them","g-qtm-adjust"]]},
  {id:"nums", label:"Rules and numbers", cards:[
   ["MS rises","P rises, value of money falls, quantity rises","g-qtm-graph"],
   ["MD rises","P falls, value of money rises, quantity unchanged","g-qtm-graph"],
   ["Growth form","%ΔM + %ΔV = %ΔP + %ΔY","g-qtm-eq"],
   ["If V and Y are steady","%ΔM = %ΔP","g-qtm-eq"],
   ["Two things that change velocity","Technology (credit cards) and institutions","g-qtm-eq"],
   ["M = $100B, P = 5, Y = $45B","V = 2.25","g-qtm-eq"],
   ["V = 5, nominal GDP = $20B","M = $4 billion","g-qtm-eq"],
   ["Money +6%, velocity +1%","Nominal GDP +7%","g-qtm-eq"],
   ["The hot potato","Excess money holdings get spent, raising prices","g-qtm-adjust"],
   ["Three trade-offs of abundant reserves","Political limits on IOR · fewer remittances to the Treasury · possibly higher inflation","g-qtm-adjust"],
   ["2021–22 inflation, his view","The Fed waited far too long to raise interest on reserves","g-qtm-adjust"]]}
 ]
};
GUIDE.sections.splice(GUIDE.sections.length - 1, 0, {h:"Money Growth and Inflation", tp:"qtm", items:[
 {id:"g-qtm-graph", t:"The Value of Money: Money Supply and Money Demand", a:"qtm-graph",
  short:"Two inverse vertical axes: value of money (1/P) and price level. MS vertical, MD slopes down. MS ↑: P ↑, value ↓, Q ↑. MD ↑: P ↓, value ↑, Q unchanged.",
  subs:[["The curves","qtm-curves"]]},
 {id:"g-qtm-eq", t:"The Exchange Equation and the Quantity Theory", a:"qtm-eq",
  short:"M × V = P × Y, an identity; k = 1/V. %ΔM + %ΔV = %ΔP + %ΔY. V and Y stable in the long run, so money drives inflation (Friedman). Money is neutral. Exercise: V = 2.25; M = $4B; 7%.",
  subs:[["The letters","qtm-letters"],["The derivation and growth form","qtm-derive"],["The class exercise","qtm-ex"]]},
 {id:"g-qtm-adjust", t:"How More Money Raises Prices, and the Two Reserve Regimes", a:"qtm-adjust",
  short:"Excess money is spent like a hot potato; no new capacity, so prices rise. Scarce: bigger balance sheet = inflation. Abundant: sterilize with higher IOR; trade-offs: political limits, fewer Treasury remittances, possible inflation (2021–22).",
  subs:[["The hot potato","qtm-hot"],["Scarce vs abundant","qtm-regimes"]]}]});

QB = QB.concat([
 {tp:"qtm",sec:"g-qtm-graph",t:"mc",q:"In the money supply–money demand graph, moving up the value-of-money axis means:",a:"the price level is falling",w:["the price level is rising","the quantity of money is rising","velocity is falling"],e:"Value of money = 1/P. “Here is the trick.”"},
 {tp:"qtm",sec:"g-qtm-graph",t:"mc",q:"In the value-of-money graph, the money supply curve is:",a:"vertical, because the central bank sets it",w:["upward sloping, because higher prices raise the money supply","downward sloping, like money demand","horizontal at the current price level"],e:"Think of the monetary base."},
 {tp:"qtm",sec:"g-qtm-graph",m:1,ap:true,t:"mc",q:"The Fed carries out QE and the money supply rises. In the value-of-money graph:",a:"the price level rises, the value of money falls and the quantity of money rises",w:["the price level falls, the value of money rises and the quantity of money rises","the price level rises, the value of money rises and the quantity is unchanged","nothing changes, since money demand did not move"],e:"MS shifts right along money demand."},
 {tp:"qtm",sec:"g-qtm-graph",m:1,ap:true,t:"mc",q:"Incomes rise and money demand increases, with the money supply unchanged. In the value-of-money graph:",a:"the price level falls, the value of money rises and the quantity is unchanged",w:["the price level rises, the value of money falls and the quantity rises","the price level falls, the value of money rises and the quantity rises","the price level rises and the quantity is unchanged"],e:"With a vertical money supply, a demand shift doesn’t change the quantity."},
 {tp:"qtm",sec:"g-qtm-graph",ap:true,t:"mc",q:"The Fed shrinks the money supply. The value of money and the price level:",a:"the value of money rises and the price level falls",w:["the value of money falls and the price level rises, since there is less money", "both rise, since scarcer money is worth more and prices adjust upward", "both fall, since less money lowers prices and what each dollar buys"],e:"They always move in opposite directions: value = 1/P."},
 {tp:"qtm",sec:"g-qtm-graph",t:"mc",q:"Why does money demand slope down against the value of money?",a:"When each dollar buys less, you need to hold more dollars for the same consumption",w:["When prices rise, the central bank prints more money","When the value of money rises, people want to hold more money","Money demand depends only on the interest rate"],e:"A lower value of money means a larger quantity demanded — a move along the curve."},
 {tp:"qtm",sec:"g-qtm-graph",t:"tf",q:"With a vertical money supply, a change in money demand changes the price level but not the quantity of money.",a:true,e:"True — his takeaway from the graph."},
 {tp:"qtm",sec:"g-qtm-graph",t:"tf",q:"On the value-of-money graph, a higher value of money means a higher price level.",a:false,e:"False. The axes are inverses: a higher value of money (1/P) means a lower price level."},

 {tp:"qtm",sec:"g-qtm-eq",t:"mc",q:"Velocity is:",a:"the number of times a unit of money is spent in a year",w:["the rate at which the money supply grows","the share of income people hold as money","the speed at which prices adjust"],e:"Stamp a dollar and trace how often it’s spent. The share of income held as money is k = 1/V."},
 {tp:"qtm",sec:"g-qtm-eq",t:"mc",q:"The “Cambridge k” is related to velocity by:",a:"k = 1/V",w:["k = V","k = V × M","k = P × Y"],e:"If money changes hands faster, you need to hold less of it."},
 {tp:"qtm",sec:"g-qtm-eq",t:"mc",q:"The exchange equation M × V = P × Y is:",a:"an identity: total spending equals nominal output",w:["a theory that always predicts inflation correctly","a behavioral rule for how the Fed sets money growth","true only when velocity is zero"],e:"“It’s not a theory, it’s an identity.” Buyers on the left, sellers on the right."},
 {tp:"qtm",sec:"g-qtm-eq",t:"mc",q:"According to the quantity theory, persistent inflation is best explained by:",a:"growth in the money supply",w:["rising velocity","falling real output","higher taxes"],e:"V and Y don’t move much or consistently in the long run, so M is the realistic cause."},
 {tp:"qtm",sec:"g-qtm-eq",m:1,ap:true,t:"mc",q:"M = $100 billion, P = 5 and Y = $45 billion. Velocity is:",a:"2.25",w:["$2.25 billion","0.44","22.5"],e:"100 × V = 5 × 45 = 225, so V = 2.25 — no $ or % sign."},
 {tp:"qtm",sec:"g-qtm-eq",m:1,ap:true,t:"mc",q:"Velocity is 5 and nominal GDP is $20 billion. The money supply is:",a:"$4 billion",w:["$100 billion","$25 billion","$0.25 billion"],e:"Nominal GDP = P × Y, so M × 5 = 20 → M = $4 billion."},
 {tp:"qtm",sec:"g-qtm-eq",m:1,ap:true,t:"mc",q:"The money supply grows 6% and velocity grows 1%. Nominal GDP grows:",a:"7%",w:["5%","6%","6.06%"],e:"%ΔM + %ΔV = %ΔP + %ΔY, and %ΔP + %ΔY is nominal GDP growth: 6 + 1 = 7%."},
 {tp:"qtm",sec:"g-qtm-eq",t:"mc",q:"Money neutrality means that in the long run money:",a:"changes prices but not real output",w:["changes real output but not prices","changes neither prices nor output","changes velocity one-for-one"],e:"The Monopoly analogy: more money, same board, higher prices."},
 {tp:"qtm",sec:"g-qtm-eq",t:"mc",q:"What did he say a credit card is?",a:"Not money but a short-term loan, which changes velocity",w:["A form of money that is counted in M1","A form of fiat money issued by banks","A store of value like a savings account"],e:"You settle up with money once a month, so less money is demanded and velocity changes."},
 {tp:"qtm",sec:"g-qtm-eq",ap:true,t:"mc",q:"Velocity and real output are steady, and the central bank permanently doubles the money supply. In the long run the price level:",a:"roughly doubles",w:["stays the same","roughly halves","rises by only 2%"],e:"%ΔM = %ΔP when V and Y don’t change — “roughly” because Y and V drift."},
 {tp:"qtm",sec:"g-qtm-eq",t:"tf",q:"In M × V = P × Y, the left side is the actions of buyers and the right side the actions of sellers.",a:true,e:"True: M × V is total expenditures; P × Y is nominal output."},
 {tp:"qtm",sec:"g-qtm-eq",t:"tf",q:"The quantity theory of money is a short-run model.",a:false,e:"False. It is a long-run model — V and Y are stable only over long periods."},

 {tp:"qtm",sec:"g-qtm-adjust",t:"mc",q:"After a permanent money injection, at the old price level there is:",a:"an excess supply of money, which people spend",w:["an excess demand for money, which people save","extra income, which people save","no change, since money is neutral immediately"],e:"People hold more money than they want and spend it — the hot potato."},
 {tp:"qtm",sec:"g-qtm-adjust",t:"mc",q:"Why does the extra spending from a money injection raise prices?",a:"The injection added no productive capacity, so more spending chases the same output",w:["Firms must pay higher taxes on the new money, so they pass the tax on in prices", "Velocity falls to zero, so every new dollar goes straight into higher prices", "The central bank raises prices directly when it injects the new money"],e:"“If all we needed to do to make the world wealthier was print more money…”"},
 {tp:"qtm",sec:"g-qtm-adjust",t:"mc",q:"He stressed that holding extra money is different from having extra:",a:"income",w:["velocity","inflation","reserves"],e:"Because it isn’t extra income, people don’t just save it — they spend it."},
 {tp:"qtm",sec:"g-qtm-adjust",t:"mc",q:"With scarce reserves, when the Fed grows its balance sheet:",a:"reserves rise, the fed funds rate falls, lending and spending rise, and prices rise",w:["the fed funds rate is unchanged and prices stay stable","reserves fall and the fed funds rate rises","nothing happens until the Fed raises IOR"],e:"“The Fed cannot increase its balance sheet without causing inflation.”"},
 {tp:"qtm",sec:"g-qtm-adjust",t:"mc",q:"With abundant reserves, how can the Fed grow its balance sheet without causing inflation?",a:"Raise interest on reserves so banks hold the new reserves instead of lending them",w:["Lower interest on reserves so banks lend the new reserves out faster", "Raise the discount rate so banks can’t borrow reserves from the Fed", "Sell short-term Treasury bills at the same time as it buys long-term bonds"],e:"Sterilizing: it divorces the quantity of money from the interest rate target — if IOR rises “high enough and soon enough.”"},
 {tp:"qtm",sec:"g-qtm-adjust",t:"mc",q:"Which trade-off of the abundant reserve regime did he call the bigger problem?",a:"Fewer remittances to the Treasury, which raises the deficit",w:["Banks earn too little on their reserves","The discount rate can no longer change","Velocity becomes unstable"],e:"The Fed remits tens of billions a year; paying more IOR leaves less to remit."},
 {tp:"qtm",sec:"g-qtm-adjust",ap:true,t:"mc",q:"According to the lecture, the high inflation of 2021 and 2022 shows that:",a:"the Fed waited far too long to raise the interest rate it paid on reserves",w:["the Fed raised interest on reserves too quickly","velocity collapsed during the pandemic","the quantity theory does not apply with abundant reserves"],e:"Banks found lending more profitable than holding reserves."},
 {tp:"qtm",sec:"g-qtm-adjust",t:"tf",q:"With abundant reserves, buying bonds still raises reserves and the monetary base, but the fed funds rate doesn’t change.",a:true,e:"True — that is why the Fed must use IOR to control whether the reserves are lent."},
 {tp:"qtm",sec:"g-qtm-adjust",t:"tf",q:"Printing more money makes an economy permanently wealthier.",a:false,e:"False. Money is neutral in the long run: it raises prices, not real output."}
]);

PRACTICE_TOPICS.push(["qtm","Money & Inflation"]);
TOPIC_LABEL.qtm = "Money & Inflation";
GENS.push({id:"qtm-eq", topic:"qtm", name:"The exchange equation", variants:5,
 remind:"M × V = P × Y (nominal GDP = P × Y). Growth form: %ΔM + %ΔV = %ΔP + %ΔY. Velocity has no $ or %.",
 make:function(v){
  v = v || ri(1, 5);
  var M = ri(2, 40) * 10, Vv = rp([1.5, 2, 2.5, 3, 4, 5, 6]), pl = rp([2, 4, 5, 8, 10]), Y = M * Vv / pl, b = {v:v, vals:{}};
  if(v === 1){ b.text = "The money supply is " + usd(M) + " billion, the price level is " + pl + " and real output is " + usd(rnd(Y, 2)) + " billion.";
   b.parts = [P("V", "velocity", Vv, 2, "", num(M) + " × V = " + pl + " × " + num(Y, 2) + " = " + num(M * Vv, 2) + " → V = " + num(Vv, 2) + ".", {wrong:[1 / Vv, M / pl, Vv * pl]})]; }
  else if(v === 2){ b.text = "Velocity is " + num(Vv, 1) + " and nominal GDP is " + usd(M * Vv) + " billion.";
   b.parts = [P("M", "the money supply (in billions)", M, 2, "$", "M × " + num(Vv, 1) + " = " + num(M * Vv) + " → M = " + usd(M) + " billion.", {wrong:[M * Vv * Vv, M * Vv, M / Vv]})]; }
  else if(v === 3){ b.text = "The money supply is " + usd(M) + " billion, velocity is " + num(Vv, 1) + " and real output is " + usd(rnd(Y, 2)) + " billion.";
   b.parts = [P("P", "the price level", pl, 2, "", "P = M × V ÷ Y = " + num(M) + " × " + num(Vv, 1) + " ÷ " + num(Y, 2) + " = " + pl + ".", {wrong:[M / Y, Vv / pl, pl * Vv]})]; }
  else {
   var gm = ri(2, 12), gv = ri(-2, 3), gy = ri(0, 4), gp = gm + gv - gy;
   if(v === 4){ b.text = "The money supply grows " + gm + "% and velocity " + (gv < 0 ? "falls " + (-gv) : "grows " + gv) + "%. Real output grows " + gy + "%.";
    b.parts = [P("gp", "the inflation rate", gp, 1, "%", gm + " + (" + gv + ") − " + gy + " = " + num(gp, 1) + "%.", {signed:true, wrong:[gm + gv + gy, gm - gy, gm + gv]}), P("gn", "the growth of nominal GDP", gm + gv, 1, "%", "%ΔP + %ΔY = %ΔM + %ΔV = " + gm + " + (" + gv + ") = " + (gm + gv) + "%.", {signed:true, wrong:[gm, gm - gv, gp]})]; }
   else { b.text = "Velocity and real output are constant. The money supply grows " + gm + "% a year.";
    b.parts = [P("gp", "the inflation rate in the long run", gm, 1, "%", "With %ΔV = %ΔY = 0, %ΔP = %ΔM = " + gm + "%.", {wrong:[0, gm / 2, gm * 2]})]; }
  }
  return b;
 }});
GEN_BY_ID["qtm-eq"] = GENS[GENS.length - 1];
[{id:"ex-qtm", gen:"qtm-eq", src:"Class exercise", make:function(){
   return {text:"(1) M = $100 billion, P = 5, Y = $45 billion. (2) V = 5, nominal GDP = $20 billion. (3) Money grows 6%, velocity 1%.",
    parts:[P("V", "velocity in (1)", 2.25, 2, "", "100 × V = 5 × 45 = 225 → V = 2.25.", {wrong:[0.44, 22.5, 4.5]}),
           P("M", "the money supply in (2), in billions", 4, 2, "$", "M × 5 = 20 → M = $4 billion.", {wrong:[100, 25, 0.25]}),
           P("g", "nominal GDP growth in (3)", 7, 1, "%", "6 + 1 = 7%.", {wrong:[5, 6, 6.06]})]};
  }}].forEach(function(f){ f.topic = GEN_BY_ID[f.gen].topic; FIXED.push(f); FIXED_BY_ID[f.id] = f; });
