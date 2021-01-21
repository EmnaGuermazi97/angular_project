import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Member} from '../../models/member.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../services/member.service';
import {User} from "../../models/user.model";
import {RegisterComponent} from "../register/register.component";
interface Profession {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  currentItemId: string;
  cin: string ;
  email: string;
  item: Member;
  form: FormGroup;
  professions: Profession[] = [
    {value: 'Etudiant', viewValue: 'Etudiant'},
    {value: 'Enseignant', viewValue: 'Enseignant'},


  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService,
  ) {

  }

  ngOnInit(): void {
    this.cin= this.activatedRoute.snapshot.queryParams.cin;
    this.email= this.activatedRoute.snapshot.queryParams.email;
    console.log(this.cin);
    console.log(this.email);
    // this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.memberService.getMemberById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item);
      });
    } else {

      this.initForm(null);

    }

  }

  initForm(item: Member): void {
    this.form = new FormGroup({
      cin: new FormControl(this.cin, [Validators.required]),
      prenom: new FormControl(item?.prenom, [Validators.required]),
      nom: new FormControl(item?.nom, [Validators.required]),
      email: new FormControl(this.email, [Validators.required]),
      type_mbr: new FormControl(item?.type_mbr, [Validators.required]),
      cv: new FormControl(item?.cv, [Validators.required]),
    });
  }


  onSubmit(): void {
    const objectToSubmit = {...this.item, ...this.form.value};
    console.log(objectToSubmit);
    this.memberService.saveMember(objectToSubmit).then(() =>
      this.router.navigate(['./members'])
    );
  }
}
