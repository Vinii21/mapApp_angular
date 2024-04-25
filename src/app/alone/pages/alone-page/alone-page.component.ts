import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';

@Component({
  /* selector: 'app-alone-page', */ /* Lo remuevo porque lo quiero cargar de manera perezosa y en las rutas. */
  standalone: true,
  imports: [CommonModule, CounterAloneComponent],
  templateUrl: './alone-page.component.html',
  styleUrls: ['./alone-page.component.css']
})
export class AlonePageComponent {

}
