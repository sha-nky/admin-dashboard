import {
  Component,
  inject,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html'
})
export class Home implements OnInit, AfterViewInit {

  private http = inject(HttpClient);

  @ViewChild('analyticsCanvas') canvas!: ElementRef<HTMLCanvasElement>;

  stats = signal<any | null>(null);
  loading = true;

  private chart: Chart | null = null;

  ngOnInit(): void {
    this.http.get<any>('http://localhost:5000/api/analytics/users')
      .subscribe({
        next: (res) => {
          this.stats.set(res);
          this.loading = false;
          this.renderChart();
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  renderChart() {

    if (!this.canvas) return;
    if (!this.stats()) return;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Total Users', 'New Users Today', 'Admin Accounts'],
        datasets: [{
          label: 'User Stats',
          data: [
            this.stats().totalUsers,
            this.stats().newUsersToday,
            this.stats().adminCount
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
