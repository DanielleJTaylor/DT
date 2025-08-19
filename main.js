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

    // Re-run coursework script if it was the one loaded
    if (targetSelector === "#coursework" && typeof window.initCoursework === "function") {
      window.initCoursework();
    }
  } catch (e) {
    console.error(`Failed to load content for ${targetSelector}`, e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Load the external content for projects and coursework
  loadSection("coursework.html", "#coursework", "#coursework, main");
  loadSection("projects.html", "#projects", "main");

  // --- Code for highlighting active link in sidebar ---
  const sections = [...document.querySelectorAll("#home, #coursework, #projects")];
  const links = [...document.querySelectorAll('.sidebar-nav a')]; 

  const byId = id => links.find(a => a.getAttribute('href') === `#${id}`);

  // === THIS IS THE FIX ===
  // The rootMargin is adjusted to create a larger, more stable detection zone.
  // It now activates when a section is in the top 60% of the screen.
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
    rootMargin: '-20% 0px -60% 0px', // TOP, RIGHT, BOTTOM, LEFT
    threshold: 0 
  });

  sections.forEach(s => obs.observe(s));
});