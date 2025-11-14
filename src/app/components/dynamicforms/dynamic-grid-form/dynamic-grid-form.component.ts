// dynamic-grid-form.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormLoaderService } from '../../../services/form-loader.service';

@Component({
  selector: 'app-dynamic-grid-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-grid-form.component.html',
  styleUrls: ['./dynamic-grid-form.component.css'],
})
export class DynamicGridFormComponent {
  formSchema: any;
  formGroup!: FormGroup;
  isLoaded = false;

  constructor(private fb: FormBuilder, private formLoader: FormLoaderService) {}

  ngOnInit(): void {
    this.formLoader.loadForm('loan-application22').subscribe((schema) => {
      this.formSchema = schema;
      this.buildForm();
      this.isLoaded = true;
    });
  }

  // ---------------------------------------------------
  // Build ALL controls dynamically
  // ---------------------------------------------------
  private buildForm() {
    const group: any = {};

    for (const section of this.formSchema.sections) {
      for (const field of section.fields) {
        const validators = [];
        if (field.required) validators.push(Validators.required);

        if (field.type === 'checkbox') {
          // If options exist and length > 1 → FormArray (group)
          if (field.options && field.options.length > 1) {
            group[field.key] = this.fb.array([], validators);
          } else {
            // Single checkbox → boolean FormControl
            group[field.key] = new FormControl(false, validators);
          }
        } else {
          group[field.key] = new FormControl('', validators); // radios / text
        }
      }
    }

    this.formGroup = this.fb.group(group);
  }

  onCheckboxChange(event: any, key: string) {
    const control = this.formGroup.get(key);

    if (control instanceof FormArray) {
      const value = event.target.value;

      if (event.target.checked) {
        control.push(new FormControl(value));
      } else {
        const index = control.controls.findIndex((x) => x.value === value);
        control.removeAt(index);
      }
    } else if (control instanceof FormControl) {
      // Single checkbox → just set true/false
      control.setValue(event.target.checked);
    }
  }

  // ---------------------------------------------------
  // Submit handler
  // ---------------------------------------------------
  onSubmit(): void {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      console.warn('⚠️ Form invalid');
      return;
    }

    console.log('✅ FORM SUBMITTED:', this.formGroup.value);
  }
}
