import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Employee } from '../employees.model';

interface EmployeeForm {
  _id: FormControl<string | null>;
  name: FormControl<string>;
  email: FormControl<string>;
  contact: FormControl<string>;
}

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-form.html',
  styleUrls: ['./employee-form.css']
})
export class EmployeeFormComponent implements OnChanges {

  @Input() employee: Employee | null = null;
  @Output() save = new EventEmitter<Employee>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup<EmployeeForm>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group<EmployeeForm>({
      _id: this.fb.control<string | null>(null),
      name: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(3),Validators.pattern(/^[A-Z][a-zA-Z]{2,}$/)],
        nonNullable: true
      }),
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true
      }),
      contact: this.fb.control('', {
        validators: [Validators.required, Validators.pattern('^[0-9]{10}$')],
        nonNullable: true
      })
    });
  }

  ngOnChanges(): void {
    if (this.employee) {
      this.form.patchValue(this.employee);
    } else {
      this.form.reset();
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const employee: Employee = {
      ...(raw._id !== null && { _id: raw._id }),
      name: raw.name,
      email: raw.email,
      contact: raw.contact
    };
       

    this.save.emit(employee);
    this.form.reset();
  }

  onCancel(): void {
    this.form.reset();
    this.cancel.emit();
  }

  get f(): EmployeeForm {
    return this.form.controls;
  }
}