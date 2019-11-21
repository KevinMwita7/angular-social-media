import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInRoutingModule } from './sign-in-routing.module';

import { SignInComponent } from '../sign-in.component';

@NgModule({
  imports: [
    CommonModule,
    SignInRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SignInComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SignInModule { }
