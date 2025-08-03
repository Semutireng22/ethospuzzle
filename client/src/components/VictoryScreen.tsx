import React from "react";

interface VictoryScreenProps {
  level: number;
  score: number;
  onNextLevel: () => void;
  onReset: () => void;
}

const VictoryScreen: React.FC<VictoryScreenProps> = ({
  level,
  score,
  onNextLevel,
  onReset
}) => {
  return (
    <div className="victory-screen">
      <div className="victory-content">
        <h2 className="victory-title">LEVEL COMPLETE!</h2>
        
        <div className="blinking-text">
          <div className="blink-1">WEN CODE</div>
          <div className="blink-2">ETH OS</div>
        </div>

        <div className="victory-logo">
          <svg width="80" height="80" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="victoryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:"#87CEEB"}} />
                <stop offset="50%" style={{stopColor:"#6495ED"}} />
                <stop offset="100%" style={{stopColor:"#4169E1"}} />
              </linearGradient>
            </defs>
            <polygon 
              points="50,10 90,50 50,90 10,50" 
              fill="url(#victoryGradient)" 
              stroke="#000" 
              strokeWidth="2"
            />
            <rect x="35" y="35" width="6" height="8" fill="#000" />
            <rect x="59" y="35" width="6" height="8" fill="#000" />
            <path d="M 30 60 Q 50 75 70 60" stroke="#000" strokeWidth="3" fill="none" />
            <line x1="50" y1="20" x2="50" y2="80" stroke="#000" strokeWidth="3" />
          </svg>
        </div>

        <div className="victory-stats">
          <p>Level: {level}</p>
          <p>Final Score: {score}</p>
        </div>

        <div className="victory-buttons">
          <button className="retro-button" onClick={onNextLevel}>
            NEXT LEVEL
          </button>
          <button className="retro-button" onClick={onReset}>
            PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default VictoryScreen;
