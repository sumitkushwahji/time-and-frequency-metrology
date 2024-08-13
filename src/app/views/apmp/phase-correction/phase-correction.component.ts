import { Component } from '@angular/core';
import { NplModule } from 'src/app/npl.module';

@Component({
  selector: 'app-phase-correction',
  standalone: true,
  imports: [NplModule],
  templateUrl: './phase-correction.component.html',
  styleUrl: './phase-correction.component.scss',
})
export class PhaseCorrectionComponent {}
