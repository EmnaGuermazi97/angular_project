import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MemberService} from "../../services/member.service";
import {StudentFormComponent} from "../member-form/student-form/student-form.component";
import {StudentModel} from "../../models/student.model";

@Component({
  selector: 'app-member-edit-form',
  templateUrl: './member-edit-form.component.html',
  styleUrls: ['./member-edit-form.component.scss']
})
export class MemberEditFormComponent implements OnInit {
  type_mbr: string;
  currentItemId: any;
  member: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private memberService: MemberService) {
  }

  async ngOnInit(): Promise<void> {
    this.currentItemId = this.activatedRoute.snapshot.params.id;

    if (!!await this.memberService.getMemberStudentById(this.currentItemId)) {

      this.member = await this.memberService.getMemberStudentById(this.currentItemId);
      console.log(this.member)
      if(!!this.member.grade){
        this.member.type_mbr='Enseignant';
        console.log(this.member.type_mbr)
        this.redirectProfessor();
      }
    else {
        this.member.type_mbr='Etudiant';
        console.log(this.member.type_mbr)
        this.redirectStudent();
      }
      console.log(this.member.type_mbr)
    }
  }
  redirectStudent(): void {
    this.router.navigate(['./studentForm'], {queryParams: {id: this.member.id, type_mbr: this.member.type_mbr}}).then(r =>'');
  }
  redirectProfessor(): void {
    this.router.navigate(['./professorForm'], {queryParams: {id: this.member.id, type_mbr: this.member.type_mbr }}).then(r =>'');
  }
}
