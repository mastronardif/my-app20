import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-access-mock',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './access-mock.component.html',
  styleUrls: [ './access-mock.component.scss']
})
export class AccessMockComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      // Forward
      ecnLimit_forward: [''],
      ecnPct_forward: [''],
      mtsLimit_forward: [''],

      // Settlement
      ecnLimit_settlement: [''],
      ecnPct_settlement: [''],
      mtsLimit_settlement: [''],

      // RET Only
      maxTenor_ret: [''],
      riskFactor_ret: [''],
      aggLimit_ret: [''],
      retAcct: [''],

      // EFX notes
      efxNotes: [''],

      // Special instructions
      specialInstr: [''],
      skipAuthChecker: [false],

      // Bottom
      fxallMnemonic: [''],
      bbgDealCode: [''],
      etForCms: [false]
    });
  }

  onRefresh() {
    console.info('Refresh queue clicked');
  }

  onReject() {
    console.warn('Rejected. Current form value:');
    console.log(this.form.value);
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    this.form.markAllAsTouched();
  }
}
