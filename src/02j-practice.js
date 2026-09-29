/* ================================================================ math practice
   Fresh numbers every time. Each generator builds one scenario and everything
   that can be asked about it; the formatter turns that into a typed answer, a
   several-part problem, multiple choice, true/false, or "which calculation".
   The professor's class exercises and the problem-set examples are here too,
   with their exact numbers (FIXED).                                            */
var GEN_SEQ = 0;
var PRACTICE_TOPICS = [["all","Everything"],["gdp","GDP"],["growth","Growth"],["solow","Solow"],["labor","Labor"],["prices","Prices"],["saving","Saving"]];
var TOPIC_LABEL = {gdp:"GDP", growth:"Growth", solow:"Solow", labor:"Labor", prices:"Prices", saving:"Saving"};
var FMT_LABEL = {type:"Type the answer", multi:"Several parts", mc:"Multiple choice", tf:"True or false", setup:"Which calculation?", choice:"Choose"};

/* ---------- numbers ---------- */
function ri(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
function rp(list){ return list[Math.floor(Math.random() * list.length)]; }
function rnd(x, d){ var f = Math.pow(10, d || 0), s = x < 0 ? -1 : 1; var r = s * Math.round((Math.abs(x) + 1e-9) * f) / f; return r === 0 ? 0 : r; }
function commas(n, d){ var s = Math.abs(n).toFixed(d || 0).split("."); s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); return (n < 0 ? "−" : "") + s.join("."); }
function num(v, d){ var s = commas(v, d === undefined ? 2 : d); return s.indexOf(".") >= 0 ? s.replace(/0+$/, "").replace(/\.$/, "") : s; }
function usd(v){ var c = Math.round(Math.abs(v) * 100); return (v < 0 && c ? "−" : "") + "$" + commas(c / 100, c % 100 ? 2 : 0); }
function usd2(v){ return (v < 0 ? "−" : "") + "$" + commas(Math.abs(v), 2); }
function big(v){ if(v >= 1e9) return "$" + num(v / 1e9, 3) + " billion"; if(v >= 1e6) return "$" + num(v / 1e6, 3) + " million"; return usd(v); }
function dec(p){ return (p / 100).toFixed(2); }
function cap(s){ return s.charAt(0).toUpperCase() + s.slice(1); }
function show(v, unit, d){
  d = d === undefined ? 2 : d;
  v = rnd(v, d);
  if(unit === "$") return usd(v);
  if(unit === "%") return num(v, d) + "%";
  if(unit === "yr") return num(v, d) + (rnd(v, d) === 1 ? " year" : " years");
  return num(v, d);
}
function tbl(head, rows){
  return '<div class="tblwrap"><table class="tbl fit ptbl"><thead><tr>' + head.map(function(h){ return '<th>' + h + '</th>'; }).join("") + '</tr></thead><tbody>' +
    rows.map(function(r){ return '<tr>' + r.map(function(c, i){ return '<td class="' + (i ? 'sm' : 'head') + '">' + c + '</td>'; }).join("") + '</tr>'; }).join("") + '</tbody></table></div>';
}
/* one thing that can be asked: its name, its answer, how it is rounded, and the one-line working */
function P(key, name, a, d, unit, work, x){
  var p = {key:key, name:name, a:rnd(a, d), d:d, unit:unit, work:work};
  if(x){ for(var k in x){ if(x.hasOwnProperty(k) && x[k] !== undefined) p[k] = x[k]; } }
  return p;
}
/* "which calculation" options: the wrong ones must not happen to give the right number */
function setupOf(right, rightVal, pairs){
  var seen = {}, wrong = []; seen[right] = 1;
  pairs.forEach(function(pr){ if(!seen[pr[0]] && Math.abs(pr[1] - rightVal) > Math.max(1e-6, Math.abs(rightVal) * 0.08)){ seen[pr[0]] = 1; wrong.push(pr[0]); } });
  return wrong.length >= 3 ? {right:right, wrong:wrong.slice(0, 3)} : undefined;
}

/* ---------- reading what was typed ---------- */
function parseAnswer(s){
  s = String(s === undefined || s === null ? "" : s).trim();
  if(!s) return null;
  var neg = /^[\s$]*[-−–—]/.test(s) || /^\(.*\)$/.test(s);
  var mult = /billion|\bbn\b/i.test(s) ? 1e9 : (/million|\bmil\b/i.test(s) ? 1e6 : 1);
  var t = s.replace(/[^0-9.]/g, "");
  if(!/\d/.test(t) || (t.match(/\./g) || []).length > 1) return null;
  var v = parseFloat(t) * mult;
  return neg ? -v : v;
}
/* how close a typed answer must be: exact for whole numbers, one step in the last decimal otherwise */
function tolOf(p){ return p.d ? 1.001 * Math.pow(10, -p.d) + 1e-9 : 0.5; }
function checkPart(input, p){
  var raw = String(input === undefined || input === null ? "" : input).trim();
  if(p.kind === "word"){
    var w = raw.toLowerCase().replace(/[^a-z]/g, "");
    if(!w) return {ok:false, blank:true};
    return {ok:p.accept.indexOf(w) >= 0};
  }
  var v = parseAnswer(raw);
  if(v === null) return {ok:false, blank:!raw};
  var tol = tolOf(p);
  if(Math.abs(v - p.a) <= tol) return {ok:true};
  if(p.unit === "%" && p.a !== 0 && Math.abs(v * 100 - p.a) <= tol) return {ok:false, slip:"decimal"};
  if(p.a !== 0 && Math.abs(v + p.a) <= tol) return {ok:false, slip:"sign"};
  return {ok:false};
}

/* ================================================================ the generators */
var GOODS2 = [["hot dogs","hamburgers"],["shirts","hats"],["apples","pears"],["pizzas","sodas"],["books","pens"],["crystals","pearls"],["lamps","chairs"]];
var CHAINS = [["A farmer sells wheat to a miller","The miller sells flour to a baker","The baker sells bread to customers","miller","baker"],
              ["A farmer sells apples to a cider maker","The cider maker sells cider to an innkeeper","The innkeeper sells it to guests","cider maker","innkeeper"],
              ["A grower sells cotton to a weaver","The weaver sells cloth to a tailor","The tailor sells shirts to shoppers","weaver","tailor"],
              ["A logger sells timber to a sawmill","The sawmill sells lumber to a carpenter","The carpenter sells tables to families","sawmill","carpenter"]];
var BASKET = [["gallons of milk","milk (per gallon)",10,20,0.25],["shirts","one shirt",24,60,0.5],["loaves of bread","one loaf of bread",8,20,0.25],["movie tickets","one movie ticket",16,32,0.5],
              ["jackets","one jacket",8,18,5],["pizzas","one pizza",16,40,0.5],["books","one book",10,30,1],["apples","one apple",2,8,0.25]];
var SOLOW_STEPS = "Y = A × √K → I = s × Y → C = Y − I → D = δ × K. If I is bigger than D, capital grows. A percent goes in as a decimal: 10% = 0.10.";

var GENS = [
 /* ------------------------------------------------ GDP */
 {id:"gdp-sum", topic:"gdp", name:"GDP from its parts", row:"gdp", variants:5,
  remind:"GDP = C + I + G + (X − M). Transfers stay out. Imports are subtracted.",
  make:function(v){
   v = v || ri(1, 5);
   var C = ri(20, 90) * 100, I = ri(5, 30) * 100, G = ri(5, 30) * 100, X = ri(2, 15) * 100, M = ri(2, 15) * 100, Tr = ri(2, 9) * 100, share = 0;
   if(X === M) M += 100;
   if(v === 2){ share = rp([10, 20, 25, 30, 40, 50]); I = C * share / 100; }
   var gdp = C + I + G + X - M, nx = X - M;
   var cig = num(C) + " + " + num(I) + " + " + num(G), sum = cig + " + (" + num(X) + " − " + num(M) + ")";
   var b = {v:v, vals:{C:C, I:I, G:G, X:X, M:M, Tr:Tr}};
   if(v <= 2){
    b.text = "Consumption is " + usd(C) + ". " + (v === 2 ? "Investment is " + share + "% of consumption. " : "Investment is " + usd(I) + ". ") + "Government purchases are " + usd(G) + ", transfer payments are " + usd(Tr) + ", exports are " + usd(X) + " and imports are " + usd(M) + ".";
    b.parts = [P("gdp", "GDP", gdp, 0, "$", (v === 2 ? "I = " + share + "% of " + num(C) + " = " + num(I) + ". " : "") + sum + " = " + usd(gdp) + ". Transfers stay out.",
      {wrong:[gdp + Tr, C + I + G + X + M, C + I + G, gdp - Tr], setup:{right:sum, wrong:[sum + " + " + num(Tr), cig + " + (" + num(M) + " − " + num(X) + ")", cig + " + " + num(X) + " + " + num(M)]}})];
   } else if(v === 3){
    b.text = "GDP is " + usd(gdp) + ". Consumption is " + usd(C) + ", investment is " + usd(I) + ", exports are " + usd(X) + ", imports are " + usd(M) + " and transfer payments are " + usd(Tr) + ".";
    b.parts = [P("G", "government purchases", G, 0, "$", "Net exports = " + num(X) + " − " + num(M) + " = " + num(nx) + ". G = " + num(gdp) + " − " + num(C) + " − " + num(I) + " − (" + num(nx) + ") = " + usd(G) + ".",
      {are:true, ask:"What are government purchases (G)?", wrong:[gdp - C - I, gdp - C - I - X - M, G - Tr, G + Tr, gdp - C - I + nx]})];
   } else if(v === 4){
    b.text = "GDP is " + usd(gdp) + ". Consumption is " + usd(C) + ", investment is " + usd(I) + " and government purchases are " + usd(G) + ".";
    b.parts = [P("nx", "net exports", nx, 0, "$", num(gdp) + " − " + num(C) + " − " + num(I) + " − " + num(G) + " = " + usd(nx) + ".",
      {are:true, signed:true, ask:"What are net exports (X − M)?", wrong:[-nx, gdp - C - I, nx + G, nx * 2]})];
   } else {
    b.text = "GDP is " + usd(gdp) + ". Consumption is " + usd(C) + ", investment is " + usd(I) + ", government purchases are " + usd(G) + " and exports are " + usd(X) + ".";
    b.parts = [P("M", "imports", M, 0, "$", "Net exports = " + num(gdp) + " − " + num(C) + " − " + num(I) + " − " + num(G) + " = " + num(nx) + ". Imports = " + num(X) + " − (" + num(nx) + ") = " + usd(M) + ".",
      {are:true, wrong:[X + nx, Math.abs(nx), gdp - C - I - G + X + X, M + X]})];
   }
   return b;
  }},

 {id:"gdp-real", topic:"gdp", name:"Nominal and real GDP", row:"real",
  remind:"Nominal = that year’s prices × that year’s quantities. Real = base-year prices × that year’s quantities. In the base year, real = nominal.",
  make:function(){
   var g = rp(GOODS2), y1 = rp([2021, 2022, 2023, 2024]), y2 = y1 + 1, base = rp([y1, y1, y2]);
   var p1 = [ri(1, 9), ri(2, 20)], q1 = [ri(5, 30) * 10, ri(3, 20) * 10];
   var p2 = [p1[0] + ri(0, 3), p1[1] + ri(1, 4)], q2 = [Math.max(10, q1[0] + ri(-2, 10) * 10), Math.max(10, q1[1] + ri(-2, 8) * 10)];
   if(q2[0] === q1[0] && q2[1] === q1[1]) q2[0] += 20;
   var Pr = {}, Q = {}; Pr[y1] = p1; Pr[y2] = p2; Q[y1] = q1; Q[y2] = q2;
   function val(py, qy){ return Pr[py][0] * Q[qy][0] + Pr[py][1] * Q[qy][1]; }
   function ex(py, qy){ return num(Pr[py][0]) + " × " + num(Q[qy][0]) + " + " + num(Pr[py][1]) + " × " + num(Q[qy][1]); }
   function other(y){ return y === y1 ? y2 : y1; }
   var parts = [];
   [y1, y2].forEach(function(y, i){
    parts.push(P("nom" + (i + 1), "nominal GDP in " + y, val(y, y), 0, "$", y + " prices × " + y + " quantities: " + ex(y, y) + " = " + usd(val(y, y)) + ".",
      {wrong:[val(base, y), val(y, other(y)), val(other(y), other(y)), val(other(y), y)],
       setup:setupOf(ex(y, y), val(y, y), [[ex(other(y), y), val(other(y), y)], [ex(y, other(y)), val(y, other(y))], [ex(other(y), other(y)), val(other(y), other(y))]])}));
   });
   [y1, y2].forEach(function(y, i){
    parts.push(P("real" + (i + 1), "real GDP in " + y, val(base, y), 0, "$", (y === base ? y + " is the base year, so real = nominal: " : base + " prices × " + y + " quantities: ") + ex(base, y) + " = " + usd(val(base, y)) + ".",
      {wrong:[val(y, y), val(y, base), val(other(base), other(y)), val(other(base), y), val(base, other(y))],
       setup:setupOf(ex(base, y), val(base, y), [[ex(other(base), y), val(other(base), y)], [ex(base, other(y)), val(base, other(y))], [ex(other(base), other(y)), val(other(base), other(y))]])}));
   });
   return {vals:{y1:y1, y2:y2, base:base, p1:p1, p2:p2, q1:q1, q2:q2},
     text:tbl(["Year", "Price of " + g[0], "Quantity of " + g[0], "Price of " + g[1], "Quantity of " + g[1]], [[y1, usd(p1[0]), num(q1[0]), usd(p1[1]), num(q1[1])], [y2, usd(p2[0]), num(q2[0]), usd(p2[1]), num(q2[1])]]) + "The base year is " + base + ".",
     parts:parts};
  }},

 {id:"gdp-chain", topic:"gdp", name:"Final sale and value added", row:"counts",
  remind:"Only the final sale counts in GDP. Value added = sale price − cost of inputs. Total sales are bigger than GDP.",
  make:function(){
   var c = rp(CHAINS), s1 = ri(2, 12) * 10, s2 = s1 + ri(2, 12) * 10, s3 = s2 + ri(3, 20) * 10;
   return {vals:{s1:s1, s2:s2, s3:s3},
    text:c[0] + " for " + usd(s1) + ". " + c[1] + " for " + usd(s2) + ". " + c[2] + " for " + usd(s3) + ".",
    parts:[
     P("gdp", "the rise in GDP", s3, 0, "$", "Only the final sale counts: " + usd(s3) + ".", {ask:"By how much does GDP rise?", claim:"GDP rises by", wrong:[s1 + s2 + s3, s2 + s3, s3 - s1, s3 - s2]}),
     P("sales", "total sales", s1 + s2 + s3, 0, "$", num(s1) + " + " + num(s2) + " + " + num(s3) + " = " + usd(s1 + s2 + s3) + " — bigger than GDP.", {are:true, ask:"What are total sales in this chain?", wrong:[s3, s2 + s3, s1 + s2, s3 - s1]}),
     P("va2", "the value added by the " + c[3], s2 - s1, 0, "$", num(s2) + " − " + num(s1) + " = " + usd(s2 - s1) + ".", {wrong:[s2, s1, s3 - s2, s1 + s2]}),
     P("va3", "the value added by the last seller", s3 - s2, 0, "$", num(s3) + " − " + num(s2) + " = " + usd(s3 - s2) + ".", {wrong:[s3, s2, s3 - s1, s2 - s1]}),
     P("vasum", "the sum of the value added at all three stages", s3, 0, "$", num(s1) + " + " + num(s2 - s1) + " + " + num(s3 - s2) + " = " + usd(s3) + " — the same as the final sale.", {wrong:[s1 + s2 + s3, s3 - s1, s2 + s3, s2]})]};
  }},

 {id:"gdp-deflator", topic:"gdp", name:"GDP deflator", row:"defl", variants:4,
  remind:"Deflator = nominal GDP ÷ real GDP × 100. N before R: nominal goes on top.",
  make:function(v){
   v = v || ri(1, 4);
   var R = ri(2, 40) * 100, D = rp([80, 90, 105, 110, 120, 125, 140, 150, 160, 200]), N = R * D / 100, b = {v:v};
   if(v === 4){ R = ri(200, 900); N = R + ri(10, 250); D = N / R * 100; }
   b.vals = {N:N, R:R};
   if(v === 1 || v === 4){
    b.text = "Nominal GDP is " + usd(N) + " and real GDP is " + usd(R) + ".";
    b.parts = [P("D", "the GDP deflator", N / R * 100, 2, "", num(N) + " ÷ " + num(R) + " × 100 = " + num(N / R * 100) + ".",
      {wrong:[R / N * 100, (N - R) / R * 100, N - R, N / R], setup:setupOf(num(N) + " ÷ " + num(R) + " × 100", N / R * 100, [[num(R) + " ÷ " + num(N) + " × 100", R / N * 100], ["(" + num(N) + " − " + num(R) + ") ÷ " + num(R) + " × 100", (N - R) / R * 100], [num(N) + " − " + num(R), N - R], [num(N) + " × " + num(R) + " ÷ 100", N * R / 100]])})];
   } else if(v === 2){
    b.text = "The GDP deflator is " + num(D) + " and real GDP is " + usd(R) + ".";
    b.parts = [P("N", "nominal GDP", N, 0, "$", "Nominal = deflator × real ÷ 100 = " + num(D) + " × " + num(R) + " ÷ 100 = " + usd(N) + ".", {wrong:[R / D * 100, R + D, R * D, R - (N - R)]})];
   } else {
    b.text = "The GDP deflator is " + num(D) + " and nominal GDP is " + usd(N) + ".";
    b.parts = [P("R", "real GDP", R, 0, "$", "Real = nominal ÷ deflator × 100 = " + num(N) + " ÷ " + num(D) + " × 100 = " + usd(R) + ".", {wrong:[N * D / 100, N - D, N / D, N + (N - R)]})];
   }
   return b;
  }},

 /* ------------------------------------------------ growth */
 {id:"gro-percap", topic:"growth", name:"GDP per capita", variants:3,
  remind:"GDP per capita = real GDP ÷ population. Write out the full numbers first: $50 million = 50,000,000.",
  make:function(v){
   v = v || ri(1, 3);
   var pc = ri(4, 120) * 500, pop = rp([10000, 20000, 25000, 40000, 50000, 100000, 200000, 250000, 500000, 1000000, 2000000]), gdp = pc * pop, b = {v:v, vals:{pc:pc, pop:pop, gdp:gdp}};
   if(v === 1){
    b.text = "Real GDP is " + big(gdp) + " and the population is " + num(pop) + ".";
    b.parts = [P("pc", "GDP per capita", pc, 0, "$", num(gdp) + " ÷ " + num(pop) + " = " + usd(pc) + ".", {wrong:[pc * 10, pc / 10, pc * 100, pc / 100],
      setup:{right:num(gdp) + " ÷ " + num(pop), wrong:[num(pop) + " ÷ " + num(gdp), num(gdp) + " × " + num(pop), num(gdp) + " − " + num(pop)]}})];
   } else if(v === 2){
    b.text = "GDP per capita is " + usd(pc) + " and the population is " + num(pop) + ".";
    b.parts = [P("gdp", "real GDP", gdp, 0, "$", usd(pc) + " × " + num(pop) + " = " + usd(gdp) + ".", {ask:"What is real GDP? Type the full number.", wrong:[gdp * 10, gdp / 10, gdp / 100, gdp * 100]})];
   } else {
    b.text = "Real GDP is " + big(gdp) + " and GDP per capita is " + usd(pc) + ".";
    b.parts = [P("pop", "the population", pop, 0, "", num(gdp) + " ÷ " + num(pc) + " = " + num(pop) + ".", {ask:"How many people live there?", wrong:[pop * 10, pop / 10, pop * 100, pop / 100]})];
   }
   return b;
  }},

 {id:"gro-pcgrowth", topic:"growth", name:"Growth of GDP and GDP per capita",
  remind:"Per capita = real GDP ÷ population, for each year. Growth = (new − old) ÷ old × 100. GDP can rise while each person gets poorer.",
  make:function(){
   var pc1 = ri(2, 20) * 1000, g = rp([-40, -25, -20, -10, 10, 20, 25, 50]), pc2 = pc1 * (1 + g / 100), pop1 = rp([10000, 20000, 40000, 50000]), pop2 = pop1 * rp([1, 1.25, 1.5, 2]);
   var g1 = pc1 * pop1, g2 = pc2 * pop2, gg = (g2 - g1) / g1 * 100;
   var parts = [
    P("pc1", "GDP per capita last year", pc1, 0, "$", num(g1) + " ÷ " + num(pop1) + " = " + usd(pc1) + ".", {wrong:[pc2, pc1 * 10, pc1 / 10, g1 / pop2]}),
    P("pc2", "GDP per capita this year", pc2, 0, "$", num(g2) + " ÷ " + num(pop2) + " = " + usd(pc2) + ".", {wrong:[pc1, pc2 * 10, g2 / pop1, g1 / pop2]}),
    P("gg", "the growth rate of real GDP", gg, 2, "%", "(" + num(g2) + " − " + num(g1) + ") ÷ " + num(g1) + " × 100 = " + show(gg, "%", 2) + ".", {signed:true, wrong:[(g2 - g1) / g2 * 100, g, -gg, g2 / g1 * 100]}),
    P("gpc", "the growth rate of GDP per capita", g, 2, "%", "(" + num(pc2) + " − " + num(pc1) + ") ÷ " + num(pc1) + " × 100 = " + show(g, "%", 2) + ".", {signed:true, wrong:[(pc2 - pc1) / pc2 * 100, gg, -g, pc2 / pc1 * 100]})];
   return {vals:{g1:g1, g2:g2, pop1:pop1, pop2:pop2}, text:"Last year real GDP was " + big(g1) + " with " + num(pop1) + " people. This year real GDP is " + big(g2) + " with " + num(pop2) + " people.", parts:parts};
  }},

 {id:"gro-rate", topic:"growth", name:"Growth rate", variants:3,
  remind:"Growth rate = (new − old) ÷ old × 100. Divide by where you started.",
  make:function(v){
   v = v || ri(1, 3);
   var what = rp(["Real GDP per capita", "Real GDP per capita", "A country’s real GDP per person"]), old, now, g, b = {v:v};
   if(v === 2){ old = ri(15000, 45000); now = old + ri(150, 3000) * rp([1, 1, 1, -1]); g = (now - old) / old * 100; }
   else { old = ri(10, 400) * 100; g = rp([-40, -25, -20, -10, -5, 4, 5, 8, 10, 15, 20, 25, 50]); now = old * (1 + g / 100); }
   b.vals = {old:old, now:now};
   if(v === 3){
    b.text = what + " was " + usd(old) + " and then " + (g < 0 ? "fell " + num(-g) : "grew " + num(g)) + "%.";
    b.parts = [P("now", "its value now", now, 0, "$", (g < 0 ? num(old) + " × (1 − " + dec(-g) + ")" : num(old) + " × (1 + " + dec(g) + ")") + " = " + usd(now) + ".", {ask:"What is it now?", claim:"It is now", wrong:[Math.abs(old * g / 100), old * (1 - g / 100), old + g, old + old * g / 100 * 2]})];
   } else {
    b.text = what + " was " + usd(old) + " last year and is " + usd(now) + " this year.";
    b.parts = [P("g", "the growth rate", g, 2, "%", "(" + num(now) + " − " + num(old) + ") ÷ " + num(old) + " × 100 = " + show(g, "%", 2) + ".",
      {signed:true, wrong:[(now - old) / now * 100, now / old * 100, -g, (now - old) / 100],
       setup:setupOf("(" + num(now) + " − " + num(old) + ") ÷ " + num(old) + " × 100", g, [["(" + num(now) + " − " + num(old) + ") ÷ " + num(now) + " × 100", (now - old) / now * 100], [num(now) + " ÷ " + num(old) + " × 100", now / old * 100], ["(" + num(old) + " − " + num(now) + ") ÷ " + num(old) + " × 100", -g]])})];
   }
   return b;
  }},

 {id:"gro-70", topic:"growth", name:"Rule of 70", row:"double", variants:4,
  remind:"Years to double = 70 ÷ growth rate. Use the percent as a whole number: 5%, so 70 ÷ 5. A shrinking economy halves in the same time.",
  make:function(v){
   v = v || ri(1, 4);
   var g = rp([1, 2, 2.5, 3.5, 4, 5, 7, 10, 14, 20]), yrs = 70 / g, b = {v:v, vals:{g:g}};
   if(v === 1){
    b.text = "An economy grows " + num(g) + "% a year.";
    b.parts = [P("yrs", "the doubling time", yrs, 2, "yr", "70 ÷ " + num(g) + " = " + show(yrs, "yr", 2) + ".", {ask:"About how many years until it doubles?", claim:"It doubles in about", wrong:[g / 70 * 100, 100 / g, 70 * g / 10, 72 / g + 1],
      setup:setupOf("70 ÷ " + num(g), yrs, [[num(g) + " ÷ 70", g / 70], ["70 × " + num(g), 70 * g], ["70 ÷ " + (g / 100).toFixed(3).replace(/0$/, ""), 7000 / g], ["100 ÷ " + num(g), 100 / g]])})];
   } else if(v === 2){
    b.text = "An economy shrinks " + num(g) + "% a year (its growth rate is −" + num(g) + "%).";
    b.parts = [P("yrs", "the halving time", yrs, 2, "yr", "70 ÷ " + num(g) + " = " + show(yrs, "yr", 2) + " to halve.", {ask:"About how many years until it is cut in half?", claim:"It is cut in half in about", wrong:[100 / g, 50 / g, 35 / g, 70 * g / 10]})];
   } else if(v === 3){
    var Y = rp([35, 28, 20, 17.5, 14, 10, 7, 5, 3.5]); b.vals = {yrs:Y};
    b.text = "An economy doubles about every " + num(Y) + " years.";
    b.parts = [P("g", "its growth rate", 70 / Y, 2, "%", "70 ÷ " + num(Y) + " = " + show(70 / Y, "%", 2) + ".", {ask:"About what is its growth rate?", wrong:[Y / 70 * 100, 100 / Y, 70 * Y / 100, 50 / Y]})];
   } else {
    g = rp([2, 3.5, 5, 7, 10, 14]); yrs = 70 / g;
    var k = ri(1, 3), start = rp([5000, 10000, 20000, 40000]), T = k * yrs, end = start * Math.pow(2, k); b.vals = {g:g, start:start, T:T};
    b.text = "GDP per capita is " + usd(start) + " and grows " + num(g) + "% a year.";
    b.parts = [P("end", "GDP per capita after " + num(T) + " years", end, 0, "$", "It doubles every 70 ÷ " + num(g) + " = " + num(yrs) + " years. " + num(T) + " years is " + k + (k === 1 ? " doubling" : " doublings") + ": " + usd(end) + ".",
      {ask:"About what will it be in " + num(T) + " years?", wrong:[start * (1 + g * T / 100), start * (k + 1), start * 2 * (k + 1), start * Math.pow(2, k + 1), start * Math.pow(2, k - 1) * 3]})];
   }
   return b;
  }},

 {id:"gro-mpk", topic:"growth", name:"Diminishing returns (Y = A × √K)", variants:4,
  remind:"Y = A × √K. The marginal product is the extra output from one more unit: output now − output before. Each extra unit adds less than the one before.",
  make:function(v){
   v = v || ri(1, 4);
   var A = rp([1, 1, 2]), b = {v:v}, f = "The production function is Y = A × √K, with A = " + A + ". ";
   if(v === 1){
    var K = ri(2, 30); b.vals = {A:A, K:K};
    b.text = f + "Capital is K = " + K + ".";
    b.parts = [P("Y", "output (Y)", A * Math.sqrt(K), 2, "", A + " × √" + K + " = " + num(A * Math.sqrt(K)) + ".", {wrong:[A * K, A * K / 2, A * K * K, Math.sqrt(A * K) + 1]})];
   } else if(v === 2){
    var K2 = ri(2, 10), mp = A * (Math.sqrt(K2) - Math.sqrt(K2 - 1)); b.vals = {A:A, K:K2};
    b.text = f + "Capital rises from " + (K2 - 1) + " to " + K2 + " units.";
    b.parts = [P("mp", "the marginal product of that last unit", mp, 2, "", A + " × √" + K2 + " − " + A + " × √" + (K2 - 1) + " = " + num(A * Math.sqrt(K2)) + " − " + num(A * Math.sqrt(K2 - 1)) + " = " + num(mp) + ".",
      {ask:"How much extra output does that last unit add (its marginal product)?", claim:"That last unit adds", wrong:[A * Math.sqrt(K2), A, A * Math.sqrt(K2 - 1), mp * 2, A * (Math.sqrt(K2 + 1) - Math.sqrt(K2))]})];
   } else if(v === 3){
    var k1 = ri(2, 9), k2 = k1 + ri(1, 3); b.vals = {A:A, k1:k1, k2:k2};
    b.text = f + "Capital rises from " + (k1 * k1) + " to " + (k2 * k2) + ".";
    b.parts = [P("rise", "the rise in output", A * (k2 - k1), 2, "", A + " × √" + (k2 * k2) + " − " + A + " × √" + (k1 * k1) + " = " + num(A * k2) + " − " + num(A * k1) + " = " + num(A * (k2 - k1)) + ".",
      {ask:"By how much does output rise?", claim:"Output rises by", wrong:[k2 * k2 - k1 * k1, A * k2, A * (k2 * k2 - k1 * k1) / 2, A * k1]})];
   } else {
    b.vals = {A:A};
    b.text = f + "Capital is added one unit at a time.";
    b.choice = {q:"Each extra unit of capital adds:", opts:["less output than the one before", "more output than the one before", "exactly the same output each time", "no output at all after the first"], right:0, work:"Diminishing returns: output rises, but at a decreasing rate."};
   }
   return b;
  }},

 /* ------------------------------------------------ Solow */
 {id:"sol-atk", topic:"solow", name:"Solow at a given K", row:"steady", remind:SOLOW_STEPS,
  make:function(){
   var A, s, dl, K, Y, I, C, D, net, guard = 0;
   do { A = rp([1, 1, 1, 1.1, 1.2, 1.5, 2]); s = rp([10, 20, 25, 30, 40]); dl = rp([1, 2, 4, 5, 10]); K = rp([16, 25, 36, 49, 50, 64, 80, 81, 100, 121, 144, 150, 169, 200, 225, 400]);
        Y = A * Math.sqrt(K); I = s / 100 * Y; C = Y - I; D = dl / 100 * K; net = I - D; } while(Math.abs(net) < 0.02 && guard++ < 50);
   var yw = "Y = " + A + " × √" + K + " = " + num(Y), iw = "I = " + dec(s) + " × " + num(Y) + " = " + num(I), dw = "D = " + dec(dl) + " × " + K + " = " + num(D);
   var parts = [
    P("Y", "output (Y)", Y, 2, "$", yw + ".", {wrong:[A * K, K / 2 * A, s / 100 * K, Y * 2]}),
    P("I", "investment (I)", I, 2, "$", yw + ". " + iw + ".", {wrong:[s / 100 * K, D, C, dl / 100 * Y]}),
    P("C", "consumption (C)", C, 2, "$", yw + ". " + iw + ". C = " + num(Y) + " − " + num(I) + " = " + num(C) + ".", {wrong:[I, Y, Y - D, (1 - s / 100) * K]}),
    P("D", "depreciation (D)", D, 2, "$", dw + " — the rate times capital, not output.", {wrong:[dl / 100 * Y, I, s / 100 * K, D * 10]}),
    P("net", "the change in capital (I − D)", net, 2, "", iw + ". " + dw + ". " + num(I) + " − " + num(D) + " = " + num(net) + ".", {signed:true, wrong:[-net, I + D, Y - D, C - D]}),
    P("next", "capital next year", K + net, 2, "", "K + I − D = " + K + " + " + num(I) + " − " + num(D) + " = " + num(K + net) + ".", {wrong:[K + I, K - D, K + I + D, K + Y]})];
   var add = {key:"add", kind:"word", name:"whether it adds capital", label:"Add capital? (yes or no)", accept:net > 0 ? ["yes", "y"] : ["no", "n"], shown:net > 0 ? "Yes" : "No",
     work:"I (" + num(I) + ") is " + (net > 0 ? "bigger" : "smaller") + " than D (" + num(D) + "), so capital " + (net > 0 ? "grows" : "shrinks") + "."};
   return {vals:{A:A, s:s, dl:dl, K:K},
    text:"An economy produces with Y = A × √K. Technology is A = " + A + ", the savings rate is " + s + "%, the depreciation rate is " + dl + "% and capital is K = " + K + ".",
    parts:parts, multi:parts.slice(0, 4).concat([add])};
  }},

 {id:"sol-add", topic:"solow", name:"Add capital or lose it?", row:"steady", remind:SOLOW_STEPS,
  make:function(){
   var A, s, dl, K, Y, I, D, guard = 0;
   do { A = rp([1, 1, 1.5, 2]); s = rp([10, 20, 25, 30]); dl = rp([1, 2, 5, 10]); K = rp([16, 25, 36, 49, 64, 81, 100, 144, 225, 400]); Y = A * Math.sqrt(K); I = s / 100 * Y; D = dl / 100 * K; } while(Math.abs(I - D) < 0.02 && guard++ < 50);
   return {vals:{A:A, s:s, dl:dl, K:K},
    text:"An economy produces with Y = A × √K. Technology is A = " + A + ", the savings rate is " + s + "%, the depreciation rate is " + dl + "% and capital is K = " + K + ".",
    choice:{q:"Does this economy add capital or lose it?", opts:["It adds capital — investment is bigger", "It loses capital — depreciation is bigger", "Neither — it is at the steady state"], right:I > D ? 0 : 1,
      work:"Y = " + A + " × √" + K + " = " + num(Y) + ". I = " + dec(s) + " × " + num(Y) + " = " + num(I) + ". D = " + dec(dl) + " × " + K + " = " + num(D) + ". I is " + (I > D ? "bigger" : "smaller") + " than D."}};
  }},

 {id:"sol-steady", topic:"solow", name:"Solow steady state", row:"steady", variants:3,
  remind:"K* = (s × A ÷ δ)². Then Y* = A × √K*, and C* = (1 − s) × Y*. At the steady state, investment = depreciation.",
  make:function(v){
   v = v || ri(1, 3);
   var s = rp([10, 20, 25, 30]), dl = rp([1, 2, 5, 10]), A = rp([1, 1, 1.1, 1.2, 1.5, 2]), s0 = s, A0 = A, lead = "";
   if(v === 2){ A0 = rp([1, 1, 1.5]); A = A0 === 1.5 ? 2 : rp([1.1, 1.2, 1.5, 2]); lead = "Technology rises from A = " + A0 + " to A = " + A + ". "; }
   if(v === 3){ s0 = rp([10, 20]); s = s0 === 10 ? rp([20, 25, 30]) : rp([25, 30, 40]); lead = "The savings rate rises from " + s0 + "% to " + s + "%. "; }
   if(s * A / dl < 2) dl = rp([1, 2]);
   var r = s * A / dl, Ks = r * r, Ys = A * r, Cs = (1 - s / 100) * Ys, Is = s / 100 * Ys, tag = v === 1 ? "" : "new ";
   var kw = "K* = (" + dec(s) + " × " + A + " ÷ " + dec(dl) + ")² = (" + num(r) + ")² = " + num(Ks), yw = "Y* = " + A + " × √" + num(Ks) + " = " + num(Ys);
   var parts = [
    P("K", "the " + tag + "steady-state capital stock (K*)", Ks, 2, "", kw + ".", {wrong:[r, Math.pow(dl / (s * A), 2), Math.pow(s / dl, 2) + (A === 1 ? 7 : 0), r * 2, Math.pow(s0 * A0 / dl, 2) + (v === 1 ? 3 : 0)],
      setup:{right:"(" + dec(s) + " × " + A + " ÷ " + dec(dl) + ")²", wrong:[dec(s) + " × " + A + " ÷ " + dec(dl), "(" + dec(dl) + " ÷ (" + dec(s) + " × " + A + "))²", "(" + dec(s) + " × " + A + " × " + dec(dl) + ")²"]}}),
    P("Y", tag + "steady-state output (Y*)", Ys, 2, "$", kw + ". " + yw + ".", {wrong:[Ks, r, Ys * A + 1, Cs]}),
    P("C", tag + "steady-state consumption (C*)", Cs, 2, "$", yw + ". C* = (1 − " + dec(s) + ") × " + num(Ys) + " = " + num(Cs) + ".", {wrong:[Is, Ys, Ks * (1 - s / 100), Ys - dl / 100 * Ys]}),
    P("I", tag + "steady-state investment (I*)", Is, 2, "$", yw + ". I* = " + dec(s) + " × " + num(Ys) + " = " + num(Is) + " — the same as depreciation, " + dec(dl) + " × " + num(Ks) + ".", {wrong:[Cs, Ys, s / 100 * Ks, dl / 100 * Ys]})];
   return {v:v, vals:{s:s, dl:dl, A:A},
    text:"An economy produces with Y = A × √K. " + lead + (v === 2 ? "The savings rate is " + s + "% and the depreciation rate is " + dl + "%." : v === 3 ? "Technology is A = " + A + " and the depreciation rate is " + dl + "%." : "Technology is A = " + A + ", the savings rate is " + s + "% and the depreciation rate is " + dl + "%."),
    parts:parts, multi:parts.slice(0, 3)};
  }},

 {id:"sol-cube", topic:"solow", name:"Solow with the cube root (Y = A × K^1/3)", row:"steady",
  remind:"Y = A × ∛K, the cube root of K. Then the same steps: I = s × Y → C = Y − I → D = δ × K. If I is bigger than D, capital grows.",
  make:function(){
   var K, A, s, dl, Y, I, C, D, guard = 0, root;
   do { root = ri(2, 7); K = root * root * root; A = rp([1, 1, 1.1, 2]); s = rp([10, 20, 20, 30]); dl = rp([1, 1, 2, 5]); Y = A * root; I = s / 100 * Y; C = Y - I; D = dl / 100 * K; } while(Math.abs(I - D) < 0.02 && guard++ < 50);
   var yw = "Y = " + A + " × ∛" + K + " = " + A + " × " + root + " = " + num(Y), iw = "I = " + dec(s) + " × " + num(Y) + " = " + num(I), dw = "D = " + dec(dl) + " × " + K + " = " + num(D);
   var parts = [
    P("Y", "output (Y)", Y, 2, "$", yw + ".", {wrong:[A * Math.sqrt(K), A * K / 3, A * K, Y * 3]}),
    P("I", "investment (I)", I, 2, "$", yw + ". " + iw + ".", {wrong:[s / 100 * K, D, C, s / 100 * A * Math.sqrt(K)]}),
    P("C", "consumption (C)", C, 2, "$", yw + ". " + iw + ". C = " + num(Y) + " − " + num(I) + " = " + num(C) + ".", {wrong:[I, Y, Y - D, (1 - s / 100) * A * Math.sqrt(K)]}),
    P("D", "depreciation (D)", D, 2, "$", dw + ".", {wrong:[dl / 100 * Y, I, s / 100 * K, D * 10]})];
   var add = {key:"add", kind:"word", name:"whether it adds capital", label:"Add capital? (yes or no)", accept:I > D ? ["yes", "y"] : ["no", "n"], shown:I > D ? "Yes" : "No",
     work:"I (" + num(I) + ") is " + (I > D ? "bigger" : "smaller") + " than D (" + num(D) + ")."};
   return {vals:{A:A, s:s, dl:dl, K:K},
    text:"An economy produces with Y = A × K<sup>1/3</sup> (A times the cube root of K). Technology is A = " + A + ", the savings rate is " + s + "%, the depreciation rate is " + dl + "% and capital is K = " + K + ".",
    parts:parts, multi:parts.concat([add])};
  }},

 /* ------------------------------------------------ labor */
 {id:"lab-stats", topic:"labor", name:"Labor force statistics", row:"rates", variants:2,
  remind:"Labor force = employed + unemployed. The unemployment rate divides by the labor force. The LFPR and the EPR divide by all adults.",
  make:function(v){
   v = v || ri(1, 2);
   var E = ri(8, 40) * 100, U = ri(2, 12) * 50, N = ri(3, 40) * 100, Pop = E + U + N, LF = E + U, d = rp([1, 2, 2]);
   var lf = num(E) + " + " + num(U) + " = " + num(LF), pop = v === 1 ? "" : "Adults = " + num(E) + " + " + num(U) + " + " + num(N) + " = " + num(Pop) + ". ";
   var parts = [
    P("LF", "the labor force", LF, 0, "", "Employed + unemployed: " + lf + ".", {ask:"What is the size of the labor force?", wrong:[Pop, E, Pop - U, N + U]}),
    P("u", "the unemployment rate", U / LF * 100, d, "%", "Labor force = " + lf + ". " + num(U) + " ÷ " + num(LF) + " × 100 = " + show(U / LF * 100, "%", d) + ".", {wrong:[U / Pop * 100, U / E * 100, E / LF * 100, U / N * 100],
      setup:setupOf(num(U) + " ÷ " + num(LF) + " × 100", U / LF, [[num(U) + " ÷ " + num(Pop) + " × 100", U / Pop], [num(U) + " ÷ " + num(E) + " × 100", U / E], [num(E) + " ÷ " + num(LF) + " × 100", E / LF], [num(U) + " ÷ " + num(N) + " × 100", U / N]])}),
    P("lfpr", "the labor-force participation rate", LF / Pop * 100, d, "%", pop + "Labor force = " + lf + ". " + num(LF) + " ÷ " + num(Pop) + " × 100 = " + show(LF / Pop * 100, "%", d) + ".", {wrong:[E / Pop * 100, U / Pop * 100, E / LF * 100, N / Pop * 100],
      setup:setupOf(num(LF) + " ÷ " + num(Pop) + " × 100", LF / Pop, [[num(E) + " ÷ " + num(Pop) + " × 100", E / Pop], [num(LF) + " ÷ " + num(E) + " × 100", LF / E], [num(U) + " ÷ " + num(Pop) + " × 100", U / Pop], [num(N) + " ÷ " + num(Pop) + " × 100", N / Pop]])}),
    P("epr", "the employment-population ratio", E / Pop * 100, d, "%", pop + num(E) + " ÷ " + num(Pop) + " × 100 = " + show(E / Pop * 100, "%", d) + ".", {wrong:[E / LF * 100, LF / Pop * 100, U / Pop * 100, N / Pop * 100],
      setup:setupOf(num(E) + " ÷ " + num(Pop) + " × 100", E / Pop, [[num(E) + " ÷ " + num(LF) + " × 100", E / LF], [num(LF) + " ÷ " + num(Pop) + " × 100", LF / Pop], [num(U) + " ÷ " + num(LF) + " × 100", U / LF], [num(N) + " ÷ " + num(Pop) + " × 100", N / Pop]])})];
   if(v === 1) parts.push(P("not", "the number of adults not in the labor force", N, 0, "", num(Pop) + " − " + num(LF) + " = " + num(N) + ".", {ask:"How many adults are not in the labor force?", wrong:[Pop - E, LF, U, Pop - U]}));
   return {v:v, vals:{E:E, U:U, N:N, Pop:Pop},
    text:v === 1 ? "A town has an adult population of " + num(Pop) + ". " + num(E) + " are employed and " + num(U) + " are unemployed." : "In a town, " + num(E) + " adults are employed, " + num(U) + " are unemployed and " + num(N) + " are not in the labor force.",
    parts:parts, multi:parts.slice(0, 4)};
  }},

 {id:"lab-back", topic:"labor", name:"From rates to counts",
  remind:"X% of a number = the number × X ÷ 100. Labor force = LFPR × adults → unemployed = rate × labor force → employed = labor force − unemployed.",
  make:function(){
   var Pop = ri(2, 80) * rp([10000, 1000000]), lfpr = rp([50, 55, 60, 65, 70, 75, 80]), u = rp([4, 5, 6, 8, 10, 12]);
   var LF = Pop * lfpr / 100, U = LF * u / 100, E = LF - U;
   var lw = "Labor force = " + num(Pop) + " × " + lfpr + " ÷ 100 = " + num(LF), uw = "Unemployed = " + num(LF) + " × " + u + " ÷ 100 = " + num(U);
   var parts = [
    P("LF", "the labor force", LF, 0, "", lw + ".", {ask:"How big is the labor force?", wrong:[Pop * u / 100, Pop - LF, Pop * (100 - lfpr) / 100, LF * (1 - u / 100)]}),
    P("U", "the number unemployed", U, 0, "", lw + ". " + uw + ".", {ask:"How many people are unemployed?", wrong:[Pop * u / 100, E, LF * lfpr / 100, U * 10]}),
    P("E", "the number employed", E, 0, "", lw + ". " + uw + ". Employed = " + num(LF) + " − " + num(U) + " = " + num(E) + ".", {ask:"How many people are employed?", wrong:[LF, Pop - U, Pop * (1 - u / 100), LF - Pop * u / 100, U]}),
    P("not", "the number of adults not in the labor force", Pop - LF, 0, "", lw + ". " + num(Pop) + " − " + num(LF) + " = " + num(Pop - LF) + ".", {ask:"How many adults are not in the labor force?", wrong:[LF, Pop - E, U, Pop * u / 100]})];
   return {vals:{Pop:Pop, lfpr:lfpr, u:u}, text:"A country has " + num(Pop) + " adults. The labor-force participation rate is " + lfpr + "% and the unemployment rate is " + u + "%.", parts:parts, multi:parts.slice(0, 3)};
  }},

 {id:"lab-dale", topic:"labor", name:"From the EPR to the unemployment rate",
  remind:"Employed = EPR × adults ÷ 100. Labor force = employed + unemployed. Unemployment rate = unemployed ÷ labor force × 100.",
  make:function(){
   var Pop = ri(2, 80) * 1000000, epr = rp([50, 55, 60, 65]), U = Pop * rp([2, 3, 4, 5, 6, 8, 10]) / 100, E = Pop * epr / 100, LF = E + U, d = rp([1, 2]);
   var ew = "Employed = " + num(Pop) + " × " + epr + " ÷ 100 = " + num(E), lw = "Labor force = " + num(E) + " + " + num(U) + " = " + num(LF);
   var parts = [
    P("E", "the number employed", E, 0, "", ew + ".", {ask:"How many people are employed?", wrong:[Pop - U, Pop * (100 - epr) / 100, E + U, E - U]}),
    P("LF", "the labor force", LF, 0, "", ew + ". " + lw + ".", {ask:"How big is the labor force?", wrong:[E, Pop, Pop - U, E - U]}),
    P("u", "the unemployment rate", U / LF * 100, d, "%", ew + ". " + lw + ". " + num(U) + " ÷ " + num(LF) + " × 100 = " + show(U / LF * 100, "%", d) + ".", {wrong:[U / Pop * 100, U / E * 100, 100 - epr, E / LF * 100]})];
   return {vals:{Pop:Pop, epr:epr, U:U}, text:"A country has " + num(Pop) + " adults. The employment-population ratio is " + epr + "% and " + num(U) + " people are unemployed.", parts:parts};
  }},

 {id:"lab-natural", topic:"labor", name:"Natural rate of unemployment", row:"types", variants:2,
  remind:"Natural rate = (frictional + structural) ÷ labor force × 100. Cyclical stays off the top, but its people stay in the labor force on the bottom.",
  make:function(v){
   v = v || ri(1, 2);
   var E = ri(40, 95) * 100, F = ri(1, 6) * 50, S = ri(1, 6) * 50, Cy = ri(1, 8) * 50, Un = F + S + Cy, LF = E + Un, d = 2;
   var lw = "Labor force = " + num(E) + " + " + num(Un) + " = " + num(LF);
   var parts = [
    P("nat", "the natural rate of unemployment", (F + S) / LF * 100, d, "%", lw + ". (" + num(F) + " + " + num(S) + ") ÷ " + num(LF) + " × 100 = " + show((F + S) / LF * 100, "%", d) + ".",
      {wrong:[(F + S) / (E + F + S) * 100, Un / LF * 100, (F + S) / E * 100, Cy / LF * 100],
       setup:setupOf("(" + num(F) + " + " + num(S) + ") ÷ " + num(LF) + " × 100", (F + S) / LF, [["(" + num(F) + " + " + num(S) + ") ÷ " + num(E + F + S) + " × 100", (F + S) / (E + F + S)], [num(Un) + " ÷ " + num(LF) + " × 100", Un / LF], ["(" + num(F) + " + " + num(S) + ") ÷ " + num(E) + " × 100", (F + S) / E]])}),
    P("act", "the actual unemployment rate", Un / LF * 100, d, "%", lw + ". " + num(Un) + " ÷ " + num(LF) + " × 100 = " + show(Un / LF * 100, "%", d) + ".", {wrong:[(F + S) / LF * 100, Un / E * 100, Cy / LF * 100, Un / (E - Un) * 100]}),
    P("LF", "the labor force", LF, 0, "", lw + " — every unemployed person counts, cyclical included.", {ask:"How big is the labor force?", wrong:[E, E + F + S, E + Cy, LF + Un]})];
   return {v:v, vals:{E:E, F:F, S:S, Cy:Cy},
    text:v === 1 ? num(E) + " people are employed. " + num(F) + " are frictionally unemployed, " + num(S) + " are structurally unemployed and " + num(Cy) + " are cyclically unemployed."
                 : num(E) + " people are employed and " + num(Un) + " are unemployed. Of the unemployed, " + num(F) + " are frictional and " + num(S) + " are structural; the rest are cyclical.",
    parts:parts, multi:parts.slice(0, 2)};
  }},

 {id:"lab-find", topic:"labor", name:"Find the missing number", row:"rates", variants:6,
  remind:"A rate is part ÷ whole. So part = rate × whole ÷ 100, and whole = part ÷ rate × 100.",
  make:function(v){
   v = v || ri(1, 6);
   var LF = ri(10, 90) * 1000, u = rp([4, 5, 6, 8, 10, 12]), U = LF * u / 100, E = LF - U, Pop = ri(2, 80) * 10000, r = rp([50, 60, 75, 80]), b = {v:v};
   if(v === 1){ b.vals = {LF:LF, u:u}; b.text = "The labor force is " + num(LF) + " and the unemployment rate is " + u + "%.";
    b.parts = [P("U", "the number unemployed", U, 0, "", num(LF) + " × " + u + " ÷ 100 = " + num(U) + ".", {ask:"How many people are unemployed?", wrong:[E, LF / u, LF * u, U / 10]})]; }
   else if(v === 2){ b.vals = {U:U, u:u}; b.text = num(U) + " people are unemployed and the unemployment rate is " + u + "%.";
    b.parts = [P("LF", "the labor force", LF, 0, "", "Whole = part ÷ rate × 100: " + num(U) + " ÷ " + u + " × 100 = " + num(LF) + ".", {ask:"How big is the labor force?", wrong:[U * u / 100, U * u, U * (100 - u) / 100, U + U * u]})]; }
   else if(v === 3){ var L3 = Pop * r / 100; b.vals = {LF:L3, r:r}; b.text = "The labor force is " + num(L3) + " and the labor-force participation rate is " + r + "%.";
    b.parts = [P("Pop", "the adult population", Pop, 0, "", "Whole = part ÷ rate × 100: " + num(L3) + " ÷ " + r + " × 100 = " + num(Pop) + ".", {ask:"How many adults are there?", wrong:[L3 * r / 100, L3 * r, L3 * (100 - r) / 100, L3 + L3 * r / 100]})]; }
   else if(v === 4){ b.vals = {Pop:Pop, r:r}; b.text = "There are " + num(Pop) + " adults and the employment-population ratio is " + r + "%.";
    b.parts = [P("E", "the number employed", Pop * r / 100, 0, "", num(Pop) + " × " + r + " ÷ 100 = " + num(Pop * r / 100) + ".", {ask:"How many people are employed?", wrong:[Pop * (100 - r) / 100, Pop / r * 100, Pop * r, Pop / r]})]; }
   else if(v === 5){ b.vals = {LF:LF, u:u}; b.text = "The labor force is " + num(LF) + " and the unemployment rate is " + u + "%.";
    b.parts = [P("E", "the number employed", E, 0, "", "Unemployed = " + num(LF) + " × " + u + " ÷ 100 = " + num(U) + ". Employed = " + num(LF) + " − " + num(U) + " = " + num(E) + ".", {ask:"How many people are employed?", wrong:[U, LF, LF * u, LF - u]})]; }
   else { b.vals = {E:E, u:u}; b.text = num(E) + " people are employed and the unemployment rate is " + u + "%.";
    b.parts = [P("LF", "the labor force", LF, 0, "", "The employed are " + (100 - u) + "% of the labor force: " + num(E) + " ÷ " + (100 - u) + " × 100 = " + num(LF) + ".", {ask:"How big is the labor force?", wrong:[E * (1 + u / 100), E / u * 100, E * u / 100, E + u]})]; }
   return b;
  }},

 /* ------------------------------------------------ prices */
 {id:"pri-basket", topic:"prices", name:"CPI and inflation from a basket", row:"cpi",
  remind:"Basket cost = quantity × price, added up. CPI = cost that year ÷ cost in the base year × 100 (base = bottom, and the base year is 100). Inflation = (new − old) ÷ old × 100.",
  make:function(){
   var pool = shuffle(BASKET).slice(0, 2), y1 = rp([2022, 2023, 2024]), y2 = y1 + 1, base = rp([y1, y1, y2]);
   var q = pool.map(function(g){ return g[4] >= 5 ? ri(1, 3) : ri(2, 6); }), p1 = pool.map(function(g){ return ri(g[2], g[3]) * g[4]; });
   var p2 = pool.map(function(g, i){ return p1[i] + g[4] * ri(i === 0 ? 1 : 0, 4); });
   var c1 = q[0] * p1[0] + q[1] * p1[1], c2 = q[0] * p2[0] + q[1] * p2[1], cb = base === y1 ? c1 : c2;
   var cpi1 = c1 / cb * 100, cpi2 = c2 / cb * 100, inf = (c2 - c1) / c1 * 100;
   function cw(p, c){ return q[0] + " × " + usd2(p[0]) + " + " + q[1] + " × " + usd2(p[1]) + " = " + usd2(c); }
   function cpiPart(key, y, c, cpi){
    return P(key, "the CPI in " + y, cpi, 2, "", y === base ? y + " is the base year, so the CPI is 100." : usd2(c) + " ÷ " + usd2(cb) + " × 100 = " + num(cpi) + ".",
      {wrong:[cb / c * 100 + (y === base ? 9 : 0), c - cb + 100, y === base ? cpi2 === 100 ? cpi1 : cpi2 : 100, c, cpi + 10],
       setup:y === base ? undefined : setupOf(usd2(c) + " ÷ " + usd2(cb) + " × 100", c / cb, [[usd2(cb) + " ÷ " + usd2(c) + " × 100", cb / c], ["(" + usd2(c) + " − " + usd2(cb) + ") ÷ " + usd2(cb) + " × 100", (c - cb) / cb], [usd2(c) + " − " + usd2(cb), c - cb]])});
   }
   var parts = [
    P("cost1", "the cost of the basket in " + y1, c1, 2, "$", cw(p1, c1) + ".", {wrong:[c2, p1[0] + p1[1], c1 + p1[0], q[0] * p1[1] + q[1] * p1[0]]}),
    P("cost2", "the cost of the basket in " + y2, c2, 2, "$", cw(p2, c2) + ".", {wrong:[c1, p2[0] + p2[1], c2 + p2[0], q[0] * p2[1] + q[1] * p2[0]]}),
    cpiPart("cpi1", y1, c1, cpi1), cpiPart("cpi2", y2, c2, cpi2),
    P("inf", "the inflation rate from " + y1 + " to " + y2, inf, 2, "%", "(" + num(cpi2) + " − " + num(cpi1) + ") ÷ " + num(cpi1) + " × 100 = " + show(inf, "%", 2) + ". Divide by the earlier year.", {signed:true, wrong:[(c2 - c1) / c2 * 100, cpi2 - cpi1 + (base === y1 ? 5 : 0), -inf, c2 - c1]})];
   return {vals:{q:q, p1:p1, p2:p2, y1:y1, y2:y2, base:base},
    text:"Suppose the basket is " + q[0] + " " + pool[0][0] + " and " + q[1] + " " + pool[1][0] + ". The base year is " + base + "." + tbl(["Year", "Price of " + pool[0][1], "Price of " + pool[1][1]], [[y1, usd2(p1[0]), usd2(p1[1])], [y2, usd2(p2[0]), usd2(p2[1])]]),
    parts:parts};
  }},

 {id:"pri-infl", topic:"prices", name:"Inflation rate", row:"infl", variants:4,
  remind:"Inflation = (new − old) ÷ old × 100. Divide by the earlier one.",
  make:function(v){
   v = v || ri(1, 4);
   var old = rp([50, 75, 80, 100, 120, 125, 150, 160, 200, 250]), g = rp([-20, -10, -5, 2, 4, 5, 10, 20, 25, 50]), now = old * (1 + g / 100), b = {v:v}, what = "The CPI";
   if(v === 2){ old = ri(1000, 3000) / 10; now = rnd(old + ri(10, 150) / 10, 1); g = (now - old) / old * 100; }
   if(v === 4){ what = "The cost of a basket"; old = ri(10, 90) * 10; g = rp([-10, 5, 10, 20, 25, 40]); now = old * (1 + g / 100); }
   b.vals = {old:old, now:now};
   var f = v === 4 ? usd : num;
   if(v === 3){
    b.text = "The CPI was " + num(old) + " last year and inflation was " + num(g) + "%.";
    b.parts = [P("now", "the CPI now", now, 2, "", num(old) + " × (1 " + (g < 0 ? "− " + dec(-g) : "+ " + dec(g)) + ") = " + num(now) + ".", {wrong:[old + g, Math.abs(old * g / 100), old * (1 - g / 100), old + g * 2]})];
   } else {
    b.text = what + " was " + f(old) + " last year and is " + f(now) + " this year.";
    b.parts = [P("inf", "the inflation rate", g, 2, "%", "(" + num(now) + " − " + num(old) + ") ÷ " + num(old) + " × 100 = " + show(g, "%", 2) + ".",
      {signed:true, wrong:[(now - old) / now * 100, now - old + (Math.abs(now - old - g) < 0.02 ? 3 : 0), -g, now / old * 100],
       setup:setupOf("(" + num(now) + " − " + num(old) + ") ÷ " + num(old) + " × 100", g, [["(" + num(now) + " − " + num(old) + ") ÷ " + num(now) + " × 100", (now - old) / now * 100], [num(now) + " ÷ " + num(old) + " × 100", now / old * 100], ["(" + num(old) + " − " + num(now) + ") ÷ " + num(old) + " × 100", -g]])})];
   }
   return b;
  }},

 {id:"pri-convert", topic:"prices", name:"Converting dollars between years", row:"convert", variants:2,
  remind:"$ × CPI of the year you want ÷ CPI of the year you have. Want over have.",
  make:function(v){
   v = v || ri(1, 2);
   var ys = [1970, 1980, 1990, 2000, 2010, 2020, 2025], i = ri(0, 5), ya = ys[i], yb = ys[ri(i + 1, 6)], ca = rp([25, 40, 50, 60, 80, 100]), cb = ca * rp([1.25, 1.5, 2, 2.5, 3, 4]), amt = ri(1, 60) * rp([1, 5, 10, 100, 1000]);
   var have = v === 1 ? ya : yb, want = v === 1 ? yb : ya, ch = v === 1 ? ca : cb, cw = v === 1 ? cb : ca, a = amt * cw / ch;
   return {v:v, vals:{ca:ca, cb:cb, amt:amt, ya:ya, yb:yb},
    text:"The CPI was " + num(ca) + " in " + ya + " and " + num(cb) + " in " + yb + ".",
    parts:[P("a", usd(amt) + " from " + have + " in " + want + " dollars", a, 2, "$", "You want " + want + ", so its CPI goes on top: " + num(amt) + " × " + num(cw) + " ÷ " + num(ch) + " = " + usd(a) + ".",
      {ask:"What is " + usd(amt) + " from " + have + " worth in " + want + " dollars?", claim:usd(amt) + " from " + have + " is worth, in " + want + " dollars,", wrong:[amt * ch / cw, amt * Math.abs(cb - ca) / 100, amt + Math.abs(cb - ca), amt * cw / 100, amt],
       setup:setupOf(num(amt) + " × " + num(cw) + " ÷ " + num(ch), a, [[num(amt) + " × " + num(ch) + " ÷ " + num(cw), amt * ch / cw], [num(amt) + " × (" + num(cb) + " − " + num(ca) + ") ÷ 100", amt * (cb - ca) / 100], [num(amt) + " ÷ " + num(cw) + " × 100", amt / cw * 100], [num(amt) + " + " + num(cb) + " − " + num(ca), amt + cb - ca]])})]};
  }},

 {id:"pri-cpi", topic:"prices", name:"CPI from basket costs", row:"cpi", variants:3,
  remind:"CPI = cost now ÷ cost in the base year × 100. Base = bottom. So cost now = CPI × base cost ÷ 100.",
  make:function(v){
   v = v || ri(1, 3);
   var cb = ri(10, 90) * 10, k = rp([0.8, 0.9, 1.05, 1.1, 1.2, 1.25, 1.5, 2]), cn = cb * k, cpi = k * 100, b = {v:v, vals:{cb:cb, cn:cn}};
   if(v === 1){ b.text = "A basket cost " + usd(cb) + " in the base year and costs " + usd(cn) + " now.";
    b.parts = [P("cpi", "the CPI now", cpi, 2, "", num(cn) + " ÷ " + num(cb) + " × 100 = " + num(cpi) + ".", {wrong:[cb / cn * 100, cn - cb, 100, cn - cb + 100 + 7],
      setup:setupOf(num(cn) + " ÷ " + num(cb) + " × 100", k, [[num(cb) + " ÷ " + num(cn) + " × 100", 1 / k], [num(cn) + " − " + num(cb), (cn - cb) / 100], ["(" + num(cn) + " − " + num(cb) + ") ÷ " + num(cb) + " × 100", k - 1]])})]; }
   else if(v === 2){ b.text = "A basket cost " + usd(cb) + " in the base year. The CPI is now " + num(cpi) + ".";
    b.parts = [P("cn", "the cost of the basket now", cn, 2, "$", num(cpi) + " × " + num(cb) + " ÷ 100 = " + usd(cn) + ".", {wrong:[cb / cpi * 100, cb + cpi, cb, cb + (cpi - 100) + 3]})]; }
   else { b.text = "A basket costs " + usd(cn) + " now, and the CPI is " + num(cpi) + ".";
    b.parts = [P("cb", "the cost of the basket in the base year", cb, 2, "$", num(cn) + " ÷ " + num(cpi) + " × 100 = " + usd(cb) + ".", {wrong:[cn * cpi / 100, cn - cpi, cn, cn - (cpi - 100) + 3]})]; }
   return b;
  }},

 /* ------------------------------------------------ saving */
 {id:"sav-three", topic:"saving", name:"National, private and public saving", row:"saving",
  remind:"National = Y − C − G. Private = Y − T − C. Public = T − G. Private + public = national.",
  make:function(){
   var Y = ri(10, 90) * 100, C = Math.round(Y * rp([0.5, 0.55, 0.6, 0.65, 0.7]) / 50) * 50, G = Math.round(Y * rp([0.1, 0.15, 0.2, 0.25]) / 50) * 50, T = Math.max(50, G + rp([-3, -2, -1, 1, 2, 3]) * 50);
   var nat = Y - C - G, pri = Y - T - C, pub = T - G;
   var parts = [
    P("nat", "national saving", nat, 0, "$", num(Y) + " − " + num(C) + " − " + num(G) + " = " + usd(nat) + ".", {signed:true, wrong:[pri, pub, Y - C, Y - C - T - G],
      setup:setupOf(num(Y) + " − " + num(C) + " − " + num(G), nat, [[num(Y) + " − " + num(T) + " − " + num(C), pri], [num(T) + " − " + num(G), pub], [num(Y) + " − " + num(C), Y - C], [num(Y) + " − " + num(G), Y - G]])}),
    P("pri", "private saving", pri, 0, "$", num(Y) + " − " + num(T) + " − " + num(C) + " = " + usd(pri) + ".", {signed:true, wrong:[nat, pub, Y - C, Y - T],
      setup:setupOf(num(Y) + " − " + num(T) + " − " + num(C), pri, [[num(Y) + " − " + num(C) + " − " + num(G), nat], [num(T) + " − " + num(G), pub], [num(Y) + " − " + num(T), Y - T], [num(Y) + " − " + num(C), Y - C]])}),
    P("pub", "public saving", pub, 0, "$", num(T) + " − " + num(G) + " = " + usd(pub) + (pub < 0 ? " — negative, so the government runs a deficit." : "."), {signed:true, wrong:[-pub, nat, pri, T + G],
      setup:setupOf(num(T) + " − " + num(G), pub, [[num(G) + " − " + num(T), -pub], [num(Y) + " − " + num(T) + " − " + num(C), pri], [num(Y) + " − " + num(C) + " − " + num(G), nat], [num(Y) + " − " + num(T), Y - T]])})];
   return {vals:{Y:Y, C:C, G:G, T:T}, text:"Output (Y) is " + usd(Y) + ", consumption (C) is " + usd(C) + ", government purchases (G) are " + usd(G) + " and taxes (T) are " + usd(T) + ".", parts:parts};
  }},

 {id:"sav-open", topic:"saving", name:"Saving, investment and the rest of the world", row:"open", variants:6,
  remind:"I = S + (M − X). Invest more than you save → borrow the gap abroad (imports bigger than exports). Save more → lend abroad. Closed economy: I = S.",
  make:function(v){
   v = v || ri(1, 6);
   var S = ri(8, 60) * 10, gap = ri(1, 7) * 10, I = (v === 2 ? S - gap : S + gap), b = {v:v};
   if(v === 4) I = S + gap * rp([1, -1]);
   var X = ri(5, 40) * 10, M = X + (I - S);
   b.vals = {S:S, I:I, X:X, M:M};
   if(v === 1){ b.text = "National saving is " + usd(S) + " and investment is " + usd(I) + ".";
    b.parts = [P("f", "the amount paid for by foreign savings", I - S, 0, "$", num(I) + " − " + num(S) + " = " + usd(I - S) + " borrowed from abroad.", {ask:"How much of the investment is paid for by foreign savings?", claim:"Foreign savings pay for", wrong:[I, S, I + S, (I - S) * 2]})]; }
   else if(v === 2){ b.text = "National saving is " + usd(S) + " and investment is " + usd(I) + ".";
    b.parts = [P("l", "the amount lent abroad", S - I, 0, "$", num(S) + " − " + num(I) + " = " + usd(S - I) + " lent abroad.", {ask:"How much does the country lend abroad?", claim:"The country lends abroad", wrong:[I, S, I + S, (S - I) * 2]})]; }
   else if(v === 3){ b.text = "National saving is " + usd(S) + ". Imports are " + usd(M) + " and exports are " + usd(X) + ".";
    b.parts = [P("I", "investment", I, 0, "$", "I = S + (M − X) = " + num(S) + " + (" + num(M) + " − " + num(X) + ") = " + usd(I) + ".", {wrong:[S - (M - X), S + M + X, S, S + M]})]; }
   else if(v === 4){ b.text = "National saving is " + usd(S) + " and investment is " + usd(I) + ".";
    b.parts = [P("nx", "net exports", S - I, 0, "$", "X − M = S − I = " + num(S) + " − " + num(I) + " = " + usd(S - I) + ".", {are:true, signed:true, ask:"What are net exports (X − M)?", wrong:[I - S, S + I, S, I]})]; }
   else if(v === 5){ b.text = "Investment is " + usd(I) + ". Imports are " + usd(M) + " and exports are " + usd(X) + ".";
    b.parts = [P("S", "national saving", S, 0, "$", "S = I − (M − X) = " + num(I) + " − (" + num(M) + " − " + num(X) + ") = " + usd(S) + ".", {wrong:[I + (M - X), I, I - M, I + X]})]; }
   else { b.text = "A closed economy (no trade) has national saving of " + usd(S) + ".";
    b.parts = [P("I", "investment", S, 0, "$", "No trade, so investment = saving = " + usd(S) + ".", {wrong:[0, S * 2, S / 2, S + gap]})]; }
   return b;
  }},

 {id:"sav-borrow", topic:"saving", name:"Borrow or lend?", row:"open",
  remind:"Invest more than you save → borrow abroad. Save more than you invest → lend abroad.",
  make:function(){
   var S = ri(8, 60) * 10, I = S + ri(1, 7) * 10 * rp([1, -1]);
   return {vals:{S:S, I:I}, text:"National saving is " + usd(S) + " and investment is " + usd(I) + ".",
    choice:{q:"What does this country do?", opts:["It borrows " + usd(Math.abs(I - S)) + " from abroad", "It lends " + usd(Math.abs(I - S)) + " abroad", "Neither — it must be a closed economy"], right:I > S ? 0 : 1,
      work:(I > S ? "Investment is bigger than saving, so it borrows the gap: " + num(I) + " − " + num(S) : "Saving is bigger than investment, so it lends the extra: " + num(S) + " − " + num(I)) + " = " + usd(Math.abs(I - S)) + "."}};
  }},

 {id:"sav-find", topic:"saving", name:"Find the missing piece of saving", row:"saving", variants:5,
  remind:"Public saving = T − G. Private saving = Y − T − C. National saving = Y − C − G. Move the pieces around to find the one you need.",
  make:function(v){
   v = v || ri(1, 5);
   var Y = ri(10, 90) * 100, C = Math.round(Y * rp([0.5, 0.55, 0.6, 0.65]) / 50) * 50, G = Math.round(Y * rp([0.1, 0.15, 0.2, 0.25]) / 50) * 50, T = Math.max(50, G + rp([-3, -2, -1, 1, 2, 3]) * 50);
   var nat = Y - C - G, pri = Y - T - C, pub = T - G, b = {v:v, vals:{Y:Y, C:C, G:G, T:T}};
   if(v === 1){ b.text = "Government purchases are " + usd(G) + " and public saving is " + usd(pub) + ".";
    b.parts = [P("T", "taxes", T, 0, "$", "T = public saving + G = " + num(pub) + " + " + num(G) + " = " + usd(T) + ".", {are:true, ask:"What are taxes (T)?", wrong:[G - pub, G, Math.abs(pub), G + Math.abs(pub) * 2 + 50]})]; }
   else if(v === 2){ b.text = "Taxes are " + usd(T) + " and public saving is " + usd(pub) + ".";
    b.parts = [P("G", "government purchases", G, 0, "$", "G = T − public saving = " + num(T) + " − (" + num(pub) + ") = " + usd(G) + ".", {are:true, ask:"What are government purchases (G)?", wrong:[T + pub, T, Math.abs(pub), T + Math.abs(pub) * 2 + 50]})]; }
   else if(v === 3){ b.text = "Output is " + usd(Y) + ", government purchases are " + usd(G) + " and national saving is " + usd(nat) + ".";
    b.parts = [P("C", "consumption", C, 0, "$", "C = Y − G − S = " + num(Y) + " − " + num(G) + " − " + num(nat) + " = " + usd(C) + ".", {wrong:[Y - nat, Y - G, nat + G, Y - G + nat]})]; }
   else if(v === 4){ b.text = "Consumption is " + usd(C) + ", government purchases are " + usd(G) + " and national saving is " + usd(nat) + ".";
    b.parts = [P("Y", "output (Y)", Y, 0, "$", "Y = S + C + G = " + num(nat) + " + " + num(C) + " + " + num(G) + " = " + usd(Y) + ".", {wrong:[C + G, C + G - nat, nat + C, C + G + nat * 2]})]; }
   else { b.text = "Output is " + usd(Y) + ", consumption is " + usd(C) + " and private saving is " + usd(pri) + ".";
    b.parts = [P("T", "taxes", T, 0, "$", "T = Y − C − private saving = " + num(Y) + " − " + num(C) + " − " + num(pri) + " = " + usd(T) + ".", {are:true, ask:"What are taxes (T)?", wrong:[Y - C, Y - pri, pri + C, Y - C + pri]})]; }
   return b;
  }}
];
var GEN_BY_ID = {};
GENS.forEach(function(g){ GEN_BY_ID[g.id] = g; });

/* ================================================================ the professor's own problems, with their exact numbers */
var FIXED = [
 {id:"class-gdp", gen:"gdp-real", src:"Class exercise", make:function(){
   var y = [2023, 2024, 2025], p = [[1, 2], [2, 3], [3, 4]], q = [[100, 50], [150, 100], [200, 150]], nom = [200, 600, 1200], real = [200, 350, 500], parts = [];
   y.forEach(function(yr, i){ parts.push(P("nom" + yr, "nominal GDP in " + yr, nom[i], 0, "$", yr + " prices × " + yr + " quantities: " + p[i][0] + " × " + q[i][0] + " + " + p[i][1] + " × " + q[i][1] + " = " + usd(nom[i]) + ".", {wrong:[real[i] + (i ? 0 : 50), nom[(i + 1) % 3], p[i][0] * q[i][1] + p[i][1] * q[i][0], nom[i] + 100]})); });
   y.forEach(function(yr, i){ parts.push(P("real" + yr, "real GDP in " + yr, real[i], 0, "$", (i ? "2023 prices × " + yr + " quantities: " : "2023 is the base year, so real = nominal: ") + "1 × " + q[i][0] + " + 2 × " + q[i][1] + " = " + usd(real[i]) + ".", {wrong:[nom[i] + (i ? 0 : 150), real[(i + 1) % 3], p[i][0] * 100 + p[i][1] * 50 + (i ? 0 : 75), real[i] + 100]})); });
   return {text:tbl(["Year", "Price of hot dogs", "Quantity of hot dogs", "Price of hamburgers", "Quantity of hamburgers"], [[2023, "$1", 100, "$2", 50], [2024, "$2", 150, "$3", 100], [2025, "$3", 200, "$4", 150]]) + "The base year is 2023.", parts:parts};
  }},
 {id:"class-growth", gen:"gro-rate", src:"Class exercise", make:function(){
   return {text:tbl(["Country", "Year", "Real GDP per capita"], [["Mexico", 2022, "$21,828"], ["Mexico", 2023, "$22,366"], ["China", 2022, "$21,019"], ["China", 2023, "$22,135"]]) + "Calculate the annual growth rate.",
    parts:[P("mexico", "the growth rate for Mexico", 538 / 21828 * 100, 2, "%", "(22,366 − 21,828) ÷ 21,828 × 100 = 2.46%.", {signed:true, wrong:[538 / 22366 * 100, 5.31, 22366 / 21828 * 100, 5.38]}),
           P("china", "the growth rate for China", 1116 / 21019 * 100, 2, "%", "(22,135 − 21,019) ÷ 21,019 × 100 = 5.31%.", {signed:true, wrong:[1116 / 22135 * 100, 2.46, 22135 / 21019 * 100, 11.16]})]};
  }},
 {id:"class-70", gen:"gro-70", src:"Class example", make:function(){
   return {text:"GDP per capita grows 2% per year and starts at $40,000.", parts:[P("yrs", "the doubling time", 35, 2, "yr", "70 ÷ 2 = 35 years.", {ask:"In how many years will GDP per capita double?", claim:"It doubles in", wrong:[50, 20, 140, 28.57]})]};
  }},
 {id:"class-mpk", gen:"gro-mpk", src:"Class table", make:function(){
   return {text:"Consider the production function Y = A × √K, where A = 1. Capital goes 0, 1, 2, 3, 4.",
    parts:[P("y2", "output when K = 2", 1.41, 2, "", "√2 = 1.41.", {wrong:[2, 1, 4, 0.41]}), P("y3", "output when K = 3", 1.73, 2, "", "√3 = 1.73.", {wrong:[3, 1.5, 9, 0.32]}),
           P("mp2", "the marginal product of the 2nd unit of capital", 0.41, 2, "", "1.41 − 1 = 0.41.", {wrong:[1.41, 1, 0.32, 0.5]}),
           P("mp3", "the marginal product of the 3rd unit of capital", 0.32, 2, "", "1.73 − 1.41 = 0.32.", {wrong:[1.73, 0.41, 0.27, 0.58]}),
           P("mp4", "the marginal product of the 4th unit of capital", 0.27, 2, "", "2 − 1.73 = 0.27.", {wrong:[2, 0.32, 0.5, 0.25]})]};
  }},
 {id:"class-labor", gen:"lab-stats", src:"Class exercise", make:function(){
   return {text:"Adult population = 3,200, employed = 1,600 people and unemployed = 200.",
    parts:[P("LF", "the labor force", 1800, 0, "", "Employed + unemployed: 1,600 + 200 = 1,800.", {ask:"What is the size of the labor force?", wrong:[3200, 1600, 3000, 1400]}),
           P("u", "the unemployment rate", 200 / 1800 * 100, 2, "%", "200 ÷ 1,800 × 100 = 11.11%.", {wrong:[6.25, 12.5, 88.89, 5.56]}),
           P("lfpr", "the labor-force participation rate", 56.25, 2, "%", "1,800 ÷ 3,200 × 100 = 56.25%.", {wrong:[50, 6.25, 88.89, 43.75]}),
           P("epr", "the employment-population ratio", 50, 2, "%", "1,600 ÷ 3,200 × 100 = 50%.", {wrong:[88.89, 56.25, 6.25, 11.11]})]};
  }},
 {id:"class-cpi", gen:"pri-basket", src:"Class exercise", make:function(){
   return {text:"Suppose the basket is 3 gallons of milk and 5 shirts. The base year is 2024." + tbl(["Year", "Price of milk (per gallon)", "Price of one shirt"], [[2024, "$3.25", "$16.00"], [2025, "$3.50", "$16.50"]]),
    parts:[P("cost2024", "the cost of the basket in 2024", 89.75, 2, "$", "3 × $3.25 + 5 × $16.00 = $89.75.", {wrong:[93, 19.25, 96.25, 57.5]}),
           P("cost2025", "the cost of the basket in 2025", 93, 2, "$", "3 × $3.50 + 5 × $16.50 = $93.00.", {wrong:[89.75, 20, 100, 60]}),
           P("cpi2024", "the CPI in 2024", 100, 2, "", "2024 is the base year, so the CPI is 100.", {wrong:[89.75, 96.51, 103.62, 93]}),
           P("cpi2025", "the CPI in 2025", 93 / 89.75 * 100, 2, "", "$93.00 ÷ $89.75 × 100 = 103.62.", {wrong:[96.51, 93, 103.25, 3.62]}),
           P("inf", "the inflation rate for 2025", 3.62, 2, "%", "(103.62 − 100) ÷ 100 × 100 = 3.62%.", {signed:true, wrong:[3.49, 3.25, 103.62, -3.62]})]};
  }},
 {id:"ps1-crystals", gen:"gdp-real", src:"Problem Set 1", make:function(){
   return {text:tbl(["Year", "Price of crystals", "Quantity of crystals", "Price of pearls", "Quantity of pearls"], [[2023, "$15", 800, "$200", 150], [2024, "$16.50", "1,000", "$220", 180]]) + "The base year is 2024.",
    parts:[P("nom2023", "nominal GDP in 2023", 42000, 0, "$", "15 × 800 + 200 × 150 = $42,000.", {wrong:[46200, 56100, 51000, 40500]}),
           P("nom2024", "nominal GDP in 2024", 56100, 0, "$", "16.50 × 1,000 + 220 × 180 = $56,100.", {wrong:[51000, 46200, 42000, 59400]}),
           P("real2023", "real GDP in 2023", 46200, 0, "$", "2024 prices × 2023 quantities: 16.50 × 800 + 220 × 150 = $46,200.", {wrong:[42000, 56100, 51000, 44500]}),
           P("real2024", "real GDP in 2024", 56100, 0, "$", "2024 is the base year, so real = nominal: $56,100.", {wrong:[46200, 42000, 51000, 52800]})]};
  }},
 {id:"ps1-gondor", gen:"gdp-sum", src:"Problem Set 1", make:function(){
   return {text:"Gondor: consumption is $4,000. Investment is 30% of consumption. Government purchases are $1,200, transfer payments are $500, exports are $300 and imports are $500.",
    parts:[P("gdp", "GDP", 6200, 0, "$", "I = 30% of 4,000 = 1,200. 4,000 + 1,200 + 1,200 + (300 − 500) = $6,200. Transfers stay out.", {wrong:[6700, 7200, 6400, 5700]})]};
  }},
 {id:"ps2-solow", gen:"sol-atk", src:"Problem Set 2", make:function(){
   var parts = [P("Y", "output (Y)", 8.94, 2, "$", "Y = 1 × √80 = 8.94.", {wrong:[80, 40, 8, 0.89]}), P("I", "investment (I)", 0.89, 2, "$", "I = 0.10 × 8.94 = 0.89.", {wrong:[8, 0.8, 8.05, 0.09]}),
    P("C", "consumption (C)", 8.05, 2, "$", "C = 8.94 − 0.89 = 8.05.", {wrong:[0.89, 8.94, 8.14, 72]}), P("D", "depreciation (D)", 0.8, 2, "$", "D = 0.01 × 80 = 0.80 — the rate times capital, not output.", {wrong:[0.09, 0.89, 8, 0.08]})];
   return {text:"An economy produces with Y = A × √K. Technology is A = 1, the savings rate is 10%, the depreciation rate is 1% and capital is K = 80.", parts:parts,
    multi:parts.concat([{key:"add", kind:"word", name:"whether it adds capital", label:"Add capital? (yes or no)", accept:["yes", "y"], shown:"Yes", work:"I (0.89) is bigger than D (0.80), so capital grows."}])};
  }},
 {id:"ps2-steady", gen:"sol-steady", src:"Problem Set 2", make:function(){
   return {text:"An economy produces with Y = A × √K. Technology rises to A = 1.1. The savings rate is 10% and the depreciation rate is 1%.",
    parts:[P("K", "the new steady-state capital stock (K*)", 121, 2, "", "K* = (0.10 × 1.1 ÷ 0.01)² = (11)² = 121.", {wrong:[11, 100, 110, 12.1]}),
           P("Y", "new steady-state output (Y*)", 12.1, 2, "$", "Y* = 1.1 × √121 = 1.1 × 11 = 12.10.", {wrong:[11, 121, 10.89, 13.31]}),
           P("C", "new steady-state consumption (C*)", 10.89, 2, "$", "C* = (1 − 0.10) × 12.10 = 10.89.", {wrong:[1.21, 12.1, 9.9, 108.9]})]};
  }},
 {id:"ps2-percap", gen:"gro-pcgrowth", src:"Problem Set 2", make:function(){
   return {text:"Last year real GDP was $50 million with 10,000 people. This year real GDP is $60 million with 20,000 people.",
    parts:[P("pc1", "GDP per capita last year", 5000, 0, "$", "50,000,000 ÷ 10,000 = $5,000.", {wrong:[3000, 500, 50000, 2500]}), P("pc2", "GDP per capita this year", 3000, 0, "$", "60,000,000 ÷ 20,000 = $3,000.", {wrong:[5000, 6000, 300, 30000]}),
           P("gg", "the growth rate of real GDP", 20, 2, "%", "(60 − 50) ÷ 50 × 100 = 20%.", {signed:true, wrong:[16.67, -40, 120, 10]}), P("gpc", "the growth rate of GDP per capita", -40, 2, "%", "(3,000 − 5,000) ÷ 5,000 × 100 = −40%.", {signed:true, wrong:[-66.67, 20, 40, 60]})]};
  }},
 {id:"ps2-70", gen:"gro-70", src:"Problem Set 2", make:function(){
   return {text:"Real GDP grows 20% a year, while GDP per capita shrinks 40% a year.",
    parts:[P("double", "the time for real GDP to double", 3.5, 2, "yr", "70 ÷ 20 = 3.5 years.", {claim:"Real GDP doubles in", wrong:[1.75, 5, 14, 0.29]}), P("halve", "the time for GDP per capita to be cut in half", 1.75, 2, "yr", "70 ÷ 40 = 1.75 years.", {claim:"GDP per capita is cut in half in", wrong:[3.5, 2.5, 28, 0.57]})]};
  }},
 {id:"ps3-gondor", gen:"lab-back", src:"Problem Set 3", make:function(){
   return {text:"Gondor has 60,000,000 adults. The labor-force participation rate is 75% and the unemployment rate is 6%.",
    parts:[P("LF", "the labor force", 45000000, 0, "", "60,000,000 × 75 ÷ 100 = 45,000,000.", {ask:"How big is the labor force?", wrong:[3600000, 15000000, 56400000, 42300000]}),
           P("U", "the number unemployed", 2700000, 0, "", "45,000,000 × 6 ÷ 100 = 2,700,000.", {ask:"How many people are unemployed?", wrong:[3600000, 42300000, 270000, 4500000]}),
           P("E", "the number employed", 42300000, 0, "", "45,000,000 − 2,700,000 = 42,300,000. Check every digit.", {ask:"How many people are employed?", wrong:[42000000, 45000000, 56400000, 41400000]})]};
  }},
 {id:"ps3-dale", gen:"lab-dale", src:"Problem Set 3", make:function(){
   return {text:"Dale has 50,000,000 adults. The employment-population ratio is 55% and 5,000,000 people are unemployed.",
    parts:[P("E", "the number employed", 27500000, 0, "", "50,000,000 × 55 ÷ 100 = 27,500,000.", {ask:"How many people are employed?", wrong:[45000000, 22500000, 32500000, 2750000]}),
           P("LF", "the labor force", 32500000, 0, "", "27,500,000 + 5,000,000 = 32,500,000.", {ask:"How big is the labor force?", wrong:[27500000, 50000000, 45000000, 22500000]}),
           P("u", "the unemployment rate", 5 / 32.5 * 100, 1, "%", "5,000,000 ÷ 32,500,000 × 100 = 15.4%.", {wrong:[10, 18.2, 9.1, 45]})]};
  }},
 {id:"ps3-dogriver", gen:"lab-stats", src:"Problem Set 3", make:function(){
   return {text:"Dog River. In 2023 there were 4,000 adults, with 2,400 employed and 400 unemployed. In 2024 there were 900 unemployed in a labor force of 2,400. In 2025 the labor force was 3,900 and there were 4,500 adults.",
    parts:[P("LF", "the labor force in 2023", 2800, 0, "", "2,400 + 400 = 2,800.", {wrong:[4000, 2400, 2000, 3600]}), P("epr", "the employment-population ratio in 2023", 60, 1, "%", "2,400 ÷ 4,000 × 100 = 60%.", {wrong:[70, 85.7, 14.3, 10]}),
           P("u", "the unemployment rate in 2024", 37.5, 1, "%", "900 ÷ 2,400 × 100 = 37.5%.", {wrong:[27.3, 60, 22.5, 62.5]}), P("lfpr", "the labor-force participation rate in 2025", 3900 / 4500 * 100, 1, "%", "3,900 ÷ 4,500 × 100 = 86.7%.", {wrong:[66.7, 115.4, 46.7, 13.3]})]};
  }},
 {id:"ps3-osgiliath", gen:"lab-natural", src:"Problem Set 3", make:function(){
   return {text:"Osgiliath: 45 million people are employed and 5 million are unemployed. Of the unemployed, 0.5 million are frictional and 0.5 million are structural; the rest are cyclical.",
    parts:[P("nat", "the natural rate of unemployment", 2, 2, "%", "(0.5 + 0.5) ÷ (45 + 5) × 100 = 2%. Cyclical stays off the top but in the bottom.", {wrong:[10, 2.17, 8, 1]}), P("act", "the actual unemployment rate", 10, 2, "%", "5 ÷ 50 × 100 = 10%.", {wrong:[2, 11.11, 8, 9]})]};
  }},
 {id:"ps4-basket", gen:"pri-basket", src:"Problem Set 4", make:function(){
   return {text:"Suppose the basket is 5 apples, 2 jackets and 1 TV. The base year is 2025." + tbl(["Year", "Price of one apple", "Price of one jacket", "Price of one TV"], [[2024, "$2", "$40", "$300"], [2025, "$4", "$50", "$400"]]),
    parts:[P("cost2024", "the cost of the basket in 2024", 390, 2, "$", "5 × 2 + 2 × 40 + 300 = $390.", {wrong:[342, 520, 400, 350]}), P("cost2025", "the cost of the basket in 2025", 520, 2, "$", "5 × 4 + 2 × 50 + 400 = $520.", {wrong:[454, 390, 540, 500]}),
           P("cpi2024", "the CPI in 2024", 75, 2, "", "390 ÷ 520 × 100 = 75. The base (2025) goes on the bottom.", {wrong:[133.33, 100, 25, 130]}), P("cpi2025", "the CPI in 2025", 100, 2, "", "2025 is the base year, so the CPI is 100.", {wrong:[133.33, 75, 125, 520]}),
           P("inf", "the inflation rate from 2024 to 2025", 100 / 3, 2, "%", "(100 − 75) ÷ 75 × 100 = 33.33%. Divide by 75, the earlier year.", {signed:true, wrong:[25, -25, 133.33, 33]})]};
  }},
 {id:"ps4-convert", gen:"pri-convert", src:"Problem Set 4", make:function(){
   return {text:"The CPI was 100 in 1980 and 300 in 2020.", parts:[P("a", "$30 from 2020 in 1980 dollars", 10, 2, "$", "You want 1980, so its CPI goes on top: 30 × 100 ÷ 300 = $10.", {ask:"What is $30 from 2020 worth in 1980 dollars?", claim:"$30 from 2020 is worth, in 1980 dollars,", wrong:[90, 30, 100, 60]})]};
  }},
 {id:"ps2-sqrt", gen:"gro-mpk", src:"Problem Set 2", make:function(){
   return {text:"The production function is Y = √K. Capital rises from 25 to 36.", parts:[P("rise", "the rise in output", 1, 2, "", "√36 − √25 = 6 − 5 = 1.", {ask:"By how much does output rise?", claim:"Output rises by", wrong:[11, 6, 5.5, 2]})]};
  }},
 {id:"doc-cube", gen:"sol-cube", src:"Course document", make:function(){
   var parts = [P("Y", "output (Y)", 4, 2, "$", "Y = 1 × ∛64 = 4.", {wrong:[8, 21.33, 64, 3.2]}), P("I", "investment (I)", 0.8, 2, "$", "I = 0.20 × 4 = 0.80.", {wrong:[12.8, 0.64, 3.2, 1.6]}),
    P("C", "consumption (C)", 3.2, 2, "$", "C = 4 − 0.80 = 3.20.", {wrong:[0.8, 4, 3.36, 51.2]}), P("D", "depreciation (D)", 0.64, 2, "$", "D = 0.01 × 64 = 0.64.", {wrong:[0.04, 0.8, 12.8, 6.4]})];
   return {text:"The Mathematical Example: Y = A × K<sup>1/3</sup> (A times the cube root of K), with A = 1, a savings rate of 20% and a depreciation rate of 1%. Capital is K = 64.", parts:parts,
    multi:parts.concat([{key:"add", kind:"word", name:"whether it adds capital", label:"Add capital? (yes or no)", accept:["yes", "y"], shown:"Yes", work:"I (0.80) is bigger than D (0.64), so capital grows — toward the steady state near 90."}])};
  }},
 {id:"doc-ninety", gen:"sol-cube", src:"Course document", make:function(){
   return {text:"The Mathematical Example: Y = A × K<sup>1/3</sup>, with A = 1, a savings rate of 20% and a depreciation rate of 1%.",
    choice:{q:"The steady state is near how many units of capital?", opts:["About 90", "About 20", "About 400", "About 9"], right:0, work:"Investment equals depreciation near K = 90 (0.20 × ∛90 ≈ 0.90 = 0.01 × 90)."}};
  }}
];
FIXED.forEach(function(f){ f.topic = GEN_BY_ID[f.gen].topic; });
var FIXED_BY_ID = {};
FIXED.forEach(function(f){ FIXED_BY_ID[f.id] = f; });

/* ================================================================ turning a scenario into a problem */
function roundNote(p){ return p.d && p.kind !== "word" ? " Round to the " + (p.d === 1 ? "first" : "second") + " decimal." : ""; }
function askOf(p){ return (p.ask || ("What " + (p.are ? "are " : "is ") + p.name + "?")) + roundNote(p); }
function labelOf(p){ return p.label || cap(p.name.replace(/^the /, "")); }
function shown(p){ return p.kind === "word" ? p.shown : show(p.a, p.unit, p.d); }
function wrongFor(p){
  var seen = {}, given = [], out;
  seen[show(p.a, p.unit, p.d)] = 1;
  function take(v, list){
    if(typeof v !== "number" || !isFinite(v)) return;
    v = rnd(v, p.d);
    if(v < 0 && !p.signed) return;
    if(Math.abs(v - p.a) <= tolOf(p)) return;
    var s = show(v, p.unit, p.d);
    if(seen[s]) return;
    seen[s] = 1; list.push(v);
  }
  (p.wrong || []).forEach(function(v){ take(v, given); });
  out = shuffle(given).slice(0, 3);
  var a = p.a, step = p.d ? Math.pow(10, -p.d) : 1, tries = [a * 2, a / 2, a * 1.5, a * 0.75, a * 1.25, a + 10 * step, a * 3, a + 100 * step, a * 10, a / 10], k = 0;
  while(out.length < 3 && k < tries.length){ take(tries[k], out); k++; }
  k = 1; while(out.length < 3 && k < 60){ take(a + k * 7 * step, out); k++; }
  return out.slice(0, 3);
}
function singleFormats(p){ var f = ["type", "mc", "tf"]; if(p.setup && p.setup.wrong && p.setup.wrong.length >= 3) f.push("setup"); return f; }
function formatProblem(g, base, fmt, want){
  want = want || {};
  var q = {key:g.id + ":" + (++GEN_SEQ), gen:g.id, v:base.v || 0, fixed:base.fixed || null, name:g.name, topic:g.topic, topicName:TOPIC_LABEL[g.topic], src:base.src || "", remind:base.remind || g.remind, row:g.row || null, part:null};
  if(base.choice && !(base.parts && base.parts.length)){
    q.fmt = "choice"; q.text = base.text + '<span class="ask">' + base.choice.q + '</span>'; q.work = base.choice.work; q.right = base.choice.opts[base.choice.right];
    q.opts = shuffle(base.choice.opts.map(function(o, i){ return {html:o, ok:i === base.choice.right}; }));
    return q;
  }
  var singles = base.parts.filter(function(p){ return p.kind !== "word"; }), multi = base.multi || (base.parts.length > 1 ? base.parts : null);
  if(multi && multi.length < 2) multi = null;
  if(want.part === "*" && !multi) want = {};
  var r = Math.random();
  if(want.fmt){ fmt = want.fmt; }
  else if(!fmt || fmt === "mixed"){ fmt = (multi && r < (base.fixed ? 0.55 : 0.3)) ? "multi" : "one"; }
  else if(fmt === "type"){ fmt = (multi && r < (base.fixed ? 0.6 : 0.35)) ? "multi" : "type"; }
  else if(fmt === "mc"){ fmt = "tap"; }
  if(fmt === "multi" && !multi) fmt = "type";
  if(fmt === "multi"){
    q.fmt = "multi"; q.part = "*"; q.parts = multi;
    q.text = base.text + '<span class="ask">Find each of these.' + (multi.some(function(p){ return p.d && p.kind !== "word"; }) ? " Round to the " + (multi.some(function(p){ return p.d === 1; }) ? "first" : "second") + " decimal where needed." : "") + '</span>';
    return q;
  }
  var p = null;
  if(want.part){ singles.forEach(function(x){ if(x.key === want.part) p = x; }); }
  if(!p) p = rp(singles);
  var can = singleFormats(p);
  if(fmt === "one") fmt = rp(["type", "type", "type", "type", "mc", "mc", "tf"].concat(can.indexOf("setup") >= 0 ? ["setup", "setup"] : []));
  if(fmt === "tap") fmt = rp(["mc", "mc", "mc", "tf"].concat(can.indexOf("setup") >= 0 ? ["setup"] : []));
  if(can.indexOf(fmt) < 0) fmt = "type";
  q.fmt = fmt; q.part = p.key; q.parts = [p]; q.work = p.work; q.right = shown(p);
  if(fmt === "type"){ q.text = base.text + '<span class="ask">' + askOf(p) + '</span>'; }
  else if(fmt === "mc"){
    q.text = base.text + '<span class="ask">' + askOf(p) + '</span>';
    q.opts = shuffle([{html:shown(p), ok:true}].concat(wrongFor(p).map(function(v){ return {html:show(v, p.unit, p.d), ok:false}; })));
  } else if(fmt === "tf"){
    var truth = Math.random() < 0.5, val = truth ? p.a : wrongFor(p)[0];
    q.text = base.text + '<span class="ask">' + (p.claim || (cap(p.name) + (p.are ? " are" : " is"))) + " " + show(val, p.unit, p.d) + '.</span>';
    q.opts = [{html:"True", ok:truth, cls:"tf"}, {html:"False", ok:!truth, cls:"tf"}];
    q.claimed = val;
  } else {
    q.text = base.text + '<span class="ask">Which calculation gives ' + p.name + '?</span>';
    q.opts = shuffle([{html:p.setup.right, ok:true}].concat(p.setup.wrong.slice(0, 3).map(function(s){ return {html:s, ok:false}; })));
    q.right = p.setup.right + " = " + shown(p);
  }
  return q;
}
function baseOf(g, v, fixedId){
  var f = fixedId ? FIXED_BY_ID[fixedId] : null, b = f ? f.make() : g.make(v);
  if(f){ b.fixed = f.id; b.src = f.src; }
  return b;
}
/* the bag: every formula once, the ones he has been missing twice */
function bagOf(pool, stats){
  var bag = [];
  pool.forEach(function(g){ bag.push(g); var s = stats && stats[g.id]; if(s && s.indexOf(0) >= 0) bag.push(g); });
  return shuffle(bag);
}
function practiceQuestions(cfg, stats){
  cfg = cfg || {};
  var out = [], n = cfg.n || 10;
  if(cfg.again && cfg.again.length){
    /* the same kind of problem again: same formula, same part asked, fresh numbers (a class problem comes back as itself) */
    cfg.again.forEach(function(m){ var g = GEN_BY_ID[m.gen]; if(g) out.push(formatProblem(g, baseOf(g, m.v || undefined, m.fixed), null, {fmt:m.fmt, part:m.part})); });
    return out;
  }
  var pool = GENS.filter(function(g){ return cfg.gen ? g.id === cfg.gen : (!cfg.topic || cfg.topic === "all" || g.topic === cfg.topic); });
  var fixed = FIXED.filter(function(f){ return cfg.gen ? f.gen === cfg.gen : (!cfg.topic || cfg.topic === "all" || f.topic === cfg.topic); });
  var used = {}, bag = [], last = null, guard = 0;
  if(!pool.length) return out;
  while(out.length < n && guard++ < n * 30){
    var useFixed = cfg.source === "class" ? true : (cfg.source === "fresh" ? false : Math.random() < 0.25), q = null;
    if(useFixed){
      var left = fixed.filter(function(f){ return !used[f.id]; });
      if(left.length){ var f = rp(left); used[f.id] = 1; q = formatProblem(GEN_BY_ID[f.gen], baseOf(null, 0, f.id), cfg.format); }
      else if(cfg.source === "class") break;
    }
    if(!q){
      if(!bag.length) bag = bagOf(pool, stats);
      var g = bag.shift();
      if(g === last && pool.length > 1){ bag.push(g); continue; }
      last = g; q = formatProblem(g, baseOf(g), cfg.format);
    }
    if(cfg.format === "type" && q.fmt === "choice" && !cfg.gen) continue;
    out.push(q);
  }
  return out;
}
