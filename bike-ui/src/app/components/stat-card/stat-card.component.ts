import { Component, Input, OnInit } from '@angular/core';

export enum cardTypes {
  info = 'card-header-info',
  danger = 'card-header-danger',
  success = 'card-header-success',
  warning = 'card-header-warning',
}

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
})
export class StatCardComponent implements OnInit {
  @Input() cardType: string;

  constructor() {}

  ngOnInit(): void {}
}
