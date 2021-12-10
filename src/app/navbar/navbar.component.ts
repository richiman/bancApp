import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: Observable<any[]>;
  constructor(public auth: AngularFireAuth,firestore:AngularFirestore) {
  this.items=firestore.collection('Banco').valueChanges();
 }

  ngOnInit() {
  }

}
