import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NplModule } from 'src/app/npl.module';

@Component({
  selector: 'app-rubidium-steering',
  standalone: true,
  imports: [NplModule],
  templateUrl: './rubidium-steering.component.html',
  styleUrl: './rubidium-steering.component.scss',
})
export class RubidiumSteeringComponent {
  input1: string = '';
  input2: string = '';
  outputValue: string = '';

  // Placeholder function for starting an operation
  start() {
    console.log('Start clicked with inputs:', this.input1, this.input2);
    // Implement start logic here
    this.outputValue = 'Started'; // Example output
  }

  // Placeholder function for stopping an operation
  stop() {
    console.log('Stop clicked');
    // Implement stop logic here
    this.outputValue = 'Stopped'; // Example output
  }
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    animation: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Steering Interval',
        },
        ticks: {
          callback: (tickValue: string | number) => {
            const value =
              typeof tickValue === 'number' ? tickValue : parseFloat(tickValue);
            if (value >= 1e3) {
              return `${(value / 1e3).toFixed(2)} µs`; // Convert to microseconds
            } else {
              return `${value.toFixed(2)} ns`; // Keep in nanoseconds
            }
          },
        },
      },
      y: {
        position: 'left', // Primary Y-axis on the left
        title: {
          display: true,
          text: 'Correction',
        },
        ticks: {
          callback: (tickValue: string | number) => {
            const value =
              typeof tickValue === 'number' ? tickValue : parseFloat(tickValue);
            if (value >= 1e3) {
              return `${(value / 1e3).toFixed(2)} µs`; // Convert to microseconds
            } else {
              return `${value.toFixed(2)} ns`; // Keep in nanoseconds
            }
          },
        },
      },
      yRight: {
        position: 'right', // Secondary Y-axis on the right
        title: {
          display: true,
          text: 'TIC Reading',
        },
        grid: {
          drawOnChartArea: false, // Disable grid lines for the right Y-axis
        },
        ticks: {
          callback: (tickValue: string | number) => {
            const value =
              typeof tickValue === 'number' ? tickValue : parseFloat(tickValue);
            if (value >= 1e3) {
              return `${(value / 1e3).toFixed(2)} µs`; // Convert to microseconds
            } else {
              return `${value.toFixed(2)} ns`; // Keep in nanoseconds
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
}
