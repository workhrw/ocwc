const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const src=fs.readFileSync('google-apps-script/Code.gs','utf8');
function harness(o={}) {
 const state={rows:[],opened:0},headers=['Received (UTC)','Name','Email','Message'];
 const sheet={getRange:()=>({getValues:()=>[o.badHeaders?['Other']:headers],setFontWeight(){}}),getLastRow:()=>o.empty?0:1,setFrozenRows(){},appendRow:r=>{if(o.failWrite)throw Error('write');state.rows.push(r)}};
 const ctx=vm.createContext({SpreadsheetApp:{openById:()=>{state.opened++;if(o.failOpen)throw Error('access');return {getSheetByName:()=>o.missing?null:sheet,insertSheet:()=>sheet}},flush:()=>{if(o.failFlush)throw Error('flush')}},
 LockService:{getScriptLock:()=>({tryLock:()=>!o.busy,releaseLock(){}})},HtmlService:{createHtmlOutput:html=>({html,setTitle(){return this},addMetaTag(){return this}})}});
 vm.runInContext(src,ctx);return {ctx,state,post:e=>ctx.doPost(e).html};
}
function event(v={}){return {contentLength:150,postData:{type:'application/x-www-form-urlencoded'},parameters:Object.fromEntries(Object.entries({name:'Synthetic OCWC test',email:'test@example.com',message:'Synthetic message',confirmation_code:'',...v}).map(([k,v])=>[k,[v]]))}}
test('valid request saves four literal cells before confirmation',()=>{const h=harness();assert.match(h.post(event()),/<h1>Message saved<\/h1>/);assert.equal(h.state.rows.length,1);assert.equal(h.state.rows[0].length,4);assert.equal(h.state.rows[0][1],"'Synthetic OCWC test")});
test('honeypot rejects without accessing Sheet',()=>{const h=harness();assert.match(h.post(event({confirmation_code:'bot'})),/Message not saved/);assert.equal(h.state.opened,0)});
test('blank, oversized, invalid and injection fields rejected server-side',()=>{for(const v of [{name:''},{email:'bad'},{message:''},{name:'a'.repeat(101)},{message:'a'.repeat(5001)},{email:'a@example.com\r\nBcc:b@example.com'},{name:'a\nB'},{message:'a\u0000B'}]){const h=harness();assert.match(h.post(event(v)),/Message not saved/);assert.equal(h.state.opened,0)}});
test('duplicate params, wrong types and oversize request rejected',()=>{for(const alter of [e=>e.parameters.email.push('x@example.com'),e=>e.parameters.name={},e=>e.contentLength=65537,e=>e.postData.type='application/json']){const h=harness(),e=event();alter(e);assert.match(h.post(e),/Message not saved/);assert.equal(h.state.opened,0)}});
test('honeypot is optional',()=>{const h=harness(),e=event();delete e.parameters.confirmation_code;assert.match(h.post(e),/Message saved/)});
test('spreadsheet formulas and markup are literal and not reflected',()=>{for(const s of ['=SUM(1,1)','+SUM(1,1)','-1','@SUM(1,1)','<script>alert(1)</script>']){const h=harness(),html=h.post(event({name:s,message:s}));assert.equal(h.state.rows[0][1],"'"+s);assert.equal(h.state.rows[0][3],"'"+s);assert.ok(!html.includes(s))}});
test('write, access, flush and configuration failures do not claim success',()=>{for(const o of [{failWrite:true},{failOpen:true},{failFlush:true},{badHeaders:true},{missing:true}]){const h=harness(o),html=h.post(event());assert.match(html,/Could not confirm your message/);assert.doesNotMatch(html,/<h1>Message saved/)}});
test('busy lock writes nothing',()=>{const h=harness({busy:true});assert.match(h.post(event()),/not been saved/);assert.equal(h.state.rows.length,0)});
test('GET reveals no Sheet data and output escaping works',()=>{const h=harness();assert.match(h.ctx.doGet().html,/Use the contact page/);assert.equal(h.state.opened,0);assert.equal(h.ctx.escapeHtml_('<script>"&'),'&lt;script&gt;&quot;&amp;')});
test('setup initializes empty tab and refuses unrelated headers',()=>{const h=harness({empty:true});h.ctx.setupContactSheet();assert.equal(h.state.rows.length,1);assert.throws(()=>harness({badHeaders:true}).ctx.setupContactSheet())});
test('only Sheets scope, no email or Drive services',()=>{const m=JSON.parse(fs.readFileSync('google-apps-script/appsscript.json'));assert.deepEqual(m.oauthScopes,['https://www.googleapis.com/auth/spreadsheets']);assert.doesNotMatch(src,/MailApp|GmailApp|DriveApp|UrlFetchApp/)});
