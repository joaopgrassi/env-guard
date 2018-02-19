import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from './app-material.module';
import { rootRouterConfig } from './app-routes';
import { AppComponent } from './app.component';
import { HeaderComponent } from './_layout/';
import { NotificationService, BrowserStorageProvider } from './common';
import { AppStore } from './store/';

import { RuleDashboardComponent, RuleDetailsComponent, RuleService, RuleBrowserStorageService } from './rule';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RuleDashboardComponent,
    RuleDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AppStore,
  ],
  providers: [
    { provide: 'Chrome',  useValue: chrome },
    RuleService,
    NotificationService,
    RuleBrowserStorageService,
    BrowserStorageProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
