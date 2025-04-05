document.addEventListener("DOMContentLoaded", () => {
    // Initialize Floating Blocks
    const container = document.querySelector(".floating-container");
    const codeSnippets = ["<div>", "function(draw)","/denizen","/PAPI install", "function(rawr)", '#26CEAA', "let x = 420;", "</html>", "waffles!", "setNPC", "#078D70", "print(ehe XP)"];

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

    function resumeSwal() {
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
            },
            showClass: {
                popup: `
                animate__animated
                animate__fadeInDown
                animate__faster
                `
            },
            hideClass: {
                popup: `
                animate__animated
                animate__backOutDown
                animate__faster
                `
            }}).then((result) => {
                if (result.isConfirmed) {
                    window.open('/path/to/resume.pdf', '_blank');
                } else if (result.isDenied) {
                    window.open('/path/to/resume download.pdf', '_blank');
                }
            });
        }

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
            text: "Smaller mobile devices aren't supported yet! Please open this in your desktop or at try 'desktop mode'. Implenting responsiveness soon!",
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
                resumeSwal()
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
    hardContainer.innerHTML = "";
    softContainer.innerHTML = "";

    // Hard Skills
    skills.hard.forEach(skill => {
        const skilltag = document.createElement("span");
        skilltag.classList.add("skilltag", skill.level);
        skilltag.innerText = skill.name;
        hardContainer.appendChild(skilltag);
    });

    // Soft 
    skills.soft.forEach(skill => {
        const skilltag = document.createElement("span");
        skilltag.classList.add("skilltag", skill.level);
        skilltag.innerText = skill.name;
        softContainer.appendChild(skilltag);
    });

    document.getElementById("result-count").innerText = skills.hard.length + skills.soft.length;
}
document.addEventListener("DOMContentLoaded", renderSkills);

const projects = [
    {
        title: "ZURUFIKAR.DEV",
        description: "My personal portfolio built with HTML, CSS, and JavaScript.",
        tags: ["Web Dev",'Front-End', "Portfolio"],
        resources: ["HTML", "CSS", "JS"],
        img: ["images/project/ZurufikarMain.png","images/project/ZurufikarFigma.png","images/project/ZurufikarCode.png"],
        icon: "images/project/wip-icon.png",
        category: "web",
        date: "March 2025"
    },
    {
        title: "Spellbound - Words of Yore",
        description: "A 2D RPG game made with Godot, featuring a unique battle system that stems from general JRPGs fused with Bookworm mechanics. Still in the works! Entry for Compfest UI 2025 amen",
        tags: ["Game Dev"],
        resources: ["Godot", "C#", 'Aseprite'],
        img: ["images/project/wip-img.png"],
        icon: "images/project/wip-icon.png",
        category: "game",
        date: "Currently Working On"
    },
    {
        title: "SES Website",
        description: "A side project that me and a peer from SES are wokring on to revitalize the SES website to highlight our work better and further.",
        tags: ["Web Dev",
            "Front-End", "Organizational"
        ],
        resources: ["CSS", "ReactJS","Typescript"],
        img: "images/project/wip-img.png",
        icon: "images/project/wip-icon.png",
        category: "web",
        date: "Currently Working On",
    },
    {
        title: "Kaggle - Loan Approval Prediction",
        description: "A side project that I did in my free time. Got an accuracy score of 0.96097 in the Private Leaderboard",
        tags: ["Machine Learning"],
        resources: ["Python", "Catbus","Kaggle"],
        img: "images/project/wip-img.png",
        icon: "images/project/kaggle.png",
        category: "ml",
        date: "2025",
    },
    {
        title: "Kaggle - Cassava Leaf Disease Classification",
        description: "My first ever Machine Learning project, as well as Kaggle Competition, that was done for a project in NTU with IISMA friends. We did this project in 2 days and (would have, comparitively) placed top 80% with EfficientNetV2",
        tags: ["Machine Learning"],
        resources: ["Python", "Seaborn","Kaggle"],
        img: ["images/project/CassavaKaggle.png","images/project/CassavaMain.jpg","images/project/Cassava2.jpg"],
        icon: "images/project/kaggle.png",
        category: "ml",
        date: "2024",
        buttonText: "View Project Presentation",
        link:'https://drive.google.com/file/d/1HC1_Fg1a3gI5ujt7ZxjoN0aR4zU3RTNy/view?usp=drive_link'
    },
    {
        title: "Fruity Froggy",
        description: "A 2D Platformer game made with Pygame, featuring multiple enemy, obstacle, and status effect varieties that present as both help and hindrance to Froggy. This was a side project back in 2023 that I did within a week. Available on: https://zurthr.itch.io/fruity-froggy and GitHub",
        tags: ["Game Dev"],
        resources: ["Pygame", "Python", 'Aseprite'],
        img: ["images/project/FroggyMain.png","images/project/FroggyItch.png","images/project/FroggyLost.png","images/project/FroggyBlind.png"],
        icon: "images/project/Bananas.png",
        category: "game",
        date: "2023, somewhen",
        buttonText: "View on GitHub",
        link:'https://github.com/Zurthr/Fruity-Froggy'
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
        title: "Task List",
        description: "My first ever 'web dev' project, done in 5 hours, using HTML, CSS (and bootstrap), and mySQL to connect to a database. Stores tasks and their statuses, and simple features such as CRUD for task entries with an additional button to quickly mark tasks as done, and a feature that lets you export your tasks to excel and csv.",
        tags: ["Web Dev"],
        resources: ["MySql", "HTML","CSS","Bootstrap"],
        img: "images/project/tasklist.png",
        icon: "images/project/task.png",
        category: "web",
        date: "December 2024"
    },
    {
        title: "Telkomedika Website",
        description: ".",
        tags: ["AI", "Machine Learning"],
        resources: ["Python", "TensorFlow"],
        img: "images/project/wip-img.png",
        icon: "images/project/wip-icon.png",
        category: "ai",
        date: ""
    },
    {
        title: "OrbitSMP",
        description: ".",
        tags: ["Game Dev", "Minecraft", "Server Management"],
        resources: ["Python", "TensorFlow"],
        img: "images/project/wip-img.png",
        icon: "images/project/wip-icon.png",
        category: "game",
        date: "2024"
    },
    {
        title: "ExemplifySMP",
        description: ".",
        tags: ["Game Dev", "Web Dev", "Minecraft", "Server Management", "Plugins"],
        resources: ["Tebex", "HTML&CSS","JS", "Java"],
        img: "images/project/wip-img.png",
        icon: "images/project/wip-icon.png",
        category: "game",
        date: "2024"
    }
];

const projectList = document.getElementById("project-list");
const projectDetails = document.getElementById("project-details");

// Load project list in sidebar with category-based classes
projects.forEach((proj, index) => {
    const li = document.createElement("li");
    li.classList.add("project-item", proj.category);
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

let currentSlideIndex = 0;

let slideInterval; 

function displayProject(index) {
    const proj = projects[index];
    const images = Array.isArray(proj.img) ? proj.img : [proj.img];
    const projectButton = proj.link 
        ? `<a href="${proj.link}" target="_blank" class="project-link-btn">${proj.buttonText || "View Project"}</a>` 
        : ""; 

        let sliderHTML = "";

        if (images.length > 1) {
            const sliderImages = images.map((img, i) => `
                <img src="${img}" class="slide ${i === 0 ? 'active' : ''}" alt="Project Image ${i+1}">
            `).join('');
        
            const sliderDots = images.map((_, i) => `
                <span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>
            `).join('');
        
            sliderHTML = `
                <div class="image-slider">
                    <div class="slider-container">${sliderImages}</div>
                    <div class="slider-dots">${sliderDots}</div>
                </div>
            `;
        } else {
            sliderHTML = `<img src="${images[0]}" class="single-image" alt="Project Image">`;
        }

    projectDetails.innerHTML = `
        ${sliderHTML}

        <div class="project-header">
            <h2 class='project-title ${proj.category}'>${proj.title}</h2>
        </div>

        <div class="project-description">
            <div class='desc-left'>
                <div class="tags">
                    ${proj.tags.map(tag => `<span class="tag ${tag.toLowerCase().replace(/\s+/g, '-')} ${proj.category}-tag">${tag}</span>`).join('')}
                </div>
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
                ${projectButton} <!-- Only displays if a link exists -->
            </div>
        </div>
    `;


    currentSlideIndex = 0; // Reset slider to first image
    clearInterval(slideInterval);

    document.querySelectorAll(".dot").forEach(dot => {
        dot.addEventListener("click", (e) => {
            showSlide(parseInt(e.target.dataset.index));
            resetAutoSlide(); 
        });
    });

    if (images.length > 1) {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 7000);
    }

    document.querySelectorAll(".project-item").forEach(item => item.classList.remove("active"));
    document.querySelector(`[data-index="${index}"]`).classList.add("active");
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const dotbg = document.querySelector('.slider-dots');
    if (!slides.length) return;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    dotbg.classList.remove('slider-dots');
    void dotbg.offsetWidth;
    dotbg.classList.add('slider-dots');
    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');

    currentSlideIndex = index;
}

//Auto next slide
function nextSlide() {
    const slides = document.querySelectorAll(".slide");
    if (!slides.length) return;

    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        nextSlide();
    }, 7000);
}

window.onload = function() {
    window.scrollTo(0, 0);
}
// m1-m9
// IISMA, IISMA SG, AIESEC NTU, AIESEC BDG, DASPRO, EDM, HMSI, SES, NTU CYBERSEC
const timelineData = [
    {
        date: "March 2025 - Present",
        title: "Data Mining Practicum Coordinator at DASPRO",
        description: "Elected as coordinator for the Data Mining Practicum, overseeing the course and ensuring its smooth operation.",
        image: "images/m5.png"
    },
    {
        date: "December 2024 - Present",
        title: "President of SES Telkom University",
        description: "Elected as President of Student English Society at Telkom University, leading the organization and its activities for the academic year.",
        image: "images/m8.png"
    },
    {
        date: "March 2024 - March 2025",
        title: "Student Representative of IISMA Nanyang Technological University 2024",
        image: "images/m1.png",
        description: "Elected as the leader and coordinator for IISMA students at Nanyang Technological University, Singapore, representing the interests of IISMA students and facilitating communication with IISMA (Kemendikbud) and NTU Singapore.",
    },
    {
        date: "Feb 28 2025",
        title: "Speaker on TEAM (Telkom University Education Movement)'s Training for Trainers",
        description: "Spoke on and presented about mastering English in a training/teaching environment, as well as general english for professional settings to around 120 members of TEAM.",
        image: "images/m8.png"
    },
    {
        date: "August 2024 - January 2025",
        title: "Education Advocate and Content Creator for SMBTelkomuniversity",
        description: "Created content based on IISMA and Education Abroad (10 videos on Instagram) which featured: experiences attained during IISMA, skills and experiences needed to attain similar scholarhsips, as well as general educational tips and tricks for students to study abroad.",
        image: "images/m10.png"
    },
    {
        date: "November 2025",
        title: "Speaker on DeepTalk LIVE on Telkom University's Instagram page",
        description: "Spoke on and presented about obtaining scholarships to study abroad such as IISMA to promote student mobility within Telkom.",
        image: "images/m10.png"
    },
    {
        date: "August - December 2025",
        title: "AIESEC in NTU - Talent Management Member",
        description: "Coordinated as well as Emceed most of the weekly Local Commitee Meetings in AIESEC in NTU. Helped manage AIESEC members in NTU's work dynamics. Worked with OGX to promote AIESEC global exchanges in North Spine, NTU, multiple times.",
        image: "images/m3.png"
    },
    {
        date: "August - December 2025",
        title: "NTU Cybersecurity Club - Member",
        description: "Participated in various cybersecurity events and workshops in order to further deepen my skills and knowledge in the field.",
        image: "images/m9.png"
    },
    {
        date: "August - December 2025",
        title: "NTU WSC - RSPID Volunteer",
        description: "Volunteered and 'Teachered' intellectually disabled members of the Singaporean society. Mostly active in Woodlands Garden School.",
        image: "images/m11.webp"
    },
    {
        date: "January - March 2024",
        title: "Project Manager of SES GNU",
        description: "Appointed as Project Manager of Student English Society's annual Gathering and Upgrading event. Coordinated multiple divisions in order to ensure the smoothness of the event for around three months.",
        image: "images/m8.png"
    },
    {
        date: "October'23 - January'24",
        title: "AIESEC in Bandung Probation Member",
        description: "Finished the probation for JoinAIESEC in Bandung. Worked in the Outgoing Talents and Outgoing Exchange departments, attending international discussions with AIESEC from Taiwan and the Philipphines, as well as acted as the Finance LCVP (Vice-Pres / Department Lead) for an OGTa Project.",
        image: "images/m4.png"
    },
    {
        date: "September - December 2023",
        title: "Design and PR Member of Koalisi HMSI",
        description: "Koalisi is a volunteer organization focused on helping the needy around Bandung. Lead and was in charge of the design and content for HMSI 2023's Social Media pages",
        image: "images/m7.png"
    },
    {
        date: "October'22 - January'23",
        title: "AIESEC Future Leader in AIESEC in UNSOED",
        description: "Participated in AIESEC Future Leader, where I attended many seminars regarding multiple soft skills such as interpersonal communication, effective leadership, etc. My first organizational experience in uni.",
        image: "images/m4.png"
    },
];

function createTimelineItem(data) {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';
    
    const timelineContent = document.createElement('div');
    timelineContent.className = 'timeline-content';
    
    if (data.image) {
        const imageElement = document.createElement('img');
        imageElement.className = 'timeline-image';
        imageElement.src = data.image;
        imageElement.alt = data.title;
        timelineContent.appendChild(imageElement);
    }
    
    const dateElement = document.createElement('span');
    dateElement.className = 'date';
    dateElement.textContent = data.date;
    
    const titleElement = document.createElement('h2');
    titleElement.className = 'title';
    titleElement.textContent = data.title;
    
    const descriptionElement = document.createElement('p');
    descriptionElement.className = 'description';
    descriptionElement.textContent = data.description;
    
    timelineContent.appendChild(dateElement);
    timelineContent.appendChild(titleElement);
    timelineContent.appendChild(descriptionElement);

    timelineItem.appendChild(timelineContent);
    
    return timelineItem;
}

// Function to add multiple timeline items
function addTimelineItems(timelineData) {
    const timelineContainer = document.getElementById('timeline-container');
    
    timelineData.forEach(data => {
        const timelineItem = createTimelineItem(data);
        timelineContainer.appendChild(timelineItem);
    });
    
    // Initialize the intersection observer after adding items
    initIntersectionObserver();
}

    let observer;

    function initIntersectionObserver() {
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('shownorm');
                } else {
                    entry.target.classList.remove('shownorm');
                }
            });
        }, {
            threshold: 0.2
        });

        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        addTimelineItems(timelineData);
    });

let scrollInterval;
let scrollingDown = true;

function loopSmoothScroll() {
    let timeline = document.querySelector('.timeline');
    if (!timeline) return;

    function startScrolling() {
        scrollInterval = setInterval(() => {
            if (scrollingDown) {
                // Scroll down
                if (timeline.scrollTop < timeline.scrollHeight - timeline.clientHeight) {
                    timeline.scrollTop += 1.8;
                } else {
                    scrollingDown = false; 
                }
            } else {
                // Scroll up
                if (timeline.scrollTop > 0) {
                    timeline.scrollTop -= 2;
                } else {
                    scrollingDown = true;
                }
            }
        }, 15); 
    }

    function stopScrolling() {
        clearInterval(scrollInterval);
    }

    startScrolling();

    // hover control
    timeline.addEventListener("mouseenter", stopScrolling);
    timeline.addEventListener("mouseleave", startScrolling);
}

window.onload = loopSmoothScroll;
