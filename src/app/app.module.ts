import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberListComponent } from './member-list/member-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from '../@root/shared.module';
import { MemberFormComponent } from './member-form/member-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from './event-form/event-form.component';
import { PublicationFormComponent } from './publication-form/publication-form.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { ToolFormComponent } from './tool-form/tool-form.component';
import { ToolListComponent } from './tool-list/tool-list.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {GridAllModule} from "@syncfusion/ej2-angular-grids";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtTokenInterceptor} from "./interceptor/jwtTokenInterceptor";

@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    MemberFormComponent,
    EventListComponent,
    EventFormComponent,
    PublicationFormComponent,
    PublicationListComponent,
    ToolFormComponent,
    ToolListComponent,
    RegisterComponent,
    ProfileComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    GridAllModule,

  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : JwtTokenInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
