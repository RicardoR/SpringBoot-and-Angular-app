import { Injectable } from '@angular/core';
import * as Chartist from 'chartist';

@Injectable({
  providedIn: 'root',
})
export class AnimationChartService {
  public constructor() {}

  // Todo: try to make those methods simple:
  public startAnimationForLineChart(chart: Chartist.IChartistLineChart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on(
      'draw',
      function (data: {
        type: string;
        element: {
          animate: (arg0: {
            d?: {
              begin: number;
              dur: number;
              from: any;
              to: any;
              easing: Chartist.IChartistEasingDefinition;
            };
            opacity?: {
              begin: number;
              dur: any;
              from: number;
              to: number;
              easing: string;
            };
          }) => void;
        };
        path: {
          clone: () => {
            (): any;
            new (): any;
            scale: {
              (arg0: number, arg1: number): {
                (): any;
                new (): any;
                translate: {
                  (arg0: number, arg1: any): {
                    (): any;
                    new (): any;
                    stringify: { (): any; new (): any };
                  };
                  new (): any;
                };
              };
              new (): any;
            };
            stringify: { (): any; new (): any };
          };
        };
        chartRect: { height: () => any };
      }) {
        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint,
            },
          });
        } else if (data.type === 'point') {
          seq++;
          data.element.animate({
            opacity: {
              begin: seq * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'ease',
            },
          });
        }
      }
    );

    seq = 0;
  }

  startAnimationForBarChart(chart: Chartist.IChartistBarChart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on(
      'draw',
      function (data: {
        type: string;
        element: {
          animate: (arg0: {
            opacity: {
              begin: number;
              dur: any;
              from: number;
              to: number;
              easing: string;
            };
          }) => void;
        };
      }) {
        if (data.type === 'bar') {
          seq2++;
          data.element.animate({
            opacity: {
              begin: seq2 * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: 'ease',
            },
          });
        }
      }
    );

    seq2 = 0;
  }
}
