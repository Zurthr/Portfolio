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
            theme: 'dark',timerProgressBar: true, timer:3000,
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
            theme:'dark', showConfirmButton: false, timerProgressBar: true, timer:10000,
            iconHtml: "<img src='https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjZ4MnR5dWVhazJ6bTRqeHFnbjdyeGo1a2FlN3FjNjJ0dWU1cXN2dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/X9XShudHCX2WwRTF6v/giphy.gif'width='160'>"
        });
    }

    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.textContent.replace(/[<>]/g, '');
            
            if (targetId.toLowerCase() === 'resume') {
                // Trigger SweetAlert instead of smooth scroll
                Swal.fire({
                    title: 'Resume',
                    text: 'Would you like to view or download my resume?',
                    iconHtml: '<img src="images/resume.png" width="120">',
                    theme: 'dark',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'View 👀',
                    denyButtonText: 'Download 📂',
                    cancelButtonText: 'Cancel',
                    reverseButtons: true,
                    customClass: {
                        confirmButton: 'resume-button-confirm',
                        denyButton: 'resume-button-deny',
                        cancelButton: 'resume-button-cancel'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.open('/path/to/resume.pdf', '_blank');
                    } else if (result.isDenied) {
                        window.open('/path/to/resume download.pdf', '_blank');
                    }
                });
            } else {
                smoothScroll(targetId);
            }
        });
    });
});


const observeCommand = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('showcommand');

            // Restart typing animation
            let typingElement = entry.target.querySelector('.typing');
            if (typingElement) {
                typingElement.style.animation = 'none'; // Reset animation
                void typingElement.offsetWidth; // Force reflow to restart animation
                typingElement.style.animation = 'typing 2s steps(20, end) forwards, blink 0.6s infinite';
            }
        } else {
            entry.target.classList.remove('showcommand');
        }
    });
});

const hiddenElementsCommand = document.querySelectorAll('.hiddencommand');
hiddenElementsCommand.forEach((el) => observeCommand.observe(el));

const observe = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            let maskElement = entry.target.querySelector('.showmask');
            if (maskElement) {
                maskElement.style.animation = 'none'; 
                void maskElement.offsetWidth; 
                maskElement.style.animation = 'mask 1.5s steps(15,end) forwards';
            }
        }
        else {
            entry.target.classList.remove('show');
        }
    }, {
        threshold: 0.01
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observe.observe(el));

//hero so that gk se buggy itu PLEASEEEE
const observeHero = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('showhero');
        }
    }, {
        threshold: 0.01
    });
});

const hiddenHero = document.querySelectorAll('.hiddenhero');
hiddenHero.forEach((el) => observeHero.observe(el));

function smoothScroll(targetId) {
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

const skills = {
    hard: [
        { name: "HTML", level: "very" },
        { name: "CSS", level: "familiar" },
        { name: "PYTHON", level: "very" },
        { name: "JS", level: "familiar" },
        { name: "C#", level: "somewhat" },
        { name: "JAVA", level: "familiar" }, { name: "php", level: "somewhat" }, { name: "mySQL", level: "somewhat" },
        { name: "ReactJS", level: "somewhat" }, { name: "Vue", level: "learning" }, { name: "TailwindCSS", level: "somewhat" }, { name: "Lua", level: "somewhat" },
        { name: "Figma", level: "familiar" }, { name: "phpMyAdmin", level: "familiar" },
        { name: "Godot", level: "learning" },
        { name: "PYGAME", level: "somewhat" },
        { name: "SAP", level: "somewhat" },
        { name: "Jira", level: "somewhat" }, { name: "Cisco P.T.", level: "somewhat" }
    ],
    soft: [
        { name: "Front-End Development", level: "general" },{ name: "UI Design", level: "general" }, { name: "UX Research", level: "general" }, { name: "Machine Learning", level: "general" },
        { name: "People Management", level: "general" },{ name: "Public Speaking", level: "general" },
        { name: "Effective Communicatiion", level: "general" },{ name: "English (C2 ESL/8.0 IELTS)", level: "general" }
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

const projects = [
    {
        title: "ZURUFIKAR.DEV",
        description: "My personal portfolio built with HTML, CSS, and JavaScript.",
        tags: ["Web Dev",'Front-End', "Portfolio"],
        resources: ["HTML", "CSS", "JS"],
        img: "images/project/wip-img.png",
        icon: "images/project/wip-icon.png",
        category: "web",
        date: "2024 - Present"
    },
    {
        title: "ZURUFIKAR.DEV",
        description: "My personal portfolio built with HTML, CSS IM LIMIT TESTING THE SCROLLLLLLLLLLLLLLLLLLLL XXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXXXXXXXXXXXXXXXXXX.",
        tags: ["Game Dev"],
        resources: ["Godot", "C#", 'CSS'],
        img: "images/project/wip-img.png",
        icon: "images/project/wip-icon.png",
        category: "game",
        date: "2023 - 2024"
    },
    {
        title: "Kaggle - Cassava Leaf",
        description: ".",
        tags: ["AI", "Machine Learning"],
        resources: ["Python", "TensorFlow"],
        img: "images/project/wip-img.png",
        icon: "images/project/wip-icon.png",
        category: "ai",
        date: "2024"
    },
    {
        title: "Academify",
        description: ".",
        tags: ["AI", "Machine Learning"],
        resources: ["Python", "TensorFlow"],
        img: "images/project/wip-img.png",
        icon: "images/project/wip-icon.png",
        category: "ai",
        date: "2024"
    },
    {
        title: "Task Manager",
        description: ".",
        tags: ["AI", "Machine Learning"],
        resources: ["Python", "TensorFlow"],
        img: "images/project/wip-img.png",
        icon: "images/project/wip-icon.png",
        category: "ai",
        date: "2024"
    },
    {
        title: "Telkomedika Website",
        description: ".",
        tags: ["AI", "Machine Learning"],
        resources: ["Python", "TensorFlow"],
        img: "images/project/wip-img.png",
        icon: "images/project/wip-icon.png",
        category: "ai",
        date: "2024"
    },
    {
        title: "OrbitSMP",
        description: ".",
        tags: ["AI", "Machine Learning"],
        resources: ["Python", "TensorFlow"],
        img: "images/project/wip-img.png",
        icon: "images/project/wip-icon.png",
        category: "ai",
        date: "2024"
    },
    {
        title: "ExemplifySMP",
        description: ".",
        tags: ["AI", "Machine Learning"],
        resources: ["Python", "TensorFlow"],
        img: "images/project/wip-img.png",
        icon: "images/project/wip-icon.png",
        category: "ai",
        date: "2024"
    }
];

const projectList = document.getElementById("project-list");
const projectDetails = document.getElementById("project-details");

// Load project list in sidebar with category-based classes
projects.forEach((proj, index) => {
    const li = document.createElement("li");
    li.classList.add("project-item", proj.category); // Add category class
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
        <img src="${proj.img}" alt="Project image" class="project-detail-img">
        
        <div class="project-header">
            <h2 class='project-title ${proj.category}'>${proj.title}</h2>
        </div>
        
        <div class="project-description">
            <div class='desc-left'>
                <div class="tags">
                ${proj.tags.map(tag => `<span class="tag ${tag.toLowerCase().replace(/\s+/g, '-')} ${proj.category}-tag">${tag}</span>`).join('')}</div>
                <p class='text-desc'>${proj.description}</p>
            </div>
            <div class="desc-right">
                <div class="resources">
                    ${proj.resources.map(res => `<span class="resource">${res}</span>`).join('')}
                </div>
                <div class="project-date">
                    <span>Project Start/End</span><br>
                    <span>${proj.date}</span>
                </div>
            </div>
        </div>
        
        <div class="project-footer">
        </div>
    `;
    // Remove active class from all and add to selected
    document.querySelectorAll(".project-item").forEach(item => item.classList.remove("active"));
    document.querySelector(`[data-index="${index}"]`).classList.add("active");
}

window.onload = function() {
    window.scrollTo(0, 0);
}

Swal.fire({
    title: 'Success!',
    text: 'Redirecting...',
    icon: 'success',
    showConfirmButton: true,
    confirmButtonText: 'Go to Page'
}).then((result) => {
    if (result.isConfirmed) {
        window.location.href = '/target-page';
    }
});