import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MemberListComponent} from './member-list/member-list.component';
import {MemberFormComponent} from './member-form/member-form.component';
import {EventListComponent} from './event-list/event-list.component';
import {EventFormComponent} from './event-form/event-form.component';
import {PublicationListComponent} from './publication-list/publication-list.component';
import {PublicationFormComponent} from './publication-form/publication-form.component';
import {ToolListComponent} from './tool-list/tool-list.component';
import {ToolFormComponent} from './tool-form/tool-form.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {MemberComponent} from './member/member.component';
import {UserComponent} from './user/user.component';

const routes: Routes = [
  {
    path: 'members',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MemberListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: MemberFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: MemberFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'events',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EventListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: EventFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: EventFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'tools',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ToolListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: ToolFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: ToolFormComponent,
      }
      ]
      },
  {path: 'publications',
  children: [
  {
    path: '',
    pathMatch: 'full',
    component: PublicationListComponent,
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: PublicationFormComponent,
  },
  {
    path: ':id/edit',
    pathMatch: 'full',
    component: PublicationFormComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
]
},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'addMember', component: UserComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'member', component: MemberComponent },

  {
    path: '**',
    redirectTo: 'home'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
