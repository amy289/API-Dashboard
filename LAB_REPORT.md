# Lab 8 Report — JSON + jQuery + AJAX/Fetch: API Dashboard

## Objective
Understand JSON structure, consume APIs, handle asynchronous requests, show loading and error states, and compare jQuery AJAX with Fetch.

## Required Tools
JavaScript, jQuery, Fetch API, JSON and Browser DevTools.

## Implementation
A sample JSON file is stored at `data/sample.json`. The dashboard loads this data in two separate ways: Fetch API and jQuery `$.ajax()`. Both responses are validated and rendered dynamically as table rows. The interface includes loading, success and error messages, search, department filtering, pagination, summary counts and a last-updated timestamp.

## Procedure
1. Created the sample JSON data first so the lab can run without a third-party API.
2. Loaded JSON using Fetch and parsed the response.
3. Rendered records dynamically into the HTML table.
4. Added loading and error handling.
5. Repeated the request using jQuery AJAX.
6. Used the browser Network tab to inspect the JSON request and response.

## Result
The dashboard displays sample student records and demonstrates both Fetch and jQuery AJAX. Search, department filtering and pagination help inspect the returned records.

## Troubleshooting
- **CORS / local file issue:** serve the project over HTTP using Live Server or XAMPP instead of opening the HTML file through `file://`.
- **JSON parse error:** inspect `data/sample.json` and confirm it contains valid JSON.
- **Nothing renders:** inspect the returned object and confirm it contains a `data` array.
- **jQuery unavailable:** check internet connection and the jQuery CDN script in the browser Network tab.

## Evidence to Attach
1. Dashboard after loading records with Fetch.
2. Dashboard after loading records with jQuery AJAX.
3. Search/filter result and browser Network tab showing the JSON request.

## Conclusion
The lab demonstrates asynchronous JSON loading using Fetch and jQuery AJAX, dynamic rendering, and handling of loading, empty and error states.

## Limitation
This project uses a local sample JSON file and is a frontend API demonstration; it is not connected to a live database or production API.
