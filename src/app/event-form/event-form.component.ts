import { Component, OnInit } from '@angular/core';
import {Event} from '../../models/event.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../services/event.service';
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
  ) { }

  ngOnInit(): void {
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
    this.eventService.saveEvent(objectToSubmit).then(() =>
      this.router.navigate(['./events'])
    );
  }
}
