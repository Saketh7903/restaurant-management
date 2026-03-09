import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-restaurant-header',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './restaurant-header.html',
  styleUrl: './restaurant-header.css',
})
export class RestaurantHeader {

}
