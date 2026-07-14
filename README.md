# JSON Resume Theme - Modern Plain

[![npm version](https://img.shields.io/npm/v/jsonresume-theme-modern-plain.svg)](https://www.npmjs.com/package/jsonresume-theme-modern-plain)
[![npm downloads](https://img.shields.io/npm/dm/jsonresume-theme-modern-plain.svg)](https://www.npmjs.com/package/jsonresume-theme-modern-plain)
[![license](https://img.shields.io/npm/l/jsonresume-theme-modern-plain.svg)](https://github.com/roman-pinchuk/jsonresume-theme-modern-plain/blob/main/LICENSE)

A clean, modern JSON Resume theme with a professional one-column layout. Perfect for developers, engineers, and technical professionals.
<img width="1361" height="544" alt="image" src="https://github.com/user-attachments/assets/9e74bc13-415c-471e-abaa-20f81cc29a76" />

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Modern%20Plain-blue?style=for-the-badge&logo=github&logoColor=white)](https://roman-pinchuk.github.io/jsonresume-theme-modern-plain)

## Features

- Clean, modern design with PT Sans typography
- One-column layout with skills directly after the summary
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

### Using with resume-cli or resumed

Install globally:

```bash
# Traditional tool
npm install -g resume-cli

# Modern alternative (Note: does not support local theme development with --theme .)
npm install -g @rbardini/resumed
```

**Note:** This theme works with both tools, but for local theme development (using `--theme .`), use `resume-cli`. The `resumed` package is a more modern alternative but handles local themes differently.

## Usage

### Command Line Scripts

This theme provides command-line scripts for generating HTML and PDF versions of your resume:

#### Generate HTML
```bash
# Using npm scripts with sample resume
npm run render:sample

# Or with custom input/output
npm run render -- --input=path/to/your-resume.json --output=output.html
```

#### Generate PDF with Puppeteer
```bash
# Using npm scripts with sample resume
npm run pdf:sample

# Or with custom input/output
npm run pdf -- --input=path/to/your-resume.json --output=output.pdf
```

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

**Using the included PDF script (with Puppeteer):**
```bash
npm run pdf:sample
# or
npm run pdf -- --input=path/to/your-resume.json --output=your-resume.pdf
```

Note: The CLI method may produce a two-page PDF. For optimal results, use the Safari print method above or the Puppeteer-based PDF script.

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

The layout uses a single-column flow. To adjust section spacing, modify the section margins in `style.css`:

```css
.summary,
.skills,
.main-content section {
    margin-bottom: .8rem;
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
- Font size is set to 10pt for print with 1.2 line height
- Page breaks are controlled to keep experience entries together
- Print styles use `!important` declarations to ensure proper formatting when converting to PDF
- Reduced spacing in print styles for more compact output that fits on one page

## License

MIT

## Release Process

This project uses automated releases via GitHub Actions. To create a new release:

1. Update the version in `package.json` using `npm version` command:
   - For patch version: `npm version patch`
   - For minor version: `npm version minor`
   - For major version: `npm version major`

2. Push the changes and the tag:
   ```bash
   git push origin master
   git push origin v[version-number]
   ```

Alternatively, create a GitHub release through the web interface, which will trigger the npm publish workflow automatically.

After setting up the automated release process:

1. Create an npm access token at npmjs.com
2. Add the token as a GitHub secret named `NPM_TOKEN` in your repository settings

## Credits

Based on a professional CV template with modern design principles.
