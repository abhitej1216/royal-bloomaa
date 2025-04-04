import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="carousel-container">
      <div class="carousel-content">
        <!-- Hero Section -->
        <div class="hero-section" *ngIf="currentSlideIndex === 0">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6">
                <h1 class="hero-title" [@fadeInOut]>Unveil Luxury,<br>Embrace Every Scent</h1>
                <p class="hero-subtitle" [@fadeInOut]>Discover our exclusive collection of premium fragrances</p>
                <button class="btn btn-primary shop-now" [@fadeInOut] routerLink="/shop">Shop Now</button>
              </div>
              <div class="col-lg-6">
                <div class="product-showcase" [@fadeInOut]>
                  <img [src]="slides[currentSlideIndex].image" [alt]="slides[currentSlideIndex].title">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Slides -->
        <div class="product-slide" *ngIf="currentSlideIndex > 0">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6">
                <h2 class="slide-title" [@fadeInOut]>{{slides[currentSlideIndex].title}}</h2>
                <p class="slide-description" [@fadeInOut]>{{slides[currentSlideIndex].description}}</p>
                <button class="btn btn-primary" [@fadeInOut] routerLink="/shop">Shop Now</button>
              </div>
              <div class="col-lg-6">
                <div class="product-image" [@fadeInOut]>
                  <img [src]="slides[currentSlideIndex].image" [alt]="slides[currentSlideIndex].title">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Dots -->
        <div class="carousel-dots">
          <button 
            *ngFor="let slide of slides; let i = index" 
            class="dot"
            [class.active]="i === currentSlideIndex"
            (click)="goToSlide(i)"
          ></button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .carousel-container {
      height: 100vh;
      background: linear-gradient(45deg, #f8f9fa, #ffffff);
      overflow: hidden;
    }

    .carousel-content {
      height: 100%;
      position: relative;
    }

    .hero-section, .product-slide {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 120px 0;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      color: #666;
    }

    .product-showcase, .product-image {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

      img {
        max-width: 80%;
        max-height: 400px;
        height: auto;
        object-fit: contain;
        filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.05);
        }
      }
    }

    .slide-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .slide-description {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 2rem;
    }

    .carousel-dots {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 1rem;

      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: rgba(0,0,0,0.2);
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;

        &.active {
          background-color: #007bff;
          transform: scale(1.2);
        }

        &:hover {
          background-color: #007bff;
        }
      }
    }

    @media (max-width: 991px) {
      .hero-title {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.1rem;
      }

      .slide-title {
        font-size: 2rem;
      }
    }
  `],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('600ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit, OnDestroy {
  slides = [
    {
      image: 'assets/images/hero.png',
      title: 'Unveil Luxury, Embrace Every Scent',
      description: 'Discover our exclusive collection of premium fragrances'
    },
    {
      image: 'assets/images/products/jasmine.jpg',
      title: 'Jasmine Wave',
      description: 'Experience the enchanting aroma of pure jasmine essence'
    },
    {
      image: 'assets/images/products/sandal.jpg',
      title: 'Sandal Oud Delight',
      description: 'A perfect blend of sandalwood and exotic oud'
    },
    {
      image: 'assets/images/products/aqua.jpg',
      title: 'Aqua Line',
      description: 'Fresh and invigorating scents for everyday luxury'
    }
  ];

  currentSlideIndex = 0;
  private autoSlideInterval: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlideIndex = index;
    this.stopAutoSlide();
    this.startAutoSlide();
  }
} 