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

export default renderContact; 