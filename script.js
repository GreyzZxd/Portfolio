// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('toggle');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CTA Button Scroll
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        document.querySelector('#gallery').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// ===== MODAL FUNCTIONALITY FOR WEBSITE & VIDEO PREVIEWS =====
const modal = document.getElementById('projectModal');
const modalFrame = document.getElementById('projectFrame');
const modalTitle = document.getElementById('modalTitle');
const closeBtn = document.querySelector('.close-modal');

// Function to convert Google Drive share link to embeddable preview link
function convertGDriveLink(url) {
    if (!url || url.includes('YOUR_GDRIVE_LINK')) {
        return null;
    }
    
    // Check if it's a Google Drive link
    if (url.includes('drive.google.com')) {
        // Extract file ID from various Google Drive URL formats
        let fileId = null;
        
        // Format: https://drive.google.com/file/d/FILE_ID/view
        if (url.includes('/file/d/')) {
            fileId = url.split('/file/d/')[1].split('/')[0];
        }
        // Format: https://drive.google.com/open?id=FILE_ID
        else if (url.includes('open?id=')) {
            fileId = url.split('open?id=')[1].split('&')[0];
        }
        // Format: https://drive.google.com/uc?id=FILE_ID
        else if (url.includes('uc?id=')) {
            fileId = url.split('uc?id=')[1].split('&')[0];
        }
        
        if (fileId) {
            // Return embeddable preview URL
            return `https://drive.google.com/file/d/${fileId}/preview`;
        }
    }
    
    // If it's already in preview format or another valid URL, return as is
    return url;
}

// Function to open modal
function openModal(gdriveLink, title = 'Project Preview') {
    const embedUrl = convertGDriveLink(gdriveLink);
    
    // Update modal title
    if (modalTitle) {
        modalTitle.textContent = title;
    }
    
    if (!embedUrl) {
        // Show helpful message if link not set up
        modalFrame.srcdoc = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; text-align: center; background: linear-gradient(135deg, #ffe4f0 0%, #ffb6d9 100%);">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="#ff69b4" style="margin-bottom: 20px;">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"/>
                </svg>
                <h2 style="color: #ff69b4; margin-bottom: 15px; font-size: 24px;">Project Preview Not Available</h2>
                <p style="color: #666; font-size: 16px; line-height: 1.6; max-width: 500px;">
                    To view this project, please update the Google Drive link in the HTML file. 
                    <br><br>
                    <strong>Instructions:</strong>
                    <br>1. Upload your project files to Google Drive
                    <br>2. Right-click the file → Share → Change to "Anyone with the link"
                    <br>3. Copy the share link
                    <br>4. Replace "YOUR_GDRIVE_LINK_X" in the HTML with your link
                </p>
            </div>
        `;
    } else {
        // Load the project preview
        modalFrame.src = embedUrl;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to close modal
function closeModalFunc() {
    modal.style.display = 'none';
    modalFrame.src = ''; // Clear iframe source
    modalFrame.srcdoc = ''; // Clear srcdoc
    document.body.style.overflow = 'auto'; // Re-enable background scrolling
}

// Add click event to all website preview buttons
document.querySelectorAll('.website-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const gdriveLink = this.getAttribute('data-gdrive');
        openModal(gdriveLink, 'Website Preview');
    });
});

// Add click event to all video preview buttons
document.querySelectorAll('.video-preview-btn').forEach(videoBtn => {
    videoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const videoLink = this.getAttribute('data-video');
        const videoTitle = this.closest('.video-item').querySelector('h3').textContent;
        openModal(videoLink, videoTitle);
    });
});

// Close modal when clicking the X button
if (closeBtn) {
    closeBtn.addEventListener('click', closeModalFunc);
}

// Close modal when clicking outside the modal content
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModalFunc();
    }
});

// Close modal when pressing Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModalFunc();
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.gallery-item, .video-item, .website-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 500;
    }
});

// Add active state to navigation on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(li => {
        const link = li.querySelector('a');
        li.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            li.classList.add('active');
        }
    });
});

// Add cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursor.style.borderRadius = '50%';
    cursor.style.background = 'rgba(255, 105, 180, 0.3)';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.pointerEvents = 'none';
    cursor.style.transition = 'opacity 0.5s';
    cursor.style.zIndex = '9999';
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.style.opacity = '0';
        setTimeout(() => {
            cursor.remove();
        }, 500);
    }, 100);
});

// Social Links Animation
const socialIcons = document.querySelectorAll('.social-icon');

socialIcons.forEach((icon, index) => {
    icon.style.opacity = '0';
    icon.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        icon.style.opacity = '1';
        icon.style.transform = 'translateY(0)';
    }, 100 * index);
});

// Email click tracking
const emailLink = document.querySelector('a[href^="mailto"]');
if (emailLink) {
    emailLink.addEventListener('click', () => {
        console.log('Email link clicked');
    });
}

// Timeline Animation on Scroll
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, {
    threshold: 0.2
});

timelineItems.forEach((item, index) => {
    // Initial state
    item.style.opacity = '0';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    // Alternate animation direction
    if (index % 2 === 0) {
        item.style.transform = 'translateX(-50px)';
    } else {
        item.style.transform = 'translateX(50px)';
    }
    
    timelineObserver.observe(item);
});

// Timeline dot pulse effect
const timelineDots = document.querySelectorAll('.timeline-dot');
timelineDots.forEach(dot => {
    dot.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(-50%) scale(1.3)';
    });
    
    dot.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(-50%) scale(1)';
    });
});