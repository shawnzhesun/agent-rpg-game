import AgentAvatar from "../../components/object-graphics/AgentAvatar";
import { CELL_SIZE } from "../../utils/constants";

export class AgentAvatarObject {
  selected: boolean = false;
  onFocus: boolean = false;

  constructor(
    public id: string,
    public x: number,
    public y: number,
    public bodyFrameCoordinate: string,
    public portraitFrameCoordinate: string,
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.bodyFrameCoordinate = bodyFrameCoordinate;
    this.portraitFrameCoordinate = portraitFrameCoordinate;
  }


  displayXY() {
    const x = this.x * 2 * CELL_SIZE;
    const y = this.y * 2 * CELL_SIZE;
    return [x, y];
  }

  focus() {
    this.onFocus = true;
  }

  unfocus() {
    this.onFocus = false;
  }

  toggleSelection() {
    this.selected = !this.selected;
  }

  renderComponent() {
    return <AgentAvatar
      onFocus={this.onFocus}
      selected={this.selected}
      bodyFrameCoordinate={this.bodyFrameCoordinate}
      portraitFrameCoordinate={this.portraitFrameCoordinate}
      x={this.x}
      y={this.y}
    />
  }
}
