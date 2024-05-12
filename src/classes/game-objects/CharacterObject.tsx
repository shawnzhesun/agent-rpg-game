import Character from '../../components/object-graphics/Character';
import { DIRECTION_MAP, CELL_SIZE } from '../../utils/constants';
import { GameObject, IGameObject } from '../GameObject';
import { LevelState } from '../LevelState';

export class CharacterObject extends GameObject {
  type = 'character';
  spriteWalkFrame: number;

  constructor(
    properties: IGameObject,
    level: LevelState
  ) {
    super(properties, level);
    this.spriteWalkFrame = 0;
  }

  tick() {
    this.tickMovingPixelProgress();
  }

  tickMovingPixelProgress() {
    if (this.movingPixelsRemaining == 0) {
      return;
    }
    this.movingPixelsRemaining -= this.travelPixelsPerFrame;
    if (this.movingPixelsRemaining <= 0) {
      this.movingPixelsRemaining = 0;
      this.onDoneMoving();
    }
  }

  onDoneMoving() {
    const {x, y} = DIRECTION_MAP[this.movingPixelsDirection];
    this.x += x;
    this.y += y;
  }

  controlRequested(direction: string) {
    // Let the character finish moving to the next position
    if (this.movingPixelsRemaining > 0) return;
    this.updateWalkFrame();
    this.movingPixelsRemaining = CELL_SIZE;
    this.movingPixelsDirection = direction;
  }

  stopRequested() {
    this.spriteWalkFrame = 0;
  }

  updateWalkFrame() {
    if (this.spriteWalkFrame === 3)
      this.spriteWalkFrame = 1;
    else
      this.spriteWalkFrame += 1;
  }

  animationFrame() {
    if (this.movingPixelsRemaining > 0 && this.spriteWalkFrame !== 0) {
      switch (this.spriteWalkFrame) {
        case 1:
          return '2x0';
        case 2:
          return '3x0';
        default:
          return '1x0';
      }
    } else if (this.spriteWalkFrame === 0) {
      return '0x0';
    }
    return '1x0';
  }

  renderComponent(): JSX.Element {
    return <Character frameCoordinate={this.animationFrame()}/>
  }
}
