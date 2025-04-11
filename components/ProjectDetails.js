/**
 * Renders the Project Details page
 * @param {Object} project - The project data for the selected project
 */
export default function renderProjectDetails(project) {
  if (!project) {
    console.error('No project data provided to renderProjectDetails');
    return;
  }

  // Select the main content area
  const mainContentArea = document.querySelector('.main-content-wrapper');
  if (!mainContentArea) {
    console.error('Main content area (.main-content-wrapper) not found.');
    return;
  }

  // Hide all main sections first
  mainContentArea.querySelectorAll('section[id]').forEach(sec => {
    // Keep header visible, hide others
    if (sec.id !== 'hero') {
      sec.style.display = 'none';
    }
  });

  // Create or select the project detail section
  let detailSection = document.getElementById('project-detail-section');
  if (!detailSection) {
    detailSection = document.createElement('section');
    detailSection.id = 'project-detail-section';
    detailSection.className = 'project-detail scroll-reveal';
    mainContentArea.appendChild(detailSection);
  }

  // Make sure it's visible
  detailSection.style.display = '';
  
  // Render the project details
  detailSection.innerHTML = `
    <div class="container">
      <h2 class="section-title">${project.title}</h2>
      <div class="project-detail-content" style="padding: 20px; background: var(--bg-secondary); border-radius: 8px; margin-top: 30px;">
        <p style="margin-bottom: 20px;">${project.description}</p>
        
        <div style="margin-bottom: 20px;">
          <strong>Tags:</strong> 
          <div class="project-tags" style="margin-top: 10px;">
            ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
          </div>
        </div>

        <div class="project-links" style="margin-bottom: 20px;">
          ${project.github_url ? `<a href="${project.github_url}" target="_blank" class="btn primary"><i class="fab fa-github"></i> View on GitHub</a>` : ''}
          <!-- Add other links if available in JSON -->
        </div>
        
        <!-- Placeholder for more project details like images, videos, etc. -->
        <!-- You would add more fields to your JSON and render them here -->
        
        <a href="/" class="btn secondary" style="margin-top: 30px;"><i class="fas fa-arrow-left"></i> Back to Portfolio</a>
      </div>
    </div>
  `;
} 