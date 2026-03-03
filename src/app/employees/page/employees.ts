import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Employee } from '../employees.model';
import { EmployeeService } from '../../services/employee';
import { EmployeeListComponent } from '../employee-list/employee-list';
import { EmployeeFormComponent } from '../employee-form/employee-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [EmployeeListComponent, EmployeeFormComponent, CommonModule],
  templateUrl: './employees.html',
  styleUrls: ['./employees.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;

  currentPage = 1;
  limit = 10;
  totalPages = 0;

  constructor(
    private empService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employees= [];
    this.empService
      .getEmployees(this.currentPage, this.limit)
      .subscribe({
        next: (res) => {
          this.employees = [...res.employees];
          this.totalPages = res.totalPages;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error loading employees:', err)
      });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadEmployees();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadEmployees();
    }
  }

  onEditEmployee(emp: Employee): void {
    this.selectedEmployee = { ...emp };
  }

  onSaveEmployee(emp: Employee): void {
    this.empService.updateEmployee(emp).subscribe({
      next: () => {
        this.selectedEmployee = null;
        this.loadEmployees();
      },
      error: (err) => console.error('Error updating employee:', err)
    });
  }

  onDeleteEmployee(id: string): void {
    this.empService.deleteEmployee(id).subscribe({
      next: () => {
        if (this.employees.length === 1 && this.currentPage > 1) {
          this.currentPage--;
        }
        this.loadEmployees();
      },
      error: (err) => console.error('Error deleting employee:', err)
    });
  }

  onCancel(): void {
    this.selectedEmployee = null;
  }
}