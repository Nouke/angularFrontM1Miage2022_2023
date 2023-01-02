import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assignment } from './assignments/assignment.model';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';
import { ColDef } from "ag-grid-community";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'assignment-app';
  opened=false;


  columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'nom' },
    { field: 'dateDeRendu' },
    { field: 'rendu'}
  ];

 rowData = [];
 /*   { Id: 'Toyota', Devoir: 'Celica', Date: 35000, Rendu:'Oui' },
    { Id: 'Ford', Devoir: 'Mondeo', Date: 32000,  Rendu: 'Oui' },
    { Id: 'Porsche', Devoir: 'Boxster', Date: 72000, Rendu: 'Oui'}
  ];*/

  constructor(private authService: AuthService, 
    private router:Router, private assignmentService: AssignmentsService){}
  ngOnInit(): void {
    this.assignmentService.getAssignments().subscribe((data) => {
      console.log(data.docs);
      this.rowData = data.docs
    })
  }
  
  login(){
    if(!this.authService.loggedIn){
      this.authService.logIn();
    }

    else{
      this.authService.logOut();
      this.router.navigate(["/home"]);
    }
  
  }

 /* initialiserLaBaseAvecDonneesDeTest() {
    this.assignmentService.peuplerBDAvecForkJoin()
    .subscribe(() => {

      console.log("Données ajoutées");
      this.router.navigate(["/home"]);
    })
   
  }*/
}
