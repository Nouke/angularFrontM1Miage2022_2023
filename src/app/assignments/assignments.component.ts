import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  //selector: 'app-<assignments>',
  selector: 'app-assignments>',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  titre = "Mon application sur les Assignments !"

  //Pour la pagination
  formVisible = false;
  assignementSelectionne?: Assignment;
  page: number = 1;
  limit: number = 4;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;
  searchText: string = '';
  focused: boolean = false;
  sortOpt: string[] = ['aucun', 'rendu', 'non rendu']

  //Pour le tableau 
  displayedColumns: string[] = ['demo-id', 'demo-nom', 'demo-prof', 'demo-matiere', 'demo-eleve', 'demo-note', 'demo-dateDeRendu', 'demo-rendu'];
  ajoutActive = false;
  assignments?: Assignment[];
  assignmentList?: Assignment[];
  dataSource = new MatTableDataSource(this.assignmentList);


  constructor(private assignmentService: AssignmentsService, private _liveAnnouncer: LiveAnnouncer) { }
  /*ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }*/

  // Appeler pour l'affichage
  ngOnInit(): void {

    //Appeler avant l'affichage
    console.log("Avant AFFICHAGE");
    //On va demander au service de nous envoyer les données (les assignments)
    //typiquement: le service envoie une requete AJAX sur un web service du cloud
    //this.assignments=this.assignmentsService.getAssignments();

    //TODO
    this.getAssignments();

  };
  //  this.getAssignments();
  assignmentClique(assignment: Assignment) {
    this.assignementSelectionne = assignment;

  }
  onAddAssignmentBtnClick() {
    this.formVisible = !this.formVisible;

  }

  onDeletedAssignment(event: Assignment) {

  }
  getAssignments() {

    console.log("On demande les assignments au service")
    this.assignmentService.getAssignmentsPagine(this.page, this.limit)
      .subscribe(data => {
        //quand on rentre ici on sait que les données sont pretes
        console.log("Données reçues")
        this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        this.assignmentList = this.assignments;
        this.dataSource = new MatTableDataSource(this.assignmentList);
        this.dataSource.sort = this.sort;

      });
  }

  pageSuivante() {
    if (this.hasNextPage) {
      this.page = this.nextPage;
      this.getAssignments();
    }

  }
  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();

  }

  pagePrecedente() {
    if (this.hasPrevPage) {
      this.page = this.prevPage;
      this.getAssignments();
    }
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  search() {
    this.assignmentList = [];
    //auteur
    //matiere
    //nom
    //remarque

    this.assignmentService.getAssignments()
      .subscribe(data => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].auteur && data[i].matiere && data[i].nom && data[i].remarque){

            
            var auteur = data[i].auteur.toLowerCase();
            var matiere = data[i].matiere.toLowerCase();
            var nom = data[i].nom.toLowerCase();
            var remarque = data[i].remarque.toLowerCase();
            if (auteur.includes(this.searchText.toLowerCase()) ||
              matiere.includes(this.searchText.toLowerCase()) ||
              nom.includes(this.searchText.toLowerCase()) ||
              remarque.includes(this.searchText.toLowerCase())) {
                this.assignmentList.push(data[i])
            }
          }
        }
        this.dataSource = new MatTableDataSource(this.assignmentList);

      });


  }
  onFocus() {
    this.focused = true;
  }
  onFocusOut() {
    this.dataSource = new MatTableDataSource(this.assignments);
    this.searchText = '';
    this.focused = false;
  }



  trier(event: any) {
    this.assignmentList = [];
    if (event.value != 'aucun') {
      for (var i = 0; i < this.assignments.length; i++) {
        if (this.assignments[i].rendu && event.value == 'rendu') {
          this.assignmentList.push(this.assignments[i])
        }
        if (!this.assignments[i].rendu && event.value == 'non rendu')
          this.assignmentList.push(this.assignments[i])
      }
    } else {
      this.assignmentList = this.assignments
    }
    this.dataSource = new MatTableDataSource(this.assignmentList);
  }

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


  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {

    //  this.dataSource.sort = this.sort;

  }
  /*updateAssignment(assignment: Assignment): Observable<string> {
  //Pour le moment, on a rien à faire ... ça marche tel quel
  //PLus tard envoyer la requete http PUT sur web service pour update d'une base de données

  return of("Assignment service: assignment modifié");
}*/
}
