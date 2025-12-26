require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;
console.log("Meri API Key hai:", process.env.API_KEY);
// Setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Google Gemini Config
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// API Route
app.post('/summarize', async (req, res) => {
    try {
        const TEXT = req.body.text;
        
        if (!TEXT || !TEXT.trim()) {
            return res.status(400).json({ error: "Describe something atleast!" });
        }

        const prompt = `Write 5 catchy Instagram captions with emojis for this description: ${TEXT}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text();

        res.json({ summary: summary });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error processing your request." });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server live! Link: http://localhost:${port}`);
});
