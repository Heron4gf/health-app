import { Component } from '@angular/core';
import { MainLayoutComponent } from '../main-layout/main-layout';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainLayoutComponent, RouterModule], 
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {}