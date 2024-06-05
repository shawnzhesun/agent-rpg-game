import axios from 'axios';
import { KeyController } from './KeyController';
import { GameLoop } from './GameLoop';
import { GameObject } from './GameObject';
import { CharacterObject } from './game-objects/CharacterObject';
import { ACTION_COMMAND, CANCEL_COMMAND, DIRECTION_COMMAND } from '../utils/constants';
import { TextBoxObject } from './game-objects/TextBoxObject';
import { Conversation } from './Conversation';
import { IAgentObject } from '../atoms/AgentsAtom';
import { AgentObject } from './game-objects/AgentObject';
import { TileObject } from './game-objects/TileObject';
import { playSound } from '../utils/audio';

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
  activeConversation?: Conversation;

  constructor(
    public agentList: IAgentObject[],
    public onEmit: (newState: IMapState) => void
  ) {
    this.onEmit = onEmit;
    this.tileWidth = 20;
    this.tileHeight = 12;
    this.gameObjects = [
      new CharacterObject({ id: 'character1', x: 1, y: 1}, this),
      new TextBoxObject({ id: 'text-box', x: 1, y: 15, content: ''}, this),
      new TileObject({ id: 'tile1', x: 3, y: 6}, this),
    ].concat(agentList.map(agent => {
      return new AgentObject(agent, this, agent.gameFrameCoordiante, agent.name);
    }));
    this.keyController = new KeyController();
    this.keyController.register();
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
    } else if (this.keyController.lastHeldKey && this.keyController.lastHeldKey === CANCEL_COMMAND) {
      this.clearConversation();
    }
    else {
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
    if (this.activeConversation?.role === conversation.role) {
      // The requested conversation is still in progress
      const currentMessage = this.activeConversation.currentMessage();
      if (currentMessage?.needUserInput) {
        this.keyController.unregister();
        this.userInput();
      } else if (currentMessage?.role === 'character') {
        this.talkToAgent(conversation.role);
      } else {
        const nextMessage = this.activeConversation.nextMessage();
        if (nextMessage === null || !nextMessage.needUserInput) {
          this.activeConversation = undefined;
          this.updateTextBoxContent('');
        } else if (nextMessage) {
          this.updateTextBoxContent(`${nextMessage.role}: ${nextMessage.content}`);
        }
      }
    } else {
      // Start a new conversation
      playSound('conversation');
      this.activeConversation = conversation;
      const nextMessage = this.activeConversation.nextMessage();
      if (nextMessage) {
        this.updateTextBoxContent(`${nextMessage.role}: ${nextMessage.content}`);
      }
    }
  }

  updateTextBoxContent(newContent: string) {
    if (this.textBoxRef) {
      if (this.textBoxRef.userInput) {
        this.textBoxRef.dismissUserInput();
      }
      this.textBoxRef.updateContent(newContent);
      this.onEmit(this.getState());
    }
    if (!this.keyController.registered) {
      this.keyController.register();
    }
  }

  userInput() {
    if (this.textBoxRef) {
      this.textBoxRef.requestUserInput();
      this.onEmit(this.getState());
    }
  }

  talkToAgent(agentId: string) {
    const currentMessage = this.activeConversation?.currentMessage();
    if (!currentMessage || currentMessage.role !== 'character') {
      throw new Error('Invalid role requesting chatting to agents');
    }
    const sendMessage = async (id: string, message: string) => {
      try {
        const { data } = await axios.post(`http://localhost:3000/chat/${id}`, {
          message,
        });
        if (data && data.response) {
          this.activeConversation?.messages?.push({
            role: agentId,
            content: data.response,
            needUserInput: this.activeConversation.messages.length < this.activeConversation?.messageLengthLimit,
          });
          console.log(data.response);
          this.activeConversation?.nextMessage();
          this.updateTextBoxContent(`${agentId}: ${data.response}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    sendMessage(agentId, currentMessage.content);
  }

  clearConversation() {
    if (this.activeConversation) {
      this.activeConversation = undefined;
      this.updateTextBoxContent('');
    }
  }

  destroy() {
    this.gameLoop.stop();
    this.keyController.unregister();
  }
}
