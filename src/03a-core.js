/* ================================================================ helpers */
function $(s,r){ return (r||document).querySelector(s); }
function $$(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }
function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)), t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function pick(a,n){ return shuffle(a).slice(0,n); }
function uniqBy(arr, fn){ var seen={}, out=[]; arr.forEach(function(x){ var k=fn(x); if(!seen[k]){ seen[k]=1; out.push(x); } }); return out; }
function strip(s){ return String(s).replace(/<[^>]+>/g,""); }
var store = {
  get:function(k){ try{ return localStorage.getItem("macro."+k); }catch(e){ return null; } },
  set:function(k,v){ try{ localStorage.setItem("macro."+k, v); }catch(e){} }
};
var CORNERS = ['tl','tr','bl','br'].map(function(c){ return '<svg class="c '+c+'" aria-hidden="true"><use href="#corner"/></svg>'; }).join('');
var CHAPTERS = ["gdp","growth","labor","prices","saving","lf","money","tvm","bank","fed","qtm","infl","fiscal","phillips","adas","formulas"];
var UNIT1 = ["gdp","growth","labor","prices","saving","formulas"], UNIT2 = ["lf","money","tvm","bank","fed","qtm","infl"], UNIT3 = ["fiscal","phillips","adas"];
var TOPIC_NAMES = {};
CHAPTERS.forEach(function(tp){ TOPIC_NAMES[tp] = CH[tp].short; });
/* Every question and card carries the id of the study-guide section it belongs to */
var SEC_TITLES = {}, SEC_CHAPTER = {};
GUIDE.sections.forEach(function(s){ s.items.forEach(function(it){ SEC_TITLES[it.id] = it.t; SEC_CHAPTER[it.id] = s.tp; }); });

/* Where each question comes from: 2 = a problem-set question he missed, 1 = a
   problem-set-style question, 0 = a concept from the readings. Set on the
   question itself (m:), not worked out from a concept map.                  */
var TIER_TITLES = {}, TIER_BLURBS = {};
TIERS.forEach(function(t){ TIER_TITLES[t.w] = t.t; TIER_BLURBS[t.w] = t.s; });
function hotOf(sec, text){
  var best = 0;
  CONFIRMED.forEach(function(c){ if(c.sec === sec && c.w > best && c.k.test(text)) best = c.w; });
  return best;
}
QB.forEach(function(b){
  var ans = (b.a === true) ? "true" : (b.a === false) ? "false" : b.a;
  b.hot = b.m || 0;   /* 2 = a problem-set question he missed, 1 = problem-set style, 0 = from the readings */
});

/* ---- verdicts by grade: warm, plain, never a joke at the reader's expense ---- */
var VERDICTS = [
  {min:100, a:"Nothing left to fix here. Try the full set of chapter quizzes next.",
   t:["Flawless.","Perfect \u2014 every one.","Word-perfect.","Nothing to correct."]},
  {min:85,  a:"Strong. The misses below are the whole job now.",
   t:["Strong.","Very well done.","Nearly perfect.","Excellent work."]},
  {min:70,  a:"A solid base, with a few real gaps. Work the misses, then take it again.",
   t:["Good work.","A solid pass.","Coming along nicely.","Well on your way."]},
  {min:50,  a:"About half. A pass through the notes and flashcards for this chapter before testing again will lift this quickly.",
   t:["Halfway there.","A fair start.","Keep going.","Room to grow."]},
  {min:0,   a:"It is easier to test once the material is in place \u2014 start with the notes and flashcards, then come back.",
   t:["A first pass.","Early days.","Not yet \u2014 and that\u2019s all right.","Begin with the notes."]}
];
function verdictFor(p){
  for(var i=0;i<VERDICTS.length;i++){ if(p >= VERDICTS[i].min){ var v = VERDICTS[i]; return {t:pick(v.t,1)[0], a:v.a}; } }
  var last = VERDICTS[VERDICTS.length-1]; return {t:last.t[0], a:last.a};
}

/* ================================================================ question building */
/* Pair sets (term, meaning) per chapter, from every deck not marked match:false.
   Used for Match and for generated identification questions.                    */
var PAIRSETS = {};
CHAPTERS.forEach(function(tp){
  var pairs = [];
  CH[tp].decks.forEach(function(d){ if(d.match === false) return; d.cards.forEach(function(c){ pairs.push([c[0], c[1], c[2]]); }); });
  pairs = uniqBy(uniqBy(pairs, function(p){ return p[1]; }), function(p){ return p[0]; });
  PAIRSETS[tp] = {left:"Term", right:"Meaning", pairs:pairs};
});

function fromBank(b, i){
  var q = {key:b.tp+":"+i, tp:b.tp, sec:b.sec, hot:b.hot || 0, ap:!!b.ap, kind:b.t, text:b.q, explain:b.e};
  if(b.t === "tf"){
    q.opts = [{html:"True", ok:b.a === true, cls:"tf"}, {html:"False", ok:b.a === false, cls:"tf"}];
    q.miss = strip(b.q) + " — <b>" + (b.a ? "True" : "False") + "</b>";
  } else {
    q.opts = shuffle([{html:b.a, ok:true}].concat(b.w.map(function(w){ return {html:w, ok:false}; })));
    q.miss = strip(b.q) + " — <b>" + b.a + "</b>";
  }
  return q;
}
/* Identification questions generated from a pair set; wrong answers redrawn each time */
function fromPair(tp, idx, reverse){
  var set = PAIRSETS[tp], p = set.pairs[idx];
  var others = pick(set.pairs.filter(function(o, j){ return j !== idx; }), 3);
  var q = {key:tp+":p"+idx+(reverse?"r":""), tp:tp, sec:p[2], hot:hotOf(p[2], p[0]+" "+p[1]), ap:false, kind:"id"};
  if(reverse){
    q.text = "Which meaning fits <b>" + p[0] + "</b>?";
    q.opts = shuffle([{html:p[1], ok:true}].concat(others.map(function(o){ return {html:o[1], ok:false}; })));
  } else {
    q.text = "“" + p[1] + "” — which term?";
    q.opts = shuffle([{html:p[0], ok:true}].concat(others.map(function(o){ return {html:o[0], ok:false}; })));
  }
  q.explain = "<b>" + p[0] + "</b>: " + p[1] + ".";
  q.miss = p[0] + " — <b>" + p[1] + "</b>";
  return q;
}
/* A question marked off:true never enters a quiz (none is, now that the page holds only the study guide) */
function bankFor(tp){ var out = []; QB.forEach(function(b, i){ if(b.off) return; if(!tp || b.tp === tp) out.push({b:b, i:i}); }); return out; }

/* Two questions "are the same" when the thing being asked and the right answer
   are mostly the same words — a written question and the identification question
   generated from the matching flashcard, for instance. One quiz never shows both. */
var STOPWORDS = {};
"the a an of to in is are was were for on by with which that this these those it its as and or not be what who whom whose how why when where does do did can may might one more most than then from at into".split(" ").forEach(function(w){ STOPWORDS[w] = 1; });
function meaningOf(q){
  var right = "";
  (q.opts || []).forEach(function(o){ if(o.ok) right = o.html; });
  if(q.kind === "tf") right = "";            /* true/false: the statement is the meaning */
  var words = strip(q.text + " " + right).toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/);
  var set = {}, n = 0;
  words.forEach(function(w){ if(w.length > 2 && !STOPWORDS[w] && !set[w]){ set[w] = 1; n++; } });
  return {set:set, n:n};
}
function sameThing(a, b){
  if(!a.n || !b.n) return false;
  var shared = 0;
  Object.keys(a.set).forEach(function(w){ if(b.set[w]) shared++; });
  return shared / (a.n + b.n - shared) >= 0.6;
}
/* Draw up to n questions from pool, never two that ask the same thing.
   Pool order decides which of a pair survives — written questions come first.  */
function drawDistinct(pool, n){
  var out = [], seen = [];
  for(var i = 0; i < pool.length && out.length < n; i++){
    var mean = meaningOf(pool[i]), dup = false;
    for(var j = 0; j < seen.length && !dup; j++) dup = sameThing(mean, seen[j]);
    if(!dup){ out.push(pool[i]); seen.push(mean); }
  }
  return out;
}

/* A chapter quiz: mostly written questions, about a third identification */
function topicQuestions(tp, keys, n){
  n = n || 10;
  if(keys && keys.length) return shuffle(questionsByKeys(keys)).slice(0, n);
  var bank = shuffle(bankFor(tp).map(function(x){ return fromBank(x.b, x.i); }));
  var gen = shuffle(PAIRSETS[tp].pairs.map(function(p, i){ return fromPair(tp, i, Math.random() < 0.5); }));
  var nGen = Math.min(gen.length, Math.floor(n/3));
  /* written questions lead, so a written one always outranks the card it echoes */
  var out = drawDistinct(bank.concat(gen), n - nGen).concat(drawDistinct(gen, nGen));
  out = drawDistinct(out, n);
  if(out.length < n) out = drawDistinct(out.concat(bank, gen), n);
  return shuffle(out);
}
/* A rehearsal for one problem set: as many questions as the real one, about a third of them
   calculations and shift problems with fresh numbers, the rest written questions on its chapter. */
var PS_SEQ = 0;
function psGens(s){
  return GENS.filter(function(g){ return s.gens ? s.gens.indexOf(g.id) >= 0 : g.topic === s.px; });
}
function psFromGen(s, g, sec){
  var pq = formatProblem(g, g.make(), "mc", {});
  if(!pq || !pq.opts || pq.opts.filter(function(o){ return o.ok; }).length !== 1) return null;
  /* label it with its own section: the generator's, else one whose title fits (a shift problem → the shifts section) */
  if(g.sec && SEC_CHAPTER[g.sec] === s.ch) sec = g.sec;
  else if(/shift/.test(g.id)) for(var k in SEC_TITLES) if(SEC_CHAPTER[k] === s.ch && /shift/i.test(SEC_TITLES[k])){ sec = k; break; }
  return {key:"ps:" + g.id + ":" + (++PS_SEQ), tp:s.ch, sec:sec, hot:0, ap:true, kind:pq.fmt === "tf" ? "tf" : "mc",
    text:pq.text, opts:pq.opts, explain:"The answer is <b>" + pq.right + "</b>. " + pq.work + (pq.remind ? ' <span class="listline">Remember: ' + pq.remind + '</span>' : ""),
    miss:strip(pq.text).slice(0, 160) + " — <b>" + pq.right + "</b>"};
}
function psRehearsal(s){
  var n = s.n || 10, gens = psGens(s), out = [], seen = {}, guard = 0;
  var sec = null; for(var k in SEC_CHAPTER) if(SEC_CHAPTER[k] === s.ch){ sec = k; break; }
  var nCalc = gens.length ? Math.min(n - 1, Math.max(2, Math.round(n * 0.36))) : 0;
  while(out.length < nCalc && guard++ < nCalc * 25){
    var q = psFromGen(s, gens[guard % gens.length], sec), t = q && strip(q.text);
    if(q && !seen[t]){ seen[t] = 1; out.push(q); }
  }
  return shuffle(out.concat(topicQuestions(s.ch, null, n - out.length)));
}
/* Rebuild exact questions from their keys ("tp:i" bank, "tp:pN" / "tp:pNr" pairs); anything malformed is dropped */
/* a reading's practice quiz: its questions, shuffled, wrong answers reshuffled each time */
function fromReading(r, i){
  var b = r.q[i], q = {key:"rd:"+r.id+":"+i, sec:null, hot:0, ap:!!b.ap, kind:b.t, text:b.q, explain:b.e, cue:"Reading Quiz #"+r.n+" · "+(r.who || r.title)};
  if(b.t === "tf"){
    q.opts = [{html:"True", ok:b.a === true, cls:"tf"}, {html:"False", ok:b.a === false, cls:"tf"}];
    q.miss = strip(b.q) + " — <b>" + (b.a ? "True" : "False") + "</b>";
  } else {
    q.opts = shuffle([{html:b.a, ok:true}].concat(b.w.map(function(w){ return {html:w, ok:false}; })));
    q.miss = strip(b.q) + " — <b>" + b.a + "</b>";
  }
  return q;
}
function readingQuestions(id){
  var r = READING_BY_ID[id];
  return r && r.q ? shuffle(r.q.map(function(b, i){ return fromReading(r, i); })) : [];
}
function questionsByKeys(keys){
  return uniqBy(keys, function(k){ return k; }).map(function(k){
    var pq = /^pq:(\d+):(\d+)$/.exec(k);
    if(pq){ var pp = PAST_BY_ID["past" + pq[1]], pj = parseInt(pq[2],10); return (pp && pp.qs[pj]) ? fromPast(pp, pj) : null; }
    var rd = /^rd:([a-z0-9]+):(\d+)$/.exec(k);
    if(rd){ var r = READING_BY_ID[rd[1]], j = parseInt(rd[2],10); return (r && r.q && r.q[j]) ? fromReading(r, j) : null; }
    var m = /^([a-z0-9]+):p(\d+)(r?)$/.exec(k);
    if(m){
      var set = PAIRSETS[m[1]], i = parseInt(m[2],10);
      return (set && i < set.pairs.length) ? fromPair(m[1], i, m[3] === "r") : null;
    }
    var lg = /^lgen:([a-z0-9-]+):([a-z]+):([A-Za-z0-9]*):(\d+):\d+$/.exec(k);
    if(lg){ var gg = GEN_BY_ID[lg[1]], rr = gg && LIST_BY_ID[gg.row]; return rr ? (listFromGen(rr, gg, lg[2], lg[3] || undefined, parseInt(lg[4], 10)) || listWritten(rr)) : null; }
    var li = /^lid:([a-z]+):([01]):\d+$/.exec(k);
    if(li){ return LIST_BY_ID[li[1]] ? listIdent(LIST_BY_ID[li[1]], li[2] === "1") : null; }
    var l = /^list:(\d+)$/.exec(k);
    if(l){ var li = parseInt(l[1],10); return LISTQ[li] ? fromList(LISTQ[li], li) : null; }
    var b = /^([a-z0-9]+):(\d+)$/.exec(k);
    if(!b) return null;
    var j = parseInt(b[2],10);
    return (QB[j] && QB[j].tp === b[1]) ? fromBank(QB[j], j) : null;
  }).filter(Boolean);
}
/* The practice exam: every chapter, reshuffled.
   types  — all / mc / tf / ap
   focus  — all, or one source tier: misses / ps / rest                        */
var FOCUS_HOT = {exam1:3, misses:2, ps:1, rest:0};
/* Exam 1 again: every multiple-choice and true/false question from the real exam */
function exam1Questions(){
  var out = [];
  QB.forEach(function(b, i){ if(b.ex && !b.off) out.push(fromBank(b, i)); });
  return shuffle(out);
}
function mockQuestions(cfg){
  var tps = cfg.topics && cfg.topics.length ? cfg.topics : CHAPTERS.slice();
  var n = cfg.n || 25;
  var hot = (cfg.focus && cfg.focus !== "all") ? FOCUS_HOT[cfg.focus] : null;
  var pool = [];
  QB.forEach(function(b, i){
    if(b.off || tps.indexOf(b.tp) < 0) return;
    if(cfg.types === "mc" && b.t !== "mc") return;
    if(cfg.types === "tf" && b.t !== "tf") return;
    if(cfg.types === "ap" && !b.ap) return;
    if(hot !== null && (b.hot || 0) !== hot) return;
    pool.push(fromBank(b, i));
  });
  if(cfg.types === "all" || cfg.types === "mc" || !cfg.types){
    tps.forEach(function(tp){
      pick(PAIRSETS[tp].pairs.map(function(p, i){ return i; }), 3).forEach(function(i){
        var q = fromPair(tp, i, Math.random() < 0.5);
        if(hot === null || (q.hot || 0) === hot) pool.push(q);
      });
    });
  }
  /* spread across chapters, and never two questions asking the same thing */
  var byTp = {}; tps.forEach(function(t){ byTp[t] = shuffle(pool.filter(function(q){ return q.tp === t; })); });
  var out = [], seen = [], k = 0;
  while(out.length < n){
    var t = tps[k % tps.length], list = byTp[t];
    if(list.length){
      var q = list.shift(), mean = meaningOf(q), dup = false;
      for(var j = 0; j < seen.length && !dup; j++) dup = sameThing(mean, seen[j]);
      if(!dup){ out.push(q); seen.push(mean); }
    }
    if(tps.every(function(x){ return !byTp[x].length; })) break;
    k++;
  }
  return shuffle(out);
}

/* The 38 for the exam — its real length. Every section of the outline is
   represented, two questions each, leaning towards the problem-set questions
   he missed without shutting out the readings.                              */
function finalFifty(n, unit){
  n = n || 50; unit = unit || UNIT1;
  var secs = [], bySec = {};
  GUIDE.sections.forEach(function(s){ if(unit.indexOf(s.tp) < 0) return; s.items.forEach(function(it){ secs.push(it.id); bySec[it.id] = []; }); });
  QB.forEach(function(b, i){ if(!b.off && bySec[b.sec]) bySec[b.sec].push(fromBank(b, i)); });
  secs.forEach(function(id){
    bySec[id] = bySec[id].map(function(q){ return {q:q, r:(q.hot || 0) + Math.random()*1.8}; })
                         .sort(function(a, c){ return c.r - a.r; })
                         .map(function(x){ return x.q; });
  });
  var out = [], seen = [];
  function take(id){
    var list = bySec[id];
    while(list.length){
      var q = list.shift(), mean = meaningOf(q), dup = false;
      for(var j = 0; j < seen.length && !dup; j++) dup = sameThing(mean, seen[j]);
      if(!dup){ out.push(q); seen.push(mean); return true; }
    }
    return false;
  }
  var per = Math.floor(n / secs.length);
  for(var r = 0; r < per; r++) secs.forEach(function(id){ if(out.length < n) take(id); });
  var order = shuffle(secs), k = 0;   /* the spare questions go to sections drawn at random */
  while(out.length < n && k < order.length * 8){ if(out.length < n) take(order[k % order.length]); k++; }
  return shuffle(out);
}

/* ================================================================ my list
   The one-page list: its rows in order, its flashcards, and a quiz round with
   one question for every line, drawn fresh each time.                        */
var LIST_ROWS = [], LIST_BY_ID = {};
LIST.forEach(function(g){ g.rows.forEach(function(r){ r.ch = g.ch; LIST_ROWS.push(r); LIST_BY_ID[r.id] = r; }); });
function fromList(b, i){
  var r = LIST_BY_ID[b.row];
  var q = {key:"list:"+i, tp:SEC_CHAPTER[r.sec], sec:r.sec, row:r.id, cue:r.cue, ch:r.ch, hot:0, ap:false, kind:b.t, text:b.q,
           explain:b.e+'<span class="listline">On your list &middot; <b>'+r.cue+'</b>: '+r.line+'</span>'};
  if(b.t === "tf"){
    q.opts = [{html:"True", ok:b.a === true, cls:"tf"}, {html:"False", ok:b.a === false, cls:"tf"}];
    q.miss = strip(b.q) + " — <b>" + (b.a ? "True" : "False") + "</b>";
  } else {
    q.opts = shuffle([{html:b.a, ok:true}].concat(b.w.map(function(w){ return {html:w, ok:false}; })));
    q.miss = strip(b.q) + " — <b>" + b.a + "</b>";
  }
  return q;
}
/* One question for every line of the list, different each round: a written
   question not asked lately, a problem with new numbers for the lines that are
   formulas, or the line itself to pick out from the others.                  */
var LIST_GENS = {}, LIST_SEQ = 0;
GENS.forEach(function(g){
  if(!g.row) return;
  var b = g.make();
  if(b.choice && !(b.parts && b.parts.length)) return;      /* the tap-only problems stay in Math Practice */
  (LIST_GENS[g.row] = LIST_GENS[g.row] || []).push(g);
});
function listLine(r){ return '<span class="listline">On your list &middot; <b>'+r.cue+'</b>: '+r.line+'</span>'; }
function listWritten(r){ var ids = []; LISTQ.forEach(function(b, i){ if(b.row === r.id) ids.push(i); }); var i = rp(ids); return fromList(LISTQ[i], i); }
function listFromGen(r, g, fmt, part, v){
  var base = g.make(v || undefined);
  if(base.choice && !(base.parts && base.parts.length)) return null;
  var pq = formatProblem(g, base, "mc", fmt ? {fmt:fmt, part:part} : {});
  if(!pq.opts) return null;
  return {key:"lgen:"+g.id+":"+pq.fmt+":"+(pq.part || "")+":"+(pq.v || 0)+":"+(++LIST_SEQ), tp:SEC_CHAPTER[r.sec], sec:r.sec, row:r.id, cue:r.cue, ch:r.ch, hot:0, ap:true,
    kind:pq.fmt === "tf" ? "tf" : "mc", text:pq.text, opts:pq.opts,
    explain:"The answer is <b>"+pq.right+"</b>. "+pq.work+listLine(r), miss:strip(pq.text).slice(0, 160)+" — <b>"+pq.right+"</b>"};
}
function listIdent(r, rev){
  var near = shuffle(LIST_ROWS.filter(function(o){ return o.id !== r.id && o.ch === r.ch; })), far = shuffle(LIST_ROWS.filter(function(o){ return o.ch !== r.ch; }));
  var others = near.slice(0, 2).concat(far).slice(0, 3);
  var q = {key:"lid:"+r.id+":"+(rev ? 1 : 0)+":"+(++LIST_SEQ), tp:SEC_CHAPTER[r.sec], sec:r.sec, row:r.id, cue:r.cue, ch:r.ch, hot:0, ap:false, kind:"mc", explain:listLine(r)};
  if(rev){
    q.text = 'Which cue goes with this line?<span class="ask">“'+r.line+'”</span>';
    q.opts = shuffle([{html:r.cue, ok:true}].concat(others.map(function(o){ return {html:o.cue, ok:false}; })));
    q.miss = strip(r.line)+" — <b>"+r.cue+"</b>";
  } else {
    q.text = "Which line goes with <b>"+r.cue+"</b>?";
    q.opts = shuffle([{html:r.line, ok:true}].concat(others.map(function(o){ return {html:o.line, ok:false}; })));
    q.miss = r.cue+" — <b>"+strip(r.line)+"</b>";
  }
  return q;
}
function listRecent(){ try { return JSON.parse(store.get("listseen") || "[]"); } catch(e){ return []; } }
function listQuestions(){
  var byRow = {}, recent = listRecent(), asked = [];
  LISTQ.forEach(function(b, i){ (byRow[b.row] = byRow[b.row] || []).push(i); });
  var out = LIST_ROWS.map(function(r){
    var gens = LIST_GENS[r.id] || [], roll = Math.random(), q = null;
    if(gens.length && roll < 0.4) q = listFromGen(r, rp(gens));
    else if(roll > (gens.length ? 0.75 : 0.7)) q = listIdent(r, Math.random() < 0.4);
    if(!q){
      /* the written question asked longest ago — one never asked comes first */
      var pool = shuffle(byRow[r.id]);
      pool.sort(function(a, b){ return recent.lastIndexOf(a) - recent.lastIndexOf(b); });
      var i = pool[0]; asked.push(i); q = fromList(LISTQ[i], i);
    }
    return q;
  });
  store.set("listseen", JSON.stringify(recent.concat(asked).slice(-80)));
  return shuffle(out);
}
function listDeck(){
  return LIST_ROWS.map(function(r){
    return {front:'<div class="mid" style="font-family:var(--serif);letter-spacing:.01em;text-transform:none;font-size:clamp(20px,4.6vw,28px);line-height:1.35">'+r.cue+'</div>',
            back:'<div class="bname">'+r.cue+'</div><div class="bsound" style="margin-top:12px">'+r.line+'</div><div class="btr" style="margin-top:12px">'+r.ch+'</div>'};
  });
}

/* ================================================================ decks and match */
function deckFor(tp, id){
  var d = CH[tp].decks.filter(function(x){ return x.id === id; })[0] || CH[tp].decks[0];
  return shuffle(d.cards).map(function(c){
    return {front:'<div class="mid" style="font-family:var(--serif);letter-spacing:.01em;text-transform:none;font-size:clamp(19px,4.2vw,26px);line-height:1.35">'+c[0]+'</div>',
            back:'<div class="bname">'+c[0]+'</div><div class="bsound" style="margin-top:12px">'+c[1]+'</div>'+(SEC_TITLES[c[2]] ? '<div class="btr" style="margin-top:12px">Section · '+SEC_TITLES[c[2]]+'</div>' : '')};
  });
}
function matchRound(tp, n){
  var set = PAIRSETS[tp];
  var items = set.pairs.map(function(p, i){ return {id:tp+i, left:p[0], right:p[1]}; });
  return {leftTitle:set.left, rightTitle:set.right, items:pick(items, Math.min(n || 6, items.length))};
}
