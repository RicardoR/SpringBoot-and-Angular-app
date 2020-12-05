import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BikeService } from '../../services/bike.service';
import { Bike } from '../../shared/model/bike.model';

@Component({
  selector: 'app-view-registration',
  templateUrl: './view-registration.component.html',
  styleUrls: ['./view-registration.component.scss'],
})
export class ViewRegistrationComponent implements OnInit {
  public bikeReg: Bike;

  constructor(
    private _bikeService: BikeService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBikeReg(this._route.snapshot.params.id);
  }

  public getBikeReg(id: number) {
    this._bikeService.getBike(id).subscribe(
      (data: Bike) => (this.bikeReg = data),
      (err) => console.log(err),
      () => console.log('bike loaded')
    );
  }
}
