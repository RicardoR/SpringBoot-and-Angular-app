import { Component, OnInit } from '@angular/core';
import { BikeService } from 'src/app/services/bike.service';
import { Bike } from 'src/app/shared/model/bike.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public bikes: Bike[];

  constructor(private _bikeService: BikeService) {}

  ngOnInit(): void {
    this._getBikes();
  }

  private _getBikes(): void {
    this._bikeService.getBikes().subscribe(
      (data: Bike[]) => (this.bikes = data),
      (err) => console.log('error', err),
      () => console.log('bikes loaded')
    );
  }
}
