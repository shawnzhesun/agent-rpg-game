import { CELL_SIZE } from "../../utils/constants";

export abstract class AgentAvatarObject {
  selected: boolean = false;
  onFocus: boolean = false;

  constructor(
    public id: string,
    public x: number,
    public y: number,
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
  }

  abstract renderComponent(): JSX.Element;

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
}
