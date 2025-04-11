/**
 * Renders the About section
 * @param {Object} about - The about data from data.json
 */
export default function renderAbout(about) {
  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;

  const contentContainer = aboutSection.querySelector('.about-content');
  if (!contentContainer) return;

  const aboutHTML = `
    <div class="about-image">
      <div class="image-placeholder">
        <img src="${about.image}" alt="${about.alt_text}">
      </div>
    </div>
    <div class="about-text">
      ${about.bio.map(p => `<p>${p}</p>`).join('')}
      <div class="about-cta">
        <a href="${about.cv_path}" class="btn primary btn-fixed-width" target="_blank">
          <i class="fas fa-file-alt"></i> Download CV
        </a>
      </div>
    </div>
  `;
  
  contentContainer.innerHTML = aboutHTML;
} 