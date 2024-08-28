import { Component } from '@angular/core';
import { NplModule } from 'src/app/npl.module';
import { routes } from '../../dashboard/routes';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-project-staff',
  standalone: true,
  imports: [NplModule, AppComponent],
  templateUrl: './project-staff.component.html',
  styleUrl: './project-staff.component.scss',
})
export class ProjectStaffComponent {
  employees = [
    {
      name: 'Sumit Kushwah',
      id: '10912',
      mobile: '9479966498',
      email: 'sumitkushwahji@gmail.com',
    },
    {
      name: 'Rajkumar Goyal',
      id: '11122',
      mobile: '9887055767',
      email: 'rajgoyalsujh@gmail.com',
    },
  ];
}
