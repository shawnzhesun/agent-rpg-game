import { DIRECTION_LEFT, DIRECTION_DOWN, DIRECTION_RIGHT, DIRECTION_UP } from "../utils/constants";

export class DirectionController {
  heldDirections: string[];
  directionKeyDownHandler: (event: KeyboardEvent) => void;
  directionKeyUpHandler: (event: KeyboardEvent) => void;

  constructor() {
    this.heldDirections = [];

    this.directionKeyDownHandler = (event: KeyboardEvent) => {
      const directionKey = this.directionFromKey(event.key);
      if (directionKey && this.heldDirections.indexOf(directionKey) === -1) {
        this.heldDirections.unshift(directionKey);
      }
    }

    this.directionKeyUpHandler = (event: KeyboardEvent) => {
      const directionKey = this.directionFromKey(event.key);
      if (!directionKey) return;
      const keyIndex = this.heldDirections.indexOf(directionKey);
      if (keyIndex > -1) {
        this.heldDirections.splice(keyIndex, 1);
      }
    }

    document.addEventListener('keydown', this.directionKeyDownHandler);
    document.addEventListener('keyup', this.directionKeyUpHandler);
  }

  get direction() {
    return this.heldDirections[0];
  }

  unbind() {
    document.removeEventListener('keydown', this.directionKeyDownHandler);
    document.removeEventListener('keyup', this.directionKeyUpHandler);
  }

  directionFromKey(keyName: string): string | null {
    switch (keyName) {
      case 'ArrowLeft' || 'a':
        return DIRECTION_LEFT;
      case 'ArrowUp' || 'w':
        return DIRECTION_UP;
      case 'ArrowRight' || 'd':
        return DIRECTION_RIGHT;
      case 'ArrowDown' || 's':
          return DIRECTION_DOWN;
      default:
        return null;
    }
  }
}
