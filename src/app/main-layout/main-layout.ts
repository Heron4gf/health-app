import { Component, Input, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { PatientService } from '../services/patient.service';
import { FarmacoCheckComponent } from '../farmaco-check/farmaco-check.component';
import { BottomNavbarComponent, NavItem } from '../shared/bottom-navbar/bottom-navbar.component';
export type { NavItem };

export const PATIENT_NAV_ITEMS: NavItem[] = [
  { icon: 'home', label: 'Home', route: '/home' },
  { icon: 'contacts', label: 'Contatti', route: '/contatti' },
  { icon: 'settings', label: 'Opzioni', route: '/opzioni/paziente' }
];

export function buildCaregiverNavItems(patientService: PatientService): NavItem[] {
  const patient = patientService.getActivePatient();
  return [
    { icon: 'home', label: 'Home', route: '/caregiver' },
    { icon: 'bar_chart', label: 'Stats', route: '/statistiche', queryParams: { patient: patient.name } },
    { icon: 'settings', label: 'Opzioni', route: '/opzioni/caregiver' }
  ];
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, FarmacoCheckComponent, BottomNavbarComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayoutComponent {
  private userService = inject(UserService);
  public router = inject(Router);

  /** Whether to show the top section (voice assistant, tabs, farmaco check). Defaults to true. */
  @Input() showTopSection = true;

  /** Custom nav items. If not provided, defaults to PATIENT_NAV_ITEMS. */
  @Input() navItems: NavItem[] = PATIENT_NAV_ITEMS;

  showFarmacoCheck = false;
  showResultCard = false;

  isPatient(): boolean {
    return this.userService.getRole() === 'patient';
  }

  isRoute(route: string): boolean {
    return this.router.url === route;
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  onScanned(): void {
    this.showResultCard = true;
  }

  closeResultCard(): void {
    this.showResultCard = false;
  }
}
