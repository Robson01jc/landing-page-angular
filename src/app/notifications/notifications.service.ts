import { Injectable } from '@angular/core';
import { scan, Subject } from 'rxjs';

interface Command {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  messages: Subject<Command>;

  constructor() {
    this.messages = new Subject<Command>();
  }

  getMessages() {
    return this.messages.pipe(
      scan((acc, value) => {
        if (value.type === 'clear') {
          return acc.filter((message) => message.id !== value.id);
        }

        return [...acc, value];
      }, [] as Command[])
    );
  }

  addSuccess(message: string) {
    this.messages.next({
      id: this.randomId(),
      text: message,
      type: 'success',
    });
  }

  addError(message: string) {
    this.messages.next({
      id: this.randomId(),
      text: message,
      type: 'error',
    });
  }

  clearMessage(id: number) {
    this.messages.next({
      id,
      type: 'clear',
    });
  }

  private randomId() {
    return Math.round(Math.random() * 10000);
  }
}
