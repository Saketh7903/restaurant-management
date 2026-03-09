import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  persons: string;
  date: string;
  status?: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private apiUrl = 'http://localhost:5000/api/bookings';

  constructor(private http: HttpClient) {}

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  createBooking(booking: Booking): Observable<any> {
    return this.http.post(this.apiUrl, booking);
  }

  updateStatus(id: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { status });
  }

  deleteBooking(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}