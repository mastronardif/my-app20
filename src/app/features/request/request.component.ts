import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicGridFormComponent } from '../../components/dynamicforms/dynamic-grid-form/dynamic-grid-form.component';
import { FormLoaderService } from '../../services/form-loader.service';

// Angular Material
import { MyMatComponent } from '../../components/mymat/mymat.component';

// -----------------------
// Row type
// -----------------------
interface LoanRow {
  id: number;
  borrower: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-request',
  standalone: true,
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
  imports: [CommonModule, ReactiveFormsModule, DynamicGridFormComponent, MyMatComponent]
})
export class RequestComponent implements OnInit {
  formSchema: any = null;
  formGroup: FormGroup;
  loading = true;
  apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private formLoader: FormLoaderService, private fb: FormBuilder) {
    this.formGroup = this.fb.group({});
  }

  ngOnInit(): void {
    this.formLoader.loadForm('loan-application22').subscribe({
      next: (schema) => {
        console.log('📄 Schema loaded:', schema);
        this.formSchema = schema;

        // Create empty controls for each field
        schema.sections?.forEach((section: any) => {
          section.fields?.forEach((field: any) => {
            if (!this.formGroup.contains(field.key)) {
              this.formGroup.addControl(field.key, this.fb.control(''));
            }
          });
        });

        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Failed to load form schema', err);
        this.loading = false;
      },
    });
  }

  onSubmit() {
    console.log('REQUEST SUBMITTED:', this.formGroup.value);
    // alert('✅ Form submitted!');
  }

  onCancel() {
    console.log('REQUEST CANCELLED');
    alert('❌ Cancelled');
  }
}
