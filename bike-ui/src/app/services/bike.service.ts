import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bike } from '../shared/model/bike.model';

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
    return this._http.get(this._basePath) as Observable<Bike[]>;
  }

  public getBike(id: number): Observable<Bike> {
    return this._http.get(`${this._basePath}/+${id}`) as Observable<Bike>;
  }

  public createRegistrationBike(bike: Bike): Observable<any> {
    const body = JSON.stringify(bike);
    return this._http.post(this._basePath, body, httpOptions);
  }

  public deleteBike(id: number): Observable<any> {
    return this._http.delete(`${this._basePath}/+${id}`) as Observable<any>;
  }
}
