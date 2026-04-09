import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { PatientSelectorComponent, Patient } from '../../shared/patient-selector/patient-selector.component';
import { BottomNavbarComponent, NavItem } from '../../shared/bottom-navbar/bottom-navbar.component';
import { buildCaregiverNavItems } from '../../main-layout/main-layout';

export interface BloodPressureReading {
  date: string;
  systolic: number;
  diastolic: number;
}

export interface MedicationAdherence {
  name: string;
  days: boolean[]; // true = taken, false = missed
}

export interface PatientStats {
  bloodPressure: BloodPressureReading[];
  medications: MedicationAdherence[];
  weeklyAdherence: number[]; // 4 weeks of percentages
}

const PATIENT_DATA: Record<string, PatientStats> = {
  'Mario Rossi': {
    bloodPressure: [
      { date: '26/03', systolic: 120, diastolic: 80 },
      { date: '27/03', systolic: 125, diastolic: 82 },
      { date: '28/03', systolic: 118, diastolic: 76 },
      { date: '29/03', systolic: 135, diastolic: 85 },
      { date: '30/03', systolic: 128, diastolic: 79 },
      { date: '31/03', systolic: 122, diastolic: 78 },
      { date: '01/04', systolic: 119, diastolic: 77 }
    ],
    medications: [
      { name: 'Imodium', days: [true, true, true, false, true, true, true] },
      { name: 'Aspirina', days: [true, true, false, true, true, true, false] }
    ],
    weeklyAdherence: [90, 85, 95, 88]
  },
  'Giulia Bianchi': {
    bloodPressure: [
      { date: '26/03', systolic: 140, diastolic: 90 },
      { date: '27/03', systolic: 138, diastolic: 88 },
      { date: '28/03', systolic: 145, diastolic: 92 },
      { date: '29/03', systolic: 135, diastolic: 86 },
      { date: '30/03', systolic: 130, diastolic: 84 },
      { date: '31/03', systolic: 142, diastolic: 91 },
      { date: '01/04', systolic: 136, diastolic: 87 }
    ],
    medications: [
      { name: 'Cardioaspirina', days: [false, true, false, true, true, false, true] },
      { name: 'Tachipirina', days: [true, true, true, false, true, true, false] }
    ],
    weeklyAdherence: [60, 65, 55, 70]
  },
  'Luca Verdi': {
    bloodPressure: [
      { date: '26/03', systolic: 148, diastolic: 95 },
      { date: '27/03', systolic: 142, diastolic: 92 },
      { date: '28/03', systolic: 150, diastolic: 96 },
      { date: '29/03', systolic: 145, diastolic: 93 },
      { date: '30/03', systolic: 138, diastolic: 89 },
      { date: '31/03', systolic: 146, diastolic: 94 },
      { date: '01/04', systolic: 144, diastolic: 91 }
    ],
    medications: [
      { name: 'Diclofenac', days: [false, false, true, false, false, true, false] },
      { name: 'Maalox', days: [true, false, false, false, true, false, false] }
    ],
    weeklyAdherence: [40, 35, 45, 50]
  }
};

@Component({
  selector: 'app-statistiche-page',
  standalone: true,
  imports: [CommonModule, PatientSelectorComponent, BottomNavbarComponent],
  templateUrl: './statistiche-page.component.html',
  styleUrl: './statistiche-page.component.css'
})
export class StatistichePageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private patientService = inject(PatientService);

  stats: PatientStats | null = null;
  patientName: string = '';
  daysOfWeek = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
  navItems: NavItem[] = [];
  patients: Patient[] = [];

  constructor() {
    this.patients = this.patientService.getPatients();
  }

  get activePatientIndex(): number {
    return this.patientService.getActiveIndex();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const paramPatient = params['patient'] || '';
      if (paramPatient) {
        const idx = this.patients.findIndex(p => p.name === paramPatient);
        if (idx !== -1) {
          this.patientService.setActiveIndex(idx);
        }
      }
      this.loadStats();
    });
    this.updateNavItems();
  }

  private updateNavItems(): void {
    this.navItems = buildCaregiverNavItems(this.patientService);
  }

  private loadStats(): void {
    this.patientName = this.patientService.getActivePatient().name;
    this.stats = PATIENT_DATA[this.patientName] || null;
  }

  selectPatient(index: number): void {
    this.patientService.setActiveIndex(index);
    this.updateNavItems();
    this.loadStats();
  }

  goBack(): void {
    this.router.navigate(['/caregiver']);
  }

  getSystolicColor(systolic: number): string {
    if (systolic < 130) return 'green';
    if (systolic <= 139) return 'yellow';
    return 'red';
  }

  getAdherenceBadgeClass(value: number): string {
    if (value >= 70) return 'badge-green';
    if (value >= 50) return 'badge-yellow';
    return 'badge-red';
  }
}