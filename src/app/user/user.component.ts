import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../services/member.service';
import {AuthService} from '../../services/auth.service';
import {Member} from '../../models/member.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  item: Member;


  constructor(    private router: Router,
                  private activatedRoute: ActivatedRoute,
                  private memberService: MemberService,
                  private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    this.authService.addMember(this.form).subscribe(
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
    const message = 'member added in table members';

    const objectToSubmit = {...this.item, ...this.form.value};
    // @ts-ignore
    this.memberService.saveMember(objectToSubmit).then(console.log(message));
  }
}
