const API_KEY = "Sk-or-v1-5ad45daeeede25841d783532059aa9282c83265def92d9ea310353049b81b0b0";

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
                "HTTP-Referer": window.location.href, // OpenRouter लाई यो चाहिन्छ
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
            // यदि यहाँ एरर आयो भने 'Error Log' देखाउँछ
            console.log(data);
            document.getElementById(tempId).innerHTML = "<strong>गुरु AI:</strong> अहिले सेवा उपलब्ध छैन (Check Console)।";
        }
    } catch (error) {
        document.getElementById(tempId).innerHTML = "<strong>गुरु AI:</strong> कनेक्सन फेल भयो।";
    }
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

