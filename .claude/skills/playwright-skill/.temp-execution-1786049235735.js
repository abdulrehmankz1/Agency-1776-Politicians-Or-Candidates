const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT = 'C:/Users/user/Documents/development/claude-projects/Agency-1776-Politicians-Or-Candidates';
const LOGO = path.join(ROOT, 'public/logo-agency-dark.png'); // white AGENCY + red 1776 (transparent)
const APP_DIR = path.join(ROOT, 'src/app');

(async () => {
  const b64 = fs.readFileSync(LOGO).toString('base64');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const out = await page.evaluate(async (b64) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await img.decode();
    const W = img.naturalWidth, H = img.naturalHeight;

    // scan for the RED "1776" pixels (AGENCY is white, so it's excluded)
    const sc = document.createElement('canvas');
    sc.width = W; sc.height = H;
    const scx = sc.getContext('2d');
    scx.drawImage(img, 0, 0);
    const d = scx.getImageData(0, 0, W, H).data;
    let minX = W, minY = H, maxX = 0, maxY = 0, found = false;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        const r = d[i], g = d[i + 1], b = d[i + 2], a = d[i + 3];
        if (a > 60 && r > 90 && r > g + 30 && r > b + 30) {
          found = true;
          if (x < minX) minX = x; if (x > maxX) maxX = x;
          if (y < minY) minY = y; if (y > maxY) maxY = y;
        }
      }
    }
    if (!found) return { error: 'no red pixels found' };
    const cw = maxX - minX + 1, ch = maxY - minY + 1;

    function roundRect(ctx, x, y, w, h, radii) {
      ctx.beginPath();
      ctx.moveTo(x + radii, y);
      ctx.arcTo(x + w, y, x + w, y + h, radii);
      ctx.arcTo(x + w, y + h, x, y + h, radii);
      ctx.arcTo(x, y + h, x, y, radii);
      ctx.arcTo(x, y, x + w, y, radii);
      ctx.closePath();
    }

    function tile(size, pad, radius) {
      const t = document.createElement('canvas');
      t.width = size; t.height = size;
      const g = t.getContext('2d');
      // dark brand tile
      const grad = g.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, '#141414');
      grad.addColorStop(1, '#080808');
      g.fillStyle = grad;
      roundRect(g, 0, 0, size, size, radius);
      g.fill();
      // hairline accent border
      g.lineWidth = Math.max(2, size * 0.012);
      g.strokeStyle = 'rgba(191,10,48,0.55)';
      roundRect(g, g.lineWidth / 2, g.lineWidth / 2, size - g.lineWidth, size - g.lineWidth, radius - g.lineWidth / 2);
      g.stroke();
      // fit the red "1776" crop, centered
      const inner = size - 2 * pad;
      const scale = Math.min(inner / cw, inner / ch);
      const dw = cw * scale, dh = ch * scale;
      const dx = (size - dw) / 2, dy = (size - dh) / 2;
      g.drawImage(img, minX, minY, cw, ch, dx, dy, dw, dh);
      return t.toDataURL('image/png');
    }

    return {
      bbox: [minX, minY, cw, ch],
      imgSize: [W, H],
      icon512: tile(512, 84, 104),
      apple180: tile(180, 26, 38),
      icon32: tile(32, 4, 7),
    };
  }, b64);

  await browser.close();

  if (out.error) { console.log('ERROR:', out.error); return; }
  console.log('logo size:', out.imgSize, '| red bbox [x,y,w,h]:', out.bbox);

  const save = (dataUrl, file) => {
    const base = dataUrl.split(',')[1];
    fs.writeFileSync(file, Buffer.from(base, 'base64'));
    console.log('wrote', file);
  };
  save(out.icon512, path.join(APP_DIR, 'icon.png'));
  save(out.apple180, path.join(APP_DIR, 'apple-icon.png'));
  // small preview for review
  save(out.icon32, path.join('C:/Users/user/AppData/Local/Temp/claude/C--Users-user-Documents-development-claude-projects-Agency-1776-Politicians-Or-Candidates/19d6c474-fc40-4a52-9774-57658ac9c8f8/scratchpad', 'favicon-32-preview.png'));
  save(out.icon512, path.join('C:/Users/user/AppData/Local/Temp/claude/C--Users-user-Documents-development-claude-projects-Agency-1776-Politicians-Or-Candidates/19d6c474-fc40-4a52-9774-57658ac9c8f8/scratchpad', 'favicon-512-preview.png'));
})();
