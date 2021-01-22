import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MemberService} from "../../../services/member.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentModel} from "../../../models/student.model";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']

})
export class StudentFormComponent implements OnInit {
  //memberForm we get it from the register component after registering a user
  @Input() memberForm: FormGroup;
  fileToUpload: File = null;
  currentItemId : string;
  student: StudentModel;
  form: FormGroup;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private memberService: MemberService)
  {}

  async ngOnInit(): Promise<void> {
    this.currentItemId = this.activatedRoute.snapshot.queryParams.id;
    console.log(this.currentItemId);
    if (!!this.currentItemId) {
      this.student = await this.memberService.getMemberStudentById(this.currentItemId);

      console.log(this.student);
      this.initFormUpdate(this.student);
      console.log(this.form);
    } else {
      console.log(this.memberForm);
      console.log(this.form);
      this.initFormCreate(null);
    }

  }

  initFormUpdate(student :StudentModel){
    this.form = new FormGroup({
      cin: new FormControl(this.student?.cin, [Validators.required]),
      prenom: new FormControl(this.student?.prenom, [Validators.required]),
      nom: new FormControl(this.student?.nom, [Validators.required]),
      email: new FormControl(this.student?.email, [Validators.required]),
      type_mbr: new FormControl('Etudiant', [Validators.required]),
      cv: new FormControl(this.student?.cv, [Validators.required]),
      dateInscription: new FormControl(this.student?.dateInscription, [Validators.required]),
      sujet: new FormControl(this.student?.sujet, [Validators.required]),
      diplome: new FormControl(this.student?.diplome, [Validators.required]),
    })
  }
  initFormCreate(student :StudentModel){
    this.form = new FormGroup({
      cin: new FormControl(this.memberForm.value.cin, [Validators.required]),
      prenom: new FormControl(this.student?.prenom, [Validators.required]),
      nom: new FormControl(this.student?.nom, [Validators.required]),
      email: new FormControl(this.memberForm.value.email, [Validators.required]),
      type_mbr: new FormControl('Etudiant', [Validators.required]),
      cv: new FormControl(this.student?.cv, [Validators.required]),
      dateInscription: new FormControl(this.student?.dateInscription, [Validators.required]),
      sujet: new FormControl(this.student?.sujet, [Validators.required]),
      diplome: new FormControl(this.student?.diplome, [Validators.required]),
    })
  }
  onSubmit(): void {
    const objectToSubmit = {...this.student, ...this.form.value};
    console.log(objectToSubmit);
    this.memberService.saveMemberStudent(objectToSubmit).then(() =>
      this.router.navigate(['./members'])
    );
  }
}
