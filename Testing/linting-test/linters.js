const mochaHtmllint = require('mocha-htmllint');
 
mochaHtmllint([
    './views/*.html'
], {
    'line-end-style': false
});