import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MemberService} from "../../../services/member.service";
import {Router} from "@angular/router";
import {ProfessorModel} from "../../../models/professor.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.scss']

})
  export class ProfessorFormComponent implements OnInit {
  @Input() memberForm: FormGroup;
  fileToUpload: File = null;

  item: ProfessorModel;
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
      type_mbr: new FormControl('Enseignant', [Validators.required]),
      cv: new FormControl(this.item?.cv, [Validators.required]),
      etablissement: new FormControl(this.item?.etablissement, [Validators.required]),
      grade: new FormControl(this.item?.grade, [Validators.required]),
    })
    console.log(this.form);
  }
  onSubmit(): void {
    const objectToSubmit = {...this.item, ...this.form.value};
    console.log(objectToSubmit);
    this.memberService.saveMemberProfessor(objectToSubmit).then(() =>
      this.router.navigate(['./members'])
    );
  }
}
