import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from '../../components/carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselComponent],
  templateUrl: './home.component.html',
  styles: [`
    .home-container {
      padding-top: 20px;
    }

    .breadcrumb-nav {
      padding: 15px 0;
      margin-bottom: 20px;
    }

    .breadcrumb {
      margin: 0;
      padding: 0;
      background: none;
    }

    .breadcrumb-item a {
      color: #007bff;
      text-decoration: none;
    }

    .section-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .section-header h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .section-header p {
      color: #666;
      font-size: 1.1rem;
    }

    .product-card {
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      margin-bottom: 30px;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }

    .product-image {
      position: relative;
      overflow: hidden;
      padding-top: 100%;
    }

    .product-image img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .product-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .product-card:hover .product-overlay {
      opacity: 1;
    }

    .product-overlay button {
      margin: 5px 0;
      padding: 8px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .quick-view {
      background: rgba(255,255,255,0.9);
      color: #333;
    }

    .add-to-cart {
      background: #007bff;
      color: white;
    }

    .product-info {
      padding: 15px;
    }

    .product-info h3 {
      font-size: 1.1rem;
      margin-bottom: 5px;
    }

    .category {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 5px;
    }

    .price {
      font-weight: 600;
      color: #007bff;
      margin: 0;
    }

    .trending, .best-sellers {
      padding: 60px 0;
      background: #f8f9fa;
    }

    @media (max-width: 991px) {
      .section-header h2 {
        font-size: 2rem;
      }
    }
  `]
})
export class HomeComponent {
  newArrivals = [
    {
      name: 'Office Hour',
      category: 'Men\'s Fragrance',
      price: 89.99,
      image: 'assets/images/products/office-hour.jpg'
    },
    {
      name: 'Pine Elixir',
      category: 'Unisex',
      price: 79.99,
      image: 'assets/images/products/pine-elixir.jpg'
    },
    {
      name: 'Violet Essence',
      category: 'Women\'s Fragrance',
      price: 94.99,
      image: 'assets/images/products/violet-essence.jpg'
    },
    {
      name: 'Marine Fresh',
      category: 'Men\'s Fragrance',
      price: 84.99,
      image: 'assets/images/products/marine-fresh.jpg'
    }
  ];

  trendingProducts = [
    {
      name: 'Woody Aqua',
      category: 'Men\'s Fragrance',
      price: 92.99,
      image: 'assets/images/products/woody-aqua.jpg'
    },
    {
      name: 'Jasmine Wave',
      category: 'Women\'s Fragrance',
      price: 87.99,
      image: 'assets/images/products/jasmine.jpg'
    },
    {
      name: 'Sandal Oud Delight',
      category: 'Unisex',
      price: 99.99,
      image: 'assets/images/products/sandal.jpg'
    },
    {
      name: 'Aqua Line',
      category: 'Unisex',
      price: 76.99,
      image: 'assets/images/products/aqua.jpg'
    }
  ];

  bestSellers = [
    {
      name: 'Violet Essence',
      category: 'Women\'s Fragrance',
      price: 94.99,
      image: 'assets/images/products/violet-essence.jpg'
    },
    {
      name: 'Woody Aqua',
      category: 'Men\'s Fragrance',
      price: 92.99,
      image: 'assets/images/products/woody-aqua.jpg'
    },
    {
      name: 'Office Hour',
      category: 'Men\'s Fragrance',
      price: 89.99,
      image: 'assets/images/products/office-hour.jpg'
    },
    {
      name: 'Pine Elixir',
      category: 'Unisex',
      price: 79.99,
      image: 'assets/images/products/pine-elixir.jpg'
    }
  ];
} 