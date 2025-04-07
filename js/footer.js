// Add this script at the end of your body tag
document.addEventListener('DOMContentLoaded', function() {
    // Update current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Add particles container to footer
    const footer = document.querySelector('.footer');
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-js';
    particlesContainer.className = 'particles-js';
    footer.prepend(particlesContainer);
    
    // Load particles.js if not already loaded
    if (typeof particlesJS === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.onload = initParticles;
        document.body.appendChild(script);
    } else {
        initParticles();
    }
    
    // Initialize particles
    function initParticles() {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 15,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#4361ee"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.1,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 0.2,
                        "opacity_min": 0.05,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#4361ee",
                    "opacity": 0.05,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 0.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": false
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.2
                        }
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // Add parallax effect to shapes
    document.addEventListener('mousemove', function(e) {
        const shapes = document.querySelectorAll('.accent-shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const factor = index % 2 === 0 ? -1 : 1;
            const strength = 20;
            
            shape.style.transform = `translate(${factor * x * strength}px, ${factor * y * strength}px)`;
        });
    });
});