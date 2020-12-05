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

  public getBikes(): Observable<Bike[]> {
    return this._http.get('/server/api/v1/bikes') as Observable<Bike[]>;
  }
}
