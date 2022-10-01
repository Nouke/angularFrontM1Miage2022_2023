import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  @Output() nouvelAssignment = new EventEmitter<Assignment>();
  nomDevoir!: string;
  dateRendu!: Date;
ajoutActive: any;

  //nomDevoir: string = "";
 // dateRendu!: Date;

/*onSubmit() {
throw new Error('Method not implemented.');
}*/

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit() {
    // console.log(this.nomDevoir + "Date de rendu =");
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu = false;
    //console.log(newAssignment);
    this.nouvelAssignment.emit(newAssignment);
  } 

}
