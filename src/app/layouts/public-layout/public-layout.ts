import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestaurantHeader} from '../../restaurant-header/restaurant-header';
import { FooterComponent } from '../../footer/footer';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, RestaurantHeader,FooterComponent],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css'
})
export class PublicLayoutComponent {}