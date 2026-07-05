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

Handlebars.registerHelper('formatDateRange', function(startDate, endDate) {
    const start = formatMonthYear(startDate);
    const end = endDate ? formatMonthYear(endDate) : 'Present';
    return start ? `${start} - ${end}` : end;
});

Handlebars.registerHelper('formatPhone', function(phone) {
    if (!phone) return '';
    const normalized = String(phone).replace(/\s+/g, '');
    const match = normalized.match(/^(\+\d{3})(\d{2})(\d{3})(\d{4})$/);
    return match ? `${match[1]} ${match[2]} ${match[3]} ${match[4]}` : phone;
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

function formatMonthYear(date) {
    if (!date) return '';

    const [year, month = '01'] = String(date).split('-');
    const monthIndex = Number(month) - 1;
    if (!year || Number.isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) {
        return date;
    }

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[monthIndex]} ${year}`;
}

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
