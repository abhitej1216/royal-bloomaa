import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartIconComponent } from '../cart-icon/cart-icon.component';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, CartIconComponent, FormsModule],
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
            </ul>
            <div class="header-actions">
              <button class="icon-btn" (click)="toggleSearch()">
                <i class="fas fa-search"></i>
              </button>
              <div class="dropdown">
                <button class="icon-btn" (click)="toggleDropdown('auth')">
                  <i class="fas fa-user"></i>
                </button>
                <ul class="dropdown-menu" [class.show]="activeDropdown === 'auth'">
                  <li>
                    <a class="dropdown-item" [routerLink]="['/login']" (click)="closeDropdown()">
                      <i class="fas fa-sign-in-alt"></i> Login
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" [routerLink]="['/signup']" (click)="closeDropdown()">
                      <i class="fas fa-user-plus"></i> Register
                    </a>
                  </li>
                </ul>
              </div>
              <a routerLink="/cart" class="icon-btn cart-icon">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-count" *ngIf="cartCount > 0">{{cartCount}}</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <!-- Search Overlay -->
      <div class="search-overlay" *ngIf="isSearchActive">
        <div class="container">
          <form class="search-form" (submit)="onSearch($event)">
            <input 
              type="text" 
              [(ngModel)]="searchQuery" 
              name="query"
              placeholder="Search products..." 
              class="search-input"
              autofocus
            >
            <button type="submit" class="search-submit">
              <i class="fas fa-search"></i>
            </button>
            <button type="button" class="close-search" (click)="toggleSearch()">
              <i class="fas fa-times"></i>
            </button>
          </form>
        </div>
      </div>
    </header>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap');

    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background-color: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

      .navbar {
        padding: 10px 0;

        .navbar-brand {
          img {
            height: 80px;
            width: auto;
            max-width: 100%;
            object-fit: contain;
            transition: transform 0.3s ease;

            &:hover {
              transform: scale(1.05);
            }
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
            margin: 0 12px;
            position: relative;

            &::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              width: 0;
              height: 2px;
              background: linear-gradient(90deg, #007bff, #00bcd4);
              transition: width 0.3s ease;
            }

            &:hover::after {
              width: 100%;
            }

            .nav-link {
              font-family: 'Poppins', sans-serif;
              font-size: 16px;
              font-weight: 500;
              color: #2c3e50;
              padding: 6px 14px;
              transition: all 0.3s ease;
              letter-spacing: 0.3px;

              &:hover,
              &.active {
                color: #007bff;
                transform: translateY(-2px);
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
                  transition: transform 0.3s ease;
                }

                &:hover:after {
                  transform: rotate(180deg);
                }
              }
            }

            .dropdown-menu {
              padding: 10px 0;
              margin-top: 10px;
              border: none;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
              display: none;
              opacity: 0;
              transform: translateY(10px);
              transition: all 0.3s ease;

              &.show {
                display: block;
                opacity: 1;
                transform: translateY(0);
              }

              .dropdown-item {
                font-family: 'Poppins', sans-serif;
                padding: 10px 25px;
                color: #2c3e50;
                font-size: 14px;
                font-weight: 400;
                transition: all 0.3s ease;
                position: relative;

                &::before {
                  content: '';
                  position: absolute;
                  left: 10px;
                  top: 50%;
                  width: 5px;
                  height: 5px;
                  border-radius: 50%;
                  background: transparent;
                  transform: translateY(-50%);
                  transition: all 0.3s ease;
                }

                &:hover {
                  background: linear-gradient(90deg, rgba(0,123,255,0.05), rgba(0,189,212,0.05));
                  color: #007bff;
                  padding-left: 30px;

                  &::before {
                    background: #007bff;
                  }
                }
              }
            }
          }
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 15px;

          .icon-btn {
            background: none;
            border: none;
            padding: 8px;
            color: #2c3e50;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            font-size: 18px;

            &:hover {
              color: #007bff;
              transform: translateY(-2px);
            }

            &.cart-icon {
              .cart-count {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #007bff;
                color: white;
                font-size: 12px;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
          }

          .dropdown {
            position: relative;

            .dropdown-menu {
              position: absolute;
              right: 0;
              min-width: 150px;
              padding: 10px 0;
              margin-top: 10px;
              border: none;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
              display: none;
              opacity: 0;
              transform: translateY(10px);
              transition: all 0.3s ease;

              &.show {
                display: block;
                opacity: 1;
                transform: translateY(0);
              }

              .dropdown-item {
                padding: 10px 20px;
                color: #2c3e50;
                font-size: 14px;
                transition: all 0.3s ease;

                &:hover {
                  background: linear-gradient(90deg, rgba(0,123,255,0.05), rgba(0,189,212,0.05));
                  color: #007bff;
                }
              }
            }
          }
        }
      }

      .search-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.95);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;

        .search-form {
          position: relative;
          width: 100%;
          max-width: 600px;

          .search-input {
            width: 100%;
            padding: 15px 50px 15px 20px;
            border: 2px solid #eee;
            border-radius: 30px;
            font-size: 18px;
            transition: all 0.3s ease;

            &:focus {
              outline: none;
              border-color: #007bff;
            }
          }

          .search-submit,
          .close-search {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #2c3e50;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
              color: #007bff;
            }
          }

          .search-submit {
            right: 60px;
          }

          .close-search {
            right: 20px;
            font-size: 24px;
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
            top: 0;
            right: -100%;
            width: 100%;
            height: 100vh;
            background: white;
            padding: 20px;
            transition: all 0.3s ease;

            &.show {
              right: 0;
            }

            .navbar-nav {
              margin-top: 40px;

              .nav-item {
                margin: 10px 0;

                .nav-link {
                  font-size: 18px;
                }
              }
            }

            .header-actions {
              margin-top: 20px;
              justify-content: center;
            }
          }
        }
      }
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;
  isSearchActive = false;
  activeDropdown: string | null = null;
  searchQuery = '';
  cartCount = 0;

  constructor(private cartService: CartService) {
    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart.length;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.activeDropdown = null;
    }
  }

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
    if (!this.isSearchActive) {
      this.searchQuery = '';
    }
  }

  toggleDropdown(dropdown: string) {
    if (this.activeDropdown === dropdown) {
      this.activeDropdown = null;
    } else {
      this.activeDropdown = dropdown;
    }
  }

  closeDropdown() {
    this.activeDropdown = null;
  }

  onSearch(event: Event) {
    event.preventDefault();
    // Handle search logic here
    console.log('Searching for:', this.searchQuery);
  }
} 