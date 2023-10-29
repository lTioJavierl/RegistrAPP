import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home_alumnos.page.html',
  styleUrls: ['./home_alumnos.page.scss'],
})
export class HomePage implements OnInit {


  ngOnInit() {
  }

}
