const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const data = require('../data/skilled-worker-occupations.json');
const moduleResult = { exports: {} };
new Function('require', 'module', 'exports', ts.transpileModule(fs.readFileSync('utils/skilled-worker.ts','utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText)(() => data, moduleResult, moduleResult.exports);
const { searchOccupations, eligibility, standardSalary } = moduleResult.exports;
test('dataset has unique four-digit codes, known statuses and complete titles', () => {
 assert.equal(data.occupations.length, 412);
 assert.equal(new Set(data.occupations.map(o => o.code)).size, data.occupations.length);
 for (const o of data.occupations) { assert.match(o.code, /^\d{4}$/); assert(o.title); assert(o.relatedTitles.length); assert(/^(Higher Skilled|Medium Skilled|Ineligible)/.test(o.skillLevel)); }
});
test('search matches exact codes, alternative titles, case and multiple words', () => {
 assert.equal(searchOccupations('2134')[0].code, '2134');
 assert(searchOccupations('  COMPUTER programmer ').some(o => o.code === '2134'));
 assert.equal(searchOccupations('no-such-job-xyz').length, 0);
 assert(searchOccupations('', 'Ineligible').every(o => o.skillLevel === 'Ineligible'));
});
test('conditional and ineligible occupations never receive an unqualified eligible label', () => {
 for (const o of data.occupations) {
  if (o.skillLevel.startsWith('Medium Skilled')) assert.equal(eligibility(o).label, 'Subject to conditions');
  if (o.skillLevel === 'Ineligible') { assert.equal(eligibility(o).label, 'Ineligible occupation'); assert.equal(standardSalary(o), 'Not applicable'); }
 }
 const nurse = data.occupations.find(o => o.code === '2231');
 assert.equal(standardSalary(nurse), 'Check occupation-specific salary rules');
});
