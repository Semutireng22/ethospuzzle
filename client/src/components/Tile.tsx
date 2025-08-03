import React from "react";
import { TileData } from "../hooks/useGameLogic";

interface TileProps {
  tile: TileData;
  isFlipped: boolean;
  onClick: () => void;
  disabled: boolean;
}

const Tile: React.FC<TileProps> = ({ tile, isFlipped, onClick, disabled }) => {
  const getCryptoIcon = (type: string) => {
    const iconMap: { [key: string]: string } = {
      btc: "₿",
      eth: "Ξ",
      ethos: "◊", // Will be replaced with actual logo
      sol: "◎",
      bnb: "⬢",
      ada: "₳"
    };
    return iconMap[type] || "?";
  };

  const getCryptoColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      btc: "#f7931a",
      eth: "#627eea",
      ethos: "#8a2be2",
      sol: "#9945ff",
      bnb: "#f3ba2f",
      ada: "#0033ad"
    };
    return colorMap[type] || "#666";
  };

  return (
    <div
      className={`tile ${isFlipped ? "flipped" : ""} ${tile.isMatched ? "matched" : ""}`}
      onClick={!disabled ? onClick : undefined}
      style={{ cursor: disabled ? "default" : "pointer" }}
    >
      <div className="tile-inner">
        <div className="tile-front"></div>
        <div 
          className="tile-back"
          style={{ 
            color: getCryptoColor(tile.type),
            borderColor: getCryptoColor(tile.type)
          }}
        >
          {tile.type === "ethos" ? (
            <div className="ethos-logo">
              <svg width="40" height="40" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="ethosGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:"#87CEEB"}} />
                    <stop offset="50%" style={{stopColor:"#6495ED"}} />
                    <stop offset="100%" style={{stopColor:"#4169E1"}} />
                  </linearGradient>
                </defs>
                <polygon 
                  points="50,10 90,50 50,90 10,50" 
                  fill="url(#ethosGradient)" 
                  stroke="#000" 
                  strokeWidth="2"
                />
                {/* Face elements */}
                <rect x="35" y="35" width="6" height="8" fill="#000" />
                <rect x="59" y="35" width="6" height="8" fill="#000" />
                <path d="M 30 60 Q 50 75 70 60" stroke="#000" strokeWidth="3" fill="none" />
                <line x1="50" y1="20" x2="50" y2="80" stroke="#000" strokeWidth="3" />
              </svg>
            </div>
          ) : (
            <span className="crypto-icon">{getCryptoIcon(tile.type)}</span>
          )}
          <span className="crypto-name">{tile.type.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default Tile;
