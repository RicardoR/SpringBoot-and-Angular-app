import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { Bike } from '../../shared/model/bike.model';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public trashIcon = faTrashAlt;

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

  public deleteBike(id: number) {
    this._bikeService.deleteBike(id).subscribe(() => this._getBikes());
  }
}
