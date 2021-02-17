import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Primera Practica de Angular';
  curso : string ="Curso para aprender Angular y Spring 5";
  profesor : string = 'UDEMY';
}
