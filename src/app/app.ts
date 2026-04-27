import { Component } from '@angular/core';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-root',
  imports: [UserDashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
