import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);

  cart$ = this.cartSubject.asObservable();
  total$ = this.totalSubject.asObservable();

  constructor() {
    // Load cart from localStorage on service initialization
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.updateCart();
    }
  }

  addToCart(item: Omit<CartItem, 'quantity'>) {
    const existingItem = this.cartItems.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }

    this.updateCart();
  }

  removeFromCart(itemId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.updateCart();
  }

  updateQuantity(itemId: number, quantity: number) {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      if (quantity <= 0) {
        this.removeFromCart(itemId);
      } else {
        this.updateCart();
      }
    }
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  private updateCart() {
    this.cartSubject.next([...this.cartItems]);
    this.updateTotal();
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private updateTotal() {
    const total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.totalSubject.next(total);
  }
} 