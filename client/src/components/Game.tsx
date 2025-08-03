import { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import ControlPanel from "./ControlPanel";
import VictoryScreen from "./VictoryScreen";
import { useGameLogic } from "../hooks/useGameLogic";

const Game = () => {
  const {
    gameState,
    currentLevel,
    score,
    matches,
    tiles,
    flippedTiles,
    isGameWon,
    gridDimensions,
    handleTileClick,
    resetGame,
    nextLevel,
    useHint,
    hintsRemaining
  } = useGameLogic();



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
            gridRows={gridDimensions.rows}
            gridCols={gridDimensions.cols}
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
