import { MessageInterface } from './message.interface';

export interface TokenInterface extends Partial<MessageInterface> {
  access_token: string;
}
