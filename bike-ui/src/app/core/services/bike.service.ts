import {
  SalesPerMonth,
  SalesPerYear,
} from './../../components/dashboard/DashboardModels';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bike } from '../../shared/model/bike.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  constructor(private _http: HttpClient) {}

  private _basePath = '/server/api/v1/bikes';

  public getBikes(): Observable<Bike[]> {
    const token = localStorage.getItem('access_token');

    return this._http.get(this._basePath, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    }) as Observable<Bike[]>;
  }

  public getBike(id: number): Observable<Bike> {
    return this._http.get(
      `${this._basePath}/${id}`,
      this._getHeaders()
    ) as Observable<Bike>;
  }

  public createRegistrationBike(bike: Bike): Observable<any> {
    const body = JSON.stringify(bike);
    return this._http.post(this._basePath, body, httpOptions);
  }

  public deleteBike(id: number): Observable<any> {
    return this._http.delete(
      `${this._basePath}/${id}`,
      this._getHeaders()
    ) as Observable<any>;
  }

  public deleteMultiBikes(idList: string): Observable<any> {
    return this._http.delete(
      `${this._basePath}/multi/${idList}`,
      this._getHeaders()
    );
  }

  public getTotalSales(): Observable<number> {
    return this._http.get(
      `${this._basePath}/total-sales`,
      this._getHeaders()
    ) as Observable<number>;
  }

  public getTotalRevenue(): Observable<number> {
    return this._http.get(
      `${this._basePath}/total-revenue`,
      this._getHeaders()
    ) as Observable<number>;
  }

  public getTotalIssuesWithSerialNumber(): Observable<number> {
    return this._http.get(
      `${this._basePath}/total-serial-number-issues`,
      this._getHeaders()
    ) as Observable<number>;
  }

  public getTotalContactPerson(): Observable<number> {
    return this._http.get(
      `${this._basePath}/total-contact-person`,
      this._getHeaders()
    ) as Observable<number>;
  }

  public getCurrentSalesPerMonth(): Observable<SalesPerMonth> {
    return this._http.get(
      `${this._basePath}/current-sales-per-month`,
      this._getHeaders()
    ) as Observable<SalesPerMonth>;
  }

  public getSalesPerYear(): Observable<SalesPerYear> {
    return this._http.get(
      `${this._basePath}/sales-per-year`,
      this._getHeaders()
    ) as Observable<SalesPerYear>;
  }

  private _getHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('access_token');
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };
  }
}
