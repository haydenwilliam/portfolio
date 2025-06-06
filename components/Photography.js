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

export default renderPhotography; 