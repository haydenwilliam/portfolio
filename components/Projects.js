/**
 * Renders the Projects section with search functionality
 * @param {Array} projects - The projects array from data.json
 */
export default function renderProjects(projects) {
  const projectsSection = document.getElementById('projects');
  if (!projectsSection) return;

  const gridContainer = projectsSection.querySelector('.projects-grid');
  if (!gridContainer) {
    console.error('Could not find the .projects-grid element.');
    return;
  }

  // Add search input before the grid
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search';
  searchContainer.innerHTML = `
    <input type="search" name="projects" placeholder="Search Projects...">
  `;

  // Check if search container already exists
  const existingSearch = projectsSection.querySelector('.search');
  if (!existingSearch) {
    projectsSection.insertBefore(searchContainer, gridContainer);
  }

  // Render all projects initially
  renderProjectItems(projects, gridContainer);

  // Add event listener to search input
  const search = projectsSection.querySelector('.search input');
  if (search) {
    search.addEventListener("input", e => {
      const value = e.target.value;
      
      // Filter projects based on search value
      const filtered = projects.filter(project => {
        const titleMatch = project.title.toLowerCase().includes(value.toLowerCase());
        const descMatch = project.description.toLowerCase().includes(value.toLowerCase());
        const tagMatch = project.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()));
        
        return titleMatch || descMatch || tagMatch;
      });
      
      // Render filtered projects
      renderProjectItems(filtered, gridContainer);
    });
  }
}

/**
 * Renders individual project items
 * @param {Array} projects - The projects to render
 * @param {HTMLElement} container - The container to render projects into
 */
function renderProjectItems(projects, container) {
  container.innerHTML = projects.map(project => `
    <div class="project-card-wrapper">
      <div class="project-card">
        <div class="project-image">
          <div class="project-icon">
            <i class="${project.icon_class}"></i>
          </div>
        </div>
        <div class="project-content">
          <h3>
            <a href="?project=${project.id}" class="project-title-link">${project.title}</a>
          </h3>
          <p>${project.description}</p>
          <div class="project-tags">
            ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
          </div>
          <div class="project-links">
            ${project.github_url ? `<a href="${project.github_url}" target="_blank" class="project-link"><i class="fab fa-github"></i></a>` : ''}
            <a href="?project=${project.id}" class="project-link"><i class="fas fa-info-circle"></i></a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
} 