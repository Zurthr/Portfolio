document.addEventListener("DOMContentLoaded", () => {
    // Initialize Floating Blocks
    const container = document.querySelector(".floating-container");
    const codeSnippets = ["<div>", "function(draw)", "function(rawr)", '#26CEAA', "let x = 420;", "</html>", "waffles!", "setNPC", "#078D70", "print(ehe XP)"];

    function createBlock() {
        const block = document.createElement("div");
        block.classList.add("block");
        block.innerText = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        block.style.left = Math.random() * 100 + "vw";
        const duration = Math.random() * 3 + 5; // Between 5s and 8s
        block.style.animationDuration = duration + "s";
        container.appendChild(block);

        setTimeout(() => {
            block.remove();
        }, duration * 1000 + 500);
    }

    setInterval(createBlock, 500);

    // Reset video in achievement cards
    document.querySelectorAll(".achievement-card").forEach((card, index) => {
        const video = card.querySelector("video");

        if (video) {
            console.log(`Video found in card ${index + 1}`);
            card.addEventListener("mouseenter", () => {
                console.log(`▶ Playing video in card ${index + 1}`);
                video.play();
            });

            card.addEventListener("mouseleave", () => {
                console.log(`⏸ Stopping video in card ${index + 1}`);
                video.pause();
                video.currentTime = 0;
            });
        } else {
            console.log(`No video found in card ${index + 1}, skipping.`);
        }
    });

    

    // Show WIP Alert with Swal
    if (typeof Swal !== "undefined") {
        Swal.fire({
            text: "Warning! This website is still a work in progress!",
            theme: 'auto',timerProgressBar: true, timer:3000,
            showConfirmButton: true,
            confirmButtonText: 'Okay!',
            iconHtml: '<img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjc1b3dkNG16NmU1MGptZnJqZTIxcnRxcml2aXhmZHduMDV2Y2FiciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/zkZNJRDU4sS8YfCjQv/giphy.gif" width="160">',
            customClass: {
        timerProgressBar: 'custom-timer-bar',confirmButton:'conf-button'
    },
        });
    } else {
        console.error("SweetAlert2 (Swal) is not loaded.");
    }

    // Check for mobile devices no ipad (big enf)
    if (/Mobi|Android|iPhone|iPod/i.test(navigator.userAgent)) {
        Swal.fire({
            text: "Smaller mobile devices aren't supported. For the best experience, please switch to 'Desktop Mode' or open this in your desktop.",
            theme:'auto', showConfirmButton: false, timerProgressBar: true, timer:5000,
            iconHtml: "<img src='https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjZ4MnR5dWVhazJ6bTRqeHFnbjdyeGo1a2FlN3FjNjJ0dWU1cXN2dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/X9XShudHCX2WwRTF6v/giphy.gif'width='160'>"
        });
    }
});

const skills = {
    hard: [
        { name: "HTML & CSS", level: "learning" },
        { name: "PYTHON", level: "familiar" },
        { name: "C#", level: "somewhat" },
        { name: "GODOT", level: "familiar" },
        { name: "GODOT", level: "familiar" }
    ],
    soft: [
        { name: "CSS", level: "familiar" },{ name: "WORK IN PROGRESS!!", level: "familiar" }
    ]
};

function renderSkills() {
    const hardContainer = document.getElementById("hard-skills");
    const softContainer = document.getElementById("soft-skills");

    if (!hardContainer || !softContainer) {
        console.error("Error: One or both skill containers are missing.");
        return;
    }

    // Clear previous content
    hardContainer.innerHTML = "";
    softContainer.innerHTML = "";

    // Hard Skills
    skills.hard.forEach(skill => {
        const skilltag = document.createElement("span");
        skilltag.classList.add("skilltag", skill.level);
        skilltag.innerText = skill.name;
        hardContainer.appendChild(skilltag);
    });

    // Soft Skills
    skills.soft.forEach(skill => {
        const skilltag = document.createElement("span");
        skilltag.classList.add("skilltag", skill.level);
        skilltag.innerText = skill.name;
        softContainer.appendChild(skilltag);
    });

    // Update result count dynamically
    document.getElementById("result-count").innerText = skills.hard.length + skills.soft.length;
}
document.addEventListener("DOMContentLoaded", renderSkills);


const observe = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');

            // Restart typing animation
            let typingElement = entry.target.querySelector('.typing');
            if (typingElement) {
                typingElement.style.animation = 'none'; // Reset animation
                void typingElement.offsetWidth; // Force reflow to restart animation
                typingElement.style.animation = 'typing 2s steps(20, end) forwards, blink 0.6s infinite';
            }
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observe.observe(el));


const projects = [
    {
        title: "IISMA SHEET",
        description: "My personal portfolio built with HTML, CSS, and JavaScript.",
        tags: ["Web Dev", "Portfolio"],
        resources: ["HTML", "CSS", "JS"],
        img: "images/portfolio.png",
        icon: "images/m2.png",
        date: "2024 - Present"
    },
    {
        title: "Platformer Game",
        description: "A 2D platformer built in Godot.",
        tags: ["Game Dev"],
        resources: ["Godot", "C#"],
        img: "images/game.png",
        icon: "icons/game-icon.png",
        date: "2023 - 2024"
    },
    {
        title: "AI Chatbot",
        description: "An AI chatbot using NLP techniques.",
        tags: ["AI", "Machine Learning"],
        resources: ["Python", "TensorFlow"],
        img: "images/chatbot.png",
        icon: "icons/chatbot-icon.png",
        date: "2024"
    }
];

const projectList = document.getElementById("project-list");
const projectDetails = document.getElementById("project-details");

// Load project list in sidebar with images
projects.forEach((proj, index) => {
    const li = document.createElement("li");
    li.classList.add("project-item");
    li.setAttribute("data-index", index);

    const img = document.createElement("img");
    img.src = proj.icon;
    img.alt = proj.title + " Icon";
    img.classList.add("project-icon");

    const span = document.createElement("span");
    span.textContent = proj.title;

    li.appendChild(img);
    li.appendChild(span);

    li.addEventListener("click", () => displayProject(index));

    projectList.appendChild(li);
});

// Function to update project details
function displayProject(index) {
    const proj = projects[index];

    projectDetails.innerHTML = `
        <h2>${proj.title}</h2>
        <img src="${proj.img}" alt="${proj.title}">
        <p>${proj.description}</p>
        <div class="tags">
            ${proj.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="resources">
            ${proj.resources.map(res => `<span class="resource">${res}</span>`).join('')}
        </div>
        <p class="date">${proj.date}</p>
    `;

    // Remove active class from all and add to selected
    document.querySelectorAll(".project-item").forEach(item => item.classList.remove("active"));
    document.querySelector(`[data-index="${index}"]`).classList.add("active");
}
