import Agent from '../../components/object-graphics/Agent';
import { Conversation } from '../Conversation';
import { GameObject, IGameObject } from '../GameObject';
import { MapState } from '../MapState';

enum AgentStatus {
  IDLE = 'idle',
  WORKING = 'working',
  WALKING = 'walking',
  TALKING = 'talking',
}

export class AgentObject extends GameObject {
  type = 'agent';
  collisionWidth = 2;
  collisionHeight = 1;
  hasConversation = true;
  frameCoordinate: string;
  name: string;
  status: AgentStatus;

  // Animation properties
  private animationIntervalSecs: number = 0.2;
  private lastFrameChange: number;
  private inConversation: boolean = false;

  constructor(
    properties: IGameObject,
    map: MapState,
    frameCoordinate: string,
    name: string,
  ) {
    super(properties, map);
    this.frameCoordinate = frameCoordinate;
    this.name = name;
    this.status = AgentStatus.IDLE;
    this.lastFrameChange = new Date().getTime();
  }

  tick() {
    // For everyh animationIntervalSecs, change the frame
    const now = new Date().getTime();
    if (now - this.lastFrameChange > this.animationIntervalSecs * 1000) {
      this.updateAnimationFrame();
      this.lastFrameChange = now;
    }
  }

  conversation(): Conversation {
    return new Conversation(
      this.id,
      [
        {
          role: this.id,
          content: 'Hi there! How can I help you today?',
          needUserInput: true,
        },
      ]
    );
  }

  updateAnimationFrame() {
    const frameY = this.frameCoordinate.split('x')[1];
    const frameX = this.frameCoordinate.split('x')[0];
    if (this.status === AgentStatus.TALKING) {
      this.inConversation = true;
    } else {
      this.inConversation = false;
    }
    if (this.status === AgentStatus.WALKING) {
      const walkingFrames = ['0', '1', '2', '3'];
      const currentFrameIndex = walkingFrames.indexOf(frameX);
      if (currentFrameIndex === walkingFrames.length - 1) {
        this.frameCoordinate = walkingFrames[0] + 'x' + frameY;
      } else {
        this.frameCoordinate = `${walkingFrames[currentFrameIndex + 1]}x${frameY}`;
      }
    } else if (this.status === AgentStatus.WORKING) {
      const workingFrames = ['8', '9', '10', '11', '12', '13'];
      const currentFrameIndex = workingFrames.indexOf(frameX);
      if (currentFrameIndex === workingFrames.length - 1) {
        this.frameCoordinate = workingFrames[0] + 'x' + frameY;
      } else {
        this.frameCoordinate = `${workingFrames[currentFrameIndex + 1]}x${frameY}`;
      }
    } else if (this.status === AgentStatus.IDLE) {
      const idleFrames = ['4', '5', '6', '7'];
      const currentFrameIndex = idleFrames.indexOf(frameX);
      if (currentFrameIndex === idleFrames.length - 1) {
        this.frameCoordinate = `${idleFrames[0]}x${frameY}`;
      } else {
        this.frameCoordinate = `${idleFrames[currentFrameIndex + 1]}x${frameY}`;
      }
    }
  }

  renderComponent() {
    return <Agent frameCoordinate={this.frameCoordinate} inConversation={this.inConversation}/>
  }
}