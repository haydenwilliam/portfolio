/**
 * Custom Scrollbar Implementation
 * Features:
 * - Scroll progress indicator
 * - Smooth scrolling to sections
 * - Scroll-based animations
 * - Quote rotation
 * - Section navigation with URL hash updates
 * - Active section highlighting
 */

document.addEventListener('DOMContentLoaded', function() {
  // Create scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  // Update scroll progress indicator
  window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // Quote rotation feature
  const quotes = [
    {
      text: '"Whatever this is that I am, it is a little flesh and breath."',
      author: 'Marcus Aurelius'
    },
    {
      text: '"The mystery of life isn\'t a problem to solve, but a reality to experience."',
      author: 'Frank Herbert, Dune'
    },
    {
      text: '"Do what you can, with what you have, where you are."',
      author: 'Theodore Roosevelt'
    },
    {
      text: '"Your time is limited, so don\'t waste it living someone else\'s life."',
      author: 'Steve Jobs'
    },
    {
      text: '"The Great Axe Hath Not Yet Swung"',
      author: 'Unknown'
    },
    {
      text: '"Then the Lord answered me and said: Write down the vision Make it plain upon tablets, so that the one who reads it may run. For the vision is a witness for the appointed time, a testimony to the end; it will not disappoint. If it delays, wait for it, it will surely come, it will not be late."',
      author: 'Habakkuk 2:2-3'
    },
    {
      text: '"No man would find an abiding strangeness on the Moon unless he were the sort of man who could find it in his own back garden"',
      author: 'C.S. Lewis'
    }
  ];

  // Get the quote container elements
  const heroQuote = document.querySelector('.hero-quote');
  
  if (heroQuote) {
    let currentQuoteIndex = 0;
    let quoteInterval;
    
    // Get existing quote elements
    const quoteText = heroQuote.querySelector('p');
    const quoteAuthor = heroQuote.querySelector('cite');
    
    // Create quote content wrapper
    const quoteContent = document.createElement('div');
    quoteContent.className = 'quote-content';
    
    // Move elements into the wrapper
    if (quoteText && quoteAuthor) {
      heroQuote.insertBefore(quoteContent, quoteText);
      quoteContent.appendChild(quoteText);
      quoteContent.appendChild(quoteAuthor);
    }

    // Create quote indicators
    const quoteIndicators = document.createElement('div');
    quoteIndicators.className = 'quote-indicators';
    
    // Create dots for each quote
    quotes.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = 'quote-dot';
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('data-index', index);
      quoteIndicators.appendChild(dot);
    });
    
    // Add indicators after the quote
    heroQuote.appendChild(quoteIndicators);
    
    // Add click event listeners to dots
    document.querySelectorAll('.quote-dot').forEach(dot => {
      dot.addEventListener('click', function() {
        const newIndex = parseInt(this.getAttribute('data-index'));
        
        // Only update if clicking a different dot
        if (newIndex !== currentQuoteIndex) {
          // Reset the interval timer
          clearInterval(quoteInterval);
          
          // Update to the selected quote
          updateQuoteToIndex(newIndex);
          
          // Restart the interval
          quoteInterval = setInterval(updateQuote, 30000);
        }
      });
    });

    // Function to update quote indicators
    function updateQuoteIndicators() {
      document.querySelectorAll('.quote-dot').forEach((dot, index) => {
        if (index === currentQuoteIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
    
    // Function to update the quote to a specific index
    function updateQuoteToIndex(newIndex) {
      // Add fade-out class
      heroQuote.classList.add('fade-out');
      
      // After the fade-out animation completes, update the quote and fade back in
      setTimeout(() => {
        // Update to specified quote
        currentQuoteIndex = newIndex;
        const quote = quotes[currentQuoteIndex];
        
        quoteText.textContent = quote.text;
        quoteAuthor.textContent = `- ${quote.author}`;
        
        // Update indicators
        updateQuoteIndicators();
        
        // Remove fade-out and add fade-in
        heroQuote.classList.remove('fade-out');
        heroQuote.classList.add('fade-in');
        
        // Remove the fade-in class after animation completes
        setTimeout(() => {
          heroQuote.classList.remove('fade-in');
        }, 1000);
      }, 1000);
    }

    // Function to update the quote with a fade effect
    function updateQuote() {
      const nextIndex = (currentQuoteIndex + 1) % quotes.length;
      updateQuoteToIndex(nextIndex);
    }

    // Rotate quotes every 30 seconds
    quoteInterval = setInterval(updateQuote, 30000);
  }

  // Get the header height to offset scrolling
  const header = document.querySelector('header');
  const headerHeight = header.offsetHeight;
  const scrollPadding = 20; // Additional padding to add below the header

  // Function to highlight active navigation link
  function setActiveNavLink(sectionId) {
    document.querySelectorAll('.nav-links a').forEach(navLink => {
      if (navLink.getAttribute('href') === '#' + sectionId) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    });
  }

  // Function to update URL hash without triggering scroll
  function updateUrlHash(hash) {
    // Only update if the hash has changed
    if (window.location.hash !== hash) {
      // Use history.replaceState to update URL without scrolling
      history.replaceState(null, null, hash);
    }
  }

  // Improved smooth scroll to element function with better positioning
  function smoothScrollTo(element, offset = 0) {
    if (!element) return;
    
    // Get position of the element relative to the viewport
    const elementPosition = element.getBoundingClientRect().top;
    
    // Calculate the offset position, accounting for header height and extra padding
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - scrollPadding;
    
    // Smooth scroll to the position
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  // Handle navigation link clicks
  document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (!targetElement) return;
      
      // Determine if we're leaving the hero section
      const heroSection = document.getElementById('hero');
      const isLeavingHero = window.scrollY < heroSection.offsetHeight && 
                           targetId !== '#hero';
      
      // Add transition animation when leaving hero section
      if (isLeavingHero) {
        document.body.classList.add('transitioning-from-hero');
        setTimeout(() => {
          document.body.classList.remove('transitioning-from-hero');
        }, 800);
      }
      
      // Special case for hero section
      if (targetId === '#hero') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        // Improved scrolling to properly position section headers at the top
        smoothScrollTo(targetElement, headerHeight + scrollPadding);
      }
      
      // Update URL and navigation
      updateUrlHash(targetId);
      setActiveNavLink(targetId.substring(1));
      
      // Close mobile menu if open
      const burgerToggle = document.getElementById('burger-toggle');
      if (burgerToggle && burgerToggle.checked) {
        burgerToggle.checked = false;
      }
    });
  });

  // Simplified Intersection Observer for section detection
  const observerOptions = {
    rootMargin: `-${headerHeight + scrollPadding}px 0px 0px 0px`,
    threshold: 0.1 // Lower threshold to detect sections earlier
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Find the most visible section
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        
        // Update URL hash and navigation only if not already set
        if (window.location.hash !== `#${sectionId}`) {
          updateUrlHash(`#${sectionId}`);
          setActiveNavLink(sectionId);
        }
      }
    });
  }, observerOptions);
  
  // Observe all sections
  document.querySelectorAll('section[id]').forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Handle scroll events for visual effects
  let hasTransitioned = false;
  let lastScrollPosition = 0;
  
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const heroSection = document.getElementById('hero');
    const heroHeight = heroSection.offsetHeight;
    
    // Detect scroll direction
    const isScrollingDown = scrollPosition > lastScrollPosition;
    const isScrollingUp = scrollPosition < lastScrollPosition;
    
    // Update classes based on scroll direction
    if (isScrollingDown) {
      document.body.classList.add('scroll-down');
      document.body.classList.remove('scroll-up');
    } else if (isScrollingUp) {
      document.body.classList.add('scroll-up');
      document.body.classList.remove('scroll-down');
    }
    
    // Store scroll position for next comparison
    lastScrollPosition = scrollPosition;
    
    // Transition effect when leaving hero
    if (scrollPosition > 50 && scrollPosition < heroHeight && !hasTransitioned) {
      document.body.classList.add('leaving-hero');
      hasTransitioned = true;
      
      setTimeout(() => {
        document.body.classList.remove('leaving-hero');
      }, 1200);
    }
    
    // Reset transition state when at top
    if (scrollPosition < 50) {
      hasTransitioned = false;
      
      // Reset hero position
      heroSection.style.transform = 'translateY(0)';
      heroSection.querySelector('.hero-content').style.transform = 'translateY(0)';
    }
    
    // Parallax effect for hero section with limits
    if (scrollPosition <= heroHeight && scrollPosition > 0) {
      const parallaxValue = Math.min(scrollPosition * 0.15, heroHeight * 0.1);
      const contentParallaxValue = Math.min(scrollPosition * -0.05, heroHeight * -0.05);
      
      if (scrollPosition < heroHeight - 200) {
        heroSection.style.transform = `translateY(${parallaxValue}px)`;
        heroSection.querySelector('.hero-content').style.transform = 
          `translateY(${contentParallaxValue}px)`;
      } else {
        // Gradual fade out as we approach section boundary
        const distanceToBottom = heroHeight - scrollPosition;
        const fadeOutFactor = distanceToBottom / 200;
        
        const finalParallaxValue = Math.max(0, parallaxValue * fadeOutFactor);
        const finalContentParallaxValue = contentParallaxValue * fadeOutFactor;
        
        heroSection.style.transform = `translateY(${finalParallaxValue}px)`;
        heroSection.querySelector('.hero-content').style.transform = 
          `translateY(${finalContentParallaxValue}px)`;
      }
    }
    
    // Class for past-hero state
    if (scrollPosition > heroHeight - 150) {
      document.body.classList.add('past-hero');
    } else {
      document.body.classList.remove('past-hero');
      
      if (scrollPosition < 100) {
        heroSection.style.opacity = '1';
        heroSection.style.visibility = 'visible';
      }
    }
    
    // Reveal sections on scroll
    document.querySelectorAll('.scroll-reveal').forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.85) {
        section.classList.add('scrolled');
      }
    });
  });
  
  // Initialize any elements that should be visible on load
  setTimeout(() => {
    const windowHeight = window.innerHeight;
    
    // Initialize scroll reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      
      if (sectionTop < windowHeight * 0.85) {
        section.classList.add('scrolled');
      }
    });
    
    // Handle initial hash navigation if present
    if (window.location.hash) {
      const targetId = window.location.hash;
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Small delay to ensure elements are properly rendered
        setTimeout(() => {
          // Scroll to the element with improved offset calculation
          smoothScrollTo(targetElement, headerHeight + scrollPadding);
          
          // Set active nav link
          setActiveNavLink(targetId.substring(1));
        }, 100);
      }
    }
  }, 100);
});