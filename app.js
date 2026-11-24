const DATA_URL = "data/sample.json";
const PAGE_SIZE = 5;
let allRecords = [];
let currentPage = 1;
let loaded = false;

const $id = (id) => document.getElementById(id);
const message = (text, type = "info") => {
  const box = $id("message");
  box.className = `alert alert-${type} mb-3`;
  box.textContent = text;
};
const setBusy = (busy) => {
  ["fetchBtn", "ajaxBtn"].forEach(id => $id(id).disabled = busy);
  if (busy) message("Loading JSON data…", "info");
};
const normalizePayload = (payload) => {
  const records = Array.isArray(payload) ? payload : payload?.data;
  if (!Array.isArray(records)) throw new Error("JSON format is invalid: expected a data array.");
  return records;
};
const loadRecords = (payload, method) => {
  allRecords = normalizePayload(payload);
  loaded = true;
  currentPage = 1;
  $id("sourceBadge").className = "badge text-bg-success";
  $id("sourceBadge").textContent = `Loaded via ${method}`;
  $id("searchInput").disabled = false;
  $id("departmentFilter").disabled = false;
  $id("clearBtn").disabled = false;
  const departments = [...new Set(allRecords.map(item => item.department).filter(Boolean))].sort();
  $id("departmentFilter").innerHTML = '<option value="">All departments</option>' +
    departments.map(dept => `<option value="${escapeHtml(dept)}">${escapeHtml(dept)}</option>`).join("");
  $id("totalCount").textContent = allRecords.length;
  $id("activeCount").textContent = allRecords.filter(x => x.status === "Active").length;
  $id("deptCount").textContent = departments.length;
  $id("updatedAt").textContent = new Date().toLocaleString();
  message(`${allRecords.length} records successfully loaded using ${method}.`, "success");
  renderTable();
};
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const getFiltered = () => {
  const term = $id("searchInput").value.trim().toLowerCase();
  const dept = $id("departmentFilter").value;
  return allRecords.filter(item => {
    const haystack = `${item.name} ${item.email} ${item.department} ${item.id}`.toLowerCase();
    return haystack.includes(term) && (!dept || item.department === dept);
  });
};
const renderTable = () => {
  const filtered = getFiltered();
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  currentPage = Math.min(currentPage, pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);
  const body = $id("recordsBody");
  if (!visible.length) {
    body.innerHTML = '<tr><td colspan="6" class="text-center text-secondary py-5">No matching records found.</td></tr>';
  } else {
    body.innerHTML = visible.map((item, index) => `<tr>
      <td>${start + index + 1}</td>
      <td><div class="student-name">${escapeHtml(item.name)}</div><div class="student-id">ST-${String(item.id).padStart(4,"0")}</div></td>
      <td>${escapeHtml(item.email)}</td><td>${escapeHtml(item.department)}</td><td>${escapeHtml(item.semester)}</td>
      <td><span class="badge ${item.status === "Active" ? "status-active" : "status-pending"}">${escapeHtml(item.status)}</span></td>
    </tr>`).join("");
  }
  $id("resultInfo").textContent = filtered.length ? `Showing ${start + 1}–${Math.min(start + PAGE_SIZE, filtered.length)} of ${filtered.length} records` : "0 records found";
  const pagination = $id("pagination");
  pagination.innerHTML = "";
  for (let p = 1; p <= pageCount; p++) {
    const li = document.createElement("li");
    li.className = `page-item ${p === currentPage ? "active" : ""}`;
    const button = document.createElement("button");
    button.className = "page-link"; button.textContent = p;
    button.addEventListener("click", () => { currentPage = p; renderTable(); });
    li.appendChild(button); pagination.appendChild(li);
  }
};
async function loadWithFetch() {
  setBusy(true);
  try {
    const response = await fetch(DATA_URL, {cache:"no-store"});
    if (!response.ok) throw new Error(`Request failed with HTTP ${response.status}`);
    const payload = await response.json();
    loadRecords(payload, "Fetch API");
  } catch (error) {
    message(`Fetch error: ${error.message}. Run this project through Live Server, XAMPP or GitHub Pages.`, "danger");
    $id("sourceBadge").className = "badge text-bg-danger";
    $id("sourceBadge").textContent = "Request failed";
  } finally { setBusy(false); }
}
function loadWithJQuery() {
  setBusy(true);
  if (!window.jQuery) {
    message("jQuery library could not load. Check your internet connection and try again.", "danger");
    setBusy(false); return;
  }
  $.ajax({url: DATA_URL, method:"GET", dataType:"json", cache:false})
    .done(payload => { try { loadRecords(payload, "jQuery AJAX"); } catch (error) { message(error.message, "danger"); } })
    .fail((xhr, status, error) => {
      message(`jQuery AJAX error: ${error || status}. Run this project through Live Server, XAMPP or GitHub Pages.`, "danger");
      $id("sourceBadge").className = "badge text-bg-danger";
      $id("sourceBadge").textContent = "Request failed";
    })
    .always(() => setBusy(false));
}
$id("fetchBtn").addEventListener("click", loadWithFetch);
$id("ajaxBtn").addEventListener("click", loadWithJQuery);
$id("searchInput").addEventListener("input", () => { currentPage = 1; renderTable(); });
$id("departmentFilter").addEventListener("change", () => { currentPage = 1; renderTable(); });
$id("clearBtn").addEventListener("click", () => { $id("searchInput").value = ""; $id("departmentFilter").value = ""; currentPage = 1; renderTable(); });
