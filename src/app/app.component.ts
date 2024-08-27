import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideInAnimation', [
      state(
        'inactive',
        style({
          transform: 'translateY(-100%)',
        })
      ),
      state(
        'active',
        style({
          transform: 'translateY(0)',
        })
      ),
      transition('inactive => active', [
        animate('800ms cubic-bezier(0.25, 0.8, 0.25, 1)'),
      ]),
      transition('active => inactive', [
        animate('800ms cubic-bezier(0.25, 0.8, 0.25, 1)'),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'oninsure_ui_task';
  imagePath: any = './assets/wealth.jpg';
  goalAmount: number = 100;
  goalPeriod: number = 10;
  growthRate: number = 5;

  pieChartType: ChartType = 'pie';
  slideInAnimation = 'inactive';

  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Goal', 'Period', 'Growth'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['#00FF66', '#95BA6C', '#000'],
      },
    ],
  };

  ngOnInit() {
    this.updateChartData();
    setTimeout(() => {
      this.slideInAnimation = 'active';
    }, 0);
  }

  onSliderChange(event: any) {
    const sliderId = event.target.id;
    const value = Number(event.target.value);
    const min = event.target.min || 0;
    const max = event.target.max || 100;
    const percentage = ((value - min) / (max - min)) * 100;

    event.target.style.background = `linear-gradient(to right, green ${percentage}%, lightgray ${percentage}%)`;

    switch (sliderId) {
      case 'goalAmount':
        this.goalAmount = value;
        break;
      case 'goalPeriod':
        this.goalPeriod = value;
        break;
      case 'growthRate':
        this.growthRate = value;
        break;
    }

    this.updateChartData();
  }

  updateChartData() {
    const total = this.goalAmount + this.growthRate + this.goalPeriod;

    this.pieChartData = {
      ...this.pieChartData,
      datasets: [
        {
          ...this.pieChartData.datasets[0],
          data: [
            (this.goalAmount / total) * 100,
            (this.growthRate / total) * 100,
            (this.goalPeriod / total) * 100,
          ],
        },
      ],
    };
  }

  activateSlideIn() {
    this.slideInAnimation = 'active';
  }
}
