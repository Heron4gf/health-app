import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Calendar } from './calendar/calendar';
import { CaregiverHomeComponent as CaregiverHome } from './caregiver-home/caregiver-home';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'home', component: Home },
  { path: 'calendar', component: Calendar },
  { path: 'caregiver', component: CaregiverHome }
];
