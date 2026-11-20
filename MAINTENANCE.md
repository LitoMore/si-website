# Maintenance

## Icon catalog

The icon catalog comes from the installed `simple-icons` npm package. `npm ci`
uses the version recorded in `package-lock.json`; updating the catalog requires
updating that dependency, rebuilding, and deploying the site.

The Vite plugin in `build/icon-catalog.ts` packages metadata and SVG paths into a
content-hashed WebAssembly asset. It generates a standard data-only Wasm module
without requiring a Rust or C compiler. The development server serves the same
catalog through a virtual asset.

A module Worker loads and reads the catalog once, calculates brightness, and
builds the fuzzy search index. Search responses contain indices rather than
copying the entire catalog. Cards render cached paths as inline SVG with `fill`;
previews and downloads use the same packaged version and do not fetch individual
icon files from an external CDN. Wasm is the resource container; catalog and
search calculations run as JavaScript inside the Worker.

`npm test` validates the Wasm encoding and catalog contents, builds the site, and
runs lint. The build emits the catalog and Worker beside the other static assets.

## Caching on Cloudflare Pages

The build generates `dist/_headers` with a one-year browser cache rule for each
emitted asset, including the icon catalog and Workers. HTML uses Pages' default
revalidation policy. Missing assets return HTTP 404 through `public/404.html` and
use the default cache policy.

Pages has its own built-in asset cache. A custom domain's `CF-Cache-Status` refers
to a separate CDN cache layer, and `.wasm` is not among that layer's default cached
file extensions. To enable it there too, add a Cloudflare Cache Rule matching the
site hostname, the `/assets/` path prefix, and the `.wasm` suffix, set eligibility
to **Eligible for cache**, and respect the response's cache-control headers.
