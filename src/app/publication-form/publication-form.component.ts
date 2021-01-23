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
        this.initForm(item);
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
  toggle(event): void{
    console.log(event.source.value);
  }
  checkValue(event: any): void{
    console.log(event);
  }
  onClick(e): void {
    console.log(e);
  }
  // onChecked(obj: any, isChecked: boolean): void{
  //   console.log(obj, isChecked); // {}, true || false
  // }
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
    await this.publicationService.savePublication(objectToSubmit).then(() =>
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
    await this.memberService.assignMemberToPublication(this.idMember, this.idPublication);
    await this.router.navigate(['./publications']);
  }
}
