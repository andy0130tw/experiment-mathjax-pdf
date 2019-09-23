const fs = require('fs');

const MarkdownIt = require('markdown-it');
const matter = require('gray-matter');
const mjpage = require('mathjax-node-page').mjpage;

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
}).use(require('markdown-it-mathjax')());

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

mjpage(docParsed, {  // mjpageConfig
  format: ['TeX'],
  output: 'html',
  singleDollars: true,
  displayErrors: true,
  MathJax: {

  },
}, {  // mjnodeConfig
}, function(html) {
  console.log('Produced HTML length:', html.length);
  var content = template
    .replace('{{ body }}', html || '');

  fs.writeFileSync('output.html', content, 'utf-8');
});
