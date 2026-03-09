import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class Booking {

  form: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService
  ) {
    this.form = this.fb.group({
      name:    ['', Validators.required],
      phone:   ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email:   ['', [Validators.required, Validators.email]],
      persons: ['', Validators.required],
      date:    ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.bookingService.createBooking(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Table booked successfully! We will contact you shortly.';
        this.form.reset();
      },
      error: (err: any) => {
        this.loading = false;
        this.errorMessage = 'Booking failed. Please try again.';
        console.error('Booking error:', err);
      }
    });
  }
}