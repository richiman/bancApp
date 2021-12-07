import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banca',
  templateUrl: './banca.component.html',
  styleUrls: ['./banca.component.css']
})
export class BancaComponent implements OnInit {

  dineroDispo: number = 1000000;


  constructor() { }

  ngOnInit() {
  }

}
