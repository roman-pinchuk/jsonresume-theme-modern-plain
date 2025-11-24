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
        
        // Generate PDF with A4 format
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '8mm',
                bottom: '8mm',
                left: '8mm',
                right: '8mm'
            }
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