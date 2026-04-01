import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  selector: 'app-statistiche',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistiche.component.html',
  styleUrl: './statistiche.component.css'
})
export class StatisticheComponent {
  @Input() patientName: string = '';
  @Output() closed = new EventEmitter<void>();

  stats: PatientStats | null = null;
  daysOfWeek = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  ngOnInit(): void {
    this.stats = PATIENT_DATA[this.patientName] || null;
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

  close(): void {
    this.closed.emit();
  }
}