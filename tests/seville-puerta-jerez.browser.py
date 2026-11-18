#!/usr/bin/env python3
"""Review-only browser checks and PC/mobile previews for the Seville addition.

Run from the repository root with a local HTTP server on port 4298:
  python3 -m http.server 4298 --bind 127.0.0.1
  python3 tests/seville-puerta-jerez.browser.py
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json
import os
import sys

ROOT = Path(__file__).resolve().parents[1]
OUT = Path(os.environ.get('PREVIEW_DIR', ROOT / 'preview'))
OUT.mkdir(parents=True, exist_ok=True)
URL = os.environ.get('PREVIEW_URL', 'http://127.0.0.1:4298/')
LANGUAGES = {
    'ko': {
        'heading': '푸에르타 데 헤레스와 헌법 대로의 장소 안내',
        'plaza': '푸에르타 데 헤레스 광장',
        'avenue': '헌법 대로',
        'plaza_query': '히스팔리스 분수',
        'avenue_query': '헌법 대로',
    },
    'en': {
        'heading': 'Puerta de Jerez and Avenida de la Constitución',
        'plaza': 'Puerta de Jerez',
        'avenue': 'Avenida de la Constitución',
        'plaza_query': 'Fuente de Híspalis',
        'avenue_query': 'Avenida de la Constitución',
    },
    'ja': {
        'heading': 'ヘレス門広場とコンスティトゥシオン大通り',
        'plaza': 'ヘレス門広場',
        'avenue': 'コンスティトゥシオン大通り',
        'plaza_query': 'ヒスパリスの噴水',
        'avenue_query': 'コンスティトゥシオン大通り',
    },
    'zh': {
        'heading': '赫雷斯门广场与宪法大道',
        'plaza': '赫雷斯门广场',
        'avenue': '宪法大道',
        'plaza_query': '希斯帕利斯喷泉',
        'avenue_query': '宪法大道',
    },
}

with sync_playwright() as p:
    launch_options = {'headless': True, 'args': ['--no-sandbox']}
    chromium_path = os.environ.get('CHROMIUM_PATH', '/usr/bin/chromium')
    if Path(chromium_path).exists():
        launch_options['executable_path'] = chromium_path
    browser = p.chromium.launch(**launch_options)
    results = []
    for label, viewport in [('desktop', {'width': 1440, 'height': 1000}), ('mobile', {'width': 390, 'height': 844})]:
        context = browser.new_context(viewport=viewport, device_scale_factor=1, service_workers='block')
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        response = page.goto(URL, wait_until='domcontentloaded', timeout=90000)
        assert response and response.status == 200
        page.wait_for_function("() => typeof window.buildSevilleGeneralChatResponse === 'function'", timeout=60000)
        page.evaluate("switchGuidebookChapter('chapter-guide', false); goToBookPage('chapter-guide', 1, false); renderSeniorDistrictRoutes('ko');")
        page.locator('#sg-puerta-jerez-review').wait_for(state='attached', timeout=60000)

        for language, markers in LANGUAGES.items():
            page.evaluate('(l) => switchLanguage(l, document.getElementById("btnLang" + l[0].toUpperCase() + l.slice(1)))', language)
            page.wait_for_timeout(200)
            section = page.locator('#sg-puerta-jerez-review')
            assert section.get_attribute('lang') == language
            assert section.locator('details').count() == 2
            assert markers['heading'] in section.locator('h2').inner_text()
            plaza = section.locator('#sg-puerta-jerez-plaza')
            avenue = section.locator('#sg-avenida-architecture-review')
            assert markers['plaza'] in plaza.locator('summary').inner_text()
            assert markers['avenue'] in avenue.locator('summary').inner_text()
            plaza.evaluate('(element) => { element.open = true; }')
            avenue.evaluate('(element) => { element.open = true; }')
            assert plaza.locator('a').count() == 7
            assert avenue.locator('a').count() == 6
            assert all(link.inner_text().strip() not in ('', 'undefined') for link in plaza.locator('a').all() + avenue.locator('a').all())
            assert all(link.get_attribute('href').startswith('https://') for link in plaza.locator('a').all() + avenue.locator('a').all())
            assert plaza.locator('img').get_attribute('src').endswith('puerta-jerez-fuente-hispalis-20261118.webp')
            assert avenue.locator('img').get_attribute('src').endswith('avenida-constitucion-puerta-jerez-20261118.webp')

            for image in section.locator('img').all():
                image.scroll_into_view_if_needed(timeout=30000)
                image_src = image.get_attribute('src')
                page.wait_for_function('(src) => Array.from(document.images).some(img => img.getAttribute("src") === src && img.complete && img.naturalWidth > 0)', arg=image_src, timeout=30000)

            chat = page.evaluate('([q1,q2,l]) => [window.buildSevilleGeneralChatResponse(q1,l), window.buildSevilleGeneralChatResponse(q2,l)]',
                                 [markers['plaza_query'], markers['avenue_query'], language])
            assert all(text and 'https://' in text for text in chat)
            assert markers['plaza'] in chat[0]
            assert markers['avenue'] in chat[1]
            route_query = 'How do I get to Puerta de Jerez tomorrow?' if language == 'en' else '푸에르타 데 헤레스 어떻게 가'
            assert page.evaluate('(q) => window.buildSevilleGeneralChatResponse(q,"en")', route_query) is None

            results.append({'viewport': label, 'language': language, 'two_cards': 'PASS', 'photo_mapping': 'PASS',
                            'source_links': 'PASS', 'chatbot': 'PASS', 'route_fallback': 'PASS'})

        page.evaluate('(l) => switchLanguage(l, document.getElementById("btnLangKo"))', 'ko')
        section = page.locator('#sg-puerta-jerez-review')
        for card in section.locator('details').all():
            card.evaluate('(element) => { element.open = true; }')
        section.scroll_into_view_if_needed(timeout=30000)
        min_width = 700 if label == 'desktop' else 300
        assert section.evaluate('(element) => element.getBoundingClientRect().width') >= min_width
        page.wait_for_timeout(400)
        page.evaluate("() => Array.from(document.querySelectorAll('body *')).filter(element => ['fixed', 'sticky'].includes(getComputedStyle(element).position)).forEach(element => element.style.setProperty('visibility', 'hidden', 'important'))")
        section.screenshot(path=str(OUT / f'{label}-preview.png'), animations='disabled', timeout=60000)
        if errors:
            raise AssertionError(f'Browser errors on {label}: {errors}')
        context.close()

    browser.close()

print(json.dumps(results, ensure_ascii=False, indent=2))
print('Preview directory:', OUT, file=sys.stderr)
