import React from "react";
import { TileData } from "../hooks/useGameLogic";

interface TileProps {
  tile: TileData;
  isFlipped: boolean;
  onClick: () => void;
  disabled: boolean;
}

const Tile: React.FC<TileProps> = ({ tile, isFlipped, onClick, disabled }) => {
  const getCryptoLogo = (type: string) => {
    const logoMap: { [key: string]: string } = {
      btc: "/images/crypto/btc.svg",
      usdt: "/images/crypto/usdt.svg",
      ada: "/images/crypto/ada.svg",
      bnb: "/images/crypto/bnb.svg",
      sol: "/images/crypto/sol.svg",
      eth: "/images/crypto/eth.svg",
      ethos: "/images/ethos-logo.svg"
    };
    return logoMap[type] || "/images/ethos-logo.svg";
  };

  const getCryptoName = (type: string) => {
    const nameMap: { [key: string]: string } = {
      btc: "BITCOIN",
      usdt: "TETHER", 
      ada: "CARDANO",
      bnb: "BINANCE",
      sol: "SOLANA",
      eth: "ETHEREUM",
      ethos: "ETH OS"
    };
    return nameMap[type] || type.toUpperCase();
  };

  return (
    <div
      className={`tile ${isFlipped ? "flipped" : ""} ${tile.isMatched ? "matched" : ""}`}
      onClick={!disabled ? onClick : undefined}
      style={{ cursor: disabled ? "default" : "pointer" }}
    >
      <div className="tile-inner">
        <div className="tile-front"></div>
        <div className="tile-back">
          <div className="crypto-logo">
            <img 
              src={getCryptoLogo(tile.type)}
              alt={`${getCryptoName(tile.type)} Logo`}
              width="32" 
              height="32"
              style={{ 
                filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))',
                objectFit: 'contain'
              }}
            />
          </div>
          <span className="crypto-name">{getCryptoName(tile.type)}</span>
        </div>
      </div>
    </div>
  );
};

export default Tile;
