import {
  DashboardScreenData,
  SalesGraph,
  SalesPerMonth,
  SalesPerYear,
} from './DashboardModels';
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

    this._initMonthSalesChart();
    this._initYearSalesChart();
  }

  private _initMonthSalesChart(): void {
    const labels = Array.from(
      this.screenData.salesPerMonth,
      (data: SalesPerMonth) => data.month.substring(0, 3)
    );

    const series = Array.from(
      this.screenData.salesPerMonth,
      (data: SalesPerMonth) => data.purchase
    );

    const dataMonthlySalesChart: SalesGraph = {
      labels,
      series: [series],
    };

    const optionsMonthlySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: Math.max(...series),
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    const monthlySalesChart = new Chartist.Line(
      '#monthlySalesChart',
      dataMonthlySalesChart,
      optionsMonthlySalesChart
    );

    this._animationChartService.startAnimationForLineChart(monthlySalesChart);
  }

  private _initYearSalesChart(): void {
    const labels = Array.from(
      this.screenData.salesPerYear,
      (data: SalesPerYear) => data.year
    );

    const series = Array.from(
      this.screenData.salesPerYear,
      (data: SalesPerYear) => data.purchase
    );

    const dataYearSalesChart: SalesGraph = {
      labels,
      series: [series],
    };

    const optionsYearSalesChart = {
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: Math.max(...series),
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
    const yearSalesChart = new Chartist.Bar(
      '#yearSalesChart',
      dataYearSalesChart,
      optionsYearSalesChart,
      responsiveOptions
    );

    this._animationChartService.startAnimationForBarChart(yearSalesChart);
  }
}
