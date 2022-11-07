import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignments/assignment.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment | undefined;
  nomAssignment?: string;
  dateDeRendu?: Date;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute, // pour aller chercher l'id
    private router: Router  // naviguer vers la page d'accueil
  ) { }

  ngOnInit(): void {
    console.log("Query params");
    console.log(this.route.snapshot.queryParams);

    console.log("Query params");
    console.log(this.route.snapshot.fragment);
    this.getAssignment();
  }
  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => {
        //  if (!assignment) return;
        this.assignment = assignment;
        // Pour pré-remplir le formulaire #formupdate (submit)="onSaveAssignment(); formupdate.reset();
        this.nomAssignment = assignment?.nom;
        this.dateDeRendu = assignment?.dateDeRendu;
      });
  }
  onSaveAssignment() {
   // if (!this.assignment) return;

    // on récupère les valeurs dans le formulaire
    if (!this.assignment) return;

    if (this.nomAssignment) {
      this.assignment.nom = this.nomAssignment;
    }

    if (this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }
    //  this.assignment.nom = this.nomAssignment;
    //  this.assignment.dateDeRendu = this.dateDeRendu;


    this.assignmentsService.updateAssignment({ assignment: this.assignment })
      .subscribe(reponse => {
        console.log("Reponse du serveur : " + reponse.message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      })
  }

}









