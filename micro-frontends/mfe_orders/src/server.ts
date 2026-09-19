import {
    AngularNodeAppEngine,
    createNodeRequestHandler,
    isMainModule,
    writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

// Toggle SSR on/off via environment variable (default: SSR disabled)
const SSR_ENABLED = process.env['SSR_ENABLED'] === 'true';
console.log(`SSR Enabled: ${SSR_ENABLED}`);
const browserDistFolder = join(import.meta.dirname, '../browser');
const ASSET_PREFIX = '/__wf/orders_mfe/';

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Serve static files from /browser at the prefixed path (for gateway/shell integration)
 */
app.use(
    '/__wf/orders_mfe',
    express.static(browserDistFolder, {
        maxAge: '1y',
        index: false,
        redirect: false,
        setHeaders: (res, path) => {
            // Ensure correct MIME types
            if (path.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
            if (path.endsWith('.css')) res.setHeader('Content-Type', 'text/css');
            if (path.endsWith('.woff2')) res.setHeader('Content-Type', 'font/woff2');
        },
    }),
);

/**
 * Serve static files from /browser at unprefixed paths (for direct access)
 */
app.use(
    express.static(browserDistFolder, {
        maxAge: '1y',
        index: false,
        redirect: false,
        setHeaders: (res, path) => {
            // Ensure correct MIME types
            if (path.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
            if (path.endsWith('.css')) res.setHeader('Content-Type', 'text/css');
            if (path.endsWith('.woff2')) res.setHeader('Content-Type', 'font/woff2');
        },
    }),
);

/**
 * Handle all other requests by rendering the Angular application.
 * When SSR is disabled, serve index.html for client-side rendering.
 */
if (SSR_ENABLED) {
    app.use((req, res, next) => {
        angularApp
            .handle(req)
            .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
            .catch((err) => {
                console.error('SSR Error:', err);
                next(err);
            });
    });
} else {
    app.get(/.*/,(req, res) => {
        const indexPath = join(browserDistFolder, 'index.html');
        res.sendFile(indexPath);
    });
}

if (isMainModule(import.meta.url)) {
    const port = process.env['PORT'] || 4204;
    app.listen(port, () => {
        console.log(`MFE Orders server running on port ${port}`);
    });
}

export const reqHandler = createNodeRequestHandler(app);
