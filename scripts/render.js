#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const theme = require('../');

// Parse command line arguments
const args = process.argv.slice(2);
const inputArg = args.find(arg => arg.startsWith('--input='));
const outputArg = args.find(arg => arg.startsWith('--output='));

// Extract file paths
const inputPath = inputArg ? inputArg.split('=')[1] : './resume.sample.json';
const outputPath = outputArg ? outputArg.split('=')[1] : './output.html';

// Check if input file exists
if (!fs.existsSync(inputPath)) {
    console.error(`Input file does not exist: ${inputPath}`);
    console.log('Usage: node scripts/render.js --input=path/to/resume.json --output=path/to/output.html');
    process.exit(1);
}

try {
    // Read the resume JSON file
    const resumeData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    
    // Render the resume with the theme
    const html = theme.render(resumeData);
    
    // Write the HTML to output file
    fs.writeFileSync(outputPath, html);
    
    console.log(`Resume HTML generated successfully!`);
    console.log(`Input: ${inputPath}`);
    console.log(`Output: ${outputPath}`);
} catch (error) {
    console.error('Error generating resume:', error.message);
    process.exit(1);
}