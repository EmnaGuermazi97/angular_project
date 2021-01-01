import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../app-config';
import {MemberService} from '../../services/member.service';
import {Member} from '../../models/member.model';
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'cin', 'name', 'email', 'type_mbr', 'cv', 'actions'];
  dataSource: Member[] = []; // empty then it would be filled
  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.fetchDataSource();
  }
  fetchDataSource(): void {
    this.memberService.getAllMembers().then(data => {
      this.dataSource = data;
    });  }

  onRemoveAccount(id: any): void {
    this.memberService.removeMemberById(id).then(() => this.fetchDataSource());

  }
}
