import React from "react";
import Tile from "./Tile";
import { TileData } from "../hooks/useGameLogic";

interface GameBoardProps {
  tiles: TileData[];
  flippedTiles: number[];
  onTileClick: (index: number) => void;
  gridSize: number;
}

const GameBoard: React.FC<GameBoardProps> = ({
  tiles,
  flippedTiles,
  onTileClick,
  gridSize
}) => {
  return (
    <div 
      className="game-board"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`
      }}
    >
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
