import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent{
  public title = 'Est-ce que vous êtes sur?';
  public message = 'Voulez-vous vraiment supprimer cet élément?';
  public confirmButtonLabel = 'Confirmer';
  public confirmButtonColor = 'accent';
  public cancelButtonLabel = 'Annuler';
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

}
