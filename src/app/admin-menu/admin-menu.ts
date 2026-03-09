import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MenuService, MenuItem } from '../services/menu.service';

@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-menu.html',
  styleUrls: ['./admin-menu.css']
})
export class AdminMenuComponent implements OnInit {

  menuItems: MenuItem[] = [];
  form: FormGroup;
  showForm = false;
  editingId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private cdr: ChangeDetectorRef  // ← add this
  ) {
    this.form = this.fb.group({
      name:        ['', Validators.required],
      category:    ['', Validators.required],
      price:       ['', [Validators.required, Validators.min(1)]],
      image:       [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadMenu();
  }

  get f() { return this.form.controls; }

  loadMenu(): void {
    this.menuService.getMenuItems().subscribe({
      next: (items) => {
        this.menuItems = [...items];
        this.cdr.detectChanges(); 
      },
      error: (err: any) => console.error('Error loading menu:', err)
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const item: MenuItem = this.form.value;
    if (this.editingId) {
      this.menuService.updateMenuItem(this.editingId, item).subscribe({
        next: () => { this.loadMenu(); this.cancelForm(); },
        error: (err: any) => console.error('Error updating:', err)
      });
    } else {
      this.menuService.addMenuItem(item).subscribe({
        next: () => { this.loadMenu(); this.cancelForm(); },
        error: (err: any) => console.error('Error adding:', err)
      });
    }
  }

  editItem(item: MenuItem): void {
    this.editingId = item._id!;
    this.showForm = true;
    this.form.patchValue(item);
  }

  deleteItem(id: string): void {
    if (confirm('Delete this menu item?')) {
      this.menuService.deleteMenuItem(id).subscribe({
        next: () => this.loadMenu(),
        error: (err: any) => console.error('Error deleting:', err)
      });
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingId = null;
    this.form.reset();
  }
}