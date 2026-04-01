import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-opzioni-paziente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './opzioni-paziente.component.html',
  styleUrl: './opzioni-paziente.component.css'
})
export class OpzioniPazienteComponent {
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}