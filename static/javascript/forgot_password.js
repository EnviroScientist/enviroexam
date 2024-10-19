document.getElementById("send-email-btn").addEventListener("click", async (event) => {
// document.getElementById('forgot-password-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const responseElement = document.getElementById('response');
    try {
        const response = await fetch('../../app/send_reset_email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        if (data.success) {
            alert(data.message)
            startCountdown();
            responseElement.textContent = 'Success! Please check your inbox.';
        } else {
            alert(data.message)
            responseElement.textContent = 'Sending failed. Please try it later or contact us for help';
        }
    } catch (error) {
        responseElement.textContent = 'Sending failed. Please try it later or contact us for help';
    }
});

function startCountdown() {
    remainingSeconds = 60;
    interval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

function updateCountdown() {
    var button = document.getElementById("send-email-btn");

    if (remainingSeconds <= 0) {
        button.removeAttribute("disabled");
        button.innerHTML = "Send Email";
        clearInterval(interval);
    } else {
        button.setAttribute("disabled", "disabled");
        button.innerHTML = "Resend (" + remainingSeconds + "s)";
        remainingSeconds--;
    }
}