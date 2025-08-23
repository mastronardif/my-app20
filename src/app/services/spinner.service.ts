import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

export interface SpinnerState {
  count: number;
  elapsed: number;
}

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private _state = new BehaviorSubject<SpinnerState>({ count: 0, elapsed: 0 });
  state$ = this._state.asObservable();

  private elapsedSeconds = 0;
  private timerInterval: any;

  show() {
    const current = this._state.value;
    this._state.next({ ...current, count: current.count + 1 });
    if (!this.timerInterval) {
      this.timerInterval = setInterval(() => {
        this.elapsedSeconds++;
        this._state.next({ ...this._state.value, elapsed: this.elapsedSeconds });
      }, 1000);
    }
  }

  hide() {
    const current = this._state.value;
    const newCount = Math.max(0, current.count - 1);
    if (newCount === 0) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
      this.elapsedSeconds = 0;
    }
    this._state.next({ ...current, count: newCount });
  }
}
