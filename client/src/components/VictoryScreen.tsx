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
          <img 
            src="/images/ethos-logo.svg" 
            alt="ETH OS Victory Logo" 
            width="80" 
            height="80"
            style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}
          />
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
