// Contact Icons Floating Animation
document.addEventListener('DOMContentLoaded', function() {
    // Create container for the floating contact icons
    const createFloatingIcons = () => {
        // Create container
        const iconContainer = document.createElement('div');
        iconContainer.className = 'floating-contact-icons';
        
        // Create WhatsApp icon
        const whatsappIcon = document.createElement('a');
        whatsappIcon.href = 'https://wa.me/+254759769229'; // Replace with your WhatsApp number
        whatsappIcon.className = 'contact-icon whatsapp-icon';
        whatsappIcon.setAttribute('aria-label', 'Contact via WhatsApp');
        whatsappIcon.setAttribute('target', '_blank'); // Open in new tab
        whatsappIcon.setAttribute('rel', 'noopener noreferrer'); // Security best practice
        whatsappIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" fill="currentColor">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
        `;
        
        // Create Call icon
        const callIcon = document.createElement('a');
        callIcon.href = 'tel:0759769229'; // Replace with your phone number
        callIcon.className = 'contact-icon call-icon';
        callIcon.setAttribute('aria-label', 'Call us');
        callIcon.setAttribute('target', '_blank'); // Open in new tab
        callIcon.setAttribute('rel', 'noopener noreferrer'); // Security best practice
        callIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" fill="currentColor">
                <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"/>
            </svg>
        `;
        
        // Create second WhatsApp icon (for animation variation)
        const whatsappIcon2 = document.createElement('a');
        whatsappIcon2.href = 'https://wa.me/+254792915655'; // Replace with your WhatsApp number
        whatsappIcon2.className = 'contact-icon whatsapp-icon whatsapp-icon-2';
        whatsappIcon2.setAttribute('aria-label', 'Contact via WhatsApp');
        whatsappIcon2.setAttribute('target', '_blank'); // Open in new tab
        whatsappIcon2.setAttribute('rel', 'noopener noreferrer'); // Security best practice
        whatsappIcon2.innerHTML = whatsappIcon.innerHTML;
        
        // Append all icons to container
        iconContainer.appendChild(whatsappIcon);
        iconContainer.appendChild(callIcon);
        iconContainer.appendChild(whatsappIcon2);
        
        // Append container to body
        document.body.appendChild(iconContainer);
        
        // Return container for animation use
        return iconContainer;
    };
    
    // Create and add the necessary CSS
    const addStyles = () => {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .floating-contact-icons {
                position: fixed;
                right: 20px;
                bottom: 20px;
                z-index: 1000;
                display: flex;
                flex-direction: column;
                gap: 12px;
                opacity: 0; /* Start hidden */
                transition: opacity 0.5s ease-in-out;
            }
            
            .contact-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                text-decoration: none;
                color: white;
                opacity: 0; /* Start hidden */
                transform: translateY(20px); /* Start slightly below */
                transition: opacity 0.5s ease, transform 0.5s ease;
            }
            
            .contact-icon:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
            }
            
            .contact-icon.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            .whatsapp-icon {
                background-color: #25D366;
            }
            
            .whatsapp-icon-2 {
                background-color: #128C7E;
            }
            
            .call-icon {
                background-color: #0077FF; /* Default primary color */
            }
            
            .floating-contact-icons.visible {
                opacity: 1;
            }
            
            /* Animation classes - only applied when visible */
            .contact-icon.visible.animate-pulse {
                animation: pulse 2s infinite;
            }
            
            .contact-icon.visible.animate-float {
                animation: float 5s ease-in-out infinite;
            }
            
            .contact-icon.visible.animate-float-delay-1 {
                animation: float 4s ease-in-out infinite;
                animation-delay: 1s;
            }
            
            .contact-icon.visible.animate-float-delay-05 {
                animation: float 6s ease-in-out infinite;
                animation-delay: 0.5s;
            }
            
            @keyframes pulse {
                0% {
                    transform: scale(1);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                }
                50% {
                    transform: scale(1.1);
                    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.35);
                }
                100% {
                    transform: scale(1);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                }
            }
            
            @keyframes float {
                0% {
                    transform: translateY(0px);
                }
                50% {
                    transform: translateY(-10px);
                }
                100% {
                    transform: translateY(0px);
                }
            }
            
            /* Mobile Responsive Adjustments */
            @media (max-width: 768px) {
                .floating-contact-icons {
                    right: 15px;
                    bottom: 15px;
                    gap: 8px;
                }
                
                .contact-icon {
                    width: 45px;
                    height: 45px;
                }
            }
            
            /* Extra Small Screens */
            @media (max-width: 480px) {
                .floating-contact-icons {
                    right: 10px;
                    bottom: 10px;
                    gap: 6px;
                }
                
                .contact-icon {
                    width: 40px;
                    height: 40px;
                }
                
                .contact-icon svg {
                    width: 18px;
                    height: 18px;
                }
            }
            
            /* Ultra Small Screens */
            @media (max-width: 320px) {
                .floating-contact-icons {
                    right: 8px;
                    bottom: 8px;
                    gap: 5px;
                }
                
                .contact-icon {
                    width: 35px;
                    height: 35px;
                }
                
                .contact-icon svg {
                    width: 16px;
                    height: 16px;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    };
    
    // Function to add scroll animations - modified to show at half page scroll
    const setupScrollAnimations = () => {
        const iconContainer = document.querySelector('.floating-contact-icons');
        const icons = document.querySelectorAll('.contact-icon');
        let iconsVisible = false;
        
        // Function to check if user has scrolled to half the page
        const checkScrollPosition = () => {
            // Get total page height
            const totalPageHeight = Math.max(
                document.body.scrollHeight, 
                document.body.offsetHeight, 
                document.documentElement.clientHeight, 
                document.documentElement.scrollHeight, 
                document.documentElement.offsetHeight
            );
            
            // Get current scroll position
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Get viewport height
            const viewportHeight = window.innerHeight;
            
            // Calculate halfway point of the page
            const halfwayPoint = (totalPageHeight - viewportHeight) / 2;
            
            // Check if user has scrolled past halfway point
            if (scrollTop >= halfwayPoint && !iconsVisible) {
                iconContainer.classList.add('visible');
                // Show icons with cascade effect
                icons.forEach((icon, index) => {
                    setTimeout(() => {
                        icon.classList.add('visible');
                        
                        // Add animation classes after becoming visible
                        if (icon.classList.contains('whatsapp-icon') && !icon.classList.contains('whatsapp-icon-2')) {
                            icon.classList.add('animate-pulse', 'animate-float');
                        } else if (icon.classList.contains('whatsapp-icon-2')) {
                            icon.classList.add('animate-pulse', 'animate-float-delay-1');
                        } else {
                            icon.classList.add('animate-pulse', 'animate-float-delay-05');
                        }
                    }, index * 200);
                });
                iconsVisible = true;
            } else if (scrollTop < halfwayPoint && iconsVisible) {
                // Hide icons if scrolled back up
                iconContainer.classList.remove('visible');
                icons.forEach(icon => {
                    icon.classList.remove('visible', 'animate-pulse', 'animate-float', 'animate-float-delay-1', 'animate-float-delay-05');
                });
                iconsVisible = false;
            }
        };
        
        // Initial check in case page is refreshed while already scrolled
        window.addEventListener('load', checkScrollPosition);
        
        // Check on scroll
        window.addEventListener('scroll', checkScrollPosition);
    };
    
    // Initialize
    const initContactIcons = () => {
        addStyles();
        createFloatingIcons();
        setupScrollAnimations();
        
        // Add hover effect for better interactions
        const icons = document.querySelectorAll('.contact-icon');
        icons.forEach(icon => {
            icon.addEventListener('mouseover', () => {
                // Remove animation classes on hover
                icon.classList.remove('animate-pulse', 'animate-float', 'animate-float-delay-1', 'animate-float-delay-05');
            });
            
            icon.addEventListener('mouseout', () => {
                // Restart animations if icon is visible
                if (icon.classList.contains('visible')) {
                    // Force reflow to restart animation
                    void icon.offsetWidth;
                    
                    if (icon.classList.contains('whatsapp-icon') && !icon.classList.contains('whatsapp-icon-2')) {
                        icon.classList.add('animate-pulse', 'animate-float');
                    } else if (icon.classList.contains('whatsapp-icon-2')) {
                        icon.classList.add('animate-pulse', 'animate-float-delay-1');
                    } else {
                        icon.classList.add('animate-pulse', 'animate-float-delay-05');
                    }
                }
            });
        });
    };
    
    // Execute when DOM is fully loaded
    initContactIcons();
});