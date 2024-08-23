import { Component } from '@angular/core';
import { NplModule } from 'src/app/npl.module';

import { FrequencyOffsetComponent } from '../frequency-offset/frequency-offset.component';
import { PhaseCorrectionComponent } from '../phase-correction/phase-correction.component';
import { RubidiumSteeringComponent } from '../rubidium-steering/rubidium-steering.component';
import { TicDataComponent } from '../tic-data/tic-data.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NplModule,
    FrequencyOffsetComponent,
    PhaseCorrectionComponent,
    RubidiumSteeringComponent,
    TicDataComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
