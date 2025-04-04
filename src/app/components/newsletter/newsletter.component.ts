import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="newsletter">
      <div class="overlay"></div>
      <div class="container">
        <div class="newsletter-content">
          <h2>Join Our Newsletter</h2>
          <p>Subscribe to receive updates, exclusive offers, and more.</p>
          
          <form class="newsletter-form" (ngSubmit)="onSubmit()">
            <div class="input-group">
              <input 
                type="email" 
                [(ngModel)]="email" 
                name="email"
                class="form-control" 
                placeholder="Your email"
                required
              >
              <button type="submit" class="subscribe-btn">Subscribe</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .newsletter {
      padding: 80px 0;
      position: relative;
      background-image: url('/assets/images/products/layout.jpg');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      text-align: center;
      color: white;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      z-index: 1;
    }

    .newsletter-content {
      max-width: 600px;
      margin: 0 auto;
      padding: 0 20px;
      position: relative;
      z-index: 2;
    }

    h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 15px;
      color: white;
    }

    p {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 30px;
    }

    .newsletter-form {
      margin-top: 20px;
    }

    .input-group {
      display: flex;
      gap: 10px;
      max-width: 500px;
      margin: 0 auto;
    }

    .form-control {
      flex: 1;
      padding: 12px 20px;
      font-size: 1rem;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 25px;
      outline: none;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      backdrop-filter: blur(5px);
    }

    .form-control::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    .form-control:focus {
      border-color: white;
      background: rgba(255, 255, 255, 0.15);
    }

    .subscribe-btn {
      padding: 12px 30px;
      font-size: 1rem;
      color: #fff;
      background: linear-gradient(45deg, #8a2be2, #4a90e2);
      border: none;
      border-radius: 25px;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .subscribe-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(138, 43, 226, 0.4);
    }

    @media (max-width: 576px) {
      .input-group {
        flex-direction: column;
      }

      .form-control {
        width: 100%;
      }

      .subscribe-btn {
        width: 100%;
      }

      h2 {
        font-size: 2rem;
      }
    }
  `]
})
export class NewsletterComponent {
  email: string = '';

  onSubmit() {
    if (this.email) {
      console.log('Subscribing email:', this.email);
      // Here you would typically call a service to handle the subscription
      this.email = ''; // Reset form after submission
    }
  }
} 