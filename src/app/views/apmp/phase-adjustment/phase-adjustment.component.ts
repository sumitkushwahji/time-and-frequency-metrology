import { AfterViewInit, Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-phase-adjustment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './phase-adjustment.component.html',
  styleUrls: ['./phase-adjustment.component.scss'],
})
export class PhaseAdjustmentComponent implements OnInit, AfterViewInit {
  ipAddress = '172.16.16.31';

  private socket: any;
  private url: string = `http://${this.ipAddress}:3000`;
  currentValue: string = '';

  constructor() {
    this.initializeSocket();
  }

  ngOnInit(): void {
    this.socket.on('message', (data: any) => {
      this.updateDashboard(data);
    });
  }

  updateDashboard(data: any) {
    // Parse the received data if it's a JSON string
    let parsedData;
    try {
      parsedData = typeof data === 'string' ? JSON.parse(data) : data;
    } catch (error) {
      console.error('Invalid data format:', data);
      return;
    }

    // Extract and update the value in nanoseconds
    if (parsedData && parsedData.value) {
      const valueString = parsedData.value;
      const valueInSeconds = parseFloat(valueString.split(' ')[0]); // Extract the numeric value in seconds

      // Convert the value to nanoseconds
      const valueInNanoseconds = valueInSeconds * 1e9;

      // Update the currentValue in nanoseconds, formatted to avoid scientific notation
      this.currentValue = valueInNanoseconds.toFixed(2) + ' ns'; // Display without decimal points
    }
  }

  ngAfterViewInit(): void {}

  onIPChange(newIP: string) {
    this.url = `http://${newIP}:3000`;
    if (this.socket) {
      this.socket.disconnect();
    }
    this.initializeSocket();
  }

  initializeSocket() {
    this.socket = io(this.url, { transports: ['websocket'] });

    this.socket.on('connect', () => {
      console.log('Socket connected successfully');
    });

    this.socket.on('connect_error', (error: any) => {
      console.error('Connection Error:', error);
    });
  }
}
