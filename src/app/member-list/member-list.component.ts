import {Component, OnDestroy, OnInit} from '@angular/core';
import {GLOBAL} from '../app-config';
import {MemberService} from '../../services/member.service';
import {Member} from '../../models/member.model';
import {ConfirmDialogComponent} from '../../@root/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {Subject} from 'rxjs';
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  displayedColumns: string[] = ['id', 'cin', 'name', 'email', 'type_mbr', 'cv', 'actions'];
  dataSource: Member[] = []; // empty then it would be filled
  constructor(private memberService: MemberService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchDataSource();
  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  fetchDataSource(): void {
    this.memberService.getAllMembers().then(data => {
      this.dataSource = data;
    });  }

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
