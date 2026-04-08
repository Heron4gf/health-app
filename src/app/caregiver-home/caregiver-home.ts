import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FarmacoCheckComponent } from '../farmaco-check/farmaco-check.component';
import { BottomNavbarComponent, NavItem } from '../shared/bottom-navbar/bottom-navbar.component';

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
  imports: [RouterModule, CommonModule, FarmacoCheckComponent, BottomNavbarComponent],
  templateUrl: './caregiver-home.html',
  styleUrls: ['./caregiver-home.css']
})
export class CaregiverHomeComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  activePatient: number = 0;
  showFarmacoCheck = false;
  showResultCard = false;
  private routerSubscription: Subscription | null = null;
  currentRoute: string = '';
  navItems: NavItem[] = [];

  patients: Patient[] = [
    {
      name: 'Mario Rossi',
      aderenza: 85,
      ultimaDose: '1 ora fa',
      prossimaDose: 'Ore 15:00',
      dosiMancate: '0',
      medications: [
        { name: 'Metformina', taken: true },
        { name: 'Depagliflozin', taken: true }
      ]
    },
    {
      name: 'Giulia Bianchi',
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

  private updateNavItems(): void {
    this.navItems = [
      { icon: 'home', label: 'Home', route: '/caregiver' },
      { 
        icon: 'bar_chart', 
        label: 'Stats', 
        route: '/statistiche',
        queryParams: { patient: this.activePatientData.name } 
      },
      { icon: 'settings', label: 'Opzioni', route: '/opzioni/caregiver' }
    ];
  }

  selectPatient(index: number): void {
    this.activePatient = index;
    this.updateNavItems();
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
    this.currentRoute = this.router.url;
    this.routerSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }
}