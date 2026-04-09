import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FarmacoCheckComponent } from '../farmaco-check/farmaco-check.component';
import { BottomNavbarComponent, NavItem } from '../shared/bottom-navbar/bottom-navbar.component';
import { PatientService } from '../services/patient.service';
import { PatientSelectorComponent, Patient } from '../shared/patient-selector/patient-selector.component';
import { buildCaregiverNavItems } from '../main-layout/main-layout';

interface Medication {
  name: string;
  taken: boolean;
}

interface PatientStatsData {
  aderenza: number;
  ultimaDose: string;
  prossimaDose: string;
  dosiMancate: string;
  medications: Medication[];
}

const PATIENT_STATS: Record<string, PatientStatsData> = {
  'Mario Rossi': {
    aderenza: 85,
    ultimaDose: '1 ora fa',
    prossimaDose: 'Ore 15:00',
    dosiMancate: '0',
    medications: [
      { name: 'Metformina', taken: true },
      { name: 'Depagliflozin', taken: true }
    ]
  },
  'Giulia Bianchi': {
    aderenza: 60,
    ultimaDose: '3 ore fa',
    prossimaDose: 'Ore 16:00',
    dosiMancate: '1 questa settimana',
    medications: [
      { name: 'Ramipril', taken: false },
      { name: 'Bisoprololo', taken: true },
      { name: 'Cardiospirina', taken: true }
    ]
  }
};

@Component({
  selector: 'app-caregiver-home',
  standalone: true,
  imports: [RouterModule, CommonModule, FarmacoCheckComponent, BottomNavbarComponent, PatientSelectorComponent],
  templateUrl: './caregiver-home.html',
  styleUrls: ['./caregiver-home.css']
})
export class CaregiverHomeComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private patientService = inject(PatientService);

  showFarmacoCheck = false;
  showResultCard = false;
  private routerSubscription: Subscription | null = null;
  navItems: NavItem[] = [];
  patients: Patient[] = [];

  constructor() {
    this.patients = this.patientService.getPatients();
  }

  get activePatientIndex(): number {
    return this.patientService.getActiveIndex();
  }

  get activePatientName(): string {
    return this.patientService.getActivePatient().name;
  }

  get activePatientData(): PatientStatsData {
    const name = this.patientService.getActivePatient().name;
    return PATIENT_STATS[name] || PATIENT_STATS[this.patients[0].name];
  }

  get aderenzaColor(): string {
    const val = this.activePatientData.aderenza;
    if (val >= 70) return 'green';
    if (val >= 50) return 'yellow';
    return 'red';
  }

  selectPatient(index: number): void {
    this.patientService.setActiveIndex(index);
    this.updateNavItems();
  }

  private updateNavItems(): void {
    this.navItems = buildCaregiverNavItems(this.patientService);
  }

  openFarmacoCheck(): void {
    this.showFarmacoCheck = true;
  }

  onScanned(): void {
    this.showResultCard = true;
    this.showFarmacoCheck = false;
  }

  onFarmacoCheckClosed(): void {
    this.showFarmacoCheck = false;
  }

  closeResultCard(): void {
    this.showResultCard = false;
  }

  getStatusLabel(taken: boolean): string {
    return taken ? 'Assunto' : 'Non assunto';
  }

  getStatusClass(taken: boolean): string {
    return taken ? 'green' : 'red';
  }

  toggleMedication(med: Medication): void {
    med.taken = !med.taken;
  }

  ngOnInit(): void {
    this.updateNavItems();
    this.routerSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {});
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }
}