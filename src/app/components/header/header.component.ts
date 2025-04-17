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
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
  
})
export class HeaderComponent {
  isMenuOpen = false;
  isSearchOpen = false;  // Add this line
  isCartOpen = false;
  activeDropdown: string | null = null;
  searchQuery = '';
  cartCount = 0;

  constructor(private cartService: CartService) {
    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart.length;
    });
  }

  toggleSearch() {  // Add this method
    this.isSearchOpen = !this.isSearchOpen;
    if (!this.isSearchOpen) {
      this.searchQuery = '';
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.activeDropdown = null;
    }
  }

  // toggleSearch() {
  //   this.isSearchActive = !this.isSearchActive;
  //   if (!this.isSearchActive) {
  //     this.searchQuery = '';
  //   }
  // }

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

  toggleCart() {  // Add this method
    this.isCartOpen = !this.isCartOpen;
  }
}