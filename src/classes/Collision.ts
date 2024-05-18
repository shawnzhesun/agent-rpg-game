import { GameObject } from "./GameObject";
import { LevelState } from "./LevelState";

export class Collision {
  objectsAtPosition: GameObject[]

  constructor(
    public forBody: GameObject,
    public level: LevelState,
    public x: number | null,
    public y: number | null,
  ) {
    this.forBody = forBody;
    this.level = level;
    this.x = x ? x : forBody.x;
    this.y = y ? y : forBody.y;
    this.objectsAtPosition = [];
    this.scanObjectAtPosition();
  }

  scanObjectAtPosition() {
    const extraWidth = this.forBody.collisionWidth - 1;
    const extraHeight = this.forBody.collisionHeight - 1;
    this.objectsAtPosition = this.level.gameObjects.filter((object) => {
      const objectExtraWidth = object.collisionWidth - 1;
      const objectExtraHeight = object.collisionHeight - 1;
      return object.id !== this.forBody.id &&
        object.x + objectExtraWidth >= this.x! &&
        object.x <= this.x! + extraWidth &&
        object.y + objectExtraHeight >= this.y! &&
        object.y <= this.y! + extraHeight;
    });
  }

  isCollision() {
    return this.objectsAtPosition.length > 0;
  }
}
