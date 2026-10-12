// OCWC Contact: paste into the Apps Script project attached to the new PRIVATE Sheet.
// Replace only spreadsheetId with the Sheet ID between /d/ and /edit in its URL.
const CONFIG = Object.freeze({
  spreadsheetId: 'PASTE_YOUR_PRIVATE_SHEET_ID_HERE',
  tabName: 'Contact messages',
  websiteUrl: 'https://test.okcarver.com/contact',
});
const HEADERS = ['Received (UTC)', 'Name', 'Email', 'Message'];

function setupContactSheet() {
  const book = SpreadsheetApp.openById(CONFIG.spreadsheetId);
  let sheet = book.getSheetByName(CONFIG.tabName);
  if (!sheet) sheet = book.insertSheet(CONFIG.tabName);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  assertHeaders_(sheet);
  SpreadsheetApp.flush();
}

function assertHeaders_(sheet) {
  if (!sheet || JSON.stringify(sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0]) !== JSON.stringify(HEADERS)) {
    throw new Error('Run setupContactSheet and check the Contact messages headers.');
  }
}

function validateContact_(event) {
  if (!event || !event.postData || event.contentLength > 65536 ||
      !/^application\/x-www-form-urlencoded(?:;|$)/i.test(event.postData.type || '')) {
    return { errors: ['Please use the contact form to send a message.'] };
  }
  const params = event.parameters || {};
  const values = {};
  for (const key of ['name', 'email', 'message', 'confirmation_code']) {
    const entries = params[key];
    if (entries !== undefined && (!Array.isArray(entries) || entries.length !== 1 || typeof entries[0] !== 'string')) {
      return { errors: ['Please check your form fields and try again.'] };
    }
    values[key] = (entries ? entries[0] : '').trim();
  }
  if (values.confirmation_code !== '') {
    return { errors: ['We could not accept this submission. Please email or call the club.'] };
  }
  const errors = [];
  if (!values.name || values.name.length > 100 || /[\x00-\x1f\x7f]/.test(values.name)) errors.push('Enter your name using 100 characters or fewer.');
  if (!values.email || values.email.length > 254 || /[\x00-\x20\x7f]/.test(values.email) ||
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) errors.push('Enter a valid email address.');
  if (!values.message || values.message.length > 5000 || /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(values.message)) errors.push('Enter a message using 5,000 characters or fewer.');
  return { errors, values };
}

// Force all user-controlled cells to literal text, including =, +, -, and @ prefixes.
function sheetText_(value) { return "'" + value; }
function escapeHtml_(value) {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
}
function resultPage_(title, lines) {
  const body = '<!doctype html><html lang="en"><head><base target="_top">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' + escapeHtml_(title) + '</title>' +
    '<style>body{font:18px/1.6 system-ui,sans-serif;color:#111713;max-width:42rem;margin:3rem auto;padding:0 1.25rem}h1{line-height:1.2}a{color:#184c3a;overflow-wrap:anywhere}a:focus-visible{outline:3px solid #2e6f91;outline-offset:4px}</style>' +
    '</head><body><main><h1>' + escapeHtml_(title) + '</h1>' +
    lines.map(line => '<p>' + escapeHtml_(line) + '</p>').join('') +
    '<p><a href="' + escapeHtml_(CONFIG.websiteUrl) + '" target="_top">Return to the OCWC contact page</a></p>' +
    '<p>You can also email <a href="mailto:woodcarvingokc@gmail.com">woodcarvingokc@gmail.com</a> or call <a href="tel:+15722286292">the club</a>.</p>' +
    '</main></body></html>';
  return HtmlService.createHtmlOutput(body).setTitle(title).addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
function doGet() {
  // Never expose stored messages or spreadsheet identifiers to visitors.
  return resultPage_('OCWC contact messages', ['Use the contact page on the club website to send a message.']);
}
function doPost(event) {
  const checked = validateContact_(event);
  if (checked.errors.length) return resultPage_('Message not saved', checked.errors);
  let lock;
  try {
    lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return resultPage_('Please try again', ['The form is busy. Your message has not been saved. Please try again shortly.']);
    const sheet = SpreadsheetApp.openById(CONFIG.spreadsheetId).getSheetByName(CONFIG.tabName);
    assertHeaders_(sheet);
    const data = checked.values;
    sheet.appendRow([new Date().toISOString(), sheetText_(data.name), sheetText_(data.email), sheetText_(data.message)]);
    SpreadsheetApp.flush();
    return resultPage_('Message saved', ['Your message was saved for the Oklahoma City Woodcarvers Club. Thank you for getting in touch.', 'You may close this tab and return to the website.']);
  } catch (_) {
    // A write or flush may have partially succeeded. Do not falsely claim success or non-delivery.
    return resultPage_('Could not confirm your message', ['We could not confirm that your message was saved. Please email or call the club before sending it again.']);
  } finally {
    if (lock) { try { lock.releaseLock(); } catch (_) { /* no visitor data is logged */ } }
  }
}
