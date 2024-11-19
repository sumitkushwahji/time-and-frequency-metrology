import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';

import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io'; // Import SocketIoModule

// WebSocket configuration
const socketConfig: SocketIoConfig = {
  url: 'http://localhost:5000', // Replace with your WebSocket server URL
  options: {
    transports: ['websocket'],
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    importProvidersFrom(
      SidebarModule,
      DropdownModule,
      SocketIoModule.forRoot(socketConfig)
    ), // Pass SocketIoModule using importProvidersFrom
    IconSetService,
    provideAnimations(),
  ],
};
