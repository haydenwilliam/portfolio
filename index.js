import renderNavbar from "./components/NavBar.js";
import renderMainPage from "./components/MainPage.js";
import renderProjectDetails from "./components/ProjectDetails.js";

document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data loaded successfully:', data);
      
      // Determine what page to render
      const urlParams = new URLSearchParams(window.location.search);
      const projectId = urlParams.get("project");
      const page = projectId == null ? "main" : "project-detail";
      
      if (page === "main") {
        renderNavbar();
        renderMainPage(data);
      } else {
        renderNavbar();
        const project = data.projects.find((p) => p.id == projectId);
        renderProjectDetails(project);
      }
    })
    .catch(error => {
      console.error('Error loading data.json:', error);
    });
}); 