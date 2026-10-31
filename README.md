# Jindřichův dům - Eleventy Project

Modern information pages for guest accommodation, built with Eleventy for easy content management.

## 📁 Project Structure

```
/
├── src/                      # Source files
│   ├── _data/               # Data files (JSON)
│   │   └── content.json     # Single source of truth for all text
│   ├── _includes/           # Template layouts
│   │   └── layouts/
│   │       ├── base.njk     # Base HTML structure
│   │       ├── web.njk      # Web layout
│   │       └── print-a6-landscape.njk  # Print layout
│   ├── css/                 # Stylesheets
│   │   ├── web.css          # Web styles
│   │   └── print-a6-landscape.css  # Print styles
│   ├── index.njk            # Landing page template
│   └── info-a6-landscape.njk  # Print version template
├── _site/                   # Generated output (ignored by git)
├── .eleventy.js            # Eleventy configuration
└── package.json            # Dependencies and scripts
```

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm start
# or
npm run serve
```

This will start a local server at `http://localhost:8080` with live reload.

### Build for Production
```bash
npm run build
```

Generated files will be in the `_site/` directory.

## ✏️ Editing Content

All text content is centralized in `src/_data/content.json`. Update this file to change:
- WiFi credentials
- Check-in/out times
- Contact numbers
- Meal times
- House rules
- And more...

The changes will automatically reflect across all pages (web and print versions).

## 📄 Adding New Pages

1. Create a new `.njk` file in the `src/` directory
2. Add front matter to specify layout:
   ```yaml
   ---
   layout: layouts/web.njk
   title: Your Page Title
   ---
   ```
3. Use template variables from `content.json`:
   ```html
   {{ content.wifi.networkName }}
   ```

## 🎨 Styling

- Web styles: `src/css/web.css`
- Print styles: `src/css/print-a6-landscape.css`

## 📱 Serving on Local Network

After building, you can serve the `_site/` directory on your local network:

```bash
cd _site
python3 -m http.server 8000
```

Then access from any device on the network at `http://[your-ip]:8000`

## 🔧 Configuration

Eleventy configuration is in `.eleventy.js`. Current settings:
- Input directory: `src`
- Output directory: `_site`
- Template engine: Nunjucks

## 📦 NPM Scripts

- `npm start` - Start development server with live reload
- `npm run serve` - Same as start
- `npm run build` - Build static site for production

## Seasonal homepage photo

The homepage selects its hero photo on each page load using the current date in
`Europe/Prague`: December–February shows the snowy cottage, March–August the
summer cottage, and September–November the morning mist. No rebuild or deployment
is needed at season boundaries. The script runs in the head before the stylesheet
and body so the fallback photo does not flash first. With JavaScript disabled or
unsupported time-zone formatting, the summer cottage remains the fallback.

Run the date-boundary tests with `node --test tests/seasonal-hero.test.cjs`.

## Contact Form on Vercel

The music space inquiry form posts to `/api/music-inquiry`, a Vercel serverless function that sends the message through Resend.

Set these environment variables in Vercel:

- `RESEND_API_KEY` - API key from Resend
- `CONTACT_FROM_EMAIL` - verified sender, for example `Jindrichuv dum <studio@jindrichuvdum.cz>`

The form messages are delivered to `jindrichuvdum@jindrichuvdum.cz`.

## Samoobslužný bar

Pravidla baru jsou uložena v `src/_data/barRules.json`. Společná šablona
`src/_includes/partials/bar-rules.njk` je vykresluje na `/samoobsluzny-bar/`
i `/samoobsluzny-bar/tisk/`. Tisková verze obsahuje jen pravidla baru;
tlačítko otevře tisk prohlížeče, kde lze také uložit PDF (A4 na výšku).
Pro čistý výtisk vypněte záhlaví a zápatí prohlížeče.

Odkazy vedou z praktických informací a z části 5 ubytovacího řádu.
Údaj o baru na tiskových kartičkách se upravuje v
`content.practicalInfo.meals.bar` v `src/_data/content.json`.
