import { Component } from '@angular/core';
import { NplModule } from 'src/app/npl.module';

@Component({
  selector: 'app-rubidium-steering',
  standalone: true,
  imports: [NplModule],
  templateUrl: './rubidium-steering.component.html',
  styleUrl: './rubidium-steering.component.scss',
})
export class RubidiumSteeringComponent {}
