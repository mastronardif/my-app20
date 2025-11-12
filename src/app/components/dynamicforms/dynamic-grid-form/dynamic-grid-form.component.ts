// dynamic-grid-form.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormLoaderService } from '../../../services/form-loader.service';

@Component({
  selector: 'app-dynamic-grid-form',
  templateUrl: './dynamic-grid-form.component.html',
  styleUrls: ['./dynamic-grid-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class DynamicGridFormComponent {
  // @Input() formJson: any = {};
  formSchema: any;
  formGroup: FormGroup;
  isLoaded = false;

  constructor(private fb: FormBuilder, private formLoader: FormLoaderService) {
    this.formGroup = this.fb.group({});
  }

  ngOnInit(): void {
    this.formLoader.loadForm('loan-application22').subscribe((schema) => {
      this.formSchema = schema;
      this.buildForm();
      this.isLoaded = true;
    });
  }

  private buildForm() {
    if (!this.formSchema?.sections) return;

    for (const section of this.formSchema.sections) {
      for (const field of section.fields) {
        const validators = [];
        if (field.required) validators.push(Validators.required);
        this.formGroup.addControl(field.key, this.fb.control('', validators));
      }
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log('✅ Submitted:', this.formGroup.value);
    } else {
      console.warn('⚠️ Form invalid');
    }
  }
}
