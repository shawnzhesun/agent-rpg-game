import { DIRECTION_LEFT, DIRECTION_DOWN, DIRECTION_RIGHT, DIRECTION_UP, ACTION_COMMAND } from "../utils/constants";

export class KeyController {
  heldKeys: string[];
  keyDownHandler: (event: KeyboardEvent) => void;
  keyUpHandler: (event: KeyboardEvent) => void;

  constructor() {
    this.heldKeys = [];

    this.keyDownHandler = (event: KeyboardEvent) => {
      const command = this.commandFromKey(event.key);
      if (command && this.heldKeys.indexOf(command) === -1) {
        this.heldKeys.unshift(command);
      }
    }

    this.keyUpHandler = (event: KeyboardEvent) => {
      const command = this.commandFromKey(event.key);
      if (!command) return;
      const keyIndex = this.heldKeys.indexOf(command);
      if (keyIndex > -1) {
        this.heldKeys.splice(keyIndex, 1);
      }
    }

    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
  }

  get lastHeldKey() {
    return this.heldKeys[0];
  }

  unbind() {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
  }

  commandFromKey(keyName: string): string | null {
    switch (keyName) {
      case 'ArrowLeft':
      case 'a':
        return DIRECTION_LEFT;
      case 'ArrowUp':
      case 'w':
        return DIRECTION_UP;
      case 'ArrowRight':
      case 'd':
        return DIRECTION_RIGHT;
      case 'ArrowDown':
      case 's':
          return DIRECTION_DOWN;
      case ' ':
      case 'Enter':
          return ACTION_COMMAND;
      default:
        return null;
    }
  }
}
