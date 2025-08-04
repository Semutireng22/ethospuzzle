// ===================================================================
// client/src/components/GameBoard.tsx (UPDATED)
// ===================================================================
import React from "react";
import Tile from "./Tile";
import { TileData } from "../hooks/useGameLogic";

interface GameBoardProps {
  tiles: TileData[];
  flippedTiles: number[];
  onTileClick: (index: number) => void;
  // Kita tidak lagi memerlukan gridRows dan gridCols di sini
  // karena CSS akan menanganinya secara otomatis.
}

// Hapus gridRows dan gridCols dari props
const GameBoard: React.FC<GameBoardProps> = ({
  tiles,
  flippedTiles,
  onTileClick,
}) => {
  return (
    // HAPUS inline style dari div ini.
    // Biarkan kelas "game-board" dari retro.css yang mengatur layout grid.
    <div className="game-board">
      {tiles.map((tile, index) => (
        <Tile
          key={index}
          tile={tile}
          isFlipped={flippedTiles.includes(index) || tile.isMatched}
          onClick={() => onTileClick(index)}
          disabled={tile.isMatched || flippedTiles.length >= 2}
        />
      ))}
    </div>
  );
};

export default GameBoard;
