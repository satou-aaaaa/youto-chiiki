// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、低い家・高い建物・工場の3つの形。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <path d="M10 82 V60 L22 50 L34 60 V82 Z" fill="#f6d77a"/>
      <rect x="40" y="26" width="20" height="56" fill="#fffdf7"/>
      <path d="M66 82 V56 L76 64 V56 L86 64 V40 H92 V82 Z" fill="#8fb8de"/>
      <line x1="6" y1="83" x2="94" y2="83" stroke="#fffdf7" stroke-width="3"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
