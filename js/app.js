/* ============================================================
   Judging by the Cover · app logic
   Content lives in data/covers.js. This file renders it.
   Routes (URL hash):  #                 → landing page
                       #sanctuary        → cover page
                       #sanctuary.respond → cover page, Respond tab
   ============================================================ */
(function () {
  "use strict";

  /* ---- Settings you may want to change ---------------------- */
  var CONFIG = {
    idleSeconds: 180,   // inactivity before the "Still exploring?" prompt (kiosk). 0 turns it off.
    warnSeconds: 20     // countdown on that prompt before the screen resets
  };

  var D = window.COVERS;
  var L = D.lenses;
  var LENS_ORDER = Object.keys(L);
  var byId = {};
  D.covers.forEach(function (o) { byId[o.id] = o; });

  var TABS = [
    { id: "look", label: "Look closely" },
    { id: "book", label: "The book" },
    { id: "context", label: "Context" },
    { id: "respond", label: "Respond" }
  ];

  var state = {
    responses: [],     // { key, coverId, question, answer }
    seen: {},          // coverId → { hotspotIndex: true }
    drafts: {},        // coverId → { q, text }
    cur: null          // { o, tab, hs, lens }
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };
  // "[c. 1950]" → muted "c. 1950 · to confirm"
  var val = function (v) {
    v = String(v == null ? "" : v);
    var m = v.match(/^\[(.*)\]$/);
    return m ? '<span class="tbc">' + esc(m[1]) + ' <em>to confirm</em></span>' : esc(v);
  };
  var view = $("#view");

  /* ============================================================
     ROUTER
     ============================================================ */
  function route() {
    var h = (location.hash || "").replace(/^#/, "");
    var parts = h.split(".");
    var o = byId[parts[0]];
    view.classList.remove("enter");
    void view.offsetWidth;
    if (o) renderCover(o, parts[1]);
    else renderHome();
    view.classList.add("enter");
    window.scrollTo(0, 0);
    try { view.focus({ preventScroll: true }); } catch (e) {}
  }
  window.addEventListener("hashchange", route);

  /* ============================================================
     HOME
     ============================================================ */
  function renderHome() {
    state.cur = null;
    document.title = D.program.title;
    var P = D.program;

    view.innerHTML =
      '<section class="wrap home-head">' +
        '<p class="eyebrow">' + esc(P.eyebrow) + "</p>" +
        "<h1>Judging by the <em>Cover</em></h1>" +
        '<p class="lede">' + esc(P.lede) + "</p>" +
        '<p class="cnote">' + esc(P.contentNote) + "</p>" +
      "</section>" +
      '<section class="wrap toolkit" aria-labelledby="tkTitle">' +
        '<h2 id="tkTitle" class="group-label">Five questions to ask any cover</h2>' +
        '<ul class="tk">' + D.toolkit.map(function (t) {
          return "<li><strong>" + esc(t.q) + "</strong><span>" + esc(t.a) + "</span></li>";
        }).join("") + "</ul>" +
      "</section>" +
      '<section class="wrap" aria-label="Covers">' +
        '<div class="rack">' + D.covers.map(function (o) {
          return '<a class="cover-card" href="#' + o.id + '">' +
            '<span class="group-label">' + esc(o.genre) + "</span>" +
            // size each cover to fit an even 2:3 frame, whatever its own proportions
            '<span class="cover-frame"><img style="width:' + Math.min(78, 0.84 * 1.5 * (o.size[0] / o.size[1]) * 100).toFixed(1) + '%" src="' + esc(o.image) + '" alt="' + esc(o.alt) + '" width="' + o.size[0] + '" height="' + o.size[1] + '"></span>' +
            '<span class="cover-text">' +
              '<span class="mono">' + val(o.book.date) + "</span>" +
              "<h2>" + esc(o.title) + "</h2>" +
              '<span class="by">' + esc(o.author) + "</span>" +
              '<span class="tag">' + esc(o.tagline) + "</span>" +
              '<span class="cta">Look closer →</span>' +
            "</span></a>";
        }).join("") + "</div>" +
      "</section>";
  }

  /* ============================================================
     COVER PAGE
     ============================================================ */
  function renderCover(o, tab) {
    var idx = D.covers.indexOf(o);
    var prev = D.covers[(idx - 1 + D.covers.length) % D.covers.length];
    var next = D.covers[(idx + 1) % D.covers.length];
    var validTab = TABS.some(function (t) { return t.id === tab; }) ? tab : "look";
    state.cur = { o: o, tab: validTab, hs: null, lens: null };
    state.seen[o.id] = state.seen[o.id] || {};
    document.title = o.title + " · " + D.program.title;

    var dots = o.hotspots.map(function (h, i) {
      var edge = h.x < 16 ? " edge-l" : h.x > 84 ? " edge-r" : "";
      return '<button class="hs' + edge + '" type="button" data-i="' + i + '" data-lens="' + h.lens + '" style="left:' + h.x + "%;top:" + h.y + '%" aria-label="' + esc(h.name + " (" + L[h.lens].label + ")") + '">' +
        '<span class="dot"></span><span class="tip">' + esc(h.name) + "</span></button>";
    }).join("");

    view.innerHTML =
      '<section class="wrap obj-head">' +
        '<nav class="crumb" aria-label="Breadcrumb"><a href="#">← All covers</a><span class="mono">/</span><span class="mono">' + esc(o.genre) + "</span></nav>" +
        "<h1>" + esc(o.title) + " <em>" + esc(o.author) + "</em></h1>" +
        '<dl class="tomb">' +
          "<div><dt>Publisher</dt><dd>" + val(o.book.publisher) + "</dd></div>" +
          "<div><dt>Series</dt><dd>" + val(o.book.series) + "</dd></div>" +
          "<div><dt>Date</dt><dd>" + val(o.book.date) + "</dd></div>" +
          "<div><dt>Price</dt><dd>" + val(o.book.price) + "</dd></div>" +
        "</dl>" +
      "</section>" +
      '<section class="wrap obj-grid">' +
        '<div class="stage-col">' +
          '<div class="stage cover-stage" id="stage">' +
            '<div class="stage-inner" id="stageInner" style="--ar:' + o.size[0] + " / " + o.size[1] + '">' +
              '<img src="' + esc(o.image) + '" alt="' + esc(o.alt) + '" width="' + o.size[0] + '" height="' + o.size[1] + '" draggable="false">' +
              '<span class="spot" id="spot" aria-hidden="true"></span>' +
              dots +
            "</div>" +
          "</div>" +
          '<p class="stage-hint"><span class="ring" aria-hidden="true"></span>Tap a glowing point to look closer.<span class="found" id="found"></span></p>' +
        "</div>" +
        '<div class="panel" id="panel">' +
          '<div class="tabs" role="tablist" aria-label="Ways to read this cover">' +
            TABS.map(function (t, i) {
              return '<button class="tab" role="tab" id="tab-' + t.id + '" data-tab="' + t.id + '" aria-controls="tabpanel" aria-selected="false" tabindex="-1">' +
                '<span class="n">' + pad(i + 1) + "</span>" + esc(t.label) + "</button>";
            }).join("") +
          "</div>" +
          '<div class="tabpanel" id="tabpanel" role="tabpanel"></div>' +
        "</div>" +
      "</section>" +
      '<nav class="wrap pager" aria-label="More covers">' +
        '<a class="prev" href="#' + prev.id + '"><img src="' + esc(prev.image) + '" alt=""><span><span class="mono">← Previous</span><strong>' + esc(prev.title) + "</strong></span></a>" +
        '<a class="next" href="#' + next.id + '"><span><span class="mono">Next →</span><strong>' + esc(next.title) + '</strong></span><img src="' + esc(next.image) + '" alt=""></a>' +
      "</nav>";

    $$(".hs", view).forEach(function (b) {
      b.addEventListener("click", function (ev) {
        ev.stopPropagation();
        if (document.body.classList.contains("placing")) return;
        selectHotspot(+b.getAttribute("data-i"), true);
      });
    });
    $("#stage").addEventListener("click", function (ev) {
      if (document.body.classList.contains("placing")) return placeAt(ev);
      if (state.cur.hs != null) { state.cur.hs = null; syncDots(); if (state.cur.tab === "look") renderTab(); }
    });
    $$(".tab", view).forEach(function (t) {
      t.addEventListener("click", function () { setTab(t.getAttribute("data-tab")); });
      t.addEventListener("keydown", function (ev) {
        var ids = TABS.map(function (x) { return x.id; });
        var i = ids.indexOf(state.cur.tab);
        if (ev.key === "ArrowRight") { setTab(ids[(i + 1) % ids.length], true); ev.preventDefault(); }
        if (ev.key === "ArrowLeft") { setTab(ids[(i - 1 + ids.length) % ids.length], true); ev.preventDefault(); }
      });
    });

    syncDots();
    setTab(validTab);
  }

  // lenses this cover is read through: any lens with an analysis or a hotspot
  function lensesIn(o) {
    return LENS_ORDER.filter(function (k) {
      return (o.analysis && o.analysis[k]) || o.hotspots.some(function (h) { return h.lens === k; });
    });
  }
  // hotspot indexes visible under the current lens
  function visible() {
    var c = state.cur;
    return c.o.hotspots.map(function (h, i) { return i; }).filter(function (i) {
      return !c.lens || c.o.hotspots[i].lens === c.lens;
    });
  }

  function setLens(k) {
    var c = state.cur;
    c.lens = k;
    if (k) c.hs = null;   // choosing a lens opens its analysis
    syncDots();
    if (c.tab !== "look") setTab("look"); else renderTab();
  }

  function setTab(id, focus) {
    state.cur.tab = id;
    $$(".tab", view).forEach(function (t) {
      var on = t.getAttribute("data-tab") === id;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      if (on) {
        $("#tabpanel").setAttribute("aria-labelledby", t.id);
        if (focus) t.focus();
        if (t.scrollIntoView) t.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    });
    renderTab();
  }

  function selectHotspot(i, fromStage) {
    var c = state.cur;
    if (c.lens && c.o.hotspots[i].lens !== c.lens) setLens(null);
    c.hs = i;
    state.seen[c.o.id][i] = true;
    if (c.tab !== "look") setTab("look"); else renderTab();
    syncDots();
    if (fromStage) {
      var p = $("#panel");
      if (p && p.getBoundingClientRect().top > window.innerHeight * 0.75) {
        p.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      }
    }
  }

  function syncDots() {
    var c = state.cur, seen = state.seen[c.o.id];
    $$(".hs", view).forEach(function (b) {
      var i = +b.getAttribute("data-i");
      var off = c.lens && b.getAttribute("data-lens") !== c.lens;
      b.classList.toggle("active", c.hs === i);
      b.classList.toggle("seen", !!seen[i]);
      b.classList.toggle("off", !!off);
      b.tabIndex = off ? -1 : 0;
      b.setAttribute("aria-pressed", c.hs === i ? "true" : "false");
    });
    // spotlight on the selected detail
    var spot = $("#spot");
    if (spot) {
      if (c.hs != null) {
        var h = c.o.hotspots[c.hs], r = h.r || 12, ar = c.o.size[0] / c.o.size[1];
        spot.style.setProperty("--sx", h.x + "%");
        spot.style.setProperty("--sy", h.y + "%");
        spot.style.setProperty("--rx", r + "%");
        spot.style.setProperty("--ry", (r * ar) + "%");
        spot.classList.add("on");
      } else spot.classList.remove("on");
    }
    var n = Object.keys(seen).length, total = c.o.hotspots.length;
    var f = $("#found");
    if (f) f.textContent = n ? n + " / " + total + " found" : total + " details";
  }

  /* ---------- Tab content ---------- */
  function detailChips(o, idxs) {
    return '<div class="detail-list">' + idxs.map(function (i) {
      return '<button type="button" data-i="' + i + '" class="' + (state.seen[o.id][i] ? "seen" : "") + '">' + esc(o.hotspots[i].name) + "</button>";
    }).join("") + "</div>";
  }

  function renderTab() {
    var c = state.cur, o = c.o, el = $("#tabpanel");
    if (!el) return;
    var html = "";

    if (c.tab === "look") {
      var vis = visible();
      if (c.hs == null) {
        if (!c.lens) {
          html = '<div class="first-look"><p class="eyebrow">First look</p>' +
              '<p class="lead">Before reading anything, give the cover ten seconds. Where did your eye land first? Where did it go next?</p></div>' +
            '<div class="prose"><p class="eyebrow">All details</p></div>' + detailChips(o, vis);
        } else {
          html = '<div class="lens-intro"><p class="eyebrow">Lens · ' + esc(L[c.lens].label) + '</p>' +
              '<p class="fine lens-blurb">' + esc(L[c.lens].blurb) + "</p>" +
              (o.analysis && o.analysis[c.lens] ? '<p class="lens-analysis">' + esc(o.analysis[c.lens]) + "</p>" : "") +
            "</div>" +
            (vis.length
              ? '<div class="prose"><p class="eyebrow">On the cover</p></div>' + detailChips(o, vis)
              : '<p class="fine">No single detail marks this on the cover. Sometimes what a cover leaves out is the point.</p>') +
            '<div class="lens-next">' + nextLensBtn(o, c.lens) +
              '<button class="btn btn-ghost" type="button" data-goto="respond">Respond →</button></div>';
        }
      } else {
        var h = o.hotspots[c.hs], pos = vis.indexOf(c.hs);
        html = '<article class="detail" aria-live="polite">' +
          '<div class="detail-top"><span class="eyebrow">Detail ' + (pos + 1) + " of " + vis.length + '</span>' +
            '<button class="lens-tag" type="button" data-setlens="' + h.lens + '" title="Read the ' + esc(L[h.lens].label) + ' analysis">' + esc(L[h.lens].label) + " →</button></div>" +
          "<h2>" + esc(h.name) + "</h2><p>" + esc(h.text) + "</p>" +
          '<div class="detail-nav">' +
            '<button class="btn btn-ghost" type="button" data-step="-1">← Previous</button>' +
            '<button class="btn" type="button" data-step="1">Next detail →</button>' +
            '<span class="spacer"></span><button class="link-btn" type="button" data-overview>' + (c.lens ? "Back to " + esc(L[c.lens].label) + " analysis" : "Back to overview") + "</button>" +
          "</div></article>" + detailChips(o, vis);
      }
    }

    if (c.tab === "book") {
      var b = o.book;
      var rows = [["Title", o.title], ["Author", o.author], ["Publisher", b.publisher], ["Series", b.series], ["Edition", b.edition],
        ["Date", b.date], ["Cover price", b.price], ["Cover artist", b.artist], ["Accession no.", b.accession]];
      html = '<dl class="facts">' + rows.map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + val(r[1]) + "</dd></div>"; }).join("") + "</dl>" +
        '<div class="prose"><p class="eyebrow">About the book</p>' + o.synopsis.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>";
    }

    if (c.tab === "context") {
      html = '<div class="prose">' + o.context.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>";
    }

    if (c.tab === "respond") {
      var d = state.drafts[o.id] || (state.drafts[o.id] = { q: null, text: "" });
      var mine = state.responses.filter(function (x) { return x.coverId === o.id; });
      html = '<p class="lead">Pick a question. There are no wrong answers.</p>' +
        '<fieldset class="qlist"><legend class="eyebrow">Choose a question</legend>' +
        o.questions.map(function (q, i) {
          var answered = mine.some(function (x) { return x.question === q; });
          return '<label class="q' + (answered ? " answered" : "") + '"><input type="radio" name="q-' + o.id + '" id="q-' + o.id + "-" + i + '" value="' + i + '"' + (d.q === i ? " checked" : "") + "><span>" + esc(q) + "</span></label>";
        }).join("") + "</fieldset>" +
        '<div class="compose"><label for="resp-' + o.id + '">Your response</label>' +
        '<textarea id="resp-' + o.id + '" maxlength="1200" placeholder="' + (d.q == null ? "Choose a question first" : "What do you see? What do you think?") + '">' + esc(d.text) + "</textarea>" +
        '<div class="compose-row"><span class="fine">Stays on this screen until you start over.</span>' +
        '<button class="btn" type="button" id="addBtn">Add to my responses</button></div></div>' +
        (mine.length ? '<div class="answers"><p class="eyebrow">Your responses to this cover</p>' + mine.map(answerHTML).join("") + "</div>" : "");
    }

    if (c.tab === "look") html = lensBarHTML(o, c.lens) + html;
    el.innerHTML = html;
    bindTab(el);
  }

  // Second row of navigation under the tabs (Look closely only)
  function lensBarHTML(o, k) {
    var chip = function (key, label) {
      var on = (key || null) === (k || null);
      return '<button class="lchip" type="button" data-setlens="' + key + '" aria-pressed="' + on + '">' + esc(label) + "</button>";
    };
    return '<div class="lensbar" role="group" aria-labelledby="lensbarLabel">' +
      '<span class="lensbar-label" id="lensbarLabel">Read through a lens</span>' +
      '<div class="lensbar-chips">' + chip("", "All") +
      lensesIn(o).map(function (key) { return chip(key, L[key].label); }).join("") + "</div></div>";
  }

  function nextLensBtn(o, k) {
    var ks = lensesIn(o), n = ks[(ks.indexOf(k) + 1) % ks.length];
    return n && n !== k ? '<button class="btn" type="button" data-setlens="' + n + '">Next lens: ' + esc(L[n].label) + " →</button>" : "";
  }

  function answerHTML(x) {
    return '<div class="answer"><span class="aq">' + esc(x.question) + '</span><span class="aa">' + esc(x.answer) + "</span></div>";
  }

  function bindTab(el) {
    var c = state.cur, o = c.o;
    $$(".detail-list button", el).forEach(function (b) {
      b.addEventListener("click", function () { selectHotspot(+b.getAttribute("data-i")); });
    });
    $$("[data-step]", el).forEach(function (b) {
      b.addEventListener("click", function () {
        var vis = visible(), pos = vis.indexOf(c.hs);
        selectHotspot(vis[(pos + +b.getAttribute("data-step") + vis.length) % vis.length]);
      });
    });
    $$("[data-setlens]", el).forEach(function (b) {
      b.addEventListener("click", function () { setLens(b.getAttribute("data-setlens") || null); });
    });
    var ov = $("[data-overview]", el);
    if (ov) ov.addEventListener("click", function () { c.hs = null; syncDots(); renderTab(); });
    var go = $("[data-goto]", el);
    if (go) go.addEventListener("click", function () { setTab(go.getAttribute("data-goto"), true); });

    if (c.tab === "respond") {
      var d = state.drafts[o.id], ta = $("textarea", el), add = $("#addBtn", el);
      var sync = function () { add.disabled = d.q == null || !ta.value.trim(); };
      $$('input[type="radio"]', el).forEach(function (r) {
        r.addEventListener("change", function () {
          d.q = +r.value; ta.placeholder = "What do you see? What do you think?"; sync(); ta.focus();
        });
      });
      ta.addEventListener("input", function () { d.text = ta.value; sync(); });
      add.addEventListener("click", function () {
        if (d.q == null || !ta.value.trim()) return;
        state.responses.push({ key: Date.now() + "-" + Math.random().toString(36).slice(2, 6), coverId: o.id, question: o.questions[d.q], answer: ta.value.trim() });
        d.text = ""; d.q = null;
        updateCount();
        renderTab();
        toast("Added to My responses");
      });
      sync();
    }
  }

  /* ============================================================
     MY RESPONSES DRAWER
     ============================================================ */
  var drawer = $("#drawer"), scrim = $("#scrim"), lastFocus = null;
  function updateCount() {
    var n = state.responses.length;
    $("#mineCount").textContent = n;
    $("#mineBtn").classList.toggle("has", n > 0);
    if (!drawer.hidden) renderDrawer();
  }
  function renderDrawer() {
    var body = $("#drawerBody");
    if (!state.responses.length) {
      body.innerHTML = '<div class="empty"><strong>Nothing here yet.</strong><span>Open a cover, choose the Respond tab, and answer a question. Your responses will collect here as you go.</span></div>';
      return;
    }
    body.innerHTML = D.covers.filter(function (o) {
      return state.responses.some(function (x) { return x.coverId === o.id; });
    }).map(function (o) {
      return '<section class="dgroup"><a class="dgroup-head" href="#' + o.id + '.respond"><img src="' + esc(o.image) + '" alt=""><span><span class="mono">' + esc(o.genre) + "</span><strong>" + esc(o.title) + "</strong></span></a>" +
        state.responses.filter(function (x) { return x.coverId === o.id; }).map(function (x) {
          return answerHTML(x).replace('</div>', '<button class="link-btn" type="button" data-remove="' + x.key + '">Remove</button></div>');
        }).join("") + "</section>";
    }).join("");
    $$("[data-remove]", body).forEach(function (b) {
      b.addEventListener("click", function () {
        var k = b.getAttribute("data-remove");
        state.responses = state.responses.filter(function (x) { return x.key !== k; });
        updateCount();
        if (state.cur && state.cur.tab === "respond") renderTab();
      });
    });
    $$(".dgroup-head", body).forEach(function (a) { a.addEventListener("click", closeDrawer); });
  }
  function openDrawer() {
    lastFocus = document.activeElement;
    renderDrawer();
    drawer.hidden = false; scrim.hidden = false;
    $("#drawerClose").focus();
  }
  function closeDrawer() {
    drawer.hidden = true; scrim.hidden = true;
    disarmReset();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $("#mineBtn").addEventListener("click", openDrawer);
  $("#drawerClose").addEventListener("click", closeDrawer);
  scrim.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !drawer.hidden) closeDrawer(); });

  var resetBtn = $("#resetBtn"), armTimer = null;
  function disarmReset() { resetBtn.classList.remove("armed"); resetBtn.textContent = "Start over"; clearTimeout(armTimer); }
  resetBtn.addEventListener("click", function () {
    if (!resetBtn.classList.contains("armed")) {
      resetBtn.classList.add("armed"); resetBtn.textContent = "Tap again to clear everything";
      armTimer = setTimeout(disarmReset, 4000);
      return;
    }
    disarmReset();
    resetAll();
  });

  function resetAll() {
    state.responses = []; state.seen = {}; state.drafts = {};
    updateCount();
    if (!drawer.hidden) closeDrawer();
    if (!info.hidden) closeInfo();
    if (location.hash && location.hash !== "#") location.hash = ""; else route();
    toast("Ready for the next visitor");
  }

  /* ============================================================
     IDLE RESET (kiosk)
     ============================================================ */
  var last = Date.now(), idleEl = $("#idle"), idleLeft = 0;
  ["pointerdown", "keydown", "wheel", "touchstart"].forEach(function (t) {
    document.addEventListener(t, function () { if (idleEl.hidden) last = Date.now(); }, { passive: true });
  });
  $("#idleStay").addEventListener("click", function () { idleEl.hidden = true; last = Date.now(); });
  if (CONFIG.idleSeconds > 0) {
    setInterval(function () {
      var busy = (location.hash && location.hash !== "#") || state.responses.length;
      if (idleEl.hidden) {
        if (busy && Date.now() - last > CONFIG.idleSeconds * 1000) {
          idleLeft = CONFIG.warnSeconds; $("#idleCount").textContent = idleLeft;
          idleEl.hidden = false; $("#idleStay").focus();
        }
      } else {
        idleLeft -= 1; $("#idleCount").textContent = Math.max(0, idleLeft);
        if (idleLeft <= 0) { idleEl.hidden = true; last = Date.now(); resetAll(); }
      }
    }, 1000);
  }

  /* ============================================================
     TOAST + HOTSPOT PLACEMENT HELPER (Shift+P)
     ============================================================ */
  var toastT;
  function toast(msg) {
    var t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }

  var placer = $("#placer");
  document.addEventListener("keydown", function (e) {
    if (e.shiftKey && (e.key === "P" || e.key === "p") && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
      var on = document.body.classList.toggle("placing");
      placer.hidden = !on;
      if (on) placer.innerHTML = "<span>Placement mode: click the cover.</span><span>Shift+P to exit.</span>";
    }
  });
  function placeAt(ev) {
    var si = $("#stageInner"); if (!si) return;
    var r = si.getBoundingClientRect();
    var x = Math.round(((ev.clientX - r.left) / r.width) * 100);
    var y = Math.round(((ev.clientY - r.top) / r.height) * 100);
    if (x < 0 || x > 100 || y < 0 || y > 100) return;
    var line = '{ x: ' + x + ', y: ' + y + ', r: 10, lens: "", name: "", text: "" },';
    placer.innerHTML = "<span>Click position</span><code>" + esc(line) + '</code><button class="btn btn-ghost" type="button" id="copyPlace">Copy</button>';
    $("#copyPlace").addEventListener("click", function () {
      var done = function () { toast("Copied"); };
      try { navigator.clipboard.writeText(line).then(done, function () { selectCode(); }); } catch (e) { selectCode(); }
    });
  }
  function selectCode() {
    var code = $("code", placer); var rng = document.createRange(); rng.selectNodeContents(code);
    var s = getSelection(); s.removeAllRanges(); s.addRange(rng); toast("Selected. Press Ctrl+C to copy");
  }

  /* ============================================================
     ABOUT / HOW IT WORKS
     ============================================================ */
  var info = $("#info"), infoScrim = $("#infoScrim"), infoLast = null;
  function openInfo(which) {
    if (info.hidden) infoLast = document.activeElement;
    $("#info-about").hidden = which !== "about";
    $("#info-how").hidden = which !== "how";
    $("#infoTitle").textContent = which === "about" ? "About This Project" : "How It Works";
    info.hidden = false; infoScrim.hidden = false;
    $("#infoClose").focus();
  }
  function closeInfo() {
    info.hidden = true; infoScrim.hidden = true;
    if (infoLast && infoLast.focus) infoLast.focus();
  }
  $$("[data-info]").forEach(function (b) {
    b.addEventListener("click", function () { openInfo(b.getAttribute("data-info")); });
  });
  $("#infoClose").addEventListener("click", closeInfo);
  infoScrim.addEventListener("click", closeInfo);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !info.hidden) closeInfo(); });

  /* ---- Start ---- */
  updateCount();
  route();
})();
