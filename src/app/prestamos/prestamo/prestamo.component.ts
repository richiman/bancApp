import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})
export class PrestamoComponent implements OnInit {

  items: Observable<any[]>;
  id: string | null;
  createPrestamo: FormGroup;
  guardarPrestamo: any;
  submitted=false;
  banca: any;
  total: number = 0;
  id2: string = 'uLmdwJ2ZOqjxqtgFSdXD' ;

  constructor(firestore:AngularFirestore ,private fb: FormBuilder,private _usuariosService:UsuarioService,private router: Router, private aRoute : ActivatedRoute,private _snackBar: MatSnackBar ) {
    this.items=firestore.collection('Banco').valueChanges();

    this.createPrestamo=this.fb.group({
      nombre:['',Validators.required],
      correo:['',Validators.required],
      cedula:['',Validators.required],
      monto:['',Validators.required],
      })
  this.id=this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.montoSolicitado();
    this.items.subscribe(data=>{
      this.banca = data[0];
    });

  }

  actualizarmontoSolicitado(){

    var things = ['Aprobado', 'Declinado'];
    var thing = things[Math.floor(Math.random()*things.length)];

      const Usuario: any={
      nombre:this.createPrestamo.value.nombre,
      correo:this.createPrestamo.value.correo,
      cedula:this.createPrestamo.value.cedula,
      monto: this.createPrestamo.value.monto,
      status:thing
      }


      this.total = this.banca.disponible - this.createPrestamo.value.monto;
      const Banco: any={
      disponible: this.total
      }
      if( this.createPrestamo.value.monto < 10000  || this.createPrestamo.value.monto > 100000){
          this.openSnackBar('El monto debe ser mayor a 10,000.00 y menor a 100,000.00', 'Aceptar');
      }else{
        if(thing != 'Aprobado'){
            this.openSnackBar('Declinado', 'Cerrar');
            this.router.navigate(['/ListPrestamos']);
            this._usuariosService.prestamo(this.id,Usuario).then(()=>{
            })
        }else{
          this.openSnackBar('Solicitud aprobada', 'Cerrar');
          this._usuariosService.prestamo(this.id,Usuario).then(()=>{
          })
          this._usuariosService.actualizarBanca(this.id2,Banco).then(()=>{
            this.router.navigate(['/ListPrestamos']);
          })
        }
      }
  }

  montoSolicitado(){
  this._usuariosService.getUsuarioSolicitar(this.id).subscribe(data=>{
    this.createPrestamo.setValue({
      nombre: data.payload.data()['nombre'],
      correo: data.payload.data()['correo'],
      cedula: data.payload.data()['cedula'],
      monto: data.payload.data()['monto']
      })
    })
}

openSnackBar(message: string, action: string) {
   this._snackBar.open(message, action);
 }
}
