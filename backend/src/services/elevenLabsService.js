const axios = require('axios');
const config = require('../config/config');

const elevenLabsApiUrl = 'https://api.elevenlabs.io/v1/text-to-speech';

/**
 * Clean text by removing or replacing markdown formatting
 * @param {string} text - The text to clean
 * @returns {string} - The cleaned text
 */
function cleanTextForSpeech(text) {
    // Replace bullet points (asterisks followed by space) with a pause and then the text
    let cleanedText = text.replace(/\* /g, ', ');
    
    // Replace other markdown formatting if needed
    cleanedText = cleanedText.replace(/\*\*(.*?)\*\*/g, '$1'); // Bold text
    cleanedText = cleanedText.replace(/\*(.*?)\*/g, '$1');     // Italic text
    cleanedText = cleanedText.replace(/\#\# /g, 'Section: ');   // Subheadings
    cleanedText = cleanedText.replace(/\# /g, 'Heading: ');     // Headings
    
    return cleanedText;
}

/**
 * Voice ID mapping for different voice options
 */
const VOICE_IDS = {
    default: 'EXAVITQu4vr4xnSDxMaL', // Adam (default)
    male: 'ErXwobaYiN019PkySvjV',    // Antoni
    female: 'EXAVITQu4vr4xnSDxMaL',   // Rachel
    british: 'ODq5zmih8GrVes37Dizd'   // Harry
};

/**
 * Convert text to speech using ElevenLabs API
 * @param {string} text - The text to convert to speech
 * @param {string} voiceOption - The voice option selected by the user
 * @returns {Promise<string>} - A promise that resolves to the audio URL
 */
async function textToSpeech(text, voiceOption = 'default') {
    try {
        // Clean the text for speech synthesis
        const cleanedText = cleanTextForSpeech(text);
        console.log('Converting text to speech:', cleanedText.substring(0, 50) + '...');
        
        // Get the voice ID based on the selected option
        const voiceId = VOICE_IDS[voiceOption] || VOICE_IDS.default;
        
        console.log('Using ElevenLabs API with voice ID:', voiceId);
        
        const response = await axios.post(`${elevenLabsApiUrl}/${voiceId}`, {
            text: cleanedText,
            model_id: 'eleven_monolingual_v1',
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.5
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': config.elevenLabs.apiKey
            },
            responseType: 'arraybuffer'
        });
        
        console.log('ElevenLabs API response received, content length:', response.data.length);
        
        // Convert the binary audio data to a base64 string
        const audioBase64 = Buffer.from(response.data).toString('base64');
        const audioUrl = `data:audio/mpeg;base64,${audioBase64}`;
        return audioUrl;
    } catch (error) {
        console.error('Error converting text to speech:', error);
        throw error;
    }
}

module.exports = {
    textToSpeech
};