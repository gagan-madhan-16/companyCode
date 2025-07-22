const DATA_KEY = 'leetcodeProblemsCache';
const DATA_URL = 'problems.json';

let allProblems = [];

document.addEventListener('DOMContentLoaded', async () => {
  const loadingStatus = document.getElementById('loading-status');
  const loadingIndicator = document.getElementById('loading-indicator');

  try {
    loadingStatus.textContent = 'Loading problem data...';
    loadingIndicator.style.display = 'block';

    allProblems = await loadProblemData();
    populateFilters(allProblems);
    renderProblems(allProblems);
  } catch (err) {
    console.error(err);
    loadingStatus.textContent = '❌ Failed to load data';
  } finally {
    loadingIndicator.style.display = 'none';
  }

  document.getElementById('clear-data').onclick = () => {
    localStorage.removeItem(DATA_KEY);
    location.reload();
  };

  document.getElementById('apply-filters').onclick = () => {
    const filtered = applyFilters(allProblems);
    renderProblems(filtered);
  };

  document.getElementById('reset-filters').onclick = () => {
    document.querySelectorAll('.filters select, .filters input').forEach(e => {
      e.value = e.tagName === 'INPUT' ? '0' : '';
    });
    renderProblems(allProblems);
  };

  document.getElementById('search-input').addEventListener('input', () => {
    renderProblems(applyFilters(allProblems));
  });

  document.getElementById('export-csv').onclick = () => {
    exportToCSV(applyFilters(allProblems));
  };
});

async function loadProblemData() {
  const cached = localStorage.getItem(DATA_KEY);
  if (cached) return JSON.parse(cached);

  const res = await fetch(DATA_URL);
  const data = await res.json();
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
  return data;
}

function populateFilters(problems) {
  const companies = new Set();
  const topics = new Set();

  problems.forEach(p => {
    (p.Company || []).forEach(c => companies.add(c));
    (p.Topics || []).forEach(t => topics.add(t));
  });

  const companyFilter = document.getElementById('company-filter');
  companies.forEach(c => companyFilter.append(new Option(c, c)));

  const topicFilter = document.getElementById('topic-filter');
  topics.forEach(t => topicFilter.append(new Option(t, t)));
}

function applyFilters(data) {
  const company = document.getElementById('company-filter').value;
  const difficulty = document.getElementById('difficulty-filter').value;
  const topic = document.getElementById('topic-filter').value;
  const search = document.getElementById('search-input').value.toLowerCase();
  const minFreq = parseFloat(document.getElementById('min-frequency').value || '0');
  const minAcc = parseFloat(document.getElementById('min-acceptance').value || '0');

  return data.filter(p => {
    const matchesCompany = !company || p.Company.includes(company);
    const matchesTopic = !topic || p.Topics.includes(topic);
    const matchesDifficulty = !difficulty || p.Difficulty === difficulty;
    const matchesSearch =
      p.Title.toLowerCase().includes(search) ||
      p.Company.some(c => c.toLowerCase().includes(search)) ||
      p.Topics.some(t => t.toLowerCase().includes(search));
    const matchesFreq = p.Frequency >= minFreq;
    const matchesAcc = p.AcceptanceRate * 100 >= minAcc;

    return matchesCompany && matchesTopic && matchesDifficulty && matchesSearch && matchesFreq && matchesAcc;
  });
}

function renderProblems(problems) {
  const tbody = document.getElementById('problems-body');
  const count = document.getElementById('problem-count');
  const completed = document.getElementById('completed-count');

  tbody.innerHTML = '';
  count.textContent = `${problems.length} problems found`;

  let completedCount = 0;

  problems.forEach((p, idx) => {
    const row = document.createElement('tr');

    const doneCell = document.createElement('td');
    const reviseCell = document.createElement('td');
    const doneBox = document.createElement('input');
    const reviseBox = document.createElement('input');
    doneBox.type = reviseBox.type = 'checkbox';

    if (localStorage.getItem(`done-${p.Link}`) === '1') {
      doneBox.checked = true;
      completedCount++;
    }
    if (localStorage.getItem(`revise-${p.Link}`) === '1') {
      reviseBox.checked = true;
    }

    doneBox.addEventListener('change', () =>
      localStorage.setItem(`done-${p.Link}`, doneBox.checked ? '1' : '0')
    );
    reviseBox.addEventListener('change', () =>
      localStorage.setItem(`revise-${p.Link}`, reviseBox.checked ? '1' : '0')
    );

    doneCell.appendChild(doneBox);
    reviseCell.appendChild(reviseBox);

    row.append(
      doneCell,
      reviseCell,
      td(p.Company.join(', ')),
      td('N/A'), // time period placeholder
      td(p.Difficulty),
      td(`<a href="${p.Link}" target="_blank">${p.Title}</a>`, true),
      td(p.Frequency),
      td((p.AcceptanceRate * 100).toFixed(2) + '%'),
      td(p.Topics.join(', '))
    );

    tbody.appendChild(row);
  });

  completed.textContent = `${completedCount} completed`;
}

function td(content, isHTML = false) {
  const cell = document.createElement('td');
  if (isHTML) cell.innerHTML = content;
  else cell.textContent = content;
  return cell;
}

function exportToCSV(data) {
  const rows = [
    ['Difficulty', 'Title', 'Frequency', 'Acceptance Rate', 'Link', 'Topics', 'Company']
  ];

  data.forEach(p => {
    rows.push([
      p.Difficulty,
      `"${p.Title}"`,
      p.Frequency,
      p.AcceptanceRate,
      p.Link,
      `"${p.Topics.join(', ')}"`,
      `"${p.Company.join(', ')}"`
    ]);
  });

  const blob = new Blob([rows.map(r => r.join(',')).join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'filtered_problems.csv';
  a.click();
  URL.revokeObjectURL(url);
}
