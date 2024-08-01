import { Component, OnInit } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { ChartjsModule } from '@coreui/angular-chartjs';
import {
  
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  CardTitleDirective,
  CardTextDirective,
  ButtonDirective,
  CardSubtitleDirective,
  CardLinkDirective,
  ListGroupDirective,
  ListGroupItemDirective,
  CardFooterComponent,
  NavComponent,
  NavItemComponent,
  NavLinkDirective,
  BorderDirective,
  CardGroupComponent,
  GutterDirective,
  CardImgDirective,
} from '@coreui/angular';


@Component({
  selector: 'app-missing-value-graph',
  imports: [
    
    RowComponent,
    ChartjsModule,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,

    NgTemplateOutlet,
    CardTitleDirective,
    CardTextDirective,
    ButtonDirective,
    CardSubtitleDirective,
    CardLinkDirective,
    RouterLink,
    ListGroupDirective,
    ListGroupItemDirective,
    CardFooterComponent,
    NavComponent,
    NavItemComponent,
    NavLinkDirective,
    BorderDirective,
    CardGroupComponent,
    GutterDirective,
    CardImgDirective,
  ],
  standalone: true,
  templateUrl: './missing-value-graph.component.html',
  styleUrls: ['./missing-value-graph.component.scss']
})
export class MissingValueGraphComponent implements OnInit {
  public lineChartData: ChartDataset<'line'>[] = [
    { data: [], label: 'Value over Time' }
  ];
  public lineChartLabels: string[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartType: ChartType = 'line';
  public lineChartLegend = true;
  public lineChartPlugins = [];

  rawData: { timestamp: string, value: number }[] = [
    { timestamp: "26/7/24, 2:44 PM", value: 6.266666666666667 },
    { timestamp: "26/7/24, 3:00 PM", value: 12.4 },
    { timestamp: "26/7/24, 3:16 PM", value: 0.1 },
    { timestamp: "26/7/24, 3:32 PM", value: -5.125 },
    { timestamp: "26/7/24, 3:48 PM", value: -6.9 },
    // Add the rest of your data here...
    
  ];

  constructor() {}

  ngOnInit() {
    this.processData();
  }

  processData() {
    const processedData = [];
    const processedLabels = [];

    let previousTimestamp = new Date(this.rawData[0].timestamp);
    processedData.push(this.rawData[0].value);
    processedLabels.push(this.rawData[0].timestamp);

    for (let i = 1; i < this.rawData.length; i++) {
      const currentTimestamp = new Date(this.rawData[i].timestamp);
      const diffMinutes = (currentTimestamp.getTime() - previousTimestamp.getTime()) / (1000 * 60);

      if (diffMinutes > 16) {
        const missingIntervals = Math.floor(diffMinutes / 16) - 1;

        for (let j = 0; j < missingIntervals; j++) {
          previousTimestamp.setMinutes(previousTimestamp.getMinutes() + 16);
          processedLabels.push(previousTimestamp.toISOString());
          processedData.push(null); // or some other placeholder for missing data
        }
      }

      processedLabels.push(this.rawData[i].timestamp);
      processedData.push(this.rawData[i].value);
      previousTimestamp = currentTimestamp;
    }

    this.lineChartData[0].data = processedData;
    this.lineChartLabels = processedLabels;
  }
}
