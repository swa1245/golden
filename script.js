// Initialize AOS animations
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animation library with optimized settings
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    offset: 120,
    delay: 50,
    anchorPlacement: 'top-bottom',
    disable: 'mobile'
  });

  // Elegant navbar scroll effect
  const navbar = document.querySelector('.elegant-nav');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Modern minimal search bar functionality
  const searchWrapper = document.querySelector('.search-wrapper');
  const searchIcon = document.querySelector('.search-icon');
  const searchInput = document.querySelector('.search-input');
  const searchClear = document.querySelector('.search-clear');
  
  if (searchWrapper && searchIcon && searchInput) {
    // Toggle search on icon click
    searchIcon.addEventListener('click', function() {
      searchWrapper.classList.toggle('active');
      if (searchWrapper.classList.contains('active')) {
        setTimeout(() => searchInput.focus(), 300);
      }
    });
    
    // Show clear button when input has value
    searchInput.addEventListener('input', function() {
      if (this.value.length > 0) {
        searchWrapper.classList.add('has-value');
      } else {
        searchWrapper.classList.remove('has-value');
      }
    });
    
    // Clear input on clear button click
    if (searchClear) {
      searchClear.addEventListener('click', function() {
        searchInput.value = '';
        searchWrapper.classList.remove('has-value');
        searchInput.focus();
      });
    }
    
    // Close search when clicking outside
    document.addEventListener('click', function(e) {
      if (!searchWrapper.contains(e.target) && searchWrapper.classList.contains('active')) {
        searchWrapper.classList.remove('active');
        searchInput.value = '';
        searchWrapper.classList.remove('has-value');
      }
    });
    
    // Prevent closing when clicking inside search wrapper
    searchWrapper.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    
    // Handle keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      // ESC key closes search
      if (e.key === 'Escape' && searchWrapper.classList.contains('active')) {
        searchWrapper.classList.remove('active');
        searchInput.value = '';
        searchWrapper.classList.remove('has-value');
      }
      
      // Ctrl/Cmd + K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchWrapper.classList.add('active');
        setTimeout(() => searchInput.focus(), 100);
      }
    });
  }
  
  // Hero slider initialization and animation
  const heroSlider = document.getElementById('heroSlider');
  if (heroSlider) {
    // Add fade effect
    heroSlider.classList.add('carousel-fade');
    
    // Force reinitialize the carousel
    try {
      // Initialize hero slider with Bootstrap
      const carousel = new bootstrap.Carousel(heroSlider, {
        interval: 3000,
        pause: false,  // Don't pause on hover to ensure consistent timing
        wrap: true,
        keyboard: true,
        touch: true    // Enable touch swiping on mobile
      });
      
      // Force start the carousel cycling
      setTimeout(() => {
        carousel.cycle();
      }, 500);
    } catch (e) {
      console.error('Error initializing carousel:', e);
    }
    
    // Preload all images to prevent flickering
    const preloadImages = () => {
      const images = heroSlider.querySelectorAll('.hero-image');
      images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
          const preloadImg = new Image();
          preloadImg.src = src;
        }
      });
    };
    preloadImages();
    
    // Reset animations when slide changes
    heroSlider.addEventListener('slide.bs.carousel', function(event) {
      const activeSlide = heroSlider.querySelector('.carousel-item.active');
      const heading = activeSlide.querySelector('h1');
      const paragraph = activeSlide.querySelector('p');
      const buttons = activeSlide.querySelector('.hero-buttons');
      
      if (heading) heading.style.opacity = '0';
      if (paragraph) paragraph.style.opacity = '0';
      if (buttons) buttons.style.opacity = '0';
      
      // Prepare the next slide
      const nextSlide = event.relatedTarget;
      if (nextSlide) {
        const nextHeading = nextSlide.querySelector('h1');
        const nextParagraph = nextSlide.querySelector('p');
        const nextButtons = nextSlide.querySelector('.hero-buttons');
        
        if (nextHeading) nextHeading.style.opacity = '0';
        if (nextParagraph) nextParagraph.style.opacity = '0';
        if (nextButtons) nextButtons.style.opacity = '0';
      }
    });
    
    // Trigger animations when slide is shown
    heroSlider.addEventListener('slid.bs.carousel', function() {
      const activeSlide = heroSlider.querySelector('.carousel-item.active');
      const heading = activeSlide.querySelector('h1');
      const paragraph = activeSlide.querySelector('p');
      const buttons = activeSlide.querySelector('.hero-buttons');
      
      // Staggered animation timing
      setTimeout(() => {
        if (heading) {
          heading.style.opacity = '1';
          heading.style.transform = 'translateY(0)';
        }
      }, 200);
      
      setTimeout(() => {
        if (paragraph) {
          paragraph.style.opacity = '1';
          paragraph.style.transform = 'translateY(0)';
        }
      }, 400);
      
      setTimeout(() => {
        if (buttons) {
          buttons.style.opacity = '1';
          buttons.style.transform = 'translateY(0)';
        }
      }, 600);
    });
  }

  // Scroll to top button visibility
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  // Add hover effect to category items
  const categories = document.querySelectorAll('.category');
  categories.forEach(category => {
    category.addEventListener('mouseenter', function() {
      this.querySelector('p').style.color = '#b34b4b';
    });
    category.addEventListener('mouseleave', function() {
      this.querySelector('p').style.color = '#000';
    });
  });

  // Add smooth hover effect to nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Add parallax effect to support section
  const supportSection = document.querySelector('.support-section');
  if (supportSection) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const sectionPosition = supportSection.offsetTop;
      const distance = scrollPosition - sectionPosition;
      
      if (distance > -500 && distance < 500) {
        supportSection.querySelectorAll('.image-frame').forEach(frame => {
          frame.style.transform = `rotate(-5deg) translateY(${distance * 0.05}px)`;
        });
      }
    });
  }
  
  // Initialize product carousel with enhanced features
  const productCarousel = document.getElementById('productCarousel');
  if (productCarousel) {
    // Create Bootstrap carousel instance with custom settings
    const carousel = new bootstrap.Carousel(productCarousel, {
      interval: 5000,
      wrap: true,
      touch: true,
      pause: 'hover'
    });
    
    // Add hover effects for product items
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
      // Add shadow effect on hover
      item.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        this.style.transform = 'translateY(-10px)';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        this.style.transform = 'translateY(0)';
      });
      
      // Add click event to make entire product card clickable
      item.addEventListener('click', function(e) {
        if (!e.target.classList.contains('product-link')) {
          const link = this.querySelector('.product-link');
          if (link) {
            link.click();
          }
        }
      });
    });
    
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        carousel.prev();
      } else if (e.key === 'ArrowRight') {
        carousel.next();
      }
    });
    
    // Add touch swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    productCarousel.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    productCarousel.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);
    
    function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        carousel.next();
      }
      if (touchEndX > touchStartX + 50) {
        carousel.prev();
      }
    }
  }
});

// Scroll to top function
function scrollToTop() {
  window.scrollTo({ 
    top: 0, 
    behavior: 'smooth' 
  });
}

// Refresh AOS animations when new content is loaded
function refreshAOS() {
  AOS.refresh();
}

// Ensure sections are visible when scrolling
window.addEventListener('scroll', function() {
  // Force visibility of sections that should be in view
  const sections = document.querySelectorAll('section, .section-container');
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    // If section is in viewport or just above/below it
    if (rect.top < window.innerHeight + 200 && rect.bottom > -200) {
      section.style.visibility = 'visible';
      section.style.opacity = '1';
      
      // Make sure all children with AOS attributes are visible
      const aosElements = section.querySelectorAll('[data-aos]');
      aosElements.forEach(el => {
        el.classList.add('aos-animate');
      });
    }
  });
});

