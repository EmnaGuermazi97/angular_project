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
  idMember: any;
  member: Member;
  form: FormGroup;
  profile: any;
  // isSuccessful = false;
  // isSignUpFailed = false;
  errorMessage = '';
  // professions: Profession[] = [
  //   {value: 'Etudiant', viewValue: 'Etudiant'},
  //   {value: 'Enseignant', viewValue: 'Enseignant'},
  // ];

  constructor(private token: TokenStorageService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private memberService: MemberService) {
  }

  async ngOnInit(): Promise<void> {
    this.currentUser = this.token.getUser();
    this.member = await this.memberService.getMemberByCin(this.currentUser.cin);
    this.idMember = this.member.id;
    console.log(this.idMember);
    // this.currentItemId = this.activatedRoute.snapshot.params.id;
    // if (!!this.currentUser.id) {
    //   this.memberService.getMemberById(this.idMember).then(item => {
    //     this.member = item;
    //     this.initForm(item);
    //   });
    // } else {
    //   this.initForm(null);
    // }
    if (!!await this.memberService.getMemberStudentById(this.idMember)) {

      this.profile = await this.memberService.getMemberStudentById(this.idMember);
      console.log(this.profile);
      if (!!this.profile.grade) {
        this.member.type_mbr = 'Enseignant';
        console.log(this.profile.type_mbr);
        this.redirectProfessor();
      } else {
        this.member.type_mbr = 'Etudiant';
        console.log(this.member.type_mbr);
        this.redirectStudent();
      }
      console.log(this.member.type_mbr);
    }
    // }

    // }

    // initForm(item: Member): void {
    //   this.form = new FormGroup({
    //     cin: new FormControl(item?.cin, [Validators.required]),
    //     prenom: new FormControl(item?.prenom, [Validators.required]),
    //     nom: new FormControl(item?.nom, [Validators.required]),
    //     email: new FormControl(item?.email, [Validators.required]),
    //     type_mbr: new FormControl(item?.type_mbr, [Validators.required]),
    //     cv: new FormControl(item?.cv, [Validators.required]),
    //   });

  }

  redirectStudent(): void {
    this.router.navigate(['./studentForm'], {
      queryParams: {
        id: this.member.id,
        type_mbr: this.member.type_mbr
      }
    }).then(r => '');
  }

  redirectProfessor(): void {
    this.router.navigate(['./professorForm'], {
      queryParams: {
        id: this.member.id,
        type_mbr: this.member.type_mbr
      }
    }).then(r => '');
  }

  // onSubmit(): void {
  //   const objectToSubmit = {...this.member, ...this.form.value};
  //   console.log(objectToSubmit);
  //   this.memberService.saveMember(objectToSubmit).then(() =>
  //     this.router.navigate(['./members'])
  //   );
  // }
}
