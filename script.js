
async function sendMessage() {

    const input = document.getElementById("message-input");
    const chatBox = document.getElementById("chat-box");

    const question = input.value.trim();

    if (!question) return;

    const userMessage = document.createElement("div");
    userMessage.className = "message user";
    userMessage.textContent = question;

    chatBox.appendChild(userMessage);

    input.value = "";

    const botMessage = document.createElement("div");
    botMessage.className = "message bot";
    botMessage.textContent = "NOVOL AI is thinking...";

    chatBox.appendChild(botMessage);

    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Request failed");
        }

        botMessage.textContent = data.answer;

    } catch (error) {
        botMessage.textContent =
            "Sorry, I could not connect. Please check your server.";
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("message-input")
.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
