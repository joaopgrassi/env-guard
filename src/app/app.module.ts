import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './_layout/';
import { RuleDashboardComponent } from './rule/dashboard/rule-dashboard.component';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app-routes';
import { RuleDetailsComponent } from './rule/details/rule-details.component';
import { AppMaterialModule } from './app-material.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RuleDashboardComponent,
    RuleDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppMaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


