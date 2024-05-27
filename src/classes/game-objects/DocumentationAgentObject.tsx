import DocumentationAgent from "../../components/object-graphics/Agent";
import { Conversation } from "../Conversation";
import { AgentObject } from './AgentObject';

export class DocumentationAgentObject extends AgentObject {
  type = 'documentation-agent';

  conversation() {
    // TODO: Implement dynamic conversation based on LLM
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

  tick() {}

  renderComponent(): JSX.Element {
    return <DocumentationAgent frameCoordinate='0x2' />
  }
}