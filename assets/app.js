/* ==========================================================================
   Jun Ma research website · renderer
   Reads the content files in /content and builds the four tabs.
   You should not need to edit this file to update content (see README.md).
   ========================================================================== */
(function () {
  'use strict';

  var SITE = window.SITE || {};
  var site = SITE.site || {};
  var app = document.getElementById('app');
  var main = document.getElementById('main');

  var DEFAULT_TABS = [
    { id: 'home', label: 'Home' },
    { id: 'research', label: 'Research' },
    { id: 'resources', label: 'Resources' },
    { id: 'publications', label: 'Publications' }
  ];
  var tabs = (site.tabs && site.tabs.length) ? site.tabs : DEFAULT_TABS;

  var CHEVRON = '<svg class="chevron" aria-hidden="true" focusable="false" viewBox="0 0 8 12" width="8" height="12"><path d="M1.5 1.5 6 6l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
  var PLAY = '<svg aria-hidden="true" focusable="false" viewBox="0 0 12 12" width="12" height="12"><path d="M2 1v10l9-5z" fill="currentColor"/></svg>';

  /* ---------- Text helpers ---------- */

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Only web, mail and phone links, or paths inside this site.
  function safeUrl(u) {
    u = String(u == null ? '' : u).trim();
    if (!u) return '';
    if (/^(https?:|mailto:|tel:)/i.test(u)) return u;
    if (/^[a-z][a-z0-9+.\-]*:/i.test(u)) return '';
    return u;
  }

  function count(s, ch) { return s.split(ch).length - 1; }
  function prettyUrl(u) { return u.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, ''); }

  // [text](url), allowing one level of brackets inside the url (DOIs often have them).
  var LINK_RE = /\[([^\]]+)\]\(((?:[^()\s]|\([^()\s]*\))+)\)/g;
  var URL_RE = /https?:\/\/[^\s<>"']+/g;

  function inlineText(s) {
    s = esc(s);
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\*\*([^*\s](?:[^*]*[^*\s])?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[\s(\[])\*([^*\s](?:[^*]*[^*\s])?)\*(?=$|[\s.,;:!?)\]])/g, '$1<em>$2</em>');
    return s;
  }

  // Inline Markdown: **bold**, *italic*, `code`, [text](url) and bare web addresses.
  function inline(src) {
    var stash = [];
    function keep(html) { stash.push(html); return '\u0000' + (stash.length - 1) + '\u0000'; }
    var s = String(src == null ? '' : src);
    s = s.replace(LINK_RE, function (m, text, url) {
      var u = safeUrl(url);
      return u ? keep('<a href="' + esc(u) + '">' + inlineText(text) + '</a>') : text;
    });
    s = s.replace(URL_RE, function (m) {
      var url = m, tail = '';
      var t = url.match(/[.,;:!?]+$/);
      if (t) { tail = t[0]; url = url.slice(0, -tail.length); }
      while (/\)$/.test(url) && count(url, '(') < count(url, ')')) { url = url.slice(0, -1); tail = ')' + tail; }
      return keep('<a href="' + esc(url) + '">' + esc(prettyUrl(url)) + '</a>') + tail;
    });
    return inlineText(s).replace(/\u0000(\d+)\u0000/g, function (m, i) { return stash[+i]; });
  }

  // Block Markdown: paragraphs (blank line between), "- " lists, "## " and "### " headings.
  function block(src) {
    var lines = String(src == null ? '' : src).replace(/\r\n?/g, '\n').split('\n');
    var out = [], para = [], list = [];
    function flushPara() { if (para.length) { out.push('<p>' + inline(para.join(' ')) + '</p>'); para = []; } }
    function flushList() {
      if (list.length) {
        out.push('<ul>' + list.map(function (li) { return '<li>' + inline(li) + '</li>'; }).join('') + '</ul>');
        list = [];
      }
    }
    lines.forEach(function (line) {
      var t = line.trim(), m;
      if (!t) { flushPara(); flushList(); }
      else if ((m = t.match(/^(#{2,3})\s+(.*)$/))) {
        flushPara(); flushList();
        out.push('<h' + m[1].length + '>' + inline(m[2]) + '</h' + m[1].length + '>');
      }
      else if ((m = t.match(/^-\s+(.*)$/))) { flushPara(); list.push(m[1]); }
      else if (list.length) { list[list.length - 1] += ' ' + t; }
      else { para.push(t); }
    });
    flushPara(); flushList();
    return out.join('\n');
  }

  /* ---------- Media helpers ---------- */

  function videoMime(src) {
    if (/\.webm(\?|$)/i.test(src)) return 'video/webm';
    if (/\.mov(\?|$)/i.test(src)) return 'video/quicktime';
    return 'video/mp4';
  }

  function videoTag(src, poster, label) {
    return '<video controls playsinline preload="' + (poster ? 'none' : 'metadata') + '"' +
      (poster ? ' poster="' + esc(poster) + '"' : '') +
      (label ? ' aria-label="' + esc(label) + '"' : '') + '>' +
      '<source src="' + esc(src) + '" type="' + videoMime(src) + '">' +
      '<a href="' + esc(src) + '">Download the video</a></video>';
  }

  function figureLink(src, alt) {
    return '<a class="figure-link" href="' + esc(src) + '" data-lightbox="image" data-caption="' + esc(alt || '') + '"' +
      ' aria-label="Enlarge figure' + (alt ? ': ' + esc(alt) : '') + '">' +
      '<img src="' + esc(src) + '" alt="' + esc(alt || '') + '" loading="lazy" decoding="async"></a>';
  }

  // Buttons under a block of text: an optional demo video (opens in a viewer) and optional links.
  function actions(item, opts) {
    var html = '';
    var video = safeUrl(item.video);
    if (video && !(opts && opts.inlineVideo)) {
      html += '<a class="btn btn-secondary" href="' + esc(video) + '" data-lightbox="video"' +
        (item.poster ? ' data-poster="' + esc(item.poster) + '"' : '') +
        ' data-caption="' + esc(item.videoLabel || 'Demo video') + '">' + PLAY + esc(item.videoLabel || 'Watch the demo') + '</a>';
    }
    (item.links || []).forEach(function (l) {
      var u = l && safeUrl(l.url);
      if (u) html += '<a class="btn btn-secondary" href="' + esc(u) + '">' + esc(l.label || prettyUrl(u)) + '</a>';
    });
    return html ? '<div class="actions">' + html + '</div>' : '';
  }

  /* ---------- Home ---------- */

  // Line icons for the links under the photo, drawn white on a UHN Blue circle.
  var ICONS = {
    email: '<rect x="3.5" y="6" width="17" height="12" rx="1"/><path d="m4 7 8 6.5L20 7"/>',
    scholar: '<path d="M2.5 9.5 12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5V16c1.5 1.4 3.4 2.1 5.5 2.1s4-.7 5.5-2.1v-4.5"/><path d="M21.5 9.5V15"/>',
    code: '<path d="m8.5 7.5-5 4.5 5 4.5"/><path d="m15.5 7.5 5 4.5-5 4.5"/><path d="m13.5 5-3 14"/>',
    chat: '<path d="M4 5h16v11h-8.5L7 19.5V16H4z"/><path d="M8 9h8M8 12h5"/>',
    briefcase: '<rect x="3.5" y="7.5" width="17" height="11.5" rx="1"/><path d="M9 7.5v-2h6v2"/><path d="M3.5 12.5h17"/>',
    link: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.7 2.8 2.7 14.2 0 17M12 3.5c-2.7 2.8-2.7 14.2 0 17"/>'
  };

  function iconBadge(name) {
    name = String(name || 'link');
    if (/[\/.]/.test(name)) return '<img class="icon-img" src="' + esc(name) + '" alt="" width="32" height="32">';
    return '<span class="icon-badge" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" focusable="false">' +
      (ICONS[name] || ICONS.link) + '</svg></span>';
  }

  function linkItem(l) {
    var url = safeUrl(l.url);
    var text = l.text
      ? '<span class="visually-hidden">' + esc(l.label) + ': </span><span class="icon-link-text">' + esc(l.text) + '</span>'
      : '<span class="icon-link-text">' + esc(l.label) + '</span>';
    return url
      ? '<li><a class="icon-link" href="' + esc(url) + '">' + iconBadge(l.icon) + text + '</a></li>'
      : '<li><span class="icon-link icon-link-plain">' + iconBadge(l.icon) + text + '</span></li>';
  }

  // News: one item per line, "MM/YYYY: text". The part before the first ": " is the date.
  function newsList(src) {
    var lines = Array.isArray(src) ? src : String(src || '').replace(/\r\n?/g, '\n').split('\n');
    var html = '';
    lines.forEach(function (line) {
      line = String(line).trim().replace(/^-\s+/, '');
      if (!line) return;
      var date = '', text = line, i = line.indexOf(': ');
      if (i > 0 && i <= 20 && /\d/.test(line.slice(0, i))) { date = line.slice(0, i); text = line.slice(i + 2); }
      html += '<li class="news-item">' +
        (date ? '<span class="news-date">' + esc(date) + '</span>' : '') +
        '<span class="news-text">' + inline(text) + '</span></li>';
    });
    return html ? '<ul class="news-list">' + html + '</ul>' : '';
  }

  function renderHome(d) {
    var links = (d.links || []).filter(function (l) { return l && (safeUrl(l.url) || l.text); });
    var news = newsList(d.news);
    return '<div class="home-grid">' +
      '<div class="home-aside">' +
        (d.photo ? '<img class="home-photo" src="' + esc(d.photo) + '" alt="' + esc(d.photoAlt || '') + '">' : '') +
        (links.length ? '<ul class="link-list home-links" aria-label="Contact and profiles">' + links.map(linkItem).join('') + '</ul>' : '') +
      '</div>' +
      '<div class="home-main">' +
        '<h1 class="page-title">' + esc(d.name || site.name || '') + '</h1>' +
        '<div class="home-bio prose">' + block(d.bio) + '</div>' +
        (news ? '<section class="home-news"><h2 class="subsection-title">' + esc(d.newsTitle || 'News') + '</h2>' + news + '</section>' : '') +
      '</div>' +
    '</div>';
  }

  /* ---------- Research ---------- */

  function renderResearch(d, tab) {
    var html = '<h1 class="page-title">' + esc(d.title || tab.label) + '</h1>';
    if (d.intro) html += '<div class="lead prose">' + block(d.intro) + '</div>';
    (d.areas || []).forEach(function (a) {
      html += '<section class="area' + (a.image ? '' : ' area-noimage') + '">' +
        (a.image ? '<div class="area-figure">' + figureLink(a.image, a.imageAlt) + '</div>' : '') +
        '<div class="area-body">' +
          '<h2 class="subsection-title">' + esc(a.title) + '</h2>' +
          '<div class="prose">' + block(a.text) + '</div>' +
          actions(a) +
        '</div>' +
      '</section>';
    });
    return html;
  }

  /* ---------- Resources ---------- */

  function resourceItem(it) {
    var url = safeUrl(it.url);
    var name = url ? '<a href="' + esc(url) + '">' + esc(it.name) + '</a>' : esc(it.name);
    var body = '<div class="resource-body">' +
      '<h3 class="card-title">' + name + '</h3>' +
      (it.description ? '<div class="prose">' + block(it.description) + '</div>' : '') +
      actions(it, { inlineVideo: true }) +
    '</div>';
    var media = '';
    if (safeUrl(it.video)) media = videoTag(it.video, it.poster, it.name + ' demo video');
    else if (it.image) media = figureLink(it.image, it.imageAlt);
    if (!media) return '<li class="resource">' + body + '</li>';
    return '<li class="resource"><div class="resource-media">' +
      '<div class="resource-figure">' + media +
        (it.videoCaption ? '<p class="media-caption">' + inline(it.videoCaption) + '</p>' : '') +
      '</div>' + body + '</div></li>';
  }

  function renderResources(d, tab) {
    var html = '<h1 class="page-title">' + esc(d.title || tab.label) + '</h1>';
    if (d.intro) html += '<div class="lead prose">' + block(d.intro) + '</div>';
    (d.sections || []).forEach(function (s) {
      html += '<section class="section">' +
        '<h2 class="section-title">' + esc(s.title) + '</h2>' +
        (s.intro ? '<div class="prose">' + block(s.intro) + '</div>' : '') +
        '<ul class="resource-list">' + (s.items || []).map(resourceItem).join('') + '</ul>' +
      '</section>';
    });
    return html;
  }

  /* ---------- Publications ---------- */

  var ABBREV = /(?:\bvs|\bet al|\be\.g|\bi\.e|\bDr|\bSt|\bFig|\bNo|\bcf)$/i;
  var LOWERCASE_VENUE = /^(arXiv|bioRxiv|medRxiv|npj|eLife|iScience|mBio|eBioMedicine)/;

  // Splits a pasted citation ("Authors. Title. Journal. Year;Vol:Pages. https://doi.org/...")
  // into authors, title, venue and link. If it cannot, the citation is shown as written.
  function parseCitation(raw) {
    var links = [];
    var text = String(raw).replace(LINK_RE, function (m, label, url) {
      links.push({ label: label, url: url });
      return '';
    });
    text = text.replace(/\s+/g, ' ').trim();
    var out = { url: '', links: links, plain: text };
    var m = text.match(/(?:\b(?:Preprint\s+)?DOI:\s*|\bAvailable from:\s*)?(https?:\/\/\S+?)[.,;]?$/i);
    if (m) {
      out.url = m[1];
      text = text.slice(0, m.index).trim();
      out.plain = text;
    }
    var i = text.indexOf('. ');
    if (i < 1) return out;
    var authors = text.slice(0, i), rest = text.slice(i + 2);
    var re = /[.?!]\s+/g, k, end = -1;
    while ((k = re.exec(rest))) {
      var before = rest.slice(0, k.index), after = rest.slice(k.index + k[0].length);
      if (rest.charAt(k.index) === '.' && ABBREV.test(before)) continue;
      if (/^[A-Z0-9(\[]/.test(after) || LOWERCASE_VENUE.test(after)) { end = k.index; break; }
    }
    if (end < 0) {
      if (!/[.?!]$/.test(rest)) return out;
      end = rest.length - 1;
    }
    out.authors = authors;
    out.title = rest.slice(0, rest.charAt(end) === '.' ? end : end + 1).trim();
    out.venue = rest.slice(end + 1).trim();
    return out;
  }

  function boldMe(html, me) {
    [].concat(me || []).forEach(function (name) {
      if (!name) return;
      var n = esc(name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      html = html.replace(new RegExp('(^|[\\s,;(])(' + n + ')(\\*?)(?=$|[\\s,;.)])', 'g'), '$1<strong>$2$3</strong>');
    });
    return html;
  }

  function pubEntry(entry, me) {
    var p = (typeof entry === 'string') ? parseCitation(entry) : {
      title: entry.title, authors: entry.authors, venue: entry.venue,
      url: entry.url || '', links: entry.links || [], plain: entry.text || ''
    };
    var url = safeUrl(p.url);
    var extra = (p.links || []).map(function (l) {
      var u = safeUrl(l.url);
      return u ? '<a href="' + esc(u) + '">' + esc(l.label) + '</a>' : '';
    }).filter(Boolean).join(' · ');

    if (!p.title) {
      return '<li class="pub"><p class="pub-plain">' + boldMe(esc(p.plain), me) +
        (url ? ' <a href="' + esc(url) + '">' + esc(prettyUrl(url)) + '</a>' : '') +
        (extra ? ' <span class="pub-links">' + extra + '</span>' : '') + '</p></li>';
    }
    return '<li class="pub">' +
      '<p class="pub-title">' + (url ? '<a href="' + esc(url) + '">' + esc(p.title) + '</a>' : esc(p.title)) + '</p>' +
      (p.authors ? '<p class="pub-authors">' + boldMe(esc(p.authors), me) + '</p>' : '') +
      ((p.venue || extra) ? '<p class="pub-venue">' + esc(p.venue || '') +
        (extra ? (p.venue ? ' ' : '') + '<span class="pub-links">' + extra + '</span>' : '') + '</p>' : '') +
    '</li>';
  }

  // The list is either one block of text (one citation per paragraph, "## 2025" for a year heading)
  // or an array of citations / { title, authors, venue, url, links } objects.
  function pubList(list, me) {
    var entries = Array.isArray(list) ? list : String(list || '').replace(/\r\n?/g, '\n').split(/\n\s*\n/);
    var html = '', open = false;
    entries.forEach(function (e) {
      if (typeof e === 'string') {
        e = e.trim();
        if (!e) return;
        var h = e.match(/^#{2,3}\s+(.*)$/);
        if (h) {
          if (open) { html += '</ul>'; open = false; }
          html += '<h3 class="pub-year">' + esc(h[1]) + '</h3>';
          return;
        }
      }
      if (!e) return;
      if (!open) { html += '<ul class="pub-list">'; open = true; }
      html += pubEntry(e, me);
    });
    if (open) html += '</ul>';
    return html;
  }

  function highlightItem(h) {
    var url = safeUrl(h.url);
    var inner = (h.cover ? '<span class="highlight-cover"><img src="' + esc(h.cover) + '" alt="' +
        esc(h.journal ? h.journal + ' cover' : '') + '" loading="lazy" decoding="async"></span>' : '') +
      '<span class="highlight-name">' + esc(h.name) + '</span>';
    return '<li>' + (url ? '<a class="highlight" href="' + esc(url) + '">' + inner + '</a>'
      : '<span class="highlight">' + inner + '</span>') + '</li>';
  }

  function renderPublications(d, tab) {
    var html = '<h1 class="page-title">' + esc(d.title || tab.label) + '</h1>';
    var hl = d.highlights || [];
    if (hl.length) {
      html += '<ul class="highlights" aria-label="Highlighted papers" style="--cols:' + Math.min(hl.length, 6) + '">' +
        hl.map(highlightItem).join('') + '</ul>';
    }
    var full = safeUrl(d.fullListUrl);
    html += '<section class="section">' +
      '<div class="section-head">' +
        '<h2 class="section-title">' + esc(d.listTitle || 'Selected Publications') + '</h2>' +
        (full ? '<a class="btn btn-accent" href="' + esc(full) + '">' + esc(d.fullListLabel || 'Full List on Google Scholar') + CHEVRON + '</a>' : '') +
      '</div>' +
      pubList(d.list, d.me) +
      (d.note ? '<p class="pub-note">' + inline(d.note) + '</p>' : '') +
    '</section>';
    return html;
  }

  /* ---------- Any extra tab: a title and Markdown text ---------- */

  function renderGeneric(d, tab) {
    return '<h1 class="page-title">' + esc(d.title || tab.label) + '</h1>' +
      '<div class="prose">' + block(d.body) + '</div>';
  }

  /* ---------- Errors in a content file ---------- */

  function contentError(key, detail) {
    var file = 'content/' + key + '.js';
    var hit = (window.SITE_ERRORS || []).filter(function (e) { return e.file && e.file.indexOf(file) !== -1; })[0];
    var why = detail || (hit ? hit.message + (hit.line ? ' (line ' + hit.line + ')' : '') : '');
    return '<div class="notice" role="alert">' +
      '<h2 class="notice-title">This page could not be loaded</h2>' +
      '<p>Check <code>' + esc(file) + '</code> for a typo, such as a missing comma, quotation mark or backtick.</p>' +
      (why ? '<p><code>' + esc(why) + '</code></p>' : '') +
    '</div>';
  }

  /* ---------- Build ---------- */

  var RENDERERS = { home: renderHome, research: renderResearch, resources: renderResources, publications: renderPublications };

  var tabList = document.getElementById('tabs');
  var pages = [], tabLinks = [];

  if (!SITE.site) app.insertAdjacentHTML('beforeend', contentError('site'));

  tabs.forEach(function (tab) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + tab.id;
    a.textContent = tab.label;
    a.setAttribute('data-tab', tab.id);
    li.appendChild(a);
    tabList.appendChild(li);
    tabLinks.push(a);

    var page = document.createElement('section');
    page.className = 'page page-' + tab.id;
    page.setAttribute('data-page', tab.id);
    page.hidden = true;
    var data = SITE[tab.id];
    try {
      page.innerHTML = data ? (RENDERERS[tab.type || tab.id] || renderGeneric)(data, tab) : contentError(tab.id);
    } catch (err) {
      page.innerHTML = contentError(tab.id, err && err.message);
    }
    app.appendChild(page);
    pages.push(page);
  });

  // Optional name at the left of the blue header (site.headerName).
  if (site.headerName) {
    var nav = document.querySelector('.tabs-nav');
    var nameLink = document.createElement('a');
    nameLink.className = 'site-name';
    nameLink.href = '#' + tabs[0].id;
    nameLink.textContent = site.headerName;
    nav.parentNode.insertBefore(nameLink, nav);
  }

  // Footer
  var footer = document.getElementById('footer');
  if (footer) {
    var aff = (site.affiliations || []).map(function (a) {
      var u = safeUrl(a.url);
      var inner = a.logo ? '<img class="footer-logo" src="' + esc(a.logo) + '" alt="' + esc(a.name) + '">' : esc(a.name);
      return '<li>' + (u ? '<a href="' + esc(u) + '">' + inner + '</a>' : inner) + '</li>';
    }).join('');
    var note = site.footerNote
      ? inline(String(site.footerNote).replace('{year}', new Date().getFullYear()))
      : '© ' + new Date().getFullYear() + ' ' + esc(site.name || '');
    footer.innerHTML = '<div class="footer-inner">' +
      (aff ? '<ul class="footer-affiliations" aria-label="Affiliations">' + aff + '</ul>' : '') +
      '<p class="footer-note">' + note + '</p></div>';
  }

  /* ---------- Tabs ---------- */

  function currentId() {
    var h = '';
    try { h = decodeURIComponent((location.hash || '').replace(/^#/, '')); } catch (e) { h = ''; }
    return tabs.some(function (t) { return t.id === h; }) ? h : tabs[0].id;
  }

  function show(id, navigated) {
    pages.forEach(function (p) { p.hidden = p.getAttribute('data-page') !== id; });
    tabLinks.forEach(function (a) {
      if (a.getAttribute('data-tab') === id) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    var tab = tabs.filter(function (t) { return t.id === id; })[0];
    var base = site.title || site.name || document.title;
    document.title = (id === tabs[0].id) ? base : tab.label + ' · ' + base;
    if (navigated) {
      window.scrollTo(0, 0);
      if (main) main.focus({ preventScroll: true });
    }
  }

  window.addEventListener('hashchange', function () { show(currentId(), true); });
  show(currentId(), false);

  /* ---------- Figure and video viewer ---------- */

  var dialog = document.getElementById('lightbox');
  var stage = document.getElementById('lightbox-stage');
  var caption = document.getElementById('lightbox-caption');

  if (dialog && typeof dialog.showModal === 'function') {
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('[data-lightbox]') : null;
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      e.preventDefault();
      var src = a.getAttribute('href');
      var text = a.getAttribute('data-caption') || '';
      caption.textContent = text;
      if (a.getAttribute('data-lightbox') === 'video') {
        stage.innerHTML = videoTag(src, a.getAttribute('data-poster'), text);
        var v = stage.querySelector('video');
        dialog.showModal();
        var playing = v.play();
        if (playing && playing.catch) playing.catch(function () {});
      } else {
        stage.innerHTML = '<img src="' + esc(src) + '" alt="' + esc(text) + '">';
        dialog.showModal();
      }
    });
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog || (e.target.closest && e.target.closest('.lightbox-close'))) dialog.close();
    });
    dialog.addEventListener('close', function () { stage.innerHTML = ''; });
  }
})();
