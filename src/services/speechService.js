/**
 * Speech synthesis service for poetry recitation
 * Handles voice selection, character-specific voice settings, and playback
 */
class SpeechService {
    constructor() {
        this.voices = [];
        this.isInitialized = false;
        this.initialize();
    }

    initialize() {
        if ('speechSynthesis' in window) {
            // Pre-load voices
            this.loadVoices();
            // Listen for voice changes (some browsers load voices asynchronously)
            speechSynthesis.onvoiceschanged = () => this.loadVoices();
            this.isInitialized = true;
        }
    }

    loadVoices() {
        this.voices = speechSynthesis.getVoices();
        console.log('Available voices:', this.voices.map(v => v.name));
    }

    /**
     * Get voice configuration for a specific character
     * @param {string} speakerName - Name of the character speaking
     * @returns {Object} Voice settings (rate, pitch, voice)
     */
    getVoiceConfig(speakerName) {
        const kangkangVoice = this.voices.find(v => v.name.includes('Kangkang'));
        const huihuiVoice = this.voices.find(v => v.name.includes('Huihui'));
        const yaoyaoVoice = this.voices.find(v => v.name.includes('Yaoyao'));

        let config = {
            rate: 0.95,
            pitch: 1.0,
            voice: kangkangVoice || huihuiVoice || yaoyaoVoice || this.voices.find(v => v.lang.includes('zh')),
        };

        switch (speakerName) {
            case '李白':
                config.rate = 0.9;
                config.pitch = 0.95;
                config.voice = kangkangVoice;
                if (!kangkangVoice) {
                    config.voice = huihuiVoice || yaoyaoVoice || this.voices.find(v => v.lang.includes('zh'));
                    config.pitch = 0.7; // Force lower pitch for male sound
                }
                break;
            case '苏轼':
                config.rate = 1.0;
                config.pitch = 1.05;
                config.voice = kangkangVoice;
                if (!kangkangVoice) {
                    config.voice = huihuiVoice || yaoyaoVoice || this.voices.find(v => v.lang.includes('zh'));
                    config.pitch = 0.8;
                }
                break;
        }

        return config;
    }

    /**
     * Speak a verse with character-specific voice settings
     * @param {string} verse - The text to speak
     * @param {string} speakerName - Name of the character speaking
     * @returns {Promise} Resolves when speech is complete
     */
    speak(verse, speakerName) {
        return new Promise((resolve) => {
            if (!this.isInitialized || !('speechSynthesis' in window)) {
                resolve();
                return;
            }

            // Cancel any ongoing speech
            speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(verse);
            utterance.lang = 'zh-CN';
            utterance.volume = 1.0;

            const config = this.getVoiceConfig(speakerName);
            utterance.rate = config.rate;
            utterance.pitch = config.pitch;
            utterance.voice = config.voice;

            if (config.voice) {
                console.log(`Using voice (${speakerName}):`, config.voice.name, 'pitch:', utterance.pitch, 'rate:', utterance.rate);
            }

            utterance.onend = () => {
                console.log('Speech complete:', verse);
                resolve();
            };

            utterance.onerror = () => {
                console.log('Speech error, continuing');
                resolve();
            };

            speechSynthesis.speak(utterance);
            console.log(`Speaking (${speakerName}):`, verse);
        });
    }

    /**
     * Stop any ongoing speech
     */
    cancel() {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
    }

    /**
     * Check if speech synthesis is available
     */
    isAvailable() {
        return 'speechSynthesis' in window;
    }
}

// Singleton instance
export const speechService = new SpeechService();
export default speechService;
