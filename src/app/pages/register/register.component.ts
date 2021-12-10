import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/service/usuario.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  createUsuario: FormGroup;
  submitted=false;

  constructor(private fb: FormBuilder,private _usuariosService:UsuarioService,private router: Router,private _snackBar: MatSnackBar ) {
    this.createUsuario=this.fb.group({
    nombre:['',Validators.required],
    correo:['',Validators.required],
    cedula:['',Validators.required],
    monto:['',Validators.required],
    status:['',Validators.required],
    })
  }
  ngOnInit() {
  }
  agregarUsuario(){
    if(this.createUsuario.value.nombre == '' ||  this.createUsuario.value.correo  == '' || this.createUsuario.value.cedula == ''  ){
        this.openSnackBar('Faltan campos que llenar', 'Cerrar');
    }else
    {
      const  montoDefault: String = "0";
      const  statusDefault: String = "Pendiente";
      const Usuario: any={
      nombre:this.createUsuario.value.nombre,
      correo:this.createUsuario.value.correo,
      cedula:this.createUsuario.value.cedula,
      monto:montoDefault,
      status:statusDefault
      }
    this._usuariosService.agregarUsuario(Usuario).then(()=>{
    this.router.navigate(['/ListPrestamos']);
    })
      this.openSnackBar('Usuario agregado', 'Cerrar');
  }
}

openSnackBar(message: string, action: string) {
   this._snackBar.open(message, action);
 }
}
