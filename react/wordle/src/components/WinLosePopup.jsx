import React from "react";

export const WinLosePopup = ({showPopUp, gameWon, answer}) => {
    if (!showPopUp) return null

    return (
        <div className="win-lose container">
            <h2 className="header">{gameWon ? "You won!" : "You lost :("}</h2>
            <h3 className="answer">Answer: {answer.toUpperCase()}</h3>
            <button className="button" onClick={() => window.location.reload()}>Go again</button>
        </div>
    )
}