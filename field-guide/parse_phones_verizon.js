// parse_phones_verizon.js — parse Verizon wireless CSV export
// Run: node parse_phones_verizon.js
// Output: phones_verizon_import.csv (ready for Supabase CSV importer → phone_verizon table)

const fs   = require('fs');
const path = require('path');

const IN_FILE  = path.join(__dirname, 'Phone Audit 2025-11-18 - Verizon phone list.csv');
const OUT_FILE = path.join(__dirname, 'phones_verizon_import.csv');

function parseCSVLine(line) {
  const fields = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQ) {
      if (ch === '"' && line[i+1] === '"') { cur += '"'; i++; }
      else if (ch === '"') { inQ = false; }
      else { cur += ch; }
    } else {
      if (ch === '"') { inQ = true; }
      else if (ch === ',') { fields.push(cur); cur = ''; }
      else { cur += ch; }
    }
  }
  fields.push(cur);
  return fields;
}

// MM/DD/YYYY → YYYY-MM-DD; blank/invalid → ''
function toISODate(s) {
  if (!s || !s.trim()) return '';
  const m = s.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return '';
  return `${m[3]}-${m[1].padStart(2,'0')}-${m[2].padStart(2,'0')}`;
}

const lines = fs.readFileSync(IN_FILE, 'utf8').split(/\r?\n/);
const headers = parseCSVLine(lines[0]);
console.log(`Headers (${headers.length}):`, headers.map((h,i) => `${i}:${h}`).join(' | '));

// Column index map (0-based):
// 3:Wireless number, 4:User name, 5:Currently Assigned, 6:Assigned to (if NO)
// 7:Facility, 8:Notes, 9:Email address, 11:Status, 12:Device model
// 13:Account number, 20:Device manufacturer, 21:Device type
// 22:Activation date, 24:Contract end date, 25:Upgrade eligibility date

const esc = v => `"${String(v || '').replace(/"/g, '""')}"`;

const OUT_COLS = [
  'wireless_number','user_name','status','facility','assigned_to','currently_assigned',
  'device_type','device_manufacturer','device_model','account_number','email_address',
  'activation_date','contract_end_date','upgrade_eligibility','notes'
];

const rows = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  const c = parseCSVLine(line);

  rows.push({
    wireless_number:    (c[3]  || '').trim().replace(/\D/g,''),
    user_name:          (c[4]  || '').trim(),
    status:             (c[11] || '').trim(),
    facility:           (c[7]  || '').trim(),
    assigned_to:        (c[6]  || '').trim(),
    currently_assigned: (c[5]  || '').trim(),
    device_type:        (c[21] || '').trim(),
    device_manufacturer:(c[20] || '').trim(),
    device_model:       (c[12] || '').trim(),
    account_number:     (c[13] || '').trim(),
    email_address:      (c[9]  || '').trim(),
    activation_date:    toISODate(c[22]),
    contract_end_date:  toISODate(c[24]),
    upgrade_eligibility:toISODate(c[25]),
    notes:              (c[8]  || '').trim(),
  });
}

const outLines = [
  OUT_COLS.join(','),
  ...rows.map(r => OUT_COLS.map(col => esc(r[col])).join(','))
];

fs.writeFileSync(OUT_FILE, outLines.join('\n'), 'utf8');
console.log(`\nDone. ${rows.length} rows → ${OUT_FILE}`);

// Sample
console.log('\nSample:');
rows.slice(0,3).forEach(r =>
  console.log(`  ${r.wireless_number} | ${r.user_name} | ${r.status} | ${r.facility} | ${r.device_model}`)
);
