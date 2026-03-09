import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { SignupComponent } from './auth/signup/signup';
import { EmployeesComponent } from './employees/page/employees';
import { EmployeeCreatePageComponent } from './employees/create/employee-create-page/employee-create-page';
import { AdminMenuComponent } from './admin-menu/admin-menu';
import { AdminBookingsComponent } from './admin-bookings/admin-bookings';
import { DashboardComponent } from './dashboard/dashboard';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout';
import { authGuard } from './auth/auth-guard';
import { Home } from './home/home';
import { Menu } from './menu/menu';
import { About } from './about/about';
import { Booking } from './booking/booking';

export const routes: Routes = [

  //  Public site
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: Home },
      { path: 'menu', component: Menu },
      { path: 'about', component: About },
      { path: 'booking', component: Booking }
    ]
  },

  //  Auth pages 
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // Admin site 
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'employees',
        children: [
          { path: '', component: EmployeesComponent },
          { path: 'create', component: EmployeeCreatePageComponent }
        ]
      },
      { path: 'menu', component: AdminMenuComponent },
      { path: 'bookings', component: AdminBookingsComponent }
    ]
  },

  // Fallback 
  { path: '**', redirectTo: '' }
];