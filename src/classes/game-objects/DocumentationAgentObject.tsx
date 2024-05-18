import DocumentationAgent from "../../components/object-graphics/DocumentationAgent";
import { GameObject } from "../GameObject";

export class DocumentationAgentObject extends GameObject {
  type = 'documentation-agent';
  collisionWidth = 2;
  collisionHeight = 1;

  tick() {

  }

  renderComponent(): JSX.Element {
    return <DocumentationAgent frameCoordinate='0x2' />
  }
}
