import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { SignupComponent } from './auth/signup/signup';
import { EmployeesComponent } from './employees/page/employees';
import { EmployeeCreatePageComponent } from './employees/create/employee-create-page/employee-create-page';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }, 
  { path: 'employees', component: EmployeesComponent , canActivate: [authGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'employees/create', component: EmployeeCreatePageComponent}

];
