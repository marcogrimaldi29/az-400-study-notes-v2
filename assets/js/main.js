/* =====================================================================
   AZ-400 Study Notes v2 — shared behaviour
   Injects header/footer, builds TOC, animates progress bars,
   handles theme toggle, mobile nav, Mermaid rendering.
   ===================================================================== */
(function () {
  "use strict";

  // ---- path helper: resolve asset/links relative to the site root ----
  // The home page lives at the site root; every other page lives in its own
  // folder (e.g. /domain-1-processes/) for clean, extensionless URLs. The
  // Domain 3 sub-objectives nest one level deeper. ROOT is the relative prefix
  // back to the site root ("", "../" or "../../"), derived from this script's
  // own src so it works at any depth.
  var ROOT = (function () {
    var s = document.currentScript;
    if (!s) {
      var all = document.getElementsByTagName("script");
      for (var i = 0; i < all.length; i++) {
        if (/assets\/js\/main\.js/.test(all[i].getAttribute("src") || "")) { s = all[i]; break; }
      }
    }
    var m = (s && (s.getAttribute("src") || "")).match(/^(.*?)assets\/js\/main\.js/);
    return m ? m[1] : "";
  })();

  // href: "" means the site root (resolved to "./" or "../" via ROOT below).
  // A page with `children` renders as a hover/focus dropdown in the top nav —
  // Domain 3 is 50–55% of the exam and splits into six sub-objectives, which
  // would otherwise overflow the header.
  var PAGES = [
    { id: "home",       href: "",                        label: "Home" },
    { id: "processes",  href: "domain-1-processes/",     label: "1 · Processes" },
    { id: "source",     href: "domain-2-source-control/", label: "2 · Source Control" },
    {
      id: "pipelines", href: "domain-3-pipelines/", label: "3 · Pipelines",
      children: [
        { id: "packages",    href: "domain-3-pipelines/package-management/",     label: "3.1 · Package management" },
        { id: "testing",     href: "domain-3-pipelines/testing/",                label: "3.2 · Testing strategy" },
        { id: "yaml",        href: "domain-3-pipelines/pipelines/",              label: "3.3 · Pipelines" },
        { id: "deployments", href: "domain-3-pipelines/deployments/",            label: "3.4 · Deployments" },
        { id: "iac",         href: "domain-3-pipelines/infrastructure-as-code/", label: "3.5 · Infrastructure as code" },
        { id: "maintain",    href: "domain-3-pipelines/maintain/",               label: "3.6 · Maintain pipelines" }
      ]
    },
    { id: "security",   href: "domain-4-security/",        label: "4 · Security" },
    { id: "instrument", href: "domain-5-instrumentation/", label: "5 · Instrumentation" },
    { id: "tips",       href: "exam-tips/",                label: "Exam Tips" },
    { id: "resources",  href: "resources/",                label: "Resources" }
  ];

  // Resolve a page href against ROOT, never yielding an empty href.
  function pageHref(href) { return (ROOT + href) || "./"; }

  var REPO_URL = "https://github.com/marcogrimaldi29/az-400-study-notes-v2";
  var COFFEE_URL = "https://buymeacoffee.com/marcogrimaldi29";
  var GITHUB_ICON = '<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';
  var COFFEE_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364zm-6.159 3.9c-.862.37-1.84.788-3.109.788a5.884 5.884 0 01-1.569-.217l.877 9.004c.065.78.717 1.38 1.5 1.38 0 0 1.243.065 1.658.065.447 0 1.786-.065 1.786-.065.783 0 1.434-.6 1.499-1.38l.94-9.95a3.996 3.996 0 00-1.322-.238c-.826 0-1.491.284-2.26.613z"/></svg>';

  // ---------- THEME ----------
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("az400v2-theme", t); } catch (e) {}
    var btn = document.getElementById("theme-btn");
    if (btn) btn.textContent = t === "dark" ? "☀️" : "🌙";
    // re-render mermaid for theme change
    if (window.__mermaidReady) renderMermaid(true);
  }
  function initTheme() {
    var saved;
    try { saved = localStorage.getItem("az400v2-theme"); } catch (e) {}
    if (!saved) saved = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    applyTheme(saved);
  }

  // ---------- HEADER ----------
  function navLink(p, current, extraClass) {
    var cls = (p.id === current ? "active " : "") + (extraClass || "");
    return '<a class="' + cls.trim() + '" href="' + pageHref(p.href) + '">' + p.label + "</a>";
  }

  function buildHeader() {
    var current = document.body.getAttribute("data-page") || "home";

    var nav = PAGES.map(function (p) {
      if (!p.children) return navLink(p, current);
      // Group is highlighted when the active page is the hub or any child.
      var inGroup = p.id === current || p.children.some(function (c) { return c.id === current; });
      return '<span class="nav-group">' +
        '<button class="nav-group-btn' + (inGroup ? " active" : "") + '" type="button">' + p.label + "</button>" +
        '<span class="nav-drop">' +
          navLink(p, current) +
          p.children.map(function (c) { return navLink(c, current, "sub"); }).join("") +
        "</span>" +
      "</span>";
    }).join("");

    var header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML =
      '<button class="icon-btn nav-toggle" id="nav-toggle" aria-label="Menu">☰</button>' +
      '<a class="brand" href="' + pageHref("") + '">' +
        '<img src="' + ROOT + 'assets/images/site-mark-no-bg.png" alt="logo">' +
        '<span><span class="brand-full">AZ-400 </span>Study Notes</span>' +
      "</a>" +
      '<nav class="top-nav" id="top-nav">' + nav + "</nav>" +
      '<div class="header-tools">' +
        '<a class="ghub-link" href="' + REPO_URL + '/" target="_blank" rel="noopener" title="Star on GitHub">★ <span>on</span> ' + GITHUB_ICON + '</a>' +
      "</div>";
    document.body.insertBefore(header, document.body.firstChild);

    document.getElementById("nav-toggle").addEventListener("click", function () {
      document.getElementById("top-nav").classList.toggle("open");
    });

    // Click/tap support for the dropdown (hover alone is unusable on touch).
    var groups = header.querySelectorAll(".nav-group");
    groups.forEach(function (g) {
      g.querySelector(".nav-group-btn").addEventListener("click", function (e) {
        e.stopPropagation();
        var wasOpen = g.classList.contains("open");
        groups.forEach(function (o) { o.classList.remove("open"); });
        if (!wasOpen) g.classList.add("open");
      });
    });
    document.addEventListener("click", function () {
      groups.forEach(function (g) { g.classList.remove("open"); });
    });
  }

  // ---------- FOOTER ----------
  function buildFooter() {
    var f = document.createElement("footer");
    f.className = "site-footer";
    f.innerHTML =
      '<div class="footer-inner">' +
        '<div class="footer-col footer-col-author">' +
          '<div class="author-card">' +
            '<img src="' + ROOT + 'assets/images/marcogrimaldi29.jpg" alt="Marco Grimaldi">' +
            '<div>' +
              '<span class="maintainer-badge">Maintainer</span>' +
              '<div class="ac-name">Marco Grimaldi</div>' +
              '<div class="ac-role">Cloud Solution Architect</div>' +
              '<div class="author-links">' +
                '<a href="https://github.com/marcogrimaldi29" target="_blank" rel="noopener">' + GITHUB_ICON + ' GitHub</a>' +
                '<a href="https://www.linkedin.com/in/marco-grimaldi29/" target="_blank" rel="noopener">in LinkedIn</a>' +
                '<a href="https://marcogrimaldi29.com/" target="_blank" rel="noopener"><img src="' + ROOT + 'assets/images/site-mark-no-bg.png" alt="" width="16" height="16" style="display:block"> Website</a>' +
              "</div>" +
            "</div>" +
          "</div>" +
          '<div class="star-cta">' +
            '<p>⭐ <strong>Found these notes helpful?</strong> Star the repo on GitHub, or support me with a coffee — tips help fund coffees I will drink to stay productive, study for new certifications and review them on my personal hub.</p>' +
            '<div class="support-actions">' +
              '<a class="support-btn support-btn--star" href="' + REPO_URL + '" target="_blank" rel="noopener">' + GITHUB_ICON + ' Star on GitHub</a>' +
              '<a class="support-btn support-btn--coffee" href="' + COFFEE_URL + '" target="_blank" rel="noopener">' + COFFEE_ICON + ' Buy me a coffee</a>' +
            "</div>" +
          "</div>" +
          '<div class="contrib-note">🐞 <strong>Spotted an error?</strong> If something is wrong or out of date, please <a href="' + REPO_URL + '/issues" target="_blank" rel="noopener">open an issue on GitHub</a>.</div>' +
        "</div>" +
        '<div class="footer-col">' +
          "<h5>Skill Domains</h5>" +
          '<a href="' + ROOT + 'domain-1-processes/">1 · Processes &amp; communications</a>' +
          '<a href="' + ROOT + 'domain-2-source-control/">2 · Source control strategy</a>' +
          '<a href="' + ROOT + 'domain-3-pipelines/">3 · Build &amp; release pipelines</a>' +
          '<a href="' + ROOT + 'domain-4-security/">4 · Security &amp; compliance</a>' +
          '<a href="' + ROOT + 'domain-5-instrumentation/">5 · Instrumentation strategy</a>' +
          '<a href="' + ROOT + 'exam-tips/">Exam tips &amp; caveats</a>' +
          '<a href="' + ROOT + 'resources/">Resources &amp; study plan</a>' +
        "</div>" +
        '<div class="footer-col">' +
          "<h5>Official Resources</h5>" +
          '<a href="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-400" target="_blank" rel="noopener">AZ-400 Study Guide</a>' +
          '<a href="https://learn.microsoft.com/en-us/credentials/certifications/exams/az-400/practice/assessment" target="_blank" rel="noopener">Free practice assessment</a>' +
          '<a href="https://learn.microsoft.com/en-us/azure/devops/" target="_blank" rel="noopener">Azure DevOps docs</a>' +
          '<a href="https://docs.github.com/en/actions" target="_blank" rel="noopener">GitHub Actions docs</a>' +
          '<a href="https://learn.microsoft.com/en-us/azure/azure-monitor/" target="_blank" rel="noopener">Azure Monitor docs</a>' +
          '<a href="https://learn.microsoft.com/en-us/devops/" target="_blank" rel="noopener">DevOps resource center</a>' +
        "</div>" +
      "</div>" +
      '<div class="footer-bottom">' +
        "<span>© " + new Date().getFullYear() + " Marco Grimaldi · For study &amp; learning purposes only. Always verify against the official Microsoft documentation.</span>" +
        "<span>Built with HTML · CSS · JS · Mermaid · Cookieless analytics by Umami</span>" +
      "</div>";
    document.body.appendChild(f);
  }

  // ---------- TOC ----------
  function buildTOC() {
    var tocNav = document.getElementById("toc-list");
    var content = document.querySelector(".content");
    if (!tocNav || !content) return;
    var heads = content.querySelectorAll("h2, h3");
    var ul = document.createElement("ul");
    heads.forEach(function (h) {
      if (!h.id) h.id = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent.replace(/^\s*\d+(\.\d+)*\s*/, "");
      a.className = h.tagName === "H3" ? "toc-h3" : "toc-h2";
      li.appendChild(a);
      ul.appendChild(li);
    });
    tocNav.appendChild(ul);

    // scrollspy
    var links = tocNav.querySelectorAll("a");
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("active"); });
          if (map[e.target.id]) map[e.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-80px 0px -70% 0px", threshold: 0 });
    heads.forEach(function (h) { obs.observe(h); });
  }

  // ---------- PROGRESS BARS ----------
  function animateProgress() {
    var bars = document.querySelectorAll(".progress > span[data-pct]");
    if (!bars.length) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.width = e.target.getAttribute("data-pct") + "%";
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(function (b) { obs.observe(b); });
  }

  // ---------- FLOATING BUTTONS (home + theme + back to top) ----------
  function backToTop() {
    var buttons = [];
    var isHome = (document.body.getAttribute("data-page") || "home") === "home";

    // Back to top (bottom-most)
    var btn = document.createElement("button");
    btn.className = "icon-btn float-btn back-top";
    btn.innerHTML = "↑";
    btn.setAttribute("aria-label", "Back to top");
    btn.setAttribute("title", "Back to top");
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    buttons.push(btn);

    // Theme toggle (middle)
    var theme = document.createElement("button");
    theme.id = "theme-btn";
    theme.className = "icon-btn float-btn float-theme";
    theme.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";
    theme.setAttribute("aria-label", "Toggle theme");
    theme.setAttribute("title", "Toggle light/dark");
    theme.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      applyTheme(cur === "dark" ? "light" : "dark");
    });
    buttons.push(theme);

    // Home (top-most) — omitted on the home page where it would be redundant
    if (!isHome) {
      var home = document.createElement("a");
      home.className = "icon-btn float-btn float-home";
      home.innerHTML = "🏠";
      home.href = pageHref("");
      home.setAttribute("aria-label", "Back to home");
      home.setAttribute("title", "Home");
      buttons.push(home);
    }

    buttons.forEach(function (b) { document.body.appendChild(b); });

    window.addEventListener("scroll", function () {
      var show = window.scrollY > 600;
      buttons.forEach(function (b) { b.classList.toggle("show", show); });
    }, { passive: true });
  }

  // ---------- MERMAID ----------
  function mermaidTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "neutral";
  }
  function renderMermaid(reRender) {
    if (!window.mermaid) return;
    var nodes = document.querySelectorAll(".mermaid");
    if (!nodes.length) return;
    // Keep the source as serialized HTML (not textContent): restoring it via
    // innerHTML then round-trips exactly, so escaped text like &lt; can never
    // turn into live markup, and <br/> line breaks survive a theme switch.
    if (reRender) {
      nodes.forEach(function (n) {
        if (n.getAttribute("data-src")) { n.removeAttribute("data-processed"); n.innerHTML = n.getAttribute("data-src"); }
      });
    } else {
      nodes.forEach(function (n) { if (!n.getAttribute("data-src")) n.setAttribute("data-src", n.innerHTML.trim()); });
    }
    window.mermaid.initialize({
      startOnLoad: false, theme: mermaidTheme(), securityLevel: "strict",
      fontFamily: '"Segoe UI", system-ui, sans-serif',
      flowchart: { curve: "basis", useMaxWidth: true }
    });
    try { window.mermaid.run({ nodes: nodes }); } catch (e) { console.warn("mermaid", e); }
    window.__mermaidReady = true;
  }
  // Pinned to an exact version with a Subresource Integrity hash: the browser
  // refuses to run the file if the CDN ever serves different bytes. When
  // upgrading, take the new hash from
  // https://data.jsdelivr.com/v1/packages/npm/mermaid@<version>?structure=flat
  function loadMermaid() {
    if (!document.querySelector(".mermaid")) return;
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/mermaid@10.9.8/dist/mermaid.min.js";
    s.integrity = "sha256-jWB9fvHQd6iqIC4Y5iISv6mSxov+q8XPRdUaEo/mZ10=";
    s.crossOrigin = "anonymous";
    s.onload = function () { renderMermaid(false); };
    document.head.appendChild(s);
  }

  // ---------- UMAMI (cookieless analytics) ----------
  // The website ID is injected at deploy time from the UMAMI_WEBSITE_ID secret
  // (see .github/workflows/deploy-pages.yml). The placeholder below is split when
  // compared so the build-time replace never touches the guard string.
  function loadUmami() {
    var id = "__UMAMI_WEBSITE_ID__";
    var unreplaced = "__UMAMI" + "_WEBSITE_ID__";
    if (!id || id === unreplaced) return; // not configured (local dev / secret unset)
    var s = document.createElement("script");
    s.defer = true;
    s.src = "https://cloud.umami.is/script.js";
    s.setAttribute("data-website-id", id);
    document.head.appendChild(s);
  }

  // ---------- INIT ----------
  initTheme();
  loadUmami();
  document.addEventListener("DOMContentLoaded", function () {
    buildHeader();
    buildFooter();
    buildTOC();
    animateProgress();
    backToTop();
    loadMermaid();
  });
})();
