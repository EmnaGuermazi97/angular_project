import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MemberService} from '../../../services/member.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentModel} from '../../../models/student.model';
import {ProfessorModel} from '../../../models/professor.model';
import {TokenStorageService} from '../../../services/token-storage.service';
// import { RequestOptions, Headers, Http } from '@angular/http';
// import {Observable} from "rxjs";
// import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']

})
export class StudentFormComponent implements OnInit {
  // memberForm we get it from the register component after registering a user
  @Input() memberForm: FormGroup;
  fileToUpload: File = null;
  currentItemId: string;
  student: StudentModel;
  // http: any;
  form: FormGroup;
  studentId: string;
  dataProfessors: ProfessorModel[];
  currentUser: any;
  role: string;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private memberService: MemberService,
              private token: TokenStorageService)
  {}

  async ngOnInit(): Promise<void> {
    this.fetchDataProfessors().then(r => '');
    this.currentUser = this.token.getUser();
    if (!!this.currentUser)
    {this.role = this.currentUser.roles[0];
    }
    else
    {this.role = 'visitor';
    }
    this.studentId = this.activatedRoute.snapshot.params.id;
    console.log('this is the captered id from student list' + this.studentId);
    if (!!this.studentId) {
      console.log('welcome to studentFormComponent From studentList');
      this.memberService.getMemberStudentById(this.studentId).then(item => {
        this.student = item;
        this.initFormUpdateFromStudent(this.student);
      });
    }
    this.currentItemId = this.activatedRoute.snapshot.queryParams.id;
    console.log(this.currentItemId);
    if (!!this.currentItemId) {
      this.student = await this.memberService.getMemberStudentById(this.currentItemId);

      console.log(this.student);
      this.initFormUpdateFromMembers(this.student);
      console.log(this.form);
    } else {
      console.log(this.memberForm);
      console.log(this.form);
      this.initFormCreate(null);
    }
  }

  initFormUpdateFromMembers(student: StudentModel): void{
    this.form = new FormGroup({
      cin: new FormControl(this.student?.cin, [Validators.required]),
      prenom: new FormControl(this.student?.prenom, [Validators.required]),
      nom: new FormControl(this.student?.nom, [Validators.required]),
      email: new FormControl(this.student?.email, [Validators.required]),
      type_mbr: new FormControl('Etudiant', [Validators.required]),
      cv: new FormControl(this.student?.cv),
      dateInscription: new FormControl(this.student?.dateInscription, [Validators.required]),
      sujet: new FormControl(this.student?.sujet, [Validators.required]),
      diplome: new FormControl(this.student?.diplome, [Validators.required]),
      professor: new FormControl(this.student?.encadrant),
    });
  }
  initFormCreate(student: StudentModel): void{
    this.form = new FormGroup({
      cin: new FormControl(this.memberForm.value.cin, [Validators.required]),
      prenom: new FormControl(this.student?.prenom, [Validators.required]),
      nom: new FormControl(this.student?.nom, [Validators.required]),
      email: new FormControl(this.memberForm.value.email, [Validators.required]),
      type_mbr: new FormControl('Etudiant', [Validators.required]),
      cv: new FormControl(this.student?.cv),
      dateInscription: new FormControl(this.student?.dateInscription, [Validators.required]),
      sujet: new FormControl(this.student?.sujet, [Validators.required]),
      diplome: new FormControl(this.student?.diplome, [Validators.required]),
      // professor: new FormControl(this.student?.encadrant),
    });
  }
  initFormUpdateFromStudent(student: StudentModel): void{
    this.form = new FormGroup({
      cin: new FormControl(this.student?.cin, [Validators.required]),
      prenom: new FormControl(this.student?.prenom, [Validators.required]),
      nom: new FormControl(this.student?.nom, [Validators.required]),
      email: new FormControl(this.student?.email, [Validators.required]),
      type_mbr: new FormControl('Etudiant', [Validators.required]),
      cv: new FormControl(this.student?.cv),
      dateInscription: new FormControl(this.student?.dateInscription, [Validators.required]),
      sujet: new FormControl(this.student?.sujet, [Validators.required]),
      diplome: new FormControl(this.student?.diplome, [Validators.required]),
      professor: new FormControl(this.student?.encadrant),
    });
  }
  async fetchDataProfessors(): Promise<void> {
    await this.memberService.getAllProfessors().then(data => {
      console.log(data);
      this.dataProfessors = data;
      console.log(this.dataProfessors);
    });

  }
  onSubmit(): void {
    const objectToSubmit = {...this.student, ...this.form.value};
    console.log(objectToSubmit);
    console.log(this.form.value.professor);
    this.memberService.saveMemberStudent(objectToSubmit).then(() =>
      this.redirectToAssignStudentToTeacher()
    );
  }
  async redirectToAssignStudentToTeacher(): Promise<void> {
    if (!!this.form.value.professor){
      if (!!this.studentId)
      {
        await this.memberService.assignStudentToProfessor(this.studentId, this.form.value.professor).then();
      }
      if (!!this.currentItemId) {
        await this.memberService.assignStudentToProfessor(this.currentItemId, this.form.value.professor).then();
      }
    }
    this.router.navigate(['./students']).then(r => '');

  }
  // public uploadFileToServer(event) {
  //   let fileList: FileList = event.target.files;
  //   if (fileList.length > 0) {
  //     let file: File = fileList[0];
  //     let formData: FormData = new FormData();
  //     formData.append('cv', file, file.name);
  //     formData.append('fileType', 'zip');
  //     let headers = new Headers();
  //     headers.append('Accept', 'application/json');
  //     let options = new RequestOptions({ headers: headers });
  //     this.http.post(`${environment.gatewayEndpoint}/membre-service/urservice`, formData, options)
  //       .map(res => res.json())
  //       .catch(error => Observable.throw(error))
  //       .subscribe(
  //         data => console.log('success'),
  //         error => console.log(error)
  //       )
  //   }
  // }
}
