export const CELL_SIZE: number = 16;

export const DIRECTION_LEFT: string = 'left';
export const DIRECTION_RIGHT: string = 'right';
export const DIRECTION_UP: string = 'up';
export const DIRECTION_DOWN: string = 'down';

export const DIRECTION_COMMAND: string[] = [DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_RIGHT]
export const ACTION_COMMAND: string = 'action';
export const CANCEL_COMMAND: string = 'cancel';

export const DIRECTION_MAP = {
  [DIRECTION_LEFT]: { x: -1, y: 0 },
  [DIRECTION_DOWN]: { x: 0, y: 1 },
  [DIRECTION_RIGHT]: { x: 1, y: 0 },
  [DIRECTION_UP]: { x: 0, y: -1 },
}
