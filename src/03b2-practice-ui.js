/* ================================================================ math practice (the screen)
   One problem at a time: type the answer (one box, or one box per part), or
   tap it. A miss shows the answer, the working, and the reminder — the formula
   and the matching line from the list. Results are kept per kind of problem,
   so the ones missed lately come back more often.                             */
function slipNote(r){
  if(!r || !r.slip) return "";
  return r.slip === "decimal" ? " That’s the decimal — as a percent, multiply by 100." : " Right size, wrong sign.";
}
function remindHtml(q){
  var r = q.row && LIST_BY_ID[q.row];
  return '<p class="remind"><b>Remember:</b> ' + q.remind + (r ? '<span class="listline">On your list &middot; <b>' + r.cue + '</b>: ' + r.line + '</span>' : '') + '</p>';
}
function practiceFeedback(q, ok, res){
  var h = '<p class="fbline"><b>' + (ok ? "Correct." : "Not this one.") + '</b> ';
  if(q.fmt === "multi"){
    if(ok) h += 'All ' + q.parts.length + ' right.</p>';
    else h += 'Here are the ones to fix:</p><ul class="fixlist">' + q.parts.map(function(p, i){
      return res[i].ok ? '' : '<li><b>' + labelOf(p) + ': ' + shown(p) + '</b>' + slipNote(res[i]) + '<span class="work">' + p.work + '</span></li>'; }).join('') + '</ul>';
  } else {
    if(!ok) h += q.fmt === "type" ? 'The answer is <b>' + q.right + '</b>.' + slipNote(res && res[0])
               : q.fmt === "tf" ? 'It’s <b>' + (q.opts[0].ok ? "true" : "false") + '</b> — the answer is <b>' + q.right + '</b>.'
               : 'It’s <b>' + q.right + '</b>.';
    h += '<span class="work">' + q.work + '</span></p>';
  }
  return h + (ok ? '' : remindHtml(q));
}
function practicePlaceholder(p){ return p.kind === "word" ? "yes or no" : p.unit === "$" ? "$" : p.unit === "%" ? "%" : p.unit === "yr" ? "years" : "number"; }

function makePractice(root, opts){
  opts = opts || {};
  var qs = [], qi = 0, score = 0, missed = [], answered = false, cfg = {};
  function record(q, ok){
    var s = getJSON("pstats", {}), a = s[q.gen] || [];
    a.push(ok ? 1 : 0); s[q.gen] = a.slice(-5);
    store.set("pstats", JSON.stringify(s));
  }
  function start(c){ cfg = c || {}; qs = practiceQuestions(cfg, getJSON("pstats", {})); qi = 0; score = 0; missed = []; render(); }
  function shell(){
    if(!$(".dots", root)) root.innerHTML = '<div class="quizWrap"><div class="dots"></div><div class="qbody"></div></div>';
    return $(".qbody", root);
  }
  function dots(){
    var d = $(".dots", root); if(!d) return; d.innerHTML = "";
    qs.forEach(function(q, i){
      var s = document.createElement("i");
      if(q.got === true) s.className = "ok"; else if(q.got === false) s.className = "no"; else if(i === qi) s.className = "on";
      d.appendChild(s);
    });
  }
  function render(){
    var body = shell(); dots();
    if(qi >= qs.length){ results(); return; }
    var q = qs[qi]; answered = false;
    var html = '<div class="qcard card-corners">' + CORNERS +
      '<div class="qnum">Question ' + (qi + 1) + ' of ' + qs.length + ' &middot; ' + q.topicName + '</div>' +
      '<div style="text-align:center;margin-top:10px"><span class="qtag">' + FMT_LABEL[q.fmt] + '</span><span class="qtag sec">' + q.name + '</span>' + (q.src ? '<span class="qtag src">' + q.src + '</span>' : '') + '</div>' +
      '<div class="ptext">' + q.text + '</div>';
    if(q.fmt === "type"){
      html += '<div class="numrow"><input class="numin" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" aria-label="Your answer" placeholder="' + practicePlaceholder(q.parts[0]) + '"><button class="btn primary check" type="button">Check</button></div>';
    } else if(q.fmt === "multi"){
      html += '<div class="mparts">' + q.parts.map(function(p){
        return '<label class="mpart"><span class="mlab">' + labelOf(p) + '</span><input class="numin" type="text" inputmode="' + (p.kind === "word" ? "text" : "decimal") + '" autocomplete="off" spellcheck="false" placeholder="' + practicePlaceholder(p) + '"><span class="mres"></span></label>';
      }).join("") + '</div><div class="numrow"><button class="btn primary check" type="button">Check</button></div>';
    } else {
      html += '<div class="opts' + (q.fmt === "tf" ? " two" : "") + '"></div>';
    }
    html += '<div class="feedback"></div><div class="qfoot"><button class="btn primary next" type="button" hidden>Next &rsaquo;</button></div></div>';
    body.innerHTML = html;
    if(q.opts){
      var wrap = $(".opts", body);
      q.opts.forEach(function(o, i){
        var b = document.createElement("button");
        b.type = "button"; b.className = "opt " + (o.cls || "");
        b.innerHTML = '<span class="k">' + (i + 1) + '</span>' + o.html;
        b.addEventListener("click", function(){ tap(o, b); });
        wrap.appendChild(b);
      });
    } else {
      var ins = $$(".numin", body);
      $(".check", body).addEventListener("click", check);
      ins.forEach(function(inp, i){
        inp.addEventListener("keydown", function(e){
          if(e.key !== "Enter") return;
          e.preventDefault();
          if(answered){ var nb = $(".next", body); if(nb && !nb.hidden) nb.click(); }
          else if(i < ins.length - 1) ins[i + 1].focus();
          else check();
        });
      });
      try { ins[0].focus({preventScroll:true}); } catch(e){}
    }
    $(".next", body).addEventListener("click", function(){ qi++; render(); });
  }
  function check(){
    if(answered) return;
    var q = qs[qi], body = $(".qbody", root), ins = $$(".numin", body), fb = $(".feedback", body);
    var notNumber = q.parts.some(function(p, i){ var v = ins[i].value.trim(); return p.kind !== "word" && v && parseAnswer(v) === null; });
    if(notNumber){ fb.innerHTML = '<p class="fbline">Type a number — like 4,700 or 33.33.</p>'; return; }
    var res = q.parts.map(function(p, i){ return checkPart(ins[i].value, p); });
    if(res.every(function(r){ return r.blank; })){ fb.innerHTML = '<p class="fbline">Type an answer first.</p>'; return; }
    answered = true;
    var ok = res.every(function(r){ return r.ok; });
    ins.forEach(function(inp, i){ inp.disabled = true; inp.classList.add(res[i].ok ? "right" : "wrong"); });
    $(".check", body).disabled = true;
    if(q.fmt === "multi") $$(".mres", body).forEach(function(s, i){ s.className = "mres " + (res[i].ok ? "ok" : "no"); s.innerHTML = res[i].ok ? "&#10003;" : shown(q.parts[i]); });
    finish(q, ok, res);
  }
  function tap(o, node){
    if(answered) return;
    answered = true;
    var q = qs[qi], body = $(".qbody", root);
    $$(".opt", body).forEach(function(b, i){ b.disabled = true; if(q.opts[i].ok) b.classList.add("correct"); });
    if(!o.ok) node.classList.add("wrong");
    finish(q, o.ok, null);
  }
  function finish(q, ok, res){
    var body = $(".qbody", root);
    q.got = ok; record(q, ok);
    if(ok) score++; else missed.push(q);
    $(".feedback", body).innerHTML = practiceFeedback(q, ok, res);
    dots();
    var nb = $(".next", body); nb.hidden = false; nb.textContent = qi === qs.length - 1 ? "See results" : "Next";
    try { nb.focus({preventScroll:true}); } catch(e){}
  }
  function results(){
    var body = $(".qbody", root);
    if(!qs.length){
      body.innerHTML = '<div class="result card-corners">' + CORNERS + '<p class="qtext" style="margin:10px 0 0">Nothing matches those settings. Try a wider topic, or mixed numbers.</p>' +
        '<div class="toolbar" style="margin:26px 0 0"><button class="btn primary setupbtn" type="button">Change settings</button></div></div>';
      $(".setupbtn", body).addEventListener("click", opts.onSetup);
      return;
    }
    var pct = Math.round(score / qs.length * 100), v = verdictFor(pct), by = {}, order = [];
    qs.forEach(function(q){ if(!by[q.name]){ by[q.name] = {ok:0, n:0}; order.push(q.name); } by[q.name].n++; if(q.got) by[q.name].ok++; });
    order.sort(function(a, b){ return by[a].ok / by[a].n - by[b].ok / by[b].n; });
    var html = '<div class="result card-corners">' + CORNERS + '<div class="big">' + score + '/' + qs.length + '</div><div class="rsub">' + pct + ' percent</div>' +
      '<h3 style="font-family:var(--serif);font-weight:400;font-size:26px;margin:16px 0 0">' + v.t + '</h3><p class="verdict">' + v.a + '</p>' +
      '<div class="tblwrap" style="max-width:600px;margin:22px auto 0"><table class="tbl n0 lres gres"><tbody>' +
      order.map(function(k){ var g = by[k]; return '<tr class="' + (g.ok === g.n ? 'lok' : 'lno') + '"><td class="sm">' + k + '</td><td class="num">' + g.ok + ' / ' + g.n + '</td></tr>'; }).join("") +
      '</tbody></table></div>';
    if(missed.length) html += '<div class="misslist">' + missed.map(function(q){
      var work = q.fmt === "multi" ? q.parts.map(function(p){ return '<span class="wline"><b>' + labelOf(p) + ':</b> ' + p.work + '</span>'; }).join("") : '<span class="wline">' + q.work + '</span>';
      return '<div><span class="g">' + q.name + (q.src ? ' &middot; ' + q.src : '') + ' — <b>' + (q.fmt === "multi" ? q.parts.map(function(p){ return labelOf(p) + ' ' + shown(p); }).join(' &middot; ') : q.right) + '</b></span>' +
        '<div class="mqtext">' + q.text + '</div><span class="t">How to get it:</span>' + work + '<span class="t rem">Remember: ' + q.remind + '</span></div>';
    }).join("") + '</div>';
    html += '<div class="toolbar" style="margin:26px 0 0"><button class="btn primary again" type="button">New set</button>' +
      (missed.length ? '<button class="btn missed" type="button">Practice the misses</button>' : '') + '<button class="btn setupbtn" type="button">Change settings</button></div></div>';
    body.innerHTML = html;
    var base = cfg.again ? cfg.base : cfg;
    $(".again", body).addEventListener("click", function(){ start(base); });
    if($(".missed", body)) $(".missed", body).addEventListener("click", function(){
      start({again:missed.map(function(q){ return {gen:q.gen, v:q.v, fixed:q.fixed, fmt:q.fmt, part:q.part}; }), base:base});
    });
    $(".setupbtn", body).addEventListener("click", opts.onSetup);
    dots();
  }
  return {
    start:start,
    keys:function(e){
      var body = $(".qbody", root); if(!body) return false;
      if(/^[1-4]$/.test(e.key)){ var b = $$(".opt", body)[parseInt(e.key, 10) - 1]; if(b && !b.disabled){ b.click(); return true; } }
      else if(e.key === "Enter"){ var nb = $(".next", body); if(nb && !nb.hidden){ nb.click(); return true; } }
      return false;
    }
  };
}
