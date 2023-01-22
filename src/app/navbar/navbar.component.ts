import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';

export interface Devoir {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  router: any;
  searchText:any;

  foods: Devoir[] = [
    { value: '0', viewValue: 'Devoir Rendu' },
    { value: '1', viewValue: 'Devoir non rendu' },
   
  ];

  constructor(private authService: AuthService, private assignmentService: AssignmentsService) { }

  ngOnInit(): void {
   // this.initialiserLaBase();

  }


  opened = false;

  isLoggedIn(): boolean {
    // console.log("i'm here"+this.authService.admin);
    return this.authService.loggedIn;
  }

  disconnection() {
    this.authService.logOut();

    // this.router.navigate(['/assignments'])

  }

  initialiserLaBase() {
    this.assignmentService.peuplerBDAvecForkJoin()
      .subscribe(() => {
        this.router.navigate(["/assignments"])
      });
    console.log("BD inisialisé");
  }

  

}
