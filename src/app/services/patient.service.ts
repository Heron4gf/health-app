import { Injectable, signal } from '@angular/core';

export interface Patient {
  name: string;
}

const PATIENTS: Patient[] = [
  { name: 'Mario Rossi' },
  { name: 'Giulia Bianchi' },
  { name: 'Luca Verdi' }
];

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patients = signal<Patient[]>(PATIENTS);
  private activeIndex = signal<number>(0);

  getPatients(): Patient[] {
    return this.patients();
  }

  getActiveIndex(): number {
    return this.activeIndex();
  }

  getActivePatient(): Patient {
    return this.patients()[this.activeIndex()];
  }

  setActiveIndex(index: number): void {
    this.activeIndex.set(index);
  }
}