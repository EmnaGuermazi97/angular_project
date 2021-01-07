import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Publication} from '../../models/publication.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PublicationService} from '../../services/publication.service';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss']
})
export class PublicationFormComponent implements OnInit {
  currentItemId: string;
  item: Publication;
  form: FormGroup;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private publicationService: PublicationService,
  ) { }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.publicationService.getPublicationById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item);
      });
    } else {
      this.initForm(null);
    }
  }
  initForm(item: Publication): void {
    this.form = new FormGroup({
      titre: new FormControl(item?.titre, [Validators.required]),
      type: new FormControl(item?.type, [Validators.required]),
      dateApparition: new FormControl(item?.dateApparition, [Validators.required]),
      lien: new FormControl(item?.lien, [Validators.required]),
      sourcePdf: new FormControl(item?.sourcePdf, [Validators.required]),
    });
  }
  onSubmit(): void {
    const objectToSubmit = {...this.item, ...this.form.value};
    console.log(objectToSubmit);
    this.publicationService.savePublication(objectToSubmit).then(() =>
      this.router.navigate(['./publications'])
    );
  }
}
