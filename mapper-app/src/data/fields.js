export const TRANSFORM_TYPES = [
  { value: 'tbd',        label: 'TBD',          short: 'TBD',  color: '#64748b' },
  { value: 'direct',     label: 'Direct Copy',  short: 'Copy', color: '#10b981' },
  { value: 'lookup',     label: 'Lookup / Join', short: 'Look', color: '#3b82f6' },
  { value: 'calculated', label: 'Calculated',   short: 'Calc', color: '#8b5cf6' },
  { value: 'constant',   label: 'Constant',     short: 'Const',color: '#f97316' },
  { value: 'dropped',    label: 'Dropped',      short: 'Drop', color: '#ef4444' },
];

export const TRANSFORM_MAP = Object.fromEntries(TRANSFORM_TYPES.map(t => [t.value, t]));

export const SOURCE_SYSTEMS = [
  {
    id: 'gp',
    label: 'Great Plains (GP)',
    color: '#3b82f6',
    groups: [
      {
        label: 'Vendor Master',
        fields: [
          { id: 'gp.vendor.vendor_id',       label: 'Vendor ID' },
          { id: 'gp.vendor.vendor_name',      label: 'Vendor Name' },
          { id: 'gp.vendor.vendor_type',      label: 'Vendor Type' },
          { id: 'gp.vendor.address_1',        label: 'Address 1' },
          { id: 'gp.vendor.address_2',        label: 'Address 2' },
          { id: 'gp.vendor.city',             label: 'City' },
          { id: 'gp.vendor.state',            label: 'State' },
          { id: 'gp.vendor.zip',              label: 'ZIP Code' },
          { id: 'gp.vendor.phone',            label: 'Phone' },
          { id: 'gp.vendor.fax',              label: 'Fax' },
          { id: 'gp.vendor.tax_id',           label: 'Tax ID (EIN)' },
          { id: 'gp.vendor.payment_terms',    label: 'Payment Terms' },
          { id: 'gp.vendor.gl_account',       label: 'Default GL Account' },
          { id: 'gp.vendor.form_1099_type',   label: '1099 Type' },
        ],
      },
      {
        label: 'Chart of Accounts',
        fields: [
          { id: 'gp.coa.account_number',   label: 'Account Number' },
          { id: 'gp.coa.account_name',     label: 'Account Name' },
          { id: 'gp.coa.account_type',     label: 'Account Type' },
          { id: 'gp.coa.account_category', label: 'Account Category' },
          { id: 'gp.coa.department',       label: 'Department / Cost Center' },
          { id: 'gp.coa.inactive',         label: 'Inactive Flag' },
        ],
      },
      {
        label: 'AP Transactions',
        fields: [
          { id: 'gp.ap.doc_number',      label: 'Document Number' },
          { id: 'gp.ap.doc_date',        label: 'Document Date' },
          { id: 'gp.ap.doc_type',        label: 'Document Type' },
          { id: 'gp.ap.amount',          label: 'Amount' },
          { id: 'gp.ap.batch_number',    label: 'Batch Number' },
          { id: 'gp.ap.post_date',       label: 'Post Date' },
          { id: 'gp.ap.voucher_number',  label: 'Voucher Number' },
          { id: 'gp.ap.vendor_id',       label: 'Vendor ID (FK)' },
        ],
      },
    ],
  },
  {
    id: 'doclink',
    label: 'DocLink',
    color: '#8b5cf6',
    groups: [
      {
        label: 'Document Index',
        fields: [
          { id: 'dl.document_type',     label: 'Document Type' },
          { id: 'dl.document_date',     label: 'Document Date' },
          { id: 'dl.document_number',   label: 'Document / Invoice Number' },
          { id: 'dl.vendor_id',         label: 'Vendor ID' },
          { id: 'dl.vendor_name',       label: 'Vendor Name' },
          { id: 'dl.amount',            label: 'Invoice Amount' },
          { id: 'dl.gl_account',        label: 'GL Account Code' },
          { id: 'dl.po_number',         label: 'PO Number' },
          { id: 'dl.project_code',      label: 'Project / Job Code' },
          { id: 'dl.approval_status',   label: 'Approval Status' },
          { id: 'dl.approver',          label: 'Approver Name' },
          { id: 'dl.approval_date',     label: 'Approval Date' },
          { id: 'dl.document_path',     label: 'Document File Path' },
        ],
      },
    ],
  },
  {
    id: 'ukg',
    label: 'UKG (Workforce)',
    color: '#10b981',
    groups: [
      {
        label: 'Employee Master',
        fields: [
          { id: 'ukg.emp.employee_id',    label: 'Employee ID' },
          { id: 'ukg.emp.first_name',     label: 'First Name' },
          { id: 'ukg.emp.last_name',      label: 'Last Name' },
          { id: 'ukg.emp.ssn',            label: 'SSN (last 4)' },
          { id: 'ukg.emp.dob',            label: 'Date of Birth' },
          { id: 'ukg.emp.hire_date',      label: 'Hire Date' },
          { id: 'ukg.emp.term_date',      label: 'Termination Date' },
          { id: 'ukg.emp.department',     label: 'Department' },
          { id: 'ukg.emp.job_title',      label: 'Job Title / Job Code' },
          { id: 'ukg.emp.pay_type',       label: 'Pay Type (Hourly/Salary)' },
          { id: 'ukg.emp.pay_rate',       label: 'Pay Rate' },
          { id: 'ukg.emp.pay_frequency',  label: 'Pay Frequency' },
          { id: 'ukg.emp.benefit_class',  label: 'Benefit Class' },
          { id: 'ukg.emp.fte',            label: 'FTE' },
          { id: 'ukg.emp.manager_id',     label: 'Manager ID' },
          { id: 'ukg.emp.location',       label: 'Location / Facility' },
          { id: 'ukg.emp.union_code',     label: 'Union Code' },
        ],
      },
    ],
  },
];

export const NETSUITE_RECORDS = [
  {
    id: 'ns_vendor',
    label: 'Vendor',
    color: '#f59e0b',
    fields: [
      { id: 'ns.vendor.entityId',    label: 'Entity ID',       required: true },
      { id: 'ns.vendor.companyName', label: 'Company Name',    required: true },
      { id: 'ns.vendor.addr_addr1',  label: 'Address Line 1' },
      { id: 'ns.vendor.addr_addr2',  label: 'Address Line 2' },
      { id: 'ns.vendor.addr_city',   label: 'City' },
      { id: 'ns.vendor.addr_state',  label: 'State' },
      { id: 'ns.vendor.addr_zip',    label: 'ZIP' },
      { id: 'ns.vendor.phone',       label: 'Phone' },
      { id: 'ns.vendor.fax',         label: 'Fax' },
      { id: 'ns.vendor.taxId',       label: 'Tax ID' },
      { id: 'ns.vendor.terms',       label: 'Payment Terms' },
      { id: 'ns.vendor.is1099',      label: '1099 Eligible' },
      { id: 'ns.vendor.subsidiary',  label: 'Subsidiary',      required: true },
    ],
  },
  {
    id: 'ns_employee',
    label: 'Employee',
    color: '#ef4444',
    fields: [
      { id: 'ns.emp.entityId',     label: 'Entity ID' },
      { id: 'ns.emp.firstName',    label: 'First Name',    required: true },
      { id: 'ns.emp.lastName',     label: 'Last Name',     required: true },
      { id: 'ns.emp.department',   label: 'Department',    required: true },
      { id: 'ns.emp.subsidiary',   label: 'Subsidiary',    required: true },
      { id: 'ns.emp.supervisor',   label: 'Supervisor' },
      { id: 'ns.emp.employeeType', label: 'Employee Type' },
      { id: 'ns.emp.title',        label: 'Job Title' },
      { id: 'ns.emp.startDate',    label: 'Start Date',    required: true },
      { id: 'ns.emp.releaseDate',  label: 'Release Date' },
      { id: 'ns.emp.isInactive',   label: 'Inactive' },
      { id: 'ns.emp.location',     label: 'Location' },
    ],
  },
  {
    id: 'ns_coa',
    label: 'Chart of Accounts',
    color: '#06b6d4',
    fields: [
      { id: 'ns.coa.accountNumber',  label: 'Account Number',  required: true },
      { id: 'ns.coa.acctName',       label: 'Account Name',    required: true },
      { id: 'ns.coa.acctType',       label: 'Account Type',    required: true },
      { id: 'ns.coa.parent',         label: 'Parent Account' },
      { id: 'ns.coa.subsidiary',     label: 'Subsidiary',      required: true },
      { id: 'ns.coa.openingBalance', label: 'Opening Balance' },
      { id: 'ns.coa.isInactive',     label: 'Inactive' },
    ],
  },
  {
    id: 'ns_vendor_bill',
    label: 'Vendor Bill',
    color: '#f97316',
    fields: [
      { id: 'ns.vb.entity',     label: 'Vendor (entity)',        required: true },
      { id: 'ns.vb.tranDate',   label: 'Transaction Date',       required: true },
      { id: 'ns.vb.tranId',     label: 'Reference / Inv Number' },
      { id: 'ns.vb.memo',       label: 'Memo' },
      { id: 'ns.vb.dueDate',    label: 'Due Date' },
      { id: 'ns.vb.subsidiary', label: 'Subsidiary',             required: true },
      { id: 'ns.vb.location',   label: 'Location' },
      { id: 'ns.vb.account',    label: 'Expense Account',        required: true },
      { id: 'ns.vb.department', label: 'Department' },
      { id: 'ns.vb.amount',     label: 'Amount',                 required: true },
    ],
  },
];

// Build flat lookup maps for label resolution
export const SOURCE_FIELD_MAP = {};
SOURCE_SYSTEMS.forEach(sys => {
  sys.groups.forEach(grp => {
    grp.fields.forEach(f => { SOURCE_FIELD_MAP[f.id] = { ...f, system: sys.label, color: sys.color }; });
  });
});

export const TARGET_FIELD_MAP = {};
NETSUITE_RECORDS.forEach(rec => {
  rec.fields.forEach(f => { TARGET_FIELD_MAP[f.id] = { ...f, record: rec.label, color: rec.color }; });
});
