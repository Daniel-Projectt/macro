/* ================================================================ fiscal policy (Unit 3, for the final)
   Lecture, Nov 12: "Fiscal Policy" (52:01, recorded Nov 2020) and the class
   example (12:41), Scenario 1 on page 84 of the Study Guide and Workbook.    */
CH.fiscal = {n:13, title:"Fiscal Policy", short:"Fiscal Policy",
 notes:[
  {id:"fis-tools", h:"Fiscal Policy and the Multipliers", body:
   '<div class="point"><b>The point</b><p><b>Fiscal policy</b> is government changing <b>spending or taxes</b> to guide nominal spending and <b>smooth the business cycle</b>. Its effect is multiplied: the <b>spending multiplier is 1 &divide; (1 &minus; MPC)</b> and the <b>tax multiplier is &minus;MPC &divide; (1 &minus; MPC)</b>. For the same MPC, the spending multiplier is <b>larger</b> in absolute value. At <b>full employment</b> it doesn&rsquo;t work, because of crowding out.</p><p class="able"><b>Be able to</b> define both kinds of fiscal policy, compute the MPC and both multipliers, find the change in GDP, and find the spending or tax change needed to close an output gap.</p></div>'+
   '<p class="knowline"><span class="know">Lecture and class example &middot; Nov 12 &middot; Problem Set 13</span></p>'+
   '<h3 class="sub" id="fis-defs">The words</h3>'+
   '<ul><li><b>Fiscal policy:</b> &ldquo;when policymakers change spending or taxation in order to guide nominal spending.&rdquo; Goal: <b>smooth the business cycle</b>.</li>'+
   '<li><b>Expansionary:</b> <b>raise government spending and/or cut taxes</b>. <b>Contractionary:</b> cut spending and/or raise taxes.</li>'+
   '<li>It works by putting <b>unused resources</b> back to work; rehired workers spend, and the spending ripples out.</li>'+
   '<li>&#9888; <b>At full employment</b> (the natural rate of unemployment) fiscal policy doesn&rsquo;t work, because of <b>crowding out</b>.</li>'+
   '<li><b>Multiplier effect:</b> the additional change in nominal spending that follows a change in fiscal policy. &#9888; Not the money multiplier (1 &divide; reserve ratio).</li></ul>'+
   '<h3 class="sub" id="fis-mult">The multipliers</h3>'+
   '<div class="formula">Spending: &Delta;Y = [1 &divide; (1 &minus; MPC)] &times; &Delta;G &nbsp;&middot;&nbsp; Tax: &Delta;Y = [&minus;MPC &divide; (1 &minus; MPC)] &times; &Delta;T<small>MPC = the share of an extra $1 that is spent &middot; MPC + MPS = 1</small></div>'+
   '<ul><li><b>MPC</b> = &ldquo;the fraction of extra income a household will consume rather than save.&rdquo; Spend 80&cent; of an extra dollar &rarr; MPC = 0.8. It has no $ or %.</li>'+
   '<li><b>Higher MPC &rarr; bigger multipliers.</b></li>'+
   '<li>The tax multiplier is <b>negative</b>: a tax <b>cut</b> (&Delta;T negative) raises GDP.</li>'+
   '<li>The spending multiplier is bigger because <b>government spends the whole dollar</b>, while part of a tax cut is <b>saved</b> &mdash; nothing to do with the minus sign.</li></ul>'+
   '<h3 class="sub" id="fis-ex">His worked example (MPC = 0.9)</h3>'+
   '<div class="tblwrap"><table class="tbl fit c3"><thead><tr><th>Question</th><th>Work</th><th>Answer</th></tr></thead><tbody>'+
   '<tr><td class="head">MPC (save 10&cent;)</td><td class="sm">0.90 &divide; 1</td><td class="sm"><b>0.9</b></td></tr>'+
   '<tr><td class="head">Spending multiplier</td><td class="sm">1 &divide; 0.1</td><td class="sm"><b>10</b></td></tr>'+
   '<tr><td class="head">&Delta;G = $50B</td><td class="sm">10 &times; 50B</td><td class="sm"><b>+$500B</b></td></tr>'+
   '<tr><td class="head">Close a $250B gap with G</td><td class="sm">250B &divide; 10</td><td class="sm"><b>$25B</b></td></tr>'+
   '<tr><td class="head">Tax multiplier</td><td class="sm">&minus;0.9 &divide; 0.1</td><td class="sm"><b>&minus;9</b></td></tr>'+
   '<tr><td class="head">Tax cut of $50B</td><td class="sm">(&minus;9) &times; (&minus;50B)</td><td class="sm"><b>+$450B</b></td></tr>'+
   '<tr><td class="head">Close a $250B gap with T</td><td class="sm">250B &divide; (&minus;9)</td><td class="sm"><b>cut about $27.78B</b></td></tr></tbody></table></div>'+
   '<p>&#9888; His common mistake: forgetting the <b>minus sign</b> on a tax cut (&Delta;T = &minus;50B).</p>'},

  {id:"fis-limits", h:"When Fiscal Policy Works, Its Eight Limits, and Automatic Stabilizers", body:
   '<div class="point"><b>The point</b><p>Expansionary fiscal policy works best when it is <b>timely</b>, <b>targeted</b>, aimed at a <b>demand-side</b> downturn, and not undone by <b>monetary offset</b>. In practice it faces <b>eight limits</b>. <b>Automatic stabilizers</b> avoid the lags because they change without anyone voting.</p><p class="able"><b>Be able to</b> list the four conditions, explain the eight limits with his examples, and give the two automatic stabilizers.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Nov 12</span></p>'+
   '<h3 class="sub" id="fis-four">The four conditions for it to work</h3>'+
   '<ol><li><b>Timely</b> &mdash; before or at the start of the downturn.</li><li><b>Targeted</b> &mdash; at the workers and industries actually hurt (COVID, 2008&ndash;09, early 2000s, early 1990s).</li><li><b>A demand-side downturn</b> &mdash; a drop in spending, not productivity.</li><li><b>No monetary offset</b> &mdash; the central bank doesn&rsquo;t cancel it.</li></ol>'+
   '<h3 class="sub" id="fis-eight">The eight limits</h3>'+
   '<ol><li><b>Knowledge</b> &mdash; the gap and the MPC aren&rsquo;t known in real time; first GDP estimate comes four weeks after a quarter ends.</li>'+
   '<li><b>Timing</b> &mdash; legislative and implementation lags (the Feb 2009 stimulus took over 3 years to spend; CARES checks reached 1.1 million deceased people).</li>'+
   '<li><b>Targeting</b> &mdash; labor and capital aren&rsquo;t <b>fungible</b>: an accountant isn&rsquo;t a steelworker.</li>'+
   '<li><b>Magnitude</b> &mdash; only 25&ndash;35% of the budget is discretionary; CARES was $2 trillion yet only about 9% of GDP.</li>'+
   '<li><b>Incentives</b> &mdash; politicians maximize votes with delayed accountability and <b>rational ignorance</b>, so stimulus becomes special-interest bills.</li>'+
   '<li><b>Crowding out</b> &mdash; (a) through loanable funds: higher real rates, less private investment; (b) <b>anticipated future taxes</b> lower today&rsquo;s MPC.</li>'+
   '<li><b>Debt changes behavior</b> &mdash; it must be repaid with higher inflation, higher taxes or both, so people spend less now.</li>'+
   '<li><b>Negative real shocks</b> &mdash; if output fell because of productivity, more spending brings only a temporary bump and higher inflation (Monopoly with part of the board cut off).</li></ol>'+
   '<p><b>Hook:</b> <b>K</b>now, <b>T</b>ime, <b>T</b>arget, <b>M</b>agnitude, <b>I</b>ncentives, <b>C</b>rowding, <b>D</b>ebt, <b>R</b>eal shocks.</p>'+
   '<h3 class="sub" id="fis-auto">Automatic stabilizers</h3>'+
   '<ul><li>Fiscal policy that changes <b>without any deliberate action</b>, so no legislative or implementation lag.</li>'+
   '<li><b>Progressive income tax</b> &mdash; falling incomes drop into lower rates.</li>'+
   '<li><b>Unemployment insurance</b> &mdash; pays out automatically in a downturn.</li></ul>'}
 ],
 decks:[
  {id:"terms", label:"Key terms", cards:[
   ["Fiscal policy","Government changing spending or taxes to guide nominal spending and smooth the business cycle","g-fis-tools"],
   ["Expansionary fiscal policy","Raise government spending and/or cut taxes","g-fis-tools"],
   ["Contractionary fiscal policy","Cut government spending and/or raise taxes","g-fis-tools"],
   ["Multiplier effect","The additional change in nominal spending from a change in fiscal policy","g-fis-tools"],
   ["Marginal propensity to consume","The fraction of extra income spent rather than saved","g-fis-tools"],
   ["Spending multiplier","1 ÷ (1 − MPC)","g-fis-tools"],
   ["Tax multiplier","−MPC ÷ (1 − MPC)","g-fis-tools"],
   ["Output gap","How far output is below capacity","g-fis-tools"],
   ["Fungible","Mutually substitutable — labor and capital aren’t","g-fis-limits"],
   ["Rational ignorance","Voters don’t gather costly information because one vote rarely matters","g-fis-limits"],
   ["Automatic stabilizers","Fiscal policy that changes without deliberate action","g-fis-limits"],
   ["Monetary offset","The central bank counters fiscal policy to meet its own goals","g-fis-limits"]]},
  {id:"nums", label:"Lists and numbers", cards:[
   ["MPC 0.9","Spending multiplier 10; tax multiplier −9","g-fis-tools"],
   ["MPC 0.8","Spending multiplier 5; tax multiplier −4","g-fis-tools"],
   ["ΔG = $50B, MPC 0.9","GDP +$500B","g-fis-tools"],
   ["Tax cut of $50B, MPC 0.9","GDP +$450B","g-fis-tools"],
   ["Why the spending multiplier is bigger","Government spends the whole dollar; part of a tax cut is saved","g-fis-tools"],
   ["Four conditions for it to work","Timely, targeted, demand-side downturn, no monetary offset","g-fis-limits"],
   ["The eight limits","Knowledge, timing, targeting, magnitude, incentives, crowding out, debt, real shocks","g-fis-limits"],
   ["Two forms of crowding out","Higher real rates (loanable funds); anticipated future taxes lower the MPC","g-fis-limits"],
   ["Two automatic stabilizers","Progressive income tax and unemployment insurance","g-fis-limits"],
   ["Discretionary share of the federal budget","About 25–35%","g-fis-limits"]]}
 ]
};
GUIDE.sections.splice(GUIDE.sections.length - 1, 0, {h:"Fiscal Policy", tp:"fiscal", items:[
 {id:"g-fis-tools", t:"Fiscal Policy and the Multipliers", a:"fis-tools",
  short:"Change G or T to guide nominal spending. Spending multiplier 1 ÷ (1 − MPC); tax multiplier −MPC ÷ (1 − MPC); the spending one is bigger. MPC 0.9: 10 and −9; $50B → +$500B / +$450B; $250B gap → $25B of G or a $27.78B tax cut.",
  subs:[["The words","fis-defs"],["The multipliers","fis-mult"],["His worked example","fis-ex"]]},
 {id:"g-fis-limits", t:"When Fiscal Policy Works, Its Eight Limits, and Automatic Stabilizers", a:"fis-limits",
  short:"Works if timely, targeted, demand-side, no monetary offset. Eight limits: knowledge, timing, targeting, magnitude, incentives, crowding out, debt, real shocks. Automatic stabilizers: progressive tax, unemployment insurance.",
  subs:[["Four conditions","fis-four"],["Eight limits","fis-eight"],["Automatic stabilizers","fis-auto"]]}]});

QB = QB.concat([
 {tp:"fiscal",sec:"g-fis-tools",t:"mc",q:"Fiscal policy is:",a:"government changing spending or taxes to guide nominal spending",w:["the central bank changing interest rates and the money supply","banks changing how much they lend","the Treasury printing currency"],e:"Its objective is to smooth the business cycle. Monetary policy is the central bank."},
 {tp:"fiscal",sec:"g-fis-tools",t:"mc",q:"Expansionary fiscal policy means:",a:"raising government spending and/or cutting taxes",w:["cutting government spending and/or raising taxes","lowering interest rates and raising the money supply","raising the reserve ratio"],e:"It stimulates nominal spending by putting unused resources to work."},
 {tp:"fiscal",sec:"g-fis-tools",t:"mc",q:"The marginal propensity to consume is:",a:"the fraction of extra income that is spent rather than saved",w:["the fraction of total income that is saved","the share of GDP that is consumption","the amount the government spends per dollar of tax"],e:"Spend 80¢ of an extra dollar → MPC = 0.8. MPC + MPS = 1."},
 {tp:"fiscal",sec:"g-fis-tools",m:1,ap:true,t:"mc",q:"Consumers save 10¢ of every extra dollar. The MPC and the spending multiplier are:",a:"0.9 and 10",w:["0.1 and 10","0.9 and 1.11","0.1 and 1.11"],e:"MPC = 0.9; 1 ÷ (1 − 0.9) = 10."},
 {tp:"fiscal",sec:"g-fis-tools",m:1,ap:true,t:"mc",q:"With an MPC of 0.9, the government spends an extra $50 billion. GDP changes by:",a:"+$500 billion",w:["+$450 billion","+$50 billion","+$55.6 billion"],e:"ΔY = 10 × 50B."},
 {tp:"fiscal",sec:"g-fis-tools",m:1,ap:true,t:"mc",q:"With an MPC of 0.9, taxes are cut by $50 billion. GDP changes by:",a:"+$450 billion",w:["+$500 billion","−$450 billion","+$45 billion"],e:"Tax multiplier −9; ΔY = (−9) × (−50B) = +450B. Forgetting the minus on a cut is his common mistake."},
 {tp:"fiscal",sec:"g-fis-tools",m:1,ap:true,t:"mc",q:"The economy is $250 billion below capacity and the MPC is 0.9. How much extra government spending closes the gap?",a:"$25 billion",w:["$250 billion","$2,500 billion","$27.78 billion"],e:"250B = 10 × ΔG → ΔG = 25B. ($27.78B is the tax cut needed.)"},
 {tp:"fiscal",sec:"g-fis-tools",t:"mc",q:"Why is the spending multiplier larger in absolute value than the tax multiplier for the same MPC?",a:"Government spends the whole dollar, while part of a tax cut is saved",w:["Because the tax multiplier is negative","Because taxes are collected with a lag","Because government spending is always on investment"],e:"It has nothing to do with the negative sign."},
 {tp:"fiscal",sec:"g-fis-tools",t:"mc",q:"Why doesn’t fiscal policy work at full employment?",a:"Crowding out: there are no unused resources to put to work",w:["Taxes can’t be cut below zero","The multiplier becomes negative","The central bank must raise reserve requirements"],e:"Full employment is roughly the natural rate of unemployment."},
 {tp:"fiscal",sec:"g-fis-tools",t:"tf",q:"A higher MPC means bigger fiscal multipliers.",a:true,e:"True: MPC 0.8 gives 5, MPC 0.9 gives 10."},
 {tp:"fiscal",sec:"g-fis-tools",t:"tf",q:"The fiscal spending multiplier is the same thing as the money multiplier.",a:false,e:"False. The money multiplier is 1 ÷ reserve ratio, from banking; the spending multiplier is 1 ÷ (1 − MPC)."},

 {tp:"fiscal",sec:"g-fis-limits",t:"mc",q:"Which is NOT one of his four conditions for expansionary fiscal policy to work well?",a:"The downturn is caused by a fall in productivity",w:["It is timely, enacted before or at the start of the downturn", "It is targeted at the workers and industries actually hurt", "There is no monetary offset from the central bank"],e:"It must be a demand-side downturn — a fall in spending."},
 {tp:"fiscal",sec:"g-fis-limits",ap:true,t:"mc",q:"The February 2009 stimulus took over three years to spend, long after most recessions end. This is the:",a:"timing problem",w:["knowledge problem","magnitude problem","incentive problem"],e:"Legislative and implementation lags."},
 {tp:"fiscal",sec:"g-fis-limits",ap:true,t:"mc",q:"Construction workers laid off in 2008 can’t simply become nurses. This illustrates the:",a:"targeting problem — labor isn’t fungible",w:["knowledge problem — the size of the gap isn’t known in real time", "magnitude problem — only a small share of the budget is discretionary", "debt problem — people expect higher taxes and cut their spending"],e:"You can’t turn an accountant into a steelworker overnight."},
 {tp:"fiscal",sec:"g-fis-limits",t:"mc",q:"Rational ignorance helps explain the incentive problem because:",a:"voters rarely gather costly information, so politicians face delayed accountability",w:["politicians always know the exact MPC","voters punish every special-interest bill immediately","it makes government spending more fungible"],e:"Only about 10–15% of voters can name their two senators and representative."},
 {tp:"fiscal",sec:"g-fis-limits",t:"mc",q:"Which are the two forms of crowding out from fiscal policy?",a:"Higher real interest rates cut private investment, and expected future taxes lower today’s MPC",w:["Higher reserve ratios lower the money multiplier, and banks lend less to firms", "Lower inflation raises real wages, and firms hire fewer workers as a result", "Higher imports replace domestic output, and exports fall as the dollar strengthens"],e:"(a) Through loanable funds; (b) anticipated future taxes."},
 {tp:"fiscal",sec:"g-fis-limits",t:"mc",q:"If output falls because of a negative productivity shock, more government spending:",a:"gives only a temporary output gain plus higher inflation",w:["fully restores output permanently","lowers inflation permanently","has no effect on prices"],e:"Monopoly with part of the board cut off: the missing properties don’t come back; prices rise."},
 {tp:"fiscal",sec:"g-fis-limits",t:"mc",q:"Which are the two automatic stabilizers he named?",a:"The progressive income tax and unemployment insurance",w:["Stimulus checks and infrastructure bills","The discount rate and interest on reserves","Tariffs and subsidies"],e:"They change without deliberate action, avoiding the lags."},
 {tp:"fiscal",sec:"g-fis-limits",t:"mc",q:"The CARES Act was about $2 trillion, the largest ever, yet only about 9% of GDP. This speaks to the:",a:"magnitude problem",w:["timing problem","targeting problem","knowledge problem"],e:"Only about 25–35% of the federal budget is discretionary, and more spending must be borrowed."},
 {tp:"fiscal",sec:"g-fis-limits",t:"tf",q:"Automatic stabilizers avoid legislative and implementation lags.",a:true,e:"True — they change with no one voting."},
 {tp:"fiscal",sec:"g-fis-limits",t:"tf",q:"Rising government debt has no effect on how people spend today.",a:false,e:"False. Debt must be repaid with higher inflation, taxes or both, so people may spend less now — limit 7."}
]);

PRACTICE_TOPICS.push(["fiscal","Fiscal"]);
TOPIC_LABEL.fiscal = "Fiscal";
GENS.push({id:"fis-mult", topic:"fiscal", name:"Fiscal multipliers", variants:5,
 remind:"Spending multiplier = 1 ÷ (1 − MPC). Tax multiplier = −MPC ÷ (1 − MPC). ΔY = multiplier × ΔG (or ΔT). A tax cut is a negative ΔT.",
 make:function(v){
  v = v || ri(1, 5);
  var mpc = rp([0.5, 0.6, 0.75, 0.8, 0.9]), sm = 1 / (1 - mpc), tm = -mpc / (1 - mpc), dg = ri(1, 20) * 10, gap = ri(2, 40) * 50, b = {v:v, vals:{}};
  var save = rnd((1 - mpc) * 100, 0);
  if(v === 1){ b.text = "For every extra dollar of income, consumers save " + save + "¢.";
   b.parts = [P("mpc", "the MPC", mpc, 2, "", "They spend " + (100 - save) + "¢ of each extra dollar: MPC = " + num(mpc, 2) + ".", {wrong:[1 - mpc, 100 - save, sm]}),
              P("sm", "the spending multiplier", sm, 2, "", "1 ÷ (1 − " + num(mpc, 2) + ") = " + num(sm, 2) + ".", {wrong:[1 / mpc, -tm, 1 - mpc]}),
              P("tm", "the tax multiplier", tm, 2, "", "−" + num(mpc, 2) + " ÷ (1 − " + num(mpc, 2) + ") = " + num(tm, 2) + ".", {signed:true, wrong:[-tm, -sm, mpc]})]; }
  else if(v === 2){ b.text = "The MPC is " + num(mpc, 2) + " and the government raises spending by $" + dg + " billion.";
   b.parts = [P("dy", "the change in GDP (in billions)", sm * dg, 2, "$", num(sm, 2) + " × " + dg + " = $" + num(sm * dg, 2) + " billion.", {wrong:[-tm * dg, dg, dg / sm]})]; }
  else if(v === 3){ b.text = "The MPC is " + num(mpc, 2) + " and the government cuts taxes by $" + dg + " billion.";
   b.parts = [P("dy", "the change in GDP (in billions)", -tm * dg, 2, "$", num(tm, 2) + " × (−" + dg + ") = +$" + num(-tm * dg, 2) + " billion.", {signed:true, wrong:[tm * dg, sm * dg, dg]})]; }
  else if(v === 4){ b.text = "The economy is $" + gap + " billion below capacity and the MPC is " + num(mpc, 2) + ".";
   b.parts = [P("dg", "the government spending needed (in billions)", gap / sm, 2, "$", gap + " ÷ " + num(sm, 2) + " = $" + num(gap / sm, 2) + " billion.", {wrong:[gap, gap * sm, gap / -tm]})]; }
  else { b.text = "The economy is $" + gap + " billion below capacity and the MPC is " + num(mpc, 2) + ". The government will use a lump-sum tax change.";
   b.parts = [P("dt", "the tax change needed (in billions; negative is a cut)", gap / tm, 2, "$", gap + " ÷ (" + num(tm, 2) + ") = −$" + num(-gap / tm, 2) + " billion: a tax cut.", {signed:true, wrong:[-gap / tm, gap / sm, gap * tm]})]; }
  return b;
 }});
GEN_BY_ID["fis-mult"] = GENS[GENS.length - 1];
[{id:"ex-fiscal", gen:"fis-mult", src:"Class example", make:function(){
   return {text:"For every extra dollar of income, the average consumer saves 10¢. The economy is $250 billion below capacity.",
    parts:[P("mpc", "the MPC", 0.9, 2, "", "0.90 ÷ 1 = 0.9.", {wrong:[0.1, 90, 10]}),
           P("sm", "the spending multiplier", 10, 2, "", "1 ÷ 0.1 = 10.", {wrong:[9, 1.11, 0.1]}),
           P("g50", "ΔGDP from $50 billion of spending (billions)", 500, 2, "$", "10 × 50 = $500 billion.", {wrong:[450, 50, 5]}),
           P("g", "the spending needed for the gap (billions)", 25, 2, "$", "250 ÷ 10 = $25 billion.", {wrong:[250, 27.78, 2500]}),
           P("tm", "the tax multiplier", -9, 2, "", "−0.9 ÷ 0.1 = −9.", {signed:true, wrong:[9, -10, -0.9]}),
           P("t50", "ΔGDP from a $50 billion tax cut (billions)", 450, 2, "$", "(−9) × (−50) = +$450 billion.", {signed:true, wrong:[-450, 500, 50]}),
           P("t", "the tax change needed for the gap (billions)", -250 / 9, 2, "$", "250 ÷ (−9) = −$27.78 billion — a cut.", {signed:true, wrong:[27.78, -25, -250]})]};
  }}].forEach(function(f){ f.topic = GEN_BY_ID[f.gen].topic; FIXED.push(f); FIXED_BY_ID[f.id] = f; });
