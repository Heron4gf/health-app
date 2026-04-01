import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayoutComponent {
  private userService = inject(UserService);

  isPatient(): boolean {
    return this.userService.getRole() === 'patient';
  }

  openContattiModal(): void {
    // TODO: Implement contatti modal open logic
    console.log('Open contatti modal');
  }
}