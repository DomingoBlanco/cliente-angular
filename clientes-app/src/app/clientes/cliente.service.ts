import { Injectable } from '@angular/core';
import {CLIENTES} from './clientes.json';
import {Cliente} from './cliente';
import {Observable, throwError} from 'rxjs';
import {of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import  swal from 'sweetalert2';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEnpoint:string = 'http://localhost:8080/api/clientes';
  private httpHeader = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient, private router : Router) { }

  getClientes(page: number): Observable<any> {
  return this.http.get(this.urlEnpoint + '/page/' + page).pipe(
     tap((response: any) => {
       console.log('ClienteService: tap 1');
       (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
     }),
     map((response: any) => {
       (response.content as Cliente[]).map(cliente => {
         cliente.nombre = cliente.nombre.toUpperCase();
         //let datePipe = new DatePipe('es');
         //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
         //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'es');
         return cliente;
       });
       return response;
     }),
     tap(response => {
       console.log('ClienteService: tap 2');
       (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
     })
   );
 }

//otra forma
//  getClientes(): Observable<Cliente[]>{
//    return this.http.get<Cliente[]>(this.urlEnpoint).pipe(
//      map((response) => response as Cliente[])
//    );
//  }
//se cambio a que retornara un cliente por cualquier tipo de objeto
//create(cliente:Cliente): Observable<Cliente>{
create(cliente:Cliente): Observable<any>{
  return this.http.post<any>(this.urlEnpoint,cliente,{headers:this.httpHeader}).pipe(
    catchError(e => {
      //this.router.navigate(['/clientes']);
      if(e.status == 400){
        return throwError(e);
      }

     console.error(e.error.mensaje);
     swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}

getCliente(id): Observable<Cliente>{
  return this.http.get<Cliente>(`${this.urlEnpoint}/${id}`).pipe(
    catchError(e => {
      this.router.navigate(['/clientes']);
     console.error(e.error.mensaje);
     swal.fire('Error al editar', e.error.mensaje, 'error');
      return throwError(e);
    })
  );
}

update(cliente:Cliente): Observable<any>{
  return this.http.put<any>(`${this.urlEnpoint}/${cliente.id}`,cliente,{headers:this.httpHeader}).pipe(
    catchError(e => {
    //  this.router.navigate(['/clientes']);
    // condicional para tomar los errores de la validacion de los campos en el backend
     if(e.status == 400){
       return throwError(e);
     }
     console.error(e.error.mensaje);
     swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}

delete(id: number): Observable<Cliente>{
  return this.http.delete<Cliente>(`${this.urlEnpoint}/${id}`,{headers:this.httpHeader}).pipe(
    catchError(e => {
    //  this.router.navigate(['/clientes']);
     console.error(e.error.mensaje);
     //swal.fire('Error al eliminar', e.error.mensaje, 'error');
     swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}


}
