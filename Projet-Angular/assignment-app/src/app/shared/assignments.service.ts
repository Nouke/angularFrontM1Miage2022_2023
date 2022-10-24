import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable,of } from 'rxjs';

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
      nom: " TP1 Analyse de données à rendre",
      dateDeRendu: new Date('2022-10-10'),
      rendu: true

    },

    {
      nom: "TP2 Angular à rendre",
      dateDeRendu: new Date('2022-10-15'),
      rendu: false

    },

    {
      nom: "TP3 Mini Projet Angular à rendre",
      dateDeRendu: new Date('2022-10-18'),
      rendu: false

    }
  ]

  constructor() {}
    getAssignments():Observable<Assignment[]>{
      return of(this.assignments);
    }

  addAssignment(assignment: Assignment): Observable<string> {
    this.assignments.push(assignment);
    return of('Assignment ajouté');
  }

  updateAssignment(assignment: Assignment): Observable<string> {
    //Pour le moment, on a rien à faire ... ça marche tel quel
    //PLus tard envoyer la requete http PUT sur web service pour update d'une base de données

    return of("Assignment modifié");
  }
  deleteAssignment(assignment: Assignment): Observable<string> {
  
    let pos = this.assignments.indexOf(assignment);
    //position et nbre d'objets à supprimer dans le tableau
    this.assignments.splice(pos, 1);
    return of("Assignment supprimé");
  }
    
   
}
