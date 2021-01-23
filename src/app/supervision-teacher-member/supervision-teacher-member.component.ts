import { Component, OnInit } from '@angular/core';
import {ProfessorModel} from '../../models/professor.model';
import {MemberService} from '../../services/member.service';
import {StudentModel} from '../../models/student.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../services/token-storage.service';


@Component({
  selector: 'app-supervision-teacher-member',
  templateUrl: './supervision-teacher-member.component.html',
  styleUrls: ['./supervision-teacher-member.component.scss']
})
export class SupervisionTeacherMemberComponent implements OnInit {
  dataProfessors: ProfessorModel[]; // empty then it would be filled
  dataStudents: StudentModel[];
  professorId: string;
  studentId: string;
  form: FormGroup;
  currentUser: any;
  role: string;


  constructor(private memberService: MemberService,
              private router: Router,
              private token: TokenStorageService
  ) {

  }
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if (!!this.currentUser)
    {this.role = this.currentUser.roles[0];
    }
    else
    {this.role = 'visitor';
    }
    this.fetchDataProfessors().then(r => '');
    this.fetchDataStudents().then(r => '');
    this.initForm(null);


  }
  initForm(item: any): void {
    this.form = new FormGroup({
      student: new FormControl(item?.professor, [Validators.required]),
      professor: new FormControl(item?.student, [Validators.required]),

    });
  }
  async fetchDataProfessors(): Promise<void> {
    await this.memberService.getAllProfessors().then(data => {
      console.log(data);
      this.dataProfessors = data;
      console.log(this.dataProfessors);
    });

  }
  async fetchDataStudents(): Promise<void> {
    await this.memberService.getAllStudents().then(data => {
      console.log(data);
      this.dataStudents = data;
      console.log(this.dataStudents);
    });

  }
  onSubmit(): void {
    console.log(this.form.value);
    // console.log(this.form.value.professor);
    // console.log(this.form.value.student);
    this.professorId = this.form.value.professor ;
    this.studentId = this.form.value.student;



    this.memberService.assignStudentToProfessor(this.studentId, this.professorId).then(() =>
      this.router.navigate(['/students'])
     );
  }



}
