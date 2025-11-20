# JSON Resume Theme - Modern Plain

[![npm version](https://img.shields.io/npm/v/jsonresume-theme-modern-plain.svg)](https://www.npmjs.com/package/jsonresume-theme-modern-plain)
[![npm downloads](https://img.shields.io/npm/dm/jsonresume-theme-modern-plain.svg)](https://www.npmjs.com/package/jsonresume-theme-modern-plain)
[![license](https://img.shields.io/npm/l/jsonresume-theme-modern-plain.svg)](https://github.com/roman-pinchuk/jsonresume-theme-modern-plain/blob/main/LICENSE)

A clean, modern JSON Resume theme with a professional two-column layout. Perfect for developers, engineers, and technical professionals.

## Features

- Clean, modern design with PT Sans typography
- Two-column layout (Experience on left, Skills/Education on right)
- Print-optimized styles for single-page output
- Company URLs with link icons displayed after company names
- Social links with icons (Website, LinkedIn, GitHub) showing usernames
- GPA display in education section
- Blue accent colors (#4a89dc / #205bb5)
- Optimized for Safari print-to-PDF
- Support for all standard JSON Resume fields

## Installation

### Local Development

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

### Using with resume-cli

Install globally:

```bash
npm install -g resume-cli
```

## Usage

### Preview your resume

To preview your resume locally:

```bash
resume serve --theme . --resume your-resume.json
```

This will start a local server at `http://localhost:4000`.

### Export to HTML

To export your resume to HTML:

```bash
resume export resume.html --theme . --resume your-resume.json
```

### Export to PDF

**Recommended method (Safari):**

1. Run `resume serve --theme . --resume your-resume.json`
2. Open Safari and navigate to `http://localhost:4000`
3. Press `Cmd+P` to open print dialog
4. **Uncheck "Headers and Footers"** for best results
5. Click the PDF dropdown in bottom-left → **Save as PDF**

This method provides the best single-page output optimized for this theme.

**Alternative method (resume-cli):**

```bash
resume export resume.pdf --theme . --resume your-resume.json
```

Note: The CLI method may produce a two-page PDF. For optimal results, use the Safari print method above.

## Resume Schema

This theme follows the [JSON Resume schema](https://jsonresume.org/schema/). Here's what sections are supported:

### Required/Main Sections

- `basics` - Name, label, email, phone, location, profiles, summary
- `work` - Work experience with highlights
- `education` - Educational background
- `skills` - Technical skills grouped by category
- `languages` - Language proficiencies

### Optional Sections

- `projects` - Side projects or portfolio items
- `certificates` - Professional certifications
- `volunteer` - Volunteer experience
- `awards` - Awards and achievements
- `publications` - Published works
- `references` - Professional references

## Customization

### Colors

The theme uses a blue color scheme. To customize colors, edit `style.css`:

- Primary blue: `#4a89dc`
- Dark blue: `#205bb5`
- Text color: `#333`
- Light gray: `#555`

### Fonts

The theme uses **PT Sans** for all text, loaded from Google Fonts. To change fonts, edit the Google Fonts link in `resume.hbs` and update the font-family in `style.css`.

### Layout

The layout uses a 3:2 ratio for the left and right columns. To adjust, modify the `flex` values in `style.css`:

```css
.left-column {
    flex: 3;  /* Adjust this */
}

.right-column {
    flex: 2;  /* Adjust this */
}
```

## File Structure

```
jsonresume-theme-modern-plain/
├── index.js           # Theme rendering logic
├── resume.hbs         # Handlebars template
├── style.css          # CSS styles
├── package.json       # NPM package configuration
└── README.md          # This file
```

## Development

To test changes to the theme:

1. Make your changes to `resume.hbs`, `style.css`, or `index.js`
2. Run `resume serve --theme . --resume your-resume.json` to preview
3. Refresh the browser to see changes

## Print Tips

- For best single-page results, **uncheck "Headers and Footers"** in Safari print dialog
- The theme is optimized for A4 page size with 8mm margins
- Font size is set to 9pt for print with 1.15 line height
- Page breaks are controlled to keep experience entries together

## License

MIT

## Credits

Based on a professional CV template with modern design principles.
