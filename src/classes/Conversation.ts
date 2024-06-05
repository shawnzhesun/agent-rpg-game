export interface Message {
  role: string;
  content: string;
  needUserInput?: boolean;
}

export class Conversation {
  currentIndex: number = -1;
  messageLengthLimit: number = 6;

  constructor(
    public role: string,
    public messages?: Message[],
  ) {
    this.role = role;
    this.messages = messages || [];
  }

  currentMessage() {
    if (!this.messages || this.messages.length === 0) {
      return null;
    }
    return this.messages[this.currentIndex];
  }

  nextMessage() {
    if (!this.messages || this.messages.length === 0) {
      throw new Error('No messages in conversation');
    }
    if (this.currentIndex === this.messages.length - 1) {
      return null;
    }
    if (this.currentIndex < this.messages.length - 1) {
      this.currentIndex++;
    }
    return this.messages[this.currentIndex];
  }
}
