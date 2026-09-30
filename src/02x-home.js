/* ================================================================ home, graphs and the schedule
   The schedule (from the syllabus and Canvas), his common mistakes (collected from
   the lectures), the seven exam graphs, and two more graph drills.            */
var SCHEDULE = [
 {d:"2026-10-01T12:30", k:"Reading quiz", t:"#10 · A Christian Approach to Interest", rd:"rq10"},
 {d:"2026-10-03T17:00", k:"Problem set", t:"Problem Set 5 · Loanable funds", ch:"lf", px:"interest"},
 {d:"2026-10-06T12:30", k:"Reading quiz", t:"#11 · From Usury to Interest", rd:"rq11"},
 {d:"2026-10-08T17:00", k:"Problem set", t:"Problem Set 6 · Liquidity preference", ch:"money", px:"interest"},
 {d:"2026-10-10T17:00", k:"Problem set", t:"Problem Set 7 · Time value of money", ch:"tvm", px:"tvm"},
 {d:"2026-10-13T12:30", k:"Reading quiz", t:"#12 · The Morality of Fractional Reserve Banking", rd:"rq12"},
 {d:"2026-10-15T17:00", k:"Problem set", t:"Problem Set 8 · Banking and the money multiplier", ch:"bank", px:"banking"},
 {d:"2026-10-22T17:00", k:"Problem set", t:"Problem Set 9 · The Fed I (mandate, structure)", ch:"fed", px:"fed"},
 {d:"2026-10-29T12:30", k:"Reading quiz", t:"#13 · Inflation is the Enemy of Justice", rd:"rq13"},
 {d:"2026-10-29T17:00", k:"Problem set", t:"Problem Set 10 · The Fed II–III (tools, reserves)", ch:"fed", px:"fed"},
 {d:"2026-11-05T12:30", k:"Reading quiz", t:"#14 · Is Inflation Too Low?", rd:"rq14"},
 {d:"2026-11-05T17:00", k:"Problem set", t:"Problem Set 11 · Money growth and inflation", ch:"qtm", px:"qtm"},
 {d:"2026-11-07T17:00", k:"Problem set", t:"Problem Set 12 · Inflation and deflation", ch:"infl", px:"infl"},
 {d:"2026-11-10T12:30", k:"Exam", t:"Exam 2 · Oct 1 – Nov 5 · 33 questions, 75 minutes", exam:"exam2"},
 {d:"2026-11-12T12:30", k:"Reading quiz", t:"#15 · The Dynamic and Righteous Use of Wealth in James 5", rd:"rq15"},
 {d:"2026-11-14T17:00", k:"Problem set", t:"Problem Set 13 · Fiscal policy", ch:"fiscal", px:"fiscal"},
 {d:"2026-11-19T12:30", k:"Reading quiz", t:"#16 · “Christian” Economics", rd:"rq16"},
 {d:"2026-11-19T17:00", k:"Problem set", t:"Problem Set 14 · Phillips curve (answers hidden)", ch:"phillips", px:"phillips"},
 {d:"2026-11-26T17:00", k:"Problem set", t:"Problem Set 15 · Business cycles and AD–AS", ch:"adas", px:"adas"},
 {d:"2026-12-05T17:00", k:"Problem set", t:"Problem Set 16 · 3 questions, 60 minutes", ch:"adas", px:"adas"},
 {d:"2026-12-08T10:30", k:"Exam", t:"Final · cumulative · 40 questions, 120 minutes", exam:"final"}];

var MISTAKES = [
 "Dropping the $ sign on a dollar answer — including per capita (Exam 1 Q17, Problem Set 2 Q3).",
 "Putting $ or % on unitless numbers: the CPI, the GDP deflator, velocity, the money multiplier, the MPC and fiscal multipliers.",
 "Putting the wrong year on the bottom of a growth or inflation rate — it’s the earlier year, and not always 100.",
 "Writing 5 instead of .05 for a rate inside a formula.",
 "Dividing unemployed by the adult population — the unemployment rate divides by the labor force.",
 "Confusing a movement along a curve (a price or rate change) with a shift of the curve.",
 "Mixing up loanable funds and liquidity preference: real vs nominal rate, long vs short run, saving vs money supply. “The biggest mistake.”",
 "Reasoning from a price change: a lower rate doesn’t tell you whether investment rose — ask what shifted.",
 "Treating economic investment (new capital) as financial investment (stocks and bonds).",
 "Thinking imports lower GDP, or reading Y = C + I + G + NX as a causal theory.",
 "Confusing government purchases with government spending (spending includes transfers).",
 "Confusing M1 with the monetary base, or money with income or wealth.",
 "Treating the Fed like a commercial bank, or the fed funds rate (bank to bank) like the discount rate (bank to Fed).",
 "Shifting SRAS right when inflation expectations rise — it shifts left (up).",
 "Shifting only the LRPC after a supply shock — the SRPC must shift too.",
 "Mixing directions across models: higher productivity moves the Phillips LRPC left but the AD–AS LRAS right.",
 "Forgetting the minus sign on a tax cut in the tax multiplier, or on a deficit in public saving.",
 "Answering “not necessarily” on a true / false / uncertain question — start with True, False or Uncertain (Exam 1 Q38)."];

var GRAPHS = [
 ["Solow model", "Output, investment, depreciation", "Capital (K)", "Output Y = A√K and investment sY (both bend); depreciation δK (straight)", "Steady state where I = D. Technology up shifts output and investment up; the savings rate moves only investment.", "Final"],
 ["Loanable funds", "Real interest rate", "Quantity of loanable funds", "Supply = saving (up); demand = investment (down)", "Saving up → S right, r down. Deficit → S left, r up: crowding out. Profits, technology, R&D credit → D right.", "Exam 2, Final"],
 ["Liquidity preference", "Nominal interest rate", "Quantity of money", "Money supply vertical; money demand down", "MD up (income, prices): n up, Q same. MS up: n down, Q up (short run).", "Exam 2, Final"],
 ["Market for reserves — scarce", "Federal funds rate", "Quantity of reserves", "Supply vertical then flat at the discount rate; demand down, then flat at IORB", "Supply meets the sloped part: only OMO moves the fed funds rate.", "Exam 2, Final"],
 ["Market for reserves — abundant", "Federal funds rate", "Quantity of reserves", "Same curves", "Supply meets the flat part: OMO/QE move only quantity; IOR (ceiling) and reverse repos (floor) move the rate.", "Exam 2, Final"],
 ["Money supply–money demand", "Value of money (1/P); price level inverted", "Quantity of money", "Money supply vertical; money demand down", "MS up: P up, value down, Q up. MD up: P down, value up, Q same.", "Exam 2, Final"],
 ["Phillips curve", "Inflation rate", "Unemployment rate", "SRPC down; LRPC vertical at the natural rate", "Spending moves you along the SRPC; expectations shift it; supply shocks shift both.", "Final"],
 ["AD–AS", "Inflation rate", "Real GDP growth rate", "LRAS vertical; SRAS up; AD down", "AD: M, V, C, I, G, NX. LRAS: real factors only. Expectations up → SRAS left. Negative supply shock → stagflation.", "Final"]];

/* the Solow diagram: output and investment bend (diminishing returns), depreciation is a straight line */
function solowGraph(cap, techUp){
  function curve(f, cls, lab){
    var out = [], prev = null;
    for(var x = 2; x <= 94; x += 4){ var pt = [x, Math.min(97, f(x))]; if(prev) out.push({a:prev, b:pt, cls:cls}); prev = pt; }
    out[out.length - 1].lab = lab;
    return out;
  }
  var Y = function(x){ return 9 * Math.sqrt(x); }, I = function(x){ return 0.45 * Y(x); };
  var lines = curve(Y, "", "Y = A√K").concat(curve(I, "", "I = sY"));
  lines.push({a:[0, 0], b:[88, 44], lab:"D = δK", lx:74, ly:44});
  var pts = [{x:65.6, y:32.8, xl:"K*"}];
  if(techUp){
    var Y2 = function(x){ return 1.15 * Y(x); }, I2 = function(x){ return 0.45 * Y2(x); };
    lines = lines.concat(curve(Y2, "new dash", "Y₂"), curve(I2, "new dash", ""));
    pts.push({x:86.8, y:43.4, cls:"new", xl:"K*₂"});
  }
  return gfx({cap:cap, x:"Capital (K)", y:"Output, investment, depreciation", lines:lines, pts:pts});
}

/* two more graph drills; the drill pool is every generator marked graph:true */
var SOLOW_EVENTS = [
 ["Technology improves (A rises).", 0], ["The country saves a larger share of its income.", 1],
 ["Machines wear out faster (the depreciation rate rises).", 2], ["The country adds more capital, moving toward the steady state.", 3]];
var SOLOW_OPTS = ["Output and investment curves shift up; steady-state capital and output rise", "Only the investment curve shifts up; steady-state capital and output rise", "The depreciation line gets steeper; steady-state capital and output fall", "No curve shifts; the economy moves along the curves (catch-up growth)"];
var VOM_EVENTS = [["The Fed carries out quantitative easing.", 0], ["The Fed shrinks the money supply.", 1], ["Incomes rise, so money demand rises.", 2], ["Households decide to hold less money, so money demand falls.", 3]];
var VOM_OPTS = ["The price level rises, the value of money falls, the quantity of money rises", "The price level falls, the value of money rises, the quantity of money falls", "The price level falls, the value of money rises, the quantity is unchanged", "The price level rises, the value of money falls, the quantity is unchanged"];
GENS.push(
 {id:"sol-shift", topic:"solow", name:"Solow graph: what shifts?", graph:true, remind:"Technology moves output and investment. The savings rate moves only investment. Depreciation moves the D line. Adding capital is a move along.",
  make:function(){ var s = rp(SOLOW_EVENTS); return {vals:{}, text:s[0], choice:{q:"What happens on the Solow graph?", opts:SOLOW_OPTS.slice(), right:s[1], work:SOLOW_OPTS[s[1]] + "."}}; }},
 {id:"vom-shift", topic:"qtm", name:"Value-of-money graph: what happens?", graph:true, remind:"Money supply is vertical. Value of money = 1/P, so they always move opposite ways. A demand shift doesn’t change the quantity.",
  make:function(){ var s = rp(VOM_EVENTS); return {vals:{}, text:s[0], choice:{q:"What happens in the money supply–money demand graph?", opts:VOM_OPTS.slice(), right:s[1], work:VOM_OPTS[s[1]] + "."}}; }});
GEN_BY_ID["sol-shift"] = GENS[GENS.length - 2]; GEN_BY_ID["vom-shift"] = GENS[GENS.length - 1];
["lf-shift","lp-shift","fed-rsv","pc-shift","adas-sr","adas-lr"].forEach(function(id){ if(GEN_BY_ID[id]) GEN_BY_ID[id].graph = true; });
