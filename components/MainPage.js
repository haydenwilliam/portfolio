import renderAbout from './About.js';
import renderProjects from './Projects.js';
import renderMusic from './Music.js';
import renderPhotography from './Photography.js';
import renderNews from './News.js';
import renderContact from './Contact.js';

function renderMainPage(data) {
  // Ensure hero section is visible
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.style.display = '';
  }

  // Ensure all sections are visible
  const mainContentArea = document.querySelector('.main-content-wrapper');
  if (mainContentArea) {
    mainContentArea.querySelectorAll('section[id]').forEach(sec => {
      sec.style.display = '';
    });
  }

  // Call render functions for each section
  renderAbout(data.about);
  renderProjects(data.projects);
  renderNews(data.news);
  renderMusic(data.music);
  renderPhotography(data.photography);
  renderContact(data.contact);
}

export default renderMainPage; 