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
              <div class="search-container" [class.active]="isSearchActive">
                <form class="search-form" (submit)="onSearch($event)">
                  <input 
                    type="text" 
                    [(ngModel)]="searchQuery" 
                    name="query"
                    placeholder="Search products..." 
                    class="search-input"
                    [class.expanded]="isSearchActive"
                  >
                  <button type="submit" class="search-submit">
                    <i class="fas fa-search"></i>
                  </button>
                </form>
              </div>
              <button class="search-toggle-btn action-btn" (click)="toggleSearch()">
                <i class="fas fa-search"></i>
                <span class="btn-text">Search</span>
              </button>
              <a routerLink="/cart" class="cart-btn action-btn">
                <i class="fas fa-shopping-cart"></i>
                <span class="btn-text">Cart</span>
                <span class="badge" *ngIf="cartCount > 0">{{cartCount}}</span>
              </a>
              <button class="clear-cart-btn action-btn" (click)="clearCart()" title="Clear Cart">
                <i class="fas fa-trash"></i>
                <span class="btn-text">Clear</span>
              </button>
              <button class="menu-btn action-btn" (click)="toggleMenu()">
                <i class="fas fa-bars"></i>
                <span class="btn-text">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
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
        padding: 15px 0;

        .navbar-brand {
          img {
            height: 100px;
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
            margin: 0 15px;
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
              font-size: 15px;
              font-weight: 500;
              color: #2c3e50;
              padding: 8px 0;
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

          .search-container {
            position: relative;
            transition: all 0.3s ease;
          }

          .search-form {
            display: flex;
            align-items: center;
          }

          .search-input {
            font-family: 'Poppins', sans-serif;
            border: none;
            background: rgba(0,123,255,0.05);
            border-radius: 50px;
            padding: 8px 15px;
            font-size: 14px;
            color: #2c3e50;
            width: 180px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            
            &:focus {
              outline: none;
              width: 220px;
              background: rgba(0,123,255,0.1);
              box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            }

            &::placeholder {
              color: #95a5a6;
              font-weight: 300;
            }
          }

          .search-submit {
            background: none;
            border: none;
            color: #007bff;
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            
            &:hover {
              color: #0056b3;
            }
          }
          
          .action-btn {
            display: flex;
            align-items: center;
            background: #f8f9fa;
            border: none;
            padding: 8px 12px;
            font-size: 14px;
            color: #2c3e50;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 50px;
            font-family: 'Poppins', sans-serif;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            
            i {
              margin-right: 6px;
              font-size: 16px;
            }

            .btn-text {
              font-weight: 500;
            }

            .badge {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              background-color: #007bff;
              color: white;
              border-radius: 50%;
              height: 20px;
              min-width: 20px;
              padding: 0 5px;
              font-size: 12px;
              margin-left: 5px;
            }

            &:hover {
              background-color: #007bff;
              color: white;
              transform: translateY(-2px);
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
          }

          .search-toggle-btn {
            background: #f8f9fa;
          }

          .cart-btn {
            background: #f8f9fa;
            text-decoration: none;
          }

          .clear-cart-btn {
            background: #fff0f0;
            color: #e74c3c;
            
            &:hover {
              background-color: #e74c3c;
              color: white;
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
            
            .search-container {
              display: none;
            }
            
            .search-toggle-btn {
              display: block;
            }

            .action-btn {
              .btn-text {
                display: none;
              }
              
              i {
                margin-right: 0;
              }
              
              padding: 8px;
              border-radius: 50%;
            }

            .menu-btn {
              display: flex;
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
  isSearchActive = false;
  searchQuery = '';
  cartCount = 0;

  constructor(private cartService: CartService) {
    this.cartService.cart$.subscribe(items => {
      this.cartCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.activeDropdown = null;
    }
  }

  toggleDropdown(name: string) {
    this.activeDropdown = this.activeDropdown === name ? null : name;
  }
  
  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }
  
  onSearch(event: Event) {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
      // Here you would implement the actual search logic
    }
    this.searchQuery = '';
  }
  
  clearCart() {
    this.cartService.clearCart();
  }
} 