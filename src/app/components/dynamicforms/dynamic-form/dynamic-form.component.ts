import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class DynamicFormComponent implements OnInit {
  formConfig: any;
  form!: FormGroup;

//   formDefinition = [
//   { key: 'firstName', label: 'First Name', type: 'text', required: true },
//   { key: 'email', label: 'Email', type: 'email', required: true },
//   { key: 'age', label: 'Age', type: 'number' },
//   { key: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
//   { key: 'marital Status', label: 'Marital Status', type: 'select', options: ['Male', 'Female'] }
// ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Example: load JSON (you could replace this with HTTP call)
    this.formConfig = {
      title: 'Dynamic Form',
      fields: [
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text', required: true },
        { name: 'age', label: 'Age', type: 'number' },
        { name: 'department', label: 'Department', type: 'select', options: ['IT', 'HR', 'Finance'] },
        { name: 'marital Status', label: 'Marital Status', type: 'select', options: ['Male', 'Female', 'Free'],  }
      ]
    };

    this.buildForm();
  }

  buildForm() {
    const group: any = {};

    for (const field of this.formConfig.fields) {
      group[field.name] = field.required
        ? this.fb.control('', Validators.required)
        : this.fb.control('');
    }

    this.form = this.fb.group(group);
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
  }

  // onSubmit() {
  //   if (this.form.valid) {
  //     console.log('✅ Form Value:', this.form.value);
  //   } else {
  //     console.warn('❌ Invalid form');
  //   }
  // }
}
