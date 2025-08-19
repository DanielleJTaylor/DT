// coursework.js
(() => {
  const institutions = ["University of Dayton", "Certificates"];

  const courseData = {
    "University of Dayton": [
      { title: "🖥 CPS 149 - Creative Media Applications", desc: "Explored creative computing concepts through media-based Java projects." },
      { title: "💻 CPS 150 - Algorithms & Programming I", desc: "Introduction to algorithmic thinking and structured programming in Java." },
      { title: "🧩 CPS 151 - Algorithms & Programming II", desc: "Built upon foundational programming with object-oriented design." },
      { title: "🌐 CPS 242 - Web Application Development", desc: "Designed and developed dynamic web interfaces using modern frameworks." },
      { title: "🔍 CPS 310 - Systems Analysis", desc: "Analyzed user requirements and system specifications in software design." },
      { title: "📊 CPS 350 - Data Structures & Algorithms", desc: "Studied and implemented core data structures and algorithm efficiency." },
      { title: "🗃 CPS 430 - Database Management Systems", desc: "Designed and queried relational databases using SQL and ER modeling." },
      { title: "🔐 CPS 471 - Fundamentals of Cybersecurity", desc: "Core principles of securing networks, systems, and applications." },
      { title: "🐧 CPS 444 - UNIX/Linux Programming", desc: "Developed shell scripts and C programs in UNIX-based environments." },
      { title: "🧠 CPS 499 - Machine Learning in Cybersecurity", desc: "Applied ML techniques to detect and respond to cyber threats." },
      { title: "🤖 CPS 499 - Intro to Robotics", desc: "Built and programmed autonomous systems with sensors and control logic." },
      { title: "🎮 CPS 499 - Game Development", desc: "Designed and built interactive games with 2D/3D engines and logic." },
      { title: "🛠 CPS 420 - Software Engineering", desc: "Explored software development life cycle and project management." },
      { title: "🎓 CPS 490 - Capstone I", desc: "Senior project planning and early implementation (in progress)." },
      { title: "🎓 CPS 491 - Capstone II", desc: "Capstone continuation – final implementation (upcoming)." }
    ],
    "Certificates": [
      { title: "💻 Harvard Python", desc: "Completed beginner to intermediate course on Python." },
      { title: "☁ Harvard: Web Dev", desc: "Design & implementation of web apps with Python, JavaScript, SQL." },
      { title: "🧠 GA Tech Data Structures", desc: "Data structures and algorithms for organizing/manipulating data." },
      { title: "🔐 Networking", desc: "Topologies, protocols, architectures; design and troubleshooting." }
    ]
  };

  // Build the section’s DOM if it doesn't exist yet
  function ensureCourseworkShell() {
    const host = document.getElementById("coursework");
    if (!host) return null;

    // If #courseContent already present, don’t rebuild
    if (host.querySelector("#courseContent")) return host;

    host.classList.add("home-course-container");
    host.innerHTML = `
      <div class="coursework-container">
        <div class="course-content-wrapper">
          <div class="course-content" id="courseContent"></div>
        </div>
      </div>
      <div class="button-strip bottom-nav" id="buttonStrip"></div>
    `;
    return host;
  }

// coursework.js

/* ... (keep the top part of your file the same) ... */

  function renderPages() {
    const content = document.getElementById("courseContent");
    if (!content) return;
    content.innerHTML = institutions.map(inst => {
      const classesHTML = courseData[inst].map(cls => `
        <section class="class">
          <h3>${cls.title}</h3>
          <p>${cls.desc}</p>
        </section>
      `).join('');
      return `
        <div class="course-slide">
          <div class="page-title">${inst}</div>
          <div class="classes-flex">${classesHTML}</div>
        </div>
      `;
    }).join('');

    // --- THIS IS THE FIX ---
    // Calculate width based ONLY on the parent element, not the whole window.
    const containerWidth = content.parentElement.clientWidth;
    content.style.width = `${institutions.length * containerWidth}px`;
    content.style.display = "flex";
  }

/* ... (keep the renderButtons function the same) ... */
/* ... (keep the rest of the file the same) ... */

  function renderButtons(currentIndex) {
    const buttonStrip = document.getElementById("buttonStrip");
    if (!buttonStrip) return;
    buttonStrip.innerHTML = "";
    institutions.forEach((_, index) => {
      const btn = document.createElement("button");
      btn.className = "nav-btn" + (index === currentIndex ? " active" : "");
      btn.textContent = index + 1;
      btn.onclick = () => switchPage(index);
      buttonStrip.appendChild(btn);
    });
  }


  function switchPage(index) {
    const content = document.getElementById("courseContent");
    if (!content) return;
    
    // --- THIS IS THE FIX ---
    // Calculate width based ONLY on the parent element.
    const containerWidth = content.parentElement.clientWidth;
    content.style.transform = `translateX(-${containerWidth * index}px)`;
    renderButtons(index);
  }

  function onResize() {
    // Recompute width and current slide offset on resize
    const activeBtn = document.querySelector(".nav-btn.active");
    const activeIndex = activeBtn ? Number(activeBtn.textContent) - 1 : 0;
    renderPages();
    switchPage(activeIndex);
  }

  // Public initializer (callable from anywhere if needed)
  window.initCoursework = function initCoursework() {
    const host = ensureCourseworkShell();
    if (!host) return;
    renderPages();
    renderButtons(0);
    switchPage(0);
    window.addEventListener("resize", onResize);
  };

  // Auto-init when DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    window.initCoursework();
  });
})();
