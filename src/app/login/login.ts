import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private userService = inject(UserService);
  private router = inject(Router);

  loginAsPatient(): void {
    this.userService.setRole('patient');
    this.router.navigate(['/home']);
  }

  loginAsCaregiver(): void {
    this.userService.setRole('caregiver');
    this.router.navigate(['/caregiver']);
  }

  loginAsPharmacy(): void {
    this.userService.setRole('caregiver');
    this.router.navigate(['/home']);
  }
}