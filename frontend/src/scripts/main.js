/**
 * VoicePrompt AI - Enhanced JavaScript
 * This file handles all the frontend functionality for the VoicePrompt application
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const promptInput = document.getElementById('promptInput');
    const generateButton = document.getElementById('generateButton');
    const readButton = document.getElementById('readAloudButton');
    const articleDisplay = document.getElementById('articleDisplay');
    const clearButton = document.getElementById('clearButton');
    const copyButton = document.getElementById('copyButton');
    const downloadButton = document.getElementById('downloadButton');
    const voiceSelect = document.getElementById('voiceSelect');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingMessage = document.getElementById('loadingMessage');
    const aboutLink = document.getElementById('aboutLink');
    const aboutModal = document.getElementById('aboutModal');
    const closeButton = document.querySelector('.close-button');
    const suggestionChips = document.querySelectorAll('.chip');
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseButton = document.getElementById('playPauseButton');
    const progressFill = document.querySelector('.progress-fill');
    const currentTimeDisplay = document.getElementById('currentTime');
    const totalTimeDisplay = document.getElementById('totalTime');
    
    // State variables
    let currentAudio = null;
    let isPlaying = false;
    
    // Backend API URLs
    const BACKEND_URL = 'http://localhost:3001';
    const GENERATE_API = `${BACKEND_URL}/api/generate-article`;
    const SPEECH_API = `${BACKEND_URL}/api/text-to-speech`;
    
    // Helper Functions
    const showLoading = (message = 'Generating content...') => {
        loadingMessage.textContent = message;
        loadingOverlay.classList.remove('hidden');
    };
    
    const hideLoading = () => {
        loadingOverlay.classList.add('hidden');
    };
    
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    
    const showPlaceholder = () => {
        articleDisplay.innerHTML = `
            <div class="placeholder-content">
                <i class="fas fa-robot placeholder-icon"></i>
                <p>Your generated content will appear here</p>
            </div>
        `;
    };
    
    // Event Handlers
    const generateContent = async () => {
        const prompt = promptInput.value.trim();
        if (!prompt) return;
        
        try {
            showLoading('Generating content with AI...');
            articleDisplay.textContent = 'Generating content...';
            
            const response = await fetch(GENERATE_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Format the article with proper styling
            articleDisplay.innerHTML = data.article
                .replace(/\n\n/g, '</p><p>')
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.+?)\*/g, '<em>$1</em>')
                .replace(/^(.+)$/gm, '<p>$1</p>');
                
            // Hide audio player when new content is generated
            audioPlayer.classList.add('hidden');
            if (currentAudio) {
                currentAudio.pause();
                currentAudio = null;
            }
        } catch (error) {
            console.error('Error generating content:', error);
            articleDisplay.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Error generating content. Please try again.</p>
                </div>
            `;
        } finally {
            hideLoading();
        }
    };
    
    const convertToSpeech = async () => {
        // Get the text content without HTML tags
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = articleDisplay.innerHTML;
        const articleText = tempDiv.textContent.trim();
        
        if (!articleText || articleText === 'Generating content...' || articleText.includes('Error')) {
            return;
        }
        
        try {
            showLoading('Converting text to speech...');
            readButton.disabled = true;
            
            const selectedVoice = voiceSelect.value;
            
            const response = await fetch(SPEECH_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    text: articleText,
                    voice: selectedVoice 
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            const audioUrl = data.audioUrl;
            
            // Create and play audio
            currentAudio = new Audio(audioUrl);
            
            // Set up audio player
            audioPlayer.classList.remove('hidden');
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
            
            // Audio event listeners
            currentAudio.addEventListener('timeupdate', updateProgress);
            currentAudio.addEventListener('loadedmetadata', () => {
                totalTimeDisplay.textContent = formatTime(currentAudio.duration);
            });
            currentAudio.addEventListener('ended', () => {
                playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
                isPlaying = false;
                progressFill.style.width = '0%';
                currentTimeDisplay.textContent = '0:00';
            });
            
            currentAudio.play();
        } catch (error) {
            console.error('Error converting text to speech:', error);
            alert('Error converting text to speech. Please try again.');
        } finally {
            hideLoading();
            readButton.disabled = false;
        }
    };
    
    const updateProgress = () => {
        if (!currentAudio) return;
        
        const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
        progressFill.style.width = `${progress}%`;
        currentTimeDisplay.textContent = formatTime(currentAudio.currentTime);
    };
    
    const togglePlayPause = () => {
        if (!currentAudio) return;
        
        if (isPlaying) {
            currentAudio.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            currentAudio.play();
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
        
        isPlaying = !isPlaying;
    };
    
    const copyToClipboard = () => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = articleDisplay.innerHTML;
        const text = tempDiv.textContent;
        
        navigator.clipboard.writeText(text)
            .then(() => {
                // Show copy success feedback
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy text to clipboard');
            });
    };
    
    const downloadAudio = () => {
        if (!currentAudio || !currentAudio.src) {
            alert('No audio available to download');
            return;
        }
        
        // Create a temporary link to download the audio
        const a = document.createElement('a');
        a.href = currentAudio.src;
        a.download = 'voiceprompt_audio.mp3';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    
    // Event Listeners
    generateButton.addEventListener('click', generateContent);
    readButton.addEventListener('click', convertToSpeech);
    clearButton.addEventListener('click', () => {
        promptInput.value = '';
        promptInput.focus();
    });
    copyButton.addEventListener('click', copyToClipboard);
    downloadButton.addEventListener('click', downloadAudio);
    playPauseButton.addEventListener('click', togglePlayPause);
    
    // Modal handling
    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        aboutModal.classList.remove('hidden');
    });
    
    closeButton.addEventListener('click', () => {
        aboutModal.classList.add('hidden');
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === aboutModal) {
            aboutModal.classList.add('hidden');
        }
    });
    
    // Suggestion chips
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const suggestionText = chip.getAttribute('data-prompt');
            promptInput.value = suggestionText;
            promptInput.focus();
        });
    });
    
    // Enter key to generate
    promptInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            generateContent();
        }
    });
    
    // Initialize with placeholder
    showPlaceholder();
});