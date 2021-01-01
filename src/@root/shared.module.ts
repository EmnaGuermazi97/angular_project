import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';





@NgModule({
  declarations: [],
  imports: [
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule
  ],
})
export class SharedModule { }
