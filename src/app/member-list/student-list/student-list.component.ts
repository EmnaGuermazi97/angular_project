import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {StudentModel} from '../../../models/student.model';
import {MemberService} from '../../../services/member.service';
import {MatDialog} from '@angular/material/dialog';
import {TokenStorageService} from '../../../services/token-storage.service';
import {ConfirmDialogComponent} from '../../../@root/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, OnDestroy {
  currentUser: any;
  role: string;
  // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  displayedColumns: string[] = ['id', 'cin', 'name', 'email', 'cv', 'dateInscription', 'sujet', 'diplome', 'encadrant', 'actions'];
  dataSource: StudentModel[] = []; // empty then it would be filled
  constructor(private memberService: MemberService,
              private dialog: MatDialog,
              private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if (!!this.currentUser)
    {this.role = this.currentUser.roles[0];
    }
    else
    {this.role = 'visitor';
    }
    this.fetchDataSource();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  fetchDataSource(): void {
    this.memberService.getAllStudents().then(data => {
      console.log(data);
      this.dataSource = data;
      console.log(this.dataSource);
      console.log(this.dataSource.values().next().value);
      // if (!!this.dataSource.values().next().value.encadrant)
      // {
      //   console.log('encadrant exist');
      // }
      // else {
      //   this.dataSource.values().next().value.encadrant.nom = 'aucun';
      //   this.dataSource.values().next().value.encadrant.nom = 'encadrant';
      // }
    });

  }

  onRemoveAccount(id: any): void {
    //  this.memberService.removeMemberById(id).then(() => this.fetchDataSource());
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.memberService.removeMemberById(id).then(() => this.fetchDataSource());
      }
    });

  }

}
