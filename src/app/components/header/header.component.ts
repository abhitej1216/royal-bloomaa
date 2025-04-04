import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartIconComponent } from '../cart-icon/cart-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, CartIconComponent],
  template: `
    <header class="header">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
          <a class="navbar-brand" routerLink="/">
            ROYAL BLOOMAA
          </a>
          <button 
            class="navbar-toggler" 
            type="button" 
            (click)="toggleMenu()"
            [attr.aria-expanded]="isMenuOpen"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div 
            class="collapse navbar-collapse" 
            [class.show]="isMenuOpen"
          >
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/shop" routerLinkActive="active">Shop</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/about" routerLinkActive="active">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/contact" routerLinkActive="active">Contact</a>
              </li>
            </ul>
            <div class="header-actions">
              <app-cart-icon></app-cart-icon>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background-color: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

      .navbar {
        padding: 15px 0;

        .navbar-brand {
          font-size: 24px;
          font-weight: 700;
          color: #333;
        }

        .navbar-toggler {
          border: none;
          padding: 0;

          &:focus {
            box-shadow: none;
          }
        }

        .navbar-nav {
          .nav-item {
            margin: 0 10px;

            .nav-link {
              font-size: 16px;
              font-weight: 500;
              color: #666;
              padding: 8px 15px;
              transition: color 0.3s ease;

              &:hover,
              &.active {
                color: #007bff;
              }
            }
          }
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }
      }
    }

    @media (max-width: 991px) {
      .header {
        .navbar {
          .navbar-nav {
            margin: 20px 0;

            .nav-item {
              margin: 5px 0;
            }
          }

          .header-actions {
            margin-top: 20px;
            justify-content: center;
          }
        }
      }
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
} 