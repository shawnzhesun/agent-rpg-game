import AgentConfirm from '../../components/object-graphics/AgentConfirm';
import { AgentAvatarObject } from './AgentAvatarObject';

export class AgentConfirmObject extends AgentAvatarObject {
  renderComponent(): JSX.Element {
    return <AgentConfirm onFocus={this.onFocus} selected={this.selected} frameCoordinate='0x0' />
  }
}
