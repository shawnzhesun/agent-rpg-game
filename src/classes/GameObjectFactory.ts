import { IGameObject, GameObject } from './GameObject';
import { LevelState } from './LevelState';
import { CharacterObject } from './game-objects/CharacterObject';
import { DocumentationAgentObject } from './game-objects/DocumentationAgentObject';
import { TileObject } from './game-objects/TileObject';

export class GameObjectFactory {
  createObject(obj: IGameObject, level: LevelState): GameObject {
    const instance = this.inst(obj, level);
    // TODO: automatically generate ID
    return instance;
  }

  inst(obj: IGameObject, level: LevelState): GameObject {
    switch (obj.type) {
      case 'tile':
        return new TileObject(obj, level);
      case 'character':
        return new CharacterObject(obj, level);
      case 'documentation-agent':
          return new DocumentationAgentObject(obj, level);
      default:
        throw new Error('No object type found');
    }
  }
}