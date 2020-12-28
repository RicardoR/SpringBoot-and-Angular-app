import { cardTypes } from './../stat-card/stat-card.component';
import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { AnimationChartService } from '../../core/services/animation-chart.service';
import { ActivatedRoute } from '@angular/router';

interface ScreenData {
  serialNumberIssues: string;
  totalContactPerson: string;
  totalSales: number;
  totalRevenue: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public availableCardTypes = cardTypes;

  public screenData: ScreenData;

  constructor(
    private _animationChartService: AnimationChartService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.screenData = this._route.snapshot.data.dashboardData;

    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    const dataDailySalesChart: any = {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Ag',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      series: [[12, 17, 7, 17, 23, 18, 38, 12, 150, 50, 0, 0]],
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 200, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    const dailySalesChart = new Chartist.Line(
      '#dailySalesChart',
      dataDailySalesChart,
      optionsDailySalesChart
    );

    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [[230, 750, 450, 300, 280, 240, 200, 190]],
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    const completedTasksChart = new Chartist.Line(
      '#completedTasksChart',
      dataCompletedTasksChart,
      optionsCompletedTasksChart
    );

    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    const datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]],
    };
    const optionswebsiteViewsChart = {
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
    };
    const responsiveOptions: any[] = [
      [
        'screen and (max-width: 640px)',
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc(value: any[]): any {
              return value[0];
            },
          },
        },
      ],
    ];
    const websiteViewsChart = new Chartist.Bar(
      '#websiteViewsChart',
      datawebsiteViewsChart,
      optionswebsiteViewsChart,
      responsiveOptions
    );

    // start animations:
    this._animationChartService.startAnimationForBarChart(websiteViewsChart);
    this._animationChartService.startAnimationForLineChart(completedTasksChart);
    this._animationChartService.startAnimationForLineChart(dailySalesChart);
  }
}
