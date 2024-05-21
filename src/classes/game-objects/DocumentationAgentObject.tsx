import DocumentationAgent from "../../components/object-graphics/DocumentationAgent";
import { Conversation } from "../Conversation";
import { GameObject } from "../GameObject";

export class DocumentationAgentObject extends GameObject {
  type = 'documentation-agent';
  collisionWidth = 2;
  collisionHeight = 1;
  hasConversation = true;

  conversation() {
    // TODO: Implement dynamic conversation based on LLM
    return new Conversation(
      'conv-1',
      'documentation-agent',
      [
        {
          role: 'documentation-agent',
          content: 'message 1',
        },
        {
          role: 'character',
          content: 'message 2',
        },
        {
          role: 'documentation-agent',
          content: 'message 3',
        },
      ]
    );
  }

  tick() {}

  renderComponent(): JSX.Element {
    return <DocumentationAgent frameCoordinate='0x2' />
  }
}