# VoicePrompt AI

<p align="center">
  <img src="https://img.shields.io/badge/Gemini%20API-2.0%20Flash-blue" alt="Gemini API">
  <img src="https://img.shields.io/badge/ElevenLabs-TTS-orange" alt="ElevenLabs">
  <img src="https://img.shields.io/badge/Node.js-Express-green" alt="Node.js Express">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License">
</p>

VoicePrompt AI is a modern web application that generates high-quality content using the Gemini API and reads it aloud using the ElevenLabs Text-to-Speech API. The application features a beautiful, responsive UI built with HTML, CSS, and JavaScript for the frontend, and utilizes Node.js with Express for the backend.

![VoicePrompt AI Screenshot](https://via.placeholder.com/800x450.png?text=VoicePrompt+AI+Screenshot)

## Features

### Content Generation
- Generate high-quality articles, stories, explanations, and more using Google's Gemini 2.0 Flash model
- Quick-access suggestion chips for common prompt types
- Markdown formatting support for generated content
- Copy to clipboard functionality

### Text-to-Speech
- Convert generated content to lifelike speech using ElevenLabs API
- Multiple voice options (Default, Male, Female, British accents)
- Advanced audio player with playback controls
- Download audio files for offline use
- Text preprocessing to ensure natural speech (removing markdown characters, formatting bullet points)

## Project Structure

```
VoicePrompt
├── frontend
│   ├── src
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── scripts
│   │       ├── main.js
│   │       ├── geminiService.js
│   │       └── speechService.js
├── backend
│   ├── src
│   │   ├── app.js
│   │   ├── routes
│   │   │   └── api.js
│   │   ├── services
│   │   │   ├── geminiService.js
│   │   │   └── elevenLabsService.js
│   │   └── config
│   │       └── config.js
├── package.json
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/voiceprompt-ai.git
   ```

2. Navigate to the project directory:
   ```bash
   cd voiceprompt-ai
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory with your API keys:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   PORT=3001
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

6. In a separate terminal, start the frontend server:
   ```bash
   npm run frontend
   ```

7. Open your browser and navigate to `http://localhost:8080` to access the application.

## Usage

1. **Generate Content**:
   - Enter a prompt in the text area or select one of the suggestion chips
   - Click the "Generate" button or press Ctrl+Enter
   - View the generated content in the output section

2. **Text-to-Speech**:
   - Select a voice from the dropdown menu
   - Click the speaker icon to convert the generated content to speech
   - Use the audio player controls to play, pause, and track progress
   - Download the audio file using the download button

3. **Additional Features**:
   - Copy content to clipboard with the copy button
   - Clear the input field with the clear button
   - Learn about the application by clicking the "About" link

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express
- **APIs**: 
  - Google Gemini 2.0 Flash for content generation
  - ElevenLabs for text-to-speech conversion
- **Development Tools**: npm, nodemon, live-server

## Project Structure

```
VoicePrompt
├── frontend/
│   └── src/
│       ├── index.html          # Main HTML file
│       ├── styles.css          # CSS styles with modern design
│       └── scripts/
│           ├── main.js         # Main JavaScript file
│           ├── geminiService.js # Gemini API service
│           └── speechService.js # ElevenLabs service
├── backend/
│   └── src/
│       ├── app.js             # Express server setup
│       ├── routes/
│       │   └── api.js         # API routes
│       ├── services/
│       │   ├── geminiService.js # Gemini API integration
│       │   └── elevenLabsService.js # ElevenLabs integration
│       └── config/
│           └── config.js      # Configuration
├── .env                       # Environment variables
├── package.json              # Project dependencies
└── README.md                 # Project documentation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Google Gemini API](https://ai.google.dev/)
- [ElevenLabs API](https://elevenlabs.io/)
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography