import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base2',
    },
    children: [
      {
        path: '',
        redirectTo: 'ac-monitoring',
        pathMatch: 'full',
      },
      {
        path: 'ac-monitoring',
        loadComponent: () =>
          import('./ac-monitoring/ac-monitoring.component').then(
            (m) => m.AcMonitoringComponent
          ),
        data: {
          title: 'ac-monitoring',
        },
      },
    ],
  },
];
