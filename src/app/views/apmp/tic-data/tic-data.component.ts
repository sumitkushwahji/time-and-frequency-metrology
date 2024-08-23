import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService, Message } from '../../../services/websocket.service';
import { Subscription } from 'rxjs';
import { NplModule } from 'src/app/npl.module';
// import { Chart, ChartData, ChartOptions } from 'chart.js'; // Ensure this is needed

// Import the date adapter for Chart.js if used
// import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-tic-data',
  standalone: true,
  imports: [NplModule],
  templateUrl: './tic-data.component.html',
  styleUrls: ['./tic-data.component.scss'],
})
export class TicDataComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  public messages: Message[] = [];

  constructor(private webSocketService: WebsocketService) {}

  ngOnInit() {
    this.subscription = this.webSocketService.messages.subscribe(
      (message: Message) => {
        this.messages.push(message);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
