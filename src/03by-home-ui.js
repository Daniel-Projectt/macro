/* ================================================================ home, graphs, and the saved misses
   Home: what is due next (with a button straight to the right place), the two
   exam countdowns, the saved misses, which tool to use when, and his common
   mistakes. Graphs: all the exam graphs on one page plus a graph drill.
   Saved misses: every quiz remembers a missed question until it is answered
   right twice in a row.                                                        */

/* ---- the saved misses ---- */
function missBank(){ try{ var v = store.get("missbank"); return v ? JSON.parse(v) : {}; }catch(e){ return {}; } }
function missNote(q, ok){
  if(!q || !q.key || /^(lgen|lid):/.test(q.key)) return;
  var b = missBank(), e = b[q.key];
  if(ok){ if(e){ e.s = (e.s || 0) + 1; if(e.s >= 2) delete b[q.key]; } }
  else b[q.key] = {m:(e ? e.m : 0) + 1, s:0};
  store.set("missbank", JSON.stringify(b));
}
function missKeys(){ return Object.keys(missBank()); }
function missQuestions(){ return shuffle(questionsByKeys(missKeys())).slice(0, 40); }
function startMisses(){
  engines.mock = makeQuiz($("#mockExam"), missQuestions, {showTopic:true, showTier:true, againLabel:"Go again", onSetup:renderMockSetup});
  engines.mock.start(null);
}

/* ---- dates ---- */
var WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function schedDate(s){ var m = /^(\d+)-(\d+)-(\d+)T(\d+):(\d+)$/.exec(s); return new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]); }
function dayLabel(d){ var h = d.getHours(), mm = ("0" + d.getMinutes()).slice(-2); return WEEKDAY[d.getDay()] + " " + MONTH[d.getMonth()] + " " + d.getDate() + " · " + (h > 12 ? h - 12 : h) + ":" + mm + (h >= 12 ? " pm" : " am"); }
function daysUntil(d, now){ var a = new Date(now.getFullYear(), now.getMonth(), now.getDate()), b = new Date(d.getFullYear(), d.getMonth(), d.getDate()); return Math.round((b - a) / 86400000); }
function whenWord(n){ return n <= 0 ? "today" : (n === 1 ? "tomorrow" : "in " + n + " days"); }

/* ---- home ---- */
function renderHome(now){
  now = now || new Date();
  var ahead = SCHEDULE.map(function(s){ return {s:s, d:schedDate(s.d)}; }).filter(function(x){ return x.d.getTime() + 3600000 > now.getTime(); });
  var exams = SCHEDULE.filter(function(s){ return s.exam; }).map(function(s){ var d = schedDate(s.d); return {s:s, d:d, n:daysUntil(d, now)}; });
  var misses = missKeys().length;
  var html = '<div class="homegrid">' + exams.map(function(e){
      return '<div class="cd' + (e.n < 0 ? ' past' : '') + '"><span class="rdn">' + (e.s.exam === "final" ? "Final exam" : "Exam 2") + '</span><b>' + (e.n < 0 ? "done" : e.n + (e.n === 1 ? " day" : " days")) + '</b><small>' + dayLabel(e.d) + '</small>' +
        '<button class="btn" type="button" data-set="' + e.s.exam + '">' + (e.s.exam === "final" ? "Final set" : "Exam 2 set") + '</button></div>';
    }).join("") + '</div>';
  html += '<div class="note-sec rdpage"><h2 class="rdtitle">Coming up</h2>' + divider() +
    (ahead.length ? '<ul class="dues">' + ahead.slice(0, 6).map(function(x){
      var s = x.s, n = daysUntil(x.d, now), btn;
      if(s.rd) btn = '<button class="btn" type="button" data-rdgo="' + s.rd + '">Study the reading</button>';
      else if(s.ch) btn = '<button class="btn" type="button" data-go="' + s.ch + '/notes">Chapter</button><button class="btn" type="button" data-px="' + s.px + '">Math practice</button>';
      else btn = '<button class="btn" type="button" data-set="' + s.exam + '">Practice set</button>';
      return '<li class="due k-' + s.k.split(" ")[0].toLowerCase() + '"><span class="rdn">' + s.k + ' &middot; ' + dayLabel(x.d) + ' &middot; <b>' + whenWord(n) + '</b></span><span class="dt">' + s.t + '</span><span class="db">' + btn + '</span></li>';
    }).join("") + '</ul>' : '<p>The semester is over.</p>') + '</div>';
  html += '<div class="note-sec rdpage"><h2 class="rdtitle">Your saved misses</h2>' + divider() +
    (misses ? '<p>You have <b>' + misses + '</b> question' + (misses === 1 ? '' : 's') + ' you missed in the quizzes. Each one leaves the list once you get it right twice in a row.</p><div class="toolbar" style="justify-content:center"><button class="btn primary" type="button" id="homeMiss">Practice my ' + misses + ' misses</button></div>'
            : '<p>Nothing saved yet. Every question you miss in any quiz lands here, so you can come back to it until you get it right twice.</p>') + '</div>';
  html += '<div class="note-sec rdpage"><h2 class="rdtitle">Which tool, when</h2>' + divider() + '<div class="tools">' + [
      ["The night before a reading quiz", "Readings", "Start here, flashcards, who said what, then the timed 5-in-4-minutes.", 'data-go="readings/page"'],
      ["Before a problem set opens", "The chapter", "Notes first, then the chapter quiz, then Math Practice on its topic.", 'data-go="guide/overview"'],
      ["Calculations until they’re automatic", "Math Practice", "Fresh numbers every time; a miss shows the working and the reminder.", 'data-go="practice/run"'],
      ["Graphs for Exam 2 and the final", "Graphs", "Every exam graph on one page, then a mixed shift drill.", 'data-go="graphs/page"'],
      ["A week before an exam", "Practice Exam", "The Exam 2 set or the Final set, then your saved misses.", 'data-go="exam/mock"'],
      ["Five minutes to spare", "Formulas", "What divides by what, and the traps.", 'data-go="formulas/notes"']
    ].map(function(t){ return '<button type="button" class="tool" ' + t[3] + '><span class="rdn">' + t[0] + '</span><b>' + t[1] + '</b><small>' + t[2] + '</small></button>'; }).join("") + '</div></div>';
  html += '<details class="note-sec rdpage mistakes"><summary><h2 class="rdtitle">His ' + MISTAKES.length + ' common mistakes</h2></summary>' + divider() + '<ol>' + MISTAKES.map(li).join("") + '</ol></details>';
  $("#homeRoot").innerHTML = html;
  $$("#homeRoot [data-go]").forEach(function(b){ b.addEventListener("click", function(){ goTo(b.getAttribute("data-go")); }); });
  $$("#homeRoot [data-rdgo]").forEach(function(b){ b.addEventListener("click", function(){ rdState.cur = b.getAttribute("data-rdgo"); store.set("reading", rdState.cur); renderRdPick(); goTo("readings/page"); }); });
  $$("#homeRoot [data-px]").forEach(function(b){ b.addEventListener("click", function(){ practiceCfg.topic = b.getAttribute("data-px"); practiceCfg.gen = ""; store.set("practicecfg", JSON.stringify(practiceCfg)); engines.practice = null; goTo("practice/run"); renderPracticeSetup(); }); });
  $$("#homeRoot [data-set]").forEach(function(b){ b.addEventListener("click", function(){ goTo("exam/mock"); (b.getAttribute("data-set") === "final" ? startFinal : startExam2)(); }); });
  if($("#homeMiss")) $("#homeMiss").addEventListener("click", function(){ goTo("exam/mock"); startMisses(); });
}

/* ---- graphs ---- */
function renderGraphs(){
  var figs = [
    solowGraph("Technology shifts output and investment up (dashed); the steady state moves right.", true),
    lfGraph("Saving rises: supply shifts right, the real rate falls, investment rises.", 45, 0),
    lpGraph("The Fed raises the money supply: the nominal rate falls.", 45, 0),
    rsvGraph("Supply meets the sloped part, so OMO moves the fed funds rate.", false),
    rsvGraph("Supply meets the flat part; IOR and reverse repos set the range.", true),
    vomGraph("More money: a higher price level, a lower value of money.", 22, 0),
    pcGraph("Expansion moves along the SRPC; expectations then shift it up.", "expand"),
    adasGraph("A negative productivity shock: stagflation.", "supply")];
  var html = '<div class="toolbar" style="justify-content:center;margin:0 0 18px"><button class="btn primary" type="button" id="gDrill">Graph drill &mdash; 10 mixed shifts</button></div><div id="graphDrill"></div>' +
    '<div class="gcards">' + GRAPHS.map(function(g, i){
      return '<div class="gcard note-sec"><h3 class="sub">' + g[0] + ' <span class="gexam">' + g[5] + '</span></h3>' + figs[i] +
        '<dl><dt>Axes</dt><dd>&uarr; ' + g[1] + ' &nbsp;&middot;&nbsp; &rarr; ' + g[2] + '</dd><dt>Curves</dt><dd>' + g[3] + '</dd><dt>What moves what</dt><dd>' + g[4] + '</dd></dl></div>';
    }).join("") + '</div>';
  $("#graphsRoot").innerHTML = html;
  $("#gDrill").addEventListener("click", function(){
    engines.graphs = makePractice($("#graphDrill"), {onSetup:function(){ engines.graphs = null; $("#graphDrill").innerHTML = ""; }});
    engines.graphs.start({topic:"graphs", format:"mc", source:"fresh", n:10});
    $("#graphDrill").scrollIntoView({behavior:"smooth", block:"start"});
  });
}
