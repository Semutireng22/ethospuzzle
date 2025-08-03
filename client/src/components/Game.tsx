import { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import ControlPanel from "./ControlPanel";
import VictoryScreen from "./VictoryScreen";
import { useGameLogic } from "../hooks/useGameLogic";
import { useAudio } from "../lib/stores/useAudio";

const Game = () => {
  const {
    gameState,
    currentLevel,
    score,
    matches,
    tiles,
    flippedTiles,
    isGameWon,
    handleTileClick,
    resetGame,
    nextLevel,
    useHint,
    hintsRemaining
  } = useGameLogic();

  const { playHit, playSuccess, setHitSound, setSuccessSound } = useAudio();

  // Initialize audio elements
  useEffect(() => {
    const hitAudio = new Audio('/sounds/hit.mp3');
    const successAudio = new Audio('/sounds/success.mp3');
    
    // Preload audio files
    hitAudio.preload = 'auto';
    successAudio.preload = 'auto';
    
    // Set up audio in the store
    setHitSound(hitAudio);
    setSuccessSound(successAudio);
  }, [setHitSound, setSuccessSound]);

  return (
    <div className="game-container">
      <div className="game-header">
        <h1 className="game-title">ETHEREUM OS CRYPTO MATCHER</h1>
        <div className="game-stats">
          <span className="stat">Level: {currentLevel}</span>
          <span className="stat">Score: {score}</span>
          <span className="stat">Matches: {matches}</span>
          <span className="stat">Hints: {hintsRemaining}</span>
        </div>
      </div>

      {!isGameWon ? (
        <>
          <GameBoard
            tiles={tiles}
            flippedTiles={flippedTiles}
            onTileClick={handleTileClick}
            gridSize={currentLevel === 1 ? 6 : currentLevel === 2 ? 7 : 8}
          />
          <ControlPanel
            onReset={resetGame}
            onHint={useHint}
            onFinish={() => nextLevel()}
            hintsRemaining={hintsRemaining}
          />
        </>
      ) : (
        <VictoryScreen
          level={currentLevel}
          score={score}
          onNextLevel={nextLevel}
          onReset={resetGame}
        />
      )}
    </div>
  );
};

export default Game;
