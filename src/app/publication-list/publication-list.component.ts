import { Component, OnInit } from '@angular/core';
import {Publication} from '../../models/publication.model';
import {PublicationService} from '../../services/publication.service';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'titre', 'type', 'dateApparition', 'lien', 'sourcePdf', 'actions'];
  dataSource: Publication[] = []; // empty then it would be filled
  constructor(private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.fetchDataSource();

  }
  fetchDataSource(): void {
    this.publicationService.getAllPublications().then(data => {
      this.dataSource = data;
    });
  }
  onRemoveAccount(id: any): void {
    this.publicationService.removePublicationById(id).then(() => this.fetchDataSource());

  }
}
