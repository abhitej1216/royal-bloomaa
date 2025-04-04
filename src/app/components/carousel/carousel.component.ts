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
        <!-- All Product Slides (including first slide) -->
        <div class="product-slide">
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
      height: 70vh;
      max-height: 800px;
      background: linear-gradient(45deg, #f8f9fa, #ffffff);
      overflow: hidden;
      position: relative;
      margin: 0 auto;
      border-radius: 0 0 20px 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .carousel-content {
      height: 100%;
      position: relative;
    }

    .product-slide {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0;
      background-color: #fff;
    }

    .slide-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #2c3e50;
    }

    .slide-description {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 2rem;
    }

    .product-image {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 2rem;

      img {
        max-width: 100%;
        height: auto;
        max-height: 400px;
        object-fit: contain;
        filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));
        transition: transform 0.3s ease;
        border-radius: 15px;

        &:hover {
          transform: scale(1.05);
        }
      }
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

    .btn-primary {
      background-color: #007bff;
      border-color: #007bff;
      padding: 10px 25px;
      border-radius: 50px;
      font-weight: 500;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: #0069d9;
        border-color: #0062cc;
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);
      }
    }

    @media (max-width: 991px) {
      .slide-title {
        font-size: 2rem;
      }
      
      .slide-description {
        font-size: 1rem;
      }
      
      .product-image {
        padding: 1rem;
        
        img {
          max-height: 300px;
        }
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
      image: 'assets/images/hero.jpg',
      title: 'Discover the Essence of Luxury',
      description: 'Experience our premium collection of handcrafted attars, where tradition meets modern elegance'
    },
    {
      image: 'assets/images/products/aqua.jpg',
      title: 'Perfumes ',
      description: 'Premium fragrances, reimagined — no hype, no markup.'
    },
    {
      image: 'assets/images/products/jasmine.jpg',
      title: 'Attars',
      description: 'Each drop tells a tale — artisan attars, blended with passion and purity.'
    },
   
   
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