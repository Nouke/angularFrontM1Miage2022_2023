import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  /* updateAssignment(assignmentTransmis: Assignment) {
     throw new Error('Method not implemented.');
   }
   addAssignment(assignment: Assignment) {
     throw new Error('Method not implemented.');
   }*/

  assignments = [
    {
      id: 1,
      nom: " TP1 Analyse de données à rendre",
      dateDeRendu: new Date('2022-10-10'),
      rendu: true

    },

    {
      id: 2,
      nom: "TP2 Angular à rendre",
      dateDeRendu: new Date('2022-10-15'),
      rendu: false

    },

    {
      id: 3,
      nom: "TP3 Mini Projet Angular à rendre",
      dateDeRendu: new Date('2022-10-18'),
      rendu: false

    }
  ]

  constructor(private loggingService: LoggingService) {
    this.loggingService.setLoggingLevel(1);
  }

  getAssignments(): Observable<Assignment[]> {
    return of(this.assignments);
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    //on doit mettre | undefined si jamais l'élément n'existe pas
    let a: Assignment | undefined = this.assignments.find(a => a.id === id);
    return of(a);
  }

  addAssignment(assignment: Assignment): Observable<string> {
    this.assignments.push(assignment);
    this.loggingService.log(assignment, "ajouté");
    return of('Assignment ajouté');

  }

  updateAssignment(assignment: Assignment): Observable<string> {
    //Pour le moment, on a rien à faire ... ça marche tel quel
    //PLus tard envoyer la requete http PUT sur web service pour update d'une base de données
    this.loggingService.log(assignment, "modifié");
    return of("Assignment modifié");
  }
  deleteAssignment(assignment: Assignment): Observable<string> {

    let pos = this.assignments.indexOf(assignment);
    //position et nbre d'objets à supprimer dans le tableau
    this.loggingService.log(assignment, "supprimé");
    this.assignments.splice(pos, 1);
    return of("Assignment supprimé");
  }


}
