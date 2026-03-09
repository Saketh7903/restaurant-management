import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuService, MenuItem } from '../services/menu.service';

declare var $: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, AfterViewInit {

  menuItems: MenuItem[] = [];

  constructor(
    private menuService: MenuService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.menuService.getMenuItems().subscribe({
      next: (items) => {
        this.menuItems = [...items].slice(0, 6); // show only first 6
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error loading menu:', err)
    });
  }

  ngAfterViewInit(): void {
    if (typeof $ !== 'undefined') {

      $('#customCarousel1').carousel({ interval: 3000 });

      if ($('.client_owl-carousel').length) {
        $('.client_owl-carousel').owlCarousel({
          loop: true,
          margin: 0,
          dots: false,
          nav: true,
          autoplay: true,
          autoplayHoverPause: true,
          navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
          ],
          responsive: {
            0: { items: 1 },
            768: { items: 2 },
            1000: { items: 2 }
          }
        });
      }
    }
  }
}