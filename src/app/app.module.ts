import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './_layout/';
import { RuleDashboardComponent } from './rule/dashboard/rule-dashboard.component';
import { rootRouterConfig } from './app-routes';
import { RuleDetailsComponent } from './rule/details/rule-details.component';
import { AppMaterialModule } from './app-material.module';
import { RuleService } from './rule/common/rule.service';
import { ChromeStorageService } from './rule/common/chrome-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RuleDashboardComponent,
    RuleDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppMaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [RuleService, ChromeStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
