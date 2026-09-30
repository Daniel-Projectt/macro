/* ================================================================ readings: every way to study one reading
   Pick a reading at the top (coming up, or already taken), then study it seven ways:
   Start here · Flashcards · Who said what · Practice · The real thing (5 questions,
   4 minutes) · How he asks · Past quizzes (the 45 real questions from quizzes 1–9). */
var rdState = {cur:null, mode:"page", timer:null, eng:{}};
function rdGet(id){ return READING_BY_ID[id] || PAST_BY_ID[id] || null; }
function rdLabel(r){ return r.who ? r.who + (r.year ? " (" + r.year + ")" : "") : r.title; }
function rdBuilt(r){ return !!(r && (r.q || r.qs)); }

/* a question from a quiz already taken, with what he picked */
function pastExplain(b){
  if(b.mine === b.right) return "You got this one on the quiz." + (b.why ? " " + b.why : "");
  return "On the quiz you picked “" + b.o[b.mine] + ".” " + (b.likely ? "Canvas hides the key; the most likely answer is the one above. " : "") + (b.why || "");
}
function fromPast(p, i){
  var b = p.qs[i];
  return {key:"pq:" + p.n + ":" + i, sec:null, hot:0, ap:false, kind:"mc", text:b.q, cue:"Reading Quiz #" + p.n + " · " + rdLabel(p),
    opts:shuffle(b.o.map(function(o, j){ return {html:o, ok:j === b.right}; })), explain:pastExplain(b),
    miss:strip(b.q) + " — <b>" + b.o[b.right] + "</b>" + (b.likely ? " (most likely)" : "")};
}
function pastQuestions(filter){
  var out = [];
  PAST_RQ.forEach(function(p){ p.qs.forEach(function(b, i){ if(!filter || filter(b)) out.push(fromPast(p, i)); }); });
  return shuffle(out);
}
function rdQuestions(id, n){
  var r = rdGet(id), qs = [];
  if(r && r.q) qs = readingQuestions(id);
  else if(r && r.qs) qs = shuffle(r.qs.map(function(b, i){ return fromPast(r, i); }));
  return n ? qs.slice(0, n) : qs;
}
function rdDeck(r){
  if(r.cards) return r.cards.map(function(c){ return {front:c[0], back:c[1]}; });
  if(r.qs) return r.qs.map(function(b){ return {front:b.q, back:b.o[b.right] + (b.likely ? " (most likely)" : "")}; });
  return [];
}
function rdCardFaces(deck){
  return shuffle(deck).map(function(c){
    return {front:'<div class="mid" style="font-family:var(--serif);letter-spacing:.01em;text-transform:none;font-size:clamp(18px,4vw,24px);line-height:1.4">' + c.front + '</div>',
            back:'<div class="bname">' + c.front + '</div><div class="bsound" style="margin-top:12px">' + c.back + '</div>'};
  });
}

/* ---- the picker ---- */
function renderRdPick(){
  function btn(r, sub){ return '<button type="button" class="rdbtn' + (rdBuilt(r) ? '' : ' soon') + '" data-rd="' + r.id + '" aria-pressed="' + (r.id === rdState.cur) + '"><span class="rdn">' + sub + '</span>' + r.title + '</button>'; }
  $("#rdPick").innerHTML =
    '<h3 class="rdgroup">Coming up</h3><div class="rdlist">' + READINGS.map(function(r){ return btn(r, 'Quiz #' + r.n + ' &middot; ' + r.date + (rdBuilt(r) ? '' : ' &middot; soon')); }).join("") + '</div>' +
    '<h3 class="rdgroup">Already taken</h3><div class="rdlist past">' + PAST_RQ.map(function(p){ return btn(p, 'Quiz #' + p.n + ' &middot; you got ' + p.score + '/5'); }).join("") + '</div>';
  $$("#rdPick [data-rd]").forEach(function(b){
    b.addEventListener("click", function(){
      rdState.cur = b.getAttribute("data-rd"); store.set("reading", rdState.cur);
      renderRdPick(); renderRdMode(rdState.mode);
      var m = $(".topic#topic-readings .modes"); if(m) m.scrollIntoView({behavior:"smooth", block:"start"});
    });
  });
}
function rdHead(r){
  return '<h2 class="rdtitle">' + r.title + (r.who ? ' <small>' + rdLabel(r) + '</small>' : '') + '</h2>' + divider();
}
function rdNotBuilt(r){
  return '<div class="note-sec rdpage">' + rdHead(r) + '<p class="knowline"><span class="know">Reading Quiz #' + r.n + ' &middot; ' + r.date + '</span></p><p>Not built yet. It will be ready before its class.</p></div>';
}
function rdStopTimer(){ if(rdState.timer){ clearInterval(rdState.timer); rdState.timer = null; } }

/* ---- the review list: every question, the right answer, and his pick ---- */
function pastReview(list){
  return list.map(function(p){
    return '<div class="pastq"><h3 class="rdgroup">Reading Quiz #' + p.n + ' &middot; ' + rdLabel(p) + ' &middot; ' + p.score + '/5</h3>' +
      p.qs.map(function(b, i){
        return '<div class="pqi"><p class="pqq"><b>' + (i + 1) + '.</b> ' + b.q + '</p><ul class="pqo">' +
          b.o.map(function(o, j){
            var cls = j === b.right ? 'right' : (j === b.mine ? 'mine' : '');
            var tag = j === b.right ? (b.likely ? '<span class="pqt">most likely</span>' : '<span class="pqt">right</span>') : (j === b.mine ? '<span class="pqt">your pick</span>' : '');
            return '<li class="' + cls + '">' + o + tag + '</li>';
          }).join("") + '</ul>' + (b.mine !== b.right && b.why ? '<p class="pqwhy">' + b.why + '</p>' : '') + '</div>';
      }).join("") + '</div>';
  }).join("");
}

/* ---- How he asks: counted from the 45 real questions ---- */
function renderRdHow(){
  var s = pastStats(), pct = function(a, b){ return Math.round(100 * a / b); };
  var misses = [];
  PAST_RQ.forEach(function(p){ p.qs.forEach(function(b){ if(b.mine !== b.right) misses.push({p:p, b:b}); }); });
  $("#rdHow").innerHTML = '<div class="note-sec rdpage">' +
    '<h2 class="rdtitle">How he writes reading quizzes</h2>' + divider() +
    '<p class="knowline"><span class="know">Counted from your 45 real questions, Reading Quizzes 1&ndash;9</span></p>' +
    '<div class="point"><b>The quiz</b><p><b>5 questions, 4 minutes</b>, on Canvas at 12:30 at the start of class. That is under a minute each. Canvas never shows you the answers afterwards.</p></div>' +
    '<h3 class="sub">The question types</h3><ul>' +
    '<li><b>&ldquo;According to [Author] ([year]), &hellip;&rdquo;</b> &mdash; ' + s.according + ' of ' + s.n + ' questions name the author and year. Know the author&rsquo;s name and year cold, and what they personally argue.</li>' +
    '<li><b>The thesis</b> &mdash; &ldquo;best captures the thesis,&rdquo; &ldquo;best synthesizes,&rdquo; &ldquo;overall conclusion&rdquo; (' + s.thesis + ' times). Know the author&rsquo;s main claim in one sentence.</li>' +
    '<li><b>&ldquo;Which does NOT align&rdquo; / &ldquo;is NOT one of&rdquo;</b> (' + s.not + ' times). Three options restate the author; find the one that contradicts him.</li>' +
    '<li><b>Lists from the reading</b> &mdash; &ldquo;four criteria of justice,&rdquo; ironies, reasons. Learn every numbered list the author gives (Stein has <b>seven</b> arguments against interest and <b>five</b> things change would need).</li>' +
    '<li><b>Terms the author defines</b> &mdash; &ldquo;graduated tithe,&rdquo; &ldquo;proportionality,&rdquo; &ldquo;stewardship.&rdquo; Know the author&rsquo;s exact meaning, not the everyday one.</li>' +
    '<li><b>A quote, then &ldquo;why&rdquo;</b> &mdash; he quotes a sentence and asks the reason behind it.</li></ul>' +
    '<h3 class="sub">What the right answer looks like</h3><ul>' +
    '<li><b>It restates the author&rsquo;s own view, in the author&rsquo;s own words</b> &mdash; usually the moderate, qualified position (&ldquo;requires&hellip; but does not provide a precise roadmap&rdquo;).</li>' +
    '<li><b>Tiebreaker:</b> on the ' + s.sure + ' questions where the answer is known, the right answer was the <b>longest option ' + s.longest + ' times (' + pct(s.longest, s.sure) + '%)</b>. Know the reading first; use this only when you are stuck between two.</li>' +
    '<li><b>Wrong answers</b> are usually extreme (&ldquo;only,&rdquo; &ldquo;always,&rdquo; &ldquo;pointless,&rdquo; &ldquo;commands&rdquo;), the opposite of the thesis, or a view the author argues <i>against</i>.</li></ul>' +
    '<h3 class="sub">Your ' + misses.length + ' misses, and the trap in each</h3><ul class="missl">' +
    misses.map(function(m){ return '<li><span class="rdn">Quiz #' + m.p.n + ' &middot; ' + rdLabel(m.p) + '</span>You picked <i>&ldquo;' + m.b.o[m.b.mine] + '&rdquo;</i><br>Answer' + (m.b.likely ? ' (most likely)' : '') + ': <b>' + m.b.o[m.b.right] + '</b>' + (m.b.why ? '<br><span class="pqwhy">' + m.b.why + '</span>' : '') + '</li>'; }).join("") + '</ul>' +
    '<p class="tip"><b>The pattern in your misses:</b> each time you chose an answer that sounds pious or reasonable on its own but is <b>not what this author argues</b> &mdash; punishment for sin, commanded redistribution, giving by need, &ldquo;hidden spiritual decay.&rdquo; Ask: <i>would this author write that sentence?</i></p>' +
    '<h3 class="sub">The night before</h3><ol>' +
    '<li>Read <b>Start here</b> once, slowly.</li><li>Flashcards until you can say each back.</li><li><b>Who said what</b> until it&rsquo;s clean (history readings mix up names on purpose).</li><li>Practice until you pass twice in a row.</li><li>Finish with <b>The real thing</b>: 5 questions, 4 minutes.</li></ol>' +
    '</div>';
}

/* ---- each mode for the current reading ---- */
function renderRdMode(mode){
  rdState.mode = mode;
  rdStopTimer();
  var r = rdGet(rdState.cur), built = rdBuilt(r);
  if(mode === "how"){ renderRdHow(); return; }
  if(mode === "past"){
    var box = $("#rdPastBox");
    $("#rdPastBar").innerHTML = '<div class="toolbar" style="justify-content:center"><button class="btn primary" type="button" data-pq="all">Quiz me on all 45</button><button class="btn" type="button" data-pq="miss">Only my 7 misses</button><button class="btn" type="button" data-pq="list">See every question</button></div>';
    function run(kind){
      if(kind === "list"){ rdState.eng.past = null; box.innerHTML = pastReview(PAST_RQ); return; }
      rdState.eng.past = makeQuiz(box, function(){ return pastQuestions(kind === "miss" ? function(b){ return b.mine !== b.right; } : null); }, {againLabel:"Again, reshuffled"});
      rdState.eng.past.start(null);
    }
    $$("#rdPastBar [data-pq]").forEach(function(b){ b.addEventListener("click", function(){ run(b.getAttribute("data-pq")); }); });
    if(!box.innerHTML) run("list");
    return;
  }
  if(mode === "page"){
    if(!built){ $("#rdPage").innerHTML = rdNotBuilt(r); return; }
    if(r.start){
      $("#rdPage").innerHTML = '<div class="note-sec rdpage">' + rdHead(r) +
        '<p class="knowline"><span class="know">Reading Quiz #' + r.n + ' &middot; ' + r.date + ' &middot; 5 questions, 4 minutes, in class</span></p>' + r.start +
        '<div class="toolbar" style="justify-content:center;margin-top:18px"><button class="btn primary" type="button" data-go-rd="quiz">Practice (' + r.q.length + ' questions)</button><button class="btn" type="button" data-go-rd="real">The real thing: 5 in 4 minutes</button></div></div>';
    } else {
      $("#rdPage").innerHTML = '<div class="note-sec rdpage">' + rdHead(r) +
        '<p class="knowline"><span class="know">Reading Quiz #' + r.n + ' &middot; ' + r.date + ' &middot; you scored ' + r.score + '/5</span></p>' +
        '<p>This quiz is done. Here are its five real questions, the right answer to each, and what you picked. Canvas hides the key, so where you missed one the answer is marked &ldquo;most likely.&rdquo;</p>' +
        pastReview([r]) + '</div>';
    }
    $$("#rdPage [data-go-rd]").forEach(function(b){ b.addEventListener("click", function(){ showMode("readings", b.getAttribute("data-go-rd")); }); });
    return;
  }
  var target = {cards:"#rdCards", match:"#rdMatch", quiz:"#rdQuizBox", real:"#rdRealBox"}[mode];
  if(!built){ $(target).innerHTML = rdNotBuilt(r); if(mode === "cards") $("#rdCardsBar").innerHTML = ""; if(mode === "real") $("#rdTimer").innerHTML = ""; return; }
  if(mode === "cards"){
    var deck = rdDeck(r);
    $("#rdCardsBar").innerHTML = '<div class="toolbar"><span class="label">' + deck.length + ' cards &middot; ' + rdLabel(r) + '</span><button class="btn" type="button" id="rdShuffle">Shuffle</button></div>';
    rdState.eng.cards = makeCards($("#rdCards")); rdState.eng.cards.load(rdCardFaces(deck));
    $("#rdShuffle").addEventListener("click", function(){ rdState.eng.cards.load(rdCardFaces(deck)); });
  } else if(mode === "match"){
    if(!r.match){ $("#rdMatch").innerHTML = '<p class="hint">Who said what is for the readings with people and dates in them. This one is practiced in Flashcards and Practice.</p>'; return; }
    rdState.eng.match = makeMatch($("#rdMatch"), function(){
      var items = r.match.map(function(p, i){ return {id:r.id + "m" + i, left:p[0], right:p[1]}; });
      return {leftTitle:"Who", rightTitle:"What they said", items:pick(items, Math.min(6, items.length))};
    });
    rdState.eng.match.ensure();
  } else if(mode === "quiz"){
    rdState.eng.quiz = makeQuiz($("#rdQuizBox"), function(){ return rdQuestions(rdState.cur); }, {againLabel:"Again, reshuffled"});
    rdState.eng.quiz.start(null);
  } else if(mode === "real"){
    $("#rdTimer").innerHTML = "";
    $("#rdRealBox").innerHTML = '<div class="quizWrap"><div class="qcard card-corners">' + CORNERS +
      '<div class="qnum">The real thing</div><p class="qtext">Five questions and four minutes, like 12:30 in class. The clock starts when you press Start. Questions are drawn fresh each time.</p>' +
      '<div class="toolbar" style="justify-content:center;margin-top:22px"><button class="btn primary" type="button" id="rdRealGo">Start the clock</button></div></div></div>';
    $("#rdRealGo").addEventListener("click", function(){
      var left = 240, box = $("#rdRealBox"), t = $("#rdTimer");
      rdState.eng.real = makeQuiz(box, function(){ return rdQuestions(rdState.cur, 5); }, {againLabel:"Another five"});
      rdState.eng.real.start(null);
      function tick(){
        if($(".result", box)){ rdStopTimer(); t.innerHTML = '<p class="rdclock done">Finished with ' + Math.floor(left / 60) + ':' + ("0" + left % 60).slice(-2) + ' to spare.</p>'; return; }
        if(left <= 0){ rdStopTimer(); t.innerHTML = '<p class="rdclock over">Time&rsquo;s up &mdash; in class, Canvas would submit now. Finish to see how you would have done.</p>'; return; }
        t.innerHTML = '<p class="rdclock' + (left <= 60 ? ' low' : '') + '">' + Math.floor(left / 60) + ':' + ("0" + left % 60).slice(-2) + ' left</p>';
        left--;
      }
      tick(); rdState.timer = setInterval(tick, 1000);
    });
  }
}
function initReadings(){
  var saved = store.get("reading");
  rdState.cur = rdGet(saved) ? saved : READINGS.filter(rdBuilt).slice(-1)[0].id;
  renderRdPick();
  renderRdMode("page");
}
