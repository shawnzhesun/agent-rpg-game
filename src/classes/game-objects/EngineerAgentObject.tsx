import EngineerAgent from "../../components/object-graphics/EngineerAgent";
import { Conversation } from "../Conversation";
import { AgentObject } from './AgentObject';

export class EngineerAgentObject extends AgentObject {
  type = 'engineer-agent';

  conversation() {
    // TODO: Implement dynamic conversation based on LLM
    return new Conversation(
      'conv-2',
      'engineer-agent',
      [
        {
          role: 'engineer-agent',
          content: 'Hi there! I am the engineer agent. I can help you with your questions.',
        },
        {
          role: 'character',
          content: 'Hi! I have a question about the game.',
        },
        {
          role: 'engineer-agent',
          content: 'Sure! What would you like to know?',
        },
      ]
    );
  }

  tick() {}

  renderComponent(): JSX.Element {
    return <EngineerAgent frameCoordinate='0x3' />
  }
}