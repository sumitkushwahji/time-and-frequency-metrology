import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  ButtonDirective,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { DocsExampleComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-ac-monitoring',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    ButtonDirective,
    IconDirective,
    RouterLink,
  ],

  templateUrl: './ac-monitoring.component.html',
  styleUrl: './ac-monitoring.component.scss',
})
export class AcMonitoringComponent {}
