import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';

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

  assignments:Assignment[]= [];
   /* {
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
  ]*/

  constructor(private loggingService: LoggingService, 
    private http:HttpClient
    ) {
    this.loggingService.setLoggingLevel(1);
  }
  url = "http://localhost:8010/api/assignments";

  getAssignments(): Observable<Assignment[]> {
   
   return this.http.get<Assignment[]>(this.url);
   // return of(this.assignments);
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    //on doit mettre | undefined si jamais l'élément n'existe pas
  /*  let a: Assignment | undefined = this.assignments.find(a => a.id === id);
    return of(a);*/
    return this.http.get<Assignment>(`${this.url}/${id}`);

  }

  addAssignment(assignment: Assignment): Observable<any> {
 //   this.assignments.push(assignment);
    this.loggingService.log(assignment, "ajouté");
    return this.http.post<Assignment>(this.url,assignment);
    
  //  return of('Assignment ajouté');

  }

  updateAssignment({ assignment }: { assignment: Assignment; }): Observable<any> {
    //Pour le moment, on a rien à faire ... ça marche tel quel
    //PLus tard envoyer la requete http PUT sur web service pour update d'une base de données
    this.loggingService.log(assignment, "modifié");
    return this.http.post<Assignment>(this.url, assignment);
    //return of("Assignment modifié");
  }
  deleteAssignment(assignment: Assignment): Observable<any> {

  //  let pos = this.assignments.indexOf(assignment);
    //position et nbre d'objets à supprimer dans le tableau
    this.loggingService.log(assignment, "supprimé");
    return this.http.delete(this.url + "/" + assignment._id);
 //   this.assignments.splice(pos, 1);
   // return of("Assignment supprimé");
  }


}
