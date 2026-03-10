const fs = require('fs');
const html = fs.readFileSync('Business Group Phone List.html', 'latin1');
const tm = html.match(/<textarea id="xml"[^>]*>([\s\S]*?)<\/textarea>/i);
let xml = tm[1].replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"');
const rows = [...xml.matchAll(/<row>([\s\S]*?)<\/row>/g)];

const byCount = {};
rows.forEach((r, i) => {
  const cols = [...r[1].matchAll(/<col>([\s\S]*?)<\/col>/g)].map(m => m[1].trim());
  const n = cols.length;
  if (!byCount[n]) byCount[n] = [];
  byCount[n].push({ i, cols });
});

Object.keys(byCount).sort((a,b) => a-b).forEach(count => {
  console.log('\n=== ' + count + ' cols (' + byCount[count].length + ' rows) ===');
  byCount[count].slice(0, 2).forEach(({ i, cols }) => {
    console.log('  row', i, ':', cols.map((c, ci) => ci + ':' + JSON.stringify(c)).join(' | '));
  });
});
