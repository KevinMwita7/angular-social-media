//  { AccountDetails } from '../interfaces/account.interface';
import { ChatThread } from './chat-thread.model';
import { uuid } from '../util/uuid';
// ChatMessage represents a message being sent in a ChatThread
export class ChatMessage {
    _id?: string;
    createdAt?: Date;
    isRead: boolean;
    sender_id: string;
    body: string;
    conversation_id: string;
    thread: ChatThread;

    constructor(obj?: any) {
        this._id                   = obj && obj._id          || uuid();
        this.isRead                = obj && obj.isRead       || false;
        this.createdAt             = obj && obj.sentAt       || new Date();
        this.sender_id             = obj && obj.author       || null;
        this.body                  = obj && obj.body         || null;
        this.conversation_id       = obj && obj.conversation_id       || null;
        this.thread                = obj && obj.thread       || null;
      }
}
