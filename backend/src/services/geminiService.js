
const axios = require('axios');
const config = require('../config/config');

const generateArticle = async (prompt) => {
    try {
        console.log('Generating article with prompt:', prompt);
        console.log('Using Gemini API URL:', config.gemini.apiUrl);
        
        // Format the request according to Gemini API requirements
        const requestData = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        };
        
        console.log('Request data:', JSON.stringify(requestData));
        
        const response = await axios({
            method: 'post',
            url: `${config.gemini.apiUrl}?key=${config.gemini.apiKey}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: requestData
        });
        
        console.log('Gemini API response received');
        
        // Log the full response for debugging
        console.log('Gemini API response structure:', JSON.stringify(response.data, null, 2));
        
        // Extract the generated text from the Gemini API response
        if (response.data && response.data.candidates && response.data.candidates[0] && 
            response.data.candidates[0].content && response.data.candidates[0].content.parts && 
            response.data.candidates[0].content.parts[0]) {
            const generatedText = response.data.candidates[0].content.parts[0].text;
            return generatedText;
        } else {
            console.error('Unexpected Gemini API response format:', JSON.stringify(response.data));
            return 'Failed to generate article. Please try again.';
        }
    } catch (error) {
        console.error('Error generating article:', error.message);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Error request:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
        return 'Sorry, there was an error generating the article. Please try again.';
    }
};

module.exports = {
    generateArticle
};