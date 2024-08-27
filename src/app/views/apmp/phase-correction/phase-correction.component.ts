import { Component } from '@angular/core';
import { NplModule } from 'src/app/npl.module';

@Component({
  selector: 'app-phase-correction',
  standalone: true,
  imports: [NplModule],
  templateUrl: './phase-correction.component.html',
  styleUrl: './phase-correction.component.scss',
})
export class PhaseCorrectionComponent {
  rows: any[] = [{ input1: '', input2: '', input3: '' }];

  addRow() {
    this.rows.push({ input1: '', input2: '', input3: '' });
  }

  removeRow(index: number) {
    this.rows.splice(index, 1);
  }

  applyChanges() {
    // Handle the logic for applying changes here
    console.log('Applied Changes:', this.rows);
  }
}
