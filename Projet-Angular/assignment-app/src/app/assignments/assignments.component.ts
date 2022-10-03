import { Component, OnInit } from '@angular/core';
import { every } from 'rxjs';
import {Assignment  } from './assignment.model';

@Component({
  //selector: 'app-<assignments>',
  selector: 'app-assignments>',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})      
export class AssignmentsComponent implements OnInit {
  titre = "Mon application sur les Assignments !"

  ajoutActive = false;
  formVisible = false;
  assignmentSelectionne: Assignment = new Assignment;

  ngOnInit():void {
  /*  setTimeout(() => {
      this.ajoutActive = true;
    },2000);*/
  }
  /* onSubmit(){
   // console.log(this.nomDevoir + "Date de rendu =");
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu= false;
    console.log(newAssignment);
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
      dateDeRendu: new Date ('2022-10-18'),
      rendu: false

    }
  ]

  constructor() { }

 /* ngOnInit(): void {
  }*/
  assignmentClique(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
  }

  onAddAssignmentBtnClick() {
    this.formVisible = true;
  }

  onNouvelAssignment(event:Assignment){
    this.assignments.push(event);
    this.formVisible = false;
  }

  onDeleteAssignment(event:Assignment){
    const pos = this.assignments.indexOf(event);

     //position et nbre d'objets à supprimer dans le tableau
    this.assignments.splice(pos,1);
  }
}
