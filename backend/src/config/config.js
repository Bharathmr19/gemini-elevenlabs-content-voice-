require('dotenv').config();

const config = {
    gemini: {
        apiKey: process.env.GEMINI_API_KEY,
        apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
    },
    elevenLabs: {
        apiKey: process.env.ELEVENLABS_API_KEY,
        apiUrl: 'https://api.elevenlabs.io/v1/text-to-speech'
    },
    port: process.env.PORT || 3001
};

module.exports = config;