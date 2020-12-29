import { SalesPerMonth } from './../../core/models/SalesPerMonth';
import { DashboardScreenData, SalesPerMonthGraph } from './DashboardModels';
import { cardTypes } from './../stat-card/stat-card.component';
import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { AnimationChartService } from '../../core/services/animation-chart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public availableCardTypes = cardTypes;
  public screenData: DashboardScreenData;

  constructor(
    private _animationChartService: AnimationChartService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.screenData = this._route.snapshot.data.dashboardData;

    /* ----------==========     Monthly Sales Chart initialization For Documentation    ==========---------- */
    const labels = Array.from(
      this.screenData.salesPerMonth,
      (data: SalesPerMonth) => data.month.substring(0, 3)
    );

    const series = Array.from(
      this.screenData.salesPerMonth,
      (data: SalesPerMonth) => data.purchase
    );

    const dataDailySalesChart: SalesPerMonthGraph = {
      labels,
      series: [series],
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: Math.max(...series),
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    const dailySalesChart = new Chartist.Line(
      '#dailySalesChart',
      dataDailySalesChart,
      optionsDailySalesChart
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
    this._animationChartService.startAnimationForLineChart(dailySalesChart);
  }
}
