# Зелёный спектр — журнал профиля «Зелёная химия»

Цифровой журнал профиля «Зелёная химия» (образовательная смена «Индустрия будущего»,
творческая мастерская «Преломление»). Вёрстка — HTML/CSS, на выходе PDF формата A4.

## Структура

- `journal/index.html` — вёрстка всех 9 страниц (обложка, мастерская, о профиле,
  традиции и факты, фотогалерея, самоуправление, календарь, задняя обложка).
- `journal/assets/fonts/` — шрифты Unbounded, Onest, JetBrains Mono, Cormorant Garamond (OFL).
- `journal/assets/img/logo.webp` — эмблема профиля.
- `journal/data/people.example.js` — шаблон данных участников.
- `scripts/render.js`, `scripts/build.sh` — рендер страниц через Playwright и сборка PDF (img2pdf).

## Личные данные

Фото и имена участников в репозиторий не входят: `journal/data/people.js`
и `journal/assets/img/people/` перечислены в `.gitignore`. Без них журнал собирается
с данными-заглушками из `people.example.js`.

## Сборка

```bash
pip install img2pdf          # Playwright с Chromium должен быть установлен
./scripts/build.sh           # → «Зелёный спектр — журнал профиля «Зелёная химия».pdf»
```
