import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent {
  users = signal<any[]>([]);
  selectedUser = signal<any>(null);
  isLoading = signal(false);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.isLoading.set(true);
    this.http.get<any>('https://jsonplaceholder.typicode.com/users').subscribe((data: any) => {
      this.users.set(data.map((u: any) => ({ ...u, score: (u.id * 7 + 23) % 100 })));
      this.isLoading.set(false);
    });
  }

  computeStats() {
    const sorted = [...this.users()].sort((a, b) => b.score - a.score);
    const total = sorted.reduce((sum, u) => sum + (u.score ?? 0), 0);
    return {
      total,
      average: Math.round(total / (sorted.length || 1)),
    };
  }

  selectUser(user: any) {
    this.selectedUser.set(user);
  }
}
