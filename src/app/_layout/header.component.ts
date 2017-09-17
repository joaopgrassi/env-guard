import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <md-toolbar id="appToolbar" color="primary">
      <span><md-icon>mood</md-icon></span>
      <span>Yay, Material in Angular 2!</span>
    </md-toolbar>
  `
})
export class HeaderComponent {

}
