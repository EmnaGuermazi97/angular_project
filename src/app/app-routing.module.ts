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
import {MemberChecklistTreeComponent} from './member-checklist-tree/member-checklist-tree.component';
import {PublicationsByMemberComponent} from './member/publications-by-member/publications-by-member.component';
import {EventsByMemberComponent} from './member/events-by-member/events-by-member.component';
import {ToolsByMemberComponent} from './member/tools-by-member/tools-by-member.component';
import {MemberEditFormComponent} from './member-edit-form/member-edit-form.component';
import {StudentFormComponent} from './member-form/student-form/student-form.component';
import {ProfessorFormComponent} from './member-form/professor-form/professor-form.component';
import {StudentListComponent} from './member-list/student-list/student-list.component';
import {ProfessorListComponent} from './member-list/professor-list/professor-list.component';

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
        component: MemberEditFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'students',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: StudentListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: StudentFormComponent,
      },
      {
        path: 'student/edit',
        pathMatch: 'full',
        component: StudentFormComponent,
      },
      {
        path: ':id/student/edit',
        pathMatch: 'full',
        component: StudentFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {path: 'professors',
  children: [
  {
    path: '',
    pathMatch: 'full',
    component: ProfessorListComponent,
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: ProfessorFormComponent,
  },
  {
    path: 'professor/edit',
    pathMatch: 'full',
    component: ProfessorFormComponent,
  },
  {
    path: ':id/professor/edit',
    pathMatch: 'full',
    component: ProfessorFormComponent,
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
  { path: 'publicationsByMember', component: PublicationsByMemberComponent },
  { path: 'eventsByMember', component: EventsByMemberComponent },
  { path: 'toolsByMember', component: ToolsByMemberComponent },
  { path: 'chooseMembers', component: MemberChecklistTreeComponent },
  // { path: 'studentForm', component: StudentFormComponent },
  // { path: 'professorForm', component: ProfessorFormComponent },
  // { path: 'studentList', component: StudentListComponent },
  // { path: 'ProfessorList', component: ProfessorListComponent },



  {
    path: '**',
    redirectTo: 'member'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
