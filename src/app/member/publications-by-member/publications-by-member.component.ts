import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Publication} from '../../../models/publication.model';
import {PublicationService} from '../../../services/publication.service';
import {MatDialog} from '@angular/material/dialog';
import {TokenStorageService} from '../../../services/token-storage.service';
import {ConfirmDialogComponent} from '../../../@root/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {Member} from '../../../models/member.model';
import {MemberService} from '../../../services/member.service';

@Component({
  selector: 'app-publications-by-member',
  templateUrl: './publications-by-member.component.html',
  styleUrls: ['./publications-by-member.component.scss']
})
export class PublicationsByMemberComponent implements OnInit, OnDestroy {
  currentUser: any;
  role: string;
  idMember: any;
  member: Member;
  // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  displayedColumns: string[] = ['id', 'titre', 'type', 'dateApparition', 'lien', 'sourcePdf', 'actions'];
  dataSource: Publication[] = []; // empty then it would be filled
  constructor(private memberService: MemberService,
              private publicationService: PublicationService,
              private dialog: MatDialog,
              private token: TokenStorageService) { }

  async ngOnInit(): Promise<void>{
    this.currentUser = this.token.getUser();
    this.member = await this.memberService.getMemberByCin(this.currentUser.cin);
    this.idMember = this.member.id;
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
    this.memberService.getPublicationsByMemberId(this.idMember).then(data => {
      this.dataSource = data;
    });
  }
  onRemoveAccount(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.publicationService.removePublicationById(id).then(() => this.fetchDataSource());
      }
    });
  }

}
