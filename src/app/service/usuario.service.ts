import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private firestore:AngularFirestore) {
   }
  agregarUsuario(usuario: any):Promise<any> {
  return this.firestore.collection('Usuarios').add(usuario);
  }
  getUsuario():Observable<any>{
  return this.firestore.collection('Usuarios').snapshotChanges();
  }
  eliminarUsuario(id: string): Promise<any>{
    return this.firestore.collection('Usuarios').doc(id).delete();
  }
  getUsuarioSolicitar(id: string): Observable<any>{
    return this.firestore.collection('Usuarios').doc(id).snapshotChanges();
  }
  prestamo(id: string,data:any): Promise<any>{
    return this.firestore.collection('Usuarios').doc(id).update(data);
  }
  actualizarBanca(id: string,data:any): Promise<any>{
    return this.firestore.collection('Banco').doc(id).update(data);
  }
  pagar(id: string): Promise<any>{
    return this.firestore.collection('Usuarios').doc(id).delete();
  }
  estadoUpdate(id: string,data:any): Promise<any>{
    return this.firestore.collection('Usuarios').doc(id).update(data);
  }
}
