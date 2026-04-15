
const API_KEY = "Sk-or-v1-5ad45daeeede25841d783532059aa9282c83265def92d9ea310353049b81b0b0";

async function sendMessage() {
    const input = document.getElementById("userInput");
    const container = document.getElementById("chat-container");
    const text = input.value.trim();

    if (!text) return;

    // प्रयोगकर्ताको सन्देश
    container.innerHTML += `<div class="message user-msg">${text}</div>`;
    input.value = "";
    container.scrollTop = container.scrollHeight;

    // लोड हुँदै गरेको सन्देश
    const loadingId = "loading-" + Date.now();
    container.innerHTML += `<div id="${loadingId}" class="message guru-msg">गुरु AI सोचिरहेको छ...</div>`;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": window.location.href
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-exp:free",
                "messages": [
                    { "role": "system", "content": "तपाईं एक गुरु AI हुनुहुन्छ। नेपालीमा जवाफ दिनुहोस्।" },
                    { "role": "user", "content": text }
                ]
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;
        document.getElementById(loadingId).innerHTML = `<strong>गुरु AI:</strong> ${reply}`;
    } catch (e) {
        document.getElementById(loadingId).innerHTML = "कनेक्सनमा समस्या आयो। फेरि प्रयास गर्नुहोस्।";
    }
    container.scrollTop = container.scrollHeight;
}


