/**
 * Renders the News section with search functionality
 * @param {Array} newsItems - The news array from data.json
 */
export default function renderNews(newsItems) {
  const newsSection = document.getElementById('news');
  if (!newsSection) return;

  const gridContainer = newsSection.querySelector('.news-grid');
  if (!gridContainer) {
    console.error('Could not find the .news-grid element.');
    return;
  }

  // Add search container before the grid
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search';
  searchContainer.innerHTML = `
    <input type="search" name="news" placeholder="Search News...">
  `;

  // Check if search container already exists
  const existingSearch = newsSection.querySelector('.search');
  if (!existingSearch) {
    newsSection.insertBefore(searchContainer, gridContainer);
  }

  // Add newslist container to hold news items
  if (!gridContainer.classList.contains('newslist')) {
    gridContainer.classList.add('newslist');
  }

  // Render all news items initially
  renderNewsItems(newsItems, gridContainer);

  // Add event listener to search input
  const search = newsSection.querySelector('.search input');
  if (search) {
    search.addEventListener("input", e => {
      console.log(e.currentTarget);
      console.log(e.target);
      console.log(e.target.value);
      
      const value = e.target.value;
      
      // Filter news based on search value
      const filtered = newsItems.filter(newsItem => {
        const titleMatch = newsItem.title.toLowerCase().includes(value.toLowerCase());
        const contentMatch = newsItem.content.toLowerCase().includes(value.toLowerCase());
        const dateMatch = `${newsItem.day} ${newsItem.month} ${newsItem.year}`.toLowerCase().includes(value.toLowerCase());
        
        return titleMatch || contentMatch || dateMatch;
      });
      
      console.log(filtered);
      
      // Get the newslist container
      const list = gridContainer;
      console.log(list);
      
      // Render filtered news
      renderNewsItems(filtered, list);
    });
  }
}

/**
 * Renders individual news items
 * @param {Array} newsItems - The news items to render
 * @param {HTMLElement} container - The container to render news into
 */
function renderNewsItems(newsItems, container) {
  container.innerHTML = newsItems.map(item => `
    <div class="news-card">
      <div class="news-content">
        <div class="news-date">
          <span class="day">${item.day}</span>
          <span class="month">${item.month}</span>
          <span class="year">${item.year}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.content}</p>
      </div>
    </div>
  `).join('');
} 