import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormLoaderService } from '../../../services/form-loader.service';

@Component({
  selector: 'app-dynamic-application',
  templateUrl: './dynamic-application.component.html',
  styleUrls: ['./dynamic-application.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class DynamicApplicationComponent implements OnInit {
  appForm!: FormGroup;
  formSchema: any;
  isLoaded = false;

  constructor(private fb: FormBuilder, private formLoader: FormLoaderService) {}

  ngOnInit(): void {
    this.formLoader.loadForm('loan-application').subscribe(schema => {
      this.formSchema = schema;
      this.buildForm();
      this.isLoaded = true;
    });
  }

  buildForm(): void {
    const group: any = {};
    for (const section of this.formSchema.sections) {
      for (const field of section.fields) {
        group[field.key] = [
          '',
          field.required ? Validators.required : null
        ];
      }
    }
    this.appForm = this.fb.group(group);
  }

  onSubmit(): void {
    if (this.appForm.valid) {
      console.log('✅ Submitted:', this.appForm.value);
    } else {
      console.warn('⚠️ Form invalid');
    }
  }
}
