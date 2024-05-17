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
    console.log(`forBody x ${this.forBody.x} y ${this.forBody.y} collision x ${this.x} y ${this.y}`);
    this.objectsAtPosition = this.level.gameObjects.filter((object) => {
      return object.id !== this.forBody.id &&
        object.x >= this.x! &&
        object.x <= this.x! + extraWidth &&
        object.y >= this.y! &&
        object.y <= this.y! + extraHeight;
    });
    console.log(this.objectsAtPosition);
  }

  isCollision() {
    return this.objectsAtPosition.length > 0;
  }
}
