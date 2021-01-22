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
import {GridAllModule} from '@syncfusion/ej2-angular-grids';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtTokenInterceptor} from './interceptor/jwtTokenInterceptor';

import { NavComponent } from './nav/nav.component';
import { MemberComponent } from './member/member.component';
import { UserComponent } from './user/user.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { MemberChecklistTreeComponent } from './member-checklist-tree/member-checklist-tree.component';
import { PublicationsByMemberComponent } from './member/publications-by-member/publications-by-member.component';
import { EventsByMemberComponent } from './member/events-by-member/events-by-member.component';
import { ToolsByMemberComponent } from './member/tools-by-member/tools-by-member.component';
import {AuthorsComponent} from './publication-form/authors/authors.component';

import { StudentFormComponent } from './member-form/student-form/student-form.component';
import { ProfessorFormComponent } from './member-form/professor-form/professor-form.component';



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
    HomeComponent,
    NavComponent,
    MemberComponent,
    UserComponent,
    MemberChecklistTreeComponent,
    PublicationsByMemberComponent,
    EventsByMemberComponent,
    ToolsByMemberComponent,
    AuthorsComponent,
    StudentFormComponent,
    ProfessorFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    GridAllModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
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
