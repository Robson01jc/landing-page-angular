import { Injectable } from '@angular/core';
import { Observable, scan, Subject } from 'rxjs';

type CommandType = 'success' | 'error' | 'clear';

export interface Command {
  id: number;
  type: CommandType;
  text?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  messagesInput: Subject<Command>;
  messagesOutput: Observable<Command[]>;

  constructor() {
    this.messagesInput = new Subject<Command>();
    this.messagesOutput = this.messagesInput.pipe(
      scan((acc, value) => {
        if (value.type === 'clear') {
          return acc.filter((message) => message.id !== value.id);
        }

        return [...acc, value];
      }, [] as Command[])
    );
  }

  private addMessage(
    message: string,
    type: CommandType,
    timeout: number = 5000
  ) {
    const id = this.randomId();

    this.messagesInput.next({
      id,
      text: message,
      type,
    });

    setTimeout(() => {
      this.clearMessage(id);
    }, timeout);
  }

  addSuccess(message: string) {
    this.addMessage(message, 'success');
  }

  addError(message: string) {
    this.addMessage(message, 'error');
  }

  clearMessage(id: number) {
    this.messagesInput.next({
      id,
      type: 'clear',
    });
  }

  private randomId() {
    return Math.round(Math.random() * 10000);
  }
}
