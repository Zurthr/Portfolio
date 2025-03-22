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