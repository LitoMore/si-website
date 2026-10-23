# 3D Magnets

The fridge magnet workshop lives at `/3d`. Open it from the application menu,
next to Icon Previewer. The shared BackHome button returns to the gallery through the site
router, including deployments with a base path. `/3d?slug=figma` selects an icon
on initial load; the default icon and the fallback for an unknown slug are
Simple Icons (`simpleicons`).

The workshop uses the site’s shared Light, Dark and Auto theme preference and
all 25 site languages. Its CSS is scoped to `.magnet-workshop`, and its layout owns a scroll area
because the gallery locks body scrolling. Its navigation reuses the same
BackHome and Controls components as Icon Previewer and Open Graph Generator.
Controls, export hints, errors and help follow the same language preference.
Arabic uses a right-to-left layout. Gallery-specific settings are hidden here.
Theme and language changes preserve model settings and print colors.
Color presets keep their base and icon roles when choosing another icon. Only
the colors linked to the brand update; white, black and manually chosen colors
stay fixed. Swap exchanges these roles too, and Reset restores brand on white.
Loading indicators reuse the home page spinner.
Typography inherits the site's system font, with shared sizes and weights for
headings, controls and supporting text. Helper text and package credits stay
at 12 px, with stronger secondary text colors in both themes.
Three.js, Manifold WASM and the workshop stylesheet load with this route. The
3MF exporter is loaded only when exporting.

SVG contours are prepared on the main thread, then Manifold builds the model
in a module worker. Preview and 3MF keep the base and relief separate; the
expensive solid union runs in the worker only when exporting STL. Weight uses
the sum of the two non-overlapping solids. Curve sampling and print precision
are unchanged. The eight most recently requested models share cached builds,
keyed by icon version, path and geometry settings. Failed builds are evicted.
Color changes update preview materials without rebuilding geometry or the
WebGL renderer. Selecting another icon skips the slider's 100 ms debounce.

## Shapes and placement

- Outline: 50 mm longest overall side, with a 2.5 mm outward border and round
  joins. Enclosed backing holes are filled; logo counters remain recessed.
- Rounded square: 50 mm sides, 11 mm corner radius, 76% icon scale.
- Circle: 50 mm diameter, 70% icon scale.
- The base is 3 mm thick and the raised icon is 1 mm thick by default.

The defaults follow the Fanfou magnets from the neighboring `xiaofan-ios`
project. Square and circle scales are independent. Their Icon position controls
share horizontal and vertical offsets, in 0.1 mm increments. Positive X moves
right; positive Y moves up. Recenter resets both. Outline mode retains but
ignores these offsets. Unsupported overhangs block export until corrected.

The preview retains the Badge3D lighting rig, unlit colored faces and softly
lit walls. Changing preview orientation does not change exported geometry.

## Exports

- 3MF uses `three-3mf-exporter`, with the same Bambu project configuration as
  Badge3D. Open as a project in Bambu Studio and assign filaments to `Magnet base` and each `Logo part`. Confirm printer and material settings before
  slicing; the exporter defaults to Bambu Lab A1, 0.4 mm nozzle and PLA.
- STL is a single fused solid in millimeters, without color data.
- SVG preserves true dimensions and the base and icon paths.
- PNG has a transparent background and a 2048 px longest side.

`svg-path-areas-splitter` separates the icon into colorable regions. The original
fill clips those regions to preserve counters, prevent overlaps and recover
any omitted islands. Every region uses the same icon transform.

## Maintenance

Source is in `src/components/magnets`; the route adapter is
`src/layouts/magnets-layout.tsx`. No files from the old `3d-icon` checkout are
needed at runtime or build time.

The tool shares the site's `useIcons` catalogue. App loads the Simple Icons
version and JSON metadata through the existing jsDelivr helpers. Visible icon
thumbnails use `getMaskStyles`, search uses `useSearcher`, and the selected
icon's SVG is fetched with `getSvg` from the same package version on jsDelivr.
There is no complete icon path catalogue bundled with the tool.
The picker keeps the catalogue's default order and uses the same
`react-virtuoso` virtual grid as the home gallery, with continuous scrolling
instead of pagination. Searching or clearing the search returns the list to
the top while preserving the selected icon and model settings.

`getSvg` shares requests and successful responses by versioned URL across
consumers. Failed HTTP requests or invalid SVGs are evicted so Retry can fetch
again. The selected icon's path loader ignores stale responses after selection
or version changes. Preview and export remain blocked until the current path
and model are ready. The layout also offers retry when the metadata list fails.

```sh
npm run lint
npx tsc --noEmit
npm run build
```
