function renderNews(newsItems) {
  const newsSection = document.getElementById('news');
  if (!newsSection) return;

  const gridContainer = newsSection.querySelector('.news-grid');
  if (!gridContainer) {
    console.error('Could not find the .news-grid element.');
    return;
  }
  
  // Add search interface before news grid
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search news-search';
  searchContainer.innerHTML = `
    <input type="search" name="news" placeholder="Search News...">
  `;
  
  // Insert search before the grid
  if (gridContainer.parentNode) {
    gridContainer.parentNode.insertBefore(searchContainer, gridContainer);
  }
  
  // Wrap grid in a container to easily replace its content
  const newsList = document.createElement('div');
  newsList.className = 'newslist';
  
  // Move grid into the list container
  gridContainer.parentNode.insertBefore(newsList, gridContainer);
  newsList.appendChild(gridContainer);
  
  // Render all news initially
  renderNewsItems(newsItems, gridContainer);
  
  // Add event listener for search
  const searchInput = searchContainer.querySelector('input[type="search"]');
  searchInput.addEventListener('input', e => {
    const value = e.target.value.trim();
    
    // Filter news based on search term
    let filtered = newsItems;
    if (value) {
      filtered = newsItems.filter(item => 
        item.title.toLowerCase().includes(value.toLowerCase()) || 
        item.content.toLowerCase().includes(value.toLowerCase()) ||
        `${item.day} ${item.month} ${item.year}`.toLowerCase().includes(value.toLowerCase())
      );
    }
    
    // Re-render news with filtered results
    renderNewsItems(filtered, gridContainer);
  });
}

// Helper function to render news items
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

export default renderNews; 