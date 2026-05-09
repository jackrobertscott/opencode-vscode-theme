# Repository Instructions

- Do not edit `themes/opencode-color-theme.json` by hand.
- Theme JSON is generated from `scripts/generate-theme.mjs`; make color or mapping changes in that script first.
- After changing theme generation, run `npm run generate` and commit both the script change and the regenerated JSON.
- Validate generated theme JSON before finishing, for example with `node -e "JSON.parse(require('fs').readFileSync('themes/opencode-color-theme.json', 'utf8'))"`.
