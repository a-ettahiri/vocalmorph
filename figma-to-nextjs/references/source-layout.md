# Source layout

Unpack one Framelink ZIP per screen.

## Paths

```text
specs/00X-name/
  export/unpacked/<export>.json
  export/unpacked/<export>.assets/*.svg|*.png
  baseline/reference.png
  baseline/manifest.json
  baseline/assets/*.svg
public/figma/*.svg
```

## manifest.json fields

Include at minimum:

```json
{
  "fileKey": "EqW1vze2r9eFrdUdi8ajzp",
  "nodeId": "453:3384",
  "nodeName": "Cookie Policy Page",
  "frameBox": { "width": 1440, "height": 850 },
  "renderBounds": { "width": 1440, "height": 850 },
  "deviceScaleFactor": 2,
  "baseline": { "width": 2880, "height": 1700 },
  "crop": null,
  "sidebar": { "frame": "453:3415 Frame 46 266x850 @ x=48" },
  "zipName": "saas_app_20261010-075444.zip",
  "via": "Framelink Exporter plugin + local unzip (no API calls)"
}
```

`deviceScaleFactor` drives the Playwright gate. `frameBox` 1440x850 is the CSS viewport. Baseline PNG is 2x (2880 wide).

## Rules

- SVGs go to `public/figma/` byte-identical. Never redraw.
- Real examples: `specs/001-user-registration/`, `specs/002-user-login/`, `specs/003-cookies-policy/`.
