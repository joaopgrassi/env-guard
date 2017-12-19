import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar id="appToolbar" class="mat-elevation-z4" color="primary">
      <span class="mat-button-wrapper">
    <img alt="env-guard logo" src="../../assets/icons/env_32.png" />
    <span>Env-Guard</span>
  </span>
    </mat-toolbar>
  `
})
export class HeaderComponent {

}
