import React from "react";

interface ControlPanelProps {
  onReset: () => void;
  onHint: () => void;
  onFinish: () => void;
  hintsRemaining: number;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onReset,
  onHint,
  onFinish,
  hintsRemaining
}) => {
  return (
    <div className="control-panel">
      <button className="retro-button" onClick={onReset}>
        RESET
      </button>
      <button 
        className="retro-button" 
        onClick={onHint}
        disabled={hintsRemaining <= 0}
      >
        HINT ({hintsRemaining})
      </button>
      <button className="retro-button" onClick={onFinish}>
        FINISH
      </button>
    </div>
  );
};

export default ControlPanel;
