const API_KEY = "Sk-or-v1-5ad45daeeede25841d783532059aa9282c83265def92d9ea310353049b81b0b0";


async function sendMessage() {
    const inputField = document.getElementById("userInput");
    const chatContainer = document.getElementById("chat-container");
    const userText = inputField.value;

    if (!userText) return;

    // विद्यार्थीको म्यासेज देखाउने
    chatContainer.innerHTML += `<div style="background:#222; align-self:flex-end; color:#d4af37; padding:12px; margin:10px; border-radius:10px; max-width:80%; margin-left:auto; border-right:4px solid #d4af37;">${userText}</div>`;
    inputField.value = "";

    // गुरु AI को प्रतीक्षा संकेत
    const tempId = "loading-" + Date.now();
    chatContainer.innerHTML += `<div id="${tempId}" style="background:#1a1a1a; border-left:4px solid #d4af37; padding:12px; margin:10px; border-radius:10px; max-width:80%;">गुरु AI सोचिरहेको छ...</div>`;
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-exp:free",
                "messages": [
                    {"role": "system", "content": "तपाईं एक 'गुरु AI' हुनुहुन्छ। तपाईंको काम विद्यार्थीहरूलाई सरल नेपाली भाषामा सिकाउनु र मार्गनिर्देशन गर्नु हो।"},
                    {"role": "user", "content": userText}
                ]
            })
        });

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;

        document.getElementById(tempId).innerHTML = `<strong>गुरु AI:</strong> ${aiResponse}`;
    } catch (error) {
        document.getElementById(tempId).innerHTML = "<strong>गुरु AI:</strong> माफ गर्नुहोस्, म अहिले जोडिन सकिन। कृपया पछि प्रयास गर्नुहोस्।";
    }
}
// गुरु 
