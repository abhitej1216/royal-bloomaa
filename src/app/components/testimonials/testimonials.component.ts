import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="testimonials">
      <div class="container">
        <div class="section-header text-center">
          <h2>What Our Customers Say</h2>
          <p class="subtitle">Don't just take our word for it. See why our customers love our premium fragrances.</p>
        </div>

        <div class="row">
          <div class="col-lg-4" *ngFor="let testimonial of testimonials" [@fadeIn]>
            <div class="testimonial-card">
              <div class="customer-info">
                <div class="rating">
                  <span class="star" *ngFor="let star of [1,2,3,4,5]">
                    <i class="fas fa-star" [class.filled]="star <= testimonial.rating"></i>
                  </span>
                </div>
                <h3 class="customer-name">{{testimonial.name}}</h3>
              </div>
              <p class="testimonial-text">"{{testimonial.text}}"</p>
              <div class="purchase-info">
                <span>Purchased: </span>
                <a href="#" class="product-link">{{testimonial.purchased}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials {
      padding: 80px 0;
      background-color: #fff;
    }

    .section-header {
      margin-bottom: 60px;
    }

    .section-header h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 20px;
      color: #333;
    }

    .subtitle {
      font-size: 1.1rem;
      color: #666;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .testimonial-card {
      background: #fff;
      border-radius: 10px;
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 3px 15px rgba(0,0,0,0.05);
      transition: transform 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .testimonial-card:hover {
      transform: translateY(-5px);
    }

    .customer-info {
      text-align: center;
      margin-bottom: 20px;
    }

    .customer-name {
      font-size: 1.1rem;
      font-weight: 600;
      margin-top: 10px;
      color: #333;
    }

    .rating {
      margin-bottom: 15px;
    }

    .star {
      color: #ffd700;
      font-size: 1.2rem;
      margin: 0 2px;
    }

    .testimonial-text {
      font-size: 1rem;
      line-height: 1.6;
      color: #555;
      font-style: italic;
      margin-bottom: 20px;
      text-align: center;
      flex-grow: 1;
    }

    .purchase-info {
      text-align: center;
      color: #666;
      font-size: 0.9rem;
      margin-top: auto;
    }

    .product-link {
      color: #8a2be2;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .product-link:hover {
      color: #4a90e2;
    }

    @media (max-width: 768px) {
      .section-header h2 {
        font-size: 2rem;
      }

      .testimonial-card {
        margin-bottom: 20px;
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class TestimonialsComponent {
  testimonials = [
    {
      name: 'Sarah L.',
      rating: 5,
      text: 'I\'ve been searching for affordable luxury fragrances for years. Royal Bloomaa\'s quality is amazing, and the scents last all day. Won\'t shop anywhere else!',
      purchased: 'Enchanted Garden'
    },
    {
      name: 'Michael K.',
      rating: 5,
      text: 'Completely impressed with the quality. These smell exactly like the designer versions but at a fraction of the price. Fast shipping too!',
      purchased: 'Midnight Oud'
    },
    {
      name: 'Jessica R.',
      rating: 4,
      text: 'I was skeptical at first, but these fragrances are incredible. My coworkers keep asking what I\'m wearing. Great customer service too!',
      purchased: 'Velvet Rose'
    }
  ];
} 