import { Component } from '@angular/core';
import { NplModule } from '../../../npl.module';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [NplModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
})
export class TemplateComponent {
  data = [
    {
      id: 1,
      name: 'logs',
      error: 'this is console error',
    },
    {
      id: 2,
      name: 'system',
      error: 'this is console system',
    },
    {
      id: 3,
      name: 'server',
      error: 'this is console server',
    },
  ];

  constructor() {}
}
