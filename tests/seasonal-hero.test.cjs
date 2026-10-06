const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const root = path.join(__dirname, '..');
const script = fs.readFileSync(path.join(root, 'src/js/seasonal-hero.js'), 'utf8');

function photoAt(instant, intl = Intl) {
  const properties = new Map();
  vm.runInNewContext(script, {
    Date: class extends Date {
      constructor() { super(instant); }
    },
    Intl: intl,
    document: {
      documentElement: {
        style: { setProperty: (key, value) => properties.set(key, value) },
      },
    },
  });
  return properties.get('--hero-photo');
}

for (const [instant, photo] of [
  ['2026-11-30T22:59:59Z', 'rano-nad-mlhou'],
  ['2026-11-30T23:00:00Z', 'chata-v-zime'],
  ['2027-01-15T12:00:00Z', 'chata-v-zime'],
  ['2027-02-28T22:59:59Z', 'chata-v-zime'],
  ['2027-02-28T23:00:00Z', 'chata-v-lete'],
  ['2028-02-29T22:59:59Z', 'chata-v-zime'],
  ['2028-02-29T23:00:00Z', 'chata-v-lete'],
  ['2027-06-15T12:00:00Z', 'chata-v-lete'],
  ['2027-08-31T21:59:59Z', 'chata-v-lete'],
  ['2027-08-31T22:00:00Z', 'rano-nad-mlhou'],
]) {
  test(`selects ${photo} at ${instant} using Prague time`, () => {
    assert.equal(photoAt(instant), `url('/img/gallery/web/${photo}.webp')`);
    assert.ok(fs.existsSync(path.join(root, `img/gallery/web/${photo}.webp`)));
  });
}

test('keeps the CSS fallback when time-zone support is unavailable', () => {
  assert.equal(photoAt('2026-12-01T12:00:00Z', null), undefined);
});
