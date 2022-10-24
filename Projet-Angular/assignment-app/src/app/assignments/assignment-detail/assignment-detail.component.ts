import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  @Input() assignmentTransmis?: Assignment = new Assignment;
  //assignmentTransmis: Assignment = new Assignment;

  @Output() deleteAssignment = new EventEmitter<Assignment>();

  constructor( private assignmentsService: AssignmentsService) { }

  ngOnInit(): void {
  }

  onAssignmentRendu(){
    if(this.assignmentTransmis){
      this.assignmentTransmis.rendu = true;

      this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
      })
    }
    
  }

 onDelete(){
    this.deleteAssignment.emit(this.assignmentTransmis);
    this.assignmentTransmis = new Assignment;
    
  }

 /* onDelete() {
    this.assignmentsService.deleteAssignment(this.assignmentTransmis);
    .subscribe(message  => {
      console.log(message);
      this.assignmentTransmis = null;
    })
  }*/
}

