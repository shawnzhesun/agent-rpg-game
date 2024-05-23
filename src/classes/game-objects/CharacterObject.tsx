import Character from '../../components/object-graphics/Character';
import { DIRECTION_MAP, CELL_SIZE, DIRECTION_RIGHT, DIRECTION_LEFT } from '../../utils/constants';
import { Collision } from '../Collision';
import { GameObject, IGameObject } from '../GameObject';
import { LevelState } from '../LevelState';

/**
 * The main character object, handles most of the game logic.
 */
export class CharacterObject extends GameObject {
  type = 'character';
  collisionWidth = 2;
  collisionHeight = 1;
  spriteWalkFrame: number;
  facingDirection: string;
  actionTriggered: boolean = false;

  constructor(
    properties: IGameObject,
    level: LevelState
  ) {
    super(properties, level);
    this.spriteWalkFrame = 0;
    this.facingDirection = DIRECTION_RIGHT;
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

    this.movingPixelsDirection = direction;
    if (this.movingPixelsDirection === DIRECTION_LEFT ||
      this.movingPixelsDirection === DIRECTION_RIGHT
    ) {
      this.facingDirection = this.movingPixelsDirection;
    }

    // Move limit check
    const canMove = this.checkMoveability(direction);
    if (!canMove) return;

    this.updateWalkFrame();
    this.movingPixelsRemaining = CELL_SIZE;
  }

  checkMoveability(direction: string) {
    const {x, y} = DIRECTION_MAP[direction];
    const nextX = this.x + x;
    const nextY = this.y + y;
    const isOutOfBound = this.level.isPositionOutOfBound(
      nextX,
      nextY,
    );
    if (isOutOfBound) return false;

    const collision = new Collision(this, this.level, nextX, nextY);
    if (collision.isCollision()) return false;
    if (this.level.conversation) return false;
    return true;
  }

  stopRequested() {
    this.spriteWalkFrame = 0;
    this.actionTriggered = false;
  }

  actionRequested() {
    if (this.actionTriggered) return;
    const conversationTarget = this.scanForConversationTarget();
    if (!conversationTarget) return;
    const conversation = conversationTarget.conversation();
    this.level.conversationAction(conversation!);
    this.actionTriggered = true;
  }

  scanForConversationTarget() {
    const conversationObjects = this.level.gameObjects.filter((object) => {
      return object.id !== this.id &&
        object.hasConversation === true &&
        (
          object.x + (object.collisionWidth - 1) === this.x - 1 && object.y === this.y ||
          object.x - 1 === this.x + (this.collisionWidth - 1) && object.y === this.y ||
          object.y + 1 === this.y && object.x === this.x ||
          object.y -1 === this.y && object.x === this.x
        );
    });
    if (conversationObjects.length === 0) {
      return null;
    } else if (conversationObjects.length > 1) {
      throw new Error('Multiple conversation objects detected');
    }
    return conversationObjects[0];
  }

  updateWalkFrame() {
    if (this.spriteWalkFrame === 4)
      this.spriteWalkFrame = 1;
    else
      this.spriteWalkFrame += 1;
  }

  animationFrame() {
    if (this.movingPixelsRemaining > 0 && this.spriteWalkFrame !== 0) {
      switch (this.spriteWalkFrame) {
        case 1:
          return this.facingDirection === DIRECTION_RIGHT ? '2x0' : '6x0';
        case 2:
          return this.facingDirection === DIRECTION_RIGHT ? '3x0' : '7x0';
        case 3:
          return this.facingDirection === DIRECTION_RIGHT ? '0x0' : '4x0';
        default:
          return this.facingDirection === DIRECTION_RIGHT ? '1x0' : '5x0';
      }
    } else if (this.spriteWalkFrame === 0) {
      return this.facingDirection === DIRECTION_RIGHT ? '0x0' : '4x0';
    }
    return this.facingDirection === DIRECTION_RIGHT ? '1x0' : '5x0';
  }

  renderComponent(): JSX.Element {
    return <Character frameCoordinate={this.animationFrame()}/>
  }
}
