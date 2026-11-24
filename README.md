# Lab 8 — JSON + jQuery + AJAX/Fetch API Dashboard

## Lab requirements covered
- Reads structured JSON data from a local sample endpoint.
- Makes one request using the Fetch API.
- Makes another request using jQuery `$.ajax()`.
- Renders the returned records into table rows.
- Handles loading, empty, and error states.
- Includes search, department filtering, pagination, refresh via either request button, and last-updated timestamp.

## Folder structure
```text
api-dashboard/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── data/
    └── sample.json
```

## Run locally
Do not open `index.html` by double-clicking it (`file://`), because browsers commonly block Fetch/AJAX requests to local files.
1. Extract this ZIP.
2. Open the extracted folder in VS Code.
3. Start VS Code Live Server, or put the folder inside XAMPP `htdocs` and start Apache.
4. Open the local HTTP address provided by Live Server/XAMPP.
5. Click **Load with Fetch** and then **Load with jQuery**.

## GitHub Pages
Upload the extracted folder contents (not the ZIP). Keep `index.html` at the repository root and preserve `css`, `js`, and `data` folder names. Enable Pages from Settings → Pages → Deploy from a branch → `main` → `/(root)`.

## Notes
- Bootstrap and jQuery are loaded from CDNs, so an internet connection is needed for their libraries.
- The student data is sample data in `data/sample.json`; no backend/database is used.
- The JSON request runs over HTTP when hosted with Live Server, XAMPP, or GitHub Pages.
