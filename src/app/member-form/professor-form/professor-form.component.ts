import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MemberService} from "../../../services/member.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfessorModel} from "../../../models/professor.model";
import {Observable} from "rxjs";
import {StudentModel} from "../../../models/student.model";

@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.scss']

})
  export class ProfessorFormComponent implements OnInit {
  @Input() memberForm: FormGroup;
  fileToUpload: File = null;
  currentItemId : string;
  professor: ProfessorModel;
  form: FormGroup;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private memberService: MemberService)  {

  }

  async ngOnInit(): Promise<void> {
    this.currentItemId = this.activatedRoute.snapshot.queryParams.id;
    console.log(this.currentItemId);
    if (!!this.currentItemId) {
      this.professor = await this.memberService.getMemberProfessorById(this.currentItemId);
      console.log(this.professor);
      this.initFormUpdate(this.professor);
      console.log(this.form);
    } else {
      console.log(this.memberForm);
      console.log(this.form);
      this.initFormCreate(null);
    }
  }
  initFormUpdate(professor :ProfessorModel){
    this.form = new FormGroup({
      cin: new FormControl(this.professor?.cin, [Validators.required]),
      prenom: new FormControl(this.professor?.prenom, [Validators.required]),
      nom: new FormControl(this.professor?.nom, [Validators.required]),
      email: new FormControl(this.professor?.email, [Validators.required]),
      type_mbr: new FormControl('Enseignant', [Validators.required]),
      cv: new FormControl(this.professor?.cv, [Validators.required]),
      etablissement: new FormControl(this.professor?.etablissement, [Validators.required]),
      grade: new FormControl(this.professor?.grade, [Validators.required]),
    })
  }
  initFormCreate(professor :ProfessorModel){
    console.log(this.memberForm);
    this.form = new FormGroup({
      cin: new FormControl(this.memberForm.value.cin, [Validators.required]),
      prenom: new FormControl(this.professor?.prenom, [Validators.required]),
      nom: new FormControl(this.professor?.nom, [Validators.required]),
      email: new FormControl(this.memberForm.value.email, [Validators.required]),
      type_mbr: new FormControl('Enseignant', [Validators.required]),
      cv: new FormControl(this.professor?.cv, [Validators.required]),
      etablissement: new FormControl(this.professor?.etablissement, [Validators.required]),
      grade: new FormControl(this.professor?.grade, [Validators.required]),
    })
    console.log(this.form);
  }
  onSubmit(): void {
    const objectToSubmit = {...this.professor, ...this.form.value};
    console.log(objectToSubmit);
    this.memberService.saveMemberProfessor(objectToSubmit).then(() =>
      this.router.navigate(['./members'])
    );
  }
}
