import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { io } from 'socket.io-client';
import { NplModule } from 'src/app/npl.module';

@Component({
  selector: 'app-frequency-offset',
  standalone: true,
  imports: [NplModule],
  templateUrl: './frequency-offset.component.html',
  styleUrls: ['./frequency-offset.component.scss'],
})
export class FrequencyOffsetComponent implements OnInit, AfterViewInit {
  ipAddress = '172.16.16.31';
  barChartOptions: ChartConfiguration['options'] = {
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
        ticks: {
          callback: function (tickValue: number | string) {
            if (typeof tickValue === 'number') {
              if (tickValue >= 1000) {
                return (tickValue / 1000).toFixed(2) + ' µs'; // Display in microseconds
              } else {
                return tickValue.toFixed(0) + ' ns'; // Display in nanoseconds
              }
            }
            return tickValue; // Default case
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
  previousDataPoint: { timestamp: number; value: number } | null = null;

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

    // Convert timestamps to milliseconds if they are not already in that format
    const currentTimestamp = new Date(data.timestamp).getTime();
    const currentValue = parseFloat(data.value);

    // Push new data to the chart
    this.chartBarData.labels.push(data.timestamp);
    this.chartBarData.datasets[0].data.push(currentValue);

    // Calculate slope if there is a previous data point
    if (this.previousDataPoint) {
      const previousTimestamp = this.previousDataPoint.timestamp;
      const previousValue = this.previousDataPoint.value;
      const timeDifference = (currentTimestamp - previousTimestamp) / 1000; // Time difference in seconds

      // Check if the timeDifference is zero to avoid division by zero
      if (timeDifference !== 0) {
        const slope = (currentValue - previousValue) / timeDifference;
        console.log(`Calculated Slope: ${slope}`); // Debugging line
        this.slopeData.labels.push(data.timestamp);
        this.slopeData.datasets[0].data.push(slope);

        // Ensure only the latest maxDataPoints are kept for slopeData
        if (this.slopeData.labels.length > maxDataPoints) {
          this.slopeData.labels = this.slopeData.labels.slice(-maxDataPoints);
          this.slopeData.datasets[0].data =
            this.slopeData.datasets[0].data.slice(-maxDataPoints);
        }
      } else {
        console.error('Time difference is zero, cannot calculate slope');
      }
    }

    // Ensure only the latest maxDataPoints are kept for chartBarData
    if (this.chartBarData.labels.length > maxDataPoints) {
      this.chartBarData.labels = this.chartBarData.labels.slice(-maxDataPoints);
      this.chartBarData.datasets[0].data =
        this.chartBarData.datasets[0].data.slice(-maxDataPoints);
    }

    // Update chartBarData and slopeData without reinitializing
    this.chartBarData = { ...this.chartBarData };
    this.slopeData = { ...this.slopeData };

    // Update the previous data point
    this.previousDataPoint = {
      timestamp: currentTimestamp,
      value: currentValue,
    };
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

  slopeData = {
    labels: [] as any[],
    datasets: [
      {
        label: 'Slope',
        data: [] as any[],
        borderColor: 'rgba(0, 255, 0, 1)',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        fill: false, // Use fill: false to avoid filling the area under the line
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
