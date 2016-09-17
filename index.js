const fs = require('fs');

const MarkdownIt = require('markdown-it');
const Promise = require('bluebird');
const matter = require('gray-matter');
const mathJax = require('mathjax-node/lib/mj-page');
// const mathJax = require('mathjax-node/lib/mj-single');

function getMetaTitle(data) {
  if (!data.hasOwnProperty('title')) return '';
  var title = data.title;
  delete data.title;
  return title;
}

function getMetaDataArray(data, def) {
  var rtn = [];
  for (var x in def) {
    if (def.hasOwnProperty(x) && data && data.hasOwnProperty(x)) {
      rtn.push([x, data[x]]);
    } else if (def[x] != null) {
      rtn.push([x, def[x]]);
    }
  }
  return rtn;
}

var defaultMeta = {
  author:    null,
  date:      null,
  generator: null,
  keywords:  null,
  subject:   null,

  // Prince will inject this, not knowing how to change it
  // producer:   null,

  description: null,  // not part of PDF metadata, but it's good to have one
};

var md = MarkdownIt({
    html: true,
    breaks: true,
    // typographer: true
}).use(require('markdown-it-mathjax'));

var doc = fs.readFileSync('doc.md', 'utf-8');
var template = fs.readFileSync('template.html', 'utf-8');

var docSplit = matter(doc, {
  safeLoad: true,
  strict: true
});

var docTitle = getMetaTitle(docSplit.data);
var meta = getMetaDataArray(docSplit.data, defaultMeta);
var docParsed = md.render(docSplit.content);

var metaString = meta.reduce((pv, v) => `${pv}<meta name="${v[0]}" content="${v[1]}">\n`, '');

template = template
  .replace('{{ title }}', docTitle)
  .replace('{{ metadata }}', metaString);

console.log(meta);

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
