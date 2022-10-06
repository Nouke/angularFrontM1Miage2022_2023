import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

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
    
   
}
