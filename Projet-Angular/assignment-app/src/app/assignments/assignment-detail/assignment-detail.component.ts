import { query } from '@angular/animations';
import { Component, Input, OnInit, } from '@angular/core';
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

  @Input() assignmentTransmis?: Assignment = new Assignment;
  //assignmentTransmis: Assignment = new Assignment;

  //@Output() deleteAssignment = new EventEmitter<Assignment>();

  constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    // le + force la conversion
    const id: number = +this.route.snapshot.params['id'];
    console.log("Composant detail, id = " + id);

    // A partir de l'id on demande au service, l'assignment qui correspond

    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => {
        this.assignmentTransmis = assignment;
      })
  }

  onAssignmentRendu() {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;

      this.assignmentsService.updateAssignment({ assignment: this.assignmentTransmis })
        .subscribe(reponse => {
          console.log("Réponse du serveur" + reponse.message);
        //  this.assignmentTransmis = undefined;

          // on retourne à la page d'accueil
          this.router.navigate(["/home"]);
        });
    }

  }

  onDeleteAssignment() {
    // this.deleteAssignment.emit(this.assignmentTransmis);
    //this.assignmentTransmis = new Assignment;
    if (this.assignmentTransmis)
      this.assignmentsService.deleteAssignment(this.assignmentTransmis)
        .subscribe(reponse => {
          console.log("Reponse du serveur: " + reponse.message);

          this.assignmentTransmis = undefined;
          // on retourne à la page d'accueil
          this.router.navigate(["/home"]);
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
    this.router.navigate(['/assignment', this.assignmentTransmis?.id, 'edit'],
      {
        queryParams: {
          nom: this.assignmentTransmis?.nom,
          debug: true,
          age: 56
        },
        fragment: "edition"
      }
    );
  }
  isAdmin(): boolean {
    return this.authService.loggedIn;
  }


}