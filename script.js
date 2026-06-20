/**
 * SEYAD ABUTHAHIR PORTFOLIO INTERACTION ENGINE
 * Theme: Classic Spidey Red & Black
 * Contains:
 * 1. Mobile Menu Sidebar Drawer Toggle
 * 2. Hero Section Typewriter Loop
 * 3. Active Scroll Navigation Highlighter
 * 4. Contact Form Beacon Submission Handler
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. MOBILE MENU TOGGLE
       ========================================================================== */
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');

    if (menuToggleBtn && mobileDrawer) {
        menuToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggleBtn.classList.toggle('active');
            mobileDrawer.classList.toggle('active');
        });

        // Close drawer on link selection
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggleBtn.classList.remove('active');
                mobileDrawer.classList.remove('active');
            });
        });

        // Close drawer on clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileDrawer.contains(e.target) && e.target !== menuToggleBtn) {
                menuToggleBtn.classList.remove('active');
                mobileDrawer.classList.remove('active');
            }
        });
    }


    /* ==========================================================================
       2. HERO SECTION TYPEWRITER CAROUSEL
       ========================================================================== */
    const typewriterElement = document.getElementById('typewriter-text');
    const rolesArray = [
        "Full-Stack Web Developer.",
        "Software Engineer.",
        "Problem Solver."
    ];
    
    let currentRoleIdx = 0;
    let currentCharIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function runTypewriter() {
        if (!typewriterElement) return;

        const fullWord = rolesArray[currentRoleIdx];

        if (isDeleting) {
            typewriterElement.textContent = fullWord.substring(0, currentCharIdx - 1);
            currentCharIdx--;
            typingSpeed = 55; // Deletes slightly faster
        } else {
            typewriterElement.textContent = fullWord.substring(0, currentCharIdx + 1);
            currentCharIdx++;
            typingSpeed = 100; // Standard typing speed
        }

        // Logic check
        if (!isDeleting && currentCharIdx === fullWord.length) {
            // Pause at full word
            isDeleting = true;
            typingSpeed = 1800;
        } else if (isDeleting && currentCharIdx === 0) {
            isDeleting = false;
            // Move to next word
            currentRoleIdx = (currentRoleIdx + 1) % rolesArray.length;
            typingSpeed = 400; // Brief pause before starting next word
        }

        setTimeout(runTypewriter, typingSpeed);
    }

    // Initialize typewriter after a short delay
    if (typewriterElement) {
        setTimeout(runTypewriter, 800);
    }


    /* ==========================================================================
       3. ACTIVE SCROLL NAVIGATION HIGHLIGHTER
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    const mobItems = document.querySelectorAll('.mobile-nav-item');
    const mainNavbar = document.getElementById('main-navbar');

    window.addEventListener('scroll', () => {
        let currentSectionId = 'home';
        const scrollPosition = window.scrollY + 180; // offset

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Highlight active desktop items
        navItems.forEach((item) => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });

        // Highlight active mobile items
        mobItems.forEach((item) => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });

        // Adjust sticky header appearance on scroll
        if (mainNavbar) {
            if (window.scrollY > 40) {
                mainNavbar.style.padding = '8px 0';
                mainNavbar.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
                mainNavbar.style.backgroundColor = 'rgba(5, 5, 7, 0.94)';
            } else {
                mainNavbar.style.padding = '15px 0';
                mainNavbar.style.boxShadow = 'none';
                mainNavbar.style.backgroundColor = 'rgba(5, 5, 7, 0.85)';
            }
        }
    });


    /* ==========================================================================
       4. CONTACT FORM BEACON SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('success-message');
    const consolePulse = document.querySelector('.terminal-pulse-area');

    if (contactForm && successMsg) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop page refresh

            // Hide the active form
            contactForm.classList.add('submitted');

            // Update HUD console indicators
            const termStatus = document.querySelector('.term-status');
            const termPulseText = document.querySelector('.terminal-lbl');
            const termPulseDot = document.querySelector('.terminal-pulse');

            if (termStatus) {
                termStatus.textContent = 'SIGNAL STATE: TRANSMITTED';
                termStatus.style.color = '#00ff66';
            }
            if (termPulseText) {
                termPulseText.textContent = 'BEACON BROADCASTING ACCURATELY';
                termPulseText.style.color = '#00ff66';
            }
            if (termPulseDot) {
                termPulseDot.style.backgroundColor = '#00ff66';
                termPulseDot.style.boxShadow = '0 0 10px #00ff66';
            }

            // Wait a brief animation offset and activate the success alert
            setTimeout(() => {
                successMsg.classList.add('active');
            }, 300);
        });
    }

});
