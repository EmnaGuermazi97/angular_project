import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../app-config';
import {ToolService} from '../../services/tool.service';
import {Tool} from '../../models/tool.model';
@Component({
  selector: 'app-tool-list',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.scss']
})
export class ToolListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'source'];
  dataSource: Tool[] = [];
  constructor(private toolService: ToolService) { }

  ngOnInit(): void {
    this.fetchDataSource();
  }
  fetchDataSource(): void {
    this.toolService.getAllTools().then(data => {
      this.dataSource = data;
    });  }

  onRemoveAccount(id: any): void {
    this.toolService.removeToolById(id).then(() => this.fetchDataSource());

  }

}
