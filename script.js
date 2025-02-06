const urlParams = new URLSearchParams(window.location.search);
const sender = urlParams.get('sender');
const receiver = urlParams.get('receiver');

// Initialize page based on URL parameters
function initializePage() {
    if (sender && receiver) {
        // Hide input section and show proposal
        document.getElementById('inputSection').style.display = 'none';
        document.getElementById('proposalSection').style.display = 'block';

        // Set personalized title with both names
        document.getElementById('proposalTitle').innerHTML =
            `${decodeURIComponent(receiver)}, will you be ${decodeURIComponent(sender)}'s girlfriend?`;
    }
}

// Generate shareable link with names
function generateLink() {
    const senderName = document.getElementById('senderName').value;
    const receiverName = document.getElementById('receiverName').value;

    // Validate inputs
    if (!senderName || !receiverName) {
        alert("Please fill both names!");
        return;
    }

    // Create shareable URL
    const baseUrl = window.location.href.split('?')[0];
    const shareableLink = `${baseUrl}?sender=${encodeURIComponent(senderName)}&receiver=${encodeURIComponent(receiverName)}`;

    // Display generated link
    document.getElementById('linkContainer').innerHTML = `
        Share this link:<br>
        <a href="${shareableLink}" target="_blank">${shareableLink}</a>
    `;
}

// Handle answer selection
function showMessage(answer) {
    const decodedReceiver = decodeURIComponent(receiver);
    const decodedSender = decodeURIComponent(sender);
    const message = document.getElementById("message");
    const noButton = document.getElementById("noBtn");

    if (answer === "yes") {
        // Handle Yes response
        message.innerHTML = `🎉 ${decodedReceiver}, you just made ${decodedSender} the happiest person! ❤️`;
        message.style.display = "block";
        noButton.classList.add("disabled");
        noButton.disabled = true;
    } else {
        // Handle No response
        alert(`💔 ${decodedReceiver}, please give ${decodedSender} another chance!`);
        message.innerHTML = `${decodedSender} will keep trying until you say Yes! 😊`;
        message.style.display = "block";
        setTimeout(() => { message.style.display = "none"; }, 5000);
    }
}

// Initialize the page when loaded
initializePage();
