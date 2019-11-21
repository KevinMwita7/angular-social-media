import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FromNowModule } from './pipes/from-now/from-now.module';

import { AuthenticationService } from './services/authentication/authentication.service';
import { AccountContainerService } from './services/account-container/account-container.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ImageActionsComponent } from './components/image-actions/image-actions.component';

import { HttpGlobalErrorInterceptor } from './interceptors/http-global-errors.interceptors';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ImageActionsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FromNowModule
  ],
  providers: [
    AuthenticationService,
    AccountContainerService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpGlobalErrorInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
