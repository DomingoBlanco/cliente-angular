import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import  swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

 clientes: Cliente[];
 //variable donde se asigna el json que contiene los datos para paginar
 paginador : any;



  constructor(private clientesService : ClienteService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
// el activeroute nos ayuda a recibir el parametro de la url
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.clientesService.getClientes(page)
        .pipe(
          // el tap es para escribir por consola
          tap(response => {
            console.log('ClientesComponent: tap 3');
            (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
          })
        ).subscribe(response => {
          this.clientes = response.content as Cliente[];
          // se le asigna el json al paginador a traves de esta variable nos comunicamos con el componente PaginatorComponent
          //ahi se encuentra la logica del paginador, esta variable se inyecta en el cliente html
          this.paginador = response;
        });
    });
  }


  delete(cliente: Cliente): void {
      swal.fire({
        title: 'Está seguro?',
        text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.value) {

          this.clientesService.delete(cliente.id).subscribe(
            response => {
              this.clientes = this.clientes.filter(cli => cli !== cliente)
              swal.fire(
                'Cliente Eliminado!',
                `Cliente ${cliente.nombre} eliminado con éxito.`,
                'success'
              )
            }
          )

        }
      })
    }



}
