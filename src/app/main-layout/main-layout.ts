import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { FarmacoCheckComponent } from '../farmaco-check/farmaco-check.component';
import { ContattiComponent } from '../contatti/contatti.component';
import { OpzioniPazienteComponent } from '../opzioni/opzioni-paziente.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, FarmacoCheckComponent, ContattiComponent, OpzioniPazienteComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayoutComponent {
  private userService = inject(UserService);
  public router = inject(Router);

  showFarmacoCheck = false;
  showResultCard = false;
  showContatti = false;
  showOpzioni = false;

  isPatient(): boolean {
    return this.userService.getRole() === 'patient';
  }

  isRoute(route: string): boolean {
    return this.router.url === route;
  }

  goHome(): void {
    this.resetModals();
    const route = this.isPatient() ? '/home' : '/caregiver';
    this.router.navigate([route]);
  }

  openContattiModal(): void {
    this.resetModals();
    this.showContatti = true;
  }

  openOpzioniModal(): void {
    this.resetModals();
    this.showOpzioni = true;
  }

  resetModals(): void {
    this.showContatti = false;
    this.showOpzioni = false;
  }

  onScanned(): void {
    this.showResultCard = true;
  }

  closeResultCard(): void {
    this.showResultCard = false;
  }
}