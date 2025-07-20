const API = 'https://hot-or-not-backend.onrender.com/api/top5';
const BASE_URL = 'https://hot-or-not-backend.onrender.com'; 

async function loadTop5() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    const hotList = document.getElementById('hot-list');
    const notList = document.getElementById('not-list');

    data.hot.forEach((img, index) => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <div class="rank">#${index + 1}</div>
        <img src="${BASE_URL}${img.url}" alt="Hot Image">
        <p>🔥 ${img.hot_votes} / ${img.total_votes} — ${Math.round(img.score * 100)}%</p>
        <a href="${BASE_URL}${img.url}" target="_blank" class="view-btn">🔍 View Full Size</a>
      `;
      hotList.appendChild(div);
    });

    data.not.forEach((img, index) => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <div class="rank">#${index + 1}</div>
        <img src="${BASE_URL}${img.url}" alt="Not Image">
        <p>🔥 ${img.hot_votes} / ${img.total_votes} — ${Math.round(img.score * 100)}%</p>
        <a href="${BASE_URL}${img.url}" target="_blank" class="view-btn">🔍 View Full Size</a>
      `;
      notList.appendChild(div);
    });
  } catch (err) {
    console.error('Failed to load leaderboard:', err);
  }
}

loadTop5();
