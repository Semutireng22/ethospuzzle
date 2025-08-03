import React from "react";
import { useAudio } from "../lib/stores/useAudio";

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
  const { isMuted, toggleMute } = useAudio();

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
      <button className="retro-button" onClick={toggleMute}>
        {isMuted ? "🔇 SOUND OFF" : "🔊 SOUND ON"}
      </button>
    </div>
  );
};

export default ControlPanel;
