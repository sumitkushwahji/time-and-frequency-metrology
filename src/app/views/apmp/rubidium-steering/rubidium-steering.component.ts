import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { io } from 'socket.io-client';
import { NplModule } from 'src/app/npl.module';
import { TicDataService } from 'src/app/services/tic-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rubidium-steering',
  standalone: true,
  imports: [NplModule],
  templateUrl: './rubidium-steering.component.html',
  styleUrl: './rubidium-steering.component.scss',
})
export class RubidiumSteeringComponent implements OnInit, AfterViewInit {
  ipAddress: string = environment.websocket.host;
  private port: number = environment.websocket.port;
  private socket: any;

  // Chart configuration with dual y-axes
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    animation: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Steering Interval (s)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Frequency & Phase Corrections',
        },
        position: 'left',
        ticks: {
          callback: (value: number | string) => `${value}`,
        },
      },
      y1: {
        title: {
          display: true,
          text: 'TIC Reading',
        },
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: (value: number | string) => `${value}`,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  chartBarData = {
    labels: [] as string[], // X-axis labels
    datasets: [
      {
        label: 'Frequency Correction',
        data: [] as number[],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        label: 'Phase Correction',
        data: [] as number[],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        label: 'Average TIC Value',
        data: [] as number[],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        yAxisID: 'y1',
      },
    ],
  };

  frequencyCorrection: number = 0;
  phaseCorrection: number = 0;
  ticReading: number = 0;
  steeringInterval: number = 0;

  private url: string = `http://${this.ipAddress}:${this.port}`;

  constructor(private ticDataService: TicDataService) {
    this.initializeSocket();
  }

  ngOnInit(): void {
    // Listen for frequency correction data
    this.socket.on('freq_corr', (data: any) => {
      this.frequencyCorrection = data.value;
      this.updateDashboard(data.timestamp);
    });

    // Listen for phase correction data
    this.socket.on('phase_corr', (data: any) => {
      this.phaseCorrection = data.value;
      this.updateDashboard(data.timestamp);
    });

    // Listen for TIC reading data
    this.socket.on('currentTic', (data: any) => {
      const ticValues = data.value;
      this.ticReading =
        ticValues.reduce((sum: number, val: number) => sum + val, 0) /
        ticValues.length; // Calculate average
      this.updateDashboard(data.timestamp);
    });

    // Listen for slop interval
    this.socket.on('slop_Interval', (data: any) => {
      this.steeringInterval = data.value;
      this.updateDashboard(data.timestamp);
    });
  }

  updateDashboard(timestamp: string) {
    const maxDataPoints = 100;

    // Use steering interval or fallback to formatted timestamp
    const formattedTime =
      this.steeringInterval || this.formatTimestamp(timestamp);

    // Push data to the respective datasets
    this.chartBarData.labels.push(String(formattedTime));
    this.chartBarData.datasets[0].data.push(this.frequencyCorrection);
    this.chartBarData.datasets[1].data.push(this.phaseCorrection);
    this.chartBarData.datasets[2].data.push(this.ticReading);

    // Maintain the maximum number of points
    if (this.chartBarData.labels.length > maxDataPoints) {
      this.chartBarData.labels = this.chartBarData.labels.slice(-maxDataPoints);
      this.chartBarData.datasets.forEach((dataset) => {
        dataset.data = dataset.data.slice(-maxDataPoints);
      });
    }

    // Update chartBarData without reinitializing
    this.chartBarData = { ...this.chartBarData };
  }

  // Format timestamp as HH:MM:SS
  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  ngAfterViewInit(): void {}

  initializeSocket() {
    this.socket = io(this.url, { transports: ['websocket'] });
  }
}
