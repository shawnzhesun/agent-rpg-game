import Agent from '../../components/object-graphics/Agent';
import { Conversation } from '../Conversation';
import { GameObject, IGameObject } from '../GameObject';
import { MapState } from '../MapState';

export class AgentObject extends GameObject {
  type = 'agent';
  collisionWidth = 2;
  collisionHeight = 1;
  hasConversation = true;
  frameCoordinate: string;
  name: string;

  constructor(
    properties: IGameObject,
    map: MapState,
    frameCoordinate: string,
    name: string,
  ) {
    super(properties, map);
    this.frameCoordinate = frameCoordinate;
    this.name = name;
  }

  tick() {}

  conversation(): Conversation {
    return new Conversation(
      this.id,
      [
        {
          role: this.id,
          content: 'Hi there! How can I help you today?',
        },
        {
          role: 'character',
          content: 'Hi!',
        },
      ]
    );
  }

  renderComponent() {
    return <Agent frameCoordinate={this.frameCoordinate}/>
  }
}