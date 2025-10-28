/* =================================
   SUPER SIMPLE - GUARANTEED TO WORK
   ================================= */

// Wait for page to load
window.addEventListener('load', function() {
    console.log('Page loaded - setting up Read More buttons...');
    
    // Get all Read More buttons
    const buttons = document.querySelectorAll('.read-more-btn');
    console.log('Found ' + buttons.length + ' buttons');
    
    // Add click handler to each button
    buttons.forEach(function(button, index) {
        console.log('Setting up button ' + (index + 1));
        
        button.onclick = function() {
            console.log('BUTTON CLICKED!');
            
            // Find the text description
            const card = this.closest('.research-card-content');
            const text = card.querySelector('.research-card-description');
            
            console.log('Found card:', card);
            console.log('Found text:', text);
            
            // Check if expanded
            const isExpanded = text.classList.contains('expanded');
            
            if (isExpanded) {
                // COLLAPSE
                console.log('Collapsing...');
                text.classList.remove('expanded');
                this.innerHTML = 'Read more →';
            } else {
                // EXPAND
                console.log('Expanding...');
                text.classList.add('expanded');
                this.innerHTML = 'Show less ←';
            }
        };
    });
});

// ===== Mobile Menu Toggle =====
window.addEventListener('load', function() {
    const mobileBtn = document.getElementById('mobile-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.onclick = function() {
            mobileMenu.classList.toggle('hidden');
        };
    }
});

// ===== Smooth Scrolling =====
window.addEventListener('load', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function(link) {
        // Skip read-more buttons
        if (link.classList.contains('read-more-btn')) return;
        
        link.onclick = function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        };
    });
});

// ===== Fade In Animation =====
window.addEventListener('load', function() {
    const elements = document.querySelectorAll('.animate-fadeInUp');
    elements.forEach(function(el) {
        el.style.opacity = '1';
    });
});

// ===== Active Navigation - PERFECT FIX =====
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    
    // Check if at the TOP of page (or just refreshed)
    if (window.pageYOffset < 100) {
        current = 'about';
    }
    // Check if at the BOTTOM of page
    else if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 50) {
        current = 'contact';
    }
    // Otherwise, check which section we're in
    else {
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
    }
    
    // Update active link
    navLinks.forEach(function(link) {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active-link');
        }
    });
}

// Run on scroll
window.addEventListener('scroll', updateActiveLink);

// Run on page load to show "About Me" active immediately
window.addEventListener('load', updateActiveLink);