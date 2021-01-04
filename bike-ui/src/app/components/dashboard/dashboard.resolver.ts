import { DashboardScreenData, StatisticalData } from './DashboardModels';
import { BikeService } from '../../core/services/bike.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DashboardResolver implements Resolve<DashboardScreenData> {
  constructor(private _bikesService: BikeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<DashboardScreenData> {
    return forkJoin([
      this._bikesService.getStatisticalData(),
      this._bikesService.getMonthlySales(new Date().getFullYear()),
      this._bikesService.getYearlySales(),
      this._bikesService.getLastDetailSales(),
    ]).pipe(
      map((result: any[]) => {
        return {
          statisticalData: result[0],
          salesPerMonth: result[1],
          salesPerYear: result[2],
          lastDetailSales: result[3],
        };
      })
    );
  }
}
