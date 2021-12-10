import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Usuario{
  nombre: string,
  correo: string,
  cedula: string,
  monto: string,
  status: string

}

@Component({
  selector: 'app-list-prestamos',
  templateUrl: './list-prestamos.component.html',
  styleUrls: ['./list-prestamos.component.css']
})
export class ListPrestamosComponent implements OnInit {
  banca: any;
  banquito: number;
  id2: string = 'uLmdwJ2ZOqjxqtgFSdXD' ;
  displayedColumns: string[] = ['id','nombre', 'correo', 'cedula', 'monto','status','acciones'];
  usuarios: Usuario[] = [];
  dataSource: Usuario[];
  items: Observable<any[]>;
  items2: Observable<any[]>;
  total: number ;
  constructor(firestore:AngularFirestore,private _usuarioService: UsuarioService) {
    this.items = firestore.collection('Banco').valueChanges();
   }

  ngOnInit() {
    this.getUsuarios()
    this.items.subscribe(data=>{
      this.banca = data[0];
    });

  }
  getUsuarios(){
      this._usuarioService.getUsuario().subscribe(data=>{
      this.dataSource = this.usuarios=[];
      data.forEach((element:any) => {
      this.usuarios.push({
      id: element.payload.doc.id,
      ...element.payload.doc.data()
     })
    });
  });
  }

  eliminarUsuario(id: string){
    this._usuarioService.eliminarUsuario(id).then(()=>{
    })
  }
  pagarDeuda(id: string,monto:string){
    var banquito = this.banca.disponible;
    this.total = parseFloat(banquito) + parseFloat(monto);
    const Banco: any={
    disponible: this.total
    }

    const Usuario: any={
    status: 'Pagado'
    }
      this._usuarioService.pagar(id).then(()=>{
      })
      this._usuarioService.estadoUpdate(id,Usuario).then(()=>{
      })
      this._usuarioService.actualizarBanca(this.id2,Banco).then(()=>{
      })
  }

}
