import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService, Booking } from '../services/booking.service';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-bookings.html',
  styleUrls: ['./admin-bookings.css']
})
export class AdminBookingsComponent implements OnInit {

  bookings: Booking[] = [];

  constructor(
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        this.bookings = [...data];
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error loading bookings:', err)
    });
  }

  updateStatus(id: string, status: string): void {
    this.bookingService.updateStatus(id, status).subscribe({
      next: () => this.loadBookings(),
      error: (err: any) => console.error('Error updating status:', err)
    });
  }

  deleteBooking(id: string): void {
    if (confirm('Delete this booking?')) {
      this.bookingService.deleteBooking(id).subscribe({
        next: () => this.loadBookings(),
        error: (err: any) => console.error('Error deleting booking:', err)
      });
    }
  }
}