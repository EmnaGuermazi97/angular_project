import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Tool} from '../../../models/tool.model';
import {ToolService} from '../../../services/tool.service';
import {MatDialog} from '@angular/material/dialog';
import {TokenStorageService} from '../../../services/token-storage.service';
import {MemberService} from '../../../services/member.service';
import {ConfirmDialogComponent} from '../../../@root/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {Member} from '../../../models/member.model';

@Component({
  selector: 'app-tools-by-member',
  templateUrl: './tools-by-member.component.html',
  styleUrls: ['./tools-by-member.component.scss']
})
export class ToolsByMemberComponent implements OnInit, OnDestroy {
  currentUser: any;
  idMember: any;
  member: Member;
  // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  displayedColumns: string[] = ['id', 'date', 'source', 'actions'];
  dataSource: Tool[] = [];

  constructor(private toolService: ToolService,
              private memberService: MemberService,
              private dialog: MatDialog,
              private token: TokenStorageService) {
  }

  async ngOnInit(): Promise<void>  {
    this.currentUser = this.token.getUser();
    this.member = await this.memberService.getMemberByCin(this.currentUser.cin);
    this.idMember = this.member.id;
    console.log(this.idMember);
    this.fetchDataSource();

  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  fetchDataSource(): void {
    this.memberService.getToolsByMemberId(this.idMember).then(data => {
      this.dataSource = data;
    });
  }

  onRemoveAccount(id: any): void {
    // this.toolService.removeToolById(id).then(() => this.fetchDataSource());
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.toolService.removeToolById(id).then(() => this.fetchDataSource());
      }
    });


  }
}
