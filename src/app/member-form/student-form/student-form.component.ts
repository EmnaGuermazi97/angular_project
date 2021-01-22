import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MemberService} from "../../../services/member.service";
import {Router} from "@angular/router";
import {StudentModel} from "../../../models/student.model";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']

})
export class StudentFormComponent implements OnInit {
  @Input() memberForm: FormGroup;

  item: StudentModel;
  form: FormGroup;
  constructor(private router: Router, private memberService: MemberService)  {

  }

  ngOnInit(): void {
    console.log(this.memberForm);
    this.form = new FormGroup({
      cin: new FormControl(this.memberForm.value.cin, [Validators.required]),
      prenom: new FormControl(this.item?.prenom, [Validators.required]),
      nom: new FormControl(this.item?.nom, [Validators.required]),
      email: new FormControl(this.memberForm.value.email, [Validators.required]),
      type_mbr: new FormControl('Etudiant', [Validators.required]),
      cv: new FormControl(this.item?.cv, [Validators.required]),
      dateInscription: new FormControl(this.item?.dateInscription, [Validators.required]),
      sujet: new FormControl(this.item?.sujet, [Validators.required]),
      diplome: new FormControl(this.item?.diplome, [Validators.required]),
    })
    console.log(this.form);
  }
  onSubmit(): void {
    const objectToSubmit = {...this.item, ...this.form.value};
    console.log(objectToSubmit);
    this.memberService.saveMemberStudent(objectToSubmit).then(() =>
      this.router.navigate(['./members'])
    );
  }
}
