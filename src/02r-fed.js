/* ================================================================ the Federal Reserve and monetary policy (Unit 2)
   Lectures, Oct 20, 22, 27: "The Federal Reserve and Monetary Policy" Parts I–III
   (37:52, 54:54, 53:49). Mandate, structure and functions; the six tools; the
   market for reserves (scarce and abundant); difficulties; rules vs discretion.
   Recorded several years ago: names and frameworks are "at recording".     */

/* the market for reserves: scarce (supply meets the sloped part) or abundant (supply on the flat part) */
function rsvGraph(caption, abundant){
  var L = 46, R = 262, T = 18, B = 188, yDR = 52, yI = 92, yRP = 128;
  function ln(x1, y1, x2, y2, cls){ return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="' + cls + '"/>'; }
  function tx(x, y, s, cls, a){ return '<text x="' + x + '" y="' + y + '" class="' + cls + '"' + (a ? ' text-anchor="' + a + '"' : '') + '>' + s + '</text>'; }
  var svg = ln(L, T, L, B, "ax") + ln(L, B, R + 4, B, "ax");
  /* demand: slopes down to the IORB level, flat there (banks paid IOR); a lower flat line at the reverse-repo rate */
  svg += ln(62, 30, 150, yI, "cv") + ln(150, yI, R - 4, yI, "cv") + tx(R - 4, yI - 5, "D (IORB)", "cl sm", "end");
  svg += '<rect x="150" y="' + yI + '" width="' + (R - 154) + '" height="' + (yRP - yI) + '" class="band"/>';
  svg += ln(150, yRP, R - 4, yRP, "cv dash") + tx(R - 4, yRP + 13, "IRRP floor", "cl sm", "end");
  /* supply: vertical non-borrowed reserves, then flat at the discount rate */
  var xs = abundant ? 205 : 105, ys = abundant ? yI : 30 + (xs - 62) * (yI - 30) / (150 - 62);
  svg += ln(xs, B, xs, yDR, "cv new") + ln(xs, yDR, R - 4, yDR, "cv new") + tx(xs + 4, yDR - 5, "S · discount rate", "cl new sm");
  svg += ln(L, ys, xs, ys, "drop old") + '<circle cx="' + xs + '" cy="' + ys + '" r="3.2" class="dot old"/>' + tx(L - 5, ys + 4, "FFR", "lab old", "end");
  svg += tx(L - 5, yI + 4, abundant ? "" : "", "lab", "end");
  svg += tx(L - 30, (T + B) / 2, "Federal funds rate", "axl", "middle").replace('<text', '<text transform="rotate(-90 ' + (L - 30) + ' ' + ((T + B) / 2) + ')"');
  svg += tx((L + R) / 2, B + 26, "Quantity of reserves", "axl", "middle");
  return '<figure class="lfg"><svg viewBox="0 0 280 222" role="img" aria-label="' + strip(caption) + '">' + svg + '</svg><figcaption>' + caption + '</figcaption></figure>';
}

CH.fed = {n:10, title:"The Federal Reserve and Monetary Policy", short:"The Fed",
 notes:[
  {id:"fed-mandate", h:"Monetary Policy and the Dual Mandate", body:
   '<div class="point"><b>The point</b><p>A <b>central bank</b> oversees the banking system and conducts <b>monetary policy</b> &mdash; it is <b>not a commercial bank</b>; it is &ldquo;the bankers&rsquo; bank.&rdquo; Congress (1977) gave the Fed a <b>dual mandate</b>: <b>stable prices</b> and <b>maximum employment</b> (plus moderate long-term rates). <b>Expansionary</b> policy lowers rates and raises money; <b>contractionary</b> does the opposite.</p><p class="able"><b>Be able to</b> define both kinds of policy, state the 2% PCE target and why 2%, explain the 2020 framework and its three problems, and pick the policy when the goals agree or conflict.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 20 &middot; Problem Set 9</span></p>'+
   '<h3 class="sub" id="fed-policy">Expansionary and contractionary</h3>'+
   '<ul><li><b>Monetary policy:</b> &ldquo;the actions of central banks to achieve their macroeconomic policy objectives.&rdquo;</li>'+
   '<li><b>Expansionary:</b> <b>lower interest rates, increase the money supply</b> to stimulate growth and employment. Side effect: a higher price level.</li>'+
   '<li><b>Contractionary:</b> <b>raise interest rates, decrease the money supply</b> (usually just slow its growth, e.g. 5% &rarr; 3%) to slow the economy and lower inflation.</li>'+
   '<li>The Fed targets the <b>federal funds rate</b> and sets the <b>discount rate</b> &mdash; both <b>nominal</b>.</li></ul>'+
   '<h3 class="sub" id="fed-dual">The dual mandate (really three parts)</h3>'+
   '<ol><li><b>Stable prices</b> &mdash; since <b>2012</b>, <b>2% inflation a year on the PCE index</b>. Why 2%: higher would hurt long-term decisions; lower risks <b>deflation</b>.</li>'+
   '<li><b>Maximum employment</b> &mdash; no number; the Fed estimates a <b>long-run normal unemployment rate</b>, the one consistent with stable inflation.</li>'+
   '<li><b>Moderate long-term interest rates</b> &mdash; assumed to follow if 1 and 2 are met, so it&rsquo;s called a <i>dual</i> mandate.</li></ol>'+
   '<ul><li><b>August 2020: flexible average inflation targeting</b> &mdash; an <b>average</b> of 2% over time; <b>asymmetric</b> (after undershooting, run &ldquo;moderately above 2%&rdquo;).</li>'+
   '<li><b>His three problems with it:</b> (1) <b>vague</b> &mdash; how long, how far above? (2) <b>expectations</b> of higher inflation become hard to undo; (3) <b>asymmetric</b> &mdash; biases policy toward inflation.</li>'+
   '<li>&#9888; The video is a few years old. The module pairs the 2020 statement with a newer one; for anything &ldquo;current,&rdquo; go by the newer statement.</li></ul>'+
   '<h3 class="sub" id="fed-conflict">When the goals agree, and when they conflict</h3>'+
   '<div class="tblwrap"><table class="tbl fit c3"><thead><tr><th>Inflation</th><th>Unemployment</th><th>Policy</th></tr></thead><tbody>'+
   '<tr><td class="head">Below 2%</td><td class="sm">Above normal</td><td class="sm"><b>Expansionary</b> fixes both</td></tr>'+
   '<tr><td class="head">Above 2%</td><td class="sm">Below normal</td><td class="sm"><b>Contractionary</b> fixes both</td></tr>'+
   '<tr><td class="head">Below 2%</td><td class="sm">Below normal</td><td class="sm">Conflict &mdash; balanced approach</td></tr>'+
   '<tr><td class="head">Above 2%</td><td class="sm">Above normal</td><td class="sm">Conflict &mdash; balanced approach</td></tr></tbody></table></div>'+
   '<p><b>Balanced approach:</b> prioritize whichever goal is <b>farther from its objective</b>.</p>'},

  {id:"fed-struct", h:"Structure, Independence and the Five Functions", body:
   '<div class="point"><b>The point</b><p>The Fed (founded <b>1913</b>) is a <b>system of 12 regional banks</b>, a <b>Board of Governors</b> (7, 14-year terms) and the <b>FOMC</b> (12 voters: 7 governors + 5 bank presidents). Congress created it and could change it, but lets it act <b>independently for credibility</b>. It has <b>five functions</b>.</p><p class="able"><b>Be able to</b> give the numbers (12, 7, 14, 12 = 7 + 5, 8 meetings, 4-year chair), the case for and against independence, and the five functions.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 20 &middot; &ldquo;know these&rdquo;</span></p>'+
   '<h3 class="sub" id="fed-parts">The parts</h3>'+
   '<ul><li><b>12 regional Federal Reserve Banks</b>: each tracks its district&rsquo;s economy, holds its banks&rsquo; reserves, and regulates them.</li>'+
   '<li><b>Board of Governors</b>: <b>7</b> members, nominated by the President, confirmed by the Senate; <b>14-year</b> staggered terms (one ends <b>January 31 of each even year</b>); no reappointment after a full term, so at most just under <b>28 years</b>. <b>Two policy roles:</b> set the <b>discount rate</b> and the <b>interest rate on reserves</b>.</li>'+
   '<li><b>FOMC</b>: <b>12 voters = 7 governors + 5 presidents</b>; the <b>New York Fed president always votes</b>, four others rotate yearly. Runs <b>open market operations</b>. <b>8</b> two-day meetings a year; a statement at the end, minutes weeks later.</li>'+
   '<li><b>Chair</b>: 4-year term, nominated and confirmed. At recording, Jerome Powell (2018), after Janet Yellen.</li></ul>'+
   '<h3 class="sub" id="fed-indep">Who controls the Fed, and independence</h3>'+
   '<ul><li>Congress created it and can amend the Federal Reserve Act; the President nominates, the Senate confirms.</li>'+
   '<li><b>Central bank independence:</b> a separation, often by statute, between what politicians want and the central bank&rsquo;s decisions. Without it, no one can tell economic from political motives, and <b>credibility</b> erodes (Turkey under Erdo&#287;an).</li>'+
   '<li><b>Two arguments against:</b> (1) such powerful officials should be <b>accountable to voters</b>; (2) the Fed has made damaging mistakes &mdash; the <b>Great Depression</b>, the <b>Great Inflation</b> (late 1960s&ndash;early 1980s), arguably the <b>Great Recession</b>.</li></ul>'+
   '<h3 class="sub" id="fed-five">The five functions</h3>'+
   '<ol><li><b>Conduct monetary policy.</b></li>'+
   '<li><b>Promote the stability of the financial system.</b></li>'+
   '<li><b>Promote the solvency of individual institutions</b> &mdash; solvency is the ability to meet long-term debts; watch <b>leveraging</b> (buying assets with debt, not equity).</li>'+
   '<li><b>Foster payments and settlements</b> &mdash; issue currency, clear checks, run the larger of the two <b>ACH</b> networks.</li>'+
   '<li><b>Promote consumer protection and community development</b> &mdash; from the <b>2010 Dodd-Frank Act</b>.</li></ol>'},

  {id:"fed-tools", h:"The Six Tools of Monetary Policy", body:
   '<div class="point"><b>The point</b><p>The Fed&rsquo;s tools are <b>nominal</b>: it &ldquo;cannot directly change real variables like output and employment.&rdquo; It works through the <b>transmission mechanism</b>. For each of the <b>six tools</b>, know the expansionary move, whether it works on <b>supply or demand</b>, and <b>which rate</b> it targets.</p><p class="able"><b>Be able to</b> fill in the six-tool table, tell the fed funds rate from the discount rate, and explain QE, forward guidance, IOR and reverse repos.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 22 &middot; Problem Set 10</span></p>'+
   '<h3 class="sub" id="fed-trans">The transmission mechanism</h3>'+
   '<ol><li>The Fed sets a <b>target range</b> for the federal funds rate.</li><li><b>Short-term rates</b> change (fed funds is overnight).</li><li><b>Expectations and other rates</b> change &mdash; long rates follow short ones, not one-for-one.</li><li><b>Households and firms</b> change borrowing, buying and investing.</li><li>Progress on <b>maximum employment and stable prices</b>.</li></ol>'+
   '<h3 class="sub" id="fed-six">The six tools</h3>'+
   '<div class="tblwrap"><table class="tbl fit c4"><thead><tr><th>Tool</th><th>Expansionary</th><th>Works on</th><th>Rate</th></tr></thead><tbody>'+
   '<tr><td class="head">1. Open market operations</td><td class="sm"><b>Buy</b> short-term Treasuries</td><td class="sm">Supply of reserves (money base)</td><td class="sm">Fed funds</td></tr>'+
   '<tr><td class="head">2. Discount rate</td><td class="sm"><b>Lower</b> it</td><td class="sm">Borrowing from the Fed</td><td class="sm">&asymp; top of fed funds + 0.5</td></tr>'+
   '<tr><td class="head">3. QE / QT</td><td class="sm"><b>QE</b>: buy long-term Treasuries and MBS</td><td class="sm">Supply; asset prices</td><td class="sm">Long-term rates</td></tr>'+
   '<tr><td class="head">4. Forward guidance</td><td class="sm">Signal <b>lower</b> future rates</td><td class="sm">Expectations</td><td class="sm">Expected path</td></tr>'+
   '<tr><td class="head">5. Interest on reserves</td><td class="sm"><b>Lower</b> IOR</td><td class="sm"><b>Demand</b> for reserves</td><td class="sm"><b>Ceiling</b> of the range</td></tr>'+
   '<tr><td class="head">6. Reverse repos</td><td class="sm"><b>Lower</b> the rate</td><td class="sm">Reserves, overnight</td><td class="sm"><b>Floor</b> of the range</td></tr></tbody></table></div>'+
   '<ul><li><b>OMO:</b> &ldquo;buying and selling Treasury bonds and notes&rdquo; with about two dozen big firms. <b>Fed BUYS bonds &rarr; money UP</b> (paid with new reserves); <b>SELLS &rarr; money DOWN</b>. The main tool when reserves were <b>scarce</b>.</li>'+
   '<li><b>Federal funds rate:</b> the rate on <b>bank-to-bank</b> overnight loans of reserves; since 2008 a <b>target range</b>. The Fed &ldquo;cannot just make up whatever interest rate they want&rdquo; &mdash; it must intervene.</li>'+
   '<li><b>Discount rate:</b> the rate on loans of reserves <b>from the Fed to banks</b> &mdash; the Fed as <b>lender of last resort</b> (the 1913 idea). Kept about <b>0.5 above</b> the top of the fed funds range.</li>'+
   '<li><b>QE:</b> buying <b>longer-term</b> securities of the government or <b>GSEs</b> (Fannie Mae, Freddie Mac, the Farm Credit System &mdash; chartered by Congress, <b>not</b> backed by its full faith and credit). Mortgage-backed securities pool mortgages like gumballs in one machine. QE <b>raises asset prices</b> (a wealth effect) and moves risk onto the Fed&rsquo;s balance sheet. <b>QT</b> sells or lets them mature: lower prices, higher rates.</li>'+
   '<li><b>Forward guidance:</b> telling the public what the Fed intends, especially the future fed funds path, to shape expectations. (Greenspan was famously vague.)</li>'+
   '<li><b>Interest on reserves:</b> paid since <b>October 2008</b>; on <b>all</b> reserves since March 2020. &ldquo;<b>The Fed&rsquo;s new tool of choice</b>&rdquo; in an <b>abundant</b> reserve regime. It works on <b>demand</b> and sets the <b>ceiling</b>: no bank lends reserves for less than the Fed pays. GSEs can&rsquo;t earn IOR, so they lend below it (arbitrage).</li>'+
   '<li><b>Reverse repo:</b> the Fed sells a security and promises to buy it back the next day at a higher price &mdash; sets the <b>floor</b>.</li></ul>'},

  {id:"fed-reserves", h:"The Market for Reserves", body:
   '<div class="point"><b>The point</b><p>A supply and demand model of <b>reserves</b> and the <b>federal funds rate</b>. With <b>scarce</b> reserves, supply crosses the <b>sloped</b> part of demand, so <b>changing supply (OMO) moves the rate</b>. With <b>abundant</b> reserves, supply crosses the <b>flat</b> part, so <b>changing supply does not move the rate</b>; the Fed moves <b>demand</b> with <b>IOR (ceiling)</b> and <b>reverse repos (floor)</b>.</p><p class="able"><b>Be able to</b> draw both graphs and say what each tool does to the fed funds rate and the quantity of reserves in each regime.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 27 &middot; both graphs are on the Exam 2 and Final lists</span></p>'+
   '<h3 class="sub" id="fed-curves">The curves</h3>'+
   '<ul><li><b>Axes:</b> federal funds rate up the side, quantity of reserves along the bottom.</li>'+
   '<li><b>Demand</b>: slopes <b>down</b> (a lower rate lowers the opportunity cost of holding reserves), then goes <b>flat at IORB</b> (banks paid interest add reserves indefinitely), with a lower flat line at the <b>reverse repo rate</b> (institutions not paid IOR, like GSEs).</li>'+
   '<li><b>Supply</b>: <b>vertical</b> for non-borrowed reserves (set by OMO and QE/QT), then <b>flat at the discount rate</b> (borrowed reserves).</li>'+
   '<li>The Fed controls <b>total</b> reserves and the monetary base. One bank lending more just moves reserves to another bank.</li></ul>'+
   '<div class="lfgrid">'+
   rsvGraph("<b>Scarce reserves:</b> supply meets the sloped part. Shift supply (OMO) and the fed funds rate moves.", false)+
   rsvGraph("<b>Abundant reserves:</b> supply meets the flat part. The rate sits in the band between the IOR ceiling and the reverse-repo floor.", true)+
   '</div>'+
   '<h3 class="sub" id="fed-results">What each tool does</h3>'+
   '<div class="tblwrap"><table class="tbl fit c3"><thead><tr><th>Tool</th><th>Scarce</th><th>Abundant</th></tr></thead><tbody>'+
   '<tr><td class="head">Buy bonds (OMO), or QE</td><td class="sm">FFR <b>falls</b>, Q rises</td><td class="sm">FFR <b>unchanged</b>, Q rises</td></tr>'+
   '<tr><td class="head">Sell bonds (OMO), or QT</td><td class="sm">FFR <b>rises</b>, Q falls</td><td class="sm">FFR <b>unchanged</b>, Q falls</td></tr>'+
   '<tr><td class="head">Change the discount rate</td><td class="sm">No change</td><td class="sm">No change</td></tr>'+
   '<tr><td class="head">Raise IOR</td><td class="sm">No change</td><td class="sm">FFR <b>rises</b> (ceiling up)</td></tr>'+
   '<tr><td class="head">Raise the reverse-repo rate</td><td class="sm">No change</td><td class="sm">FFR <b>rises</b> (floor up)</td></tr></tbody></table></div>'+
   '<ul><li><b>Scarce:</b> only <b>supply</b> moves the rate. <b>Abundant:</b> only <b>demand</b> (IOR and reverse repos) moves it.</li>'+
   '<li>The discount rate never moves either, because it is kept <b>50 basis points</b> above the fed funds rate.</li>'+
   '<li>QE and QT look like OMO on the graph; the difference is <b>which securities</b> (long-term and GSE vs short-term bills). <b>Bond prices and interest rates move inversely.</b></li></ul>'},

  {id:"fed-limits", h:"Difficulties, and Rules versus Discretion", body:
   '<div class="point"><b>The point</b><p>Monetary policy has <b>three difficulties</b>: <b>knowledge and timing</b>, <b>incomplete control and lags</b>, and <b>real shocks</b>. So the Fed can <b>overshoot</b> or <b>undershoot</b>. Today central banks use <b>discretion</b>; the alternative is a <b>rule</b>, such as a <b>nominal GDP target</b>.</p><p class="able"><b>Be able to</b> name and explain the three difficulties with an example each, and give the case for discretion and the two for rules.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 27</span></p>'+
   '<h3 class="sub" id="fed-three">The three difficulties</h3>'+
   '<ol><li><b>Knowledge and timing:</b> the Fed acts in real time on projections; shocks like the <b>1998 Long-Term Capital Management</b> collapse or <b>COVID-19</b> (the Fed was leaning contractionary in early 2020, then reversed &ldquo;on the fly&rdquo;).</li>'+
   '<li><b>Incomplete control and lags:</b> it fully controls <b>currency, non-borrowed reserves and the monetary base</b> &mdash; <b>not M1 or M2</b> (banks may not lend). Other rates follow the fed funds rate with a lag; <b>forward guidance shortens the lag</b>.</li>'+
   '<li><b>Real shocks:</b> &ldquo;the Fed doesn&rsquo;t control productivity.&rdquo; Monetary policy works best when <b>spending</b> slows, less well when <b>productivity</b> falls.</li></ol>'+
   '<ul><li>After 2009, PCE inflation stayed <b>below 2%</b> most months: the Fed <b>undershot</b>.</li></ul>'+
   '<h3 class="sub" id="fed-rules">Rules versus discretion</h3>'+
   '<ul><li><b>Discretionary:</b> no firm commitment; act in the moment &mdash; how modern central banks work. Forward guidance is <b>not</b> a commitment. Best argument: <b>flexibility</b>.</li>'+
   '<li><b>Rules-based:</b> a policy known in advance, e.g. a <b>5% nominal GDP target</b> (below &rarr; expand, above &rarr; contract). Nominal, not real, because the Fed can&rsquo;t control productivity or &ldquo;how many babies people have.&rdquo;</li>'+
   '<li><b>Two arguments for rules:</b> <b>credibility</b> (people can plan) and <b>accountability</b> (consequences for missing).</li>'+
   '<li>Why discretion today: <b>no agreed-upon rule</b> yet; NGDP targeting is &ldquo;still a minor consensus.&rdquo;</li></ul>'}
 ],
 decks:[
  {id:"terms", label:"Key terms", cards:[
   ["Central bank","An institution that oversees the banking system and conducts monetary policy — the bankers’ bank","g-fed-mandate"],
   ["Monetary policy","The actions of central banks to achieve their macroeconomic policy objectives","g-fed-mandate"],
   ["Expansionary monetary policy","Lower interest rates and increase the money supply to stimulate the economy","g-fed-mandate"],
   ["Contractionary monetary policy","Raise interest rates and decrease (or slow) the money supply to slow the economy","g-fed-mandate"],
   ["Dual mandate","Stable prices and maximum employment (plus moderate long-term rates), 1977","g-fed-mandate"],
   ["Inflation target","2% a year on the PCE index, since 2012","g-fed-mandate"],
   ["Flexible average inflation targeting","August 2020: average 2% over time; after undershooting, run moderately above","g-fed-mandate"],
   ["Central bank independence","Separation between what politicians want and the central bank’s decisions — for credibility","g-fed-struct"],
   ["Solvency","The ability of a firm to meet its long-term debt obligations","g-fed-struct"],
   ["Leveraging","Using debt rather than equity to buy an asset","g-fed-struct"],
   ["Federal funds rate","The interest rate on overnight loans of reserves from one bank to another","g-fed-tools"],
   ["Discount rate","The interest rate on loans of reserves from the Fed to banks — lender of last resort","g-fed-tools"],
   ["Open market operations","Buying and selling Treasury bonds and notes to change the supply of reserves","g-fed-tools"],
   ["Quantitative easing","Buying longer-term government or GSE securities, like 30-year Treasuries and MBS","g-fed-tools"],
   ["Forward guidance","Telling the public what the Fed intends to do with policy","g-fed-tools"],
   ["Reverse repo","The Fed sells a security and buys it back the next day at a higher price — the floor","g-fed-tools"],
   ["Government-sponsored enterprise","Private company chartered by Congress, not backed by its full faith and credit — Fannie Mae","g-fed-tools"],
   ["Market for reserves","Supply and demand of reserves that sets the federal funds rate","g-fed-reserves"],
   ["Discretionary policy","No firm commitment — the central bank acts in the moment","g-fed-limits"],
   ["Rules-based policy","A specific policy known in advance, e.g. a nominal GDP target","g-fed-limits"]]},
  {id:"nums", label:"Numbers, lists and graphs", cards:[
   ["Year the Fed was founded","1913","g-fed-struct"],
   ["Regional Federal Reserve Banks","12","g-fed-struct"],
   ["Board of Governors","7 members, 14-year staggered terms","g-fed-struct"],
   ["FOMC voters","12 = 7 governors + 5 bank presidents (New York always votes)","g-fed-struct"],
   ["FOMC meetings a year","8 scheduled, two days each","g-fed-struct"],
   ["The Board’s two policy roles","Set the discount rate and the interest rate on reserves","g-fed-struct"],
   ["The five functions","Monetary policy · financial stability · solvency of institutions · payments and settlements · consumer protection and community development","g-fed-struct"],
   ["Two arguments against independence","Accountability to voters; the Fed’s past mistakes (Depression, Great Inflation, Great Recession)","g-fed-struct"],
   ["The six tools","OMO · discount rate · QE/QT · forward guidance · interest on reserves · reverse repos","g-fed-tools"],
   ["Fed buys bonds","Money supply up — expansionary","g-fed-tools"],
   ["Interest on reserves works on","The demand for reserves — the ceiling of the range","g-fed-tools"],
   ["Scarce reserves: what moves the rate","Changing supply (OMO)","g-fed-reserves"],
   ["Abundant reserves: what moves the rate","Changing demand — IOR (ceiling) and reverse repos (floor)","g-fed-reserves"],
   ["Discount rate on the graph","Never moves the rate or quantity — kept 50 basis points above","g-fed-reserves"],
   ["Three difficulties","Knowledge and timing · incomplete control and lags · real shocks","g-fed-limits"],
   ["Two arguments for rules","Credibility and accountability","g-fed-limits"]]}
 ]
};

GUIDE.sections.splice(GUIDE.sections.length - 1, 0, {h:"The Federal Reserve and Monetary Policy", tp:"fed", items:[
 {id:"g-fed-mandate", t:"Monetary Policy and the Dual Mandate", a:"fed-mandate",
  short:"Central bank ≠ commercial bank. Expansionary: lower rates, more money; contractionary: the reverse. Dual mandate (1977): stable prices (2% PCE since 2012) and maximum employment (+ moderate long rates). 2020 average inflation targeting: vague, expectations, asymmetric. Conflicts: prioritize the goal farther from target.",
  subs:[["Expansionary and contractionary","fed-policy"],["The dual mandate","fed-dual"],["When goals conflict","fed-conflict"]]},
 {id:"g-fed-struct", t:"Structure, Independence and the Five Functions", a:"fed-struct",
  short:"1913; 12 regional banks; Board of 7 (14-year terms; sets discount rate and IOR); FOMC 12 = 7 + 5, NY always votes, 8 meetings, runs OMO; chair 4 years. Independence for credibility; against: accountability and past mistakes. Five functions.",
  subs:[["The parts","fed-parts"],["Independence","fed-indep"],["The five functions","fed-five"]]},
 {id:"g-fed-tools", t:"The Six Tools of Monetary Policy", a:"fed-tools",
  short:"Transmission: FFR target → short rates → other rates and expectations → spending → the mandate. Tools: OMO (buy = expand), discount rate (Fed to banks, +0.5), QE/QT, forward guidance, IOR (demand; ceiling), reverse repos (floor).",
  subs:[["The transmission mechanism","fed-trans"],["The six tools","fed-six"]]},
 {id:"g-fed-reserves", t:"The Market for Reserves", a:"fed-reserves",
  short:"Demand slopes down then goes flat at IORB (and IRRP below); supply vertical then flat at the discount rate. Scarce: supply moves the FFR. Abundant: supply moves only quantity; IOR and reverse repos move the FFR. Discount rate: no change.",
  subs:[["The curves","fed-curves"],["What each tool does","fed-results"]]},
 {id:"g-fed-limits", t:"Difficulties, and Rules versus Discretion", a:"fed-limits",
  short:"Knowledge and timing (LTCM, COVID); incomplete control and lags (not M1/M2; forward guidance shortens lags); real shocks (productivity). Discretion = flexibility; rules (NGDP target) = credibility and accountability.",
  subs:[["The three difficulties","fed-three"],["Rules versus discretion","fed-rules"]]}]});

QB = QB.concat([
 {tp:"fed",sec:"g-fed-mandate",t:"mc",q:"How does a central bank differ from a commercial bank?",a:"It oversees the banking system and conducts monetary policy, rather than serving households and businesses",w:["It takes deposits from households and lends to businesses at a profit","It is a private bank that competes with Bank of America and Wells Fargo","It only prints currency and has no role in the banking system"],e:"It is “the bankers’ bank.” A common mistake is to think of the Fed as a normal commercial bank."},
 {tp:"fed",sec:"g-fed-mandate",t:"mc",q:"Expansionary monetary policy means the central bank:",a:"lowers interest rates and increases the money supply",w:["raises interest rates and decreases the money supply","raises taxes and cuts government spending","lowers interest rates and decreases the money supply"],e:"To raise growth and employment, with a higher price level as a side effect."},
 {tp:"fed",sec:"g-fed-mandate",t:"mc",q:"Since 2012 the Fed’s price-stability goal has been:",a:"2% inflation a year, measured by the PCE price index",w:["0% inflation a year, measured by the CPI","2% inflation a year, measured by the CPI","between 3% and 5% inflation, measured by the GDP deflator"],e:"The personal consumption expenditures index, year over year."},
 {tp:"fed",sec:"g-fed-mandate",t:"mc",q:"Why did the Fed choose 2% rather than 0%?",a:"A lower rate would raise the chance of falling into deflation",w:["A lower rate would make the dollar too valuable abroad","Zero inflation is impossible to measure","Congress required exactly 2% in 1913"],e:"Higher would hurt long-term decisions; lower would risk deflation — prices, perhaps wages, falling."},
 {tp:"fed",sec:"g-fed-mandate",t:"mc",q:"Which is NOT one of his three problems with the 2020 flexible average inflation targeting framework?",a:"It forbids the Fed from ever letting inflation exceed 2%",w:["It is vague about how far and how long inflation may exceed 2%","It raises expectations of future inflation","It is asymmetric, dealing only with undershooting"],e:"It does the opposite: after undershooting it lets inflation run moderately above 2%."},
 {tp:"fed",sec:"g-fed-mandate",m:1,ap:true,t:"mc",q:"Inflation is 1.2% and unemployment is well above its long-run normal level. The Fed should use:",a:"expansionary policy, which moves both goals the right way",w:["contractionary policy, which moves both goals the right way","a balanced approach, since the goals conflict","no policy, since inflation is positive"],e:"Low inflation and high unemployment are complementary: expansion raises inflation and lowers unemployment."},
 {tp:"fed",sec:"g-fed-mandate",m:1,ap:true,t:"mc",q:"Inflation is 4% and unemployment is also above its long-run normal level. What does the Fed do?",a:"The goals conflict, so it prioritizes whichever is farther from its objective",w:["Expansionary policy, which fixes both problems at once","Contractionary policy, which fixes both problems at once","Nothing, since the dual mandate forbids acting when goals conflict"],e:"Contraction helps inflation but worsens unemployment — a balanced approach."},
 {tp:"fed",sec:"g-fed-mandate",t:"mc",q:"The “dual” mandate actually has three parts. The third, which the Fed rarely mentions, is:",a:"moderate long-term interest rates",w:["a balanced federal budget","a stable exchange rate for the dollar","zero unemployment"],e:"The Fed believes it follows automatically if stable prices and maximum employment are met."},
 {tp:"fed",sec:"g-fed-mandate",t:"tf",q:"Contractionary policy usually means the Fed slows the growth of the money supply rather than shrinking it outright.",a:true,e:"True — e.g. from 5% a year to 3%. An outright fall has happened (early in 2007–09) but is unusual."},
 {tp:"fed",sec:"g-fed-mandate",t:"tf",q:"Maximum employment has a specific numerical target set by Congress.",a:false,e:"False. There is no number; the Fed estimates a long-run normal unemployment rate consistent with stable inflation."},

 {tp:"fed",sec:"g-fed-struct",t:"mc",q:"The Federal Reserve is best described as:",a:"a system of 12 regional Federal Reserve Banks with a Board of Governors, founded in 1913",w:["a single bank in Washington, founded in 1977","a department of the U.S. Treasury, founded in 1913","a commercial bank owned by the largest private banks"],e:"12 regional banks (with an East Coast bias on the map)."},
 {tp:"fed",sec:"g-fed-struct",t:"mc",q:"The Board of Governors has:",a:"7 members serving staggered 14-year terms",w:["12 members serving 4-year terms","5 members serving life terms","7 members serving 4-year terms"],e:"Nominated by the President, confirmed by the Senate; one term ends January 31 of each even year."},
 {tp:"fed",sec:"g-fed-struct",t:"mc",q:"The FOMC’s 12 voting members are:",a:"the 7 governors plus 5 regional bank presidents, with New York always voting",w:["the presidents of all 12 regional banks","the 7 governors plus 5 members of Congress","12 governors appointed by the President"],e:"Four seats rotate yearly among the other 11 presidents."},
 {tp:"fed",sec:"g-fed-struct",t:"mc",q:"The Board of Governors’ two monetary policy roles are:",a:"setting the discount rate and the interest rate on reserves",w:["running open market operations and setting tax rates","printing currency and setting the federal funds rate by decree","setting the inflation target and the unemployment target"],e:"Open market operations belong to the FOMC."},
 {tp:"fed",sec:"g-fed-struct",t:"mc",q:"Why do Congress and the President let the Fed operate independently?",a:"For credibility: without it, people can’t tell economic decisions from political ones",w:["Because the Constitution forbids Congress from changing the Fed","Because the Fed is owned by private banks","Because independence guarantees the Fed never makes mistakes"],e:"Turkey under Erdoğan shows how interference erodes trust."},
 {tp:"fed",sec:"g-fed-struct",t:"mc",q:"Which is one of the arguments AGAINST an independent Fed?",a:"The Fed has made damaging mistakes, like the Great Depression and the Great Inflation",w:["An independent Fed always lets inflation run too low","Independence makes the Fed’s decisions easier to predict","The Fed has never been accountable to Congress in any way"],e:"The other: such powerful officials should be accountable to voters."},
 {tp:"fed",sec:"g-fed-struct",t:"mc",q:"Which is NOT one of the Fed’s five functions?",a:"Set income tax rates",w:["Promote the stability of the financial system","Foster payments and settlements","Promote consumer protection and community development"],e:"The five: monetary policy, financial stability, solvency of institutions, payments and settlements, consumer protection and community development."},
 {tp:"fed",sec:"g-fed-struct",ap:true,t:"mc",q:"The Fed limits how much a hedge fund can borrow to buy assets. This serves which function?",a:"Promoting the solvency of individual financial institutions",w:["Conducting monetary policy","Fostering payments and settlements","Promoting consumer protection and community development"],e:"Solvency is the ability to meet long-term debts; leveraging (debt, not equity) adds risk."},
 {tp:"fed",sec:"g-fed-struct",t:"mc",q:"The Fed’s consumer protection and community development function comes from:",a:"the 2010 Dodd-Frank Act",w:["the 1913 Federal Reserve Act","the 1977 amendment that set the dual mandate","the 2020 flexible average inflation targeting framework"],e:"Dodd-Frank Wall Street Reform and Consumer Protection Act."},
 {tp:"fed",sec:"g-fed-struct",t:"tf",q:"The FOMC holds 8 scheduled meetings a year and releases a statement at the end of each.",a:true,e:"True — two-day meetings; the minutes follow a few weeks later."},
 {tp:"fed",sec:"g-fed-struct",t:"tf",q:"A governor who serves a full 14-year term can be reappointed for another full term.",a:false,e:"False. No reappointment after a full term — but filling an unexpired term first allows just under 28 years."},

 {tp:"fed",sec:"g-fed-tools",t:"mc",q:"The federal funds rate is:",a:"the interest rate on overnight loans of reserves from one bank to another",w:["the interest rate on loans of reserves from the Fed to banks","the interest rate the Fed pays on reserves","the rate on 30-year Treasury bonds"],e:"Bank-to-bank. The discount rate is bank-to-Fed."},
 {tp:"fed",sec:"g-fed-tools",t:"mc",q:"The discount rate is:",a:"the interest rate on loans of reserves that the Fed makes to banks",w:["the interest rate banks charge each other overnight","the rate the Fed pays on reserve balances","the rate on reverse repurchase agreements"],e:"It makes the Fed the lender of last resort; kept about 0.5 above the top of the fed funds range."},
 {tp:"fed",sec:"g-fed-tools",m:1,ap:true,t:"mc",q:"The FOMC buys $10 billion of short-term Treasuries from banks. This is:",a:"an expansionary open market operation that adds reserves",w:["a contractionary open market operation that removes reserves","quantitative tightening","a change in the discount rate"],e:"Fed buys bonds → pays with new reserves → money supply up."},
 {tp:"fed",sec:"g-fed-tools",m:1,ap:true,t:"mc",q:"The Fed buys 30-year Treasuries and mortgage-backed securities. This is:",a:"quantitative easing",w:["an ordinary open market operation","quantitative tightening","forward guidance"],e:"QE extends expansionary OMO to long-term and GSE securities, raising their prices."},
 {tp:"fed",sec:"g-fed-tools",t:"mc",q:"Which two effects does quantitative easing have?",a:"Higher asset prices (a wealth effect) and risk moved onto the Fed’s balance sheet",w:["Lower asset prices and higher long-term interest rates","A higher reserve requirement and a lower discount rate","Higher taxes and lower government spending"],e:"Those are QE’s effects; lower asset prices and higher rates are QT’s."},
 {tp:"fed",sec:"g-fed-tools",t:"mc",q:"Which statement about government-sponsored enterprises (GSEs) is correct?",a:"They are chartered by Congress but not backed by the full faith and credit of the government",w:["They are federal agencies fully backed by the government’s power to tax","They earn interest on the reserves they hold at the Fed","They are commercial banks regulated by the FOMC"],e:"Fannie Mae, Freddie Mac, the Farm Credit System. They can hold reserves at the Fed but can’t earn IOR."},
 {tp:"fed",sec:"g-fed-tools",t:"mc",q:"In an abundant reserve regime, the Fed’s “tool of choice” is:",a:"interest on reserves",w:["open market operations","the reserve requirement","the discount window"],e:"Paying interest on reserves is “the Fed’s new monetary policy tool of choice.”"},
 {tp:"fed",sec:"g-fed-tools",t:"mc",q:"Interest on reserves affects:",a:"the demand for reserves, and sets the ceiling of the fed funds range",w:["the supply of reserves, and sets the floor of the fed funds range","the supply of currency, and sets the discount rate","the demand for loanable funds, and sets the real rate"],e:"Like a subsidy: pay banks to hold reserves and they hold more; none lends for less."},
 {tp:"fed",sec:"g-fed-tools",t:"mc",q:"A reverse repurchase agreement:",a:"sets the floor of the fed funds range: the Fed sells a security and buys it back the next day at a higher price",w:["sets the ceiling of the fed funds range: the Fed pays interest on all reserves","lends reserves to banks at the discount rate","buys long-term mortgage-backed securities"],e:"No institution lends reserves overnight for less than the Fed pays on a reverse repo."},
 {tp:"fed",sec:"g-fed-tools",ap:true,t:"mc",q:"The Fed announces that it expects to keep rates low for the next two years. This tool is:",a:"forward guidance, and it is expansionary",w:["forward guidance, and it is contractionary","quantitative easing","an open market purchase"],e:"Signaling lower future rates shapes expectations in an expansionary direction."},
 {tp:"fed",sec:"g-fed-tools",t:"mc",q:"Which is the correct order of the monetary transmission mechanism?",a:"Fed sets the rate target → short-term rates → other rates and expectations → spending → the mandate",w:["Spending → short-term rates → the Fed sets the rate target → the mandate","The Fed sets output → prices → interest rates → the mandate","Other rates → the Fed sets the rate target → spending → short-term rates"],e:"The Fed’s tools are nominal; it can’t directly change output or employment."},
 {tp:"fed",sec:"g-fed-tools",t:"tf",q:"When the Fed sells Treasury bonds to banks, the money supply rises.",a:false,e:"False. Selling bonds takes reserves out — contractionary. Buying bonds is expansionary."},
 {tp:"fed",sec:"g-fed-tools",t:"tf",q:"The Fed has paid interest on reserves since October 2008.",a:true,e:"True — on required and excess reserves until March 2020, on all reserves since."},

 {tp:"fed",sec:"g-fed-reserves",t:"mc",q:"In the market for reserves, the axes are:",a:"the federal funds rate and the quantity of reserves",w:["the real interest rate and loanable funds","the nominal interest rate and the quantity of money","the discount rate and the money multiplier"],e:"Three different models, three different axes — keep them apart."},
 {tp:"fed",sec:"g-fed-reserves",t:"mc",q:"The supply of reserves is:",a:"vertical for non-borrowed reserves, then flat at the discount rate",w:["upward sloping, like the supply of loanable funds","flat at the interest rate on reserves","downward sloping, then flat at the reverse-repo rate"],e:"The Fed sets non-borrowed reserves (OMO, QE/QT); above the discount rate, banks would borrow from the Fed."},
 {tp:"fed",sec:"g-fed-reserves",m:1,ap:true,t:"mc",q:"Reserves are scarce and the Fed buys bonds in the open market. The federal funds rate and the quantity of reserves:",a:"the rate falls and the quantity rises",w:["the rate stays the same and the quantity rises","the rate rises and the quantity falls","both stay the same"],e:"Supply shifts right along the sloped part of demand."},
 {tp:"fed",sec:"g-fed-reserves",m:1,ap:true,t:"mc",q:"Reserves are abundant and the Fed buys bonds (or does QE). The federal funds rate and the quantity of reserves:",a:"the rate stays the same and the quantity rises",w:["the rate falls and the quantity rises","the rate rises and the quantity rises","both stay the same"],e:"Supply shifts along the flat part of demand, so the rate stays in its range."},
 {tp:"fed",sec:"g-fed-reserves",m:1,ap:true,t:"mc",q:"Reserves are abundant and the Fed raises the interest rate on reserves. The federal funds rate:",a:"rises, because the ceiling moves up, while the quantity of reserves is unchanged",w:["is unchanged, while the quantity of reserves rises","falls, because banks lend out their reserves","is unchanged, because only supply matters"],e:"IOR shifts demand: the top of the range rises."},
 {tp:"fed",sec:"g-fed-reserves",t:"mc",q:"The Fed lowers the discount rate. In either regime, the federal funds rate and quantity of reserves:",a:"do not change",w:["both fall","the rate falls and the quantity rises","the rate rises and the quantity falls"],e:"It is kept 50 basis points above the fed funds rate, so the flat part of supply sits above the action."},
 {tp:"fed",sec:"g-fed-reserves",t:"mc",q:"Why is demand for reserves flat at the interest rate on reserves?",a:"Banks paid IOR won’t lend for less, and holding reserves at the Fed is risk-free",w:["The Fed forbids trading below that rate","Reserves pay nothing below that rate","Banks are required to hold that many reserves"],e:"At that rate, banks add reserves indefinitely."},
 {tp:"fed",sec:"g-fed-reserves",t:"mc",q:"With scarce reserves, what does the Fed change to move the federal funds rate?",a:"The supply of reserves, through open market operations",w:["The demand for reserves, through interest on reserves","The discount rate","The reserve requirement"],e:"Scarce: supply. Abundant: demand (IOR and reverse repos)."},
 {tp:"fed",sec:"g-fed-reserves",t:"mc",q:"One bank makes more loans and holds fewer reserves. Total reserves in the banking system:",a:"don’t change — the reserves just move to another bank",w:["fall by the amount of the new loans","rise by the amount of the new loans","fall to zero"],e:"The Fed controls total reserves; the loans are deposited elsewhere."},
 {tp:"fed",sec:"g-fed-reserves",t:"tf",q:"With abundant reserves, open market operations move the federal funds rate.",a:false,e:"False. They change only the quantity of reserves; the rate stays in the IOR–reverse-repo range."},
 {tp:"fed",sec:"g-fed-reserves",t:"tf",q:"When bond prices rise, their interest rates fall.",a:true,e:"True — bond prices and interest rates move inversely. That is how QE lowers long-term rates."},

 {tp:"fed",sec:"g-fed-limits",t:"mc",q:"Which is NOT one of the three difficulties of monetary policy?",a:"The Fed cannot change the federal funds rate",w:["The knowledge and timing problem","Incomplete control and lags","Real shocks such as a fall in productivity"],e:"It can change the fed funds rate almost instantly; the difficulties are knowledge/timing, control/lags, real shocks."},
 {tp:"fed",sec:"g-fed-limits",ap:true,t:"mc",q:"In early 2020 the Fed was considering contractionary policy, then COVID-19 hit and it reversed within weeks. This illustrates:",a:"the knowledge and timing problem",w:["incomplete control of M1 and M2","a rules-based policy","the lender of last resort"],e:"The Fed acts in real time on projections; unforeseeable shocks can make policy suddenly wrong."},
 {tp:"fed",sec:"g-fed-limits",t:"mc",q:"The Fed does NOT fully control:",a:"M1 and M2",w:["currency","non-borrowed reserves","the monetary base"],e:"If banks don’t lend the reserves, the broader aggregates don’t grow."},
 {tp:"fed",sec:"g-fed-limits",t:"mc",q:"Monetary policy works best when the economy slows because:",a:"spending (consumption or investment) slows",w:["productivity falls","the population shrinks","the Fed runs out of reserves"],e:"“The Fed doesn’t control productivity.” Real shocks are the third difficulty."},
 {tp:"fed",sec:"g-fed-limits",t:"mc",q:"Which tool shortens the lag between a fed funds change and other interest rates?",a:"Forward guidance",w:["The discount rate","Reverse repos","The reserve requirement"],e:"Telling people the future path lets other rates adjust sooner."},
 {tp:"fed",sec:"g-fed-limits",t:"mc",q:"The strongest argument for discretionary policy is:",a:"flexibility",w:["credibility","accountability","guaranteed low inflation"],e:"Credibility and accountability are the two arguments for rules."},
 {tp:"fed",sec:"g-fed-limits",ap:true,t:"mc",q:"A central bank commits to a 5% nominal GDP growth target: below 5% it expands, above it contracts. This is:",a:"rules-based policy",w:["discretionary policy","forward guidance only","quantitative easing"],e:"A specific policy known in advance. Nominal, because the Fed can’t control productivity."},
 {tp:"fed",sec:"g-fed-limits",t:"tf",q:"Forward guidance is a firm commitment by the Fed, so it counts as rules-based policy.",a:false,e:"False. It is “what we think we’re going to do” — the FOMC can act at any time. Modern policy is discretionary."},
 {tp:"fed",sec:"g-fed-limits",t:"tf",q:"After the 2009 recovery began, PCE inflation stayed below 2% most months, so the Fed undershot.",a:true,e:"True — the criticism he gives after 2007–09."}
]);

/* ---- practice: which tool, what it does on the graph, and the mandate ---- */
PRACTICE_TOPICS.push(["fed","The Fed"]);
TOPIC_LABEL.fed = "The Fed";
var FED_ACTS = [
 ["The FOMC buys short-term Treasury bills from banks.", 0],
 ["The FOMC sells short-term Treasury bills to banks.", 1],
 ["The Fed buys 30-year Treasuries and mortgage-backed securities.", 2],
 ["The Fed lets its long-term bonds mature without reinvesting the proceeds.", 3],
 ["The Fed tells the public it expects to keep rates low for two years.", 4],
 ["The Fed lowers the interest rate it pays on reserves.", 5]];
var FED_ACT_OPTS = ["Open market purchase — expansionary", "Open market sale — contractionary", "Quantitative easing — expansionary", "Quantitative tightening — contractionary", "Forward guidance — expansionary", "Lower interest on reserves — expansionary"];
var RSV = [
 ["Reserves are scarce. The Fed buys bonds in the open market.", 0, "Supply shifts right along the sloped part of demand."],
 ["Reserves are scarce. The Fed sells bonds in the open market.", 1, "Supply shifts left along the sloped part of demand."],
 ["Reserves are abundant. The Fed buys bonds (or does QE).", 2, "Supply shifts right along the flat part: only the quantity changes."],
 ["Reserves are abundant. The Fed sells bonds (or does QT).", 3, "Supply shifts left along the flat part: only the quantity changes."],
 ["Reserves are abundant. The Fed raises the interest rate on reserves.", 4, "Demand shifts: the ceiling rises."],
 ["Reserves are abundant. The Fed raises the reverse-repo rate.", 4, "Demand shifts: the floor rises."],
 ["Reserves are scarce. The Fed lowers the discount rate.", 5, "The discount rate sits 50 basis points above the action."],
 ["Reserves are abundant. The Fed raises the discount rate.", 5, "The discount rate never moves the rate or the quantity."],
 ["Reserves are scarce. The Fed raises the interest rate on reserves.", 5, "With scarce reserves, only supply moves the rate."]];
var RSV_OPTS = ["The fed funds rate falls; reserves rise", "The fed funds rate rises; reserves fall", "The fed funds rate is unchanged; reserves rise", "The fed funds rate is unchanged; reserves fall", "The fed funds rate rises; reserves are unchanged", "No change in either"];
GENS.push(
 {id:"fed-tool", topic:"fed", name:"Which tool is it?", remind:"Buy = expand, sell = contract. Short-term bills = OMO; long-term and MBS = QE/QT. Signals = forward guidance.",
  make:function(){ var s = rp(FED_ACTS); return {vals:{}, text:s[0], choice:{q:"Which tool is this, and which direction?", opts:FED_ACT_OPTS.slice(), right:s[1], work:FED_ACT_OPTS[s[1]] + "."}}; }},
 {id:"fed-rsv", topic:"fed", name:"Market for reserves: what happens?", remind:"Scarce: supply moves the rate. Abundant: supply moves only the quantity; IOR (ceiling) and reverse repos (floor) move the rate. The discount rate moves nothing.",
  make:function(){ var s = rp(RSV); return {vals:{}, text:s[0], choice:{q:"What happens in the market for reserves?", opts:RSV_OPTS.slice(), right:s[1], work:s[2] + " " + RSV_OPTS[s[1]] + "."}}; }},
 {id:"fed-mandate", topic:"fed", name:"The dual mandate: which policy?", remind:"Low inflation + high unemployment → expand. High inflation + low unemployment → contract. Otherwise the goals conflict: prioritize the one farther from its objective.",
  make:function(){
   var pi = ri(2, 12) / 2, un = ri(6, 16) / 2, nat = rp([4, 4.5, 5]);
   if(pi === 2) pi = 2.5; if(un === nat) un += 1;
   var lowP = pi < 2, highU = un > nat, right, work;
   if(lowP && highU){ right = 0; work = "Inflation below 2% and unemployment above normal: expansionary policy fixes both."; }
   else if(!lowP && !highU){ right = 1; work = "Inflation above 2% and unemployment below normal: contractionary policy fixes both."; }
   else {
    var dP = Math.abs(pi - 2), dU = Math.abs(un - nat);
    if(dP === dU){ un += highU ? 0.5 : -0.5; dU = Math.abs(un - nat); }
    right = dP > dU ? (lowP ? 2 : 3) : (highU ? 2 : 3);
    work = "The goals conflict. Inflation is " + num(dP, 1) + " points from 2%; unemployment is " + num(dU, 1) + " points from " + num(nat, 1) + "%. Prioritize the farther one" + (dP > dU ? " — inflation." : " — unemployment.");
   }
   return {vals:{}, text:"Inflation (PCE) is " + num(pi, 1) + "% and unemployment is " + num(un, 1) + "%. The Fed estimates the long-run normal unemployment rate at " + num(nat, 1) + "%.",
    choice:{q:"What should the Fed do?", opts:["Expansionary policy — both goals point the same way", "Contractionary policy — both goals point the same way", "The goals conflict; lean expansionary for the goal farther from target", "The goals conflict; lean contractionary for the goal farther from target"], right:right, work:work}};
  }});
["fed-tool","fed-rsv","fed-mandate"].forEach(function(id){ GENS.forEach(function(g){ if(g.id === id) GEN_BY_ID[id] = g; }); });
