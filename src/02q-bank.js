/* ================================================================ banking and money creation (Unit 2)
   Lecture, Oct 13: "The Banking System and Money Creation" (23:41), and the class
   exercise "Money Multiplier and the Reserve Ratio" (7:43).                    */
CH.bank = {n:9, title:"Banking and Money Creation", short:"Banking",
 notes:[
  {id:"bank-frac", h:"Fractional Reserve Banking and the T-Account", body:
   '<div class="point"><b>The point</b><p>In a <b>fractional reserve</b> system, banks keep a fraction of deposits as <b>reserves</b> and lend the rest. <b>Lending is how banks earn income</b>, and it is how the banking system <b>creates money</b>: M1 and M2 grow, but currency and the monetary base do not. <b>Deposits = reserves + loans.</b></p><p class="able"><b>Be able to</b> read and fill in a bank T-account, compute the reserve ratio, and give the reserve-requirement history and why banks still hold reserves.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 13 &middot; Problem Set 8</span></p>'+
   '<h3 class="sub" id="bank-defs">The words</h3>'+
   '<ul><li><b>Deposits:</b> money placed in a bank account. <b>Reserves:</b> deposits the bank does not lend.</li>'+
   '<li><b>Bank T-account:</b> an accounting statement of a bank&rsquo;s <b>assets</b> and <b>liabilities</b>.</li>'+
   '<li><b>Deposits are liabilities</b> (your claim on the bank). <b>Loans and reserves are assets</b> (the bank&rsquo;s claims).</li>'+
   '<li>Commercial banks change <b>M1 and M2</b>; currency and the <b>monetary base</b> are &ldquo;not impacted at all by commercial banking.&rdquo;</li></ul>'+
   '<div class="formula">Reserve ratio = reserves &divide; deposits &times; 100 &nbsp;&middot;&nbsp; Deposits = reserves + loans</div>'+
   '<h3 class="sub" id="bank-req">Reserve requirements</h3>'+
   '<ul><li><b>Before March 26, 2020:</b> the Fed required most banks to hold a minimum, <b>10%</b> for most.</li>'+
   '<li><b>Since March 26, 2020: no reserve requirement.</b> Banks choose.</li>'+
   '<li><b>Banks still hold reserves because of:</b> (1) daily business and withdrawals; (2) preventing <b>bank runs</b>; (3) loans that go <b>non-performing</b> or default.</li></ul>'},

  {id:"bank-mult", h:"Money Creation and the Money Multiplier", body:
   '<div class="point"><b>The point</b><p>A deposit alone does <b>not</b> change the money supply &mdash; it only changes its form. <b>Lending</b> does: each loan is re-deposited and lent again. With a 10% reserve ratio, <b>$100 of reserves becomes $1,000 of money</b>. The <b>money multiplier = 1 &divide; reserve ratio</b> (as a decimal).</p><p class="able"><b>Be able to</b> trace the chain of banks, and compute reserves, loans, the ratio, the multiplier and the maximum money created.</p></div>'+
   '<p class="knowline"><span class="know">Lecture and class exercise &middot; Oct 13</span></p>'+
   '<h3 class="sub" id="bank-chain">The chain of banks (10% ratio)</h3>'+
   '<div class="tblwrap"><table class="tbl fit c4"><thead><tr><th>Bank</th><th>Deposit</th><th>Reserves</th><th>Loans</th></tr></thead><tbody>'+
   '<tr><td class="head">First National</td><td class="sm">$100</td><td class="sm">$10</td><td class="sm">$90</td></tr>'+
   '<tr><td class="head">Second National</td><td class="sm">$90</td><td class="sm">$9</td><td class="sm">$81</td></tr>'+
   '<tr><td class="head">Third National</td><td class="sm">$81</td><td class="sm">$8.10</td><td class="sm">$72.90</td></tr>'+
   '<tr><td class="head">&hellip;and on</td><td class="sm" colspan="3">$100 of reserves ends up as <b>$1,000</b> of money</td></tr></tbody></table></div>'+
   '<ul><li>After the first loan: money = $100 deposits + $90 currency = <b>$190</b>. &ldquo;The act of lending is increasing the money supply.&rdquo;</li>'+
   '<li>&ldquo;Money is not income, money is not wealth.&rdquo;</li></ul>'+
   '<h3 class="sub" id="bank-mm">The money multiplier</h3>'+
   '<div class="formula">Money multiplier = 1 &divide; reserve ratio &nbsp;&middot;&nbsp; Money created = multiplier &times; reserves<small>ratio as a decimal (10% &rarr; 0.1); the multiplier has <b>no $ and no %</b></small></div>'+
   '<div class="tblwrap"><table class="tbl fit c3"><thead><tr><th>Reserve ratio</th><th>Multiplier</th><th>From $100</th></tr></thead><tbody>'+
   '<tr><td class="head">10%</td><td class="sm">10</td><td class="sm">$1,000</td></tr>'+
   '<tr><td class="head">20%</td><td class="sm">5</td><td class="sm">$500</td></tr>'+
   '<tr><td class="head">40%</td><td class="sm">2.5</td><td class="sm">$250</td></tr></tbody></table></div>'+
   '<p><b>A higher reserve ratio &rarr; fewer loans &rarr; less money created.</b></p>'+
   '<h3 class="sub" id="bank-ex">The class exercise</h3>'+
   '<ol><li>10% reserves, $5,000 deposits &rarr; reserves <b>$500</b>, loans <b>$4,500</b>.</li>'+
   '<li>$10,000 deposits, $8,000 loans &rarr; reserves $2,000 &rarr; ratio <b>20%</b>.</li>'+
   '<li>Deposits $25,000, reserves $10,000, loans $15,000 &rarr; ratio <b>40%</b>; multiplier <b>2.5</b>; from $10,000 of new reserves, at most <b>$25,000</b>.</li></ol>'+
   '<p><b>The chain:</b> ratio = reserves &divide; deposits &rarr; multiplier = 1 &divide; ratio &rarr; money = multiplier &times; new reserves.</p>'}
 ],
 decks:[
  {id:"terms", label:"Key terms", cards:[
   ["Fractional reserve banking","Banks keep a fraction of deposits as reserves and lend the rest","g-bank-frac"],
   ["Deposits","Money placed in a bank account — a liability of the bank","g-bank-frac"],
   ["Reserves","Bank deposits that the bank does not lend — an asset","g-bank-frac"],
   ["Loans","The bank’s claims on its borrowers — an asset","g-bank-frac"],
   ["Bank T-account","An accounting statement of a bank’s assets and liabilities","g-bank-frac"],
   ["Reserve ratio","Reserves ÷ deposits × 100","g-bank-frac"],
   ["How banks earn income","Lending","g-bank-frac"],
   ["Reserve requirement","10% for most banks before March 26, 2020; none since","g-bank-frac"],
   ["Bank run","A quick and sudden withdrawal of money from the banking system","g-bank-frac"],
   ["Money multiplier","The money the banking system can create with each dollar of reserves: 1 ÷ reserve ratio","g-bank-mult"]]},
  {id:"nums", label:"Numbers and rules", cards:[
   ["Deposits =","Reserves + loans","g-bank-frac"],
   ["Three reasons banks still hold reserves","Daily business and withdrawals, preventing bank runs, loans that default","g-bank-frac"],
   ["What commercial banks change","M1 and M2 — not currency or the monetary base","g-bank-frac"],
   ["A deposit on its own","Doesn’t change the money supply — only its form","g-bank-mult"],
   ["10% ratio: $100 of reserves","Multiplier 10, $1,000 of money","g-bank-mult"],
   ["20% ratio","Multiplier 5, $500 from $100","g-bank-mult"],
   ["40% ratio","Multiplier 2.5","g-bank-mult"],
   ["After First National’s $90 loan","Money = $100 deposits + $90 currency = $190","g-bank-mult"],
   ["Higher reserve ratio","Fewer loans, less money created","g-bank-mult"],
   ["Units of the multiplier","None — no $ and no %","g-bank-mult"]]}
 ]
};

GUIDE.sections.splice(GUIDE.sections.length - 1, 0, {h:"Banking and Money Creation", tp:"bank", items:[
 {id:"g-bank-frac", t:"Fractional Reserve Banking and the T-Account", a:"bank-frac",
  short:"Banks keep reserves and lend the rest; lending is their income and it creates money (M1, M2 — not the base). Deposits are liabilities; loans and reserves are assets. Deposits = reserves + loans. Ratio = reserves ÷ deposits × 100. 10% requirement until March 26, 2020; none since.",
  subs:[["The words","bank-defs"],["Reserve requirements","bank-req"]]},
 {id:"g-bank-mult", t:"Money Creation and the Money Multiplier", a:"bank-mult",
  short:"A deposit alone changes only the form of money; lending creates it. $100 → $90 → $81 → $72.90… → $1,000 at 10%. Multiplier = 1 ÷ ratio (decimal, unitless); money = multiplier × reserves. Exercise: $500/$4,500; 20%; 40%, 2.5, $25,000.",
  subs:[["The chain of banks","bank-chain"],["The money multiplier","bank-mm"],["The class exercise","bank-ex"]]}]});

QB = QB.concat([
 {tp:"bank",sec:"g-bank-frac",t:"mc",q:"In a fractional reserve banking system, banks:",a:"keep a fraction of deposits as reserves and lend the rest",w:["keep all deposits as reserves and lend nothing","lend all deposits and keep nothing","lend only the money the central bank gives them"],e:"That is the modern U.S. system."},
 {tp:"bank",sec:"g-bank-frac",t:"mc",q:"On a bank’s T-account, deposits are:",a:"liabilities, because they are the depositors’ claims on the bank",w:["assets, because the bank holds the money","assets, because they earn the bank interest","neither assets nor liabilities"],e:"You can withdraw them: they are claims on the bank. Loans and reserves are the bank’s assets."},
 {tp:"bank",sec:"g-bank-frac",t:"mc",q:"Which are both assets on a bank’s T-account?",a:"Loans and reserves",w:["Deposits and loans","Deposits and reserves","Deposits only"],e:"Loans are the bank’s claims on borrowers; reserves can be lent or earn interest at the Fed."},
 {tp:"bank",sec:"g-bank-frac",t:"mc",q:"What is the primary way banks make an income?",a:"Lending",w:["Holding reserves","Charging for deposits","Printing currency"],e:"“Lending is the primary way that banks make an income.”"},
 {tp:"bank",sec:"g-bank-frac",t:"mc",q:"Which measures of money are NOT affected by commercial bank lending?",a:"Currency and the monetary base",w:["M1 and M2, since loans are never deposited back in banks", "M2 only, since loans become time deposits and money funds", "None of them — bank lending changes every measure of money"],e:"Banks change M1 and M2; currency and the base (currency + reserves) are “not impacted at all.”"},
 {tp:"bank",sec:"g-bank-frac",t:"mc",q:"Since March 26, 2020, the U.S. reserve requirement has been:",a:"zero — there is no requirement",w:["10% for most banks","20% for all banks","set separately by each regional Fed"],e:"Before then it was 10% for most banks."},
 {tp:"bank",sec:"g-bank-frac",t:"mc",q:"Which is NOT one of the reasons banks still hold reserves without a requirement?",a:"The law still requires a 10% minimum",w:["To handle daily business and withdrawal requests","To prevent bank runs","Because some loans become non-performing or default"],e:"There has been no requirement since March 2020."},
 {tp:"bank",sec:"g-bank-frac",m:1,ap:true,t:"mc",q:"A bank keeps 10% of its deposits as reserves and has $5,000 in deposits. Its reserves and loans are:",a:"$500 in reserves and $4,500 in loans",w:["$4,500 in reserves and $500 in loans","$500 in reserves and $5,000 in loans","$50 in reserves and $4,950 in loans"],e:"5,000 × 0.10 = 500; 5,000 − 500 = 4,500. Deposits = reserves + loans."},
 {tp:"bank",sec:"g-bank-frac",m:1,ap:true,t:"mc",q:"A bank has $10,000 in deposits and makes $8,000 in loans. Its reserve ratio is:",a:"20%",w:["80%","25%","12.5%"],e:"Reserves = 10,000 − 8,000 = 2,000; 2,000 ÷ 10,000 × 100 = 20%."},
 {tp:"bank",sec:"g-bank-frac",t:"tf",q:"Deposits always equal reserves plus loans.",a:true,e:"True — a deposit can only be kept as reserves or lent."},
 {tp:"bank",sec:"g-bank-frac",t:"tf",q:"Before March 2020, most U.S. banks had to hold at least 10% of deposits as reserves.",a:true,e:"True. Since March 26, 2020 there is no requirement."},

 {tp:"bank",sec:"g-bank-mult",t:"mc",q:"You deposit $100 of cash in your checking account. Before the bank lends any of it, the money supply:",a:"does not change — only the form of money changes",w:["rises by $100, because a new deposit has been created in the banking system", "rises by $1,000, because the deposit is multiplied through the banks", "falls by $100, because the currency has left circulation for the bank"],e:"Currency becomes a checking deposit. Lending is what creates money."},
 {tp:"bank",sec:"g-bank-mult",m:1,ap:true,t:"mc",q:"First National keeps 10% of a $100 deposit and lends $90, which the borrower holds as cash. The money supply is now:",a:"$190",w:["$100","$90","$1,000"],e:"$100 of deposits + $90 of currency. “The act of lending is increasing the money supply.”"},
 {tp:"bank",sec:"g-bank-mult",m:1,ap:true,t:"mc",q:"The $90 is deposited at Second National, which keeps 10%. It lends:",a:"$81",w:["$90","$9","$72.90"],e:"It keeps $9 and lends $81; Third National then keeps $8.10 and lends $72.90."},
 {tp:"bank",sec:"g-bank-mult",t:"mc",q:"The money multiplier is:",a:"1 ÷ the reserve ratio, written as a decimal",w:["the reserve ratio ÷ 1, written as a percent","reserves ÷ deposits × 100","deposits ÷ loans"],e:"10% → 1 ÷ 0.1 = 10. Reserves ÷ deposits × 100 is the reserve ratio itself."},
 {tp:"bank",sec:"g-bank-mult",m:1,ap:true,t:"mc",q:"With a 20% reserve ratio, the money multiplier and the money created from $100 of reserves are:",a:"5 and $500",w:["20 and $2,000","0.2 and $20","5% and $500"],e:"1 ÷ 0.2 = 5; 5 × 100 = $500. The multiplier has no units."},
 {tp:"bank",sec:"g-bank-mult",m:1,ap:true,t:"mc",q:"A bank has $25,000 in deposits, $10,000 in reserves and $15,000 in loans. Its reserve ratio and money multiplier are:",a:"40% and 2.5",w:["60% and 1.67","40% and 4","25% and 2.5"],e:"10,000 ÷ 25,000 × 100 = 40%; 1 ÷ 0.4 = 2.5 (the class exercise)."},
 {tp:"bank",sec:"g-bank-mult",m:1,ap:true,t:"mc",q:"With a multiplier of 2.5, $10,000 of new reserves can create at most:",a:"$25,000 of money",w:["$4,000 of money","$10,000 of money","$250,000 of money"],e:"2.5 × 10,000 = $25,000."},
 {tp:"bank",sec:"g-bank-mult",t:"mc",q:"If banks raise their reserve ratio, the money multiplier:",a:"falls, and less money is created",w:["rises, and more money is created","stays the same","rises, but less money is created"],e:"A higher ratio means fewer loans: 10% gives 10, 20% gives 5."},
 {tp:"bank",sec:"g-bank-mult",t:"tf",q:"The money multiplier should be written with a percent sign, like 10%.",a:false,e:"False. It is unitless: “for every $1 of reserves we can create $10 of money.”"},
 {tp:"bank",sec:"g-bank-mult",t:"tf",q:"With a 10% reserve ratio, $100 of reserves can generate $1,000 of money.",a:true,e:"True. The multiplier is 1 ÷ 0.1 = 10, so $100 of reserves can support at most 10 × $100 = $1,000 of money."}
]);

PRACTICE_TOPICS.push(["banking","Banking"]);
TOPIC_LABEL.banking = "Banking";
GENS.push({id:"bank-calc", topic:"banking", name:"Reserves, loans and the money multiplier", variants:4,
 remind:"Deposits = reserves + loans. Ratio = reserves ÷ deposits × 100. Multiplier = 1 ÷ ratio (decimal). Money = multiplier × reserves.",
 make:function(v){
  v = v || ri(1, 4);
  var ratio = rp([5, 10, 12.5, 20, 25, 40, 50]), dep = ri(4, 60) * 1000, res = dep * ratio / 100, loans = dep - res, mult = 100 / ratio, nr = ri(1, 20) * 1000, b = {v:v, vals:{}};
  if(v === 1){
   b.text = "A bank keeps " + num(ratio, 1) + "% of its deposits as reserves and has " + usd(dep) + " in deposits.";
   b.parts = [P("res", "its reserves", res, 2, "$", num(dep) + " × " + num(ratio / 100, 3) + " = " + usd(res) + ".", {are:true, wrong:[loans, dep * ratio, dep / ratio]}),
              P("loans", "its loans", loans, 2, "$", num(dep) + " − " + num(res) + " = " + usd(loans) + ".", {are:true, wrong:[res, dep, dep + res]})];
  } else if(v === 2){
   b.text = "A bank has " + usd(dep) + " in deposits and makes " + usd(loans) + " in loans.";
   b.parts = [P("ratio", "its reserve ratio", ratio, 2, "%", "Reserves = " + num(dep) + " − " + num(loans) + " = " + num(res) + "; " + num(res) + " ÷ " + num(dep) + " × 100 = " + num(ratio, 1) + "%.",
     {wrong:[100 - ratio, loans / dep * 100, res / loans * 100], setup:setupOf("(" + num(dep) + " − " + num(loans) + ") ÷ " + num(dep) + " × 100", ratio, [[num(loans) + " ÷ " + num(dep) + " × 100", 100 - ratio], ["(" + num(dep) + " − " + num(loans) + ") ÷ " + num(loans) + " × 100", res / loans * 100], [num(dep) + " ÷ " + num(loans), dep / loans]])})];
  } else if(v === 3){
   b.text = "A bank has " + usd(dep) + " in deposits, " + usd(res) + " in reserves and " + usd(loans) + " in loans.";
   b.parts = [P("ratio", "the reserve ratio", ratio, 2, "%", num(res) + " ÷ " + num(dep) + " × 100 = " + num(ratio, 1) + "%.", {wrong:[100 - ratio, res / loans * 100, mult]}),
              P("mult", "the money multiplier", mult, 2, "", "1 ÷ " + num(ratio / 100, 3) + " = " + num(mult, 2) + ". No $ or % sign.", {wrong:[ratio, 1 / ratio, mult * 2]})];
  } else {
   b.text = "The reserve ratio is " + num(ratio, 1) + "%. The banking system receives " + usd(nr) + " of new reserves.";
   b.parts = [P("mult", "the money multiplier", mult, 2, "", "1 ÷ " + num(ratio / 100, 3) + " = " + num(mult, 2) + ".", {wrong:[ratio, 1 / ratio, 100 - ratio]}),
              P("money", "the most money that can be created", mult * nr, 2, "$", num(mult, 2) + " × " + num(nr) + " = " + usd(mult * nr) + ".", {wrong:[nr * ratio / 100, nr, nr * ratio]})];
  }
  return b;
 }});
GEN_BY_ID["bank-calc"] = GENS[GENS.length - 1];
[{id:"ex-bank", gen:"bank-calc", src:"Class exercise", make:function(){
   return {text:"Three banks. (1) Keeps 10% of $5,000 in deposits. (2) Has $10,000 in deposits and $8,000 in loans. (3) Has $25,000 in deposits, $10,000 in reserves and $15,000 in loans, then receives $10,000 of new reserves.",
    parts:[P("r1", "bank 1’s reserves", 500, 2, "$", "5,000 × 0.10 = $500.", {wrong:[4500, 50, 5000]}),
           P("l1", "bank 1’s loans", 4500, 2, "$", "5,000 − 500 = $4,500.", {wrong:[500, 5000, 4950]}),
           P("q2", "bank 2’s reserve ratio", 20, 2, "%", "(10,000 − 8,000) ÷ 10,000 × 100 = 20%.", {wrong:[80, 25, 12.5]}),
           P("q3", "bank 3’s reserve ratio", 40, 2, "%", "10,000 ÷ 25,000 × 100 = 40%.", {wrong:[60, 66.67, 25]}),
           P("m3", "the money multiplier", 2.5, 2, "", "1 ÷ 0.4 = 2.5.", {wrong:[40, 0.4, 4]}),
           P("c3", "the most money created from $10,000 of new reserves", 25000, 2, "$", "2.5 × 10,000 = $25,000.", {wrong:[4000, 10000, 250000]})]};
  }}].forEach(function(f){ f.topic = GEN_BY_ID[f.gen].topic; FIXED.push(f); FIXED_BY_ID[f.id] = f; });
