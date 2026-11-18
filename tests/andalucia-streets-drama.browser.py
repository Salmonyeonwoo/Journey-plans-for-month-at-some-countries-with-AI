#!/usr/bin/env python3
"""Browser integration checks against a locally served, uncommitted review clone.

Run: python3 -m http.server 4189 --bind 127.0.0.1
     python3 tests/andalucia-streets-drama.browser.py
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json

OUT = Path('/workspace/andalucia-locations-previews-20261118')
OUT.mkdir(parents=True, exist_ok=True)
URL = 'http://127.0.0.1:4189/'
MARKERS = {
    'ko': ['헌법 대로와 거리 풍경', '검증된 촬영지', '알카사비야 거리'],
    'en': ['the street and its landmarks', 'verified Granada filming locations', 'Calle Alcazabilla'],
    'ja': ['コンスティトゥシオン大通りと街並み', '検証済み撮影地', 'アルカサビリャ通り'],
    'zh': ['宪法大道与街景', '核实过的拍摄地', '阿尔卡萨比亚街'],
}
LOCATIONS = ['Calle Correo Viejo', 'Calle Calderería Nueva', 'Mirador de San Miguel Alto', 'Puente Espinosa', 'Colegio Ave María', 'Fuente de las Granadas']
QUERIES = {
    'ko': ['헌법 대로', '알함브라 궁전의 추억', '알카사비야 거리'],
    'en': ['Avenida de la Constitución', 'Memories of the Alhambra', 'Calle Alcazabilla'],
    'ja': ['コンスティトゥシオン大通り', 'アルハンブラ宮殿の思い出', 'アルカサビリャ通り'],
    'zh': ['宪法大道', '阿尔罕布拉宫的回忆', '阿尔卡萨比亚街'],
}
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
    results = []
    for label, viewport in [('desktop', {'width': 1440, 'height': 1000}), ('mobile', {'width': 390, 'height': 844})]:
        context = browser.new_context(viewport=viewport, device_scale_factor=1, service_workers='block')
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        response = page.goto(URL, wait_until='domcontentloaded', timeout=90000)
        assert response.status == 200
        page.wait_for_function("() => !!document.querySelector('#mainHeader button') && !!document.querySelector('#granada-malaga-general-guide')", timeout=60000)
        page.evaluate("switchGuidebookChapter('chapter-guide', false); goToBookPage('chapter-guide', 1, false); renderSeniorDistrictRoutes('ko');")
        page.locator('#sg-avenida-constitucion').wait_for(state='visible', timeout=30000)
        for language, markers in MARKERS.items():
            page.evaluate('(l) => switchLanguage(l, document.getElementById("btnLang" + l[0].toUpperCase() + l.slice(1)))', language)
            page.wait_for_timeout(150)
            avenue = page.locator('#sg-avenida-constitucion')
            drama = page.locator('#gm-memories-alhambra')
            malaga = page.locator('#gm-guide-romanRoute')
            for loc in [avenue, drama, malaga]:
                assert loc.count() == 1
                loc.locator('summary').click()
            assert markers[0] in avenue.inner_text()
            assert markers[1] in drama.inner_text()
            assert markers[2] in malaga.inner_text()
            assert all(place in drama.inner_text() for place in LOCATIONS)
            assert len(avenue.locator('a').all()) >= 10 and len(drama.locator('a').all()) >= 4
            assert all(link.inner_text().strip() not in ('', 'undefined') for link in avenue.locator('a').all() + drama.locator('a').all())
            assert avenue.locator('img').count() == 1 and malaga.locator('img').count() == 0
            assert avenue.locator('img').evaluate('(x) => x.complete && x.naturalWidth > 0')
            chat = page.evaluate('([a,b,c,l]) => [handleLocalChat(a),handleLocalChat(b),handleLocalChat(c),window.buildSevilleGeneralChatResponse("taxi route to Avenida de la Constitución",l),window.buildGranadaMalagaGeneralChatResponse("hotel booking Memories of the Alhambra",l)]', [*QUERIES[language], language])
            assert all(str(text) and marker.lower() in str(text).lower() for text, marker in zip(chat[:3], markers)), (language, chat)
            assert chat[3] is None and chat[4] is None, (language, chat)
            assert page.evaluate('() => window.buildSevilleGeneralChatResponse("헌법 대로 어떻게 가", "ko")') is None
            if language == 'ko':
                for name, element in [('seville', avenue), ('drama', drama), ('malaga', malaga)]:
                    element.scroll_into_view_if_needed(timeout=30000)
                    page.wait_for_timeout(100)
                    element.screenshot(path=str(OUT / f'{label}-{name}-full.png'), animations='disabled', timeout=60000)
                    element.evaluate('(el) => { el.scrollIntoView({block: "start"}); window.scrollBy(0, -200); }')
                    page.wait_for_timeout(150)
                    page.screenshot(path=str(OUT / f'{label}-{name}-screen.png'), animations='disabled', timeout=60000)
            results.append({'viewport': label, 'language': language, 'three_cards': 'PASS', 'six_locations': 'PASS', 'three_chat_routes': 'PASS', 'plan_fallback': 'PASS', 'seville_photo_only': 'PASS'})
        if errors:
            raise AssertionError(f'Browser errors: {errors}')
        context.close()
    browser.close()
    print(json.dumps(results, ensure_ascii=False, indent=2))
    print('Preview directory:', OUT)
