async function summarizeText() {
    const inputText = document.getElementById("inputText").value;
    const button = document.getElementById("submitBtn");
    const outputBox = document.getElementById("outputBox");
    const summaryResult = document.getElementById("summaryResult");

    // Check agar khali hai
    if (!inputText.trim()) {
        alert("Arey bhai, pehle kuch text toh likho!");
        return;
    }

    // Button ko loading mode mein daalo
    button.innerText = "Soch raha hu... 🤔";
    button.disabled = true;
    outputBox.style.display = "none";

    try {
        const response = await fetch('/summarize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: inputText })
        });

        const data = await response.json();

        if (data.summary) {
            outputBox.style.display = "block";
            // 'marked' library use karke markdown ko HTML banayenge
            summaryResult.innerHTML = marked.parse(data.summary);
        } else {
            alert("Error: " + data.error);
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Server connect nahi ho raha.");
    } finally {
        // Button wapas normal karo
        button.innerText = "Summarize It 🚀";
        button.disabled = false;
    }
}