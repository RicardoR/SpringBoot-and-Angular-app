import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private _$layer: any;
  private _listTitles: any[];
  private _location: Location;
  private _mobile_menu_visible: any = 0;
  private _toggleButton: any;
  private _sidebarVisible: boolean;

  constructor(
    _location: Location,
    private element: ElementRef,
    private router: Router
  ) {
    this._location = _location;
    this._sidebarVisible = false;
  }

  ngOnInit() {
    this._listTitles = ROUTES.filter((listTitle) => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this._toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this._sidebarClose();
      var $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this._mobile_menu_visible = 0;
      }
    });
  }

  private _sidebarOpen() {
    const toggleButton = this._toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(() => toggleButton.classList.add('toggled'), 500);

    body.classList.add('nav-open');

    this._sidebarVisible = true;
  }

  private _sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this._toggleButton.classList.remove('toggled');
    this._sidebarVisible = false;
    body.classList.remove('nav-open');
  }

  public sidebarToggle() {
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this._sidebarVisible === false) {
      this._sidebarOpen();
    } else {
      this._sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];

    if (this._mobile_menu_visible == 1) {
      body.classList.remove('nav-open');
      if (this._$layer) {
        this._$layer.remove();
      }

      setTimeout(() => $toggle.classList.remove('toggled'), 400);

      this._mobile_menu_visible = 0;
    } else {
      setTimeout(() => $toggle.classList.add('toggled'), 430);

      this._$layer = document.createElement('div');
      this._$layer.setAttribute('class', 'close-layer');

      if (body.querySelectorAll('.main-panel')) {
        document
          .getElementsByClassName('main-panel')[0]
          .appendChild(this._$layer);
      } else if (body.classList.contains('off-canvas-sidebar')) {
        document
          .getElementsByClassName('wrapper-full-page')[0]
          .appendChild(this._$layer);
      }

      setTimeout(() => this._$layer.classList.add('visible'), 100);

      this._$layer.onclick = () => {
        //asign a function
        body.classList.remove('nav-open');
        this._mobile_menu_visible = 0;
        this._$layer.classList.remove('visible');
        setTimeout(() => {
          this._$layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      };

      body.classList.add('nav-open');
      this._mobile_menu_visible = 1;
    }
  }

  public getTitle() {
    var titlee = this._location.prepareExternalUrl(this._location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this._listTitles.length; item++) {
      if (this._listTitles[item].path === titlee) {
        return this._listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
}
