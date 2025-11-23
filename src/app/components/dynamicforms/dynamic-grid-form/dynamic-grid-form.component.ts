import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { FormLoaderService } from '../../../services/form-loader.service';

@Component({
  selector: 'app-dynamic-grid-form',
  standalone: true,
  templateUrl: './dynamic-grid-form.component.html',
  styleUrls: ['./dynamic-grid-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class DynamicGridFormComponent implements OnInit, OnChanges {

  /** Inputs when embedded in another page */
  @Input() formSchema: any = null;
  @Input() parentForm!: FormGroup;

  /** Local form when used standalone */
  formGroup!: FormGroup;

  @Output() formSubmit = new EventEmitter<any>();

  isLoaded = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private formLoader: FormLoaderService
  ) {}

  // ****************************************************
  // 1️⃣ Routed mode: load schema from route.data.formname
  // ****************************************************
  ngOnInit() {
    const schemaId = this.route.snapshot.data['formname'];

    if (schemaId) {
      console.log('📄 Loading schema via route:', schemaId);

      this.formLoader.loadForm(schemaId).subscribe({
        next: (schema) => {
          this.formSchema = schema;
          this.buildForm();
          this.isLoaded = true;
        },
        error: (err) => console.error('❌ Failed to load schema', err)
      });
    }
  }

  // ****************************************************
  // 2️⃣ Embedded mode: waits for @Input() formSchema
  // ****************************************************
  ngOnChanges(changes: SimpleChanges): void {
    const schemaChanged = changes['formSchema'];

    if (schemaChanged && this.formSchema && !this.route.snapshot.data['formname']) {
      // Only build form if not routed mode
      this.buildForm();
      this.isLoaded = true;
    }
  }

  // ****************************************************
  // Create form — works for both parent or internal form
  // ****************************************************
  private buildForm() {
    if (!this.formSchema?.sections) return;

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

    // Use parent form if passed in, otherwise use local formGroup
    if (this.parentForm) {
      Object.keys(group).forEach(key => {
        if (!this.parentForm.contains(key)) {
          this.parentForm.addControl(key, group[key]);
        }
      });
    } else {
      this.formGroup = this.fb.group(group);
    }
  }

  // ****************************************************
  // Checkbox handler — handles parentForm OR formGroup
  // ****************************************************
  private get activeForm(): FormGroup {
    return this.parentForm || this.formGroup;
  }

  onCheckboxChange(event: any, key: string) {
    const control = this.activeForm.get(key);

    if (control instanceof FormArray) {
      const value = event.target.value;

      if (event.target.checked) {
        control.push(new FormControl(value));
      } else {
        const index = control.controls.findIndex((x) => x.value === value);
        control.removeAt(index);
      }
    } else if (control instanceof FormControl) {
      control.setValue(event.target.checked);
    }
  }

  // ****************************************************
  // Submit — always uses the correct source form
  // ****************************************************
  onSubmit() {
    const form = this.activeForm;

    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    console.log("📤 SUBMITTED VALUE:", form.value);
    this.formSubmit.emit(form.value);
  }
}
