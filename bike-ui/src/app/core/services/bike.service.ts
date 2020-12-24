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
      `${this._basePath}/+${id}`,
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

  public getTotalSales(): Observable<any> {
    return this._http.get(`${this._basePath}/total-sales`, this._getHeaders());
  }

  public getTotalRevenue(): Observable<any> {
    return this._http.get(
      `${this._basePath}/total-revenue`,
      this._getHeaders()
    );
  }

  private _getHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('access_token');
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };
  }
}
