import {Component, Injectable, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import {Member} from '../../../models/member.model';
import {MemberService} from '../../../services/member.service';

/**
 * Node for to-do item
 */
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],

})
export class AuthorsComponent implements OnInit {
  members: Member[] = []; // empty then it would be filled
  panelOpenState = false;



  constructor(private memberService: MemberService) {

  }

  ngOnInit(): void {
    this.fetchDataSource();

  }
  fetchDataSource(): void {
    this.memberService.getAllMembers().then(data => {
      console.log(data);
      this.members = data;
      console.log(this.members);
    });

  }
}
