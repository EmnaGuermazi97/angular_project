import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../services/token-storage.service';
import {Member} from '../../models/member.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../services/member.service';
import {AuthService} from '../../services/auth.service';
interface Profession {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  currentItemId: string;
  item: Member;
  form: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  professions: Profession[] = [
    {value: 'Etudiant', viewValue: 'Etudiant'},
    {value: 'Enseignant', viewValue: 'Enseignant'},
  ];

  constructor(private token: TokenStorageService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private memberService: MemberService) {
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    // this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentUser.id) {
      this.memberService.getMemberById(this.currentUser.id).then(item => {
        this.item = item;
        this.initForm(item);
      });
    } else {
      this.initForm(null);
    }

  }

  initForm(item: Member): void {
    this.form = new FormGroup({
      cin: new FormControl(item?.cin, [Validators.required]),
      prenom: new FormControl(item?.prenom, [Validators.required]),
      nom: new FormControl(item?.nom, [Validators.required]),
      email: new FormControl(item?.email, [Validators.required]),
      type_mbr: new FormControl(item?.type_mbr, [Validators.required]),
      cv: new FormControl(item?.cv, [Validators.required]),
    });

  }
  onSubmit(): void {
    const message = 'member added in table members';

    const objectToSubmit = {...this.item, ...this.form.value};
    // @ts-ignore
    this.memberService.saveMember(objectToSubmit).then(console.log(message));
    this.authService.updateUser(this.currentUser.id, objectToSubmit ).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
