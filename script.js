const API_BASE = 'https://hot-or-not-backend.onrender.com/api'; 

const personImg = document.getElementById('person-img');
const personTitle = document.getElementById('person-title');

let people = [];
let currentIndex = 0;

async function fetchImages() {
  try {
    const res = await fetch(`${API_BASE}/images`);
    people = await res.json();
    if (people.length > 0) showPerson(currentIndex);
    else {
      personImg.src = '';
      personTitle.innerText = 'No images available';
    }
  } catch (err) {
    console.error('Failed to fetch images:', err);
  }
}

function showPerson(index) {
  const p = people[index];
  personImg.src = `${API_BASE.replace('/api', '')}${p.url}`; 
  personTitle.innerText = `🔥 ${p.hot_votes} / ${p.total_votes} — Score: ${p.rating || 'N/A'}`;
}

async function vote(type) {
  if (!people[currentIndex]) return;

  const id = people[currentIndex].id;
  try {
    const res = await fetch(`${API_BASE}/vote/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vote: type })
    });
    if (res.ok) {
      currentIndex = (currentIndex + 1) % people.length;
      await fetchImages();
    }
  } catch (err) {
    console.error('Voting failed:', err);
  }
}

document.getElementById('fileInput').addEventListener('change', async function () {
  const file = this.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    console.log('Uploaded:', data);

    await fetchImages();
    currentIndex = people.findIndex(p => p.id === data.id);
    showPerson(currentIndex);
  } catch (err) {
    console.error('Upload failed:', err);
  }
});

fetchImages();

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  document.getElementById('themeToggle').textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});





