import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BikeService } from '../../services/bike.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public models: string[] = [
    'Globo MTB 29 Full Suspension',
    'Globo Carbon Fiber Race Series',
    'Globo Time Trial Blade',
  ];
  public bikeForm: FormGroup;
  public validMessage: string;

  constructor(
    private _bikeService: BikeService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.bikeForm = this._formBuilder.group({
      email: this._formBuilder.control('', [Validators.required]),
      contact: this._formBuilder.control(''),
      model: this._formBuilder.control('', [Validators.required]),
      name: this._formBuilder.control('', [Validators.required]),
      phone: this._formBuilder.control('', [Validators.required]),
      purchasePrice: this._formBuilder.control('', [Validators.required]),
      purchaseDate: this._formBuilder.control('', [Validators.required]),
      serialNumber: this._formBuilder.control('', [Validators.required]),
    });
  }

  public submitRegistration() {
    if (this.bikeForm.valid) {
      this._bikeService.createRegistrationBike(this.bikeForm.value).subscribe(
        () => {
          this.bikeForm.reset();
          this.validMessage = 'Your bike has been submitter. Thank you';
          return true;
        },
        (error) => {
          return Observable.throw(error);
        }
      );
    } else {
      this.validMessage = 'Please fill out the form before submitting!!';
    }
  }
}
