import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'TSP_Project',
    },
    children: [
      {
        path: '',
        redirectTo: 'project-staff',
        pathMatch: 'full',
      },
      {
        path: 'project-staff',
        loadComponent: () =>
          import('../tsp_project/project-staff/project-staff.component').then(
            (m) => m.ProjectStaffComponent
          ),
        data: {
          title: 'Project Staff Data',
        },
      },
      {
        path: 'time-frequency-staff',
        loadComponent: () =>
          import(
            '../tsp_project/time-frequency-staff/time-frequency-staff.component'
          ).then((m) => m.TimeFrequencyStaffComponent),
        data: {
          title: 'Time Frequency Staff Data',
        },
      },
    ],
  },
];
