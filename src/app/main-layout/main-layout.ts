import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { FarmacoCheckComponent } from '../farmaco-check/farmaco-check.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, FarmacoCheckComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayoutComponent {
  private userService = inject(UserService);

  showFarmacoCheck = false;
  showResultCard = false;

  isPatient(): boolean {
    return this.userService.getRole() === 'patient';
  }

  openContattiModal(): void {
    // TODO: Implement contatti modal open logic
    console.log('Open contatti modal');
  }

  onScanned(): void {
    this.showResultCard = true;
  }

  closeResultCard(): void {
    this.showResultCard = false;
  }
}
