import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Publication} from '../../models/publication.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PublicationService} from '../../services/publication.service';
import {Member} from '../../models/member.model';
import {MemberService} from '../../services/member.service';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss']
})
export class PublicationFormComponent implements OnInit {
  currentItemId: string;
  item: Publication;
  form: FormGroup;
  idPublication: any;
  publication: Publication;
  title: string;
  errorMessage = '';

  currentUser: any;
  role: string;
  idMember: any;
  member: Member;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private publicationService: PublicationService,
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
  async onSubmit(): Promise<void> {
    const objectToSubmit = {...this.item, ...this.form.value};
    console.log(this.form.value.titre);
    this.title = this.form.value.titre;
    this.publicationService.savePublication(objectToSubmit).then(() =>
      this.assignPublicationToMember()
 );
    // await this.router.navigate(['./publications']);
    // );
  }
  async assignPublicationToMember(): Promise<void> {
    this.publication = await this.publicationService.getPublicationByTitle(this.title);
    this.idPublication = this.publication.id;
    console.log(this.idPublication);
    console.log(this.idMember);
    await this.memberService.assignMemberToPublication(this.idPublication, this.idMember);
  }
}
