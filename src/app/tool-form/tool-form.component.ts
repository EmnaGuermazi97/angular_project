import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Tool} from '../../models/tool.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ToolService} from '../../services/tool.service';
import {MemberService} from '../../services/member.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {Member} from '../../models/member.model';

@Component({
  selector: 'app-tool-form',
  templateUrl: './tool-form.component.html',
  styleUrls: ['./tool-form.component.scss']
})
export class ToolFormComponent implements OnInit {
  currentItemId: string;
  item: Tool;
  form: FormGroup;
  idTool: any;
  tool: Tool;
  source: string;
  errorMessage = '';
  currentUser: any;
  role: string;
  idMember: any;
  member: Member;
  members: Member[] = []; // empty then it would be filled
  panelOpenState = false;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toolService: ToolService,
    private memberService: MemberService,
    private token: TokenStorageService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.fetchDataSource();
    this.currentUser = this.token.getUser();
    this.member = await this.memberService.getMemberByCin(this.currentUser.cin);
    this.idMember = this.member.id;
    console.log(this.idMember);

    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.toolService.getToolById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item);
      });
    } else {
      this.initForm(null);
    }

  }
  async fetchDataSource(): Promise<void> {
    await this.memberService.getAllMembers().then(data => {
      console.log(data);
      this.members = data;
      console.log(this.members);
    });

  }

  initForm(item: Tool): void {
    this.form = new FormGroup({
      date: new FormControl(item?.date, [Validators.required]),
      source: new FormControl(item?.source, [Validators.required]),
    });
  }


  onSubmit(): void {
    const objectToSubmit = {...this.item, ...this.form.value};
    console.log(objectToSubmit);
    this.source = this.form.value.source;
    this.toolService.saveTool(objectToSubmit).then(() =>
      this.assignToolToMember()
    );
  }
  async assignToolToMember(): Promise<void> {
    this.tool = await this.toolService.getToolBySource(this.source);
    this.idTool = this.tool.id;
    console.log(this.idTool);
    console.log(this.idMember);
    await this.memberService.assignMemberToTool( this.idMember, this.idTool);
    await this.router.navigate(['./tools'])

  }
}
