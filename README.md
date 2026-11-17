# si-website

WIP - The Simple Icons new website

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
runs lint. The build emits the catalog and Worker beside the other static assets,
including when using `VITE_BASE_URL` for a subdirectory deployment.
