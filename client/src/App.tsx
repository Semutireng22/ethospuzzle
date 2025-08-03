import { useState, useEffect } from "react";
import Game from "./components/Game";
import "./styles/retro.css";
import "./index.css";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Ensure the app is fully loaded before showing the game
    setIsLoaded(true);
  }, []);

  return (
    <div className="app-container">
      {isLoaded && <Game />}
    </div>
  );
}

export default App;
