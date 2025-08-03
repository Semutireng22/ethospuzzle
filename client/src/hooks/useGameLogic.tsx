import { useState, useEffect, useCallback } from "react";
import { useAudio } from "../lib/stores/useAudio";

export interface TileData {
  id: number;
  type: string;
  isMatched: boolean;
}

export const useGameLogic = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState(0);
  const [tiles, setTiles] = useState<TileData[]>([]);
  const [flippedTiles, setFlippedTiles] = useState<number[]>([]);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'paused'>('playing');

  const { playHit, playSuccess } = useAudio();

  const cryptoTypes = ['btc', 'eth', 'ethos', 'sol', 'bnb', 'ada'];

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = useCallback(() => {
    const gridSize = currentLevel === 1 ? 6 : currentLevel === 2 ? 7 : 8;
    const totalTiles = gridSize * gridSize;
    const pairsNeeded = totalTiles / 2;
    
    // Create pairs using available crypto types
    const pairs: string[] = [];
    for (let i = 0; i < pairsNeeded; i++) {
      const cryptoType = cryptoTypes[i % cryptoTypes.length];
      pairs.push(cryptoType, cryptoType);
    }

    // Shuffle and create tile objects
    const shuffledPairs = shuffleArray(pairs);
    const newTiles: TileData[] = shuffledPairs.map((type, index) => ({
      id: index,
      type,
      isMatched: false
    }));

    setTiles(newTiles);
    setFlippedTiles([]);
    setMatches(0);
    setGameState('playing');
    setHintsRemaining(3);
  }, [currentLevel]);

  const handleTileClick = useCallback((index: number) => {
    if (flippedTiles.length >= 2 || flippedTiles.includes(index) || tiles[index].isMatched) {
      return;
    }

    playHit();
    const newFlippedTiles = [...flippedTiles, index];
    setFlippedTiles(newFlippedTiles);

    if (newFlippedTiles.length === 2) {
      const [firstIndex, secondIndex] = newFlippedTiles;
      const firstTile = tiles[firstIndex];
      const secondTile = tiles[secondIndex];

      if (firstTile.type === secondTile.type) {
        // Match found
        setTimeout(() => {
          setTiles(prev => prev.map((tile, idx) => 
            idx === firstIndex || idx === secondIndex 
              ? { ...tile, isMatched: true }
              : tile
          ));
          setMatches(prev => prev + 1);
          setScore(prev => prev + 100 * currentLevel);
          setFlippedTiles([]);
          playSuccess();
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setFlippedTiles([]);
        }, 1000);
      }
    }
  }, [flippedTiles, tiles, currentLevel, playHit, playSuccess]);

  const resetGame = useCallback(() => {
    setCurrentLevel(1);
    setScore(0);
    initializeGame();
  }, [initializeGame]);

  const nextLevel = useCallback(() => {
    if (currentLevel < 3) {
      setCurrentLevel(prev => prev + 1);
    } else {
      setCurrentLevel(1);
    }
  }, [currentLevel]);

  const useHint = useCallback(() => {
    if (hintsRemaining <= 0) return;

    const unmatchedTiles = tiles
      .map((tile, index) => ({ tile, index }))
      .filter(({ tile }) => !tile.isMatched);

    if (unmatchedTiles.length >= 2) {
      // Find a matching pair
      for (let i = 0; i < unmatchedTiles.length; i++) {
        for (let j = i + 1; j < unmatchedTiles.length; j++) {
          if (unmatchedTiles[i].tile.type === unmatchedTiles[j].tile.type) {
            const hintIndices = [unmatchedTiles[i].index, unmatchedTiles[j].index];
            
            // Briefly show the hint
            setFlippedTiles(hintIndices);
            setTimeout(() => {
              setFlippedTiles([]);
            }, 2000);
            
            setHintsRemaining(prev => prev - 1);
            return;
          }
        }
      }
    }
  }, [tiles, hintsRemaining]);

  // Check for game completion
  const isGameWon = tiles.length > 0 && tiles.every(tile => tile.isMatched);

  // Initialize game on level change
  useEffect(() => {
    initializeGame();
  }, [currentLevel, initializeGame]);

  // Update game state when won
  useEffect(() => {
    if (isGameWon && gameState === 'playing') {
      setGameState('won');
    }
  }, [isGameWon, gameState]);

  return {
    gameState,
    currentLevel,
    score,
    matches,
    tiles,
    flippedTiles,
    isGameWon,
    hintsRemaining,
    handleTileClick,
    resetGame,
    nextLevel,
    useHint
  };
};
