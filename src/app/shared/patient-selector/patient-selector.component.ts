import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Patient {
  name: string;
}

@Component({
  selector: 'app-patient-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-selector.component.html',
  styleUrl: './patient-selector.component.css'
})
export class PatientSelectorComponent {
  @Input() patients: Patient[] = [];
  @Input() activeIndex: number = 0;
  @Output() selected = new EventEmitter<number>();

  onSelect(index: number): void {
    this.selected.emit(index);
  }
}