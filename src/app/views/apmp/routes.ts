import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'APMP',
    },
    children: [
      {
        path: '',
        redirectTo: 'tic-data',
        pathMatch: 'full',
      },
      {
        path: 'tic-data',
        loadComponent: () =>
          import('./tic-data/tic-data.component').then(
            (m) => m.TicDataComponent
          ),
        data: {
          title: 'TIC DATA READING',
        },
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        data: {
          title: 'Dashboard',
        },
      },
      {
        path: 'frequency-offset',
        loadComponent: () =>
          import('./frequency-offset/frequency-offset.component').then(
            (m) => m.FrequencyOffsetComponent
          ),
        data: {
          title: 'Frequency-Offset',
        },
      },
      {
        path: 'phase-adjustment',
        loadComponent: () =>
          import('./phase-adjustment/phase-adjustment.component').then(
            (m) => m.PhaseAdjustmentComponent
          ),
        data: {
          title: 'Phase-Adjustment',
        },
      },
      {
        path: 'frequency-adjustment',
        loadComponent: () =>
          import('./frequency-adjustment/frequency-adjustment.component').then(
            (m) => m.FrequencyAdjustmentComponent
          ),
        data: {
          title: 'Frequency-Adjustment',
        },
      },
      {
        path: 'phase-correction',
        loadComponent: () =>
          import('./phase-correction/phase-correction.component').then(
            (m) => m.PhaseCorrectionComponent
          ),
        data: {
          title: 'Phase-correction',
        },
      },
      {
        path: 'rubidium-steering',
        loadComponent: () =>
          import('./rubidium-steering/rubidium-steering.component').then(
            (m) => m.RubidiumSteeringComponent
          ),
        data: {
          title: 'rubidium-steering',
        },
      },
    ],
  },
];
