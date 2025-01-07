import { Component } from '@angular/core';



import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-zonas',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.scss']
})
export default class ZonasComponent {

}
