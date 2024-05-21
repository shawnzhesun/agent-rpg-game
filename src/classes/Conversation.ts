export interface Message {
  role: string;
  content: string;
}

export class Conversation {
  currentIndex: number = -1;

  constructor(
    public id: string,
    public role: string,
    public messages?: Message[],
  ) {
    this.id = id;
    this.role = role;
    this.messages = messages || [];
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
    const msg = this.messages[this.currentIndex];
    return `${msg.role}: ${msg.content}`;
  }
}
