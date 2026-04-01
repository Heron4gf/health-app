import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-opzioni-caregiver',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './opzioni-caregiver.component.html',
  styleUrl: './opzioni-caregiver.component.css'
})
export class OpzioniCaregiverComponent {
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}