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
    ToolListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
