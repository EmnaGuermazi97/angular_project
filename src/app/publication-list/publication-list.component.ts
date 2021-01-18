import {Component, OnDestroy, OnInit} from '@angular/core';
import {Publication} from '../../models/publication.model';
import {PublicationService} from '../../services/publication.service';
import {ConfirmDialogComponent} from '../../@root/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {TokenStorageService} from '../../services/token-storage.service';
@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit, OnDestroy {
  currentUser: any;
  // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  displayedColumns: string[] = ['id', 'titre', 'type', 'dateApparition', 'lien', 'sourcePdf', 'actions'];
  dataSource: Publication[] = []; // empty then it would be filled
  constructor(private publicationService: PublicationService, private dialog: MatDialog, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.fetchDataSource();
  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  fetchDataSource(): void {
    this.publicationService.getAllPublications().then(data => {
      this.dataSource = data;
    });
  }
  onRemoveAccount(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.publicationService.removePublicationById(id).then(() => this.fetchDataSource());
      }
    });
  }


}
