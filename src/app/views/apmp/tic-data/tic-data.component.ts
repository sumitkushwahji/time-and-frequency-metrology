import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NplModule } from 'src/app/npl.module';
import { io } from 'socket.io-client';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-tic-data',
  standalone: true,
  imports: [NplModule],
  templateUrl: './tic-data.component.html',
  styleUrls: ['./tic-data.component.scss'],
})
export class TicDataComponent implements OnInit, AfterViewInit {
  ipAddress = '172.16.16.31';
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    animation: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Timestamp',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Time Difference(s)',
        },
        ticks: {
          callback: (tickValue: string | number) => {
            const value =
              typeof tickValue === 'number' ? tickValue : parseFloat(tickValue);
            if (value >= 1e9) {
              return `${(value / 1e9).toFixed(2)} µs`; // Convert to microseconds
            } else {
              return value.toExponential(2); // Keep in nanoseconds
            }
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  satData: any;
  selectedSatellite = 'IRGSV';
  private socket: any;
  private url: string = `http://${this.ipAddress}:3000`;
  messages: string[] = [];

  constructor() {
    this.initializeSocket();
  }

  ngOnInit(): void {
    this.socket.on('message', (data: any) => {
      this.updateDashboard(data);
    });
  }

  updateDashboard(data: any) {
    const maxDataPoints = 100;

    // Format the timestamp as HH:MM:SS
    const formattedTime = this.formatTimestamp(data.timestamp);

    // Push the formatted timestamp and value to the chart
    this.chartBarData.labels.push(formattedTime);
    this.chartBarData.datasets[0].data.push(parseFloat(data.value));

    // Ensure only the latest 100 data points are kept
    if (this.chartBarData.labels.length > maxDataPoints) {
      this.chartBarData.labels = this.chartBarData.labels.slice(-maxDataPoints);
      this.chartBarData.datasets[0].data =
        this.chartBarData.datasets[0].data.slice(-maxDataPoints);
    }

    // Update chartBarData without reinitializing
    this.chartBarData = { ...this.chartBarData };
  }

  // Helper function to format the timestamp as HH:MM:SS
  formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  ngAfterViewInit(): void {}

  months = [] as any[];

  chartBarData = {
    labels: [...this.months].slice(0, 7),
    datasets: [
      {
        label: 'UTC(NPLI) - Rb',
        data: [] as any[],
        backgroundColor: 'rgba(138, 43, 226, 0.6)',
      },
    ],
  };

  onIPChange(newIP: string) {
    // Update the URL with the new IP address
    this.url = `http://${newIP}:3000`;

    // Reinitialize the WebSocket connection with the new URL
    if (this.socket) {
      this.socket.disconnect();
    }
    this.initializeSocket();
  }

  initializeSocket() {
    this.socket = io(this.url, { transports: ['websocket'] });
  }
}
