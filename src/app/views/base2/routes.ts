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
      {
        path: 'ups-monitoring',
        loadComponent: () =>
          import('./ups-monitoring/ups-monitoring.component').then(
            (m) => m.UpsMonitoringComponent
          ),
        data: {
          title: 'ups-monitoring',
        },
      },
      {
        path: 'graph',
        loadComponent: () =>
          import('./graph/graph.component').then((m) => m.GraphComponent),
        data: {
          title: 'graph',
        },
      },

      {
        path: 'missing-value-graph',
        loadComponent: () =>
          import('./missing-value-graph/missing-value-graph.component').then(
            (m) => m.MissingValueGraphComponent
          ),
        data: {
          title: 'missing-value-graph',
        },
      },
      {
        path: 'white-rabbit',
        loadComponent: () =>
          import('./white-rabbit/white-rabbit.component').then(
            (m) => m.WhiteRabbitComponent
          ),
        data: {
          title: 'rabbit',
        },
      },
      {
        path: 'cctv-monitoring',
        loadComponent: () =>
          import('./cctv-monitoring/cctv-monitoring.component').then(
            (m) => m.CctvMonitoringComponent
          ),
        data: {
          title: 'CCTV',
        },
      },
    ],
  },
];
