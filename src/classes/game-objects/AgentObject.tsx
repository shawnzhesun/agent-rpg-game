import { GameObject } from '../GameObject';

export abstract class AgentObject extends GameObject {
  collisionWidth = 2;
  collisionHeight = 1;
  hasConversation = true;
}