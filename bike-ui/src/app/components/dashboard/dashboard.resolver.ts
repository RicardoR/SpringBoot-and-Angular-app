import { DashboardScreenData } from './DashboardModels';
import { BikeService } from '../../core/services/bike.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// todo: refactor ==> get totals in one method
@Injectable({ providedIn: 'root' })
export class DashboardResolver implements Resolve<DashboardScreenData> {
  constructor(private _bikesService: BikeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<DashboardScreenData> {
    return forkJoin([
      this._bikesService.getTotalSales(),
      this._bikesService.getTotalRevenue(),
      this._bikesService.getTotalIssuesWithSerialNumber(),
      this._bikesService.getTotalContactPerson(),
      this._bikesService.getCurrentSalesPerMonth(),
      this._bikesService.getSalesPerYear(),
    ]).pipe(
      map((result: any[]) => {
        return {
          totalSales: result[0],
          totalRevenue: result[1],
          serialNumberIssues: result[2],
          totalContactPerson: result[3],
          salesPerMonth: result[4],
          salesPerYear: result[5],
        };
      })
    );
  }
}
