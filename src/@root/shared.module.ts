import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {ConfirmDialogModule} from './confirm-dialog/confirm-dialog.module';





@NgModule({
  imports: [
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    ConfirmDialogModule
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    ConfirmDialogModule
  ],
})
export class SharedModule { }
