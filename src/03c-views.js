/* ================================================================ small helpers */
function segWire(sel, attr, fn){
  var seg = $(sel); if(!seg) return;
  seg.addEventListener("click", function(e){
    var b = e.target.closest ? e.target.closest("button["+attr+"]") : null;
    if(!b) return;
    $$("button", seg).forEach(function(x){ x.setAttribute("aria-pressed", String(x === b)); });
    fn(b.getAttribute(attr));
  });
}
function divider(){ return '<div class="divider"><span>&#9670;</span></div>'; }
function getJSON(k, dflt){ try{ var v = store.get(k); return v ? JSON.parse(v) : dflt; }catch(e){ return dflt; } }
function li(x){ return "<li>"+x+"</li>"; }

/* ================================================================ guide */
function renderGuide(){
  var done = getJSON("guide", {}), total = 0;
  GUIDE.sections.forEach(function(s){ total += s.items.length; });
  var html =
    '<div class="handout card-corners">'+CORNERS+
      '<div class="hcourse">'+COURSE.code+' &middot; '+COURSE.term+'</div>'+
      '<h2>'+COURSE.exam+'</h2><p class="hscope">'+COURSE.scope+'</p>'+
      '<ul class="hrules">'+COURSE.rules.map(li).join("")+'</ul>'+
    '</div>'+
    '<p class="note">'+COURSE.about+'</p>'+
    '<div class="gprog"><span class="count" id="gCount"></span><div class="bar"><i id="gBar" style="width:0"></i></div></div>';
  GUIDE.sections.forEach(function(s){
    html += '<div class="gsec"><h2>'+s.h+'</h2>'+divider();
    s.items.forEach(function(it){
      html += '<div class="gitem'+(done[it.id] ? " ok" : "")+'" data-gi="'+it.id+'">'+
        '<input type="checkbox" aria-label="I can explain '+strip(it.t)+'" data-g="'+it.id+'"'+(done[it.id] ? " checked" : "")+'>'+
        '<div><div class="gt">'+it.t+'</div>'+
          '<div class="gs">'+it.short+'</div>'+
          '<div class="gsub">'+it.subs.map(function(sb){ return '<button class="btn" type="button" data-go="'+s.tp+'/notes" data-a="'+sb[1]+'">'+sb[0]+'</button>'; }).join("")+'</div></div>'+
        '<button class="btn" type="button" data-go="'+s.tp+'/notes" data-a="'+it.a+'">Study it</button></div>';
    });
    html += '</div>';
  });
  html += '<div class="gsec"><div class="toolbar">'+
      '<button class="btn primary" type="button" data-go="exam/mock">Practice exam</button>'+
      '<button class="btn" type="button" id="gPrint">Print this list</button>'+
    '</div></div>';
  $("#guideRoot").innerHTML = html;
  function progress(){
    var d = getJSON("guide", {}), n = Object.keys(d).filter(function(k){ return d[k]; }).length;
    $("#gCount").innerHTML = "Ready on <b>"+n+" of "+total+"</b>";
    $("#gBar").style.width = (n/total*100) + "%";
  }
  $$("#guideRoot input[data-g]").forEach(function(cb){
    cb.addEventListener("change", function(){
      var d = getJSON("guide", {}); d[cb.getAttribute("data-g")] = cb.checked; store.set("guide", JSON.stringify(d));
      cb.closest(".gitem").classList.toggle("ok", cb.checked); progress();
    });
  });
  $$("#guideRoot [data-go]").forEach(function(b){
    b.addEventListener("click", function(){ goTo(b.getAttribute("data-go"), b.getAttribute("data-a")); });
  });
  $("#gPrint").addEventListener("click", function(){ window.print(); });
  progress();
}
function goTo(path, anchor){
  var parts = path.split("/"), t = parts[0], m = parts[1];
  currentMode[t] = m;
  showTopic(t);
  if(!anchor){ window.scrollTo({top:$(".topics").offsetTop - 8, behavior:"smooth"}); return; }
  setTimeout(function(){
    var el = document.getElementById(anchor);
    if(!el) return;
    el.scrollIntoView({behavior:"smooth", block:"start"});
    el.classList.add("flashhit"); setTimeout(function(){ el.classList.remove("flashhit"); }, 1800);
  }, 60);
}

/* ================================================================ chapter notes */
function renderNotes(tp){
  var c = CH[tp];
  $("#"+tp+"Notes").innerHTML = '<div class="secnav">'+c.notes.map(function(s){ return '<a href="#'+s.id+'" data-a="'+s.id+'">'+strip(s.h).replace(/“|”/g,"").replace(/^Figure [\d.]+ · /, "")+'</a>'; }).join("")+'</div>'+
    c.notes.map(function(s){ return '<div class="note-sec" id="'+s.id+'"><h2>'+s.h+'</h2>'+divider()+s.body+'</div>'; }).join("");
  $$("#"+tp+"Notes .secnav a").forEach(function(a){
    a.addEventListener("click", function(e){ e.preventDefault(); var el = document.getElementById(a.getAttribute("data-a")); if(el) el.scrollIntoView({behavior:"smooth", block:"start"}); });
  });
}

/* ================================================================ practice exam */
var mockCfg = getJSON("mockcfg", {n:25, types:"all", topic:"all", focus:"all"});
function mockGen(){ return mockQuestions({n:mockCfg.n, types:mockCfg.types, focus:mockCfg.focus, topics:mockCfg.topic === "all" ? [] : [mockCfg.topic]}); }
function startMock(keys){
  engines.mock = makeQuiz($("#mockExam"), mockGen, {showTopic:true, showTier:true, againLabel:"New practice exam", onSetup:renderMockSetup});
  engines.mock.start(keys || null);
}
/* the one-button exam: 38 questions, every section of the outline covered */
function startFifty(){
  engines.mock = makeQuiz($("#mockExam"), function(){ return finalFifty(38); }, {showTopic:true, showTier:true, againLabel:"Another thirty-eight", onSetup:renderMockSetup});
  engines.mock.start(null);
}
function startExam1(){
  engines.mock = makeQuiz($("#mockExam"), exam1Questions, {showTopic:true, showTier:true, againLabel:"Exam 1 again", onSetup:renderMockSetup});
  engines.mock.start(null);
}
function renderMockSetup(){
  var root = $("#mockExam");
  function seg(id, attr, val, list){
    return '<div class="seg" id="'+id+'">'+list.map(function(o){ return '<button type="button" '+attr+'="'+o[0]+'" aria-pressed="'+(String(o[0]) === String(val))+'">'+o[1]+'</button>'; }).join("")+'</div>';
  }
  root.innerHTML = '<div class="quizWrap"><div class="qcard card-corners">'+CORNERS+
    '<div class="qnum">Practice exam</div><p class="qtext">Set it up, then answer across the topics. Each run is drawn fresh.</p>'+
    '<div class="fifty"><button class="btn primary" type="button" id="mxFifty">The 38 &mdash; the exam&rsquo;s length, every section</button>'+
      '<p>Thirty-eight questions &mdash; the exam&rsquo;s length &mdash; at least one from each of the 24 sections, your misses first. Drawn fresh each time.</p></div>'+
    '<div class="fifty"><button class="btn primary" type="button" id="mxExam1">Exam 1 again &mdash; the real questions</button>'+
      '<p>Every multiple-choice question from the first exam, with your '+QB.filter(function(b){ return b.ex && b.m === 3; }).length+' misses marked. The fill-in calculations are in Math Practice &rarr; Numbers &rarr; <b>Exam 1 problems</b>.</p></div>'+
    '<div class="setup">'+
      '<p class="orline">or set one up yourself</p>'+
      '<div class="row"><span class="label">Length</span><br>'+seg("mxN","data-n",mockCfg.n,[[15,"15"],[25,"25"],[40,"40"],[60,"60"]])+'</div>'+
      '<div class="row"><span class="label">Question types</span><br>'+seg("mxT","data-t",mockCfg.types,[["all","Everything"],["mc","Multiple choice"],["tf","True / false"],["ap","Application"]])+'</div>'+
      '<div class="row"><span class="label">Topics</span><br>'+seg("mxP","data-p",mockCfg.topic,[["all","All six"]].concat(CHAPTERS.map(function(tp){ return [tp, CH[tp].short]; })))+'</div>'+
      '<div class="row"><span class="label">Where it comes from</span><br>'+seg("mxF","data-f",mockCfg.focus,[["all","Everything"],["exam1","Missed on Exam 1"],["misses","Missed on problem sets"],["ps","Problem-set and exam style"],["rest","The readings"]])+'</div>'+
      '<p class="setnote">'+REVIEW_NOTE+'</p>'+
      '<div class="row" style="margin-top:22px"><button class="btn primary" type="button" id="mxStart">Start</button></div>'+
    '</div></div></div>';
  segWire("#mxN","data-n",function(v){ mockCfg.n = parseInt(v,10); store.set("mockcfg", JSON.stringify(mockCfg)); });
  segWire("#mxT","data-t",function(v){ mockCfg.types = v; store.set("mockcfg", JSON.stringify(mockCfg)); });
  segWire("#mxP","data-p",function(v){ mockCfg.topic = v; store.set("mockcfg", JSON.stringify(mockCfg)); });
  segWire("#mxF","data-f",function(v){ mockCfg.focus = v; store.set("mockcfg", JSON.stringify(mockCfg)); });
  $("#mxStart").addEventListener("click", function(){ startMock(null); });
  $("#mxFifty").addEventListener("click", startFifty);
  $("#mxExam1").addEventListener("click", startExam1);
  engines.mock = null;
}

/* ================================================================ wiring */
var engines = {};
CHAPTERS.forEach(function(tp){
  var seg = $('.seg[data-decks="'+tp+'"]'), cur = CH[tp].decks[0].id;
  seg.innerHTML = CH[tp].decks.map(function(d, i){ return '<button type="button" data-deck="'+d.id+'" aria-pressed="'+(i === 0)+'">'+d.label+'</button>'; }).join("");
  engines[tp+"Cards"] = makeCards($("#"+tp+"Cards")); engines[tp+"Cards"].load(deckFor(tp, cur));
  segWire('.seg[data-decks="'+tp+'"]', "data-deck", function(v){ cur = v; engines[tp+"Cards"].load(deckFor(tp, v)); });
  $('[data-shuffle="'+tp+'"]').addEventListener("click", function(){ engines[tp+"Cards"].load(deckFor(tp, cur)); });
  engines[tp+"Match"] = makeMatch($("#"+tp+"Match"), function(){ return matchRound(tp, 6); });
  engines[tp+"Quiz"]  = makeQuiz($("#"+tp+"Quiz"), function(){ return topicQuestions(tp, null, 10); });
  renderNotes(tp);
});
renderGuide();
/* My List: the page with a cover over the answers, its flashcards, and the quiz */
function renderList(){
  var html = '<div class="mlbar"><button class="btn" type="button" id="mlCover" aria-pressed="false">Hide the answers</button><span class="mlhint" id="mlHint" hidden>Tap a line to check it</span></div>'+
    '<div class="tblwrap"><table class="tbl fit c2 mylist" id="mlTable"><thead><tr><th>Cue</th><th>Say this</th></tr></thead><tbody>';
  LIST.forEach(function(g){
    html += '<tr class="chrow"><td colspan="2">'+g.ch+'</td></tr>';
    g.rows.forEach(function(r){ html += '<tr class="mrow" data-row="'+r.id+'"><td class="head">'+r.cue+'</td><td class="sm ans">'+r.line+'</td></tr>'; });
  });
  html += '</tbody></table></div>'+
    '<div class="toolbar" style="justify-content:center;margin-top:22px"><button class="btn primary" type="button" id="mlQuiz">Quiz me on all 24</button><button class="btn" type="button" id="mlCards">Flashcards</button></div>';
  $("#listRoot").innerHTML = html;
  var table = $("#mlTable"), cover = $("#mlCover");
  cover.addEventListener("click", function(){
    var on = !table.classList.contains("covered");
    table.classList.toggle("covered", on);
    $$("#mlTable tr.shown").forEach(function(tr){ tr.classList.remove("shown"); });
    cover.setAttribute("aria-pressed", String(on));
    cover.textContent = on ? "Show all the answers" : "Hide the answers";
    $("#mlHint").hidden = !on;
  });
  $$("#mlTable tr.mrow").forEach(function(tr){
    tr.addEventListener("click", function(){ if(table.classList.contains("covered")) tr.classList.toggle("shown"); });
  });
  function jump(mode){ showMode("list", mode); window.scrollTo({top:$(".topics").offsetTop - 8, behavior:"smooth"}); }
  $("#mlQuiz").addEventListener("click", function(){ jump("quiz"); });
  $("#mlCards").addEventListener("click", function(){ jump("cards"); });
}
renderList();
engines.listCards = makeCards($("#listCards")); engines.listCards.load(listDeck());
$("#listShuffle").addEventListener("click", function(){ engines.listCards.load(shuffle(listDeck())); });
$("#listOrder").addEventListener("click", function(){ engines.listCards.load(listDeck()); });
engines.list = makeQuiz($("#listQuiz"), listQuestions, {byList:true, againLabel:"Another round of 24"});

/* Math Practice: the settings screen, then the practice screen */
var practiceCfg = getJSON("practicecfg", {topic:"all", gen:"", format:"mixed", source:"mixed", n:10});
function renderPracticeSetup(){
  function seg(id, attr, val, list){
    return '<div class="seg" id="'+id+'">'+list.map(function(o){ return '<button type="button" '+attr+'="'+o[0]+'" aria-pressed="'+(String(o[0]) === String(val))+'">'+o[1]+'</button>'; }).join("")+'</div>';
  }
  var gens = GENS.filter(function(g){ return practiceCfg.topic === "all" || g.topic === practiceCfg.topic; });
  if(practiceCfg.gen && gens.indexOf(GEN_BY_ID[practiceCfg.gen]) < 0) practiceCfg.gen = "";
  $("#practiceRoot").innerHTML = '<div class="quizWrap"><div class="qcard card-corners">'+CORNERS+
    '<div class="qnum">Math practice</div><p class="qtext">New numbers every time, plus the class exercises and your problem sets. Miss one and you get the answer, the working and the reminder.</p>'+
    '<div class="setup">'+
      '<div class="row"><span class="label">Topic</span><br>'+seg("pxT","data-t",practiceCfg.topic,PRACTICE_TOPICS)+'</div>'+
      '<div class="row"><span class="label">One formula only</span><br><select id="pxG" class="pxsel" aria-label="One formula only"><option value="">All of them</option>'+
        gens.map(function(g){ return '<option value="'+g.id+'"'+(practiceCfg.gen === g.id ? ' selected' : '')+'>'+g.name+'</option>'; }).join("")+'</select></div>'+
      '<div class="row"><span class="label">How you answer</span><br>'+seg("pxF","data-f",practiceCfg.format,[["mixed","Mixed"],["type","Type the answer"],["mc","Tap an answer"]])+'</div>'+
      '<div class="row"><span class="label">Numbers</span><br>'+seg("pxS","data-s",practiceCfg.source,[["mixed","Mixed"],["fresh","New numbers"],["class","Class and problem-set problems"],["exam","Exam 1 problems"]])+'</div>'+
      '<div class="row"><span class="label">How many</span><br>'+seg("pxN","data-n",practiceCfg.n,[[10,"10"],[20,"20"],[40,"40"]])+'</div>'+
      '<div class="row" style="margin-top:22px"><button class="btn primary" type="button" id="pxStart">Start</button></div>'+
    '</div></div></div>';
  function saveCfg(){ store.set("practicecfg", JSON.stringify(practiceCfg)); }
  segWire("#pxT","data-t",function(v){ practiceCfg.topic = v; practiceCfg.gen = ""; saveCfg(); renderPracticeSetup(); });
  $("#pxG").addEventListener("change", function(){ practiceCfg.gen = this.value; saveCfg(); });
  segWire("#pxF","data-f",function(v){ practiceCfg.format = v; saveCfg(); });
  segWire("#pxS","data-s",function(v){ practiceCfg.source = v; saveCfg(); });
  segWire("#pxN","data-n",function(v){ practiceCfg.n = parseInt(v,10); saveCfg(); });
  $("#pxStart").addEventListener("click", startPractice);
  engines.practice = null;
}
function startPractice(){
  engines.practice = makePractice($("#practiceRoot"), {onSetup:renderPracticeSetup});
  engines.practice.start({topic:practiceCfg.topic, gen:practiceCfg.gen || null, format:practiceCfg.format, source:practiceCfg.source, n:practiceCfg.n});
}

initReadings();

var ON_SHOW = {"exam/mock":function(){ if(!engines.mock) renderMockSetup(); }, "list/quiz":function(){ engines.list.ensure(); }, "practice/run":function(){ if(!engines.practice) renderPracticeSetup(); }};
var KEYS = {"exam/mock":function(e){ return engines.mock ? engines.mock.keys(e) : false; }, "list/quiz":function(e){ return engines.list.keys(e); }, "list/cards":function(e){ return engines.listCards.keys(e); }, "practice/run":function(e){ return engines.practice ? engines.practice.keys(e) : false; }};
["page","cards","match","quiz","real","how","past"].forEach(function(m){ ON_SHOW["readings/" + m] = function(){ renderRdMode(m); }; });
KEYS["readings/cards"] = function(e){ return rdState.eng.cards ? rdState.eng.cards.keys(e) : false; };
["quiz","real","past"].forEach(function(m){ KEYS["readings/" + m] = function(e){ var g = rdState.eng[m]; return g && g.keys ? g.keys(e) : false; }; });
CHAPTERS.forEach(function(tp){
  ON_SHOW[tp+"/match"] = function(){ engines[tp+"Match"].ensure(); };
  ON_SHOW[tp+"/quiz"]  = function(){ engines[tp+"Quiz"].ensure(); };
  KEYS[tp+"/cards"] = function(e){ return engines[tp+"Cards"].keys(e); };
  KEYS[tp+"/quiz"]  = function(e){ return engines[tp+"Quiz"].keys(e); };
});
var TOPICS = ["list","practice","formulas","exam","readings","gdp","growth","labor","prices","saving","guide"];
var currentTopic = "list", currentMode = {list:"page", practice:"run", guide:"overview", gdp:"notes", growth:"notes", labor:"notes", prices:"notes", saving:"notes", formulas:"notes", exam:"mock", readings:"page"};
function showMode(topic, mode){
  currentMode[topic] = mode;
  $$('.seg[data-modes="'+topic+'"] button').forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-mode") === mode)); });
  $$('#topic-'+topic+' .panel').forEach(function(p){ p.hidden = (p.getAttribute("data-panel") !== topic+"/"+mode); });
  var id = topic+"/"+mode;
  if(ON_SHOW[id]) ON_SHOW[id]();
  store.set("mode."+topic, mode);
}
function showTopic(id){
  currentTopic = id;
  $$(".topic-btn").forEach(function(b){ b.setAttribute("aria-selected", String(b.getAttribute("data-topic") === id)); });
  $$(".topic").forEach(function(s){ s.hidden = (s.id !== "topic-"+id); });
  showMode(id, currentMode[id]);
  store.set("topic", id);
}
$$(".topic-btn").forEach(function(b){
  b.addEventListener("click", function(){ showTopic(b.getAttribute("data-topic")); window.scrollTo({top:$(".topics").offsetTop - 8, behavior:"smooth"}); });
});
$$(".seg[data-modes]").forEach(function(seg){
  seg.addEventListener("click", function(e){
    var b = e.target.closest ? e.target.closest("button[data-mode]") : null;
    if(b) showMode(seg.getAttribute("data-modes"), b.getAttribute("data-mode"));
  });
});
document.addEventListener("keydown", function(e){
  var t = e.target, tag = (t && t.tagName) || "";
  if(/INPUT|TEXTAREA|SELECT/.test(tag)) return;
  if(tag === "BUTTON" && (e.key === " " || e.key === "Enter")) return;
  var h = KEYS[currentTopic+"/"+currentMode[currentTopic]];
  if(h && h(e)) e.preventDefault();
});

/* ---- come back to where you were ---- */
(function(){
  var t = store.get("topic");
  /* the first visit after My List was added lands on it, whatever was open before */
  if(!store.get("seenList")){ t = "list"; store.set("seenList", "1"); store.set("mode.list", "page"); }
  TOPICS.forEach(function(k){ var m = store.get("mode."+k); if(m && $('.seg[data-modes="'+k+'"] button[data-mode="'+m+'"]')) currentMode[k] = m; });
  /* a link can open a tab directly: …/macro/#practice */
  var h = (location.hash || "").replace("#", "");
  if(h && TOPICS.indexOf(h) >= 0) t = h;
  showTopic(t && TOPICS.indexOf(t) >= 0 ? t : "list");
})();

window.addEventListener("hashchange", function(){ var h = (location.hash || "").replace("#", ""); if(h && TOPICS.indexOf(h) >= 0) showTopic(h); });

/* ---- offline copy: the service worker keeps the page on the phone ---- */
if("serviceWorker" in navigator && /^https?:/.test(location.protocol)){
  /* when a newer version of the page is published, switch to it: check on every
     open and every return to the page, and reload once the new copy takes over */
  var hadController = !!navigator.serviceWorker.controller, reloading = false, swReg = null;
  navigator.serviceWorker.addEventListener("controllerchange", function(){ if(hadController && !reloading){ reloading = true; location.reload(); } });
  navigator.serviceWorker.register("sw.js").then(function(reg){ swReg = reg; reg.update(); }).catch(function(){});
  document.addEventListener("visibilitychange", function(){ if(document.visibilityState === "visible" && swReg) swReg.update().catch(function(){}); });
}
