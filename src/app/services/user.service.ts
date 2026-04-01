import { Injectable, signal } from '@angular/core';

export type UserRole = 'patient' | 'caregiver';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private role = signal<UserRole>('patient');

  getRole(): UserRole {
    return this.role();
  }

  setRole(role: UserRole): void {
    this.role.set(role);
  }
}