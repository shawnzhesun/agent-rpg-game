import DummyAgentAvartar from '../../components/object-graphics/DummyAgentAvatar';
import { AgentAvatarObject } from './AgentAvatarObject';

export class DummyAgentAvartarObject extends AgentAvatarObject {
  renderComponent(): JSX.Element {
    return <DummyAgentAvartar onFocus={this.onFocus}/>
  }
}
