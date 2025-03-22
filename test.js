document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".floating-container");
    const codeSnippets = ["<div>", "function(draw)", "function(rawr)",'#26CEAA', "let x = 420;", "</html>", "waffles!", "setNPC","#078D70", "print(ehe XP)" ];

    function createBlock() {
        const block = document.createElement("div");
        block.classList.add("block");
        block.innerText = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];

        block.style.left = Math.random() * 100 + "vw";
        const duration = Math.random() * 3 + 5; // Between 5s and 8s
        block.style.animationDuration = duration + "s";
        
        container.appendChild(block);

        // Remove after the animation is fully complete (pake duration + small buffer)
        setTimeout(() => {
            block.remove();
        }, duration * 1000 + 500);  // full edxist
    }

    setInterval(createBlock, 500);
});

//Reset vid di Card
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".achievement-card").forEach((card, index) => {
        const video = card.querySelector("video");
        
        //debug
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
});