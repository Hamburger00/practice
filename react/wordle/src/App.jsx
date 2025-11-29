import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Game } from "./components/Game";

import "./App.css";
import { useState } from "react";

function App() {
	const [startGame, setStartGame] = useState(false);
	const startingSequence = () => {
		setStartGame((prev) => !prev);
		// Potential animation here
	};
	return (
		<>
    {console.log(startGame)}
			{startGame ? (
				<Game />
			) : (
				<>
					<div>
						<a href="https://vite.dev" target="_blank">
							<img
								src={viteLogo}
								className="logo"
								alt="Vite logo"
							/>
						</a>
						<a href="https://react.dev" target="_blank">
							<img
								src={reactLogo}
								className="logo react"
								alt="React logo"
							/>
						</a>
					</div>
					<h1>Wordle</h1>
					<button onClick={() => startingSequence()}>Start</button>
				</>
			)}
		</>
	);
}

export default App;
