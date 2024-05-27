import { KeyController } from './KeyController';
import { GameLoop } from './GameLoop';
import { GameObject } from './GameObject';
import { GameObjectFactory } from './GameObjectFactory';
import { CharacterObject } from './game-objects/CharacterObject';
import { ACTION_COMMAND, DIRECTION_COMMAND } from '../utils/constants';
import { TextBoxObject } from './game-objects/TextBoxObject';
import { Conversation } from './Conversation';
import { IAgentObject } from '../atoms/AgentsAtom';

export type IMapState = {
  tileWidth: number;
  tileHeight: number;
  gameObjects: GameObject[];
}

export class MapState implements IMapState {
  tileWidth: number;
  tileHeight: number;
  gameObjects: GameObject[];
  keyController: KeyController;
  gameLoop: GameLoop;
  characterRef: CharacterObject;
  textBoxRef: TextBoxObject;
  conversation?: Conversation;

  constructor(
    public agentList: IAgentObject[],
    public onEmit: (newState: IMapState) => void
  ) {
    const gameObjectFactory = new GameObjectFactory();
    this.onEmit = onEmit;
    this.tileWidth = 20;
    this.tileHeight = 12;
    const nonAgentObjects = [
      { id: 'tile1', type: 'tile', x: 3, y: 6},
      { id: 'tile2', type: 'tile', x: 6, y: 6},
      { id: 'character1', type: 'character', x: 1, y: 1},
      { id: 'text-box', type: 'text-box', x: 1, y: 15, content: ''},
    ];
    this.gameObjects = nonAgentObjects.map(o => {
      return gameObjectFactory.createObject(o, this, '');
    }).concat(agentList.map(agent => {
      return gameObjectFactory.createObject(agent, this, agent.gameFrameCoordiante);
    }));
    this.keyController = new KeyController();
    this.gameLoop = new GameLoop(() => {
      this.tick();
    });
    this.characterRef = this.gameObjects.find(o => o.type === 'character')! as CharacterObject;
    this.textBoxRef = this.gameObjects.find(o => o.type === 'text-box')! as TextBoxObject;
  }

  tick() {
    if (this.keyController.lastHeldKey && this.keyController.lastHeldKey === ACTION_COMMAND) {
      this.characterRef.actionRequested();
    } else if (this.keyController.lastHeldKey && DIRECTION_COMMAND.includes(this.keyController.lastHeldKey)) {
      this.characterRef.controlRequested(this.keyController.lastHeldKey);
    } else {
      this.characterRef.stopRequested();
    }

    this.gameObjects.forEach(gameObject => {
      gameObject.tick();
    });

    this.onEmit(this.getState());
  }

  getState(): IMapState {
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

  conversationAction(conversation: Conversation) {
    if (this.conversation?.id === conversation.id) {
      // The requested conversation is in progress
      const nextMessage = this.conversation.nextMessage();
      if (nextMessage === null) {
        this.conversation = undefined;
        this.updateTextBoxContent('');
      } else if (nextMessage) {
        this.updateTextBoxContent(nextMessage);
      }
    } else {
      // Start a new conversation
      this.conversation = conversation;
      const nextMessage = this.conversation.nextMessage();
      if (nextMessage) {
        this.updateTextBoxContent(nextMessage);
      }
    }
  }

  updateTextBoxContent(newContent: string) {
    if (this.textBoxRef) {
      this.textBoxRef.updateContent(newContent);
      this.onEmit(this.getState());
    }
  }

  destroy() {
    this.gameLoop.stop();
    this.keyController.unbind();
  }
}
