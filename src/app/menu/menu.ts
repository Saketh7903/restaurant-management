import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService, MenuItem } from '../services/menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements OnInit {

  menuItems: MenuItem[] = [];
  filteredItems: MenuItem[] = [];
  activeFilter = 'all';
  loading = true;

  constructor(
    private menuService: MenuService,
    private cdr: ChangeDetectorRef  // ← add this
  ) {}

  ngOnInit(): void {
    console.log('Menu component loaded');
    this.menuService.getMenuItems().subscribe({
      next: (items) => {
        console.log('Items received:', items);
        this.menuItems = [...items];
        this.filteredItems = [...items];
        this.loading = false;
        this.cdr.detectChanges(); // ← force view update
      },
      error: (err: any) => {
        console.error('Error:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  setFilter(category: string): void {
    this.activeFilter = category;
    this.filteredItems = category === 'all'
      ? [...this.menuItems]
      : this.menuItems.filter(item => item.category === category);
    this.cdr.detectChanges(); // ← force view update on filter
  }
}