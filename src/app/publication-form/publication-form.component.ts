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
  members: Member[] = []; // empty then it would be filled
  panelOpenState = false;
  participentsId: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private publicationService: PublicationService,
    private memberService: MemberService,
    private token: TokenStorageService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.fetchDataSource();
    this.currentUser = this.token.getUser();
    this.member = await this.memberService.getMemberByCin(this.currentUser.cin);
    this.idMember = this.member.id;
    console.log(this.idMember);

    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.publicationService.getPublicationById(this.currentItemId).then(item => {
        this.item = item;
        this.initFormEdit(item);
      });
    } else {
      this.initForm(null);
    }
  }
  async fetchDataSource(): Promise<void> {
    await this.memberService.getAllMembers().then(data => {
      console.log(data);
      this.members = data;
      console.log(this.members);
    });

  }
  
  onClick(e): void {
    console.log(e);
    console.log(this.form.value.membersIds);
  }

  initForm(item: Publication): void {
    this.form = new FormGroup({
      titre: new FormControl(item?.titre, [Validators.required]),
      type: new FormControl(item?.type, [Validators.required]),
      dateApparition: new FormControl(item?.dateApparition, [Validators.required]),
      lien: new FormControl(item?.lien, [Validators.required]),
      sourcePdf: new FormControl(item?.sourcePdf, [Validators.required]),
      membersIds: new FormControl(item?.membersIds)
    });
  }
  initFormEdit(item: Publication): void {
    this.form = new FormGroup({
      titre: new FormControl(item?.titre, [Validators.required]),
      type: new FormControl(item?.type, [Validators.required]),
      dateApparition: new FormControl(item?.dateApparition, [Validators.required]),
      lien: new FormControl(item?.lien, [Validators.required]),
      sourcePdf: new FormControl(item?.sourcePdf, [Validators.required]),
      membersIds: new FormControl(item?.membersIds)

    });
  }
  async onSubmit(): Promise<void> {
    const objectToSubmit = {...this.item, ...this.form.value};
    console.log(this.form.value.titre);
    this.title = this.form.value.titre;
    this.participentsId = this.form.value.membersIds ;
    console.log('final choice' + this.participentsId);
    for (const participantId of this.participentsId) {
      console.log('participantId ' + participantId);
    }
    await this.publicationService.savePublication(objectToSubmit).then(() =>
      this.assignPublicationToMembers()
 );
  }
  async assignPublicationToMembers(): Promise<void> {
    await this.assignPublicationMemberSignedIn();
    for (const participantId of this.participentsId) {
      console.log('participantId ' + participantId);
      this.publication = await this.publicationService.getPublicationByTitle(this.title);
      this.idPublication = this.publication.id;
      await this.memberService.assignMemberToPublication(participantId, this.idPublication);
    }
    await this.router.navigate(['./publications']);
  }
  async assignPublicationMemberSignedIn(): Promise<void> {
    this.publication = await this.publicationService.getPublicationByTitle(this.title);
    this.idPublication = this.publication.id;
    console.log(this.idPublication);
    console.log(this.idMember);
    await this.memberService.assignMemberToPublication(this.idMember, this.idPublication);
  }
}
