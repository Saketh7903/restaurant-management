import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin, Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EmployeeService } from '../services/employee.service';
import { MenuService } from '../services/menu.service';
import { BookingService, Booking } from '../services/booking.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  stats = {
    employees: 0,
    menuItems: 0,
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0
  };

  recentBookings: Booking[] = [];
  private refreshSubscription: Subscription | null = null;

  get userName(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.name : '';
  }

  constructor(
    private employeeService: EmployeeService,
    private menuService: MenuService,
    private bookingService: BookingService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // load immediately on page open
    this.loadDashboard();

    // auto refresh every 10 seconds
    this.refreshSubscription = interval(10000).subscribe(() => {
      this.loadDashboard();
    });
  }

  ngOnDestroy(): void {
    // stop polling when user leaves the page
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  loadDashboard(): void {
    forkJoin({
      employees: this.employeeService.getEmployees(1, 10000),
      menu:      this.menuService.getMenuItems(),
      bookings:  this.bookingService.getBookings()
    }).subscribe({
      next: ({ employees, menu, bookings }) => {
        this.stats.employees         = employees.total || employees.data?.length || 0;
        this.stats.menuItems         = menu.length;
        this.stats.totalBookings     = bookings.length;
        this.stats.pendingBookings   = bookings.filter((b: Booking) => b.status === 'Pending').length;
        this.stats.confirmedBookings = bookings.filter((b: Booking) => b.status === 'Confirmed').length;
        this.recentBookings          = bookings.slice(0, 5);
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Dashboard error:', err)
    });
  }
}