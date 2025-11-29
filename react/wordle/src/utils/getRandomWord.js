let words = [];

// Load words asynchronously once and store them
const loadWords = async () => {
    try {
        const response = await fetch('/words')
        if (!response.ok) {
            throw new Error('Failed to fetch words');
        }
        const data = await response.text();
        words = data.split('\n').map(word => word.trim()).filter(word => word);
    } catch (error) {
        console.error('Something went wrong fetching words', error);
    }
};

// Ensure words are loaded at module initialization
loadWords();

export const getRandomWord = async () => {
    if (words.length === 0) {
        // Wait until words are loaded
        await loadWords();
    }
    return words[Math.floor(Math.random() * 300)];
};
