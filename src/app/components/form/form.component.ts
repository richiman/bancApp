import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// import firebase from 'firebase/';
import { auth } from 'firebase/app';
import 'firebase/auth';
import firebase from '@firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() action:string;

  email = 'richi@example.com';
  pass = '123456';

  constructor(
    public auth: AngularFireAuth,
    private router: Router) { }


  ngOnInit() {
  }

  loginWith() {
    this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider);
  }
  logout() {
    this.auth.auth.signOut();
  }
  showData(){
    this.auth.user.subscribe( res => {
    });
  }

  register(){
    this.auth.auth.createUserWithEmailAndPassword(this.email,this.pass)
    .then((user) => {
      // Signed in
      // ...
      this.router.navigate(['profile']);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  customLogin(){
    this.auth.auth.signInWithEmailAndPassword(this.email,this.pass)
    .then( res => {
    })
    .catch(err => console.log('Error cl:',err));
  }

}
