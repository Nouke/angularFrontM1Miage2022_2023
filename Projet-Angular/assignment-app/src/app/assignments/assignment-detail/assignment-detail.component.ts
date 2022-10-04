import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  @Input() assignmentTransmis: Assignment = new Assignment;
  //assignmentTransmis: Assignment = new Assignment;

  @Output() deleteAssignment = new EventEmitter<Assignment>();

  constructor() { }

  ngOnInit(): void {
  }

  onAssignmentRendu(){
    this.assignmentTransmis.rendu=true;
  }

  onDelete(){
    this.deleteAssignment.emit(this.assignmentTransmis);
    this.assignmentTransmis = new Assignment;
  }

}
