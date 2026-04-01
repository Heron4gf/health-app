import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opzioni-caregiver',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './opzioni-caregiver.component.html',
  styleUrl: './opzioni-caregiver.component.css'
})
export class OpzioniCaregiverComponent {
  @Output() closed = new EventEmitter<void>();
  private router = inject(Router);

  close(): void {
    this.closed.emit();
  }

  logout(): void {
    this.close();
    this.router.navigate(['/']);
  }
}