function renderProjects(projects) {
  const projectsSection = document.getElementById('projects');
  if (!projectsSection) return;

  const gridContainer = projectsSection.querySelector('.projects-grid');
  if (!gridContainer) {
    console.error('Could not find the .projects-grid element.');
    return;
  }

  // Add search interface before projects grid
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search projects-search';
  searchContainer.innerHTML = `
    <input type="search" name="projects" placeholder="Search Projects...">
  `;
  
  // Insert search before the grid
  if (gridContainer.parentNode) {
    gridContainer.parentNode.insertBefore(searchContainer, gridContainer);
  }
  
  // Wrap grid in a container to easily replace its content
  const projectsList = document.createElement('div');
  projectsList.className = 'projects-list';
  
  // Move grid into the list container
  gridContainer.parentNode.insertBefore(projectsList, gridContainer);
  projectsList.appendChild(gridContainer);
  
  // Render all projects initially
  renderProjectItems(projects, gridContainer);
  
  // Add event listener for search
  const searchInput = searchContainer.querySelector('input[type="search"]');
  searchInput.addEventListener('input', e => {
    const value = e.target.value.trim();
    
    // Filter projects based on search term
    let filtered = projects;
    if (value) {
      filtered = projects.filter(project => 
        project.title.toLowerCase().includes(value.toLowerCase()) || 
        project.description.toLowerCase().includes(value.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
      );
    }
    
    // Re-render projects with filtered results
    renderProjectItems(filtered, gridContainer);
  });
}

// Helper function to render project items
function renderProjectItems(projects, container) {
  container.innerHTML = projects.map(project => `
    <div class="project-card-wrapper" data-category="${project.tags[0].toLowerCase()}">
      <div class="project-card">
        <div class="project-image">
          <div class="project-icon">
            <i class="${project.icon_class}"></i>
          </div>
        </div>
        <div class="project-content">
          <h3><a href="?project=${project.id}" class="project-title-link">${project.title}</a></h3> 
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

export default renderProjects; 