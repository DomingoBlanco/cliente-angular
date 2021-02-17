import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {
  listCurso: string[] = ['TypeScript', 'Java', 'PHP','C#', 'Phyton'];
  habilitar: boolean = true;
  constructor() { }
  setHabilitar(): void{
    this.habilitar = (this.habilitar==true)?false:true;
  }

}
