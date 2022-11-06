import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
 // @Output() nouvelAssignment = new EventEmitter<Assignment>();
  nomDevoir!: string;
  dateRendu!: Date;
ajoutActive: any;

  //nomDevoir: string = "";
 // dateRendu!: Date;

/*onSubmit() {
throw new Error('Method not implemented.');
}*/

  constructor(private assignmentsService:AssignmentsService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    // console.log(this.nomDevoir + "Date de rendu =");
    let newAssignment = new Assignment();
    newAssignment.id = Math.round(Math.random() * 1000000); // id entier entre 0 et 1M
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu = false;
    //console.log(newAssignment);
 //   this.nouvelAssignment.emit(newAssignment);
    this.assignmentsService.addAssignment(newAssignment)
    .subscribe(message => {
      console.log(message);
      //on doit naviguer vers l'url qui affiche la liste ("" ou "/home")
      //on doit naviguer par programme
    })
  } 

}
