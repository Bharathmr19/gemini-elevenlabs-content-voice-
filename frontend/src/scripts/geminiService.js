/**
 * Gemini service for article generation using the backend API
 */

async function generateArticle(prompt) {
    try {
        const response = await fetch('http://localhost:3001/api/generate-article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.article; // Adjust based on the actual response structure
    } catch (error) {
        console.error('Error generating article:', error);
        throw error;
    }
}

export { generateArticle };