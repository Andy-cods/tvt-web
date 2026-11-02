(function () {
  'use strict';
  var I = window.TVT_I18N || { copy: 'Sao chép brief', copied: 'Đã sao chép', selected: 'Đã chọn sẵn, nhấn Ctrl+C', total: 'Tổng', items: 'sản phẩm', about: 'khoảng', vol: 'Thể tích ước tính', time: 'Thời gian in / sản phẩm', hours: 'giờ', disc: 'Chiết khấu số lượng', brief: 'BRIEF IN 3D GỬI TVT', bName: 'Tên', bZalo: 'Zalo', bSvc: 'Dịch vụ', bQty: 'Số lượng', bDesc: 'Mô tả', none: '(chưa có)', est: 'Ước tính đã xem', subj: 'Brief in 3D', per: 'sp', qtyShort: 'SL', open: 'Mở menu', close: 'Đóng menu', numLocale: 'vi-VN', cur: 'đ', decimal: ',' };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Menu di động + dropdown */
  var menu = $('#menu'), mb = $('#menuBtn');
  var closeDropdowns = function (except) {
    $$('.menu > li.open').forEach(function (x) {
      if (x === except) return;
      x.classList.remove('open');
      var b = $('.dd-btn', x); if (b) b.setAttribute('aria-expanded', 'false');
    });
  };
  var setMenu = function (open) {
    if (!menu || !mb) return;
    menu.classList.toggle('open', open);
    mb.setAttribute('aria-expanded', String(open));
    mb.setAttribute('aria-label', open ? I.close : I.open);
    document.body.classList.toggle('menu-open', open);
    if (!open) closeDropdowns();
  };
  if (menu && mb) {
    mb.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    var mq = matchMedia('(min-width: 1081px)');
    var onMq = function () { if (mq.matches) setMenu(false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq); else if (mq.addListener) mq.addListener(onMq);
  }
  $$('.dd-btn').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var li = b.parentElement, o = !li.classList.contains('open');
      closeDropdowns(li);
      li.classList.toggle('open', o);
      b.setAttribute('aria-expanded', String(o));
    });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.menu > li')) closeDropdowns(); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openLi = $('.menu > li.open');
    if (openLi) { closeDropdowns(); var b = $('.dd-btn', openLi); if (b) b.focus(); return; }
    if (menu && menu.classList.contains('open')) { setMenu(false); mb.focus(); }
  });

  /* Tab giải pháp (trang chủ) */
  var tabs = $('#solTabs');
  if (tabs) {
    var btns = $$('[role=tab]', tabs);
    var pick = function (i) {
      btns.forEach(function (b, j) {
        b.setAttribute('aria-selected', String(i === j));
        b.tabIndex = i === j ? 0 : -1;
        var p = document.getElementById(b.getAttribute('aria-controls'));
        if (p) p.hidden = i !== j;
      });
    };
    btns.forEach(function (b, i) { b.addEventListener('click', function () { pick(i); }); });
    tabs.addEventListener('keydown', function (e) {
      var i = btns.indexOf(document.activeElement); if (i < 0) return;
      var j = e.key === 'ArrowRight' ? (i + 1) % btns.length : e.key === 'ArrowLeft' ? (i - 1 + btns.length) % btns.length : e.key === 'Home' ? 0 : e.key === 'End' ? btns.length - 1 : -1;
      if (j >= 0) { e.preventDefault(); pick(j); btns[j].focus(); }
    });
    pick(0);
  }

  /* Bộ lọc tác phẩm */
  var filters = $('#filters');
  if (filters) {
    var fb = $$('button', filters);
    fb.forEach(function (b) {
      b.addEventListener('click', function () {
        var c = b.dataset.cat;
        fb.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        $$('#gal .work').forEach(function (w) { w.hidden = !(c === 'all' || w.dataset.cat === c); });
      });
    });
  }

  /* Ước tính báo giá */
  var qForm = $('#qForm');
  var lastEst = '';
  if (qForm) {
    var qSize = $('#qSize'), qMat = $('#qMat'), qQty = $('#qQty');
    var steps = [1, 2, 3, 5, 10, 20, 30, 50, 100, 200, 300, 500, 1000];
    var vnd = function (v) { return (Math.round(v / 1000) * 1000).toLocaleString(I.numLocale) + I.cur; };
    var num = function (v) { return v.toLocaleString(I.numLocale); };
    var qty = function (v) { return steps[Math.round(v / 100 * (steps.length - 1))]; };
    var disc = function (q) { return q >= 200 ? 0.6 : q >= 50 ? 0.72 : q >= 10 ? 0.85 : 1; };
    var calc = function () {
      var s = +qSize.value, opt = qMat.options[qMat.selectedIndex];
      var rate = +opt.dataset.rate, resin = opt.dataset.type.indexOf('MSLA') >= 0;
      var fill = +$('[name=qFill]:checked').value, fin = +$('[name=qFin]:checked').value, q = qty(+qQty.value);
      $('#qSizeOut').textContent = s + ' cm';
      $('#qQtyOut').textContent = num(q);
      var vol = Math.pow(s, 3) * fill, raw = Math.max(30000, vol * rate * fin * disc(q)), lo = raw * 0.85, hi = raw * 1.2;
      lastEst = vnd(lo) + ' – ' + vnd(hi) + ' / ' + I.per + ' (' + opt.textContent + ', ' + s + ' cm, ' + I.qtyShort + ' ' + q + ')';
      $('#qPrice').innerHTML = vnd(lo) + ' – ' + vnd(hi) + '<small>' + I.total + ' ' + num(q) + ' ' + I.items + ': ' + I.about + ' ' + vnd(lo * q) + ' – ' + vnd(hi * q) + '</small>';
      var hrs = Math.max(1, vol / (resin ? 40 : 14));
      var d = disc(q);
      $('#qBreak').innerHTML =
        '<div><span>' + I.vol + '</span><span class="mono">' + num(Math.round(vol)) + ' cm³</span></div>' +
        '<div><span>' + I.time + '</span><span class="mono">~' + (hrs < 10 ? hrs.toFixed(1).replace('.', I.decimal) : Math.round(hrs)) + ' ' + I.hours + '</span></div>' +
        '<div><span>' + I.disc + '</span><span class="mono">' + (d < 1 ? '−' + Math.round((1 - d) * 100) + '%' : '—') + '</span></div>';
      try { sessionStorage.setItem('tvt-est', lastEst); } catch (e) {}
    };
    qForm.addEventListener('input', calc);
    calc();
  }

  /* Form brief liên hệ */
  var brief = $('#brief');
  if (brief) {
    var sp = new URLSearchParams(location.search);
    if (sp.get('dich-vu')) { var sel = $('#bSvc'); $$('option', sel).forEach(function (o) { if (o.value === sp.get('dich-vu')) sel.value = o.value; }); }
    var submit = $('#bSubmit'), copyBtn = $('#bCopy'), copyTimer = 0;
    brief.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submit && submit.getAttribute('aria-busy') === 'true') return;
      var n = $('#bName').value.trim(), p = $('#bPhone').value.trim();
      $('#bErr').hidden = !!(n && p);
      if (!n || !p) { (n ? $('#bPhone') : $('#bName')).focus(); return; }
      if (submit) { submit.setAttribute('aria-busy', 'true'); submit.disabled = true; }
      var est = lastEst; if (!est) { try { est = sessionStorage.getItem('tvt-est') || ''; } catch (e2) {} }
      var svcSel = $('#bSvc'), svcName = svcSel.options[svcSel.selectedIndex].textContent;
      var t = I.brief + '\n' + I.bName + ': ' + n + '\n' + I.bZalo + ': ' + p + '\n' + I.bSvc + ': ' + svcName + '\n' + I.bQty + ': ' + $('#bQty').value +
        '\n' + I.bDesc + ': ' + ($('#bDesc').value.trim() || I.none) + (est ? '\n' + I.est + ': ' + est : '');
      setTimeout(function () {
        $('#bText').textContent = t;
        var mail = $('#bMail'); if (mail && brief.dataset.email) mail.href = 'mailto:' + brief.dataset.email + '?subject=' + encodeURIComponent(I.subj + ' - ' + n) + '&body=' + encodeURIComponent(t);
        $('#bOut').hidden = false;
        if (copyBtn) { copyBtn.textContent = I.copy; copyBtn.focus(); }
        if (submit) { submit.removeAttribute('aria-busy'); submit.disabled = false; }
      }, 350);
    });
    if (copyBtn) copyBtn.addEventListener('click', function () {
      var el = $('#bText');
      var done = function (msg) { copyBtn.textContent = msg; clearTimeout(copyTimer); copyTimer = setTimeout(function () { copyBtn.textContent = I.copy; }, 2200); };
      var sel = function () { var r = document.createRange(); r.selectNodeContents(el); var sl = getSelection(); sl.removeAllRanges(); sl.addRange(r); done(I.selected); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(el.textContent).then(function () { done(I.copied); }, sel); else sel();
    });
  }
})();
