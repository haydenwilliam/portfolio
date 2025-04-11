import renderNavbar from "./components/NavBar.js";
import renderMainPage from "./components/MainPage.js";
import renderProjectDetails from "./components/ProjectDetails.js";

document.addEventListener('DOMContentLoaded', () => {
  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Data loaded successfully:', data);
      
      // Determine what page to render
      const urlParams = new URLSearchParams(window.location.search);
      const projectId = urlParams.get("project");
      
      console.log("projectId:", projectId);
      const page = projectId == null ? "main" : "project-detail";
      
      // Render appropriate page
      if (page === "main") {
        renderNavbar();
        renderMainPage(data);
      } else {
        renderNavbar();
        const project = data.projects.find((p) => p.id == projectId);
        if (project) {
          renderProjectDetails(project);
        } else {
          console.error(`Project with ID ${projectId} not found.`);
          // Show error message and main page as fallback
          const mainContentArea = document.querySelector('.main-content-wrapper');
          if (mainContentArea) {
            mainContentArea.innerHTML = `<div class="container"><p style="text-align: center; padding: 50px;">Project not found.</p></div>`;
          }
        }
      }
    })
    .catch(error => {
      console.error('Error loading data.json:', error);
      // Display an error message to the user on the page
      document.body.innerHTML += `<div style="padding: 20px; color: red; text-align: center;">
        Failed to load content. Please try again later.
        <br>Error: ${error.message}
      </div>`;
    });
}); 