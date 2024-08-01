// src/app/views/base2/real-graph/real-graph.component.ts
import { Component, OnInit } from '@angular/core';
import * as Papa from 'papaparse';
import { HttpClient } from '@angular/common/http';
import { ChartDataset, ChartOptions, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-real-graph',
  templateUrl: './real-graph.component.html',
  styleUrls: ['./real-graph.component.scss']
})
export class RealGraphComponent implements OnInit {
  public lineChartData: ChartDataset[] = [{ data: [], label: 'Real-Time Data' }];
  public lineChartLabels: string[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Array<any> = [  // Define color options here
    {
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: any = 'line';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.http.get('/assets/chart_data.csv', { responseType: 'text' })
      .subscribe((data) => {
        Papa.parse(data, {
          complete: (result: { data: any[] }) => { // Explicitly define the type of result
            this.processData(result.data);
            this.updateChart();
          }
        });
      });
  }

  processData(csvData: any) {
    csvData.forEach((row: any) => {
      this.lineChartLabels.push(new Date(row[0]).toString());
      this.lineChartData[0].data.push(parseFloat(row[1]));
    });
  }

  updateChart() {
    setInterval(() => {
      // Fetch new data and update the chart
      this.http.get('/assets/chart_data.csv', { responseType: 'text' })
        .subscribe((data) => {
          Papa.parse(data, {
            complete: (result: { data: any[] }) => { // Explicitly define the type of result
              this.lineChartLabels = [];
              this.lineChartData[0].data = [];
              this.processData(result.data);
            }
          });
        });
    }, 60000); // Update every minute
  }
}
