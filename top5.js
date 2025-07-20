const API = 'https://hot-or-not-backend.onrender.com/api/top5';


async function loadTop5() {
  const res = await fetch(API);
  const data = await res.json();

  const hotList = document.getElementById('hot-list');
  const notList = document.getElementById('not-list');

  data.hot.forEach((img, index) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <div class="rank">#${index + 1}</div>
      <img src="http://localhost:3001${img.url}" alt="Hot Image">
      <p>🔥 ${img.hot_votes} / ${img.total_votes} — ${Math.round(img.score * 100)}%</p>
      <a href="http://localhost:3001${img.url}" target="_blank" class="view-btn">🔍 View Full Size</a>
    `;
    hotList.appendChild(div);
  });

  data.not.forEach((img, index) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <div class="rank">#${index + 1}</div>
      <img src="http://localhost:3001${img.url}" alt="Not Image">
      <p>🔥 ${img.hot_votes} / ${img.total_votes} — ${Math.round(img.score * 100)}%</p>
      <a href="http://localhost:3001${img.url}" target="_blank" class="view-btn">🔍 View Full Size</a>
    `;
    notList.appendChild(div);
  });
}

loadTop5();
