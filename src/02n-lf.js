/* ================================================================ loanable funds (Unit 2)
   Lecture, Oct 1: "The Loanable Funds Model and the Real Interest Rate" (51:32).
   Built from detailed notes of the lecture: his definitions, his two jobs of an
   interest rate, the Fisher identity, the supply and demand shifters, the four
   worked shifts, crowding out, and "never reason from a price change."        */

/* a loanable-funds diagram: supply shifted by dS, demand by dD (+ = right) */
function lfGraph(caption, dS, dD){
  var k = 140 / 180, L = 46, R = 256, T = 22, B = 188;
  function sY(x, d){ return 180 - k * (x - 60 - d); }
  function dY(x, d){ return 40 + k * (x - 60 - d); }
  function seg(f, d){
    var x1 = 60 + d, x2 = 240 + d, y1 = f(x1, d), y2 = f(x2, d);
    function clip(x, y, xo, yo){ /* pull a point back inside the plot box along the line */
      var t = 1;
      if(x > R) t = Math.min(t, (R - xo) / (x - xo)); if(x < L) t = Math.min(t, (L - xo) / (x - xo));
      if(y > B) t = Math.min(t, (B - yo) / (y - yo)); if(y < T) t = Math.min(t, (T - yo) / (y - yo));
      return [xo + (x - xo) * t, yo + (y - yo) * t];
    }
    var m = [(x1 + x2) / 2, (y1 + y2) / 2], a = clip(x1, y1, m[0], m[1]), b = clip(x2, y2, m[0], m[1]);
    return [a, b];
  }
  function eq(ds, dd){ var x = 150 + (ds + dd) / 2; return [x, dY(x, dd)]; }
  function line(p, cls){ return '<line x1="' + p[0][0].toFixed(1) + '" y1="' + p[0][1].toFixed(1) + '" x2="' + p[1][0].toFixed(1) + '" y2="' + p[1][1].toFixed(1) + '" class="' + cls + '"/>'; }
  function drops(e, lab, cls){
    return '<line x1="' + L + '" y1="' + e[1].toFixed(1) + '" x2="' + e[0].toFixed(1) + '" y2="' + e[1].toFixed(1) + '" class="drop ' + cls + '"/>' +
      '<line x1="' + e[0].toFixed(1) + '" y1="' + e[1].toFixed(1) + '" x2="' + e[0].toFixed(1) + '" y2="' + B + '" class="drop ' + cls + '"/>' +
      '<circle cx="' + e[0].toFixed(1) + '" cy="' + e[1].toFixed(1) + '" r="3.2" class="dot ' + cls + '"/>' +
      '<text x="' + (L - 5) + '" y="' + (e[1] + 4).toFixed(1) + '" class="lab ' + cls + '" text-anchor="end">r' + lab + '</text>' +
      '<text x="' + e[0].toFixed(1) + '" y="' + (B + 13) + '" class="lab ' + cls + '" text-anchor="middle">Q' + lab + '</text>';
  }
  var S0 = seg(sY, 0), D0 = seg(dY, 0), e0 = eq(0, 0), svg = '';
  svg += '<line x1="' + L + '" y1="' + T + '" x2="' + L + '" y2="' + B + '" class="ax"/><line x1="' + L + '" y1="' + B + '" x2="' + (R + 6) + '" y2="' + B + '" class="ax"/>';
  svg += line(S0, "cv") + line(D0, "cv");
  svg += '<text x="' + (S0[1][0] + 2).toFixed(1) + '" y="' + (S0[1][1] + 2).toFixed(1) + '" class="cl">S</text><text x="' + (D0[1][0] + 2).toFixed(1) + '" y="' + (D0[1][1] - 2).toFixed(1) + '" class="cl">D</text>';
  if(dS || dD){
    var S1 = seg(sY, dS), D1 = seg(dY, dD), e1 = eq(dS, dD);
    if(dS) svg += line(S1, "cv new") + '<text x="' + (S1[1][0] + 2).toFixed(1) + '" y="' + (S1[1][1] + 12).toFixed(1) + '" class="cl new">S₂</text>';
    if(dD) svg += line(D1, "cv new") + '<text x="' + (D1[1][0] + 2).toFixed(1) + '" y="' + (D1[1][1] - 2).toFixed(1) + '" class="cl new">D₂</text>';
    svg += drops(e0, "₁", "old") + drops(e1, "₂", "new");
  } else {
    svg += drops(e0, "*", "old");
  }
  svg += '<text x="' + (L - 30) + '" y="' + ((T + B) / 2) + '" class="axl" transform="rotate(-90 ' + (L - 30) + ' ' + ((T + B) / 2) + ')" text-anchor="middle">Real interest rate</text>';
  svg += '<text x="' + ((L + R) / 2) + '" y="' + (B + 30) + '" class="axl" text-anchor="middle">Quantity of loanable funds</text>';
  return '<figure class="lfg"><svg viewBox="0 0 280 226" role="img" aria-label="' + strip(caption) + '">' + svg + '</svg><figcaption>' + caption + '</figcaption></figure>';
}

CH.lf = {n:6, title:"Loanable Funds and the Real Interest Rate", short:"Loanable Funds",
 notes:[
  {id:"lf-rates", h:"Interest Rates: Nominal and Real", body:
   '<div class="point"><b>The point</b><p>An <b>interest rate</b> is &ldquo;the cost of borrowing or the return to saving rental funds.&rdquo; For borrowers it is a <b>penalty for consuming more now</b>; for savers it is a <b>reward for consuming later</b>. The <b>nominal</b> rate is growth in <b>dollars</b>; the <b>real</b> rate is growth in <b>purchasing power</b>: real = nominal &minus; inflation.</p><p class="able"><b>Be able to</b> say what interest rates do, compute a real rate ex ante or ex post, and find nominal or inflation from the other two.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 1 &middot; Problem Set 5</span></p>'+
   '<h3 class="sub" id="lf-what">What an interest rate does</h3>'+
   '<ul><li><b>Balances time preferences:</b> consume more now, or more in the future?</li>'+
   '<li><b>Balances risk:</b> &ldquo;the riskier the proposition the higher the interest rate.&rdquo; Savers: a bank account is low risk and pays little; the stock market is riskier and can pay more. Borrowers: Apple or Microsoft borrow cheaply; a startup pays more for the same amount over the same time.</li>'+
   '<li>Because it balances time and risk, an interest rate <b>redistributes purchasing power through time</b>.</li></ul>'+
   '<h3 class="sub" id="lf-fisher">Nominal, real, ex ante, ex post</h3>'+
   '<div class="boxrow"><div class="box"><h4>Nominal rate</h4><p>&ldquo;The rate of growth in the <b>dollar value</b> of a deposit or debt.&rdquo; Ignores the price level. $100 at 5% becomes $105. It is the rate banks <b>advertise</b>, since they don&rsquo;t know future inflation.</p></div><div class="box"><h4>Real rate</h4><p>&ldquo;The rate of growth in the <b>purchasing power</b> of a deposit or debt.&rdquo; The one that truly matters for saving and investment decisions.</p></div></div>'+
   '<div class="formula">r = n &minus; &pi;<sup>e</sup> &nbsp;&nbsp;(ex ante) &nbsp;&nbsp;&middot;&nbsp;&nbsp; r = n &minus; &pi; &nbsp;&nbsp;(ex post)<small>r = real rate &middot; n = nominal rate &middot; &pi; = inflation (&ldquo;Pi is not 3.14&rdquo;) &middot; e = expected</small></div>'+
   '<ul><li><b>Ex ante</b> = &ldquo;before the event&rdquo;: future inflation is unknown, so use <b>expected</b> inflation. Expecting higher inflation makes you save more now.</li>'+
   '<li><b>Ex post</b> = &ldquo;after the event&rdquo;: inflation is known, so use actual inflation.</li>'+
   '<li>His examples: nominal 5%, inflation 3% &rarr; <b>real 2%</b>. Nominal 5%, inflation 6% &rarr; <b>real &minus;1%</b> (purchasing power lost).</li>'+
   '<li>Nominal and real rates can each be <b>positive, negative or zero</b>.</li></ul>'},

  {id:"lf-model", h:"The Loanable Funds Model", body:
   '<div class="point"><b>The point</b><p>The market for loanable funds is a <b>supply and demand model</b> that sets a <b>representative real interest rate</b> in the <b>long run</b>. <b>Supply comes from saving; demand comes from investment borrowing.</b> The &ldquo;price&rdquo; is the real interest rate.</p><p class="able"><b>Be able to</b> draw both curves with the right axes, say why each slopes the way it does, list what shifts each, and explain shortage and surplus.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 1 &middot; on the Exam 2 and Final graph lists</span></p>'+
   '<h3 class="sub" id="lf-setup">The set-up</h3>'+
   '<ul><li><b>Loanable funds</b> = &ldquo;the flow of resources available to fund private investment.&rdquo;</li>'+
   '<li><b>One representative rate</b> stands in for the thousands of real rates (mortgages, car loans, credit cards&hellip;). <b>Long run</b> = prices have fully adjusted, markets clear.</li>'+
   '<li>It uses the <b>real</b> rate because that is what matters for saving and investing decisions.</li>'+
   '<li><b>Assumptions:</b> one financial market; every saver deposits there; everyone borrows there; one representative real rate.</li>'+
   '<li>Axes: <b>real interest rate</b> up the side, <b>quantity of loanable funds</b> along the bottom.</li></ul>'+
   lfGraph("Equilibrium: supply (saving) meets demand (investment) at r* and Q*.", 0, 0)+
   '<h3 class="sub" id="lf-supply">Supply of loanable funds = saving</h3>'+
   '<ul><li><b>Slopes up:</b> a higher real rate makes saving more attractive (3% &rarr; 6%, more saved). That is a move <b>along</b> the curve.</li>'+
   '<li><b>The warning he gave:</b> a higher interest rate does <b>not shift</b> supply. Only a change in saving does.</li>'+
   '<li><b>Shifter 1: private saving</b>, which changes with <b>income</b> (more income, more saving), <b>consumer confidence</b> (less confident, save more, as in COVID), <b>preferences</b> (more patient, save more), <b>demographics</b> (more workers aged 25&ndash;54 save more; more retirees save less), and <b>policy</b> (a bigger tax break for retirement saving &uarr; saving; higher taxes on interest or capital gains &darr; saving).</li>'+
   '<li><b>Shifter 2: public saving</b> (T &minus; G). A <b>surplus</b> raises it; a <b>deficit</b> lowers it. Private + public = national saving.</li>'+
   '<li><b>Direction:</b> saving &uarr; &rarr; supply shifts <b>down and to the right</b>. Saving &darr; &rarr; <b>up and to the left</b>.</li></ul>'+
   '<h3 class="sub" id="lf-demand">Demand for loanable funds = investment</h3>'+
   '<ul><li>Investment means <b>buying capital</b>, as in Solow and GDP, <b>not financial investment</b>. He called this crucial.</li>'+
   '<li><b>Three sources:</b> consumer borrowing (a house), business borrowing (R&amp;D), government borrowing (a new road).</li>'+
   '<li><b>Slopes down:</b> a lower rate lowers the cost of borrowing, so quantity demanded rises. A lower rate does <b>not shift</b> demand.</li>'+
   '<li><b>Four shifters:</b> (1) <b>expected future profitability</b>; (2) <b>new technology</b> (lower costs, more profit, more investment); (3) <b>policy</b> (an R&amp;D tax credit &uarr; demand; a higher tax on profits &darr; demand); (4) <b>government borrowing</b> (more borrowing &uarr; demand).</li>'+
   '<li><b>Direction:</b> demand &uarr; &rarr; shifts <b>up and to the right</b>. Demand &darr; &rarr; <b>down and to the left</b>.</li></ul>'+
   '<h3 class="sub" id="lf-eq">Equilibrium, shortage, surplus</h3>'+
   '<ul><li><b>Equilibrium r*:</b> quantity demanded = quantity supplied; the market clears.</li>'+
   '<li><b>Rate below r*: shortage</b> (demanded &gt; supplied). Borrowers bid the rate <b>up</b> toward r*.</li>'+
   '<li><b>Rate above r*: surplus</b> (supplied &gt; demanded). Savers offer lower rates, so it falls <b>down</b> toward r*.</li></ul>'},

  {id:"lf-shifts", h:"Shifts: What Happens to r and Investment", body:
   '<div class="point"><b>The point</b><p>Every question works the same way: <b>(1) which curve shifts, and which way? (2) read the new real rate; (3) read the new quantity of loanable funds</b>, which is investment. The rate can rise with investment <b>up or down</b>, depending on which curve moved.</p><p class="able"><b>Be able to</b> take any event, pick the curve and direction, and give what happens to r and to investment. And never reason from a price change.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 1 &middot; his four worked shifts</span></p>'+
   '<h3 class="sub" id="lf-table">The four shifts</h3>'+
   '<div class="lfgrid">'+
   lfGraph("<b>Saving &uarr;</b> (private or public): supply shifts right. <b>r falls, investment rises.</b>", 45, 0)+
   lfGraph("<b>Saving &darr;</b> (a deficit, an aging society): supply shifts left. <b>r rises, investment falls.</b>", -45, 0)+
   lfGraph("<b>Borrowing &uarr;</b> (profits, technology, R&amp;D credit): demand shifts right. <b>r rises, investment rises.</b>", 0, 45)+
   lfGraph("<b>Borrowing &darr;</b> (tax on profits, gloomy outlook): demand shifts left. <b>r falls, investment falls.</b>", 0, -45)+
   '</div>'+
   '<div class="tblwrap"><table class="tbl fit c4"><thead><tr><th>Event</th><th>Curve</th><th>r</th><th>Investment</th></tr></thead><tbody>'+
   '<tr><td class="head">Saving &uarr;</td><td class="sm">S right</td><td class="sm">&darr;</td><td class="sm">&uarr;</td></tr>'+
   '<tr><td class="head">Saving &darr;</td><td class="sm">S left</td><td class="sm">&uarr;</td><td class="sm">&darr;</td></tr>'+
   '<tr><td class="head">Borrowing &uarr;</td><td class="sm">D right</td><td class="sm">&uarr;</td><td class="sm">&uarr;</td></tr>'+
   '<tr><td class="head">Borrowing &darr;</td><td class="sm">D left</td><td class="sm">&darr;</td><td class="sm">&darr;</td></tr></tbody></table></div>'+
   '<p><b>Memory hook:</b> <b>S</b>aving moves r and investment in <b>opposite</b> directions; <b>D</b>emand moves them the <b>same</b> direction.</p>'+
   '<h3 class="sub" id="lf-price">Never reason from a price change</h3>'+
   '<ul><li>&ldquo;If the interest rate falls, will investment increase?&rdquo; <b>It depends</b> on what caused the fall.</li>'+
   '<li>The rate falls because <b>demand fell</b> &rarr; lower rate and <b>less</b> investment.</li>'+
   '<li>The rate falls because <b>supply rose</b> (more saving) &rarr; lower rate and <b>more</b> investment.</li>'+
   '<li>A rate change on its own is a move <b>along</b> a curve (quantity supplied or demanded), never a shift.</li></ul>'},

  {id:"lf-crowd", h:"Crowding Out, Deficits and Debt", body:
   '<div class="point"><b>The point</b><p>A <b>budget deficit</b> lowers public saving, so national saving falls, supply shifts <b>left</b>, and the real rate <b>rises</b>. At the higher rate the <b>quantity</b> of loanable funds demanded falls, so <b>private investment falls</b>. That is <b>crowding out</b>.</p><p class="able"><b>Be able to</b> walk through crowding out on the graph, define it in his words, and tell a deficit from the debt.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 1 &middot; key exam concept</span></p>'+
   '<h3 class="sub" id="lf-crowding">Crowding out</h3>'+
   lfGraph("A deficit: public saving falls, supply shifts left, r rises, private investment falls.", -45, 0)+
   '<ul><li><b>Definition:</b> &ldquo;a decrease in private spending, in our case private investment, because the government budget deficit is leading to a higher interest rate.&rdquo;</li>'+
   '<li>It is the <b>I</b> in <b>Y = C + I + G + NX</b> that shrinks.</li>'+
   '<li>Investment falls through a <b>move along the demand curve</b>, not a shift. &ldquo;I don&rsquo;t mean we&rsquo;re shifting the curve.&rdquo;</li>'+
   '<li>Government borrowing can also be shown as <b>more demand</b> for loanable funds: r still rises, and private borrowers are still squeezed out.</li></ul>'+
   '<h3 class="sub" id="lf-debt">Deficit versus debt</h3>'+
   '<ul><li><b>Deficit:</b> one year of spending more than tax revenue. <b>Debt:</b> &ldquo;the accumulation of deficits through time.&rdquo;</li>'+
   '<li>The U.S. has run deficits most years since 1948 (&ldquo;it&rsquo;s bipartisan&rdquo;), and debt as a share of GDP has risen since the 1960s.</li>'+
   '<li>Bigger deficits and debt &rarr; less national saving &rarr; <b>higher real rates over time</b>.</li>'+
   '<li><b>His caveat:</b> recently crowding out has been &ldquo;minimal at best,&rdquo; because real rates sat near or below zero; going from &minus;&frac12;% to 0% barely changes investment. When real rates start positive, deficits matter more.</li></ul>'}
 ],
 decks:[
  {id:"terms", label:"Key terms", cards:[
   ["Interest rate","The cost of borrowing or the return to saving rental funds","g-lf-rates"],
   ["For a borrower, the interest rate is","A penalty for consuming more now","g-lf-rates"],
   ["For a saver, the interest rate is","A reward for deciding to consume later","g-lf-rates"],
   ["Nominal interest rate","The rate of growth in the dollar value of a deposit or debt","g-lf-rates"],
   ["Real interest rate","The rate of growth in the purchasing power of a deposit or debt","g-lf-rates"],
   ["Ex ante","“Before the event”: use expected inflation, r = n − πᵉ","g-lf-rates"],
   ["Ex post","“After the event”: use actual inflation, r = n − π","g-lf-rates"],
   ["Loanable funds","The flow of resources available to fund private investment","g-lf-model"],
   ["Market for loanable funds","A supply and demand model that sets a representative real interest rate in the long run","g-lf-model"],
   ["Supply of loanable funds","Saving — slopes up","g-lf-model"],
   ["Demand for loanable funds","Investment borrowing — slopes down","g-lf-model"],
   ["Shortage of loanable funds","Rate below r*: demanded exceeds supplied, the rate is bid up","g-lf-model"],
   ["Surplus of loanable funds","Rate above r*: supplied exceeds demanded, the rate falls","g-lf-model"],
   ["Crowding out","A fall in private investment because a budget deficit raises the interest rate","g-lf-crowd"],
   ["Budget deficit","One year of spending more than tax revenue — negative public saving","g-lf-crowd"],
   ["Government debt","The accumulation of deficits through time","g-lf-crowd"]]},
  {id:"shifts", label:"What shifts what", cards:[
   ["Two jobs of an interest rate","Balance time preferences and balance risk","g-lf-rates"],
   ["Why the model uses the real rate","It is the rate that truly matters for saving and investment decisions","g-lf-model"],
   ["The two supply shifters","Private saving and public saving","g-lf-model"],
   ["Five things that move private saving","Income, consumer confidence, preferences, demographics, policy","g-lf-model"],
   ["The four demand shifters","Expected profitability, new technology, policy, government borrowing","g-lf-model"],
   ["Three sources of demand","Consumer, business and government borrowing","g-lf-model"],
   ["Saving rises","Supply shifts right: r falls, investment rises","g-lf-shifts"],
   ["Saving falls","Supply shifts left: r rises, investment falls","g-lf-shifts"],
   ["Borrowing demand rises","Demand shifts right: r rises, investment rises","g-lf-shifts"],
   ["Borrowing demand falls","Demand shifts left: r falls, investment falls","g-lf-shifts"],
   ["More retirees","Private saving falls: supply left, r up, investment down","g-lf-shifts"],
   ["New technology","Demand right: r up, investment up","g-lf-shifts"],
   ["Higher tax on profits","Demand left: r down, investment down","g-lf-shifts"],
   ["Bigger tax break for retirement saving","Saving up: supply right, r down, investment up","g-lf-shifts"],
   ["Never reason from a price change","A lower rate can come with more or less investment — ask which curve moved","g-lf-shifts"],
   ["Nominal 5%, inflation 6%","Real rate −1%: purchasing power lost","g-lf-rates"]]}
 ]
};

/* ---- loanable funds questions ---- */
QB = QB.concat([
 {tp:"lf",sec:"g-lf-rates",t:"mc",q:"In the lecture, an interest rate is defined as:",a:"the cost of borrowing or the return to saving rental funds",w:["the rate at which the price level rises each year","the share of income that households choose to save","the price the central bank sets for all loans in the economy"],e:"His definition. For borrowers it is a penalty for consuming now; for savers a reward for waiting."},
 {tp:"lf",sec:"g-lf-rates",t:"mc",q:"Which two things do interest rates balance?",a:"Time preferences and risk",w:["Imports and exports","Prices and quantities of goods","Taxes and government purchases"],e:"Consume now or later (time), and the riskier the proposition, the higher the rate (risk). Together they redistribute purchasing power through time."},
 {tp:"lf",sec:"g-lf-rates",t:"mc",q:"A startup and Apple each borrow the same amount for the same length of time. Who pays the higher interest rate, and why?",a:"The startup, because lending to it is riskier",w:["Apple, because it borrows more often","Neither: the same loan must carry the same rate","The startup, because it has more expected profit"],e:"“The riskier the proposition the higher the interest rate.” Apple has a track record of profit."},
 {tp:"lf",sec:"g-lf-rates",t:"mc",q:"The nominal interest rate is:",a:"the rate of growth in the dollar value of a deposit or debt",w:["the rate of growth in the purchasing power of a deposit or debt","the nominal rate minus the expected rate of inflation","the rate that truly matters for saving and investment decisions"],e:"Nominal ignores the price level; the real rate is growth in purchasing power."},
 {tp:"lf",sec:"g-lf-rates",m:1,ap:true,t:"mc",q:"A savings account pays a nominal rate of 5% and inflation turns out to be 3%. The real interest rate is:",a:"2%",w:["8%","−2%","1.67%"],e:"Ex post: r = n − π = 5 − 3 = 2%. Purchasing power grew 2%."},
 {tp:"lf",sec:"g-lf-rates",m:1,ap:true,t:"mc",q:"A saver earns a nominal rate of 5% while inflation is 6%. The real interest rate is:",a:"−1%, so the saver loses purchasing power",w:["1%, so the saver gains purchasing power","11%, so the saver gains purchasing power","0%, because the nominal rate is positive"],e:"r = 5 − 6 = −1%. His second worked example: real rates can be negative."},
 {tp:"lf",sec:"g-lf-rates",m:1,ap:true,t:"mc",q:"A bank offers a loan at a nominal 7% and people expect inflation of 4%. The ex ante real interest rate is:",a:"3%",w:["11%","−3%","1.75%"],e:"Ex ante uses expected inflation: r = n − πᵉ = 7 − 4 = 3%."},
 {tp:"lf",sec:"g-lf-rates",t:"mc",q:"Why do banks advertise the nominal interest rate?",a:"They don’t know with certainty what inflation will be",w:["The real rate is always higher than the nominal rate","The law forbids advertising a real interest rate","Borrowers only care about the dollar value of a loan"],e:"Future inflation is unknown, so the dollar rate is what can be promised."},
 {tp:"lf",sec:"g-lf-rates",t:"tf",q:"Ex ante means “after the event,” so the ex ante real rate uses actual inflation.",a:false,e:"False. Ex ante means “before the event” and uses expected inflation (r = n − πᵉ). Ex post, after the event, uses actual inflation."},
 {tp:"lf",sec:"g-lf-rates",t:"tf",q:"Both nominal and real interest rates can be positive, negative or zero.",a:true,e:"True. He says so directly, and his 5%-nominal, 6%-inflation example gives a negative real rate."},

 {tp:"lf",sec:"g-lf-model",t:"mc",q:"The market for loanable funds is:",a:"a supply and demand model that determines a representative real interest rate in the long run",w:["a supply and demand model that determines the nominal interest rate in the short run","the market where the central bank sets the rate on reserves every day","a model of how banks create money from new deposits"],e:"His definition: supply and demand, one representative real rate, long run. (The nominal rate in the short run is the liquidity preference model, next lecture.)"},
 {tp:"lf",sec:"g-lf-model",t:"mc",q:"Loanable funds are:",a:"the flow of resources available to fund private investment",w:["the stock of money held by households at the end of a year","the reserves banks must keep at the central bank","the total amount of government debt outstanding"],e:"Think of the saving and borrowing of money used to buy capital."},
 {tp:"lf",sec:"g-lf-model",t:"mc",q:"In the loanable funds model, the supply of loanable funds comes from ___ and the demand comes from ___.",a:"saving; investment",w:["investment; saving","consumption; government purchases","the central bank; commercial banks"],e:"Savers supply funds; borrowers who buy capital demand them."},
 {tp:"lf",sec:"g-lf-model",t:"mc",q:"Why does the loanable funds model use the real interest rate rather than the nominal rate?",a:"The real rate is what truly matters for saving and investment decisions",w:["The real rate is the rate banks advertise to their customers","The nominal rate cannot be measured with any accuracy","The real rate never changes in the long run"],e:"If you earn 5% while prices rise 6%, you lose purchasing power, so the real rate drives decisions."},
 {tp:"lf",sec:"g-lf-model",t:"mc",q:"The supply of loanable funds slopes upward because:",a:"a higher real rate makes saving more attractive",w:["a higher real rate makes borrowing cheaper","more saving causes the real rate to rise","higher income always raises the interest rate"],e:"A move along the curve: 3% to 6% means more quantity supplied. A higher rate does not shift supply."},
 {tp:"lf",sec:"g-lf-model",t:"mc",q:"In this model, “investment” means:",a:"buying capital, such as a new factory or machinery",w:["buying stocks and bonds on the exchange","putting money into a savings account","lending money to the government"],e:"He called this crucial: not financial investment, but the purchase of capital, as in Solow and GDP."},
 {tp:"lf",sec:"g-lf-model",t:"mc",q:"Which is NOT one of the four things that shift the demand for loanable funds?",a:"A change in the real interest rate",w:["Expectations of future profitability","New technology","Government borrowing"],e:"A rate change moves along the curve. The four shifters are expected profitability, technology, policy and government borrowing."},
 {tp:"lf",sec:"g-lf-model",t:"mc",q:"The real interest rate is below its equilibrium level. What happens?",a:"A shortage: borrowers bid the rate up toward equilibrium",w:["A surplus: savers offer lower rates until it falls","A shortage: savers offer lower rates until it falls","Nothing: the rate stays wherever it starts"],e:"Below r*, quantity demanded exceeds quantity supplied, so the rate rises."},
 {tp:"lf",sec:"g-lf-model",ap:true,t:"mc",q:"More of the population reaches working age (25–54). What happens to private saving and the supply of loanable funds?",a:"Saving rises, so supply shifts right",w:["Saving falls, so supply shifts left","Saving rises, so demand shifts right","Nothing, since age does not affect saving"],e:"Working-age adults save; retirees draw savings down. Demographics is one of the five things that move private saving."},
 {tp:"lf",sec:"g-lf-model",t:"tf",q:"A higher real interest rate shifts the supply of loanable funds to the right.",a:false,e:"False — the mistake he warned about. A higher rate raises the quantity supplied (a move along the curve). Only a change in saving shifts supply."},
 {tp:"lf",sec:"g-lf-model",t:"tf",q:"Consumer, business and government borrowing are the three sources of demand for loanable funds.",a:true,e:"True: a house, research and development, a new road."},

 {tp:"lf",sec:"g-lf-shifts",m:1,ap:true,t:"mc",q:"Households become more confident about the economy and save less. In the loanable funds market:",a:"supply shifts left, the real rate rises and investment falls",w:["supply shifts right, the real rate falls and investment rises","demand shifts left, the real rate falls and investment falls","demand shifts right, the real rate rises and investment rises"],e:"Less saving = less supply. Saving moves r and investment in opposite directions."},
 {tp:"lf",sec:"g-lf-shifts",m:1,ap:true,t:"mc",q:"A new technology lowers the cost of production across many industries. In the loanable funds market:",a:"demand shifts right, the real rate rises and investment rises",w:["supply shifts right, the real rate falls and investment rises","demand shifts left, the real rate falls and investment falls","supply shifts left, the real rate rises and investment falls"],e:"Lower costs, higher profitability, more investment demand. Demand moves r and investment the same way."},
 {tp:"lf",sec:"g-lf-shifts",m:1,ap:true,t:"mc",q:"Congress raises the tax on business profits. In the loanable funds market:",a:"demand shifts left, the real rate falls and investment falls",w:["demand shifts right, the real rate rises and investment rises","supply shifts right, the real rate falls and investment rises","supply shifts left, the real rate rises and investment falls"],e:"“How is that going to affect investment?” Less after-tax profit, less investment demand."},
 {tp:"lf",sec:"g-lf-shifts",m:1,ap:true,t:"mc",q:"The government raises the limit on tax-free retirement saving from $20,000 to $50,000 a year. In the loanable funds market:",a:"supply shifts right, the real rate falls and investment rises",w:["demand shifts right, the real rate rises and investment rises","supply shifts left, the real rate rises and investment falls","demand shifts left, the real rate falls and investment falls"],e:"A tax break for saving raises private saving — his own example."},
 {tp:"lf",sec:"g-lf-shifts",m:1,ap:true,t:"mc",q:"The tax on interest income and capital gains goes up. In the loanable funds market:",a:"supply shifts left, the real rate rises and investment falls",w:["supply shifts right, the real rate falls and investment rises","demand shifts left, the real rate falls and investment falls","demand shifts right, the real rate rises and investment rises"],e:"“If I could earn 3% I’m more likely to save than if I could earn only 1% because of taxes.” Less saving, less supply."},
 {tp:"lf",sec:"g-lf-shifts",t:"mc",q:"If the real interest rate falls, will investment increase?",a:"It depends on whether supply or demand shifted",w:["Yes, a lower rate always raises investment","No, a lower rate always lowers investment","Yes, but only in the long run"],e:"Never reason from a price change: if demand fell, investment falls; if saving rose, investment rises."},
 {tp:"lf",sec:"g-lf-shifts",t:"mc",q:"In two different economies the real interest rate rises. In the first investment rises; in the second it falls. What explains the difference?",a:"Demand rose in the first; supply fell in the second",w:["Supply rose in the first; demand fell in the second","Demand fell in the first; supply rose in the second","Inflation rose in the first; it fell in the second"],e:"Demand moves r and investment together; supply moves them opposite ways."},
 {tp:"lf",sec:"g-lf-shifts",t:"mc",q:"What are the three steps he uses for every loanable funds graph?",a:"Find which curve shifts, read the new rate, then read the new quantity",w:["Read the new rate, decide the curve, then compute GDP","Compute the real rate, then the nominal rate, then inflation","Shift both curves, then average the two rates"],e:"(1) Supply or demand, and which way; (2) the change in r; (3) the change in the quantity of loanable funds — investment."},
 {tp:"lf",sec:"g-lf-shifts",t:"tf",q:"When saving rises, the real interest rate falls and the quantity of loanable funds rises.",a:true,e:"True: supply shifts down and to the right, so r falls and investment rises (his first worked example: from 5% and $60B)."},
 {tp:"lf",sec:"g-lf-shifts",t:"tf",q:"A fall in the real interest rate always means firms will invest more.",a:false,e:"False. If the fall came from lower demand, investment falls too. Never reason from a price change."},

 {tp:"lf",sec:"g-lf-crowd",t:"mc",q:"Crowding out is:",a:"a decrease in private investment because a budget deficit raises the interest rate",w:["an increase in private investment because a budget surplus lowers the interest rate","a decrease in government spending because private firms borrow too much","a rise in imports that pushes out domestic production"],e:"His definition. The I in Y = C + I + G + NX shrinks."},
 {tp:"lf",sec:"g-lf-crowd",m:1,ap:true,t:"mc",q:"The government runs a larger budget deficit while private saving is unchanged. In the loanable funds market:",a:"supply shifts left, the real rate rises and private investment falls",w:["supply shifts right, the real rate falls and private investment rises","demand shifts left, the real rate falls and private investment falls","nothing shifts, since government borrowing is not part of the model"],e:"Public saving falls, national saving falls, supply shifts up and left: crowding out."},
 {tp:"lf",sec:"g-lf-crowd",t:"mc",q:"In crowding out, private investment falls because of:",a:"a movement along the demand curve as the rate rises",w:["a leftward shift of the demand curve","a rightward shift of the supply curve","a fall in the nominal rate of interest"],e:"“I don’t mean we’re shifting the curve.” The higher rate lowers the quantity of loanable funds demanded."},
 {tp:"lf",sec:"g-lf-crowd",t:"mc",q:"What is the difference between a deficit and the debt?",a:"A deficit is one year’s shortfall; the debt is the accumulation of deficits through time",w:["A deficit is owed to foreigners; the debt is owed to citizens","A deficit is the debt divided by GDP","A deficit is private borrowing; the debt is public borrowing"],e:"Persistent deficits mean a rising debt."},
 {tp:"lf",sec:"g-lf-crowd",t:"mc",q:"Why has crowding out been “minimal at best” in recent years, according to the lecture?",a:"Real interest rates were near or below zero, so small rises barely affected investment",w:["The government stopped running budget deficits after 1948","Private saving rose enough to cancel every deficit","Investment no longer depends on the interest rate at all"],e:"Going from about −½% to 0% doesn’t really change investment. With positive real rates, deficits matter more."},
 {tp:"lf",sec:"g-lf-crowd",t:"mc",q:"A budget surplus in the loanable funds model:",a:"raises public saving, shifting supply right and lowering the real rate",w:["lowers public saving, shifting supply left and raising the real rate","raises government borrowing, shifting demand right","has no effect, since only private saving counts"],e:"Surplus = tax revenue above spending = positive public saving, which adds to national saving."},
 {tp:"lf",sec:"g-lf-crowd",ap:true,t:"mc",q:"Over decades a country’s government debt keeps rising as a share of GDP. The lecture predicts:",a:"higher real interest rates over time",w:["lower real interest rates over time","no change in real rates, since debt is not saving","higher nominal rates but lower real rates"],e:"Bigger deficits and debt mean less national saving, supply shifts left, higher real rates."},
 {tp:"lf",sec:"g-lf-crowd",t:"tf",q:"Crowding out works through Y = C + I + G + NX: a deficit reduces the I.",a:true,e:"True. The higher rate lowers private investment spending."},
 {tp:"lf",sec:"g-lf-crowd",t:"tf",q:"In crowding out, the budget deficit shifts the demand for loanable funds to the left.",a:false,e:"False. In his lecture the deficit lowers public saving, shifting supply left; investment falls by moving along the demand curve."}
]);

/* ---- its place in the outline: Unit 2 starts here, before the formulas ---- */
GUIDE.sections.splice(GUIDE.sections.length - 1, 0, {h:"Loanable Funds and the Real Interest Rate", tp:"lf", items:[
 {id:"g-lf-rates", t:"Interest Rates: Nominal and Real", a:"lf-rates",
  short:"An interest rate is the cost of borrowing or the return to saving; it balances time preferences and risk. Nominal = growth in dollars; real = growth in purchasing power. Ex ante r = n − πᵉ; ex post r = n − π. 5% and 3% → 2%; 5% and 6% → −1%.",
  subs:[["What an interest rate does","lf-what"],["Nominal, real, ex ante, ex post","lf-fisher"]]},
 {id:"g-lf-model", t:"The Loanable Funds Model", a:"lf-model",
  short:"Supply = saving (slopes up), demand = investment borrowing (slopes down), price = one representative real rate, long run. Supply shifters: private saving (income, confidence, preferences, demographics, policy) and public saving. Demand shifters: expected profitability, technology, policy, government borrowing. Below r*: shortage, rate rises; above: surplus, rate falls.",
  subs:[["The set-up","lf-setup"],["Supply = saving","lf-supply"],["Demand = investment","lf-demand"],["Equilibrium","lf-eq"]]},
 {id:"g-lf-shifts", t:"Shifts: What Happens to r and Investment", a:"lf-shifts",
  short:"Which curve, which way; read r; read quantity. Saving moves r and investment opposite ways; demand moves them the same way. Never reason from a price change.",
  subs:[["The four shifts","lf-table"],["Never reason from a price change","lf-price"]]},
 {id:"g-lf-crowd", t:"Crowding Out, Deficits and Debt", a:"lf-crowd",
  short:"A deficit lowers public saving: supply left, r up, private investment down (a move along demand). Deficit = one year; debt = accumulated deficits. Crowding out has been minimal while real rates sat near zero.",
  subs:[["Crowding out","lf-crowding"],["Deficit versus debt","lf-debt"]]}]});

/* ---- math practice: the Fisher identity with new numbers, and which curve shifts ---- */
PRACTICE_TOPICS.push(["interest","Interest"]);
TOPIC_LABEL.interest = "Interest";
var LF_SHOCKS = [
 ["Household incomes rise across the country, and people save more.", 0, "More saving: supply shifts right."],
 ["Worried about a coming recession, households cut spending and save more.", 0, "Lower confidence, more saving: supply shifts right."],
 ["The government raises the limit on tax-free retirement saving.", 0, "A tax break for saving: supply shifts right."],
 ["The government moves from a budget deficit to a surplus.", 0, "Public saving rises: supply shifts right."],
 ["A large share of the population retires and draws down its savings.", 1, "Less saving: supply shifts left."],
 ["The tax on interest income and capital gains goes up.", 1, "Saving pays less after tax: supply shifts left."],
 ["The government runs a much larger budget deficit.", 1, "Public saving falls: supply shifts left — crowding out."],
 ["Consumers grow confident and spend more of their income instead of saving it.", 1, "Less saving: supply shifts left."],
 ["Firms expect much higher profits over the next decade.", 2, "Higher expected profitability: demand shifts right."],
 ["A new technology lowers production costs in many industries.", 2, "Technology raises profitability: demand shifts right."],
 ["The government introduces a tax credit for research and development.", 2, "Policy that encourages investment: demand shifts right."],
 ["The government borrows heavily to build new roads and bridges.", 2, "More government borrowing: demand shifts right."],
 ["Congress raises the tax on business profits.", 3, "Less after-tax profit: demand shifts left."],
 ["Firms expect profits to fall and cancel plans for new factories.", 3, "Lower expected profitability: demand shifts left."]];
var LF_OUTCOMES = ["Supply shifts right: the real rate falls and investment rises", "Supply shifts left: the real rate rises and investment falls", "Demand shifts right: the real rate rises and investment rises", "Demand shifts left: the real rate falls and investment falls"];
GENS.push(
 {id:"lf-fisher", topic:"interest", name:"Real and nominal interest rates", variants:4,
  remind:"Real = nominal − inflation. Ex ante uses expected inflation, ex post the actual. It can be negative.",
  make:function(v){
   v = v || ri(1, 4);
   var n = ri(2, 24) / 2, p = ri(0, 18) / 2; if(n === p) n += 1;
   var r = n - p, b = {v:v, vals:{n:n, p:p}};
   function set(right, val, pairs){ return setupOf(right, val, pairs.filter(function(pr){ return isFinite(pr[1]) && Math.abs(pr[1] - val) > 0.15; })); }
   if(v <= 2){
    var ante = v === 2, label = ante ? "expected inflation" : "inflation";
    b.text = ante ? "A bank offers a loan at a nominal interest rate of " + num(n, 1) + "%. People expect inflation of " + num(p, 1) + "% over the year."
                  : "A deposit pays a nominal interest rate of " + num(n, 1) + "%. Inflation over the year turns out to be " + num(p, 1) + "%.";
    b.parts = [P("r", ante ? "the ex ante real interest rate" : "the real interest rate", r, 1, "%", (ante ? "Ex ante: r = n − πᵉ = " : "Ex post: r = n − π = ") + num(n, 1) + " − " + num(p, 1) + " = " + num(r, 1) + "%." + (r < 0 ? " Negative: purchasing power falls." : ""),
      {signed:true, wrong:[n + p, p - n, r + 1, n], setup:set(num(n, 1) + " − " + num(p, 1), r, [[num(n, 1) + " + " + num(p, 1), n + p], [num(p, 1) + " − " + num(n, 1), p - n], ["(" + num(n, 1) + " + " + num(p, 1) + ") ÷ 2", (n + p) / 2]])})];
   } else if(v === 3){
    b.text = "The real interest rate is " + num(r, 1) + "% and inflation is " + num(p, 1) + "%.";
    b.parts = [P("n", "the nominal interest rate", n, 1, "%", "n = r + π = " + num(r, 1) + " + " + num(p, 1) + " = " + num(n, 1) + "%.", {wrong:[r - p, p - r, r, Math.abs(r) + p + 1]})];
   } else {
    b.text = "A loan carries a nominal interest rate of " + num(n, 1) + "% and a real interest rate of " + num(r, 1) + "%.";
    b.parts = [P("p", "the rate of inflation", p, 1, "%", "π = n − r = " + num(n, 1) + " − " + num(r, 1) + " = " + num(p, 1) + "%.", {signed:true, wrong:[n + r, r - n, n, p + 1]})];
   }
   return b;
  }},
 {id:"lf-shift", topic:"interest", name:"Loanable funds: which curve shifts?",
  remind:"Saving moves supply: r and investment go opposite ways. Borrowing moves demand: r and investment go the same way.",
  make:function(){
   var s = rp(LF_SHOCKS);
   return {vals:{}, text:s[0], choice:{q:"What happens in the market for loanable funds?", opts:LF_OUTCOMES.slice(), right:s[1], work:s[2] + " " + LF_OUTCOMES[s[1]] + "."}};
  }});
GEN_BY_ID["lf-fisher"] = GENS[GENS.length - 2]; GEN_BY_ID["lf-shift"] = GENS[GENS.length - 1];
[{id:"lec-fisher", gen:"lf-fisher", src:"Lecture example", make:function(){
   return {text:"A deposit pays a nominal interest rate of 5%. Find the real interest rate in two cases.",
    parts:[P("a", "the real rate if inflation is 3%", 2, 1, "%", "5 − 3 = 2%. Purchasing power grows.", {signed:true, wrong:[8, -2, 1.67]}),
           P("b", "the real rate if inflation is 6%", -1, 1, "%", "5 − 6 = −1%. Purchasing power is lost.", {signed:true, wrong:[1, 11, 0]})]};
  }}].forEach(function(f){ f.topic = GEN_BY_ID[f.gen].topic; FIXED.push(f); FIXED_BY_ID[f.id] = f; });
