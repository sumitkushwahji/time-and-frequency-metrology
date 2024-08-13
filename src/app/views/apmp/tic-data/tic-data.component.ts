import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from '../../../services/websocket.service';
import { Subscription } from 'rxjs';
import { NplModule } from 'src/app/npl.module';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-tic-data',
  standalone: true,
  imports: [NplModule],
  templateUrl: './tic-data.component.html',
  styleUrl: './tic-data.component.scss',
})
export class TicDataComponent implements OnInit, OnDestroy {
  public chartLineData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        label: 'TIC Data',
        data: [],
        borderColor: '#42A5F5',
        fill: false,
      },
    ],
  };

  public options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'second',
          tooltipFormat: 'll HH:mm:ss',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  private subscription: Subscription | undefined;

  constructor(private websocketService: WebsocketService) {}

  ngOnInit() {
    this.subscription = this.websocketService.getTicData().subscribe((data) => {
      this.updateChart(data);
    });
  }
  updateChart(data: { timestamp: string; value: number }) {
    const date = new Date(data.timestamp);
    if (this.chartLineData.labels) {
      if (this.chartLineData.labels.length > 20) {
        this.chartLineData.labels.shift();
        if (this.chartLineData.datasets[0].data) {
          this.chartLineData.datasets[0].data.shift();
        }
      }

      this.chartLineData.labels.push(date);
      if (this.chartLineData.datasets[0].data) {
        this.chartLineData.datasets[0].data.push(data.value);
      }
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.websocketService.disconnect();
  }
}
