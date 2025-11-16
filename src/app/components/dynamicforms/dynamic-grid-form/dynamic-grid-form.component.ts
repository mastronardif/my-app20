import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dynamic-grid-form',
  standalone: true,
  templateUrl: './dynamic-grid-form.component.html',
  styleUrls: ['./dynamic-grid-form.component.css'],
  imports: [
  CommonModule,
  ReactiveFormsModule
  ],

})
export class DynamicGridFormComponent implements OnChanges {
  @Input() formSchema: any;
  @Input() parentForm!: FormGroup;

  @Output() formSubmit = new EventEmitter<any>();

  formGroup!: FormGroup;
  isLoaded = false;

  constructor(private fb: FormBuilder) {}

  // ---------------------------------------------------
  // FIX: react when formSchema arrives
  // ---------------------------------------------------
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formSchema'] && this.formSchema) {
      this.buildForm();
      this.isLoaded = true;
    }
  }

  getControl(key: string): FormControl {
    return this.parentForm.get(key) as FormControl;
  }

  private buildForm() {
    if (!this.formSchema || !this.formSchema.sections) return;

    const group: Record<string, any> = {};

    for (const section of this.formSchema.sections) {
      for (const field of section.fields) {
        const validators = field.required ? [Validators.required] : [];

        switch (field.type) {
          case 'checkbox':
            if (field.options?.length > 1) {
              group[field.key] = this.fb.array([], validators);
            } else {
              group[field.key] = new FormControl(false, validators);
            }
            break;

          default:
            group[field.key] = new FormControl('', validators);
            break;
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

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.formSubmit.emit(this.formGroup.value);
  }
}
