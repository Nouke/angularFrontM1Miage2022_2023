import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
//import { bdInitialAssignments } from './data';

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
 //url = "https://api-angular-backend-miage.herokuapp.com/api/assignments";

  /*getAssignments(): Observable<Assignment[]> {
   
   return this.http.get<Assignment[]>(this.url);
   // return of(this.assignments);
  }*/

  getAssignments() {
    return this.http.get<any>(this.url)
  }

  getAssignmentsPagine(page: number, limit:number): Observable<any> {

    return this.http.get<any>(this.url + "?page=" + page + "&limit = " +limit);
    // return of(this.assignments);
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    //on doit mettre | undefined si jamais l'élément n'existe pas
  /*  let a: Assignment | undefined = this.assignments.find(a => a.id === id);
    return of(a);*/
    return this.http.get<Assignment>(`${this.url}/${id}`)
    .pipe(
      tap( a => {
       // a.nom += "Modifié ds un pipe";
       // return a;
       console.log("tap : " + a.nom)
      }),

       catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id +" a échoué"))

    );

  }
 

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
  };
// Et la ligne catchError à ajouter dans le pipe(...)
 

  addAssignment(assignment: Assignment): Observable<any> {
 //   this.assignments.push(assignment);
    this.loggingService.log(assignment, "ajouté");
    return this.http.post<Assignment>(this.url,assignment);
    
  //  return of('Assignment ajouté');

  }

  updateAssignment(assignment: Assignment): Observable<any> {
    //Pour le moment, on a rien à faire ... ça marche tel quel
    //PLus tard envoyer la requete http PUT sur web service pour update d'une base de données
    this.loggingService.log(assignment, "modifié");
    return this.http.put<Assignment>(this.url, assignment);
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
  // version naive 
  /*peuplerBD(){
    bdInitialAssignments.forEach(a => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      this.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
      })
    });
    console.log("###Tous les assignments sont ajoutés###");
  }
  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment: any = [];

    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }*/
  
}
