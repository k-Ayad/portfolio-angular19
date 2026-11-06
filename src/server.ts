import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import compression from 'compression';
import express from 'express';
import projectData from './app/core/data/projects.json';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const browserDistFolder = join(dirname(fileURLToPath(import.meta.url)), '../browser');

const app = express();
// Hosts the app answers for. NG_ALLOWED_HOSTS (comma separated) adds more, e.g. the default App Hosting URL.
const angularApp = new AngularNodeAppEngine({
  allowedHosts: ['k-ayad.com', 'www.k-ayad.com'],
});

app.use(compression());

// Old /project/<id or slug> URLs: permanent redirect to /work/<slug> (unknown or removed projects go to /portfolio)
const legacyProjectSlugs = new Map<string, string>(
  projectData.projects.filter((project) => !('hidden' in project)).flatMap((project) => project.legacyIds.map((id): [string, string] => [id, project.slug])),
);

app.get('/project/:id', (req, res) => {
  const slug = legacyProjectSlugs.get(req.params['id']);
  res.redirect(301, slug ? `/work/${slug}` : '/portfolio');
});

/**
 * Serve static files (prerendered pages, assets, the built JS and CSS) from /browser.
 * Prerendered HTML is served by the Angular engine below, so `index` is off.
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Everything else goes through Angular: prerendered routes, redirects and the 404 page.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Nothing matched (e.g. /work/unknown-slug): render the Angular 404 page, which answers with HTTP 404 and noindex
 */
app.use((req, res, next) => {
  const notFoundUrl = new URL('/__not-found', `${req.protocol}://${req.get('host')}`);
  angularApp
    .handle(new Request(notFoundUrl))
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server when this file is the entry point (node dist/portfolio/server/server.mjs).
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
