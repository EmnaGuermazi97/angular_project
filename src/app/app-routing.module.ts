import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MemberListComponent} from './member-list/member-list.component';
import {MemberFormComponent} from './member-form/member-form.component';
import {EventListComponent} from './event-list/event-list.component';
import {EventFormComponent} from './event-form/event-form.component';
import {PublicationListComponent} from './publication-list/publication-list.component';
import {PublicationFormComponent} from './publication-form/publication-form.component';

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
  {
    path: '**',
    redirectTo: 'members'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
