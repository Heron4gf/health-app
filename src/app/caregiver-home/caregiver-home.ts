import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Medication {
  name: string;
  taken: boolean;
}

interface Patient {
  name: string;
  aderenza: number;
  ultimaDose: string;
  prossimaDose: string;
  dosiMancate: string;
  medications: Medication[];
}

@Component({
  selector: 'app-caregiver-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './caregiver-home.html',
  styleUrls: ['./caregiver-home.css']
})
export class CaregiverHomeComponent {
  activePatient: number = 0;

  patients: Patient[] = [
    {
      name: 'Mario Rossi',
      aderenza: 85,
      ultimaDose: '1 ora fa',
      prossimaDose: 'Ore 15:00',
      dosiMancate: '0',
      medications: [
        { name: 'Imodium', taken: true },
        { name: 'Aspirina', taken: true }
      ]
    },
    {
      name: 'Giulia Bianchi',
      aderenza: 60,
      ultimaDose: '3 ore fa',
      prossimaDose: 'Ore 16:00',
      dosiMancate: '1 questa settimana',
      medications: [
        { name: 'Cardioaspirina', taken: false },
        { name: 'Tachipirina', taken: true }
      ]
    },
    {
      name: 'Luca Verdi',
      aderenza: 45,
      ultimaDose: '5 ore fa',
      prossimaDose: 'Ore 13:00',
      dosiMancate: '2 questa settimana',
      medications: [
        { name: 'Diclofenac', taken: false },
        { name: 'Maalox', taken: false }
      ]
    }
  ];

  get activePatientData(): Patient {
    return this.patients[this.activePatient];
  }

  get aderenzaColor(): string {
    const val = this.activePatientData.aderenza;
    if (val >= 70) return 'green';
    if (val >= 50) return 'yellow';
    return 'red';
  }

  selectPatient(index: number): void {
    this.activePatient = index;
  }

  openFarmacoCheck(): void {
    console.log('Farmaco Check opened');
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
}