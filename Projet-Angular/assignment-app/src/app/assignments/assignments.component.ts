import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AssignmentsService } from '../shared/assignments.service';
import {Assignment  } from './assignment.model';

@Component({
  //selector: 'app-<assignments>',
  selector: 'app-assignments>',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})      
export class AssignmentsComponent implements OnInit {
  titre = "Mon application sur les Assignments !"

  //ajoutActive = false;
  //formVisible = false; //Pour afficher ou non le formulaire

  //assignmentSelectionne?: Assignment; // Pour envoie au composant de detail

  /*ngOnInit():void {
    setTimeout(() => {
      this.ajoutActive = true;
    },2000);
  }*/
  /* onSubmit(){
   // console.log(this.nomDevoir + "Date de rendu =");
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu= false;
    console.log(newAssignment);
   }*/
    /*
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
      dateDeRendu: new Date ('2022-10-18'),
      rendu: false

    }
  ]
*/
  assignments:Assignment[] = []; 
  assignmentsService: any;
  constructor(private assignmentService:AssignmentsService) { }

  // Appeler pour l'affichage
  ngOnInit(): void {

    //Appeler avant l'affichage
    console.log( "Avant AFFICHAGE");
    //On va demander au service de nous envoyer les données (les assignments)
    //typiquement: le service envoie une requete AJAX sur un web service du cloud
   // this.assignments=this.assignmentsService.getAssignments();

   //TODO
   console.log("On demande les assignments au service")
    this.assignmentService.getAssignments()
    .subscribe(assignments => {
      //quand on rentre ici on sait que les données sont pretes
      console.log("Données reçues")
     this.assignments=assignments;
    });
  //  this.getAssignments();
  }

  getAssignments(){
    this.assignmentService.getAssignments()
    .subscribe(assignments => this.assignments = assignments);
  }

  addAssignment(assignment: Assignment): Observable<string>{
    this.assignments.push(assignment);
    return of('Assignment ajouté');
  }

 /* assignmentClique(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
  }*/

  /*onAddAssignmentBtnClick() {
    this.formVisible = true;
    //Pour cacher la vue des détails
    this.assignmentSelectionne = undefined;
  }*/
  

 /* onDeleteAssignment(assignment:Assignment){
    this.assignmentService.deleteAssignment(assignment)
    .subscribe(message => {
      console.log(message);
      //Pour cacher la vue des détails
    //  this.assignmentSelectionne = undefined;
    })  
  }*/

/*  onNouvelAssignment(assignment: Assignment) {
    //this.assignments.push(event);
    this.assignmentsService.addAssignment(assignment)
      .subscribe((message: any) => {
        console.log(message);
        //On ne cache le formulaire et on ne reafficcche la liste que quand
        //les données sont réellement ajoutées. Si passe par une requete Ajax dans le cloud et une vraie BD, alors le seul endroit 
        //qui permet sûr que les données ont été réellemnt , c'est ici dans le 
        //subscribe
       // this.formVisible = false;
      })
  }*/

  updateAssignment(assignment:Assignment):Observable<string>{
    //Pour le moment, on a rien à faire ... ça marche tel quel
    //PLus tard envoyer la requete http PUT sur web service pour update d'une base de données

    return of("Assignment service: assignment modifié");
  }
}
