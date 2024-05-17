import { CELL_SIZE, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP } from "../utils/constants";
import { LevelState } from "./LevelState";

export interface IGameObject {
  id: string;
  type: string;
  x: number;
  y: number;
}

export abstract class GameObject implements IGameObject {
  id: string;
  x: number;
  y: number;
  type: string = '';
  level: LevelState;
  collisionWidth: number = 1;
  collisionHeight: number = 1;
  protected travelPixelsPerFrame: number;
  protected movingPixelsRemaining: number;
  protected movingPixelsDirection: string;

  constructor(
    properties: IGameObject,
    level: LevelState
  ) {
    this.id = properties.id;
    this.x = properties.x;
    this.y = properties.y;
    this.level = level;
    this.travelPixelsPerFrame = 1.5;
    this.movingPixelsRemaining = 0;
    this.movingPixelsDirection = DIRECTION_RIGHT;
  }

  /**
   * Render the component
   */
  abstract renderComponent(): JSX.Element;

  /**
   * Tick the game object in the game loop
   */
  abstract tick(): void;

  displayXY() {
    if (this.movingPixelsRemaining > 0) {
      return this.displayMovingXY();
    }
    const x = this.x * CELL_SIZE;
    const y = this.y * CELL_SIZE;
    return [x, y];
  }

  displayMovingXY() {
    const x = this.x * CELL_SIZE;
    const y = this.y * CELL_SIZE;
    const progressPixels = CELL_SIZE - this.movingPixelsRemaining;
    switch (this.movingPixelsDirection) {
      case DIRECTION_LEFT:
        return [x - progressPixels, y];
      case DIRECTION_UP:
        return [x, y - progressPixels];
      case DIRECTION_DOWN:
        return [x, y + progressPixels];
      default:
        return [x + progressPixels, y];
    }
  }
}
