import { LevelPlacementIFace } from "../components/level-layout/LevelPlacement";

export type LevelStateIFace = {
  tileWidth: number;
  tileHeight: number;
  placements: LevelPlacementIFace[];
}

export class LevelState {
  levelId: string;
  onEmit: (newState: LevelStateIFace) => void;
  tileWidth: number;
  tileHeight: number;
  placements: LevelPlacementIFace[];

  constructor(levelId: string, onEmit: (newState: LevelStateIFace) => void) {
    this.levelId = levelId;
    this.onEmit = onEmit;
    this.tileWidth = 10;
    this.tileHeight = 7;
    this.placements = [
      { id: 0, x: 4, y: 7, frameCoordinate: '0x2'},
      { id: 1, x: 5, y: 7, frameCoordinate: '0x2'},
    ];
  }

  getState(): LevelStateIFace {
    return {
      tileWidth: this.tileWidth,
      tileHeight: this.tileHeight,
      placements: this.placements,
    };
  }

  destroy() {

  }
}
