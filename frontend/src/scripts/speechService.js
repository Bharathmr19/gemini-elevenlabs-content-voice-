/**
 * Speech service for text-to-speech conversion using the backend API
 */

async function textToSpeech(text) {
    // Use the backend API instead of direct API calls to avoid exposing API keys
    const response = await fetch('http://localhost:3001/api/text-to-speech', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: text
        })
    });

    if (!response.ok) {
        throw new Error('Failed to convert text to speech');
    }

    const audioData = await response.json();
    return audioData.audioUrl; // Assuming the API returns an audio URL
}

export { textToSpeech };