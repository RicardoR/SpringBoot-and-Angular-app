import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { Bike } from '../../shared/model/bike.model';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

interface formData {
  checkBox: boolean;
  data: Bike;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public trashIcon = faTrashAlt;
  public adminForm: FormGroup;

  public bikes: Bike[];

  constructor(
    private _bikeService: BikeService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this._getBikes();
    this.adminForm = this._formBuilder.group({
      adminList: this._formBuilder.array([]),
    });
  }

  private _getBikes(): void {
    this._bikeService.getBikes().subscribe(
      (data: Bike[]) => {
        this.bikes = data;
        this._buildForm();
      },
      (err) => console.log('error', err),
      () => console.log('bikes loaded')
    );
  }

  private _buildForm() {
    this.bikes.forEach((bike: Bike) => {
      const formGroup = this._formBuilder.group({
        data: this._formBuilder.control(bike),
        checkBox: this._formBuilder.control(false),
      });
      (this.adminForm.get('adminList') as FormArray).push(formGroup);
    });
  }

  public deleteBike(id: number) {
    this._bikeService.deleteBike(id).subscribe(() => this._getBikes());
  }

  public sendForm() {
    let idList: number[] = [];
    this.adminForm.value.adminList.forEach((element: formData) => {
      if (element.checkBox === true) {
        idList.push(element.data.id);
      }
    });
    const dataToSend = idList.join(',');
    this._bikeService
      .deleteMultiBikes(dataToSend)
      .subscribe(() => this._getBikes());
  }
}
