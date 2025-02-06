const urlParams = new URLSearchParams(window.location.search);
const sender = urlParams.get('sender');
const receiver = urlParams.get('receiver');

function initializePage() {
    if (sender && receiver) {
        document.getElementById('inputSection').style.display = 'none';
        document.getElementById('proposalSection').style.display = 'block';
        document.getElementById('proposalTitle').innerHTML =
            `${decodeURIComponent(receiver)}, will you be ${decodeURIComponent(sender)}'s girlfriend?`;
    }
}

function generateLink() {
    const senderName = document.getElementById('senderName').value;
    const receiverName = document.getElementById('receiverName').value;

    if (!senderName || !receiverName) {
        alert("Please fill both names!");
        return;
    }

    const baseUrl = window.location.href.split('?')[0];
    const shareableLink = `${baseUrl}?sender=${encodeURIComponent(senderName)}&receiver=${encodeURIComponent(receiverName)}`;

    document.getElementById('linkContainer').innerHTML = `
        Share this link:<br>
        <a href="${shareableLink}" target="_blank">${shareableLink}</a>
    `;
}

function showMessage(answer) {
    const decodedReceiver = decodeURIComponent(receiver);
    const decodedSender = decodeURIComponent(sender);
    const message = document.getElementById("message");
    const noButton = document.getElementById("noBtn");

    if (answer === "yes") {
        // Confetti configuration
        const confettiSettings = {
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
        };

        // Fire confetti from multiple angles
        confetti(confettiSettings);
        confetti({ ...confettiSettings, angle: 60, spread: 55 });
        confetti({ ...confettiSettings, angle: 120, spread: 55 });

        // Show message and disable "No" button
        message.innerHTML = `🎉 ${decodedReceiver}, you just made ${decodedSender} the happiest person! ❤️`;
        message.style.display = "block";
        noButton.classList.add("disabled");
        noButton.disabled = true;

        // Continuous subtle confetti
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

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

    } else {
        alert(`💔 ${decodedReceiver}, please give ${decodedSender} another chance!`);
        message.innerHTML = `${decodedSender} will keep trying until you say Yes! 😊`;
        message.style.display = "block";
        setTimeout(() => { message.style.display = "none"; }, 5000);
    }
}

initializePage();
