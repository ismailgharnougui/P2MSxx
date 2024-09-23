import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Chart,
  registerables // Import registerables from Chart.js
} from 'chart.js';
@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent {
  startMonth!: number;
  endMonth!: number;
  chart: any;

  constructor(private http: HttpClient) {
    Chart.register(...registerables);

  }

  onSubmit() {
    // Data to send to the backend
    const payload = {
      Start_Month: this.startMonth,
      End_Month: this.endMonth
    };

    // Make HTTP request to Flask API
    this.http.post<any>('http://127.0.0.1:5001/predict_period', payload).subscribe(
      data => {
        if (data.high_sale_articles) {
          this.renderChart(data.high_sale_articles);
        } else {
          alert('No data available for the selected period.');
        }
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }

  renderChart(articles: any[]) {
    const labels = articles.map(article => article['Réf. Art']);
    const unitsSold = articles.map(article => article['Units Sold']);

    // Destroy previous chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    // Create a new chart
    const ctx = (document.getElementById('prediction-chart') as HTMLCanvasElement).getContext('2d');
    if(ctx){
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Units Sold',
          data: unitsSold,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  }
}
