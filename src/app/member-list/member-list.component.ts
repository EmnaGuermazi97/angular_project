import {Component, OnDestroy, OnInit} from '@angular/core';
import {GLOBAL} from '../app-config';
import {MemberService} from '../../services/member.service';
import {Member} from '../../models/member.model';
import {ConfirmDialogComponent} from '../../@root/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
    selector: 'app-member-list',
    templateUrl: './member-list.component.html',
    styleUrls: ['./member-list.component.scss']
  })

export class MemberListComponent implements OnInit, OnDestroy {
  currentUser: any;
  role: string;
  // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  displayedColumns: string[] = ['id', 'cin', 'name', 'email', 'cv', 'actions'];
  dataSource: Member[] = []; // empty then it would be filled
  constructor(private memberService: MemberService, private dialog: MatDialog, private token: TokenStorageService) { }

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
    this.memberService.getAllMembers().then(data => {
      console.log(data);
      this.dataSource = data;
      console.log(this.dataSource);
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
