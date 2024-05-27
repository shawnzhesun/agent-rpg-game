import Agent from '../../components/object-graphics/Agent';
import { Conversation } from '../Conversation';
import { GameObject, IGameObject } from '../GameObject';
import { MapState } from '../MapState';

export class AgentObject extends GameObject {
  type= 'agent';
  frameCoordinate: string;
  collisionWidth = 2;
  collisionHeight = 1;
  hasConversation = true;

  constructor(
    properties: IGameObject,
    map: MapState,
    frameCoordinate: string,
  ) {
    super(properties, map);
    this.frameCoordinate = frameCoordinate;
  }

  tick() {}

  conversation(): Conversation {
    return new Conversation(
      'documentation',
      'documentation-agent',
      [
        {
          role: 'documentation-agent',
          content: 'Hi there! I am the documentation agent. I can help you with your questions.',
        },
        {
          role: 'character',
          content: 'Hi! I have a question about the game.',
        },
        {
          role: 'documentation-agent',
          content: 'Sure! What would you like to know?',
        },
      ]
    );
  }

  renderComponent() {
    return <Agent frameCoordinate={this.frameCoordinate}/>
  }
}