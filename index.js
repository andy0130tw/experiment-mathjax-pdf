const fs = require('fs');
const MarkdownIt = require('markdown-it');
const Promise = require('bluebird');
const mathJax = require('mathjax-node/lib/mj-page');
// const mathJax = require('mathjax-node/lib/mj-single');

var md = MarkdownIt({
    html: true,
    breaks: true,
    // typographer: true
}).use(require('markdown-it-mathjax'));

var doc = fs.readFileSync('doc.md', 'utf-8');
var template = fs.readFileSync('template.html', 'utf-8');

// console.log(md.render(doc));

var docParsed = md.render(doc);

mathJax.config({
  MathJax: {
    // config
  }
});

mathJax.start();

mathJax.typeset({
  // math: docParsed,
  // format: 'TeX',
  // html: true,
  // css: true
  // html: docParsed,
  // ex: 8,
  html: docParsed,
  inputs: ['TeX'],
  renderer: 'CommonHTML'
}, function(data) {
  console.log(data);
  var content = template
    .replace('{{ style }}', data.css  || '')
    .replace('{{ body }}',  data.html || '');

  fs.writeFileSync('output.html', content, 'utf-8');
});
