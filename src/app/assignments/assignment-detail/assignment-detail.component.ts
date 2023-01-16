import { query } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

 //* @Input() assignmentTransmis?: Assignment = new Assignment;
  
    assignementTransmis: Assignment | undefined;

  //assignmentTransmis: Assignment = new Assignment;

  @Output() deleteAssignment = new EventEmitter<Assignment>();

  constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getAssignment();
    // le + force la conversion
    // ** const id: number = +this.route.snapshot.params['id'];
    //** console.log("Composant detail, id = " + id);

    // A partir de l'id on demande au service, l'assignment qui correspond

 /**  this.assignmentsService.getAssignment(id)
      .subscribe(assignment => {
        this.assignmentTransmis = assignment;
      })**/
  }
  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => this.assignementTransmis = assignment)
  }


  onAssignmentRendu() {
    if (this.assignementTransmis != undefined) {
        //* this.assignmentTransmis.rendu = true;
      if (this.assignementTransmis.note === undefined) {
        alert("vous ne pouvez pas marquer rendu un Assignment qui n'a pas été noté. ")
      }
      else {
        this.assignementTransmis.rendu = true;

      this.assignmentsService.updateAssignment(this.assignementTransmis)
        .subscribe(reponse => {
          console.log("Réponse du serveur" + reponse.message);
        //  this.assignmentTransmis = undefined;

          // on retourne à la page d'accueil
         // this.router.navigate(["/home"]);
          this.router.navigate(["/assignments"]);
        });
    }

  }
}

  onDeleteAssignment() {
    // this.deleteAssignment.emit(this.assignmentTransmis);
    //this.assignmentTransmis = new Assignment;
    if (this.assignementTransmis != undefined)
      this.assignmentsService.deleteAssignment(this.assignementTransmis)
        .subscribe(reponse => {
          console.log("Reponse du serveur: " + reponse.message);

          this.assignementTransmis = undefined;
          // on retourne à la page d'accueil
         //*** */ this.router.navigate(["/home"]);
          this.router.navigate(["/assignments"]); 
        });

  }

  /* onDelete() {
     this.assignmentsService.deleteAssignment(this.assignmentTransmis);
     .subscribe(message  => {
       console.log(message);
       this.assignmentTransmis = null;
     })
   }*/
  onClickEdit() {
    this.router.navigate(['/assignment', this.assignementTransmis.id, 'edit'],
      {
        queryParams: {
          nom: this.assignementTransmis.nom,
          //debug: true,
          //age: 56
        },
        fragment: "edition"
      }
    );
  }
  isAdmin(): boolean {
    return this.authService.loggedIn && this.authService.admin;
  }
    isUser():boolean {
      return this.authService.loggedIn;
    }
    isEvaluated():boolean {
      return this.assignementTransmis.note !== undefined
    }

}