import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Employee } from '../employees.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css']
})
export class EmployeeListComponent {

  @Input() employees: Employee[] = [];

  @Output() edit = new EventEmitter<Employee>();
  @Output() remove = new EventEmitter<string>();

  editEmployee(employee: Employee): void {
    this.edit.emit(employee);
  }

 
  showConfirm = false;
  selectedId: string | null = null;

  openConfirm(id: string | undefined) {
  if (!id) return;
  this.selectedId = id;
  this.showConfirm = true;
}

confirmDelete() {
  if (!this.selectedId) return;

  this.remove.emit(this.selectedId);
  this.closeConfirm();
}

closeConfirm() {
  this.showConfirm = false;
  this.selectedId = null;
}
}