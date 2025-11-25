import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-access-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './access-details.component.html',
  styleUrls: [ './access-details.component.scss']
})
export class AccessDetailsComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      // Forward
      ecnLimit_forward: [''],
      ecnPct_forward: [''],
      mtsLimit_forward: [''],
       // Currenex Only (below Forward)
      currenexCustId: [''],

      // Settlement
      ecnLimit_settlement: [''],
      ecnPct_settlement: [''],
      mtsLimit_settlement: [''],
      // OA Only (below Settlement)
      oaMaxTenor: [''],

      // RET Only
      maxTenor_ret: [''],
      riskFactor_ret: [''],
      aggLimit_ret: [''],
      retAcct: [''],

      // EFX notes + FXALL / BBG / ET for CMS (all inside EFX box)
      efxNotes: [''],
      fxallMnemonic: [''],
      bbgDealCode: [''],
      etForCms: [false],

      // Special instructions
      specialInstr: [''],
      skipAuthChecker: [false],

      // // Bottom
      // fxallMnemonic: [''],
      // bbgDealCode: [''],
      // etForCms: [false]
    });
  }

  onSubmit(): void {
    console.log('Form submitted:', this.form.value);
    this.form.markAllAsTouched();
  }

  onReject(): void {
    console.warn('Reject clicked — current form value:');
    console.log(this.form.value);
    // add reject logic here
  }

  onApprove(): void {
    console.info('Approve clicked — current form value:');
    console.log(this.form.value);
    // add approve logic here
  }

  onCancel(): void {
    console.info('Cancel clicked — restoring values or navigating away');
    // example: reset form (or navigate)
    // this.form.reset();
  }

  onComments(): void {
    console.log('Comments clicked');
    // open comments drawer/modal
  }

  onAttachments(): void {
    console.log('Attachments clicked');
    // open attachments panel
  }
}
