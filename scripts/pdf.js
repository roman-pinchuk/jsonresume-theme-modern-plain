#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const theme = require('../');

// Parse command line arguments
const args = process.argv.slice(2);
const inputArg = args.find(arg => arg.startsWith('--input='));
const outputArg = args.find(arg => arg.startsWith('--output='));

// Extract file paths
const inputPath = inputArg ? inputArg.split('=')[1] : './resume.sample.json';
const outputPath = outputArg ? outputArg.split('=')[1] : './output.pdf';

// Check if input file exists
if (!fs.existsSync(inputPath)) {
    console.error(`Input file does not exist: ${inputPath}`);
    console.log('Usage: node scripts/pdf.js --input=path/to/resume.json --output=path/to/output.pdf');
    process.exit(1);
}

(async () => {
    try {
        // Read the resume JSON file
        const resumeData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
        
        // Render the resume with the theme to HTML
        const html = theme.render(resumeData);
        
        // Create temporary HTML file
        const tempHtmlPath = path.join(__dirname, 'temp-resume.html');
        fs.writeFileSync(tempHtmlPath, html);
        
        // Launch Puppeteer browser
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        // Navigate to the temporary HTML file
        await page.goto(`file://${tempHtmlPath}`, {
            waitUntil: 'networkidle2'
        });

        // Emulate media type as print to ensure print styles are applied
        await page.emulateMediaType('print');

        // Wait for the page to be fully loaded and ensure styles are applied
        await page.waitForFunction(() => document.readyState === 'complete');

        // Additional wait to ensure CSS is applied in print mode
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 200)));

        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            // Let the CSS @page rules in the HTML handle page formatting
            preferCSSPageSize: true
        });
        
        // Save the PDF
        fs.writeFileSync(outputPath, pdf);
        
        // Clean up temporary file
        fs.unlinkSync(tempHtmlPath);
        
        console.log(`PDF generated successfully!`);
        console.log(`Input: ${inputPath}`);
        console.log(`Output: ${outputPath}`);
        
        await browser.close();
    } catch (error) {
        console.error('Error generating PDF:', error.message);
        process.exit(1);
    }
})();