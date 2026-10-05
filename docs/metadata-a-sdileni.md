# Metadata a náhledy odkazů

Společnou HTML hlavičku vytváří `src/_includes/layouts/base.njk`. Stránky používající tento layout obsahují pouze tělo dokumentu. Titulek, popis a seznam CSS souborů se nastavují ve front matter (`title`, `description`, `stylesheets`). Dílčí layouty mohou nastavit `layoutStylesheet`.

Doména, výchozí popis a fotografie pro sdílení jsou v `src/_data/site.json`. Canonical a `og:url` vznikají z domény a Eleventy `page.url`, takže každá stránka má vlastní URL. Metadata se generují přímo do HTML, bez JavaScriptu.

Náhled používá existující JPEG `/img/gallery/1.JPG` (1600 × 1070 px). Uvedené rozměry odpovídají souboru. Při výměně fotografie aktualizujte cestu, MIME typ, rozměry a alternativní text. Pro nový samostatný obrázek lze zvolit 1200 × 630 px; tento rozměr není podmínkou Open Graph.

## Kontrola po nasazení

- Ověřte konečnou doménu: konfigurace nyní používá `https://jindrichuvdum.cz`. Pokud hosting přesměrovává na `www`, upravte `site.url` na tuto variantu.
- Stránka i obrázek musí být veřejně dostupné přes HTTPS, bez přihlášení a blokování crawlerů. Ověřte HTTP 200 a `Content-Type: image/jpeg` pro obrázek.
- Ve zdrojovém HTML zkontrolujte jediný doctype, `html`, `head`, `body` a `title`; všechny meta tagy musí být v hlavičce.
- Vyzkoušejte nový odkaz ve WhatsAppu. Starší náhled může být uložený v cache; pro diagnostiku lze zkusit stejnou stránku s novým query parametrem. Výsledek závisí také na klientovi a jeho nastavení náhledů.

Specifikace: https://ogp.me/
