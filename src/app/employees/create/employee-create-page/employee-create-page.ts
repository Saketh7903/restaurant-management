import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee';
import { Employee } from '../../employees.model';

@Component({
  selector: 'app-employee-create-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-create-page.html',
  styleUrls: ['./employee-create-page.css']
})
export class EmployeeCreatePageComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['',[ Validators.required,Validators.minLength(3),Validators.pattern(/^[A-Z][a-zA-Z]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required,Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  get f() {
    return this.form.controls;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const employee: Employee = {
      name: this.form.value.name,
      email: this.form.value.email,
      contact: this.form.value.contact
    };

    this.empService.addEmployee(employee).subscribe({
      next: () => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/employees']);
        });
      },
      error: (err) => console.error('Error adding employee:', err)
    });
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}