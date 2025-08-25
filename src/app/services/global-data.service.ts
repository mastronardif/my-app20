// global-data.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalDataService {
  // define a signal with default value
  message = signal('Initial global value');

  // update function
  updateMessage(newMessage: string) {
    this.message.set(newMessage);
  }
}
