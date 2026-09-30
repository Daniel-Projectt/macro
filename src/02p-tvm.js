/* ================================================================ time value of money (Unit 2)
   Lecture, Oct 8: "Time Value of Money" (1:08:38). Discounting and present
   value, compounding and future value, continuous compounding with e,
   multiple cash flows, depreciation, simple vs compound interest, and his
   takeaways. Every worked number below was recomputed from his inputs.      */
function pvOf(fv, i, n, t){ return n === "c" ? fv / Math.exp(i * t) : fv / Math.pow(1 + i / n, n * t); }
function fvOf(pv, i, n, t){ return n === "c" ? pv * Math.exp(i * t) : pv * Math.pow(1 + i / n, n * t); }
var COMP_NAME = {1:"annually", 4:"quarterly", 12:"monthly", c:"continuously"};

CH.tvm = {n:8, title:"Time Value of Money", short:"Time Value",
 notes:[
  {id:"tvm-pv", h:"Discounting and Present Value", body:
   '<div class="point"><b>The point</b><p><b>Discounting</b> converts future cash into <b>present value</b>: what a future sum is worth today, given an interest rate. <b>A dollar today is worth more than a dollar later.</b> The central principle: <b>the higher the interest rate, the lower the present value.</b></p><p class="able"><b>Be able to</b> compute PV with annual, quarterly, monthly and continuous compounding, add up several cash flows, and decide whether to take money now or later.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 8 &middot; Problem Set 7</span></p>'+
   '<h3 class="sub" id="tvm-why">Why a dollar today is worth more</h3>'+
   '<ol><li><b>Bias toward present consumption</b> &mdash; the concert is today; &ldquo;tomorrow is inherently risky.&rdquo;</li>'+
   '<li><b>You could invest it today</b> and earn interest.</li>'+
   '<li><b>Inflation erodes value</b> if your savings earn less than inflation.</li></ol>'+
   '<h3 class="sub" id="tvm-pvf">The formulas</h3>'+
   '<div class="formula">PV = FV &divide; (1 + i/n)<sup>n&middot;t</sup><small>i = rate <b>as a decimal</b> (3% = 0.03) &middot; n = times compounded a year (1, 4, 12) &middot; t = years</small></div>'+
   '<div class="formula">PV = FV &divide; e<sup>i&middot;t</sup> &nbsp;(continuous)<small>e &asymp; 2.71828, Euler&rsquo;s number, &ldquo;the mathematical limit of continuous compounding&rdquo;</small></div>'+
   '<div class="tblwrap"><table class="tbl fit c3"><thead><tr><th>$1,100 received later</th><th>Working</th><th>PV</th></tr></thead><tbody>'+
   '<tr><td class="head">1 yr, 3%, annual</td><td class="sm">1,100 &divide; 1.03</td><td class="sm"><b>$1,067.96</b> &rarr; wait for the $1,100</td></tr>'+
   '<tr><td class="head">1 yr, 11%, annual</td><td class="sm">1,100 &divide; 1.11</td><td class="sm"><b>$990.99</b> &rarr; take $1,000 now</td></tr>'+
   '<tr><td class="head">2 yrs, 3%, quarterly</td><td class="sm">1,100 &divide; 1.0075<sup>8</sup></td><td class="sm"><b>$1,036.17</b></td></tr>'+
   '<tr><td class="head">2 yrs, 3%, monthly</td><td class="sm">1,100 &divide; 1.0025<sup>24</sup></td><td class="sm"><b>$1,036.02</b></td></tr>'+
   '<tr><td class="head">2 yrs, 3%, continuous</td><td class="sm">1,100 &divide; e<sup>0.06</sup></td><td class="sm"><b>$1,035.94</b> (the lower limit)</td></tr></tbody></table></div>'+
   '<p>More frequent compounding means <b>more discounting</b>, so a <b>lower</b> PV.</p>'+
   '<h3 class="sub" id="tvm-multi">Several cash flows</h3>'+
   '<div class="formula">PV = &Sigma; CF<sub>t</sub> &divide; (1 + i/n)<sup>n&middot;t</sup><small>discount each payment on its own, then add them up</small></div>'+
   '<ul><li>$1,000 a year for 3 years at 8% (annual): 925.93 + 857.34 + 793.83 = <b>$2,577.10</b>.</li>'+
   '<li>Same at 5% (monthly): 951.33 + 905.03 + 860.98 = <b>$2,717.34</b>.</li>'+
   '<li><b>Lesson 1:</b> the sum of the present values is <b>less than</b> the total paid ($3,000) &mdash; time preference and opportunity cost.</li>'+
   '<li><b>Lesson 2:</b> as interest rates <b>fall</b>, the value of investments <b>rises</b>. Rates and asset values move <b>inversely</b>.</li></ul>'},

  {id:"tvm-fv", h:"Compounding and Future Value", body:
   '<div class="point"><b>The point</b><p><b>Compounding</b> converts today&rsquo;s dollars into <b>future value</b>: what a sum today will be worth later if it earns interest. A <b>higher rate</b> and <b>more frequent compounding</b> both raise FV. It is the PV formula turned around.</p><p class="able"><b>Be able to</b> compute FV with any compounding, including continuous, and connect it to the rule of 70.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 8 &middot; Problem Set 7</span></p>'+
   '<h3 class="sub" id="tvm-fvf">The formulas</h3>'+
   '<div class="formula">FV = PV &times; (1 + i/n)<sup>n&middot;t</sup> &nbsp;&middot;&nbsp; FV = PV &times; e<sup>i&middot;t</sup><small>the same letters as present value</small></div>'+
   '<div class="tblwrap"><table class="tbl fit c3"><thead><tr><th>$1,000 for 4 years</th><th>Compounding</th><th>FV</th></tr></thead><tbody>'+
   '<tr><td class="head">3%</td><td class="sm">annual</td><td class="sm"><b>$1,125.51</b></td></tr>'+
   '<tr><td class="head">11%</td><td class="sm">annual</td><td class="sm"><b>$1,518.07</b></td></tr>'+
   '<tr><td class="head">3%</td><td class="sm">quarterly</td><td class="sm"><b>$1,126.99</b></td></tr>'+
   '<tr><td class="head">3%</td><td class="sm">monthly</td><td class="sm"><b>$1,127.33</b></td></tr>'+
   '<tr><td class="head">3%</td><td class="sm">continuous</td><td class="sm"><b>$1,127.50</b></td></tr></tbody></table></div>'+
   '<h3 class="sub" id="tvm-70">The link to the rule of 70</h3>'+
   '<ul><li>Years to double &asymp; 70 &divide; growth rate: 70 years at 1%, 35 at 2%. &ldquo;Small changes in the growth rate make a large difference over time&rdquo; &mdash; because of compounding.</li>'+
   '<li><b>Memory hook:</b> PV <b>divides</b> (bring money back to today, it shrinks); FV <b>multiplies</b> (send it forward, it grows).</li></ul>'},

  {id:"tvm-dep", h:"Depreciation", body:
   '<div class="point"><b>The point</b><p><b>Depreciation</b> is &ldquo;the accounting process of allocating cost to the time period when an asset is consumed.&rdquo; More broadly (as in Solow), capital loses value through wear and tear, obsolescence, and changes in human capital and institutions. Two forms: <b>straight-line</b> and <b>accelerated</b>.</p><p class="able"><b>Be able to</b> compute straight-line depreciation per year and give an example of each form.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 8 &middot; use his wording</span></p>'+
   '<h3 class="sub" id="tvm-depf">Straight-line and accelerated</h3>'+
   '<ul><li><b>Straight-line:</b> the same amount each year (a tractor; used cars lose value about in line with miles).</li>'+
   '<li><b>Accelerated:</b> faster at the start than the end (a computer loses most of its value in year one).</li></ul>'+
   '<div class="formula">Yearly depreciation = (cost &minus; sale value at the end) &divide; years<small>his example: ($50,000 &minus; $10,000) &divide; 10 = <b>$4,000 a year</b></small></div>'+
   '<ul><li>A mass spectrometer costs <b>$50,000</b>, is used <b>10 years</b>, and sells for <b>$10,000</b>. He calls the <b>$40,000</b> difference the &ldquo;residual value.&rdquo;</li>'+
   '<li>Accounting classes call the $10,000 the residual or salvage value and the $40,000 the depreciable amount. <b>For this course, use his wording.</b></li></ul>'},

  {id:"tvm-risk", h:"Risk, Simple vs Compound Interest, and the Takeaways", body:
   '<div class="point"><b>The point</b><p>&ldquo;<b>The greater the risk, the greater the potential gain.</b>&rdquo; <b>Simple interest</b> is paid on the principal only; <b>compound interest</b> is paid on principal <b>plus</b> interest already earned, and over long periods the gap is dramatic. The big takeaway: <b>higher rates &rarr; lower PV &rarr; less investment &rarr; slower growth</b> &mdash; but the rate change is an <b>effect</b>, not a cause.</p><p class="able"><b>Be able to</b> compute simple and compound interest, rank stocks, corporate and government bonds by risk, and give his three investment takeaways.</p></div>'+
   '<p class="knowline"><span class="know">Lecture &middot; Oct 8 &middot; his wrap-up</span></p>'+
   '<h3 class="sub" id="tvm-simple">Simple and compound interest</h3>'+
   '<div class="formula">Simple = P &times; i &times; t &nbsp;&middot;&nbsp; Compound earned = P(1 + i)<sup>t</sup> &minus; P<small>P = principal &middot; i as a decimal (write .05, not 5)</small></div>'+
   '<ul><li>$100 for 3 years at 5%: simple <b>$15.00</b>, compound <b>$15.76</b>.</li>'+
   '<li>$100 for 40 years at 5% (age 25 to 65): simple <b>$200</b>, compound <b>$604.00</b>.</li>'+
   '<li><b>Risk ladder</b> (safest first): government bonds &rarr; corporate bonds &rarr; stocks. In a bankruptcy, stockholders are wiped out and bondholders are first in line. Stocks out-earn bonds over the long run.</li></ul>'+
   '<h3 class="sub" id="tvm-take">His takeaways</h3>'+
   '<ol><li>&ldquo;The fundamental value of an asset is equal to the present discounted value of its cash flows.&rdquo;</li>'+
   '<li>&ldquo;The value of any asset is <b>inversely</b> related to the expected interest rate.&rdquo;</li>'+
   '<li>&ldquo;Investors will be willing to take risk at <b>lower</b> interest rates rather than higher&rdquo; &mdash; failure costs less.</li></ol>'+
   '<ul><li><b>Macro:</b> higher rate &rarr; lower PV &rarr; fewer investments &rarr; slower GDP growth (back to Solow).</li>'+
   '<li>&ldquo;We don&rsquo;t want to fall into this idea that low interest rates are always good&hellip; <b>The change in the interest rate is the effect, it&rsquo;s not the cause.</b>&rdquo; Ask what moved.</li>'+
   '<li>U.S. debt (about $37 trillion at recording) is far more manageable at 1% than at 2&ndash;3%.</li>'+
   '<li><b>Three concepts:</b> present value (which investments are worth making), future value (how resources grow or shrink), depreciation (how much capital must be replaced).</li></ul>'}
 ],
 decks:[
  {id:"terms", label:"Key terms", cards:[
   ["Time value of money","How time, interest rates and growth affect the value of financial resources","g-tvm-pv"],
   ["Discounting","Converting future cash flows into present value","g-tvm-pv"],
   ["Present value","The current value of a future sum, given a rate of return","g-tvm-pv"],
   ["Compounding","Converting current dollars into future value","g-tvm-fv"],
   ["Future value","How much a sum today will be worth in the future","g-tvm-fv"],
   ["e","≈ 2.71828, Euler’s number — the limit of continuous compounding","g-tvm-pv"],
   ["Depreciation","The accounting process of allocating cost to the time period when an asset is consumed","g-tvm-dep"],
   ["Straight-line depreciation","The same amount every year — a tractor","g-tvm-dep"],
   ["Accelerated depreciation","Faster at the start than the end — a computer","g-tvm-dep"],
   ["Simple interest","Interest on the principal only: P × i × t","g-tvm-risk"],
   ["Compound interest","Interest on principal plus interest already earned: P(1 + i)ᵗ − P","g-tvm-risk"],
   ["The central principle","The higher the interest rate, the lower the present value","g-tvm-pv"]]},
  {id:"nums", label:"Formulas & his numbers", cards:[
   ["PV formula","PV = FV ÷ (1 + i/n)^(n·t)","g-tvm-pv"],
   ["Continuous PV","PV = FV ÷ e^(i·t)","g-tvm-pv"],
   ["FV formula","FV = PV × (1 + i/n)^(n·t)","g-tvm-fv"],
   ["$1,100 in 1 year at 3%","PV $1,067.96 — wait for the $1,100","g-tvm-pv"],
   ["$1,100 in 1 year at 11%","PV $990.99 — take $1,000 now","g-tvm-pv"],
   ["$1,000 a year for 3 years at 8%","PV $2,577.10 — less than the $3,000 paid","g-tvm-pv"],
   ["$1,000 for 4 years at 3%, annual","FV $1,125.51","g-tvm-fv"],
   ["Mass spectrometer: $50,000, 10 years, sells for $10,000","$4,000 of depreciation a year","g-tvm-dep"],
   ["$100 for 40 years at 5%","Simple $200; compound $604.00","g-tvm-risk"],
   ["Three reasons a dollar today is worth more","Bias toward the present, you could invest it, inflation erodes it","g-tvm-pv"],
   ["Rates and asset values","Move inversely: rates down, values up","g-tvm-pv"],
   ["Rate changes are","The effect, not the cause — ask what moved","g-tvm-risk"]]}
 ]
};

GUIDE.sections.splice(GUIDE.sections.length - 1, 0, {h:"Time Value of Money", tp:"tvm", items:[
 {id:"g-tvm-pv", t:"Discounting and Present Value", a:"tvm-pv",
  short:"PV = FV ÷ (1 + i/n)^(n·t), or ÷ e^(i·t) continuous. A dollar today is worth more (present bias, could invest it, inflation). Higher rate → lower PV; more frequent compounding → lower PV. $1,100: $1,067.96 at 3%, $990.99 at 11%. Several cash flows: discount each and add.",
  subs:[["Why a dollar today is worth more","tvm-why"],["The formulas","tvm-pvf"],["Several cash flows","tvm-multi"]]},
 {id:"g-tvm-fv", t:"Compounding and Future Value", a:"tvm-fv",
  short:"FV = PV × (1 + i/n)^(n·t), or × e^(i·t). Higher rate and more frequent compounding raise FV. $1,000 for 4 years at 3%: $1,125.51 annual → $1,127.50 continuous. Rule of 70.",
  subs:[["The formulas","tvm-fvf"],["The rule of 70","tvm-70"]]},
 {id:"g-tvm-dep", t:"Depreciation", a:"tvm-dep",
  short:"Allocating cost to the period an asset is consumed. Straight-line (tractor) vs accelerated (computer). ($50,000 − $10,000) ÷ 10 = $4,000 a year.",
  subs:[["Straight-line and accelerated","tvm-depf"]]},
 {id:"g-tvm-risk", t:"Risk, Simple vs Compound Interest, and the Takeaways", a:"tvm-risk",
  short:"Greater risk, greater potential gain. Simple P·i·t vs compound P(1+i)ᵗ − P: $15.00 vs $15.76; over 40 years $200 vs $604.00. Asset value = PV of its cash flows; values move inversely with rates; the rate change is the effect, not the cause.",
  subs:[["Simple and compound interest","tvm-simple"],["His takeaways","tvm-take"]]}]});

QB = QB.concat([
 {tp:"tvm",sec:"g-tvm-pv",t:"mc",q:"Present value is:",a:"the current value of a future sum of money, given a rate of return",w:["what a sum today will be worth in the future","the interest earned on the principal only","the total of all future payments added together"],e:"Discounting converts future cash into present value."},
 {tp:"tvm",sec:"g-tvm-pv",t:"mc",q:"Which is NOT one of his three reasons a dollar today is worth more than a dollar in the future?",a:"Future dollars are taxed at a higher rate",w:["People have a bias toward present consumption","Money today can be invested to earn interest","Inflation erodes the value of money over time"],e:"His three: present bias, you could invest it, and inflation."},
 {tp:"tvm",sec:"g-tvm-pv",m:1,ap:true,t:"mc",q:"You are offered $1,000 today or $1,100 in one year. The interest rate is 3%, compounded annually. The present value of the $1,100 and the better choice are:",a:"$1,067.96, so wait for the $1,100",w:["$1,133.00, so wait for the $1,100","$1,067.96, so take the $1,000 today","$990.99, so take the $1,000 today"],e:"1,100 ÷ 1.03 = $1,067.96, which is more than $1,000."},
 {tp:"tvm",sec:"g-tvm-pv",m:1,ap:true,t:"mc",q:"You are offered $1,000 today or $1,100 in one year, and the interest rate is 11%, compounded annually. The present value of the $1,100 is:",a:"$990.99, so take the $1,000 today",w:["$1,221.00, so wait for the $1,100","$1,067.96, so wait for the $1,100","$1,089.00, so wait for the $1,100"],e:"1,100 ÷ 1.11 = $990.99 — the central principle: a higher rate, a lower PV."},
 {tp:"tvm",sec:"g-tvm-pv",t:"mc",q:"Holding the rate and the time the same, compounding more often (annual → monthly → continuous) makes the present value:",a:"smaller, since there is more discounting",w:["larger, since there is more interest","the same, since the rate did not change","smaller only when the rate is above 10%"],e:"$1,100 in 2 years at 3%: $1,036.17 quarterly, $1,036.02 monthly, $1,035.94 continuous."},
 {tp:"tvm",sec:"g-tvm-pv",t:"mc",q:"In the continuous-compounding formula PV = FV ÷ e^(i·t), e is:",a:"about 2.71828, the mathematical limit of continuous compounding",w:["the expected rate of inflation","the number of times interest is compounded each year","about 3.14159, the ratio of a circle’s circumference to its diameter"],e:"Euler’s number, found by people studying the upper limit of compound interest."},
 {tp:"tvm",sec:"g-tvm-pv",m:1,ap:true,t:"mc",q:"A pension pays $1,000 at the end of each of the next 3 years. The interest rate is 8%, compounded annually. Its present value is about:",a:"$2,577.10",w:["$3,000.00","$2,760.00","$3,240.00"],e:"925.93 + 857.34 + 793.83 = $2,577.10 — less than the $3,000 paid, lesson 1."},
 {tp:"tvm",sec:"g-tvm-pv",t:"mc",q:"According to the lecture, as interest rates fall, the value of investments:",a:"rises, because future cash flows are discounted less",w:["falls, because future cash flows are discounted more","stays the same, since cash flows don’t change","rises only if inflation also falls"],e:"Rates and asset values move inversely — “a fundamental concept.”"},
 {tp:"tvm",sec:"g-tvm-pv",t:"tf",q:"The sum of the present values of several cash flows is always less than the simple total of those cash flows (at a positive interest rate).",a:true,e:"True — his first lesson from discounting: $3,000 paid over three years is worth less than $3,000 today."},
 {tp:"tvm",sec:"g-tvm-pv",t:"tf",q:"In the present value formula, a 3% interest rate is entered as 3.",a:false,e:"False. The rate goes in as a decimal: 3% = 0.03. Entering 3 is the mistake he warned about."},

 {tp:"tvm",sec:"g-tvm-fv",t:"mc",q:"Compounding is:",a:"converting current dollars into future value",w:["converting future cash flows into present value","allocating an asset’s cost over its life","paying interest on the principal only"],e:"The opposite direction from discounting."},
 {tp:"tvm",sec:"g-tvm-fv",m:1,ap:true,t:"mc",q:"You invest $1,000 today at 3%, compounded annually, for 4 years. The future value is:",a:"$1,125.51",w:["$1,120.00","$888.49","$1,127.50"],e:"1,000 × 1.03⁴ = $1,125.51. ($1,120 is simple interest; $1,127.50 is continuous.)"},
 {tp:"tvm",sec:"g-tvm-fv",m:1,ap:true,t:"mc",q:"You invest $1,000 today at 3% for 4 years, compounded continuously. The future value is:",a:"$1,127.50",w:["$1,125.51","$1,127.33","$1,120.00"],e:"1,000 × e^(0.12) = $1,127.50 — the most any 3% compounding can give."},
 {tp:"tvm",sec:"g-tvm-fv",t:"mc",q:"Which change raises future value the most, holding everything else equal?",a:"A higher interest rate",w:["Switching from monthly to continuous compounding","Switching from quarterly to monthly compounding","Switching from annual to quarterly compounding"],e:"At 3% for 4 years, compounding changes FV by cents to a couple of dollars; 11% instead of 3% raises it from $1,125.51 to $1,518.07."},
 {tp:"tvm",sec:"g-tvm-fv",t:"mc",q:"The FV formula FV = PV × (1 + i/n)^(n·t) is:",a:"the present value formula rearranged",w:["the simple interest formula written another way","unrelated to the present value formula","the rule of 70 in exact form"],e:"Multiply both sides of PV = FV ÷ (1 + i/n)^(n·t) by the discount factor."},
 {tp:"tvm",sec:"g-tvm-fv",ap:true,t:"mc",q:"Using the rule of 70, money growing at 2% a year doubles in about:",a:"35 years",w:["70 years","140 years","20 years"],e:"70 ÷ 2 = 35. At 1% it takes 70 — small differences in growth compound into big ones."},
 {tp:"tvm",sec:"g-tvm-fv",t:"tf",q:"Holding the rate constant, compounding more often raises future value.",a:true,e:"True: $1,125.51 annual, $1,126.99 quarterly, $1,127.33 monthly, $1,127.50 continuous."},
 {tp:"tvm",sec:"g-tvm-fv",t:"tf",q:"Future value divides by (1 + i/n)^(n·t).",a:false,e:"False. Future value multiplies; present value divides. Send money forward and it grows."},

 {tp:"tvm",sec:"g-tvm-dep",t:"mc",q:"His official definition of depreciation is:",a:"the accounting process of allocating cost to the time period when an asset is consumed",w:["the fall in the value of money caused by inflation","the interest paid on a loan used to buy capital","the difference between the present and future value of an asset"],e:"More broadly, capital loses value through wear, obsolescence, and changes in human capital and institutions."},
 {tp:"tvm",sec:"g-tvm-dep",m:1,ap:true,t:"mc",q:"A mass spectrometer costs $50,000, is used for 10 years, and is then sold for $10,000. Straight-line depreciation is:",a:"$4,000 a year",w:["$5,000 a year","$6,000 a year","$1,000 a year"],e:"($50,000 − $10,000) ÷ 10 = $4,000. ($5,000 forgets the $10,000 sale.)"},
 {tp:"tvm",sec:"g-tvm-dep",t:"mc",q:"A new computer loses most of its value in its first year as faster processors arrive. This is:",a:"accelerated depreciation",w:["straight-line depreciation","appreciation","compounding"],e:"Faster at the start than the end."},
 {tp:"tvm",sec:"g-tvm-dep",t:"mc",q:"A used car’s price falls roughly in proportion to its miles, the same amount each year. This is:",a:"straight-line depreciation",w:["accelerated depreciation","continuous compounding","discounting"],e:"A constant rate each year, like his tractor."},
 {tp:"tvm",sec:"g-tvm-dep",t:"mc",q:"In his mass spectrometer example, what does he call the $40,000 difference between cost and sale price?",a:"The residual value",w:["The salvage value","The present value","The book value"],e:"Accounting classes call it the depreciable amount — but for this course, use his wording."},
 {tp:"tvm",sec:"g-tvm-dep",ap:true,t:"mc",q:"A tractor costs $80,000, lasts 8 years and sells for $16,000 at the end. Straight-line depreciation is:",a:"$8,000 a year",w:["$10,000 a year","$12,000 a year","$2,000 a year"],e:"($80,000 − $16,000) ÷ 8 = $8,000."},
 {tp:"tvm",sec:"g-tvm-dep",t:"tf",q:"Depreciation links the physical and financial economy: capital wears out, so investment is needed just to replace it.",a:true,e:"True — one of his takeaways, back to the depreciation line in Solow."},

 {tp:"tvm",sec:"g-tvm-risk",m:1,ap:true,t:"mc",q:"$100 is invested for 3 years at 5%. Simple and compound interest earned are:",a:"$15.00 and $15.76",w:["$15.00 and $15.00","$15.76 and $15.00","$1,500 and $1,576"],e:"Simple: 100 × .05 × 3 = 15. Compound: 100 × 1.05³ − 100 = 15.76. ($1,500 comes from writing 5 instead of .05.)"},
 {tp:"tvm",sec:"g-tvm-risk",m:1,ap:true,t:"mc",q:"$100 is invested for 40 years (age 25 to 65) at 5%. Simple and compound interest earned are:",a:"$200 and $604.00",w:["$200 and $200","$604.00 and $200","$2,000 and $6,040"],e:"100 × .05 × 40 = 200; 100 × 1.05⁴⁰ − 100 = 604.00. Over long periods the gap is dramatic."},
 {tp:"tvm",sec:"g-tvm-risk",t:"mc",q:"Compound interest is interest paid on:",a:"the principal plus any interest already earned",w:["the principal only","the interest only, not the principal","the principal minus inflation"],e:"Simple interest is on the principal only."},
 {tp:"tvm",sec:"g-tvm-risk",t:"mc",q:"Which ranks these from safest to riskiest, as in the lecture?",a:"Government bonds, corporate bonds, stocks",w:["Stocks, corporate bonds, government bonds","Corporate bonds, government bonds, stocks","Government bonds, stocks, corporate bonds"],e:"In a bankruptcy, stockholders are wiped out and bondholders are first in line."},
 {tp:"tvm",sec:"g-tvm-risk",t:"mc",q:"Which is one of his three investment takeaways?",a:"The value of any asset is inversely related to the expected interest rate",w:["The value of any asset rises one-for-one with the interest rate","Low interest rates are always good for the economy","Investors take more risk when interest rates are high"],e:"The other two: an asset’s value is the PV of its cash flows, and investors take risk more readily at lower rates."},
 {tp:"tvm",sec:"g-tvm-risk",t:"mc",q:"What does he mean by “the change in the interest rate is the effect, it’s not the cause”?",a:"Ask what moved the rate before judging whether it is good or bad",w:["Interest rates cause all changes in investment","Low interest rates are always good for growth","Only the central bank can change interest rates"],e:"A lower rate from more money supply means more investment; from less money demand, a very different outcome."},
 {tp:"tvm",sec:"g-tvm-risk",ap:true,t:"mc",q:"If interest rates rise, the lecture predicts:",a:"lower present values, fewer investments and slower GDP growth",w:["higher present values, more investments and faster GDP growth","no change in investment, since only prices matter","higher asset prices and more risk-taking"],e:"Higher rate → lower PV → fewer investments worth making → slower growth."},
 {tp:"tvm",sec:"g-tvm-risk",t:"tf",q:"Investors are more willing to take risk when interest rates are low.",a:true,e:"True — failing costs less when rates are low (losing $10 instead of $30)."},
 {tp:"tvm",sec:"g-tvm-risk",t:"tf",q:"Simple interest grows faster than compound interest over long periods.",a:false,e:"False. Over 40 years at 5%, $100 earns $200 simple but $604.00 compound."}
]);

/* ---- math practice with new numbers ---- */
PRACTICE_TOPICS.push(["tvm","Time Value"]);
TOPIC_LABEL.tvm = "Time Value";
var TVM_REMIND = "PV = FV ÷ (1 + i/n)^(n·t); FV = PV × (1 + i/n)^(n·t); continuous uses e^(i·t). The rate goes in as a decimal.";
function compWork(i, n, t){ return n === "c" ? "e^(" + num(i, 3) + " × " + t + ")" : "(1 + " + num(i, 3) + (n === 1 ? "" : "/" + n) + ")^" + (n === 1 ? t : "(" + n + " × " + t + ")"); }
GENS.push(
 {id:"tvm-pv", topic:"tvm", name:"Present value", variants:3, remind:TVM_REMIND,
  make:function(v){
   v = v || ri(1, 3);
   var fv = ri(8, 60) * 100, rate = rp([2, 3, 4, 5, 6, 8, 10, 12]), i = rate / 100, t = ri(1, 5), n = v === 1 ? 1 : (v === 2 ? rp([4, 12]) : "c");
   var pv = pvOf(fv, i, n, t);
   return {v:v, vals:{fv:fv, rate:rate, t:t, n:n}, text:"You will receive " + usd(fv) + " in " + t + (t === 1 ? " year" : " years") + ". The interest rate is " + rate + "%, compounded " + COMP_NAME[n] + ".",
    parts:[P("pv", "the present value", pv, 2, "$", "PV = " + num(fv) + " ÷ " + compWork(i, n, t) + " = " + usd2(rnd(pv, 2)) + ".",
      {wrong:[fvOf(fv, i, n, t), fv / (1 + rate * t), fv - fv * i * t, n === 1 ? pvOf(fv, i, 12, t) : pvOf(fv, i, 1, t)],
       setup:setupOf(num(fv) + " ÷ " + compWork(i, n, t), pv, [[num(fv) + " × " + compWork(i, n, t), fvOf(fv, i, n, t)], [num(fv) + " − " + num(fv) + " × " + num(i, 3) + " × " + t, fv - fv * i * t], [num(fv) + " ÷ (1 + " + rate + ")^" + t, fv / Math.pow(1 + rate, t)]])})]};
  }},
 {id:"tvm-fv", topic:"tvm", name:"Future value", variants:3, remind:TVM_REMIND,
  make:function(v){
   v = v || ri(1, 3);
   var pv = ri(5, 50) * 100, rate = rp([2, 3, 4, 5, 6, 8, 10, 11]), i = rate / 100, t = ri(2, 10), n = v === 1 ? 1 : (v === 2 ? rp([4, 12]) : "c");
   var fv = fvOf(pv, i, n, t);
   return {v:v, vals:{pv:pv, rate:rate, t:t, n:n}, text:"You invest " + usd(pv) + " today at " + rate + "%, compounded " + COMP_NAME[n] + ", for " + t + " years.",
    parts:[P("fv", "the future value", fv, 2, "$", "FV = " + num(pv) + " × " + compWork(i, n, t) + " = " + usd2(rnd(fv, 2)) + ".",
      {wrong:[pvOf(pv, i, n, t), pv + pv * i * t, n === 1 ? fvOf(pv, i, 12, t) : fvOf(pv, i, 1, t), pv * (1 + i * t) * 1.02],
       setup:setupOf(num(pv) + " × " + compWork(i, n, t), fv, [[num(pv) + " ÷ " + compWork(i, n, t), pvOf(pv, i, n, t)], [num(pv) + " + " + num(pv) + " × " + num(i, 3) + " × " + t, pv + pv * i * t], [num(pv) + " × (1 + " + rate + ")^" + t, pv * Math.pow(1 + rate, t)]])})]};
  }},
 {id:"tvm-flows", topic:"tvm", name:"Present value of several payments", remind:"Discount each payment on its own, then add them up.",
  make:function(){
   var c = ri(5, 30) * 100, rate = rp([3, 4, 5, 6, 8, 10]), i = rate / 100, k = ri(2, 4), sum = 0, work = [];
   for(var t = 1; t <= k; t++){ var d = c / Math.pow(1 + i, t); sum += d; work.push(num(c) + " ÷ " + num(1 + i, 2) + (t > 1 ? "^" + t : "") + " = " + usd2(rnd(d, 2))); }
   return {vals:{c:c, rate:rate, k:k}, text:"A contract pays " + usd(c) + " at the end of each of the next " + k + " years. The interest rate is " + rate + "%, compounded annually.",
    parts:[P("pv", "the present value of all the payments", sum, 2, "$", work.join("; ") + ". Total = " + usd2(rnd(sum, 2)) + ", less than the " + usd(c * k) + " paid.",
      {wrong:[c * k, c * k / (1 + i), c * k / Math.pow(1 + i, k), sum * (1 + i)]})]};
  }},
 {id:"tvm-simple", topic:"tvm", name:"Simple and compound interest", variants:2, remind:"Simple = P × i × t. Compound earned = P(1 + i)^t − P. The rate is a decimal.",
  make:function(v){
   v = v || ri(1, 2);
   var p = ri(1, 20) * 100, rate = rp([2, 3, 4, 5, 6, 8]), i = rate / 100, t = ri(2, 40), s = p * i * t, c = p * Math.pow(1 + i, t) - p;
   return {v:v, vals:{p:p, rate:rate, t:t}, text:usd(p) + " is invested for " + t + " years at " + rate + "% a year.",
    parts:[P("s", "the simple interest earned", s, 2, "$", num(p) + " × " + num(i, 2) + " × " + t + " = " + usd2(s) + ".", {wrong:[c, p * rate * t, s + p, p * i]}),
           P("c", "the compound interest earned", c, 2, "$", num(p) + " × " + num(1 + i, 2) + "^" + t + " − " + num(p) + " = " + usd2(rnd(c, 2)) + ".", {wrong:[s, c + p, p * Math.pow(1 + i, t - 1) - p, c * 1.1]})]};
  }},
 {id:"tvm-dep", topic:"tvm", name:"Straight-line depreciation", remind:"Yearly depreciation = (cost − sale value at the end) ÷ years.",
  make:function(){
   var y = rp([4, 5, 8, 10, 20]), per = ri(2, 12) * 500, sale = ri(1, 10) * 1000, cost = sale + per * y;
   return {vals:{cost:cost, sale:sale, y:y}, text:"A machine costs " + usd(cost) + ", is used for " + y + " years, and is then sold for " + usd(sale) + ".",
    parts:[P("d", "the straight-line depreciation each year", per, 0, "$", "(" + num(cost) + " − " + num(sale) + ") ÷ " + y + " = " + usd(per) + ".",
      {ask:"How much does it depreciate each year?", wrong:[cost / y, (cost + sale) / y, cost - sale, per * 2],
       setup:setupOf("(" + num(cost) + " − " + num(sale) + ") ÷ " + y, per, [[num(cost) + " ÷ " + y, cost / y], ["(" + num(cost) + " + " + num(sale) + ") ÷ " + y, (cost + sale) / y], [num(cost) + " − " + num(sale), cost - sale]])})]};
  }});
["tvm-pv","tvm-fv","tvm-flows","tvm-simple","tvm-dep"].forEach(function(id){ GENS.forEach(function(g){ if(g.id === id) GEN_BY_ID[id] = g; }); });
[{id:"lec-pv", gen:"tvm-pv", src:"Lecture example", make:function(){
   return {text:"You will receive $1,100 in the future. Find its present value in each case.",
    parts:[P("a", "PV: 1 year at 3%, annual", pvOf(1100, .03, 1, 1), 2, "$", "1,100 ÷ 1.03 = $1,067.96 — more than $1,000, so wait.", {wrong:[1133, 990.99, 1067]}),
           P("b", "PV: 1 year at 11%, annual", pvOf(1100, .11, 1, 1), 2, "$", "1,100 ÷ 1.11 = $990.99 — less than $1,000, so take the money now.", {wrong:[1221, 1067.96, 979]}),
           P("c", "PV: 2 years at 3%, quarterly", pvOf(1100, .03, 4, 2), 2, "$", "1,100 ÷ 1.0075⁸ = $1,036.17.", {wrong:[1036.02, 1035.94, 1067.96]}),
           P("d", "PV: 2 years at 3%, continuous", pvOf(1100, .03, "c", 2), 2, "$", "1,100 ÷ e^0.06 = $1,035.94 — the lower limit.", {wrong:[1036.17, 1036.02, 1033.02]})]};
  }},
 {id:"lec-fv", gen:"tvm-fv", src:"Lecture example", make:function(){
   return {text:"You invest $1,000 today for 4 years. Find the future value in each case.",
    parts:[P("a", "FV at 3%, annual", fvOf(1000, .03, 1, 4), 2, "$", "1,000 × 1.03⁴ = $1,125.51.", {wrong:[1120, 1127.5, 888.49]}),
           P("b", "FV at 11%, annual", fvOf(1000, .11, 1, 4), 2, "$", "1,000 × 1.11⁴ = $1,518.07.", {wrong:[1440, 1125.51, 658.73]}),
           P("c", "FV at 3%, monthly", fvOf(1000, .03, 12, 4), 2, "$", "1,000 × 1.0025⁴⁸ = $1,127.33.", {wrong:[1125.51, 1126.99, 1120]}),
           P("d", "FV at 3%, continuous", fvOf(1000, .03, "c", 4), 2, "$", "1,000 × e^0.12 = $1,127.50 — the most 3% can give.", {wrong:[1125.51, 1127.33, 1120]})]};
  }},
 {id:"lec-flows", gen:"tvm-flows", src:"Lecture example", make:function(){
   var s = 1000 / 1.08 + 1000 / Math.pow(1.08, 2) + 1000 / Math.pow(1.08, 3);
   return {text:"A pension pays $1,000 at the end of each of the next 3 years. The interest rate is 8%, compounded annually.",
    parts:[P("pv", "the present value of the three payments", s, 2, "$", "925.93 + 857.34 + 793.83 = $2,577.10 — less than the $3,000 paid.", {wrong:[3000, 2777.78, 2381.50]})]};
  }},
 {id:"lec-dep", gen:"tvm-dep", src:"Lecture example", make:function(){
   return {text:"A mass spectrometer costs $50,000, is used for 10 years, and is then sold for $10,000.",
    parts:[P("d", "the straight-line depreciation each year", 4000, 0, "$", "($50,000 − $10,000) ÷ 10 = $4,000.", {ask:"How much does it depreciate each year?", wrong:[5000, 6000, 40000]})]};
  }},
 {id:"lec-simple", gen:"tvm-simple", src:"Lecture example", make:function(){
   return {text:"$100 is invested at 5% a year.",
    parts:[P("s3", "the simple interest over 3 years", 15, 2, "$", "100 × .05 × 3 = $15.00.", {wrong:[15.76, 1500, 5]}),
           P("c3", "the compound interest over 3 years", 100 * Math.pow(1.05, 3) - 100, 2, "$", "100 × 1.05³ − 100 = $15.76.", {wrong:[15, 115.76, 1576]}),
           P("s40", "the simple interest over 40 years", 200, 2, "$", "100 × .05 × 40 = $200.", {wrong:[604, 2000, 300]}),
           P("c40", "the compound interest over 40 years", 100 * Math.pow(1.05, 40) - 100, 2, "$", "100 × 1.05⁴⁰ − 100 = $604.00.", {wrong:[200, 704, 540]})]};
  }}].forEach(function(f){ f.topic = GEN_BY_ID[f.gen].topic; FIXED.push(f); FIXED_BY_ID[f.id] = f; });
