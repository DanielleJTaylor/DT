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

    // This is no longer needed because the other script handles itself
    // if (targetSelector === "#coursework" && typeof window.initCoursework === "function") {
    //   window.initCoursework();
    // }
  } catch (e) {
    console.error(`Failed to load content for ${targetSelector}`, e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // REMOVED the line for loading coursework.
  // loadSection("coursework.html", "#coursework", "#coursework, main"); 
  
  // Keep the line for loading projects.
  loadSection("projects.html", "#projects", "main");

  // --- Code for highlighting active link in sidebar ---
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
    rootMargin: '-20% 0px -60% 0px', // TOP, RIGHT, BOTTOM, LEFT
    threshold: 0 
  });

  sections.forEach(s => obs.observe(s));
});