import TextBox from "../../components/object-graphics/TextBox";
import TextBoxWithInput from "../../components/object-graphics/TextBoxWithInput";
import { GameObject, IGameObject } from "../GameObject";
import { MapState } from "../MapState";

interface TextBoxObjectProps extends IGameObject {
  content: string;
}

export class TextBoxObject extends GameObject {
  type = 'text-box';
  content: string;
  userInput?: boolean;

  constructor(properties: TextBoxObjectProps, map: MapState) {
    super(properties, map);
    this.content = properties.content;
  }

  tick() {}

  updateContent(newContent: string) {
    this.content = newContent;
  }

  renderComponent(): JSX.Element {
    if (!this.userInput) {
      return <TextBox content={this.content} />
    } else {
      return <TextBoxWithInput onSubmit={(inputValue: string) => this.submitUserInput(inputValue)}/>
    }
  }

  requestUserInput() {
    this.userInput = true;
  }

  submitUserInput(inputValue: string) {
    console.log('User input:', inputValue);
    const activeConversation = this.map.activeConversation;
    if (!activeConversation) throw new Error('No active conversation');
    activeConversation.messages?.push({
      role: 'character',
      content: inputValue,
    });
    this.userInput = false;
    this.map.conversationAction(this.map.activeConversation!);
  }
}
