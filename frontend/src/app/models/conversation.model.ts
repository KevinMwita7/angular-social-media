import { ChatMessage } from './chat-message.model';

export class Conversation {
    conversation_id: string;
    messages: ChatMessage[];

    constructor(
        conversation_id: string,
        messages: ChatMessage[]) {
            this.conversation_id = conversation_id;
            this.messages = messages;
    }
}
