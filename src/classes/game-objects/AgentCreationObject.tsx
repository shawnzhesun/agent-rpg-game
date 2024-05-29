import AgentCreation from '../../components/object-graphics/AgentCreation';
import { AgentAvatarObject } from './AgentAvatarObject';

export class AgentCreationObject extends AgentAvatarObject {
  renderComponent(): JSX.Element {
    return <AgentCreation onFocus={this.onFocus} selected={this.selected} frameCoordinate='1x0' />
  }
}
