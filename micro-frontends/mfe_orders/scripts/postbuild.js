import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSET_PREFIX = '/__wf/orders_mfe/';
const BROWSER_DIR = path.join(__dirname, '../dist/mfe-orders/browser');

const filesToProcess = ['index.html', 'index.csr.html'];

function prefixAssetReferences(html) {
  // Prefix Angular build outputs (styles.css, styles-HASH.css, main.js, main-HASH.js, etc.)
  // Handles both hashed (production) and non-hashed (development) builds

  // Prefix Angular CSS (styles.css or styles-HASH.css)
  html = html.replace(/href="(styles(?:-[A-Za-z0-9]+)?\.css)"/g, `href="${ASSET_PREFIX}$1"`);

  // Prefix Angular JS bundles (main.js, polyfills.js, chunk.js or their hashed versions)
  html = html.replace(/src="((main|polyfills|chunk)(?:-[A-Za-z0-9]+)?\.js)"/g, `src="${ASSET_PREFIX}$1"`);

  // Prefix modulepreload links (e.g., rel="modulepreload" href="chunk-XPM3EGED.js")
  html = html.replace(/rel="modulepreload"\s+href="([^"]+\.js)"/g, `rel="modulepreload" href="${ASSET_PREFIX}$1"`);

  return html;
}

for (const file of filesToProcess) {
  const filePath = path.join(BROWSER_DIR, file);

  if (fs.existsSync(filePath)) {
    console.log(`Processing ${file}...`);
    const content = fs.readFileSync(filePath, 'utf8');
    const updated = prefixAssetReferences(content);
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`Updated ${file} with asset prefix: ${ASSET_PREFIX}`);
  } else {
    console.warn(`Warning: ${file} not found at ${filePath}`);
  }
}

console.log('Post-build asset prefixing complete!');
