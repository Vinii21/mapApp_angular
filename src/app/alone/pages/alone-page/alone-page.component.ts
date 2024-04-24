import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  /* selector: 'app-alone-page', */ /* Lo remuevo porque lo quiero cargar de manera perezosa y en las rutas. */
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alone-page.component.html',
  styleUrls: ['./alone-page.component.css']
})
export class AlonePageComponent {

}
