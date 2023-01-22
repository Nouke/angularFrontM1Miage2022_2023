import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { forkJoin, Observable, of, pipe } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { bdInitialAssignments } from './data';
//import { bdInitialSubjects } from './subject';
import { Subject } from '../assignments/subject.model';
import { bdInitialSubjects } from './subject';
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

  //assignments:Assignment[]= [];
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
  private HttpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }
  subjectList: Subject[];
  assignments = [
    {
      id: 1,
      nom: "tp1",
      dateDeRendu: new Date('2022-10-22'),
      rendu: true
    },
    {
      id: 2,
      nom: "tp2",
      dateDeRendu: new Date('2022-10-22'),
      rendu: true
    },
    {
      id: 3,
      nom: "tp3",
      dateDeRendu: new Date('2022-10-22'),
      rendu: false
    },
    {
      id: 4,
      nom: "tp4",
      dateDeRendu: new Date('2022-10-22'),
      rendu: true
    }
  ]


  constructor(private loggingService: LoggingService, 
    private http:HttpClient
    ) {
   // this.loggingService.setLoggingLevel(1);
  }
  url = "http://localhost:8010/api/assignments";
 //url = "https://api-angular-backend-miage.herokuapp.com/api/assignments";
  //url ="https://angular-back-end-m1-miage2022-2023.vercel.app/api/assignments";

  /*getAssignments(): Observable<Assignment[]> {
   
   return this.http.get<Assignment[]>(this.url);
   // return of(this.assignments);
  }*/

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.url)
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
   // this.loggingService.log(assignment, "ajouté");
    return this.http.post<Assignment>(this.url,assignment,this.HttpOptions);
    
  //  return of('Assignment ajouté');

  }

  getNewId(): number {
    return (this.assignments.length + 1);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    //Pour le moment, on a rien à faire ... ça marche tel quel
    //PLus tard envoyer la requete http PUT sur web service pour update d'une base de données
    //this.loggingService.log(assignment, "modifié");
    return this.http.put<Assignment>(this.url, assignment);
    //return of("Assignment modifié");
  }
  deleteAssignment(assignment: Assignment): Observable<any> {

  //  let pos = this.assignments.indexOf(assignment);
    //position et nbre d'objets à supprimer dans le tableau
    //this.loggingService.log(assignment, "supprimé");
    let deleteURI = this.url + '/' + assignment._id;
    return this.http.delete(deleteURI);
 //   this.assignments.splice(pos, 1);
   // return of("Assignment supprimé");
  }
  //version naive 
  peuplerBD(){
    bdInitialAssignments.forEach(a => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(Date.parse(a.dateDeRendu));
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.auteur = a.auteur;
      nouvelAssignment.note = a.note;
      nouvelAssignment.remarque = a.remarque;
      nouvelAssignment.matiere = a.matiere;
      nouvelAssignment.urlSubjectImage = a.urlSubjectImage;
      nouvelAssignment.urlTeacherImage = a.urlTeacherImage;
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
      nouvelAssignment.dateDeRendu = new Date(Date.parse(a.dateDeRendu));
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.auteur = a.auteur;
      nouvelAssignment.note = a.note;
      nouvelAssignment.remarque = a.remarque;
      nouvelAssignment.matiere = a.matiere;
      nouvelAssignment.urlSubjectImage = a.urlSubjectImage;
      nouvelAssignment.urlTeacherImage = a.urlTeacherImage;
      console.log(nouvelAssignment);
      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }

  getSubjects(): Observable<Subject[]> {
    //return of(this.assignments);
    this.subjectList = bdInitialSubjects
    return of(bdInitialSubjects)
  }

  getSubjectById(id: number): Observable<Subject | undefined> {
    return of(this.subjectList.find(a => a.id === id));
  }
  getSubjectByName(name: string): Observable<Subject | undefined> {

    return of(this.subjectList.find((a) => { a.subjectName == name }));
  }

  
}
