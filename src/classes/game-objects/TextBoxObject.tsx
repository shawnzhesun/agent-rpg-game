import TextBox from "../../components/object-graphics/TextBox";
import { GameObject, IGameObject } from "../GameObject";
import { MapState } from "../MapState";

interface TextBoxObjectProps extends IGameObject {
  content: string;
}

export class TextBoxObject extends GameObject {
  type = 'text-box';
  content: string;

  constructor(properties: TextBoxObjectProps, map: MapState) {
    super(properties, map);
    this.content = properties.content;
  }

  tick() {}

  updateContent(newContent: string) {
    this.content = newContent;
  }

  renderComponent(): JSX.Element {
    return <TextBox content={this.content} />
  }
}
