#!/usr/bin/env python3
"""Review-only browser checks and PC/mobile previews for the cathedral guide.

Run from the repository root with a local HTTP server on port 4299:
  python3 -m http.server 4299 --bind 127.0.0.1
  python3 tests/seville-cathedral-photo-guide.browser.py
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json
import os
import sys

ROOT = Path(__file__).resolve().parents[1]
OUT = Path(os.environ.get('PREVIEW_DIR', ROOT.parent / 'previews'))
OUT.mkdir(parents=True, exist_ok=True)
URL = os.environ.get('PREVIEW_URL', 'http://127.0.0.1:4299/')
LANGUAGES = {
    'ko': {
        'heading': '세비야 대성당과 주변 예술 공간',
        'history': '모스크의 터에서 고딕 대성당으로',
        'interior': '주 제단화와 대성당의 주요 조각',
        'chapels': '성작 성구실과 고통의 성모 예배당',
        'ante': '안테카빌도: 참사회실 앞의 르네상스 공간',
        'queries': ['세비야 대성당 역사', '콜럼버스 묘', '고통의 성모 예배당', '안테카빌도'],
    },
    'en': {
        'heading': 'Seville Cathedral and its surrounding art spaces',
        'history': 'From mosque precinct to Gothic cathedral',
        'interior': 'The main altarpiece and major works inside',
        'chapels': 'The Chalice Sacristy and Chapel of Our Lady of Sorrows',
        'ante': 'The Antecabildo: Renaissance anteroom to the Chapter House',
        'queries': ['Giralda', 'main altarpiece', 'Goya and sacristy', 'Antecabildo'],
    },
    'ja': {
        'heading': 'セビリア大聖堂と周辺の美術空間',
        'history': 'モスク跡からゴシック大聖堂へ',
        'interior': '主祭壇衝立と大聖堂内の主な作品',
        'chapels': '聖杯の聖具室と悲しみの聖母礼拝堂',
        'ante': 'アンテカビルド：参事会室前のルネサンス空間',
        'queries': ['セビリア大聖堂', '主祭壇衝立', '悲しみの聖母礼拝堂', 'アンテカビルド'],
    },
    'zh': {
        'heading': '塞维利亚主教座堂及周边艺术空间',
        'history': '从清真寺旧址到哥特式主教座堂',
        'interior': '主祭坛屏与堂内重要作品',
        'chapels': '圣杯圣器室与苦难圣母小堂',
        'ante': '安特卡比尔多：议事厅前的文艺复兴空间',
        'queries': ['吉拉尔达塔', '哥伦布墓', '苦难圣母小堂', '安特卡比尔多'],
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
        page.locator('#sg-seville-cathedral-review').wait_for(state='attached', timeout=60000)

        for language, markers in LANGUAGES.items():
            page.evaluate('(l) => switchLanguage(l, document.getElementById("btnLang" + l[0].toUpperCase() + l.slice(1)))', language)
            page.wait_for_timeout(150)
            section = page.locator('#sg-seville-cathedral-review')
            assert section.get_attribute('lang') == language
            assert markers['heading'] in section.locator('h2').inner_text()
            details = section.locator('details.sg-cathedral-topic')
            assert details.count() == 4
            assert markers['history'] in details.nth(0).locator('summary').inner_text()
            assert markers['interior'] in details.nth(1).locator('summary').inner_text()
            assert markers['chapels'] in details.nth(2).locator('summary').inner_text()
            assert markers['ante'] in details.nth(3).locator('summary').inner_text()
            counts = [details.nth(i).locator('img').count() for i in range(4)]
            assert counts == [2, 2, 3, 10], f'{language} photo mapping: {counts}'
            links = section.locator('a').all()
            assert len(links) >= 20
            assert all(link.get_attribute('href').startswith('https://') for link in links)
            assert all(link.get_attribute('rel') == 'noopener noreferrer' for link in links)
            chat = page.evaluate('([qs,l]) => qs.map(q => window.buildSevilleGeneralChatResponse(q,l))', [markers['queries'], language])
            assert len(chat) == 4 and all(answer and 'https://' in answer for answer in chat)
            assert page.evaluate('([q,l]) => window.buildSevilleGeneralChatResponse(q,l)', ['How do I get to Seville Cathedral tomorrow?', language]) is None
            op_query = {
                'ko': '세비야 대성당 운영시간',
                'en': 'Seville Cathedral opening hours',
                'ja': 'セビリア大聖堂の開館時間',
                'zh': '塞维利亚主教座堂开放时间',
            }[language]
            assert page.evaluate('([q,l]) => window.buildSevilleGeneralChatResponse(q,l)', [op_query, language]) is None

            if language == 'ko':
                for topic in details.all():
                    topic.evaluate('(element) => { element.open = true; }')
                for image in section.locator('img').all():
                    image.scroll_into_view_if_needed(timeout=30000)
                    image_src = image.get_attribute('src')
                    page.wait_for_function('(src) => Array.from(document.images).some(img => img.getAttribute("src") === src && img.complete && img.naturalWidth > 0)', arg=image_src, timeout=30000)
                    assert image.get_attribute('alt').strip()
                assert section.locator('img').count() == 17
                for topic in details.all():
                    topic.evaluate('(element) => { element.open = false; }')
                details.nth(0).evaluate('(element) => { element.open = true; }')
                section.scroll_into_view_if_needed(timeout=30000)
                page.evaluate("() => Array.from(document.querySelectorAll('body *')).filter(element => ['fixed', 'sticky'].includes(getComputedStyle(element).position)).forEach(element => element.style.setProperty('visibility', 'hidden', 'important'))")
                page.evaluate("() => { const target = document.getElementById('sg-seville-cathedral-review'); window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY); }")
                page.wait_for_timeout(250)
                page.screenshot(path=str(OUT / f'{label}-preview.png'), animations='disabled', timeout=60000)
                # Separate gallery crop makes the ten-photo mobile/desktop grid easy to inspect.
                details.nth(3).evaluate('(element) => { element.open = true; }')
                gallery = details.nth(3).locator('.sg-cathedral-gallery')
                gallery.scroll_into_view_if_needed(timeout=30000)
                page.wait_for_timeout(250)
                gallery.screenshot(path=str(OUT / f'{label}-gallery-preview.png'), animations='disabled', timeout=60000)

            results.append({
                'viewport': label,
                'language': language,
                'four_topics': 'PASS',
                'photo_mapping': 'PASS',
                'source_links': 'PASS',
                'chatbot_aliases': 'PASS',
                'route_and_hours_fallback': 'PASS',
            })

        if errors:
            raise AssertionError(f'Browser errors on {label}: {errors}')
        context.close()
    browser.close()

print(json.dumps(results, ensure_ascii=False, indent=2))
print('Preview directory:', OUT, file=sys.stderr)
