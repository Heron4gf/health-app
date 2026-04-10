import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MainLayoutComponent, PATIENT_NAV_ITEMS, NavItem } from '../../main-layout/main-layout';

export interface Contact {
  name: string;
  role: string;
  phone: string;
}

const CONTACTS: Contact[] = [
  { name: 'Dr. Rossi', role: 'Caregiver', phone: '+39 02 1234567' },
  { name: 'Farmacia Camerte', role: 'Farmacista', phone: '+39 333 9876543' },
  { name: 'Dr.ssa Marino', role: 'Caregiver', phone: '+39 02 9876543' },
  { name: 'Sig. Verdi', role: 'Contatto di Emergenza', phone: '+39 347 1234567' }
];

@Component({
  selector: 'app-contatti-page',
  standalone: true,
  imports: [CommonModule, MainLayoutComponent],
  templateUrl: './contatti-page.component.html',
  styleUrl: './contatti-page.component.css'
})
export class ContattiPageComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  contacts = CONTACTS;
  navItems: NavItem[] = PATIENT_NAV_ITEMS;

  goBack(): void {
    const isPatient = this.userService.getRole() === 'patient';
    this.router.navigate([isPatient ? '/home' : '/caregiver']);
  }

  onCallClick(contact: Contact): void {
    window.location.href = `tel:${contact.phone}`;
  }
}