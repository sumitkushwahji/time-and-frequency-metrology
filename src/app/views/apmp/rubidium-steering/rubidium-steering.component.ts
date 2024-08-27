import { Component } from '@angular/core';
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
}
