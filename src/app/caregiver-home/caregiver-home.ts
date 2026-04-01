import { Component } from '@angular/core';
import { MainLayoutComponent } from '../main-layout/main-layout';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-caregiver-home',
  standalone: true,
  imports: [MainLayoutComponent, RouterModule],
  templateUrl: './caregiver-home.html',
  styleUrls: ['./caregiver-home.css']
})
export class CaregiverHome {}