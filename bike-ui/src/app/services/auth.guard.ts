import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService) {}

  public canActivate() {
    if (this._authService.isAuthenticated()) {
      return true;
    } else {
      this._authService.login();
      return false;
    }
  }
}
