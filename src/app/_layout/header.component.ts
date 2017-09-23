import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <md-toolbar id="appToolbar" class="mat-elevation-z4" color="primary">
      <span>Env-Magic</span>
      <span>No more mistakes in production!</span>
    </md-toolbar>
  `
})
export class HeaderComponent {

}
