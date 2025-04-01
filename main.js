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
      // Call render functions here
      renderAbout(data.about);
      renderProjects(data.projects);
      renderNews(data.news);
      renderMusic(data.music);
      renderPhotography(data.photography);
      renderContact(data.contact);
      // Handle URL parameters for project details (will implement later)
      handleRouting(data);
    })
    .catch(error => {
      console.error('Error loading data.json:', error);
      // Optionally display an error message to the user on the page
    });
});

// --- Render Functions --- 

function renderAbout(about) {
  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;

  const contentContainer = aboutSection.querySelector('.about-content');
  if (!contentContainer) return;

  // Clear existing static content (optional, depends if placeholder is empty)
  // contentContainer.innerHTML = ''; 

  const aboutHTML = `
    <div class="about-image">
      <div class="image-placeholder">
        <img src="${about.image}" alt="${about.alt_text}">
      </div>
    </div>
    <div class="about-text">
      ${about.bio.map(p => `<p>${p}</p>`).join('')}
      <div class="about-cta">
        <a href="${about.cv_path}" class="btn primary btn-fixed-width" target="_blank"><i class="fas fa-file-alt"></i> Download CV</a>
      </div>
    </div>
  `;
  
  // Check if the target div for insertion exists
  const targetElement = aboutSection.querySelector('.about-content'); 
  if (targetElement) {
    targetElement.innerHTML = aboutHTML;
  } else {
      console.error('Could not find the .about-content element to render About section.');
  }
}

function renderProjects(projects) {
  const projectsSection = document.getElementById('projects');
  if (!projectsSection) return;

  const gridContainer = projectsSection.querySelector('.projects-grid');
  if (!gridContainer) {
    console.error('Could not find the .projects-grid element.');
    return;
  }

  gridContainer.innerHTML = projects.map(project => `
    <div class="project-card-wrapper">
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
            <!-- Add link for project page if needed -->
             <a href="?project=${project.id}" class="project-link"><i class="fas fa-info-circle"></i></a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderNews(newsItems) {
  const newsSection = document.getElementById('news');
  if (!newsSection) return;

  const gridContainer = newsSection.querySelector('.news-grid');
  if (!gridContainer) {
      console.error('Could not find the .news-grid element.');
      return;
  }

  gridContainer.innerHTML = newsItems.map(item => `
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

function renderMusic(music) {
    const musicSection = document.getElementById('music');
    if (!musicSection) return;

    const musicContent = musicSection.querySelector('.music-content');
    const upcomingEvents = musicSection.querySelector('.upcoming-events');

    if (musicContent) {
        musicContent.innerHTML = `
            <div class="music-info">
                <h3>${music.title}</h3>
                <p>${music.bio}</p>
                <div class="music-platforms">
                    <a href="${music.soundcloud_profile_url}" target="_blank" class="platform-link"><i class="fab fa-soundcloud"></i> SoundCloud</a>
                </div>
            </div>
            <div class="music-player">
                <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" 
                    src="${music.soundcloud_embed_url}">
                </iframe>
            </div>
        `;
    } else {
        console.error('Could not find .music-content element.');
    }

    if (upcomingEvents) {
        const eventsList = upcomingEvents.querySelector('.events-list');
        if (eventsList) {
            upcomingEvents.querySelector('h3').textContent = music.upcoming_events_title;
            eventsList.innerHTML = music.events.map(event => `
                <div class="event-card">
                    <div class="event-date">
                        <span class="day">${event.day}</span>
                        <span class="month">${event.month}</span>
                    </div>
                    <div class="event-details">
                        <h4>${event.title}</h4>
                        <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                        <p class="event-time"><i class="far fa-clock"></i> ${event.time}</p>
                    </div>
                    <a href="${event.details_url}" class="event-link">Details</a>
                </div>
            `).join('');
        } else {
            console.error('Could not find .events-list element.');
        }
    } else {
        console.error('Could not find .upcoming-events element.');
    }
}

function renderPhotography(photos) {
    const photographySection = document.getElementById('photography');
    if (!photographySection) return;

    const gallery = photographySection.querySelector('.gallery');
    if (gallery) {
        gallery.innerHTML = photos.map(photo => `
            <div class="gallery-item">
                <img src="${photo.src}" alt="${photo.alt}" loading="lazy">
            </div>
        `).join('');
    } else {
        console.error('Could not find .gallery element.');
    }
}

function renderContact(contact) {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const contactInfo = contactSection.querySelector('.contact-info');
    // Assuming the form remains static or handled separately

    if (contactInfo) {
        contactInfo.innerHTML = `
            <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <h3>Email</h3>
                <p>${contact.email}</p>
            </div>
            <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <h3>Location</h3>
                <p>${contact.location}</p>
            </div>
            <div class="social-links">
                ${contact.social_links.map(link => `
                    <a href="${link.url}" target="_blank" class="social-link"><i class="${link.icon_class}"></i></a>
                `).join('')}
            </div>
        `;
    } else {
        console.error('Could not find .contact-info element.');
    }
}

// --- Routing --- 

function handleRouting(data) {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("project");

  // Select the main content area where sections will be rendered or cleared.
  // Use the existing wrapper or a more specific container if available.
  const mainContentArea = document.querySelector('.main-content-wrapper'); 
  
  if (!mainContentArea) {
      console.error('Main content area (.main-content-wrapper) not found.');
      return;
  }

  if (projectId == null) {
    console.log("Rendering main page");
    // Ensure all sections are visible - remove any 'hidden' class if used previously
    mainContentArea.querySelectorAll('section[id]').forEach(sec => sec.style.display = ''); 
    // Re-render main page content (already done by initial calls)
    // No need to call renderMainPage() again if individual sections are rendered above.

  } else {
    console.log(`Rendering project details for: ${projectId}`);
    const project = data.projects.find((p) => p.id == projectId);
    if (project) {
        // Hide all main sections first
        mainContentArea.querySelectorAll('section[id]').forEach(sec => {
            // Keep header visible, hide others
            if (sec.id !== 'hero') { // Assuming hero is outside main-content-wrapper or should persist
               sec.style.display = 'none';
            }
        });
      renderProjectDetails(project, mainContentArea); // Pass the container
    } else {
      console.error(`Project with ID ${projectId} not found.`);
      // Optionally display a 'Project not found' message
       mainContentArea.innerHTML = `<div class="container"><p style="text-align: center; padding: 50px;">Project not found.</p></div>`;
    }
  }
}

function renderProjectDetails(project, containerElement) {
  // Create a new section for the project details or find a dedicated one
  let detailSection = containerElement.querySelector('#project-detail-section');
  if (!detailSection) {
      detailSection = document.createElement('section');
      detailSection.id = 'project-detail-section';
      detailSection.className = 'project-detail scroll-reveal'; // Add classes if needed
      containerElement.appendChild(detailSection);
  }
  
  detailSection.style.display = ''; // Make sure it's visible
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
         
         <a href="/" class="btn secondary" style="margin-top: 30px;"> <i class="fas fa-arrow-left"></i> Back to Portfolio</a>
      </div>
    </div>
  `;
  
  // Scroll to the newly added/updated section
  detailSection.scrollIntoView({ behavior: 'smooth' });
  
  // Trigger scroll-reveal if used
  setTimeout(() => detailSection.classList.add('scrolled'), 100);
} 