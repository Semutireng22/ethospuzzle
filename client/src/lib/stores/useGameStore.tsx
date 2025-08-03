import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type GameState = "menu" | "playing" | "paused" | "won" | "lost";

interface GameStore {
  gameState: GameState;
  currentLevel: number;
  score: number;
  highScore: number;
  matches: number;
  hintsUsed: number;
  
  // Actions
  setGameState: (state: GameState) => void;
  setCurrentLevel: (level: number) => void;
  setScore: (score: number) => void;
  incrementScore: (points: number) => void;
  setMatches: (matches: number) => void;
  incrementMatches: () => void;
  useHint: () => void;
  resetGame: () => void;
  updateHighScore: () => void;
}

export const useGameStore = create<GameStore>()(
  subscribeWithSelector((set, get) => ({
    gameState: "menu",
    currentLevel: 1,
    score: 0,
    highScore: parseInt(localStorage.getItem("cryptoMatcherHighScore") || "0"),
    matches: 0,
    hintsUsed: 0,
    
    setGameState: (state) => set({ gameState: state }),
    
    setCurrentLevel: (level) => set({ currentLevel: level }),
    
    setScore: (score) => set({ score }),
    
    incrementScore: (points) => set((state) => ({ 
      score: state.score + points 
    })),
    
    setMatches: (matches) => set({ matches }),
    
    incrementMatches: () => set((state) => ({ 
      matches: state.matches + 1 
    })),
    
    useHint: () => set((state) => ({ 
      hintsUsed: state.hintsUsed + 1 
    })),
    
    resetGame: () => set({ 
      gameState: "menu",
      currentLevel: 1,
      score: 0,
      matches: 0,
      hintsUsed: 0
    }),
    
    updateHighScore: () => {
      const { score, highScore } = get();
      if (score > highScore) {
        set({ highScore: score });
        localStorage.setItem("cryptoMatcherHighScore", score.toString());
      }
    }
  }))
);
