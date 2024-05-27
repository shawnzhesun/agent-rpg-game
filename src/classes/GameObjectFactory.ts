import { IGameObject, GameObject } from './GameObject';
import { MapState } from './MapState';
import { AgentObject } from './game-objects/AgentObject';
import { CharacterObject } from './game-objects/CharacterObject';
import { TextBoxObject } from './game-objects/TextBoxObject';
import { TileObject } from './game-objects/TileObject';

export class GameObjectFactory {
  createObject(obj: IGameObject, map: MapState, frameCoordinate: string): GameObject {
    const instance = this.inst(obj, map, frameCoordinate);
    return instance;
  }

  inst(obj: IGameObject, map: MapState, frameCoordinate: string): GameObject {
    switch (obj.type) {
      case 'tile':
        return new TileObject(obj, map);
      case 'character':
        return new CharacterObject(obj, map);
      case 'agent':
          return new AgentObject(obj, map, frameCoordinate);
      case 'text-box':
          return new TextBoxObject(obj as TextBoxObject, map);
      default:
        throw new Error('No object type found');
    }
  }
}