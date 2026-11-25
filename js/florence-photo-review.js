/* Florence itinerary photo supplement: local, credited Commons photographs only.
 * Add this script after the planner scripts; it inserts itself after the last
 * visible Florence day card and follows the site's four-language selector. */
(function () {
  'use strict';

  var GALLERY_ID = 'florence-photo-review-gallery';
  var LANGS = ['ko', 'en', 'ja', 'zh'];
  var CITY_NAMES = ['피렌체', 'Florence', 'フィレンツェ', '佛罗伦萨'];
  var SOURCE = {
    uffizi: {
      file: 'https://commons.wikimedia.org/wiki/File:Firenze_Galleria_degli_Uffizi_Esterno_3.jpg',
      license: 'https://creativecommons.org/licenses/by/4.0/',
      licenseName: 'CC BY 4.0',
      author: 'Zairon',
      image: 'img/florence-review/uffizi-exterior.webp',
      width: 1280,
      height: 961,
      alt: {
        ko: '낮에 촬영한 우피치 미술관 아르노강변 외관',
        en: 'The Uffizi Gallery’s Arno-side exterior photographed in daylight',
        ja: '昼に撮影されたウフィツィ美術館のアルノ川側の外観',
        zh: '白天拍摄的乌菲兹美术馆阿尔诺河畔外观'
      },
      caption: {
        ko: '우피치 미술관 외관 · 낮 사진',
        en: 'Uffizi Gallery exterior · daytime photograph',
        ja: 'ウフィツィ美術館の外観 · 昼の写真',
        zh: '乌菲兹美术馆外观 · 白天实景'
      }
    },
    ponte: {
      file: 'https://commons.wikimedia.org/wiki/File:Ponte_Vecchio.jpg',
      license: 'https://creativecommons.org/licenses/by/3.0/',
      licenseName: 'CC BY 3.0',
      author: 'Marius Fiskum (Mfiskum)',
      image: 'img/florence-review/ponte-vecchio-night.webp',
      width: 600,
      height: 400,
      alt: {
        ko: '밤에 조명이 비치는 베키오 다리와 아르노강 반영',
        en: 'Ponte Vecchio illuminated at night with reflections on the Arno',
        ja: '夜にライトアップされたヴェッキオ橋とアルノ川の水面の反射',
        zh: '夜色中灯火映照的老桥及阿尔诺河倒影'
      },
      caption: {
        ko: '베키오 다리 · 야간 사진',
        en: 'Ponte Vecchio · nighttime photograph',
        ja: 'ヴェッキオ橋 · 夜の写真',
        zh: '老桥 · 夜景实拍'
      }
    },
    duomo: {
      file: 'https://commons.wikimedia.org/wiki/File:Florence_Duomo_from_Michelangelo_hill.jpg',
      license: 'https://creativecommons.org/licenses/by-sa/4.0/',
      licenseName: 'CC BY-SA 4.0',
      author: 'Petar Milošević',
      image: 'img/florence-review/duomo-from-piazzale-michelangelo-night.webp',
      width: 1500,
      height: 1088,
      alt: {
        ko: '밤의 미켈란젤로 광장에서 바라본 조명 켜진 피렌체 두오모',
        en: 'The illuminated Florence Duomo at night, seen from Piazzale Michelangelo',
        ja: '夜のミケランジェロ広場から望むライトアップされたフィレンツェのドゥオーモ',
        zh: '夜间从米开朗基罗广场眺望灯光映照下的佛罗伦萨主教座堂'
      },
      caption: {
        ko: '미켈란젤로 광장의 두오모 전망 · 야간 사진',
        en: 'Duomo panorama from Piazzale Michelangelo · nighttime photograph',
        ja: 'ミケランジェロ広場から望むドゥオーモ · 夜の写真',
        zh: '米开朗基罗广场眺望主教座堂 · 夜景实拍'
      }
    }
  };

  var TEXT = {
    ko: {
      title: '사진으로 미리 보는 피렌체',
      intro: '4일 일정에 나오는 실제 장소의 사진입니다. 낮과 밤 촬영 장면을 캡션에 구분해 표시했습니다.',
      source: 'Wikimedia Commons 파일',
      license: '라이선스',
      credit: function (photo) {
        var changed = photo.author === 'Petar Milošević'
          ? '변경: 1500×1088로 축소하고 WebP 변환 · 원본과 개작물 모두 CC BY-SA 4.0'
          : (photo.author === 'Marius Fiskum (Mfiskum)' ? '변경: 크기는 유지하고 WebP로 변환' : '변경: 웹용으로 축소하고 WebP로 변환');
        return '사진: ' + photo.author + ' · ' + changed;
      }
    },
    en: {
      title: 'Florence in photographs',
      intro: 'Real photographs of places on this four-day itinerary. Captions distinguish daytime and nighttime scenes.',
      source: 'Wikimedia Commons file',
      license: 'License',
      credit: function (photo) {
        var changed = photo.author === 'Petar Milošević'
          ? 'Changes: downscaled to 1500×1088 and converted to WebP · original and adaptation remain CC BY-SA 4.0'
          : (photo.author === 'Marius Fiskum (Mfiskum)' ? 'Changes: converted to WebP; dimensions unchanged' : 'Changes: resized for web and converted to WebP');
        return 'Photo: ' + photo.author + ' · ' + changed;
      }
    },
    ja: {
      title: '写真で見るフィレンツェ',
      intro: '4日間の行程に登場する実在の場所の写真です。昼と夜の撮影シーンをキャプションで明記しています。',
      source: 'Wikimedia Commonsのファイル',
      license: 'ライセンス',
      credit: function (photo) {
        var changed = photo.author === 'Petar Milošević'
          ? '変更：1500×1088に縮小しWebPに変換 · 原作品・改変版ともCC BY-SA 4.0'
          : (photo.author === 'Marius Fiskum (Mfiskum)' ? '変更：サイズを維持してWebPに変換' : '変更：ウェブ用に縮小しWebPに変換');
        return '写真：' + photo.author + ' · ' + changed;
      }
    },
    zh: {
      title: '照片中的佛罗伦萨',
      intro: '以下为四日行程涉及地点的实景照片；图注会注明白天或夜间拍摄。',
      source: 'Wikimedia Commons 文件页',
      license: '许可协议',
      credit: function (photo) {
        var changed = photo.author === 'Petar Milošević'
          ? '修改：缩小至 1500×1088 并转为 WebP · 原作及改编版本均采用 CC BY-SA 4.0'
          : (photo.author === 'Marius Fiskum (Mfiskum)' ? '修改：保持原尺寸，仅转换为 WebP' : '修改：为网页缩小尺寸并转为 WebP');
        return '摄影：' + photo.author + ' · ' + changed;
      }
    }
  };

  function language() {
    var selected = window.currentLang || document.documentElement.lang;
    if (!selected) {
      try { selected = localStorage.getItem('travel_user_lang'); } catch (e) { /* private mode */ }
    }
    return LANGS.indexOf(selected) >= 0 ? selected : 'ko';
  }

  function renderMarkup(lang) {
    var labels = TEXT[lang] || TEXT.ko;
    var cards = Object.keys(SOURCE).map(function (key) {
      var photo = SOURCE[key];
      return '<figure class="fpr-photo-card">' +
        '<img src="' + photo.image + '" alt="' + photo.alt[lang] + '" width="' + photo.width + '" height="' + photo.height + '" loading="lazy" decoding="async">' +
        '<figcaption>' +
          '<strong class="fpr-photo-caption">' + photo.caption[lang] + '</strong>' +
          '<span class="fpr-photo-credit">' + labels.credit(photo) + '</span>' +
          '<span class="fpr-photo-links"><a href="' + photo.file + '" target="_blank" rel="noopener noreferrer">' + labels.source + '</a>' +
          '<span aria-hidden="true"> · </span><a href="' + photo.license + '" target="_blank" rel="noopener noreferrer">' + labels.license + ': ' + photo.licenseName + '</a></span>' +
        '</figcaption>' +
      '</figure>';
    }).join('');
    return '<div class="fpr-gallery-heading"><div><h3>' + labels.title + '</h3><p>' + labels.intro + '</p></div></div>' +
      '<div class="fpr-photo-grid">' + cards + '</div>';
  }

  function isFlorenceCard(card) {
    var city = card.querySelector('.city-tag');
    if (!city) return false;
    var label = city.textContent || '';
    return CITY_NAMES.some(function (name) { return label.indexOf(name) !== -1; });
  }

  function getGallery() {
    var gallery = document.getElementById(GALLERY_ID);
    if (gallery) return gallery;
    gallery = document.createElement('section');
    gallery.id = GALLERY_ID;
    gallery.className = 'florence-photo-review';
    gallery.setAttribute('aria-label', TEXT.ko.title);
    return gallery;
  }

  var lastRenderedLang = '';
  var scheduled = false;
  function updateGallery() {
    scheduled = false;
    var grids = Array.prototype.slice.call(document.querySelectorAll('#timelineGrid1, #timelineGrid2, #timelineGrid3'));
    var cards = [];
    grids.forEach(function (grid) {
      Array.prototype.forEach.call(grid.querySelectorAll('.day-card'), function (card) {
        if (isFlorenceCard(card)) cards.push(card);
      });
    });
    var existing = document.getElementById(GALLERY_ID);
    if (!cards.length) {
      if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
      lastRenderedLang = '';
      return;
    }

    var lastCard = cards[cards.length - 1];
    var gallery = getGallery();
    var lang = language();
    if (lastRenderedLang !== lang || !gallery.firstChild) {
      gallery.innerHTML = renderMarkup(lang);
      gallery.setAttribute('aria-label', TEXT[lang].title);
      lastRenderedLang = lang;
    }
    if (gallery.parentElement !== lastCard.parentElement || gallery.previousElementSibling !== lastCard) {
      lastCard.insertAdjacentElement('afterend', gallery);
    }
  }

  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateGallery);
  }

  function init() {
    var grids = document.querySelectorAll('#timelineGrid1, #timelineGrid2, #timelineGrid3');
    if (!grids.length) return;
    var observer = new MutationObserver(scheduleUpdate);
    Array.prototype.forEach.call(grids, function (grid) {
      observer.observe(grid, { childList: true, subtree: true });
    });
    var languageObserver = new MutationObserver(scheduleUpdate);
    languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    updateGallery();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}());
