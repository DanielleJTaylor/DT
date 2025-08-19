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
  // === THIS IS THE FIX ===
  // UNCOMMENT these two lines to load your external content.
  loadSection("coursework.html", "#coursework", "#coursework, main");
  loadSection("projects.html", "#projects", "main");

  // --- Code for highlighting active link in sidebar ---
  const sections = [...document.querySelectorAll("#home, #coursework, #projects")];
  // UPDATED: Changed selector to find links in the sidebar
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
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.1 });

  sections.forEach(s => obs.observe(s));
});