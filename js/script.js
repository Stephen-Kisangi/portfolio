 // Initialize AOS
 AOS.init();
        
 // Navigation bar scroll effect
 window.addEventListener('scroll', function() {
     const navbar = document.querySelector('.navbar');
     if(window.scrollY > 50) {
         navbar.classList.add('scrolled');
     } else {
         navbar.classList.remove('scrolled');
     }
 });


// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const scrollDownBtn = document.querySelector('.scroll-down');
    
    // Hide scroll button when user has scrolled past hero section
    window.addEventListener('scroll', function() {
        const heroSection = document.querySelector('#home') || document.querySelector('header');
        
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            
            if (window.scrollY > heroHeight * 0.5) {
                scrollDownBtn.classList.add('scroll-hidden');
            } else {
                scrollDownBtn.classList.remove('scroll-hidden');
            }
        }
    });
    
    // Smooth scroll functionality
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Adjust for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
});




 // Create advanced animated particles in the background
 function createParticles() {
     const particlesContainer = document.getElementById('particles');
     const particleCount = 20;
     const colors = ['rgba(67, 97, 238, 0.7)', 'rgba(76, 201, 240, 0.6)', 'rgba(58, 12, 163, 0.5)'];
     
     for (let i = 0; i < particleCount; i++) {
         const particle = document.createElement('div');
         particle.classList.add('particle');
         
         // Random size between 3 and 12px
         const size = Math.random() * 9 + 3;
         particle.style.width = `${size}px`;
         particle.style.height = `${size}px`;
         
         // Random position
         const posX = Math.random() * 100;
         const posY = Math.random() * 100;
         particle.style.left = `${posX}%`;
         particle.style.top = `${posY}%`;
         
         // Random color from our cool colors array
         const color = colors[Math.floor(Math.random() * colors.length)];
         particle.style.backgroundColor = color;
         particle.style.boxShadow = `0 0 ${size/2}px ${color}`;
         
         // Random animation duration between 25 and 50 seconds
         const duration = Math.random() * 25 + 25;
         particle.style.animation = `float${i} ${duration}s infinite ease-in-out`;
         
         // Add keyframe animation dynamically
         const styleSheet = document.styleSheets[0];
         const keyframes = `
         @keyframes float${i} {
             0% { transform: translate(0, 0) rotate(0deg); opacity: ${Math.random() * 0.5 + 0.1}; }
             25% { transform: translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) rotate(${Math.random() * 360}deg); opacity: ${Math.random() * 0.5 + 0.4}; }
             50% { transform: translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) rotate(${Math.random() * 360}deg); opacity: ${Math.random() * 0.5 + 0.1}; }
             75% { transform: translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) rotate(${Math.random() * 360}deg); opacity: ${Math.random() * 0.5 + 0.4}; }
             100% { transform: translate(0, 0) rotate(0deg); opacity: ${Math.random() * 0.5 + 0.1}; }
         }`;
         
         try {
             styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
         } catch(e) {
             console.warn('Browser does not support dynamic insertion of keyframes', e);
         }
         
         particlesContainer.appendChild(particle);
     }
 }
 
 // Typing effect for the subtitle
 function setupTypingEffect() {
     const textElement = document.getElementById('typing-text');
     const phrases = [
         "Developer", 
         "IT Professional", 
         "Innovator", 
         "System Analyst",
         "Problem Solver"
     ];
     let phraseIndex = 0;
     let charIndex = 0;
     let isDeleting = false;
     let typingSpeed = 100;
     let pauseEnd = 1500;
     
     function type() {
         const currentPhrase = phrases[phraseIndex];
         
         if (isDeleting) {
             // Deleting text
             textElement.textContent = "I am a " + currentPhrase.substring(0, charIndex);
             charIndex--;
             typingSpeed = 50; // Faster when deleting
         } else {
             // Typing text
             textElement.textContent = "I am a " + currentPhrase.substring(0, charIndex);
             charIndex++;
             typingSpeed = 100; // Normal typing speed
         }
         
         // Handle phrase completion or deletion
         if (!isDeleting && charIndex === currentPhrase.length) {
             // Completed typing the phrase
             isDeleting = true;
             typingSpeed = pauseEnd; // Pause at the end of phrase
         } else if (isDeleting && charIndex === 0) {
             // Completed deleting the phrase
             isDeleting = false;
             phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next phrase
         }
         
         setTimeout(type, typingSpeed);
     }
     
     // Start the typing effect
     setTimeout(type, 1000);
 }

 // Interactive glow effect that follows cursor
 function setupGlowEffect() {
     const glowContainer = document.getElementById('glow-container');
     const hero = document.querySelector('.hero');
     
     // Create multiple glow elements
     for (let i = 0; i < 3; i++) {
         const glow = document.createElement('div');
         glow.classList.add('glow-effect');
         glow.style.opacity = 0.4 - (i * 0.1);
         glow.style.width = (150 + (i * 50)) + 'px';
         glow.style.height = (150 + (i * 50)) + 'px';
         glowContainer.appendChild(glow);
     }
     
     const glows = document.querySelectorAll('.glow-effect');
     
     hero.addEventListener('mousemove', (e) => {
         // Get mouse position relative to the container
         const rect = hero.getBoundingClientRect();
         const x = e.clientX - rect.left;
         const y = e.clientY - rect.top;
         
         // Update each glow position with slight delay for trail effect
         glows.forEach((glow, index) => {
             setTimeout(() => {
                 glow.style.left = (x - glow.offsetWidth/2) + 'px';
                 glow.style.top = (y - glow.offsetHeight/2) + 'px';
             }, index * 50);
         });
     });
     
     hero.addEventListener('mouseleave', () => {
         glows.forEach(glow => {
             glow.style.opacity = '0';
         });
     });
     
     hero.addEventListener('mouseenter', () => {
         glows.forEach((glow, index) => {
             glow.style.opacity = 0.4 - (index * 0.1);
         });
     });
 }
 
 // Call all functions when the window is loaded
 window.addEventListener('load', () => {
     createParticles();
     setupTypingEffect();
     setupGlowEffect();
 });

 // Enhance nav items with hover illumination effect
 const navLinks = document.querySelectorAll('.nav-link');
 navLinks.forEach(link => {
     link.addEventListener('mouseenter', () => {
         link.style.textShadow = '0 0 10px rgba(76, 201, 240, 0.7)';
     });
     
     link.addEventListener('mouseleave', () => {
         link.style.textShadow = 'none';
     });
 });

   // For handling the menu's push effect on mobile
   document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const hero = document.querySelector('.hero');
    
    // Initialize AOS
    AOS.init();
    
    // Clean up potential issues with Bootstrap's collapse events
    navbarCollapse.addEventListener('shown.bs.collapse', function() {
        document.documentElement.style.overflow = 'hidden'; // Prevent body scrolling
    });
    
    navbarCollapse.addEventListener('hidden.bs.collapse', function() {
        document.documentElement.style.overflow = ''; // Restore scrolling
    });
});


// About Section Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to attribute cards
    const attributeCards = document.querySelectorAll('.attribute-card');
    
    attributeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.attribute-icon i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.attribute-icon i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Parallax effect for the about image
    const aboutSection = document.querySelector('.about');
    const aboutImage = document.querySelector('.about-image-container');
    
    window.addEventListener('scroll', function() {
        // Only apply the effect when the section is in view
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const scrollPosition = window.scrollY;
            const offset = (scrollPosition - aboutSection.offsetTop + window.innerHeight) * 0.03;
            if (window.innerWidth > 768) { // Only apply on larger screens
                aboutImage.style.transform = `translateY(${Math.min(offset, 15)}px)`;
            }
        }
    });
    
    // Add "typewriter" effect to highlight text in the About section
    // This can be used if you want to add a special animated text in the future
    function createTypewriterEffect(element, text, speed) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Example usage - uncomment if you want to add this feature
    // const highlightElement = document.querySelector('.about-highlight');
    // if (highlightElement) {
    //     const observerCallback = (entries) => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 createTypewriterEffect(highlightElement, 'Passionate about technology and innovation', 50);
    //                 observer.unobserve(entry.target);
    //             }
    //         });
    //     };
    //     
    //     const observer = new IntersectionObserver(observerCallback, { threshold: 0.5 });
    //     observer.observe(highlightElement);
    // }
});



// Projects Section - Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Reset animations for smooth transitions
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                
                if (filter === 'all' || filter === category) {
                    card.style.display = 'block';
                    // Add staggered animation
                    card.style.animation = 'fadeInUp 0.6s ease-out forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Parallax effect for project cards
    const projectsSection = document.querySelector('.projects');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const sectionTop = projectsSection.offsetTop;
        const sectionHeight = projectsSection.offsetHeight;
        
        if (scrollPosition > sectionTop - window.innerHeight && 
            scrollPosition < sectionTop + sectionHeight) {
            const parallaxOffset = (scrollPosition - sectionTop + window.innerHeight) * 0.1;
            
            projectCards.forEach((card, index) => {
                const depth = 0.05 + (index % 3) * 0.02;
                card.style.transform = `translateY(${parallaxOffset * depth}px)`;
            });
        }
    });
    
    // Interactive hover effects
    projectCards.forEach(card => {
        const projectLinks = card.querySelector('.project-links');
        const projectImage = card.querySelector('.project-img img');
        
        card.addEventListener('mouseenter', () => {
            projectLinks.style.opacity = '1';
            projectLinks.style.transform = 'translateY(0)';
            projectImage.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            projectLinks.style.opacity = '0';
            projectLinks.style.transform = 'translateY(20px)';
            projectImage.style.transform = 'scale(1)';
        });
    });
});



// Add animation when scrolling into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - elementHeight / 4) {
            const delay = element.getAttribute('data-aos-delay') || 0;
            setTimeout(() => {
                element.classList.add('aos-animate');
            }, delay);
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
document.addEventListener('DOMContentLoaded', animateOnScroll);



// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all sections
    const sections = document.querySelectorAll('section[id]');
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.navbar .nav-link');
    
    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Handle scrolling
    window.addEventListener('scroll', function() {
        // Update navbar background on scroll
        if (window.scrollY > 50) {
            document.querySelector('.navbar').classList.add('scrolled');
        } else {
            document.querySelector('.navbar').classList.remove('scrolled');
        }
        
        // Update scroll indicator width
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolledPercentage = (window.scrollY / scrollableHeight) * 100;
        scrollIndicator.style.width = scrolledPercentage + '%';
        
        // Get current scroll position
        const scrollY = window.pageYOffset;
        
        // Check which section is in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for navbar height
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's link
                document.querySelector('.navbar .nav-link[data-section="' + sectionId + '"]').classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Adjust for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            }
        });
    });
});





// Testimonials Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonials-track');
    const slides = Array.from(document.querySelectorAll('.testimonial-card'));
    const dotsNav = document.querySelector('.testimonial-nav');
    const dots = Array.from(document.querySelectorAll('.nav-dot'));
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    
    // Configuration
    let slideWidth;
    let currentSlide = 0;
    let slidesToShow = 3;
    let isScrolling = false;
    let animationId;
    const scrollSpeed = 0.3; // pixels per frame (lower = slower)
    
    // Create clones for infinite scrolling
    function setupInfiniteScroll() {
        // Clone all slides for truly infinite scrolling
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            clone.classList.add('clone');
            track.appendChild(clone);
        });
    }
    
    // Responsive breakpoints
    function updateSlidesConfig() {
        if (window.innerWidth < 768) {
            slidesToShow = 1;
        } else if (window.innerWidth < 1200) {
            slidesToShow = 2;
        } else {
            slidesToShow = 3;
        }
        
        // Update slide width based on container and slides to show
        const containerWidth = track.parentElement.clientWidth;
        slideWidth = containerWidth / slidesToShow;
        
        // Set width for each slide including clones
        const allSlides = Array.from(document.querySelectorAll('.testimonial-card'));
        allSlides.forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}px`;
            slide.style.maxWidth = `${slideWidth}px`; // Ensure max width is set
        });
        
        // Position the slides
        moveToSlide(currentSlide, false);
    }
    
    // Move to specific slide with optional smooth transition
    function moveToSlide(index, smooth = true) {
        currentSlide = index;
        
        // Apply transition style based on parameter
        track.style.transition = smooth ? 'transform 0.5s ease-in-out' : 'none';
        track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        // Update active dot
        updateDots();
        
        // Update slide visibility
        const allSlides = Array.from(document.querySelectorAll('.testimonial-card'));
        allSlides.forEach((slide, i) => {
            if (i >= currentSlide && i < currentSlide + slidesToShow) {
                slide.style.opacity = '1';
                slide.style.transform = 'scale(1)';
            } else {
                slide.style.opacity = '0.5';
                slide.style.transform = 'scale(0.95)';
            }
        });
    }
    
    // Continuous smooth scrolling function
    function startSmoothScroll() {
        if (isScrolling) return;
        isScrolling = true;
        
        // Get all slides including clones
        const allSlides = Array.from(document.querySelectorAll('.testimonial-card'));
        const totalWidth = slideWidth * allSlides.length / 2; // Original slides only
        let scrollPosition = currentSlide * slideWidth;
        
        function animate() {
            scrollPosition += scrollSpeed;
            
            // Reset position when we've scrolled through all original slides
            if (scrollPosition >= totalWidth) {
                scrollPosition = 0;
                track.style.transition = 'none';
            } else {
                track.style.transition = 'transform 0.02s linear';
            }
            
            track.style.transform = `translateX(-${scrollPosition}px)`;
            
            // Calculate which slide we're currently on
            const newCurrentSlide = Math.floor(scrollPosition / slideWidth);
            
            // Update the dots based on original slides (not clones)
            if (Math.floor(newCurrentSlide % slides.length) !== Math.floor(currentSlide % slides.length)) {
                currentSlide = newCurrentSlide;
                
                // Update active dot - match with original slide index
                const activeDotIndex = Math.floor(currentSlide % slides.length / (slides.length / dots.length));
                updateDotsByIndex(activeDotIndex);
                
                // Update slide visibility for better visual effect
                const allSlides = Array.from(document.querySelectorAll('.testimonial-card'));
                allSlides.forEach((slide, i) => {
                    const visibleIndex = (currentSlide % slides.length);
                    const isVisible = i % slides.length >= visibleIndex && 
                                     i % slides.length < visibleIndex + slidesToShow;
                    
                    if (isVisible) {
                        slide.style.opacity = '1';
                        slide.style.transform = 'scale(1)';
                    } else {
                        slide.style.opacity = '0.5';
                        slide.style.transform = 'scale(0.95)';
                    }
                });
            }
            
            if (isScrolling) {
                animationId = requestAnimationFrame(animate);
            }
        }
        
        animate();
    }
    
    // Stop the smooth scrolling
    function stopSmoothScroll() {
        isScrolling = false;
        cancelAnimationFrame(animationId);
        
        // Snap to nearest slide
        const nearestSlide = Math.round(currentSlide);
        moveToSlide(nearestSlide);
    }
    
    // Update active dot by slide index
    function updateDots() {
        // Calculate which dot should be active based on current slide
        const activeDotIndex = Math.floor((currentSlide % slides.length) / (slides.length / dots.length));
        updateDotsByIndex(activeDotIndex);
    }
    
    // Update dots by specific index
    function updateDotsByIndex(index) {
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Set up click event on dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            stopSmoothScroll();
            const slidesPerDot = Math.ceil(slides.length / dots.length);
            moveToSlide(i * slidesPerDot);
            setTimeout(startSmoothScroll, 1000);
        });
    });
    
    // Set up click events on buttons
    prevButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        stopSmoothScroll();
        moveToSlide(Math.max(0, currentSlide - 1));
        setTimeout(startSmoothScroll, 1000);
    });
    
    nextButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        stopSmoothScroll();
        moveToSlide(currentSlide + 1);
        setTimeout(startSmoothScroll, 1000);
    });
    
    // Update on resize
    window.addEventListener('resize', updateSlidesConfig);
    
    // Pause on hover
    const carouselContainer = document.querySelector('.testimonials-carousel');
    carouselContainer.addEventListener('mouseenter', stopSmoothScroll);
    carouselContainer.addEventListener('mouseleave', startSmoothScroll);
    
    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopSmoothScroll();
    }, {passive: true});
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        setTimeout(startSmoothScroll, 1000);
    }, {passive: true});
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left
            moveToSlide(currentSlide + 1);
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right
            moveToSlide(Math.max(0, currentSlide - 1));
        }
    }
    
    // Initialize
    setupInfiniteScroll();
    updateSlidesConfig();
    
    // Start smooth scrolling with a delay to ensure initialization is complete
    setTimeout(startSmoothScroll, 1000);
});