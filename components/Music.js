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

export default renderMusic; 