/* ================================================================ money and liquidity preference (Unit 2)
   Lecture, Oct 6: "The Liquidity Preference Model and the Nominal Interest Rate" (1:01:30).
   Barter and Menger, what money is, its four attributes and four functions,
   commodity vs fiat, the four measures, money demand, the model, and the four
   effects of more money (short run down, long run up).                      */

/* liquidity preference: a vertical money supply (shifted by dS) and a falling money demand (shifted by dD) */
function lpGraph(caption, dS, dD){
  var k = 140 / 180, L = 46, R = 256, T = 22, B = 188;
  function dY(x, d){ return 40 + k * (x - 60 - d); }
  function ln(x1, y1, x2, y2, cls){ return '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" class="' + cls + '"/>'; }
  function dLine(d, cls){ var x1 = Math.max(L + 4, 60 + d), x2 = Math.min(R - 2, 240 + d); return ln(x1, dY(x1, d), x2, dY(x2, d), cls); }
  function drops(x, y, lab, cls){
    return ln(L, y, x, y, "drop " + cls) + ln(x, y, x, B, "drop " + cls) + '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="3.2" class="dot ' + cls + '"/>' +
      '<text x="' + (L - 5) + '" y="' + (y + 4).toFixed(1) + '" class="lab ' + cls + '" text-anchor="end">n' + lab + '</text>' +
      '<text x="' + x.toFixed(1) + '" y="' + (B + 13) + '" class="lab ' + cls + '" text-anchor="middle">M' + lab + '</text>';
  }
  var x0 = 150, svg = ln(L, T, L, B, "ax") + ln(L, B, R + 6, B, "ax");
  svg += ln(x0, T + 6, x0, B, "cv") + '<text x="' + (x0 + 4) + '" y="' + (T + 10) + '" class="cl">MS</text>';
  svg += dLine(0, "cv") + '<text x="' + (240 + 2) + '" y="' + (dY(240, 0) - 2).toFixed(1) + '" class="cl">MD</text>';
  if(dS || dD){
    var x1 = x0 + dS;
    if(dS) svg += ln(x1, T + 6, x1, B, "cv new") + '<text x="' + (x1 + 4) + '" y="' + (T + 22) + '" class="cl new">MS₂</text>';
    if(dD) svg += dLine(dD, "cv new") + '<text x="' + Math.min(R - 20, 240 + dD + 2) + '" y="' + (dY(Math.min(R - 20, 240 + dD), dD) - 4).toFixed(1) + '" class="cl new">MD₂</text>';
    svg += drops(x0, dY(x0, 0), "₁", "old") + drops(x1, dY(x1, dD), "₂", "new");
    if(!dS) svg = svg.replace(/<text[^>]*class="lab new"[^>]*text-anchor="middle">M₂<\/text>/, "").replace(/(text-anchor="middle">)M₁</, "$1M₁ = M₂<");
  } else svg += drops(x0, dY(x0, 0), "*", "old");
  svg += '<text x="' + (L - 30) + '" y="' + ((T + B) / 2) + '" class="axl" transform="rotate(-90 ' + (L - 30) + ' ' + ((T + B) / 2) + ')" text-anchor="middle">Nominal interest rate</text>';
  svg += '<text x="' + ((L + R) / 2) + '" y="' + (B + 30) + '" class="axl" text-anchor="middle">Quantity of money</text>';
  return '<figure class="lfg"><svg viewBox="0 0 280 226" role="img" aria-label="' + strip(caption) + '">' + svg + '</svg><figcaption>' + caption + '</figcaption></figure>';
}

CH.money = {n:7, title:"Money and the Liquidity Preference Model", short:"Money",
 notes:[
  {id:"mon-what", h:"What Money Is", body:
   '<div class="point"><b>The point</b><p><b>Money</b> is anything <b>generally accepted</b> in payment for goods and services and in the repayment of debt. It grew <b>spontaneously out of barter</b> (Menger), because it removes the need for a <b>double coincidence of wants</b> and lowers transaction costs. Money is <b>not income and not wealth</b>.</p><p class="able"><b>Be able to</b> define barter and the double coincidence of wants, give the four attributes of good money and the four functions (medium of exchange is the most important), and tell commodity from fiat money.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 6 &middot; Problem Set 6</span></p>'+
   '<h3 class="sub" id="mon-barter">Barter, and where money comes from</h3>'+
   '<ul><li><b>Barter:</b> exchanging one good or service for another directly (an accountant trades for a haircut).</li>'+
   '<li><b>Double coincidence of wants:</b> each person has what the other wants. It rarely happens, and every trade needs its own deal.</li>'+
   '<li><b>Carl Menger:</b> traders swap for goods <b>more likely to be wanted</b>; the most salable goods win a &ldquo;horse race&rdquo; and become money. It happens <b>spontaneously</b>, without needing government.</li>'+
   '<li>Money matters because it <b>lowers transaction costs</b>, so there is more exchange.</li>'+
   '<li><b>Money is not income</b> (payment through time) <b>and not wealth</b> (your stock of assets). Bitcoin? &ldquo;Not really, at this point&rdquo;: not generally accepted.</li></ul>'+
   '<h3 class="sub" id="mon-attr">Four attributes of good money</h3>'+
   '<div class="tblwrap"><table class="tbl fit c2"><tbody>'+
   '<tr><td class="head">Divisible</td><td class="sm">Splits easily for trade. Livestock fails (&ldquo;worth a hoof&rdquo;).</td></tr>'+
   '<tr><td class="head">Durable</td><td class="sm">Not easily damaged. Bread fails; metals pass.</td></tr>'+
   '<tr><td class="head">Scarce</td><td class="sm">Not easily reproduced. Leaves and grass clippings fail.</td></tr>'+
   '<tr><td class="head">Transportable</td><td class="sm">Easy to carry over distance: coins, then paper, now electronic.</td></tr></tbody></table></div>'+
   '<p>Good money needs <b>all four</b>. Hook: <b>D-D-S-T</b> &mdash; &ldquo;Divide, Don&rsquo;t Spoil, Scarce, Take it with you.&rdquo;</p>'+
   '<h3 class="sub" id="mon-func">Four functions of money</h3>'+
   '<ol><li><b>Medium of exchange</b> &mdash; a mutually acceptable means of transaction. <b>The most important function</b>: &ldquo;if something is not a medium of exchange we won&rsquo;t call it money.&rdquo;</li>'+
   '<li><b>Unit of account</b> &mdash; how prices are posted and debts recorded ($5 vs $3 at a glance).</li>'+
   '<li><b>Store of value</b> &mdash; transfers purchasing power through time. Not unique to money; lost under hyperinflation.</li>'+
   '<li><b>Standard of deferred payment</b> &mdash; future payments (a mortgage, wages) are owed in money, not marbles or fruitcakes.</li></ol>'+
   '<h3 class="sub" id="mon-kinds">Commodity and fiat money</h3>'+
   '<ul><li><b>Commodity money</b> has <b>intrinsic value</b>, value apart from being money: gold, silver, copper coins, and <b>cigarettes in WWII POW camps</b> (they could be smoked).</li>'+
   '<li><b>Fiat money</b> has <b>no intrinsic value</b>: the dollar, euro, yen. It is valuable only because it is generally accepted and because taxes and debts to the government must be paid in it.</li></ul>'},

  {id:"mon-measure", h:"Measuring the Money Supply", body:
   '<div class="point"><b>The point</b><p>The Fed defines the money supply as &ldquo;the group of <b>safe assets</b> that households and businesses can use to make payments or hold as short-term investments.&rdquo; It is <b>not just currency</b>. Four measures, narrow to broad: currency, the <b>monetary base</b>, <b>M1</b>, <b>M2</b>.</p><p class="able"><b>Be able to</b> list what is in each measure, and never confuse the monetary base with M1.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 6 &middot; &ldquo;please don&rsquo;t confuse M1 and the monetary base&rdquo;</span></p>'+
   '<h3 class="sub" id="mon-m">The four measures</h3>'+
   '<div class="tblwrap"><table class="tbl fit c2"><tbody>'+
   '<tr><td class="head">Currency</td><td class="sm">Paper bills (Federal Reserve notes) and coins.</td></tr>'+
   '<tr><td class="head">Monetary base</td><td class="sm"><b>Currency + bank reserves.</b></td></tr>'+
   '<tr><td class="head">M1</td><td class="sm"><b>Currency + checking (demand deposits) + savings accounts</b> &mdash; savings added in <b>February 2021</b>; the Fed&rsquo;s weekly <b>H.6</b> report.</td></tr>'+
   '<tr><td class="head">M2</td><td class="sm"><b>M1 + small time deposits</b> (CDs under $100,000) <b>+ retail money market funds.</b></td></tr></tbody></table></div>'+
   '<ul><li><b>The trap:</b> M1 does <b>not</b> include bank reserves, and the monetary base does <b>not</b> include checking or savings. They share only currency.</li>'+
   '<li><b>MZM</b> (money of zero maturity) is broader still, but beyond this course.</li></ul>'},

  {id:"mon-lp", h:"Money Demand and the Liquidity Preference Model", body:
   '<div class="point"><b>The point</b><p>The liquidity preference model is a supply and demand model that sets a representative <b>nominal</b> interest rate in the <b>short run</b>. <b>Money supply is vertical</b> (the Fed controls it); <b>money demand slopes down</b> (a higher rate raises the opportunity cost of holding money). &ldquo;The biggest mistake I see is they combine or confuse the two models.&rdquo;</p><p class="able"><b>Be able to</b> draw it with the right axes, give the three reasons to hold money and the four money-demand shifters, and find the new rate and quantity after any shift.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 6 &middot; on the Exam 2 and Final graph lists</span></p>'+
   '<h3 class="sub" id="mon-demand">Money demand</h3>'+
   '<ul><li><b>Money demand</b> = &ldquo;the desired holdings of your financial assets in the form of money.&rdquo; It is a <b>choice</b>.</li>'+
   '<li><b>Three reasons to hold money:</b> <b>transactions</b> (rent, groceries, gas), <b>precaution</b> (a leaky pipe, a breakdown), <b>speculation</b> (waiting to buy a stock or bond when it dips).</li>'+
   '<li><b>Slopes down:</b> a higher nominal rate means you give up more bond interest by holding money, so you hold less &mdash; a move <b>along</b> the curve.</li>'+
   '<li><b>Four shifters:</b> (1) <b>income</b> (more transactions, more saving); (2) the <b>aggregate price level</b> (higher prices need more money &ldquo;to keep consumption constant&rdquo;); (3) <b>preferences</b> (skeptics of stocks hold more money); (4) <b>policy</b>.</li></ul>'+
   '<h3 class="sub" id="mon-model">The model</h3>'+
   lpGraph("Money supply is vertical at the amount the Fed sets; money demand slopes down. They meet at n*.", 0, 0)+
   '<div class="tblwrap"><table class="tbl fit c3"><thead><tr><th></th><th>Loanable funds</th><th>Liquidity preference</th></tr></thead><tbody>'+
   '<tr><td class="head">Vertical axis</td><td class="sm"><b>Real</b> interest rate</td><td class="sm"><b>Nominal</b> interest rate</td></tr>'+
   '<tr><td class="head">Horizontal axis</td><td class="sm">Loanable funds</td><td class="sm">Quantity of money</td></tr>'+
   '<tr><td class="head">Supply</td><td class="sm">Saving (slopes up)</td><td class="sm">Money supply (vertical)</td></tr>'+
   '<tr><td class="head">Demand</td><td class="sm">Investment</td><td class="sm">Money demand</td></tr>'+
   '<tr><td class="head">Time frame</td><td class="sm">Long run</td><td class="sm">Short run</td></tr></tbody></table></div>'+
   '<ul><li><b>Money supply shifts right</b> when the central bank increases it, or when money substitutes grow (Bitcoin becoming accepted); <b>left</b> for the opposite.</li></ul>'+
   '<h3 class="sub" id="mon-shifts">The shifts</h3>'+
   '<div class="lfgrid">'+
   lpGraph("<b>Income &uarr;</b>: MD shifts right. <b>n rises; quantity of money unchanged.</b>", 0, 45)+
   lpGraph("<b>Fed increases MS</b>: MS shifts right. <b>n falls; quantity of money rises.</b>", 45, 0)+
   '</div>'+
   '<p><b>Memory hook:</b> money <b>demand</b> moves only the <b>rate</b> (the supply line is vertical); money <b>supply</b> moves the rate the <b>opposite</b> way and moves the quantity.</p>'},

  {id:"mon-effects", h:"More Money: Short Run Down, Long Run Up", body:
   '<div class="point"><b>The point</b><p>Does more money raise or lower nominal interest rates? <b>Both.</b> In the <b>short run</b> the <b>liquidity effect</b> lowers the rate. In the <b>long run</b> three effects raise it: the <b>income</b>, <b>price level</b> and <b>expected inflation</b> effects.</p><p class="able"><b>Be able to</b> name all four effects, say which way each pushes the rate and why, and connect the last one to the Fisher identity.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 6 &middot; his closing point</span></p>'+
   '<h3 class="sub" id="mon-four">The four effects</h3>'+
   '<div class="tblwrap"><table class="tbl fit c3"><thead><tr><th>Effect</th><th>When</th><th>Why</th></tr></thead><tbody>'+
   '<tr><td class="head">Liquidity (Friedman)</td><td class="sm"><b>Short run: n falls</b></td><td class="sm">More money, each unit worth less; the graph above.</td></tr>'+
   '<tr><td class="head">Income</td><td class="sm">Long run: n rises</td><td class="sm">More money stimulates the economy, incomes rise, MD shifts right.</td></tr>'+
   '<tr><td class="head">Price level</td><td class="sm">Long run: n rises</td><td class="sm">Prices rise (quantity theory); more money needed, MD shifts right.</td></tr>'+
   '<tr><td class="head">Expected inflation</td><td class="sm">Long run: n rises</td><td class="sm">r = n &minus; &pi;<sup>e</sup>: if &pi;<sup>e</sup> rises, lenders demand a higher n to keep r.</td></tr></tbody></table></div>'+
   '<p><b>Hook:</b> <b>L</b>ower first, then <b>I-P-E</b> push it back up &mdash; &ldquo;<b>L</b>ater, <b>I P E</b> rise.&rdquo;</p>'}
 ],
 decks:[
  {id:"terms", label:"Key terms", cards:[
   ["Barter","Exchanging one good or service for another directly","g-mon-what"],
   ["Double coincidence of wants","When two people each have a good or service the other wants","g-mon-what"],
   ["Carl Menger","Money emerges spontaneously out of barter as the most salable goods win out","g-mon-what"],
   ["Money","Anything generally accepted in payment for goods and services and the repayment of debt","g-mon-what"],
   ["Commodity money","Money with intrinsic value — gold, silver, cigarettes in POW camps","g-mon-what"],
   ["Fiat money","Money with no intrinsic value — the dollar, euro, yen","g-mon-what"],
   ["Monetary base","Currency + bank reserves","g-mon-measure"],
   ["M1","Currency + checking deposits + savings accounts (savings since Feb 2021)","g-mon-measure"],
   ["M2","M1 + small time deposits (CDs under $100,000) + retail money market funds","g-mon-measure"],
   ["Money supply (Fed definition)","The group of safe assets households and businesses can use to make payments or hold as short-term investments","g-mon-measure"],
   ["Money demand","The desired holdings of your financial assets in the form of money","g-mon-lp"],
   ["Liquidity preference model","A supply and demand model that sets a representative nominal interest rate in the short run","g-mon-lp"],
   ["Liquidity effect","Short run: more money lowers the nominal interest rate (Friedman)","g-mon-effects"],
   ["Expected inflation effect","Long run: more money raises expected inflation, so lenders demand a higher nominal rate","g-mon-effects"]]},
  {id:"lists", label:"Lists and shifts", cards:[
   ["Four attributes of good money","Divisible, durable, scarce, transportable","g-mon-what"],
   ["Four functions of money","Medium of exchange, unit of account, store of value, standard of deferred payment","g-mon-what"],
   ["The most important function","Medium of exchange","g-mon-what"],
   ["Three reasons to hold money","Transactions, precaution, speculation","g-mon-lp"],
   ["Four money-demand shifters","Income, the aggregate price level, preferences, policy","g-mon-lp"],
   ["Money supply curve shape","Vertical — the Fed controls the amount","g-mon-lp"],
   ["Money demand slopes down because","A higher nominal rate raises the opportunity cost of holding money","g-mon-lp"],
   ["Income rises","MD shifts right: n rises, quantity of money unchanged","g-mon-lp"],
   ["Fed increases the money supply","MS shifts right: n falls, quantity of money rises","g-mon-lp"],
   ["The three long-run effects","Income, price level and expected inflation effects — all raise n","g-mon-effects"],
   ["Is Bitcoin money?","“Not really, at this point” — not generally accepted","g-mon-what"],
   ["Money is not","Income (payment through time) or wealth (a stock of assets)","g-mon-what"]]}
 ]
};

GUIDE.sections.splice(GUIDE.sections.length - 1, 0, {h:"Money and the Liquidity Preference Model", tp:"money", items:[
 {id:"g-mon-what", t:"What Money Is", a:"mon-what",
  short:"Money = anything generally accepted in payment and repayment of debt; it grew out of barter (Menger) and ends the double coincidence of wants. Four attributes: divisible, durable, scarce, transportable. Four functions: medium of exchange (most important), unit of account, store of value, standard of deferred payment. Commodity (intrinsic value) vs fiat.",
  subs:[["Barter and Menger","mon-barter"],["Four attributes","mon-attr"],["Four functions","mon-func"],["Commodity and fiat","mon-kinds"]]},
 {id:"g-mon-measure", t:"Measuring the Money Supply", a:"mon-measure",
  short:"Currency; monetary base = currency + reserves; M1 = currency + checking + savings (since Feb 2021); M2 = M1 + small CDs + retail money market funds. M1 has no reserves; the base has no deposits.",
  subs:[["The four measures","mon-m"]]},
 {id:"g-mon-lp", t:"Money Demand and the Liquidity Preference Model", a:"mon-lp",
  short:"Nominal rate, short run. MS vertical (Fed); MD slopes down (opportunity cost). Reasons to hold money: transactions, precaution, speculation. MD shifters: income, price level, preferences, policy. Income up: n up, Q same. MS up: n down, Q up.",
  subs:[["Money demand","mon-demand"],["The model","mon-model"],["The shifts","mon-shifts"]]},
 {id:"g-mon-effects", t:"More Money: Short Run Down, Long Run Up", a:"mon-effects",
  short:"Liquidity effect: n falls in the short run. Income, price level and expected inflation effects: n rises in the long run.",
  subs:[["The four effects","mon-four"]]}]});

QB = QB.concat([
 {tp:"money",sec:"g-mon-what",t:"mc",q:"A double coincidence of wants occurs when:",a:"two people each have a good or service that the other wants",w:["two people both want to hold money instead of goods","a buyer and seller agree on the price and on the currency","two goods are wanted by everyone in an economy at once"],e:"The accountant must want the haircut and the barber must want accounting. It rarely happens, which is why barter is costly."},
 {tp:"money",sec:"g-mon-what",t:"mc",q:"According to Carl Menger, money:",a:"emerges spontaneously out of barter as the most salable goods become media of exchange",w:["must be created and declared legal tender by a government before it can exist","was invented by banks so that they could lend and earn interest","appears only once an economy has a central bank to issue it"],e:"A “horse race” among goods; government could be involved but isn’t needed."},
 {tp:"money",sec:"g-mon-what",t:"mc",q:"Money is best defined as:",a:"anything generally accepted in payment for goods and services and in the repayment of debt",w:["the total value of a person’s assets minus their debts","the income a person earns over a period of time","only the paper currency and coins issued by a government"],e:"His definition. Money is not wealth (a stock of assets) and not income (payment through time)."},
 {tp:"money",sec:"g-mon-what",t:"mc",q:"Which is NOT one of the four attributes of good money?",a:"Intrinsic value",w:["Divisible","Durable","Transportable"],e:"The four are divisible, durable, scarce and transportable. Intrinsic value is what makes money commodity money; fiat money has none."},
 {tp:"money",sec:"g-mon-what",t:"mc",q:"Which function of money did the lecture call the most important?",a:"Medium of exchange",w:["Unit of account","Store of value","Standard of deferred payment"],e:"“If something is not a medium of exchange we won’t call it money.”"},
 {tp:"money",sec:"g-mon-what",t:"mc",q:"Posting prices as $5 and $3 so buyers can compare them instantly shows money working as a:",a:"unit of account",w:["medium of exchange","store of value","standard of deferred payment"],e:"The unit of account is how prices are posted and debts recorded."},
 {tp:"money",sec:"g-mon-what",t:"mc",q:"A mortgage payment due next year must be paid in dollars, not in marbles. That is money as a:",a:"standard of deferred payment",w:["unit of account","medium of exchange","store of value"],e:"Future payments are expected in money."},
 {tp:"money",sec:"g-mon-what",ap:true,t:"mc",q:"In WWII prisoner-of-war camps, cigarettes from Red Cross packages became money. They were:",a:"commodity money, because they had value apart from being money",w:["fiat money, because the guards declared them legal tender","fiat money, because they had no intrinsic value","not money, because a government did not issue them"],e:"They could be smoked: intrinsic value, so commodity money. And general acceptance, not government, made them money."},
 {tp:"money",sec:"g-mon-what",ap:true,t:"mc",q:"Bread could in principle be money, but it fails as good money mainly because it is not:",a:"durable",w:["divisible","transportable","a medium of exchange by law"],e:"It goes stale and moldy in days. Metals pass the durability test."},
 {tp:"money",sec:"g-mon-what",t:"tf",q:"The U.S. dollar is fiat money: it has value only because it is generally accepted and taxes and debts to the government must be paid in it.",a:true,e:"True. The paper and ink are nearly worthless; if everyone stopped accepting it, it would be worthless."},
 {tp:"money",sec:"g-mon-what",t:"tf",q:"Money and wealth are the same thing.",a:false,e:"False. Wealth is your stock of assets (a house, stocks); income is payment through time; money is the intermediary in exchange. He stressed not using them interchangeably."},

 {tp:"money",sec:"g-mon-measure",t:"mc",q:"The monetary base is:",a:"currency plus bank reserves",w:["currency plus checking and savings accounts","M1 plus small time deposits","currency only"],e:"Currency + reserves. Don’t confuse it with M1."},
 {tp:"money",sec:"g-mon-measure",t:"mc",q:"M1 includes:",a:"currency, checking deposits and savings accounts",w:["currency and bank reserves","currency, checking deposits and bank reserves","small CDs and retail money market funds"],e:"Savings accounts were added in February 2021. M1 has no bank reserves."},
 {tp:"money",sec:"g-mon-measure",t:"mc",q:"M2 equals:",a:"M1 plus small time deposits and retail money market funds",w:["M1 plus bank reserves","the monetary base plus checking deposits","currency plus all government bonds"],e:"Small time deposits are CDs under $100,000."},
 {tp:"money",sec:"g-mon-measure",t:"mc",q:"What do M1 and the monetary base have in common?",a:"Only currency",w:["Currency and bank reserves","Currency and checking deposits","Nothing at all"],e:"The base adds reserves; M1 adds checking and savings deposits. “Please don’t confuse M1 and the monetary base.”"},
 {tp:"money",sec:"g-mon-measure",ap:true,t:"mc",q:"A bank adds $1 million to its reserves at the Fed, with nothing else changing. Which measure goes up?",a:"The monetary base",w:["M1","M2","All three: the base, M1 and M2"],e:"Reserves are in the monetary base but not in M1 or M2."},
 {tp:"money",sec:"g-mon-measure",t:"mc",q:"In February 2021 the Fed changed M1 by:",a:"adding savings accounts",w:["removing checking accounts","adding bank reserves","adding retail money market funds"],e:"Savings accounts moved into M1 (reported weekly in the H.6)."},
 {tp:"money",sec:"g-mon-measure",t:"tf",q:"The money supply is just the currency in circulation.",a:false,e:"False. He stressed it: the money supply is a group of safe assets — the base, M1 and M2 go well beyond currency."},

 {tp:"money",sec:"g-mon-lp",t:"mc",q:"The liquidity preference model determines:",a:"a representative nominal interest rate in the short run",w:["a representative real interest rate in the long run","the federal funds rate in an abundant reserve regime","the long-run growth rate of real GDP"],e:"Loanable funds is real and long run; liquidity preference is nominal and short run."},
 {tp:"money",sec:"g-mon-lp",t:"mc",q:"In the liquidity preference model, the money supply curve is:",a:"vertical, because the central bank controls the amount",w:["upward sloping, because higher rates raise saving","downward sloping, because of the opportunity cost of money","horizontal, at the rate the central bank sets"],e:"Perfectly inelastic: the Fed sets the quantity."},
 {tp:"money",sec:"g-mon-lp",t:"mc",q:"Money demand slopes down because a higher nominal interest rate:",a:"raises the opportunity cost of holding money",w:["raises the amount of money the Fed supplies","lowers the price level","makes bonds less attractive to hold"],e:"You give up more bond interest by holding money, so you hold less — a move along the curve."},
 {tp:"money",sec:"g-mon-lp",t:"mc",q:"Which are the three reasons people hold money?",a:"Transactions, precaution and speculation",w:["Saving, investment and consumption","Income, prices and preferences","Divisibility, durability and scarcity"],e:"Paying rent and groceries, a leaky pipe, and waiting to buy a stock when it dips."},
 {tp:"money",sec:"g-mon-lp",m:1,ap:true,t:"mc",q:"Incomes rise across the economy. In the liquidity preference model:",a:"money demand shifts right: the nominal rate rises and the quantity of money is unchanged",w:["money supply shifts right: the nominal rate falls and the quantity of money rises","money demand shifts right: the nominal rate rises and the quantity of money rises","money demand shifts left: the nominal rate falls and the quantity of money is unchanged"],e:"With a vertical money supply, only the rate moves when demand shifts."},
 {tp:"money",sec:"g-mon-lp",m:1,ap:true,t:"mc",q:"The Fed increases the money supply. In the liquidity preference model:",a:"the nominal rate falls and the quantity of money rises",w:["the nominal rate rises and the quantity of money rises","the nominal rate falls and the quantity of money is unchanged","the real rate falls and the quantity of loanable funds rises"],e:"MS shifts right along the money demand curve: point A to B."},
 {tp:"money",sec:"g-mon-lp",m:1,ap:true,t:"mc",q:"The aggregate price level rises, holding consumption constant. In the liquidity preference model:",a:"money demand shifts right and the nominal rate rises",w:["money supply shifts left and the nominal rate rises","money demand shifts left and the nominal rate falls","nothing changes, since prices are not in the model"],e:"More money is needed “just to keep consumption constant.”"},
 {tp:"money",sec:"g-mon-lp",ap:true,t:"mc",q:"Bitcoin becomes a generally accepted substitute for money. In the liquidity preference model, the money supply:",a:"shifts right, lowering the nominal rate",w:["shifts left, raising the nominal rate","does not change, since only the Fed can shift it","becomes upward sloping"],e:"More money substitutes shift money supply right, his own example."},
 {tp:"money",sec:"g-mon-lp",t:"mc",q:"What did he call the biggest mistake students make in this section?",a:"Combining or confusing the loanable funds and liquidity preference models",w:["Drawing the money supply curve upward sloping","Forgetting that money demand has four shifters","Using the real rate for loanable funds"],e:"Keep them apart: real, long run, saving and investment vs nominal, short run, money supply and demand."},
 {tp:"money",sec:"g-mon-lp",t:"tf",q:"In the liquidity preference model, the vertical axis is the real interest rate.",a:false,e:"False. It is the nominal interest rate; the horizontal axis is the quantity of money. The real rate is loanable funds."},
 {tp:"money",sec:"g-mon-lp",t:"tf",q:"A rise in money demand, with the money supply unchanged, raises the nominal interest rate but leaves the quantity of money the same.",a:true,e:"True — the money supply line is vertical, so only the rate moves."},

 {tp:"money",sec:"g-mon-effects",t:"mc",q:"When the money supply increases, nominal interest rates:",a:"fall in the short run and rise in the long run",w:["rise in the short run and fall in the long run","fall in both the short run and the long run","rise in both the short run and the long run"],e:"Liquidity effect first; then income, price level and expected inflation effects push it up."},
 {tp:"money",sec:"g-mon-effects",t:"mc",q:"The liquidity effect, from Milton Friedman, says that more money:",a:"lowers the nominal interest rate in the short run",w:["raises the nominal interest rate in the long run","raises incomes and so money demand","raises expected inflation"],e:"It is the graph: MS shifts right, n falls. Each unit of money is worth less (“if the number of apples doubled…”)."},
 {tp:"money",sec:"g-mon-effects",t:"mc",q:"Which is NOT one of the effects that raise nominal rates in the long run after the money supply increases?",a:"The liquidity effect",w:["The income effect","The price level effect","The expected inflation effect"],e:"The liquidity effect is the short-run one that lowers the rate."},
 {tp:"money",sec:"g-mon-effects",t:"mc",q:"The expected inflation effect works through:",a:"the Fisher identity: if expected inflation rises, lenders demand a higher nominal rate to keep the real rate",w:["the quantity theory: more money raises prices, so the price level rises","the income effect: more money raises incomes, so money demand rises","the liquidity effect: more money makes each unit of money worth less"],e:"r = n − πᵉ. A bank making home loans or a saver for retirement wants n to rise with πᵉ."},
 {tp:"money",sec:"g-mon-effects",ap:true,t:"mc",q:"After the money supply rises, prices climb over time, so people need more money to buy the same things. This is the:",a:"price level effect, which raises the nominal rate",w:["liquidity effect, which lowers the nominal rate","income effect, which lowers the nominal rate","expected inflation effect, which lowers the real rate"],e:"Higher prices shift money demand right “just to keep consumption constant.”"},
 {tp:"money",sec:"g-mon-effects",ap:true,t:"mc",q:"More money stimulates the economy and incomes rise, so households demand more money. This is the:",a:"income effect",w:["liquidity effect","price level effect","expected inflation effect"],e:"Higher income shifts money demand right, raising n in the long run."},
 {tp:"money",sec:"g-mon-effects",t:"tf",q:"Increasing the money supply always lowers nominal interest rates.",a:false,e:"False. Only in the short run (the liquidity effect). In the long run the income, price level and expected inflation effects raise them."},
 {tp:"money",sec:"g-mon-effects",t:"tf",q:"Three of the four effects of a bigger money supply push nominal interest rates up in the long run.",a:true,e:"True: income, price level and expected inflation. Only the liquidity effect pushes the rate down, and only in the short run."}
]);

var LP_SHOCKS = [
 ["Incomes rise across the economy.", 0, "Higher income raises money demand."],
 ["The aggregate price level rises, and households want to keep their consumption the same.", 0, "Higher prices raise money demand."],
 ["Households grow wary of stocks and bonds and prefer to keep more money on hand.", 0, "Preferences shift toward money: money demand rises."],
 ["A recession lowers incomes.", 1, "Lower income lowers money demand."],
 ["The aggregate price level falls.", 1, "Lower prices mean less money is needed: money demand falls."],
 ["The Federal Reserve increases the money supply.", 2, "The central bank moves the vertical money supply to the right."],
 ["A digital currency becomes generally accepted as a substitute for money.", 2, "More money substitutes shift the money supply right."],
 ["The Federal Reserve decreases the money supply.", 3, "The central bank moves the vertical money supply to the left."]];
var LP_OUTCOMES = ["Money demand shifts right: the nominal rate rises, the quantity of money is unchanged", "Money demand shifts left: the nominal rate falls, the quantity of money is unchanged", "Money supply shifts right: the nominal rate falls, the quantity of money rises", "Money supply shifts left: the nominal rate rises, the quantity of money falls"];
GENS.push({id:"lp-shift", topic:"interest", name:"Liquidity preference: which curve shifts?",
 remind:"Money supply is vertical: a demand shift moves only the rate. A supply shift moves the rate the opposite way and moves the quantity.",
 make:function(){
  var s = rp(LP_SHOCKS);
  return {vals:{}, text:s[0], choice:{q:"What happens in the liquidity preference model?", opts:LP_OUTCOMES.slice(), right:s[1], work:s[2] + " " + LP_OUTCOMES[s[1]] + "."}};
 }});
GEN_BY_ID["lp-shift"] = GENS[GENS.length - 1];
