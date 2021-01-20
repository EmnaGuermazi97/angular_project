import {Component, OnDestroy, OnInit} from '@angular/core';
import {GLOBAL} from '../app-config';
import {ToolService} from '../../services/tool.service';
import {Tool} from '../../models/tool.model';
import {ConfirmDialogComponent} from '../../@root/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {TokenStorageService} from '../../services/token-storage.service';
@Component({
  selector: 'app-tool-list',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.scss']
})
export class ToolListComponent implements OnInit, OnDestroy {
  currentUser: any;
  role: string;
  // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  displayedColumns: string[] = ['id', 'date', 'source', 'actions'];
  dataSource: Tool[] = [];
  constructor(private toolService: ToolService, private dialog: MatDialog, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if (!!this.currentUser)
    {this.role = this.currentUser.roles[0];
    }
    else
    {this.role = 'visitor';
    }
    this.fetchDataSource();
  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  fetchDataSource(): void {
    this.toolService.getAllTools().then(data => {
      this.dataSource = data;
    });  }

  onRemoveAccount(id: any): void {
    // this.toolService.removeToolById(id).then(() => this.fetchDataSource());
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.toolService.removeToolById(id).then(() => this.fetchDataSource());
      }
    });

  }



}
