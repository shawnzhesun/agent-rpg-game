import EngineerAgentAvatar from '../../components/object-graphics/EngineerAgentAvatar';
import { AgentAvatarObject } from './AgentAvatarObject';

export class EngineerAgentAvartarObject extends AgentAvatarObject {
  renderComponent(): JSX.Element {
    return <EngineerAgentAvatar onFocus={this.onFocus} selected={this.selected} />
  }
}
