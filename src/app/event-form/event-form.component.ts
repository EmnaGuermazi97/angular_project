import { Component, OnInit } from '@angular/core';
import {Event} from '../../models/event.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../services/event.service';
import {Member} from '../../models/member.model';
import {MemberService} from '../../services/member.service';
import {TokenStorageService} from '../../services/token-storage.service';
interface Location {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  currentItemId: string;
  item: Event;
  form: FormGroup;
  idEvent: any;
  event: Event;
  title: string;
  errorMessage = '';

  currentUser: any;
  role: string;
  idMember: any;
  member: Member;
  locations: Location[] = [
    {value: 'Sfax', viewValue: 'Sfax'},
    {value: 'Tunis', viewValue: 'Tunis'},
    {value: 'Sousse', viewValue: 'Sousse'},
    {value: 'Djerba', viewValue: 'Djerba'},

  ];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private memberService: MemberService,
    private token: TokenStorageService
  ) { }

  async ngOnInit(): Promise<void> {
    this.currentUser = this.token.getUser();
    this.member = await this.memberService.getMemberByCin(this.currentUser.cin);
    this.idMember = this.member.id;
    console.log(this.idMember);
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.eventService.getEventById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item);
      });
    } else {
      this.initForm(null);
    }

  }
  initForm(item: Event): void {
    this.form = new FormGroup({
      title: new FormControl(item?.title, [Validators.required]),
      date: new FormControl(item?.date, [Validators.required]),
      location: new FormControl(item?.location, [Validators.required]),

    });
  }
  onSubmit(): void {
    const objectToSubmit = {...this.item, ...this.form.value};
    console.log(objectToSubmit);
    console.log(this.form.value.title);
    this.title = this.form.value.title;
    this.eventService.saveEvent(objectToSubmit).then(() =>
      this.assignEventToMember()
    );
  }
  async assignEventToMember(): Promise<void> {
    this.event = await this.eventService.getEventByTitle(this.title);
    this.idEvent = this.event.id;
    console.log(this.idEvent);
    console.log(this.idMember);
    await this.memberService.assignMemberToEvent( this.idMember, this.idEvent);
    await this.router.navigate(['./events'])

  }
}
