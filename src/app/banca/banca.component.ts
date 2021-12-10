import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-banca',
  templateUrl: './banca.component.html',
  styleUrls: ['./banca.component.css']
})
export class BancaComponent implements OnInit {


  items: Observable<any[]>;

  constructor(firestore:AngularFirestore) {
    this.items=firestore.collection('Banco').valueChanges();
   }

  ngOnInit() {
  }

}
