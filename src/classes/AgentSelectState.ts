import { ACTION_COMMAND, DIRECTION_COMMAND, DIRECTION_MAP } from '../utils/constants';
import { GameLoop } from './GameLoop';
import { KeyController } from './KeyController';
import { AgentAvatarObject } from './game-objects/AgentAvatarObject';
import { DataEngineerAgentAvartarObject } from './game-objects/DataEngineerAgentAvartarObject';
import { DocumentationAgentAvartarObject } from './game-objects/DocumentationAgentAvartarObject';
import { DummyAgentAvartarObject } from './game-objects/DummyAgentAvartarObject';
import { EngineerAgentAvartarObject } from './game-objects/EngineerAgentAvartarObject';

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
    public onEmit: (newState: IAgentSelectState) => void
  ) {
    this.onEmit = onEmit;
    this.selectionTileWidth = 5;
    this.selectionTileHeight = 2;
    this.agents = [
      new DocumentationAgentAvartarObject('documentation-agent', 0, 0),
      new EngineerAgentAvartarObject('engineer-agent', 1, 0),
      new DataEngineerAgentAvartarObject('data-agent', 2, 0),
      new DummyAgentAvartarObject('f1', 3, 0),
      new DummyAgentAvartarObject('f2', 4, 0),
      new DummyAgentAvartarObject('f3', 0, 1),
      new DummyAgentAvartarObject('f4', 1, 1),
      new DummyAgentAvartarObject('f5', 2, 1),
      new DummyAgentAvartarObject('f6', 3, 1),
      new DummyAgentAvartarObject('f7', 4, 1),
    ];
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
      x >= this.state.selectionTileWidth ||
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
