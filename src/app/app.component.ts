import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Assignment } from './assignments/assignment.model';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment-app';
  opened=false;

  constructor(private authService: AuthService, private router:Router, private assignmentService: AssignmentsService){}
  login(){
    if(!this.authService.loggedIn){
      this.authService.logIn();
    }

    else{
      this.authService.logOut();
      this.router.navigate(["/home"]);
    }
  
  }

  initialiserLaBaseAvecDonneesDeTest() {
    this.assignmentService.peuplerBDAvecForkJoin()
    .subscribe(() => {

      console.log("Données ajoutées");
      this.router.navigate(["/home"]);
    })
   
  }
}
