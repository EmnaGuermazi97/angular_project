import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Event} from '../../../models/event.model';
import {EventService} from '../../../services/event.service';
import {MatDialog} from '@angular/material/dialog';
import {TokenStorageService} from '../../../services/token-storage.service';
import {ConfirmDialogComponent} from '../../../@root/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {MemberService} from '../../../services/member.service';
import {Member} from '../../../models/member.model';

@Component({
  selector: 'app-events-by-member',
  templateUrl: './events-by-member.component.html',
  styleUrls: ['./events-by-member.component.scss']
})
export class EventsByMemberComponent implements OnInit, OnDestroy {
  currentUser: any;
  role: string;
  idMember: any;
  member: Member;
  // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  displayedColumns: string[] = ['id', 'title', 'date', 'location', 'actions'];
  dataSource: Event[] = []; // empty then it would be filled
  // tslint:disable-next-line:max-line-length
  constructor(private memberService: MemberService,
              private eventService: EventService,
              private dialog: MatDialog,
              private token: TokenStorageService) { }

   async ngOnInit(): Promise<void> {
     this.currentUser = this.token.getUser();
     this.member = await this.memberService.getMemberByCin(this.currentUser.cin);
     this.idMember = this.member.id;
     console.log(this.idMember);
     if (!!this.currentUser) {
       this.role = this.currentUser.roles[0];
     } else {
       this.role = 'visitor';
     }
     this.fetchDataSource();
   }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  fetchDataSource(): void {
    this.memberService.getEventsByMemberId(this.idMember).then(data => {
      this.dataSource = data;
    });    }
  onRemoveAccount(id: any): void {
    // this.eventService.removeEventById(id).then(() => this.fetchDataSource());
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.eventService.removeEventById(id).then(() => this.fetchDataSource());
      }
    });

  }



}
