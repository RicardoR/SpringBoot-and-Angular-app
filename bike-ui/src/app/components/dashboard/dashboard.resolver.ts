import { BikeService } from '../../core/services/bike.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// todo: change Resolve<any> to the right property type
@Injectable({ providedIn: 'root' })
export class DashboardResolver implements Resolve<number> {
  constructor(private _bikesService: BikeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return forkJoin([
      this._bikesService.getTotalSales(),
      this._bikesService.getTotalRevenue(),
      this._bikesService.getTotalIssuesWithSerialNumber(),
      this._bikesService.getTotalContactPerson(),
    ]).pipe(
      map((result: any[]) => {
        return {
          totalSales: result[0],
          totalRevenue: result[1],
          serialNumberIssues: result[2],
          totalContactPerson: result[3],
        };
      })
    );
  }
}
