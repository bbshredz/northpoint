// parse_phones.js — extract phone directory from UCx HTML export
// Run: node parse_phones.js
// Output: phones_import.csv (ready for Supabase CSV importer)

const fs   = require('fs');
const path = require('path');

const HTML_FILE = path.join(__dirname, 'Business Group Phone List.html');
const OUT_FILE  = path.join(__dirname, 'phones_import.csv');

const html = fs.readFileSync(HTML_FILE, 'latin1');

const tm = html.match(/<textarea id="xml"[^>]*>([\s\S]*?)<\/textarea>/i);
if (!tm) { console.error('Could not find XML textarea'); process.exit(1); }

const xml = tm[1]
  .replace(/&lt;/g,  '<')
  .replace(/&gt;/g,  '>')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"');

const rows = [...xml.matchAll(/<row>([\s\S]*?)<\/row>/g)];
console.log(`Found ${rows.length} rows`);

const NULL_VAL = '-2146826265'; // UCx null sentinel

const clean = v => (v === NULL_VAL || v === 'false') ? '' : (v || '').trim();

const results = [];

for (const rowMatch of rows) {
  const c = [...rowMatch[1].matchAll(/<col>([\s\S]*?)<\/col>/g)].map(m => clean(m[1]));
  const n = c.length;

  let r = {
    entry_type:      '',
    name:            c[0] || '',
    first_name:      '',
    last_name:       '',
    phone_did:       '',
    extension:       '',
    email_personal:  '',
    email_generated: '',
    facility_id:     '',
    location:        '',
    sub_location:    '',
    job_title:       '',
    timezone:        '',
    street:          '',
    city:            '',
    state:           '',
    zip_code:        '',
    country:         '',
  };

  if (n === 10) {
    // Generic facility entry — no address, no DID separate check needed
    r.entry_type      = 'generic';
    r.phone_did       = c[1];
    r.extension       = c[2];
    r.facility_id     = c[4];
    r.email_generated = c[5];
    r.location        = c[7];
    r.sub_location    = c[8];
    r.timezone        = c[9];

  } else if (n === 11) {
    // Voice portal / equipment
    r.entry_type      = 'equipment';
    r.phone_did       = c[1];
    r.extension       = c[2];
    r.facility_id     = c[4];
    r.email_generated = c[5];
    r.location        = c[7];
    r.sub_location    = c[8];
    r.timezone        = c[9];

  } else if (n === 14) {
    // Room entry — extension only (no DID), with address
    r.entry_type      = 'room';
    r.extension       = c[1];  // col 1 is extension here, no DID
    r.facility_id     = c[3];
    r.email_generated = c[4];
    r.location        = c[6];
    r.sub_location    = c[7];
    r.timezone        = c[8];
    r.street          = c[9];
    r.city            = c[10];
    r.state           = c[11];
    r.zip_code        = c[12];
    r.country         = c[13];

  } else if (n === 15) {
    // Room entry — full DID + extension, with address
    r.entry_type      = 'room';
    r.phone_did       = c[1];
    r.extension       = c[2];
    r.facility_id     = c[4];
    r.email_generated = c[5];
    r.location        = c[7];
    r.sub_location    = c[8];
    r.timezone        = c[9];
    r.street          = c[10];
    r.city            = c[11];
    r.state           = c[12];
    r.zip_code        = c[13];
    r.country         = c[14];

  } else if (n === 16) {
    // Staff entry
    r.entry_type      = 'staff';
    r.phone_did       = c[1];
    r.extension       = c[2];
    r.email_personal  = c[3];
    r.facility_id     = c[5];
    r.email_generated = c[6];
    r.first_name      = c[8];
    r.last_name       = c[9];
    r.timezone        = c[10];
    r.street          = c[11];
    r.city            = c[12];
    r.state           = c[13];
    r.zip_code        = c[14];
    r.country         = c[15];

  } else if (n === 17) {
    // Staff entry with job title
    r.entry_type      = 'staff';
    r.phone_did       = c[1];
    r.extension       = c[2];
    r.email_personal  = c[3];
    r.facility_id     = c[5];
    r.email_generated = c[6];
    r.first_name      = c[8];
    r.last_name       = c[9];
    r.job_title       = c[10];
    r.timezone        = c[11];
    r.street          = c[12];
    r.city            = c[13];
    r.state           = c[14];
    r.zip_code        = c[15];
    r.country         = c[16];
  }

  results.push(r);
}

const COLS = [
  'entry_type','name','first_name','last_name',
  'phone_did','extension','email_personal','email_generated',
  'facility_id','location','sub_location','job_title',
  'timezone','street','city','state','zip_code','country'
];

const esc = v => `"${String(v || '').replace(/"/g, '""')}"`;

const lines = [
  COLS.join(','),
  ...results.map(r => COLS.map(c => esc(r[c])).join(','))
];

fs.writeFileSync(OUT_FILE, lines.join('\n'), 'utf8');

// Summary
console.log(`\nDone. ${results.length} rows → ${OUT_FILE}`);
const byType = results.reduce((a, r) => { a[r.entry_type] = (a[r.entry_type]||0)+1; return a; }, {});
console.log('By type:', byType);

const staff = results.filter(r => r.entry_type === 'staff').slice(0, 4);
console.log('\nSample staff:');
staff.forEach(r => console.log(`  ${r.name} | ext:${r.extension} | did:${r.phone_did} | ${r.email_personal} | fac:${r.facility_id}`));

const rooms = results.filter(r => r.entry_type === 'room').slice(0, 3);
console.log('\nSample rooms:');
rooms.forEach(r => console.log(`  ${r.name} | ext:${r.extension} | did:${r.phone_did} | loc:${r.location} | fac:${r.facility_id} | ${r.city}`));

const facIds = [...new Set(results.map(r => r.facility_id).filter(Boolean).filter(v => /^\d{6,}$/.test(v)))].sort();
console.log(`\n${facIds.length} numeric facility IDs:`, facIds.join(', '));
