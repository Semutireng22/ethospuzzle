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
              <img 
                src="/images/ethos-logo.svg" 
                alt="ETH OS Logo" 
                width="40" 
                height="40"
                style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))' }}
              />
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
