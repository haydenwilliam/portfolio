import renderAbout from './About.js';
import renderProjects from './Projects.js';
import renderNews from './News.js';
import renderMusic from './Music.js';
import renderPhotography from './Photography.js';
import renderContact from './Contact.js';

/**
 * Renders the main page by coordinating all section components
 * @param {Object} data - The full data object from data.json
 */
export default function renderMainPage(data) {
  // Make all sections visible (in case they were hidden by project detail view)
  const mainContentArea = document.querySelector('.main-content-wrapper');
  if (mainContentArea) {
    mainContentArea.querySelectorAll('section[id]').forEach(sec => {
      sec.style.display = '';
    });
  }
  
  // Render each section
  renderAbout(data.about);
  renderProjects(data.projects);
  renderNews(data.news);
  renderMusic(data.music);
  renderPhotography(data.photography);
  renderContact(data.contact);

  // Hide project detail section if it exists
  const projectDetailSection = document.getElementById('project-detail-section');
  if (projectDetailSection) {
    projectDetailSection.style.display = 'none';
  }
} 