import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Calendar } from './calendar/calendar';
import { CaregiverHomeComponent as CaregiverHome } from './caregiver-home/caregiver-home';
import { OpzioniPazientePageComponent } from './pages/opzioni-paziente-page/opzioni-paziente-page.component';
import { OpzioniCaregiverPageComponent } from './pages/opzioni-caregiver-page/opzioni-caregiver-page.component';
import { StatistichePageComponent } from './pages/statistiche-page/statistiche-page.component';
import { ContattiPageComponent } from './pages/contatti-page/contatti-page.component';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'home', component: Home },
  { path: 'calendar', component: Calendar },
  { path: 'caregiver', component: CaregiverHome },
  { path: 'opzioni/paziente', component: OpzioniPazientePageComponent },
  { path: 'opzioni/caregiver', component: OpzioniCaregiverPageComponent },
  { path: 'statistiche', component: StatistichePageComponent },
  { path: 'contatti', component: ContattiPageComponent }
];
