import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MainLayoutComponent, PATIENT_NAV_ITEMS, NavItem } from '../../main-layout/main-layout';

@Component({
  selector: 'app-opzioni-paziente-page',
  standalone: true,
  imports: [CommonModule, MainLayoutComponent],
  templateUrl: './opzioni-paziente-page.component.html',
  styleUrl: './opzioni-paziente-page.component.css'
})
export class OpzioniPazientePageComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  navItems: NavItem[] = PATIENT_NAV_ITEMS;

  goBack(): void {
    this.router.navigate(['/home']);
  }

  logout(): void {
    this.router.navigate(['/']);
  }
}