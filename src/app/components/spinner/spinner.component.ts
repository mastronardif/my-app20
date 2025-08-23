import { Component, Input } from '@angular/core';
import { SpinnerService, SpinnerState } from './../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  standalone: false,
})
export class SpinnerComponent {
  // initialize with default value
  @Input() blockUi: boolean = true; // 👈 default: block clicks

  state: SpinnerState = { count: 0, elapsed: 0 };

  constructor(public spinner: SpinnerService) {
    // this.spinner.state$.subscribe(s => this.state = s);
  }
}
