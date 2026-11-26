/* ORDO × TikTok — Login Kit + Content Posting API (Direct Post) demo client.
   Tokens and the client secret never reach this page: the OAuth code is exchanged
   by ORDO's local publishing service (http://127.0.0.1:8787) on our own machine. */
(function () {
  'use strict';

  var CLIENT_KEY = 'awy06h4yb60id6g3';
  var REDIRECT_URI = 'https://franch.ordogen.education/tiktok/callback/';
  var SCOPES = 'user.info.basic,user.info.profile,user.info.stats,video.list,video.upload,video.publish';
  var LOCAL = 'http://127.0.0.1:8787';

  /* ---------- i18n ---------- */
  var T = {
    en: {
      eyebrow: 'Official integration · TikTok Login Kit + Content Posting API',
      h1: 'ORDO <span class="x">×</span> TikTok — publish videos',
      lead: 'ORDO prepares short educational videos for kindergartens and parents. Connect our TikTok account once and publish finished videos straight from ORDO — with your caption and privacy settings.',
      s1h: 'Connect', s1p: 'Log in with TikTok and allow ORDO to read your profile and post videos.',
      s2h: 'Choose a video', s2p: 'Pick a finished video from the ORDO queue, write a caption, choose who can view it.',
      s3h: 'Publish', s3p: 'ORDO uploads the video to TikTok and shows the publishing status.',
      connect: 'Continue with TikTok', reconnect: 'Connect another account',
      local_ok: 'ORDO publishing service is online', local_off: 'ORDO publishing service is offline (start it on the ORDO computer)',
      acc_h: 'Connected TikTok account', acc_sub: 'Data from TikTok (user.info.basic, user.info.profile, user.info.stats).',
      followers: 'Followers', following: 'Following', likes: 'Likes', videos_c: 'Videos',
      pub_h: 'Publish a video', pub_sub: 'Direct Post to TikTok (video.upload + video.publish).',
      queue: 'Ready videos from ORDO', no_queue: 'No videos in the queue yet.',
      posting_to: 'Posting to', caption: 'Caption', privacy: 'Who can view this video',
      privacy_ph: 'Select privacy…', allow: 'Allow users to', comment: 'Comment', duet: 'Duet', stitch: 'Stitch',
      disc_h: 'Disclose video content', disc_p: 'Turn on to disclose that this video promotes goods or services in exchange for something of value.',
      yourbrand: 'Your brand', yourbrand_p: 'You are promoting yourself or your own business. The video will be labeled "Promotional content".',
      branded: 'Branded content', branded_p: 'You are promoting another brand or a third party. The video will be labeled "Paid partnership".',
      need_one: 'You need to indicate if your content promotes yourself, a third party, or both.',
      branded_private: 'Branded content visibility cannot be set to private.',
      agree: 'By posting, you agree to TikTok\'s <a href="https://www.tiktok.com/legal/page/global/music-usage-confirmation/en" target="_blank" rel="noopener">Music Usage Confirmation</a>.',
      agree_b: 'By posting, you agree to TikTok\'s <a href="https://www.tiktok.com/legal/page/global/bc-policy/en" target="_blank" rel="noopener">Branded Content Policy</a> and <a href="https://www.tiktok.com/legal/page/global/music-usage-confirmation/en" target="_blank" rel="noopener">Music Usage Confirmation</a>.',
      publish: 'Publish to TikTok', publishing: 'Uploading to TikTok…',
      st_PROCESSING_UPLOAD: 'TikTok is processing the upload…', st_PROCESSING_DOWNLOAD: 'TikTok is processing the video…',
      st_SEND_TO_USER_INBOX: 'Sent to the TikTok inbox.', st_PUBLISH_COMPLETE: 'Published! It may take a few minutes for the video to appear on the profile.',
      st_FAILED: 'Publishing failed', after: 'Your video is being processed by TikTok. It can take a few minutes to appear on your profile.',
      too_long: 'This video is longer than the maximum allowed for this account', sec: 's',
      cant_post: 'TikTok does not allow this account to post right now. Please try again later.',
      list_h: 'Our latest TikTok videos', list_sub: 'From TikTok (video.list).', no_list: 'No public videos yet.',
      views: 'views', connect_first: 'Connect a TikTok account to publish videos.',
      cb_wait: 'Connecting your TikTok account…', cb_ok: 'Account connected', cb_ok_p: 'TikTok account is connected to ORDO. Opening the publishing screen…',
      cb_err: 'Could not connect the account', cb_state: 'Security check failed (state mismatch). Please start again.',
      cb_denied: 'Authorization was cancelled in TikTok.', back: 'Back to ORDO × TikTok', go_publish: 'Go to publishing',
      allow_local: 'If Chrome asks to allow access to devices on your local network, click "Allow" — this is the ORDO publishing service on this computer.',
      footer_terms: 'Terms of Service', footer_privacy: 'Privacy Policy', footer_contact: 'Contact'
    },
    ru: {
      eyebrow: 'Официальная интеграция · TikTok Login Kit + Content Posting API',
      h1: 'ORDO <span class="x">×</span> TikTok — публикация роликов',
      lead: 'ORDO готовит короткие обучающие ролики для детских садов и родителей. Подключите наш TikTok-аккаунт один раз и публикуйте готовые ролики прямо из ORDO — с подписью и настройками приватности.',
      s1h: 'Подключите', s1p: 'Войдите через TikTok и разрешите ORDO читать профиль и публиковать видео.',
      s2h: 'Выберите ролик', s2p: 'Готовый ролик из очереди ORDO, подпись и кто может смотреть.',
      s3h: 'Опубликуйте', s3p: 'ORDO загружает ролик в TikTok и показывает статус публикации.',
      connect: 'Войти через TikTok', reconnect: 'Подключить другой аккаунт',
      local_ok: 'Сервис публикации ORDO работает', local_off: 'Сервис публикации ORDO выключен (запустите его на компьютере ORDO)',
      acc_h: 'Подключённый аккаунт TikTok', acc_sub: 'Данные из TikTok (user.info.basic, user.info.profile, user.info.stats).',
      followers: 'Подписчики', following: 'Подписки', likes: 'Лайки', videos_c: 'Видео',
      pub_h: 'Опубликовать ролик', pub_sub: 'Прямая публикация в TikTok (video.upload + video.publish).',
      queue: 'Готовые ролики ORDO', no_queue: 'В очереди пока нет роликов.',
      posting_to: 'Публикация в', caption: 'Подпись', privacy: 'Кто может смотреть видео',
      privacy_ph: 'Выберите…', allow: 'Разрешить', comment: 'Комментарии', duet: 'Дуэт', stitch: 'Стич',
      disc_h: 'Раскрыть рекламный характер', disc_p: 'Включите, если ролик продвигает товары или услуги за вознаграждение.',
      yourbrand: 'Ваш бренд', yourbrand_p: 'Вы продвигаете себя или свой бизнес. Видео получит метку «Промо-контент».',
      branded: 'Брендированный контент', branded_p: 'Вы продвигаете другой бренд. Видео получит метку «Платное партнёрство».',
      need_one: 'Укажите, кого продвигает ролик: вас, третью сторону или обоих.',
      branded_private: 'Брендированный контент нельзя сделать приватным.',
      agree: 'Публикуя, вы соглашаетесь с <a href="https://www.tiktok.com/legal/page/global/music-usage-confirmation/en" target="_blank" rel="noopener">Music Usage Confirmation</a> TikTok.',
      agree_b: 'Публикуя, вы соглашаетесь с <a href="https://www.tiktok.com/legal/page/global/bc-policy/en" target="_blank" rel="noopener">Branded Content Policy</a> и <a href="https://www.tiktok.com/legal/page/global/music-usage-confirmation/en" target="_blank" rel="noopener">Music Usage Confirmation</a> TikTok.',
      publish: 'Опубликовать в TikTok', publishing: 'Загружаем в TikTok…',
      st_PROCESSING_UPLOAD: 'TikTok обрабатывает загрузку…', st_PROCESSING_DOWNLOAD: 'TikTok обрабатывает видео…',
      st_SEND_TO_USER_INBOX: 'Отправлено во входящие TikTok.', st_PUBLISH_COMPLETE: 'Опубликовано! Видео появится в профиле через несколько минут.',
      st_FAILED: 'Публикация не удалась', after: 'TikTok обрабатывает видео. Оно появится в профиле через несколько минут.',
      too_long: 'Ролик длиннее, чем разрешено для этого аккаунта', sec: 'с',
      cant_post: 'TikTok сейчас не разрешает этому аккаунту публиковать. Попробуйте позже.',
      list_h: 'Наши последние ролики в TikTok', list_sub: 'Из TikTok (video.list).', no_list: 'Публичных роликов пока нет.',
      views: 'просм.', connect_first: 'Подключите аккаунт TikTok, чтобы публиковать ролики.',
      cb_wait: 'Подключаем аккаунт TikTok…', cb_ok: 'Аккаунт подключён', cb_ok_p: 'Аккаунт TikTok подключён к ORDO. Открываем экран публикации…',
      cb_err: 'Не удалось подключить аккаунт', cb_state: 'Проверка безопасности не пройдена (state). Начните заново.',
      cb_denied: 'Авторизация отменена в TikTok.', back: 'Назад к ORDO × TikTok', go_publish: 'К публикации',
      allow_local: 'Если Chrome спросит доступ к устройствам в локальной сети — нажмите «Разрешить»: это сервис публикации ORDO на этом компьютере.',
      footer_terms: 'Пользовательское соглашение', footer_privacy: 'Политика конфиденциальности', footer_contact: 'Контакты'
    }
  };
  var lang = 'en';
  try { lang = localStorage.getItem('ordo_tt_lang') || ((navigator.language || '').indexOf('ru') === 0 ? 'ru' : 'en'); } catch (e) {}
  function t(k) { return (T[lang] && T[lang][k]) || T.en[k] || k; }
  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i')); });
    document.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('on', b.dataset.l === lang); });
    if (state.creator) renderCreator();
    if (state.list) renderList(state.list);
    updateAgree();
  }

  /* ---------- helpers ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var state = { account: null, creator: null, file: null, videos: [], list: null };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmt(n) { if (n == null) return '—'; n = +n; return n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e4 ? (n / 1e3).toFixed(1) + 'K' : n.toLocaleString(); }
  function local(path, opts) {
    opts = opts || {};
    var init = { method: opts.method || 'GET', headers: {}, cache: 'no-store' };
    try { init.targetAddressSpace = 'loopback'; } catch (e) {}
    if (opts.body) { init.headers['Content-Type'] = 'application/json'; init.body = JSON.stringify(opts.body); }
    return fetch(LOCAL + path, init).then(function (r) {
      return r.json().then(function (j) { if (!j.ok) throw new Error(j.error || ('HTTP ' + r.status)); return j; });
    });
  }
  function msg(el, kind, html) { el.className = 'msg show ' + kind; el.innerHTML = html; }
  function randomState() {
    var a = new Uint8Array(16); crypto.getRandomValues(a);
    return Array.prototype.map.call(a, function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
  }

  /* ---------- connect ---------- */
  function authorizeUrl() {
    var st = randomState();
    try { sessionStorage.setItem('ordo_tt_state', st); localStorage.setItem('ordo_tt_state', st); } catch (e) {}
    return 'https://www.tiktok.com/v2/auth/authorize/?' + [
      'client_key=' + encodeURIComponent(CLIENT_KEY),
      'scope=' + encodeURIComponent(SCOPES),
      'response_type=code',
      'redirect_uri=' + encodeURIComponent(REDIRECT_URI),
      'state=' + st
    ].join('&');
  }
  function bindConnect() {
    document.querySelectorAll('[data-connect]').forEach(function (a) {
      a.setAttribute('href', 'https://www.tiktok.com/v2/auth/authorize/');
      a.addEventListener('click', function (e) { e.preventDefault(); location.href = authorizeUrl(); });
    });
  }

  /* ---------- main page ---------- */
  function initMain() {
    local('/tiktok/health').then(function (h) {
      $('localDot').className = 'dot ok'; $('localTxt').setAttribute('data-i', 'local_ok'); $('localTxt').innerHTML = t('local_ok');
      return local('/tiktok/accounts');
    }).then(function (j) {
      var accs = j.accounts || [];
      if (!accs.length) { $('needConnect').classList.remove('hidden'); return; }
      var want = new URLSearchParams(location.search).get('open_id');
      var acc = accs.filter(function (a) { return a.open_id === want; })[0] || accs[accs.length - 1];
      state.account = acc;
      $('connected').classList.remove('hidden');
      loadAccount(); loadCreator(); loadQueue(); loadList();
      if (location.hash === '#publish') setTimeout(function () { $('publishCard').scrollIntoView({ behavior: 'smooth' }); }, 400);
    }).catch(function () {
      $('localDot').className = 'dot err'; $('localTxt').setAttribute('data-i', 'local_off'); $('localTxt').innerHTML = t('local_off');
      $('needConnect').classList.remove('hidden');
    });
  }

  function loadAccount() {
    local('/tiktok/me?open_id=' + encodeURIComponent(state.account.open_id)).then(function (j) {
      var u = j.user || {};
      $('accAvatar').src = u.avatar_url || '';
      $('accName').textContent = u.display_name || '';
      $('accHandle').textContent = u.username ? '@' + u.username : '';
      $('stFollowers').textContent = fmt(u.follower_count);
      $('stFollowing').textContent = fmt(u.following_count);
      $('stLikes').textContent = fmt(u.likes_count);
      $('stVideos').textContent = fmt(u.video_count);
      if (u.profile_deep_link) { $('accLink').href = u.profile_deep_link; $('accLink').classList.remove('hidden'); }
    }).catch(function (e) { msg($('accMsg'), 'err', esc(e.message)); });
  }

  function loadCreator() {
    local('/tiktok/creator_info?open_id=' + encodeURIComponent(state.account.open_id)).then(function (j) {
      state.creator = j.creator || {}; renderCreator(); validate();
    }).catch(function (e) {
      state.creator = null; msg($('pubMsg'), 'err', esc(t('cant_post')) + '<br><small>' + esc(e.message) + '</small>');
      $('publishBtn').disabled = true;
    });
  }

  var PRIV = {
    PUBLIC_TO_EVERYONE: { en: 'Everyone', ru: 'Все' },
    MUTUAL_FOLLOW_FRIENDS: { en: 'Friends', ru: 'Друзья' },
    FOLLOWER_OF_CREATOR: { en: 'Followers', ru: 'Подписчики' },
    SELF_ONLY: { en: 'Only me', ru: 'Только я' }
  };
  function renderCreator() {
    var c = state.creator || {};
    $('crAvatar').src = c.creator_avatar_url || '';
    $('crName').textContent = (c.creator_nickname || '') + (c.creator_username ? '  @' + c.creator_username : '');
    var sel = $('privacy'), cur = sel.value;
    sel.innerHTML = '<option value="" disabled' + (cur ? '' : ' selected') + '>' + esc(t('privacy_ph')) + '</option>';
    (c.privacy_level_options || []).forEach(function (o) {
      var op = document.createElement('option');
      op.value = o; op.textContent = (PRIV[o] && PRIV[o][lang]) || o;
      if (o === 'SELF_ONLY' && $('discBranded').checked) { op.disabled = true; }
      if (o === cur) op.selected = true;
      sel.appendChild(op);
    });
    [['comment', 'comment_disabled'], ['duet', 'duet_disabled'], ['stitch', 'stitch_disabled']].forEach(function (p) {
      var box = $('allow_' + p[0]);
      box.disabled = !!c[p[1]]; if (c[p[1]]) box.checked = false;
      box.parentNode.classList.toggle('dis', !!c[p[1]]);
    });
    $('maxDur').textContent = c.max_video_post_duration_sec ? ' · max ' + c.max_video_post_duration_sec + ' ' + t('sec') : '';
  }

  function loadQueue() {
    local('/tiktok/videos').then(function (j) {
      state.videos = j.videos || [];
      var q = $('queue'); q.innerHTML = '';
      if (!state.videos.length) { q.innerHTML = '<p class="empty" data-i="no_queue">' + esc(t('no_queue')) + '</p>'; return; }
      state.videos.forEach(function (v, i) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'qitem';
        b.innerHTML = '🎬 ' + esc(v.name) + '<small>' + (v.duration ? v.duration + ' ' + t('sec') + ' · ' : '') + (v.size / 1048576).toFixed(1) + ' MB</small>';
        b.addEventListener('click', function () { pickVideo(i, b); });
        q.appendChild(b);
        if (i === 0) pickVideo(0, b);
      });
    }).catch(function (e) { $('queue').innerHTML = '<p class="empty">' + esc(e.message) + '</p>'; });
  }
  function pickVideo(i, btn) {
    document.querySelectorAll('.qitem').forEach(function (x) { x.classList.remove('on'); });
    btn.classList.add('on');
    var v = state.videos[i]; state.file = v;
    $('preview').innerHTML = '<video src="' + esc(v.url) + '" controls playsinline muted preload="metadata"></video>';
    if (!$('caption').value && v.caption) { $('caption').value = v.caption.slice(0, 2200); }
    countCaption(); validate();
  }

  function countCaption() { $('capCount').textContent = $('caption').value.length + ' / 2200'; }

  function updateAgree() {
    var el = $('agree'); if (!el) return;
    el.innerHTML = $('discBranded') && $('discBranded').checked ? t('agree_b') : t('agree');
  }

  function validate() {
    var ok = true, warn = '';
    var c = state.creator;
    if (!c || !state.file || !$('privacy').value) ok = false;
    if ($('discToggle').checked && !$('discYour').checked && !$('discBranded').checked) { ok = false; warn = t('need_one'); }
    if ($('discBranded').checked && $('privacy').value === 'SELF_ONLY') { ok = false; warn = t('branded_private'); }
    if (c && state.file && c.max_video_post_duration_sec && state.file.duration > c.max_video_post_duration_sec) {
      ok = false; warn = t('too_long') + ' (' + c.max_video_post_duration_sec + ' ' + t('sec') + ').';
    }
    $('discWarn').textContent = warn; $('discWarn').classList.toggle('hidden', !warn);
    $('publishBtn').disabled = !ok;
    return ok;
  }

  function bindPublish() {
    $('caption').addEventListener('input', function () { countCaption(); });
    $('privacy').addEventListener('change', validate);
    $('discToggle').addEventListener('change', function () {
      $('discOpts').classList.toggle('hidden', !this.checked);
      if (!this.checked) { $('discYour').checked = false; $('discBranded').checked = false; renderCreator(); updateAgree(); }
      validate();
    });
    $('discYour').addEventListener('change', validate);
    $('discBranded').addEventListener('change', function () { renderCreator(); updateAgree(); validate(); });
    $('publishBtn').addEventListener('click', doPublish);
  }

  function doPublish() {
    if (!validate()) return;
    var btn = $('publishBtn'); btn.disabled = true;
    var box = $('pubMsg');
    msg(box, 'wait', '⏳ ' + esc(t('publishing')));
    local('/tiktok/publish', {
      method: 'POST', body: {
        open_id: state.account.open_id, file: state.file.name, caption: $('caption').value,
        privacy_level: $('privacy').value,
        disable_comment: !$('allow_comment').checked, disable_duet: !$('allow_duet').checked, disable_stitch: !$('allow_stitch').checked,
        brand_content_toggle: $('discBranded').checked, brand_organic_toggle: $('discYour').checked
      }
    }).then(function (j) {
      msg(box, 'wait', '⏳ ' + esc(t('after')) + '<br><small>publish_id: ' + esc(j.publish_id) + '</small>');
      poll(j.publish_id, 0);
    }).catch(function (e) { msg(box, 'err', '✕ ' + esc(e.message)); btn.disabled = false; });
  }

  function poll(pid, n) {
    local('/tiktok/status?open_id=' + encodeURIComponent(state.account.open_id) + '&publish_id=' + encodeURIComponent(pid)).then(function (j) {
      var s = j.status || {}, st = s.status || 'PROCESSING_UPLOAD', box = $('pubMsg');
      if (st === 'PUBLISH_COMPLETE' || st === 'SEND_TO_USER_INBOX') {
        msg(box, 'ok', '✓ ' + esc(t('st_' + st)) + '<br><small>publish_id: ' + esc(pid) + '</small>');
        setTimeout(loadList, 4000); setTimeout(loadAccount, 4000);
        $('publishBtn').disabled = false;
      } else if (st === 'FAILED') {
        msg(box, 'err', '✕ ' + esc(t('st_FAILED')) + ': ' + esc(s.fail_reason || ''));
        $('publishBtn').disabled = false;
      } else {
        msg(box, 'wait', '⏳ ' + esc(t('st_' + st) || st) + '<br><small>publish_id: ' + esc(pid) + '</small>');
        if (n < 90) setTimeout(function () { poll(pid, n + 1); }, 4000);
      }
    }).catch(function (e) { msg($('pubMsg'), 'err', esc(e.message)); $('publishBtn').disabled = false; });
  }

  function loadList() {
    local('/tiktok/list?open_id=' + encodeURIComponent(state.account.open_id)).then(function (j) {
      state.list = (j.list && j.list.videos) || []; renderList(state.list);
    }).catch(function (e) { $('videoList').innerHTML = '<p class="empty">' + esc(e.message) + '</p>'; });
  }
  function renderList(vs) {
    var box = $('videoList');
    if (!vs.length) { box.innerHTML = '<p class="empty">' + esc(t('no_list')) + '</p>'; return; }
    box.innerHTML = vs.map(function (v) {
      var d = v.create_time ? new Date(v.create_time * 1000).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-GB') : '';
      return '<a class="vid" href="' + esc(v.share_url) + '" target="_blank" rel="noopener"><img src="' + esc(v.cover_image_url) + '" alt="" loading="lazy">' +
        '<div><div class="t">' + esc(v.title || v.video_description || '') + '</div><div class="m">' + fmt(v.view_count) + ' ' + esc(t('views')) + ' · ♥ ' + fmt(v.like_count) + (d ? ' · ' + d : '') + '</div></div></a>';
    }).join('');
  }

  /* ---------- callback page ---------- */
  function initCallback() {
    var p = new URLSearchParams(location.search);
    var code = p.get('code'), st = p.get('state'), err = p.get('error');
    var saved = null;
    try { saved = sessionStorage.getItem('ordo_tt_state') || localStorage.getItem('ordo_tt_state'); } catch (e) {}
    function fail(text) {
      $('cbIcon').textContent = '!'; $('cbIcon').style.background = '#c8412f';
      $('cbTitle').setAttribute('data-i', 'cb_err'); $('cbTitle').innerHTML = t('cb_err');
      $('cbText').removeAttribute('data-i'); $('cbText').textContent = text;
      $('cbBack').classList.remove('hidden');
    }
    if (err) return fail(t('cb_denied') + ' (' + err + (p.get('error_description') ? ': ' + p.get('error_description') : '') + ')');
    if (!code) return fail('No authorization code in the URL.');
    if (!saved || saved !== st) return fail(t('cb_state'));
    try { sessionStorage.removeItem('ordo_tt_state'); localStorage.removeItem('ordo_tt_state'); } catch (e) {}
    history.replaceState(null, '', location.pathname);
    local('/tiktok/exchange', { method: 'POST', body: { code: code, state: st, redirect_uri: REDIRECT_URI } }).then(function (j) {
      var u = j.user || {};
      $('cbIcon').textContent = '✓';
      $('cbTitle').setAttribute('data-i', 'cb_ok'); $('cbTitle').innerHTML = t('cb_ok');
      $('cbText').setAttribute('data-i', 'cb_ok_p'); $('cbText').innerHTML = t('cb_ok_p');
      if (u.display_name || u.username) {
        $('cbAcc').classList.remove('hidden');
        $('cbAvatar').src = u.avatar_url || '';
        $('cbName').textContent = u.display_name || '';
        $('cbHandle').textContent = u.username ? '@' + u.username : '';
      }
      var next = '/tiktok/?open_id=' + encodeURIComponent(j.open_id) + '#publish';
      $('cbGo').href = next; $('cbGo').classList.remove('hidden');
      setTimeout(function () { location.href = next; }, 3500);
    }).catch(function (e) { fail(e.message + ' — ' + t('local_off')); });
  }

  /* ---------- boot ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () { lang = b.dataset.l; try { localStorage.setItem('ordo_tt_lang', lang); } catch (e) {} applyLang(); });
    });
    bindConnect();
    var page = document.body.getAttribute('data-page');
    if (page === 'main') { bindPublish(); initMain(); }
    if (page === 'callback') initCallback();
    applyLang();
  });
})();
