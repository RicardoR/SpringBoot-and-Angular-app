import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bike-ui';

  constructor(private _authService: AuthService) {
    this._authService.handleAuthentication();
  }
}
