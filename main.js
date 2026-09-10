/* ============================================================
   LA.FLEURISTE — RENDU & COMPORTEMENTS
   ------------------------------------------------------------
   Ne touchez pas ce fichier pour changer le contenu : tout se
   passe dans config.js (ou admin.html). Ce fichier lit config.js
   et remplit les sections, puis gère les menus, la FAQ, les
   fenêtres de détails et les vidéos.
   ============================================================ */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var ACCENTS = { gold: "var(--gold)", marigold: "var(--marigold)", orange: "var(--orange)" };
  /* CFG est ré-évalué au moment du rendu (voir LF_RENDER) : le contenu
     en ligne peut avoir remplacé window.SITE_CONFIG entre-temps. */
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function get(path) {
    return path.split(".").reduce(function (o, k) {
      return (o == null) ? undefined : o[k];
    }, CFG);
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function nl2br(s) { return esc(s).replace(/\n/g, "<br>"); }
  function accent(key) { return ACCENTS[key] || ACCENTS.gold; }
  function waHref(text) {
    var n = (CFG.contact && CFG.contact.whatsapp) || "";
    return "https://wa.me/" + n + (text ? "?text=" + encodeURIComponent(text) : "");
  }
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var DIAG = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M7 17 17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ---------- 1. LIAISON DES CHAMPS SIMPLES ---------- */
  function bindScalars() {
    document.querySelectorAll("[data-t]").forEach(function (el) {
      var v = get(el.getAttribute("data-t"));
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-tbr]").forEach(function (el) {
      var v = get(el.getAttribute("data-tbr"));
      if (v != null) el.innerHTML = nl2br(v);
    });
    document.querySelectorAll("[data-href]").forEach(function (el) {
      var v = get(el.getAttribute("data-href"));
      if (v) el.setAttribute("href", v);
    });
    document.querySelectorAll("[data-alt]").forEach(function (el) {
      var v = get(el.getAttribute("data-alt"));
      if (v != null) el.setAttribute("alt", v);
    });
    document.querySelectorAll("[data-poster]").forEach(function (el) {
      var v = get(el.getAttribute("data-poster"));
      if (v) el.setAttribute("poster", v);
    });
    document.querySelectorAll("[data-src]").forEach(function (el) {
      var v = get(el.getAttribute("data-src"));
      if (v) {
        el.setAttribute("src", v);
        var media = el.closest("video, audio, picture");
        if (media && media.load) media.load();
      }
    });
    document.querySelectorAll("[data-accent]").forEach(function (el) {
      var v = get(el.getAttribute("data-accent"));
      if (v) el.style.setProperty("--slash", accent(v));
    });
    // liens dynamiques
    document.querySelectorAll("[data-wa]").forEach(function (el) {
      el.setAttribute("href", waHref(CFG.contact && CFG.contact.whatsappFloatText));
    });
    document.querySelectorAll("[data-wa-q]").forEach(function (el) {
      el.setAttribute("href", waHref("Bonjour La.Fleuriste, je souhaite des informations sur l'atelier en cours."));
    });
    document.querySelectorAll("[data-tel]").forEach(function (el) {
      var n = (CFG.contact && CFG.contact.whatsapp) || "";
      el.setAttribute("href", "tel:+" + n);
    });
  }

  /* ---------- 2. LISTES ---------- */
  function renderNav() {
    var items = (CFG.nav || []).map(function (n) {
      return '<a href="' + esc(n.href) + '">' + esc(n.label) + "</a>";
    }).join("");
    var a = document.getElementById("navLinks");
    var b = document.getElementById("drawerNav");
    if (a) a.innerHTML = items;
    if (b) b.innerHTML = items;
  }

  function renderIntro() {
    var el = document.getElementById("introTrio");
    if (!el || !CFG.intro) return;
    var accents = ["marigold", "orange"];
    var html = '<div style="--slash:var(--gold)"><p class="trio-big">' +
      esc(CFG.intro.statement) + "</p></div>";
    (CFG.intro.stats || []).forEach(function (s, i) {
      html += '<div style="--slash:' + accent(accents[i % 2]) + '">' +
        '<span class="trio-num">' + esc(s.value) + "</span>" +
        "<p>" + esc(s.text) + "</p></div>";
    });
    el.innerHTML = html;
  }

  function renderOccasions() {
    var el = document.getElementById("occCells");
    if (!el || !CFG.occasions) return;
    el.innerHTML = (CFG.occasions.items || []).map(function (o, i) {
      var n = ("0" + (i + 1)).slice(-2);
      return '<button type="button" class="cell" data-occ="' + i + '" aria-haspopup="dialog" ' +
        'style="--accent:' + accent(o.accent) + '">' +
        '<span class="eye"><i>/</i>&nbsp;' + n + "</span>" +
        "<h3>" + esc(o.title) + "</h3>" +
        "<p>" + esc(o.short) + "</p>" +
        '<span class="sq">' + ARROW + "</span></button>";
    }).join("");
  }

  function renderGallery() {
    var el = document.getElementById("galGrid");
    if (!el || !CFG.galerie) return;
    el.innerHTML = (CFG.galerie.items || []).map(function (g) {
      return '<figure class="gcard" tabindex="0" role="button" ' +
        'data-full="' + esc(g.img) + '" data-cap="' + esc(g.cap || "") + '" data-sub="' + esc(g.sub || "") + '">' +
        '<div class="ph"><img src="' + esc(g.img) + '" alt="' + esc(g.alt || g.cap || "") + '" loading="lazy">' +
        '<span class="sq" style="--accent:' + accent(g.accent) + '">' + DIAG + "</span></div>" +
        '<figcaption class="cap"><span>' + esc(g.cap || "") + "</span><span>" + esc(g.sub || "") + "</span></figcaption>" +
        "</figure>";
    }).join("");
  }

  function renderAteliers() {
    var ed = CFG.ateliers && CFG.ateliers.edition;
    if (!ed) return;
    var t = document.getElementById("temps");
    if (t) t.innerHTML = (ed.temps || []).map(function (s) {
      return '<li style="--slash:' + accent(s.accent) + '">' +
        '<span class="temps-n">' + esc(s.n) + "</span>" +
        "<h4>" + esc(s.title) + "</h4><p>" + esc(s.text) + "</p></li>";
    }).join("");
    var f = document.getElementById("facts");
    if (f) f.innerHTML = (ed.facts || []).map(function (x) {
      return '<div class="fact"><dt>' + esc(x.k) + "</dt><dd>" + esc(x.v) + "</dd></div>";
    }).join("");
    var inc = document.getElementById("includes");
    if (inc) inc.innerHTML = (ed.includes || []).map(function (x) {
      return "<li>" + esc(x) + "</li>";
    }).join("");
  }

  function renderFaq() {
    var el = document.getElementById("faqList");
    if (!el || !CFG.faq) return;
    el.innerHTML = (CFG.faq.items || []).map(function (item, i) {
      return '<details class="faq-item"' + (i === 0 ? " open" : "") + ">" +
        "<summary>" + esc(item.q) + '<span class="pm" aria-hidden="true"></span></summary>' +
        '<div class="faq-a">' + esc(item.r) + "</div></details>";
    }).join("");
  }

  function renderFooter() {
    var el = document.getElementById("footCols");
    if (!el || !CFG.footer) return;
    el.innerHTML = (CFG.footer.columns || []).map(function (c) {
      return "<div><h4>" + esc(c.title) + "</h4>" +
        (c.links || []).map(function (l) {
          return '<a href="' + esc(l.href) + '">' + esc(l.label) + "</a>";
        }).join("") + "</div>";
    }).join("");
  }

  /* ---------- 3. COMPORTEMENTS ---------- */
  function wireNav() {
    var nav = document.getElementById("nav");
    if (!nav) return;
    var onScroll = function () { nav.classList.toggle("solid", window.scrollY > 40); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function wireDrawer() {
    var btn = document.getElementById("menuBtn");
    var drawer = document.getElementById("drawer");
    var close = document.getElementById("drawerClose");
    if (!btn || !drawer || !close) return;
    function open() {
      drawer.hidden = false; document.body.style.overflow = "hidden";
      btn.setAttribute("aria-expanded", "true"); close.focus();
    }
    function shut() {
      drawer.hidden = true; document.body.style.overflow = "";
      btn.setAttribute("aria-expanded", "false"); btn.focus();
    }
    btn.addEventListener("click", open);
    close.addEventListener("click", shut);
    drawer.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", shut); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !drawer.hidden) shut();
    });
  }

  function wireFaq() {
    var items = document.querySelectorAll("details.faq-item");
    items.forEach(function (d) {
      d.addEventListener("toggle", function () {
        if (d.open) items.forEach(function (o) { if (o !== d) o.open = false; });
      });
    });
  }

  var lastTrigger = null;
  function wireOccModal() {
    var modal = document.getElementById("occModal");
    if (!modal) return;
    document.querySelectorAll(".cell[data-occ]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var o = (CFG.occasions.items || [])[+btn.getAttribute("data-occ")];
        if (!o) return;
        lastTrigger = btn;
        var acc = accent(o.accent);
        document.getElementById("occTitle").textContent = o.title;
        document.getElementById("occText").textContent = o.detail || o.short;
        document.getElementById("occEye").style.setProperty("--slash", acc);
        var cta = document.getElementById("occCta");
        cta.style.setProperty("--btn-accent", acc);
        cta.href = waHref("Bonjour La.Fleuriste, je souhaite un bouquet pour : " + o.title + ".");
        modal.showModal();
      });
    });
  }

  function openLightbox(src, alt, cap, sub, trigger) {
    var lb = document.getElementById("lightbox");
    if (!lb || !src) return;
    lastTrigger = trigger || null;
    document.getElementById("lightboxImg").src = src;
    document.getElementById("lightboxImg").alt = alt || "";
    document.getElementById("lightboxCap").textContent = cap || "";
    document.getElementById("lightboxSub").textContent = sub || "";
    lb.showModal();
  }
  function wireLightbox() {
    var lb = document.getElementById("lightbox");
    if (!lb) return;
    document.querySelectorAll(".gcard").forEach(function (card) {
      function open() {
        openLightbox(card.getAttribute("data-full"),
          (card.querySelector("img") || {}).alt,
          card.getAttribute("data-cap"), card.getAttribute("data-sub"), card);
      }
      card.addEventListener("click", open);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
    });
    var aff = document.getElementById("afficheBtn");
    if (aff) {
      aff.addEventListener("click", function () {
        var ed = (CFG.ateliers && CFG.ateliers.edition) || {};
        openLightbox(ed.affiche, ed.afficheAlt,
          "Affiche", (ed.title || "").replace(/\n/g, " "), aff);
      });
    }
  }

  function wireDialogClose() {
    ["occModal", "lightbox"].forEach(function (id) {
      var dlg = document.getElementById(id);
      if (!dlg) return;
      dlg.querySelectorAll("[data-close]").forEach(function (b) {
        b.addEventListener("click", function () { dlg.close(); });
      });
      dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
      dlg.addEventListener("close", function () {
        if (lastTrigger && lastTrigger.focus) { lastTrigger.focus(); lastTrigger = null; }
      });
    });
  }

  function wireVideos() {
    var videos = document.querySelectorAll("video[autoplay]");
    if (reduceMotion) {
      videos.forEach(function (v) {
        v.removeAttribute("autoplay"); v.pause(); v.setAttribute("controls", "");
      });
      return;
    }
    if (!("IntersectionObserver" in window)) return;
    var vo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (entry.isIntersecting) {
          var p = v.play(); if (p && p.catch) p.catch(function () {});
        } else { v.pause(); }
      });
    }, { threshold: 0.15 });
    videos.forEach(function (v) { vo.observe(v); });
  }

  function wireSocial() {
    var s = CFG.social || {};
    document.querySelectorAll("a[data-social]").forEach(function (a) {
      var url = s[a.getAttribute("data-social")];
      if (url) {
        a.href = url; a.target = "_blank"; a.rel = "noopener";
        a.removeAttribute("aria-disabled");
        a.style.opacity = ""; a.style.pointerEvents = "";
      } else {
        a.setAttribute("aria-disabled", "true");
        a.style.opacity = ".4"; a.style.pointerEvents = "none";
      }
    });
  }

  function wireYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- 4. POINT D'ENTRÉE ---------- */
  window.LF_RENDER = function () {
    CFG = window.SITE_CONFIG || {};
    bindScalars();
    renderNav();
    renderIntro();
    renderOccasions();
    renderGallery();
    renderAteliers();
    renderFaq();
    renderFooter();

    wireNav();
    wireDrawer();
    wireFaq();
    wireOccModal();
    wireLightbox();
    wireDialogClose();
    wireVideos();
    wireSocial();
    wireYear();
  };
})();
