import { Component } from '@angular/core';
import { NplModule } from 'src/app/npl.module';

@Component({
  selector: 'app-frequency-offset',
  standalone: true,
  imports: [NplModule],
  templateUrl: './frequency-offset.component.html',
  styleUrl: './frequency-offset.component.scss',
})
export class FrequencyOffsetComponent {}
