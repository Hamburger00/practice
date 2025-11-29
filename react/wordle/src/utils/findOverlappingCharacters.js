export const findOverlappingCharacters = (guess, answer) => {
    let overlapping = {};
    let guessChars = guess.split('');
    let answerChars = answer.split('');

    for (let i = 0; i < guessChars.length; i++) {
        const gChar = guessChars[i];
        for (let j = 0; j < answerChars.length; j++) {
            const aChar = answerChars[j];
            if (gChar === aChar) {
                overlapping[i] = gChar;
                answerChars[j] = null;
                break;
            }
        }
    }

    console.log(overlapping);
    return overlapping;
}