import DocumentationAgentAvatar from '../../components/object-graphics/DocumentationAgentAvatar';
import { AgentAvatarObject } from './AgentAvatarObject';

export class DocumentationAgentAvartarObject extends AgentAvatarObject {
  renderComponent(): JSX.Element {
    return <DocumentationAgentAvatar onFocus={this.onFocus} selected={this.selected}/>
  }
}
