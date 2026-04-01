import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Contact {
  name: string;
  role: string;
  phone: string;
}

const CONTACTS: Contact[] = [
  { name: 'Dr. Rossi', role: 'Farmacista', phone: '+39 02 1234567' },
  { name: 'Infermiera Bianchi', role: 'Caregiver', phone: '+39 333 9876543' },
  { name: 'Dr.ssa Marino', role: 'Medico di base', phone: '+39 02 9876543' },
  { name: 'Sig. Verdi', role: 'Familiare', phone: '+39 347 1234567' }
];

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contatti.component.html',
  styleUrl: './contatti.component.css'
})
export class ContattiComponent {
  @Output() closed = new EventEmitter<void>();
  contacts = CONTACTS;
  isVisible = false;

  ngOnInit(): void {
    // Trigger animation on next frame
    setTimeout(() => this.isVisible = true, 50);
  }

  close(): void {
    this.closed.emit();
  }

  onCallClick(contact: Contact): void {
    // Mockup - does nothing
  }
}