import { DirectionController } from './DirectionController';
import { GameLoop } from './GameLoop';
import { GameObject } from './GameObject';
import { GameObjectFactory } from './GameObjectFactory';
import { CharacterObject } from './game-objects/CharacterObject';

export type ILevelState = {
  tileWidth: number;
  tileHeight: number;
  gameObjects: GameObject[];
}

export class LevelState implements ILevelState {
  tileWidth: number;
  tileHeight: number;
  gameObjects: GameObject[];
  directionController: DirectionController;
  gameLoop: GameLoop;
  characterRef: CharacterObject;

  constructor(
    public levelId: string,
    public onEmit: (newState: ILevelState) => void
  ) {
    const gameObjectFactory = new GameObjectFactory();
    this.levelId = levelId;
    this.onEmit = onEmit;
    this.tileWidth = 16;
    this.tileHeight = 12;
    this.gameObjects = [
      { id: 'tile1', type: 'tile', x: 3, y: 6},
      { id: 'tile2', type: 'tile', x: 6, y: 6},
      { id: 'character1', type: 'character', x: 1, y: 1},
      { id: 'doc-agent', type: 'documentation-agent', x: 5, y: 2},
    ].map(objectPlacement => {
      return gameObjectFactory.createObject(objectPlacement, this);
    });
    this.directionController = new DirectionController();
    this.gameLoop = new GameLoop(() => {
      this.tick();
    });
    this.characterRef = this.gameObjects.find(o => o.type === 'character')! as CharacterObject;
  }

  tick() {
    if (this.directionController.direction) {
      this.characterRef.controlRequested(this.directionController.direction);
    } else {
      this.characterRef.stopRequested();
    }

    this.gameObjects.forEach(gameObject => {
      gameObject.tick();
    });

    this.onEmit(this.getState());
  }

  getState(): ILevelState {
    return {
      tileWidth: this.tileWidth,
      tileHeight: this.tileHeight,
      gameObjects: this.gameObjects,
    };
  }

  isPositionOutOfBound(x: number, y: number) {
    return (
      x <= 0 ||
      y <= 0 ||
      x >= this.tileWidth + 1  ||
      y >= this.tileHeight + 2
    );
  }

  destroy() {
    this.gameLoop.stop();
    this.directionController.unbind();
  }
}
