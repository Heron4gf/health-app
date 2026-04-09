import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PatientService } from '../../services/patient.service';
import { PatientSelectorComponent, Patient } from '../../shared/patient-selector/patient-selector.component';
import { BottomNavbarComponent, NavItem } from '../../shared/bottom-navbar/bottom-navbar.component';
import { buildCaregiverNavItems } from '../../main-layout/main-layout';

@Component({
  selector: 'app-opzioni-caregiver-page',
  standalone: true,
  imports: [CommonModule, PatientSelectorComponent, BottomNavbarComponent],
  templateUrl: './opzioni-caregiver-page.component.html',
  styleUrl: './opzioni-caregiver-page.component.css'
})
export class OpzioniCaregiverPageComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  private patientService = inject(PatientService);

  navItems: NavItem[] = [];
  patients: Patient[] = [];

  constructor() {
    this.patients = this.patientService.getPatients();
  }

  get activePatientIndex(): number {
    return this.patientService.getActiveIndex();
  }

  ngOnInit(): void {
    this.updateNavItems();
  }

  selectPatient(index: number): void {
    this.patientService.setActiveIndex(index);
    this.updateNavItems();
  }

  private updateNavItems(): void {
    this.navItems = buildCaregiverNavItems(this.patientService);
  }

  goBack(): void {
    this.router.navigate(['/caregiver']);
  }

  logout(): void {
    this.router.navigate(['/']);
  }
}
