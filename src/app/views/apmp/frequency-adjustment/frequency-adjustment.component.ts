import { AfterViewInit, Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { NplModule } from 'src/app/npl.module';
import { FrequencyAdjustmentService } from 'src/app/services/frequency-adjustment.service';
import { environment } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-frequency-adjustment',
  standalone: true,
  imports: [NplModule],
  templateUrl: './frequency-adjustment.component.html',
  styleUrl: './frequency-adjustment.component.scss',
})
export class FrequencyAdjustmentComponent implements OnInit {
  // UI input fields
  slopeMultiplier: string = ''; // Holds slope multiplier input value
  phaseTimeConstant: string = ''; // Holds phase time constant input value
  steeringInterval: string = ''; // Holds steering interval input value
  phaseTimeConstant1: string = ''; // Holds phase time constant input value
  slopeMultiplier1: string = ''; // Holds steering interval input value
  errorLimit: string = ''; // Holds error limit input value
  startsteering = false;
  startautosteering = false;

  // Real-time data
  frequencyCorrection: any; // Real-time frequency correction data
  phaseCorrection: any; // Real-time phase correction data
  currentTicValue: any; // Real-time phase correction data
  steering_Interval: any; // Real-time phase correction
  error_Limit: any; // Real-time phase correction data
  totalCorrection: number | null = null;
  lastUpdateTimestamp: string | null = null;

  constructor(private socket: Socket) {}

  ngOnInit(): void {
    // Listen for frequency correction data
    this.socket.on('freq_corr', (data: any) => {
      this.frequencyCorrection = data;
      console.log('Frequency Correction Data:', data);
    });

    // Listen for phase correction data
    this.socket.on('phase_corr', (data: any) => {
      this.phaseCorrection = data;
      console.log('Phase Correction Data:', data);
    });
    this.socket.on('currentTic', (data: any) => {
      this.currentTicValue = data;
      console.log('Current TIC Data:', data);
    });
    this.socket.on('steering_Interval', (data: any) => {
      this.steering_Interval = data;
      console.log('Steering Interval:', data);
    });
    this.socket.on('error_Limit', (data: any) => {
      this.error_Limit = data;
      console.log('Error limit:', data);
    });

    // this.socket.on('realTimeData', (data: any) => {
    //   if (data) {
    //     this.frequencyCorrection = data.Freq_corr;
    //     this.phaseCorrection = data.Phase_corr;
    //     this.totalCorrection = data.Total_corr;
    //     this.lastUpdateTimestamp = data.timestamp;
    //     console.log('Real-Time Data:', data);
    //   }
    // });
    // Listen for applied steering response
    this.socket.on('parameterUpdateStatus', (response: any) => {
      if (response.status === 'success') {
        alert(
          `Steering applied successfully with parameters: ${JSON.stringify(
            response.params
          )}`
        );
      } else {
        alert(`Error applying steering: ${response.message}`);
      }
    });

    // Listen for stop status
    this.socket.on('correctionStatus', (status: any) => {
      if (status.status === 'stopped') {
        alert('Correction stopped successfully.');
      }
    });
  }

  // Start Steering with parameters
  startSteering(): void {
    if (this.startautosteering == true) {
      alert('Stop Error Bound Steering');
    } else {
      this.startsteering = true;

      const slope = parseFloat(this.slopeMultiplier);
      const phase = parseFloat(this.phaseTimeConstant);
      const interval = parseFloat(this.steeringInterval);

      if (!isNaN(slope) && !isNaN(phase) && !isNaN(interval)) {
        this.socket.emit('updateParameters', {
          slope_multipler: slope,
          phase_time_const: phase,
          steering_int: interval,
        });
        alert('Starting Steering...');
      } else {
        alert(
          'Please enter valid values for Slope Multiplier, Phase Time Constant, and Steering Interval.'
        );
      }
    }
  }

  // Stop Steering
  stopSteering(): void {
    this.startsteering = false;
    this.socket.emit('stopCorrection');
    alert('Stopping Steering...');
  }

  // Start Auto Steering with parameters
  startAutoSteering(): void {
    if (this.startsteering == true) {
      alert('Stop Periodic Steering');
    } else {
      this.startautosteering = true;

      const slope = parseFloat(this.slopeMultiplier1);
      const phase = parseFloat(this.phaseTimeConstant1);
      const limit = parseFloat(this.errorLimit);

      if (!isNaN(slope) && !isNaN(phase) && !isNaN(limit)) {
        this.socket.emit('updateParameters', {
          slope_multipler: slope,
          phase_time_const: phase,
          error_limit: limit,
        });
        alert('Starting Auto Steering...');
      } else {
        alert(
          'Please enter valid values for Slope Multiplier, Phase Time Constant, and Error Limit.'
        );
      }
    }
  }

  // Stop Auto Steering
  stopAutoSteering(): void {
    this.startautosteering = false;
    this.socket.emit('stopCorrection');
    alert('Stopping Auto Steering...');
  }
}
