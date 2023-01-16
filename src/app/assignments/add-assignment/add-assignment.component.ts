import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
//import { Subject } from 'rxjs';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';
import { Subject } from '../subject.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
 // @Output() nouvelAssignment = new EventEmitter<Assignment>();
  nomDevoir = "";
  dateRendu = new Date(Date.now());
  nomEleve ="";
  note:number;
  //ajoutActive: any;
  remarque = "";
  matiere = "";
  urlSubjectImage = "";
  urlTeacherImage = "";
  subjects: Subject[];
  selectedOptionId: number ;
  

  //nomDevoir: string = "";
 // dateRendu!: Date;

/*onSubmit() {
throw new Error('Method not implemented.');
}*/

  constructor(private assignmentsService:AssignmentsService,
    private router: Router, 
    private route: ActivatedRoute, 
    private authService: AuthService) { }

  ngOnInit(): void {

    this.getSubjects();

  }

  getSubjects() {
    this.assignmentsService.getSubjects()
      .subscribe((subjects) => {
        this.subjects = subjects;

      })
  }
  onSubmit() {

    if (this.nomDevoir === "" || this.nomEleve === "") {
      alert("les champs nom de TD et nom de l'eleve sont obligatoires ")
    }
    else {


    // console.log(this.nomDevoir + "Date de rendu =");
    let newAssignment = new Assignment();
    newAssignment.id = Math.round(Math.random() * 1000000); // id entier entre 0 et 1M
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu = false;
    newAssignment.auteur = this.nomEleve;
    newAssignment.note = this.note;
    newAssignment.remarque = this.remarque;
    newAssignment.matiere = this.matiere;
    newAssignment.urlSubjectImage = this.urlSubjectImage;
    newAssignment.urlTeacherImage = this.urlTeacherImage;
    //console.log(newAssignment);
 //   this.nouvelAssignment.emit(newAssignment);
    this.assignmentsService.addAssignment(newAssignment)
    .subscribe(reponse => 
      console.log(reponse.message))
      //on doit naviguer vers l'url qui affiche la liste ("" ou "/home")
      //on doit naviguer par programme
      // on retourne à la page d'accueil
      // on retourne à la page d'accueil


     // this.router.navigate(["/home"]);

      this.router.navigate(["/assignments"]); 
    }

  }
  isLoggedIn(): boolean {
    //console.log("i'm here"+this.authService.loggedIn);
    return this.authService.loggedIn;

}

  subjectSelected() {
    this.assignmentsService.getSubjectById(this.selectedOptionId).subscribe((subject) => {
      this.matiere = subject.subjectName;
      this.urlSubjectImage = subject.urlSubjectImage;
      this.urlTeacherImage = subject.urlTeacherImage;

    })

  }

  onOptionSelected(event: MatSelectChange) {

    this.selectedOptionId = event.value;
    this.subjectSelected();


   }
 
 }
