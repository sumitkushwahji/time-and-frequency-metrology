import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NplModule } from 'src/app/npl.module';
import { io } from 'socket.io-client';
import { BaseChartDirective } from 'ng2-charts';
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
          text: 'Value',
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
    const maxDataPoints = 250;

    // Push new data to the chart
    this.chartBarData.labels.push(data.timestamp);
    this.chartBarData.datasets[0].data.push(parseFloat(data.value));

    // Ensure only the latest 10 data points are kept
    if (this.chartBarData.labels.length > maxDataPoints) {
      this.chartBarData.labels = this.chartBarData.labels.slice(-maxDataPoints);
      this.chartBarData.datasets[0].data =
        this.chartBarData.datasets[0].data.slice(-maxDataPoints);
    }

    // Update chartBarData without reinitializing
    this.chartBarData = { ...this.chartBarData };
  }

  ngAfterViewInit(): void {}

  months = [] as any[];

  chartBarData = {
    labels: [...this.months].slice(0, 7),
    datasets: [
      {
        label: 'TI(A->B)',
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
