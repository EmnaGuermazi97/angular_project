import {Event} from '../../models/event.model';
import {EventService} from '../../services/event.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmDialogComponent} from '../../@root/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {TokenStorageService} from '../../services/token-storage.service';
import {MemberService} from '../../services/member.service';
import {Member} from "../../models/member.model";
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy{
  currentUser: any;
  role: string;
  member: Member;

  dataSource: Event[] = []; // empty then it would be filled

  // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  displayedColumns: string[] = ['id', 'title', 'date', 'location', 'actions'];

  constructor(private eventService: EventService, private memberService: MemberService, private dialog: MatDialog, private token: TokenStorageService) { }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

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

  fetchDataSource(): void {
    this.eventService.getAllEvents().then(data => {
      this.dataSource = data;
    });
}
  async actionMethod(eventId: string): Promise<void> {
    console.log(this.memberService.getMemberByCin(this.currentUser.cin));
    this.member = await (this.memberService.getMemberByCin(this.currentUser.cin));
    console.log(this.member);
    console.log(eventId);
    this.memberService.assignMemberToEvent(this.member.id, eventId).then(r => '');


  }
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
