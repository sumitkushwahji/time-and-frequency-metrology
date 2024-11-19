import { Component } from '@angular/core';
import { NplModule } from 'src/app/npl.module';

import { FrequencyOffsetComponent } from '../frequency-offset/frequency-offset.component';
import { PhaseCorrectionComponent } from '../phase-correction/phase-correction.component';
import { RubidiumSteeringComponent } from '../rubidium-steering/rubidium-steering.component';
import { TicDataComponent } from '../tic-data/tic-data.component';
import { FrequencyAdjustmentComponent } from '../frequency-adjustment/frequency-adjustment.component';
import { PhaseAdjustmentComponent } from '../phase-adjustment/phase-adjustment.component';
import { ApmpNavComponent } from '../apmp-nav/apmp-nav.component';

@Component({
  selector: 'app-apmp-dashboard',
  standalone: true,
  imports: [
    NplModule,
    FrequencyOffsetComponent,
    PhaseCorrectionComponent,
    RubidiumSteeringComponent,
    TicDataComponent,
    FrequencyAdjustmentComponent,
    PhaseAdjustmentComponent,
    ApmpNavComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
