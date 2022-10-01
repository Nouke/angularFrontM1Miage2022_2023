import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
nomDevoir: any;
dateRendu: any;
ajoutActive: any;
onSubmit() {
throw new Error('Method not implemented.');
}

  constructor() { }

  ngOnInit(): void {
  }

}
