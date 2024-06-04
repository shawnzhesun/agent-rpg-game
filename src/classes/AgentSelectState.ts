import { IAgentObject } from '../atoms/AgentsAtom';
import { ACTION_COMMAND, DIRECTION_COMMAND, DIRECTION_MAP } from '../utils/constants';
import { GameLoop } from './GameLoop';
import { KeyController } from './KeyController';
import { AgentAvatarObject } from './game-objects/AgentAvatarObject';
import { AgentConfirmObject } from './game-objects/AgentConfirmObject';
import { AgentCreationObject } from './game-objects/AgentCreationObject';
import { DummyAgentAvartarObject } from './game-objects/DummyAgentAvartarObject';

export type IAgentSelectState = {
  selectionTileWidth: number;
  selectionTileHeight: number;
  agents: AgentAvatarObject[];
}

export class AgentSelectState implements IAgentSelectState {
  selectionTileWidth: number;
  selectionTileHeight: number;
  agents: AgentAvatarObject[];
  keyController: KeyController;
  gameLoop: GameLoop;
  cursor: SelectCursor;

  constructor(
    public agentList: IAgentObject[],
    public onEmit: (newState: IAgentSelectState) => void
  ) {
    this.onEmit = onEmit;
    this.selectionTileWidth = 5;
    this.selectionTileHeight = 2;
    this.agents = [];
    let index = 0;
    for(let i = 0; i < this.selectionTileWidth; i++) {
      for(let j = 0; j < this.selectionTileHeight; j++) {
        const agent = agentList[index];
        if (agent) {
          this.agents.push(new AgentAvatarObject(agent.id, i, j, agent.bodyFrameCoordinate, agent.portraitFrameCoordinate));
        } else {
          this.agents.push(new DummyAgentAvartarObject(`f${i}${j}`, i, j, '18.5x0.5', ''));
        }
        index++;
      }
    }
    this.agents.push(new AgentCreationObject('agent-creation', this.selectionTileWidth, 0, '', ''));
    this.agents.push(new AgentConfirmObject('agent-confirm', this.selectionTileWidth, 1, '', ''));
    this.keyController = new KeyController();
    this.gameLoop = new GameLoop(() => {
      this.tick();
    });
    this.cursor = new SelectCursor(this);
    this.agents[0].focus();
  }

  getState(): IAgentSelectState {
    return {
      selectionTileWidth: this.selectionTileWidth,
      selectionTileHeight: this.selectionTileHeight,
      agents: this.agents,
    };
  }

  agentAtPosition(x: number, y: number) {
    return this.agents.find(agent => agent.x === x && agent.y === y);
  }

  tick() {
    if (this.keyController.lastHeldKey && this.keyController.lastHeldKey === ACTION_COMMAND) {
      this.cursor.toggleSelection();
    } else if (this.keyController.lastHeldKey && DIRECTION_COMMAND.includes(this.keyController.lastHeldKey)) {
      this.cursor.move(this.keyController.lastHeldKey);
    } else {
      this.cursor.stopMoving();
    }
    this.onEmit(this.getState());
  }

  destroy() {
    this.gameLoop.stop();
    this.keyController.unbind();
  }
}

class SelectCursor {
  x: number;
  y: number;
  commandTriggered: boolean = false;

  constructor(
    private state: AgentSelectState,
  ) {
    this.x = 0;
    this.y = 0;
  }

  move(direction: string) {
    if (this.commandTriggered) return;
    if (this.checkMoveability(direction)) {
      const currentAgent = this.state.agentAtPosition(this.x, this.y);
      currentAgent?.unfocus();
      const {x, y} = DIRECTION_MAP[direction];
      this.x += x;
      this.y += y;
      const nextAgent = this.state.agentAtPosition(this.x, this.y);
      nextAgent?.focus();
    }
    this.commandTriggered = true;
    const switchSoundEl = (document.getElementById('ui-switch') as HTMLAudioElement);
    if (switchSoundEl) {
      switchSoundEl.currentTime = 0;
      switchSoundEl.play();
    }
  }

  stopMoving() {
    this.commandTriggered = false;
  }

  checkMoveability(direction: string) {
    const {x, y} = DIRECTION_MAP[direction];
    const nextX = this.x + x;
    const nextY = this.y + y;
    const isOutOfBound = this.isPositionOutOfBound(nextX, nextY);
    if (isOutOfBound) return false;
    return true;
  }

  isPositionOutOfBound(x: number, y: number) {
    return (
      x < 0 ||
      y < 0 ||
      x > this.state.selectionTileWidth ||
      y >= this.state.selectionTileHeight
    );
  }

  toggleSelection() {
    if (this.commandTriggered) return;
    const currentAgent = this.state.agentAtPosition(this.x, this.y);
    currentAgent?.toggleSelection();
    this.commandTriggered = true;
  }
}
