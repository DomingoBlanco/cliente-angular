import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges {
  //variable de tipo input que recibe la inyecion de los datos desde clientete component html
  @Input() paginador: any;
  //variable que me va a llevar el control de las paginas obtenidas de la variable paginator
  paginas: number[];

  desde: number;
  hasta: number;
  constructor() { }

// se ejecuta al iniciar
  ngOnInit() {
   this.initPaginator();
 }

 // se ejecuta cada vez que hay ca,bios
 ngOnChanges(changes: SimpleChanges) {
   let paginadorActualizado = changes['paginador'];
 // si se cambia llama para paginar
   if (paginadorActualizado.previousValue) {
     this.initPaginator();
   }

 }

 private initPaginator(): void {
   this.desde = Math.min(Math.max(1, this.paginador.number - 4), this.paginador.totalPages - 5);
   this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 4), 6);

   if (this.paginador.totalPages > 5) {
     this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);
   } else {
     this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => indice + 1);
   }
 }

}
