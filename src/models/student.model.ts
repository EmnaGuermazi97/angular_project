import {ProfessorModel} from './professor.model';

export interface StudentModel {
  id: string;
  cin: string;
  name: string;
  nom: string;
  prenom: string;
  createdDate: string;
  cv: string;
  type: string;
  email: string;
  password: string;
  type_mbr: string;
  dateInscription: Date ;
  sujet: string;
  diplome: string ;
  encadrant: any;
  encadrantName: string;
}
