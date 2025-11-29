import React, {useState, useEffect, useRef} from "react";
import {getRandomWord} from "../utils/getRandomWord";
import {findOverlappingCharacters} from '../utils/findOverlappingCharacters.js';
import {WinLosePopup} from "./WinLosePopup.jsx";

export const Game = () => {
    let totalGuesses = 5;
    const [answer, setAnswer] = useState('');
    const [words, setWords] = useState(
        Array(totalGuesses).fill("")
    );
    const [currentGuess, setCurrentGuess] = useState(0);
    const gridItemRefs = useRef({})
    const [gameFinished, setGameFinished] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        const fetchWord = async () => {
            try {
                const word = await getRandomWord();
                setAnswer(word);
            } catch (error) {
                console.error("Error fetching random word:", error);
            }
        };

        fetchWord();
    }, []);

    useEffect(() => {
        if (gameFinished) {
            setTimeout(() => setFlipped(true), 200)
        }
    }, [gameFinished]);

    const submit = () => {
        let submittedWord = words[currentGuess];
        if (!submittedWord || submittedWord.length !== 5) return;
        let overlappingChars = findOverlappingCharacters(submittedWord, answer);
        let currentRow = gridItemRefs.current[currentGuess];
        let answerChars = answer.split('');

        // Update styling for overlapping items, cursed af ._.
        for (let key in overlappingChars) {
            let gridItemDiv = currentRow[key];
            let overlappingChar = overlappingChars[key].toUpperCase();
            let answerChar = answerChars[key]?.toUpperCase();
            if (overlappingChar === answerChar) {
                console.log("adding class to: " + key);
                gridItemDiv.classList.add('overlapping-green');
            } else {
                gridItemDiv.classList.add('overlapping-yellow');
            }
        }

        setCurrentGuess(n => n + 1);
        if (submittedWord === answer) {
            setGameFinished(true);
            setGameWon(true);
        }

        if (currentGuess >= 4) setGameFinished(true);

    };

    return (
        <>
            {answer ? (
                <div className="game-container">
                    <div className={`flip-wrapper ${flipped ? "flipped" : ""}`}>
                        {/* Front side */}
                        <div className="front">
                                <p>Random Word: {answer}</p>
                                <div className="words-container">
                                    {words.map((word, idx) => (
                                        <div key={idx} className="grid">
                                            {Array.from({length: 5}).map((_, i) => (
                                                <div key={i} className="grid-item" ref={(el) => {
                                                    if (!gridItemRefs.current[idx])
                                                        gridItemRefs.current[idx] = {};
                                                    gridItemRefs.current[idx][i] = el;
                                                }}>
                                                    {(word[i] ?? "").toUpperCase()}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                        </div>
                        {/* Back side */}
                        <div className="back">
                            <WinLosePopup showPopUp={gameFinished} gameWon={gameWon} answer={answer} />
                        </div>

                    </div>

                    <form action={submit}>
                        <input
                            type="text"
                            name="words"
                            value={words[currentGuess] || ""}
                            onBlur={({target}) => target.focus()}
                            autoFocus
                            autoComplete="off"
                            onChange={(e) => {
                                const newWords = [...words];
                                newWords[currentGuess] = e.target.value;
                                setWords(newWords);
                            }}
                            maxLength={5}
                            style={{
                                width: "0px",
                                height: "0px",
                                opacity: "0"
                            }}
                        />
                    </form>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};
