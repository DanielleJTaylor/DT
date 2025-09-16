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

  function renderCoursework() {
    const host = document.getElementById("coursework");
    if (!host) {
      console.error("Error: The #coursework section was not found in the DOM.");
      return;
    }

    // Generate the complete HTML for all coursework categories
    const contentHTML = institutions.map(inst => {
      const classesHTML = courseData[inst].map(cls => `
        <section class="class">
          <h3>${cls.title}</h3>
          <p>${cls.desc}</p>
        </section>
      `).join('');
      
      return `
        <div class="course-category">
          <h2 class="category-title">${inst}</h2>
          <div class="classes-flex">${classesHTML}</div>
        </div>
      `;
    }).join('');

    host.innerHTML = contentHTML;
  }

  // When the page's HTML is fully loaded, run the function to build the coursework section.
  document.addEventListener("DOMContentLoaded", renderCoursework);
})();
