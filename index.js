const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

// Register Handlebars helpers
Handlebars.registerHelper('uppercase', function(str) {
    return str ? str.toUpperCase() : '';
});

Handlebars.registerHelper('eq', function(a, b, options) {
    if (arguments.length === 3) {
        // Block helper usage: {{#eq a b}}...{{/eq}}
        return a === b ? options.fn(this) : options.inverse(this);
    }
    // Inline helper usage: {{eq a b}}
    return a === b;
});

Handlebars.registerHelper('join', function(array, separator) {
    return array ? array.join(separator) : '';
});

Handlebars.registerHelper('formatDate', function(date) {
    if (!date) {
        return 'Present';
    }
    const d = new Date(date);
    return d.getFullYear();
});

Handlebars.registerHelper('formatYear', function(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.getFullYear();
});

Handlebars.registerHelper('extractDomain', function(url) {
    if (!url) return '';
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace('www.', '');
    } catch (e) {
        return url;
    }
});

Handlebars.registerHelper('limit', function(array, limit) {
    if (!array || !Array.isArray(array)) return [];
    return array.slice(0, limit);
});

function render(resume) {
    // Read the template and CSS
    const template = fs.readFileSync(path.join(__dirname, 'resume.hbs'), 'utf-8');
    const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf-8');

    // Compile the template
    const compiledTemplate = Handlebars.compile(template);

    // Render with resume data and CSS
    return compiledTemplate({
        ...resume,
        css: css
    });
}

module.exports = {
    render: render
};
