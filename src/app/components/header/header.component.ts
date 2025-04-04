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
      <nav class="navbar navbar-expand-lg">
        <div class="container">
          <a class="navbar-brand" routerLink="/">
            <img src="assets/images/logo/logo.svg" alt="Royal Bloomaa Logo">
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
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" (click)="toggleDropdown('about')">
                  About & Help
                </a>
                <ul class="dropdown-menu" [class.show]="activeDropdown === 'about'">
                  <li><a class="dropdown-item" routerLink="/about">About Us</a></li>
                  <li><a class="dropdown-item" routerLink="/contact">Contact</a></li>
                  <li><a class="dropdown-item" routerLink="/privacy-policy">Privacy Policy</a></li>
                  <li><a class="dropdown-item" routerLink="/terms">Terms & Conditions</a></li>
                  <li><a class="dropdown-item" routerLink="/refund">Refund Policy</a></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" (click)="toggleDropdown('collection')">
                  Collection
                </a>
                <ul class="dropdown-menu" [class.show]="activeDropdown === 'collection'">
                  <li><a class="dropdown-item" routerLink="/shop">All Products</a></li>
                  <li><a class="dropdown-item" routerLink="/shop">New Arrivals</a></li>
                  <li><a class="dropdown-item" routerLink="/shop">Best Sellers</a></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" (click)="toggleDropdown('shop')">
                  Shop
                </a>
                <ul class="dropdown-menu" [class.show]="activeDropdown === 'shop'">
                  <li><a class="dropdown-item" routerLink="/shop">Perfumes</a></li>
                  <li><a class="dropdown-item" routerLink="/shop">Attars</a></li>
                  <li><a class="dropdown-item" routerLink="/shop">Body Mists</a></li>
                  <li><a class="dropdown-item" routerLink="/shop">Gift Sets</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/blog" routerLinkActive="active">Blog</a>
              </li>
            </ul>
            <div class="header-actions">
              <button class="search-btn">
                <i class="fas fa-search"></i>
              </button>
              <button class="menu-btn" (click)="toggleMenu()">
                <i class="fas fa-bars"></i>
              </button>
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
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

      .navbar {
        padding: 15px 0;

        .navbar-brand {
          img {
            height: 100px;
            width: auto;
            max-width: 100%;
            object-fit: contain;
          }
        }

        .navbar-toggler {
          border: none;
          padding: 0;
          display: none;

          &:focus {
            box-shadow: none;
          }
        }

        .navbar-nav {
          .nav-item {
            margin: 0 15px;
            position: relative;

            .nav-link {
              font-size: 16px;
              font-weight: 500;
              color: #333;
              padding: 8px 0;
              transition: color 0.3s ease;

              &:hover,
              &.active {
                color: #007bff;
              }

              &.dropdown-toggle {
                cursor: pointer;
                
                &:after {
                  display: inline-block;
                  margin-left: 5px;
                  vertical-align: middle;
                  content: "";
                  border-top: 5px solid;
                  border-right: 5px solid transparent;
                  border-bottom: 0;
                  border-left: 5px solid transparent;
                }
              }
            }

            .dropdown-menu {
              padding: 10px 0;
              margin-top: 10px;
              border: none;
              box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
              display: none;

              &.show {
                display: block;
              }

              .dropdown-item {
                padding: 8px 20px;
                color: #666;
                font-size: 14px;
                transition: all 0.3s ease;

                &:hover {
                  background-color: #f8f9fa;
                  color: #007bff;
                }
              }
            }
          }
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;

          button {
            background: none;
            border: none;
            padding: 0;
            font-size: 20px;
            color: #333;
            cursor: pointer;
            transition: color 0.3s ease;

            &:hover {
              color: #007bff;
            }
          }

          .menu-btn {
            display: none;
          }
        }
      }
    }

    @media (max-width: 991px) {
      .header {
        .navbar {
          .navbar-toggler {
            display: block;
          }

          .navbar-collapse {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            padding: 20px;
            height: calc(100vh - 70px);
            overflow-y: auto;
            transition: all 0.3s ease;
            transform: translateX(-100%);

            &.show {
              transform: translateX(0);
            }
          }

          .navbar-nav {
            .nav-item {
              margin: 10px 0;

              .dropdown-menu {
                position: static;
                box-shadow: none;
                padding-left: 20px;
              }
            }
          }

          .header-actions {
            margin-top: 20px;
            justify-content: flex-end;

            .menu-btn {
              display: block;
            }
          }
        }
      }
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;
  activeDropdown: string | null = null;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.activeDropdown = null;
    }
  }

  toggleDropdown(name: string) {
    this.activeDropdown = this.activeDropdown === name ? null : name;
  }
} 