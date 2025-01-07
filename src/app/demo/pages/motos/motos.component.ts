import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-motos',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './motos.component.html',
  styleUrl: './motos.component.scss'
})
export default class MotosComponent {

}
