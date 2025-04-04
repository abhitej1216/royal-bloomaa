import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredProducts = [
    {
      id: 1,
      name: 'Royal Oud',
      price: 999,
      image: 'assets/images/product/1.jpg',
      category: 'Perfume'
    },
    {
      id: 2,
      name: 'Mystic Rose',
      price: 799,
      image: 'assets/images/product/2.jpg',
      category: 'Attar'
    },
    {
      id: 3,
      name: 'Ocean Breeze',
      price: 599,
      image: 'assets/images/product/3.jpg',
      category: 'Body Mist'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
} 