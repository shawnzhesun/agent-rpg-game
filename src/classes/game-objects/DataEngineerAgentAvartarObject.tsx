import DataEngineerAgentAvartar from '../../components/object-graphics/DataEngineerAgentAvatar';
import { AgentAvatarObject } from './AgentAvatarObject';

export class DataEngineerAgentAvartarObject extends AgentAvatarObject {
  renderComponent(): JSX.Element {
    return <DataEngineerAgentAvartar onFocus={this.onFocus} selected={this.selected}/>
  }
}
