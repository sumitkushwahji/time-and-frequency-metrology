import { AfterViewInit, Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { TicDataService } from '../../../services/tic-data.service'; // Import the service
import { Socket } from 'ngx-socket-io';
import { NplModule } from 'src/app/npl.module';

@Component({
  selector: 'app-phase-adjustment',
  standalone: true,
  imports: [NplModule],

  templateUrl: './phase-adjustment.component.html',
  styleUrls: ['./phase-adjustment.component.scss'],
})
export class PhaseAdjustmentComponent implements OnInit {
  ticValue: any;
  phaseValue: string = ''; // Holds the input value from the UI
  constructor(private ticDataService: TicDataService, private socket: Socket) {}

  ngOnInit(): void {
    this.ticDataService.ticValue$.subscribe((data) => {
      if (data) {
        this.ticValue = data;
      }
    });

    // Listen for backend status updates
    this.socket.on(
      'phaseCorrectionStatus',
      (status: { status: string; value?: number; message?: string }) => {
        console.log('Phase Correction Status:', status); // Log status to console
        if (status.status === 'success') {
          alert(`Success: Applied correction value: ${status.value}`);
        } else {
          alert(`Error: ${status.message || 'Unknown error occurred'}`);
        }
      }
    );
  }

  formatToNanoseconds(value: any): string {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      return 'Invalid value'; // Handle invalid values gracefully
    }
    const nanoseconds = numericValue * 1e9; // Convert the value to nanoseconds
    return nanoseconds.toFixed(2); // Format to two decimal places
  }

  applyPhaseAdjustment() {
    const nanoseconds = parseFloat(this.phaseValue); // Assume input is in nanoseconds
    if (!isNaN(nanoseconds)) {
      this.socket.emit('applyPhaseCorrection', {
        corrValue: nanoseconds,
        flag: 0,
      }); // Emit to the backend in nanoseconds
      alert(`Applied correction value: ${nanoseconds} nanoseconds`);
    } else {
      alert('Please enter a valid number.'); // Handle invalid input
    }
  }
}
