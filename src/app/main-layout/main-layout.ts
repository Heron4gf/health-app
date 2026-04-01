import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { FarmacoCheckComponent } from '../farmaco-check/farmaco-check.component';
import { ContattiComponent } from '../contatti/contatti.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, FarmacoCheckComponent, ContattiComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayoutComponent {
  private userService = inject(UserService);

  showFarmacoCheck = false;
  showResultCard = false;
  showContatti = false;

  isPatient(): boolean {
    return this.userService.getRole() === 'patient';
  }

  openContattiModal(): void {
    this.showContatti = true;
  }

  onScanned(): void {
    this.showResultCard = true;
  }

  closeResultCard(): void {
    this.showResultCard = false;
  }
}
