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
