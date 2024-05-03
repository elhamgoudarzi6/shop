import { Component } from '@angular/core';
import { PrimengListModule } from '../../../primeng-list.module';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [PrimengListModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {

}


