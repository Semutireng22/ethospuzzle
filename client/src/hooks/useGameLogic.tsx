import { useState, useEffect, useCallback } from "react";

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
  const [hintsRemaining, setHintsRemaining] = useState(4);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'paused'>('playing');
  const [gridDimensions, setGridDimensions] = useState({ rows: 4, cols: 4 });

  const cryptoTypes = ['btc', 'usdt', 'ada', 'bnb', 'sol', 'eth', 'ethos'];

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = useCallback(() => {
    // Progressive difficulty: Level 1: 4x4 (8 pairs), Level 2: 4x6 (12 pairs), Level 3: 6x6 (18 pairs), Level 4+: 6x8 (24 pairs)
    let gridRows, gridCols;
    
    if (currentLevel === 1) {
      gridRows = 4; gridCols = 4; // Easy: 8 pairs
    } else if (currentLevel === 2) {
      gridRows = 4; gridCols = 6; // Medium: 12 pairs
    } else if (currentLevel === 3) {
      gridRows = 6; gridCols = 6; // Hard: 18 pairs
    } else {
      gridRows = 6; gridCols = 8; // Expert: 24 pairs
    }
    
    const totalTiles = gridRows * gridCols;
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
    setHintsRemaining(Math.max(2, 5 - currentLevel)); // More hints for easier levels
    setGridDimensions({ rows: gridRows, cols: gridCols });
  }, [currentLevel]);

  const handleTileClick = useCallback((index: number) => {
    if (flippedTiles.length >= 2 || flippedTiles.includes(index) || tiles[index].isMatched) {
      return;
    }

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
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setFlippedTiles([]);
        }, 1000);
      }
    }
  }, [flippedTiles, tiles, currentLevel]);

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
    gridDimensions,
    handleTileClick,
    resetGame,
    nextLevel,
    useHint
  };
};
