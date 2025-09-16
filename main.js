// main.js

async function loadSection(url, targetSelector, extractSelector) {
  try {
    const res = await fetch(url, { credentials: "same-origin" });
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const extracted = doc.querySelector(extractSelector) || doc.querySelector("main") || doc.body;
    const target = document.querySelector(targetSelector);

    if (target && extracted) {
      target.innerHTML = extracted.innerHTML;
    }
  } catch (e) {
    console.error(`Failed to load content for ${targetSelector}`, e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Keep the line for loading projects.
  loadSection("projects.html", "#projects", "main");

  // --- Code for highlighting active link in DESKTOP sidebar ---
  const sections = [...document.querySelectorAll("#home, #coursework, #projects")];
  const links = [...document.querySelectorAll('.sidebar-nav a')]; 

  const byId = id => links.find(a => a.getAttribute('href') === `#${id}`);
  
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => link.classList.remove('active'));
        const link = byId(entry.target.id);
        if (link) {
          link.classList.add('active');
        }
      }
    });
  }, { 
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0 
  });

  sections.forEach(s => obs.observe(s));

  // ===== START OF ADDED MOBILE NAVIGATION LOGIC =====

  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-sidebar-nav a');

  // MODIFIED: Function to open/close the menu
  function toggleMobileMenu() {
    // Toggle the .is-open class on the menu itself
    mobileNav.classList.toggle('is-open');

    // **THIS IS THE KEY FIX:** Toggle the scroll-lock class on the BODY
    document.body.classList.toggle('body-no-scroll');
    
    // Change the button text for better UX
    const isOpen = mobileNav.classList.contains('is-open');
    if (isOpen) {
      mobileNavToggle.textContent = '✕'; // Close icon
    } else {
      mobileNavToggle.textContent = '☰'; // Hamburger icon
    }
  }

  // Event listener for the hamburger button
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', toggleMobileMenu);
  }

  // Event listeners for each link inside the mobile menu
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('is-open')) {
        toggleMobileMenu();
      }
    });
  });
  // ===== END OF ADDED MOBILE NAVIGATION LOGIC =====
});