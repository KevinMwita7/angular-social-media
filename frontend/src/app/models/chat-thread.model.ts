import { ChatMessage } from './chat-message.model';
import { uuid } from '../util/uuid';

// A ChatThread is a group of users exchanging Messages
export class ChatThread {
    _id?: string;
    name?: string;
    avatarSrc?: string;
    lastMessage?: ChatMessage;

    constructor(
        _id?: string,
        name?: string,
        avatarSrc?: string,
        lastMessage?: ChatMessage
    ) {
        this._id = _id;
        this.name = name || null;
        this.avatarSrc = avatarSrc || null;
        if (lastMessage) {
            this.lastMessage._id = lastMessage._id || null;
            this.lastMessage.body = lastMessage.body || null;
            this.lastMessage.conversation_id = lastMessage.conversation_id || null;
            this.lastMessage.createdAt = lastMessage.createdAt || null;
            this.lastMessage.sender_id = lastMessage.sender_id || null;
        }
    }
}
