import { Component, inject } from '@angular/core';
import { MainLayoutComponent } from '../main-layout/main-layout';
import { RouterModule } from '@angular/router';
import { NgbDatepickerModule, NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    MainLayoutComponent, 
    RouterModule, 
    NgbDatepickerModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css']
})
export class Calendar {
  private calendar = inject(NgbCalendar);
  
  displayedDate: NgbDateStruct;
  selectedDate: NgbDateStruct;
  
  datesWithEvents = [
    { year: 2026, month: 1, day: 16 },
    { year: 2026, month: 1, day: 18 },
    { year: 2026, month: 1, day: 19 }
  ];

  constructor() {
    this.displayedDate = this.calendar.getToday();
    this.selectedDate = { year: 2026, month: 1, day: 13 };
  }

  navigatePrev() {
    this.displayedDate = this.calendar.getPrev(NgbDate.from(this.displayedDate)!, 'm', 1);
  }

  navigateNext() {
    this.displayedDate = this.calendar.getNext(NgbDate.from(this.displayedDate)!, 'm', 1);
  }

  onDateSelect(date: NgbDateStruct) {
    this.selectedDate = date;
  }

  hasEvent(date: NgbDateStruct): boolean {
    return this.datesWithEvents.some(
      d => d.year === date.year && d.month === date.month && d.day === date.day
    );
  }

  getMonthName(): string {
    const date = new Date(this.displayedDate.year, this.displayedDate.month - 1, 1);
    return new Intl.DateTimeFormat('it-IT', { month: 'long', year: 'numeric' }).format(date).toUpperCase();
  }
}