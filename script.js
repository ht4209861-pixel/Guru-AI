const API_KEY = "Sk-or-v1-951f066cd473d3d83d123b794f021ce9eb75a512d99375d586bae06ceffb0aa2";

async function sendMessage() {
    const inputField = document.getElementById("userInput");
    const chatContainer = document.getElementById("chat-container");
    const userText = inputField.value.trim();

    if (!userText) return;

    chatContainer.innerHTML += `<div class="message user-msg">${userText}</div>`;
    inputField.value = "";
    
    const tempId = "loading-" + Date.now();
    chatContainer.innerHTML += `<div id="${tempId}" class="message guru-msg">गुरु AI सोचिरहेको छ...</div>`;
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": window.location.href,
                "X-Title": "Guru AI"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-lite:free",
                "messages": [
                    {"role": "system", "content": "तपाईं एक नेपाली गुरु AI हुनुहुन्छ।"},
                    {"role": "user", "content": userText}
                ]
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            const aiResponse = data.choices[0].message.content;
            document.getElementById(tempId).innerHTML = `<strong>गुरु AI:</strong> ${aiResponse}`;
        } else {
            document.getElementById(tempId).innerHTML = "<strong>गुरु AI:</strong> अहिले जोडिन सकिन। (API Key सक्रिय हुँदैछ)";
        }
    } catch (error) {
        document.getElementById(tempId).innerHTML = "<strong>गुरु AI:</strong> इन्टरनेट कनेक्सन चेक गर्नुहोस्।";
    }
    chatContainer.scrollTop = chatContainer.scrollHeight;
    }
