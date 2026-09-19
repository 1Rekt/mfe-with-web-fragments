import {
    createNodeRequestHandler,
    isMainModule,
} from '@angular/ssr/node';
import express from 'express';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { FragmentGateway } from 'web-fragments/gateway';
import { getNodeMiddleware } from 'web-fragments/gateway/node';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();

interface MicroFrontendConfig {
    id: string;
    name: string;
    path: string;
    url: string;
    fragmentId: string;
}

// Create and configure the fragment gateway
const gateway = new FragmentGateway({
    // piercingStyles: '' // Styles from host that are applied to fragments?
});

function loadMicroFrontendConfig(): MicroFrontendConfig[] {
    const candidatePaths = [
        join(browserDistFolder, 'assets', 'mfe-config.json'),
        join(process.cwd(), 'src', 'assets', 'mfe-config.json'),
    ];

    for (const candidatePath of candidatePaths) {
        if (!existsSync(candidatePath)) {
            continue;
        }

        return JSON.parse(readFileSync(candidatePath, 'utf8')) as MicroFrontendConfig[];
    }

    console.warn('mfe-config.json not found. Skipping fragment registration for this process.');
    return [];
}

const mfeConfig = loadMicroFrontendConfig();

for (const mfe of mfeConfig) {
    const routePath = mfe.path.startsWith('/') ? mfe.path.slice(1) : mfe.path;

    gateway.registerFragment({
        fragmentId: mfe.fragmentId,
        piercingClassNames: [],
        endpoint: mfe.url,
        routePatterns: [`/__wf/${mfe.id}_mfe/:_*`, `/${routePath}`, `/${routePath}/:_*`],
        piercing: false,
    });
}


// // Logging middleware - logs all requests
// app.use((req, res, next) => {
//     const timestamp = new Date().toISOString();
//     console.log(`[${timestamp}] ${req.method} ${req.url}`);
//     next();
// });

/**
 * Use the web fragments middleware BEFORE serving static files
 * This allows fragment requests to be intercepted and proxied
 */
app.use(getNodeMiddleware(gateway));

/**
 * Serve static files from /browser
 */
app.use(
    express.static(browserDistFolder, {
        maxAge: '1y',
        index: false,
        redirect: false,
    }),
);

/**
 * Handle all other requests by serving the CSR entry point.
 */
app.use((req, res, next) => {
    res.sendFile(join(browserDistFolder, 'index.csr.html'));
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
    const port = process.env['PORT'] || 4200;
    app.listen(port, (error) => {
        if (error) {
            throw error;
        }

        console.log(`Node Express server listening on http://localhost:${port}`);
        console.log('Rendering mode: CSR');
    });
}


/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);

