import { Component } from '@angular/core';
import { NplModule } from 'src/app/npl.module';

@Component({
  selector: 'app-time-frequency-staff',
  standalone: true,
  imports: [NplModule],
  templateUrl: './time-frequency-staff.component.html',
  styleUrl: './time-frequency-staff.component.scss',
})
export class TimeFrequencyStaffComponent {}
