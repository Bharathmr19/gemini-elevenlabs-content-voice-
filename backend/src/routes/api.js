const express = require('express');
const router = express.Router();
const geminiService = require('../services/geminiService');
const elevenLabsService = require('../services/elevenLabsService');

// Route to generate articles using the Gemini API
router.post('/generate-article', async (req, res) => {
    const { prompt } = req.body;
    try {
        const article = await geminiService.generateArticle(prompt);
        res.json({ article });
    } catch (error) {
        res.status(500).json({ error: 'Error generating article' });
    }
});

// Route to convert text to speech using the ElevenLabs API
router.post('/text-to-speech', async (req, res) => {
    const { text, voice } = req.body;
    try {
        // Pass the selected voice to the service if provided
        const audioUrl = await elevenLabsService.textToSpeech(text, voice);
        res.json({ audioUrl });
    } catch (error) {
        console.error('API error converting text to speech:', error);
        res.status(500).json({ error: 'Error converting text to speech' });
    }
});

module.exports = router;