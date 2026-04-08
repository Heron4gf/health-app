import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-opzioni-caregiver-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './opzioni-caregiver-page.component.html',
  styleUrl: './opzioni-caregiver-page.component.css'
})
export class OpzioniCaregiverPageComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  goBack(): void {
    this.router.navigate(['/caregiver']);
  }

  logout(): void {
    this.router.navigate(['/']);
  }
}