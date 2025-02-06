const urlParams = new URLSearchParams(window.location.search);
const sender = urlParams.get('sender');
const receiver = urlParams.get('receiver');

function initializePage() {
    try {
        if (sender && receiver) {
            document.getElementById('inputSection').style.display = 'none';
            document.getElementById('proposalSection').style.display = 'block';
            document.getElementById('proposalTitle').innerHTML =
                `${decodeURIComponent(receiver)}, will you be ${decodeURIComponent(sender)}'s girlfriend?`;
        }
    } catch (error) {
        console.error("Error initializing page:", error);
    }
}

function generateLink() {
    const senderName = document.getElementById('senderName').value;
    const receiverName = document.getElementById('receiverName').value;

    if (!senderName || !receiverName) {
        showToast("Please fill both names!", "error");
        return;
    }

    const baseUrl = window.location.href.split('?')[0];
    const shareableLink = `${baseUrl}?sender=${encodeURIComponent(senderName)}&receiver=${encodeURIComponent(receiverName)}`;

    document.getElementById('linkContainer').innerHTML = `
        Share this link:<br>
        <a href="${shareableLink}" target="_blank">${shareableLink}</a>
        <button class="copy-btn" onclick="copyToClipboard('${shareableLink}')">📋 Copy</button>
    `;
    document.getElementById('loadingSpinner').style.display = 'none';
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => showToast("Link copied! 📋", "success"))
        .catch(err => console.error("Copy failed:", err));
}

function showMessage(answer) {
    const decodedReceiver = decodeURIComponent(receiver);
    const decodedSender = decodeURIComponent(sender);
    const message = document.getElementById("message");
    const noButton = document.getElementById("noBtn");

    if (answer === "yes") {
        playSuccessSound();
        const confettiSettings = {
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
        };

        confetti(confettiSettings);
        confetti({ ...confettiSettings, angle: 60, spread: 55 });
        confetti({ ...confettiSettings, angle: 120, spread: 55 });

        message.innerHTML = `🎉 ${decodedReceiver}, you just made ${decodedSender} the happiest person! ❤️`;
        message.style.display = "block";
        noButton.classList.add("disabled");
        noButton.disabled = true;

        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: Math.random() },
                colors: ['#ff0000', '#00ff00', '#0000ff']
            });

            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: Math.random() },
                colors: ['#ffff00', '#ff00ff', '#00ffff']
            });

            if (Date .now() < end) {
                requestAnimationFrame(frame);
            }
        }());

    } else {
        showToast(`💔 ${decodedReceiver}, please give ${decodedSender} another chance!`, "error");
        message.innerHTML = `${decodedSender} will keep trying until you say Yes! 😊`;
        message.style.display = "block";
        setTimeout(() => { message.style.display = "none"; }, 5000);
    }
}

function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function playSuccessSound() {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play();
}

initializePage();
