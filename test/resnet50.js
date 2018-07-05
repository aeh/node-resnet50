const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const tests = fs.readdirSync(path.resolve(__dirname, 'images'));
const resnet = require('..');

describe('resnet50', () => {
  tests.forEach(file => {
    const match = file.match(/^(.*)_(\d+)\.png$/);
    if (!match) return;

    const [, title, category] = match;
    it(`should match a ${title}`, async () => {
      const img = await sharp(path.resolve(__dirname, 'images', file)).raw().toBuffer();
      expect(resnet(img)).to.equal(parseInt(category));
    });
  });
});
