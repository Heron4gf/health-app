import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opzioni-paziente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './opzioni-paziente.component.html',
  styleUrl: './opzioni-paziente.component.css'
})
export class OpzioniPazienteComponent {
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