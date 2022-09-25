import { Component, OnInit } from '@angular/core';

@Component({
  //selector: 'app-<assignments>',
  selector: 'app-assignments>',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre = "Mon application sur les Assignments !"

  assignments = [
    {
      nom: " TP1 Analyse de données à rendre",
      dateDeRendu: '2022-10-10',
      rendu: true

    },

    {
      nom: "TP2 Angular à rendre",
      dateDeRendu: '2022-10-15',
      rendu: true

    },

    {
      nom: "TP3 Mini Projet Angular à rendre",
      dateDeRendu: '2022-10-18',
      rendu: true

    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
