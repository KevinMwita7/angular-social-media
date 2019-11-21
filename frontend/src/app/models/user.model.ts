import { uuid } from '../util/uuid';

/**
 * A User represents an agent that sends messages
 */
export class User {

  constructor(public _id: string,
              public name: string,
              public avatarSrc: string,
              public accountId: string) {
  }
}
