import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

export interface NavItem {
  icon: string;
  label: string;
  route: string;
  queryParams?: any;
}

@Component({
  selector: 'app-bottom-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bottom-navbar.component.html',
  styleUrl: './bottom-navbar.component.css'
})
export class BottomNavbarComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  @Input() items: NavItem[] = [];

  isPatient(): boolean {
    return this.userService.getRole() === 'patient';
  }

  isActive(route: string): boolean {
    return this.router.url === route || this.router.url.startsWith(route);
  }
}