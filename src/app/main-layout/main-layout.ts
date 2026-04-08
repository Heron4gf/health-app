import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { FarmacoCheckComponent } from '../farmaco-check/farmaco-check.component';
import { BottomNavbarComponent, NavItem } from '../shared/bottom-navbar/bottom-navbar.component';

const PATIENT_NAV_ITEMS: NavItem[] = [
  { icon: 'home', label: 'Home', route: '/home' },
  { icon: 'contacts', label: 'Contatti', route: '/contatti' },
  { icon: 'settings', label: 'Opzioni', route: '/opzioni/paziente' }
];

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

  showFarmacoCheck = false;
  showResultCard = false;
  navItems = PATIENT_NAV_ITEMS;

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
