import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule  } from "@angular/material/core";
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Routes, RouterModule  } from '@angular/router';
import { EditAssignmentComponent } from './edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './login/login.component';
//import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AgGridModule } from 'ag-grid-angular-legacy';


const routes: Routes = [
  {
    path:"",
    component:AssignmentsComponent
  },
  {
    path:"home",
    component:AssignmentsComponent
  },

  {
    path:"add",
    component:AddAssignmentComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
  path: "sign-up",
    component: SignUpComponent
  },

  {
    path:"list",
    component:AssignmentsComponent
  },
  {
    path: "assignment/:id",
    component: AssignmentDetailComponent
  },

  {
    path: "assignment/:id/edit",
    component: EditAssignmentComponent,
    canActivate:[AuthGuard]
  }
]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginComponent,
    SignUpComponent,
  
    //ComponentDetailComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,MatIconModule, MatDividerModule, 
    FormsModule, 
    MatInputModule, MatFormFieldModule,MatNativeDateModule,
    MatDatepickerModule,MatListModule,MatCheckboxModule,
    MatCardModule, MatToolbarModule, MatSidenavModule,
    RouterModule.forRoot(routes), MatSlideToggleModule, HttpClientModule, ReactiveFormsModule,AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
