// गुरु AI - वास्तविक दिमाग (Brain Logic)
async function sendMessage() {
    const inputField = document.getElementById("userInput");
    const chatContainer = document.getElementById("chat-container");
    const userText = inputField.value;

    if (!userText) return;

    // विद्यार्थीको म्यासेज स्क्रिनमा देखाउने
    chatContainer.innerHTML += `
        <div style="background:#222; align-self:flex-end; color:#d4af37; padding:12px; margin:10px; border-radius:10px; max-width:80%; margin-left:auto;">
            ${userText}
        </div>`;
    
    inputField.value = "";

    // गुरु AI को 'सोच्दै गरेको' संकेत
    const tempId = "loading-" + Date.now();
    chatContainer.innerHTML += `
        <div id="${tempId}" style="background:#1a1a1a; border-left:4px solid #d4af37; padding:12px; margin:10px; border-radius:10px; max-width:80%;">
            गुरु AI सोचिरहेको छ...
        </div>`;
    
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // वास्तविक एआई जडानको नमुना
    setTimeout(() => {
        const loadingMsg = document.getElementById(tempId);
        loadingMsg.innerHTML = `
            <strong>गुरु AI:</strong> तपाईंको प्रश्न "<strong>${userText}</strong>" निकै महत्वपूर्ण छ। 
            एक गुरुको रूपमा म तपाईंलाई यो भन्न चाहन्छु कि सिक्ने प्रक्रिया नै सफलताको पहिलो पाइला हो। 
            <br><br><i>(नोट: अब हामी यसलाई OpenRouter को API Key सँग जोडेर असीमित बनाउनेछौँ।)</i>`;
    }, 1200);
}
