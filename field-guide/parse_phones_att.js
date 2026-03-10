// parse_phones_att.js — parse AT&T wireless CSV export
// Run: node parse_phones_att.js
// Output: phones_att_import.csv (ready for Supabase CSV importer → phone_att table)

const fs   = require('fs');
const path = require('path');

const IN_FILE  = path.join(__dirname, 'Phone Audit 2025-11-18 - ATT phone list.csv');
const OUT_FILE = path.join(__dirname, 'phones_att_import.csv');

// Simple CSV parser — handles quoted fields with commas and embedded quotes
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

// MM/DD/YYYY or M/D/YYYY → YYYY-MM-DD; blank/invalid → ''
function toISODate(s) {
  if (!s || !s.trim()) return '';
  const m = s.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return '';
  return `${m[3]}-${m[1].padStart(2,'0')}-${m[2].padStart(2,'0')}`;
}

const lines = fs.readFileSync(IN_FILE, 'utf8').split(/\r?\n/);
const headers = parseCSVLine(lines[0]);
console.log(`Headers (${headers.length}):`, headers.map((h,i) => `${i}:${h}`).join(' | '));

// Column index map (0-based)
// 5:Wireless number, 6:Wireless user name, 7:Status, 13:Device type, 15:Device make
// 16:Device model, 4:Billing account name, 27:Rate plan SOC: Name, 33:Activation date
// 38:Contract end date, 42:Smartphone upgrade eligibility, 53:Primary place of use
// 54:Currently Assigned, 55:Assigned to (if NO), 56:Facility, 57:Notes

const esc = v => `"${String(v || '').replace(/"/g, '""')}"`;

const OUT_COLS = [
  'wireless_number','user_name','status','facility','assigned_to','currently_assigned',
  'device_type','device_make','device_model','billing_account','rate_plan',
  'activation_date','contract_end_date','upgrade_eligibility',
  'primary_place_of_use','notes'
];

const rows = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  const c = parseCSVLine(line);

  rows.push({
    wireless_number:    (c[5]  || '').trim().replace(/\D/g,''),   // digits only
    user_name:          (c[6]  || '').trim(),
    status:             (c[7]  || '').trim(),
    facility:           (c[56] || '').trim() || (c[4] || '').trim(),
    assigned_to:        (c[55] || '').trim(),
    currently_assigned: (c[54] || '').trim(),
    device_type:        (c[13] || '').trim(),
    device_make:        (c[15] || '').trim(),
    device_model:       (c[16] || '').trim(),
    billing_account:    (c[4]  || '').trim(),
    rate_plan:          (c[27] || '').trim(),
    activation_date:    toISODate(c[33]),
    contract_end_date:  toISODate(c[38]),
    upgrade_eligibility:toISODate(c[42]),
    primary_place_of_use:(c[53]|| '').trim(),
    notes:              (c[57] || '').trim(),
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
