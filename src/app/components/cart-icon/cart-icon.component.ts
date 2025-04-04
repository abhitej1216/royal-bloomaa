import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <a routerLink="/cart" class="cart-icon">
      <i class="fas fa-shopping-cart"></i>
      <span class="cart-count" *ngIf="itemCount$ | async as count">
        {{ count }}
      </span>
    </a>
  `,
  styles: [`
    .cart-icon {
      position: relative;
      display: inline-block;
      color: #333;
      text-decoration: none;
      padding: 5px;
      transition: color 0.3s ease;

      &:hover {
        color: #007bff;
      }

      i {
        font-size: 24px;
      }

      .cart-count {
        position: absolute;
        top: -8px;
        right: -8px;
        background-color: #007bff;
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        min-width: 20px;
        height: 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 6px;
      }
    }
  `]
})
export class CartIconComponent implements OnInit {
  itemCount$: Observable<number>;

  constructor(private cartService: CartService) {
    this.itemCount$ = this.cartService.cart$.pipe(
      map(items => items.reduce((total, item) => total + item.quantity, 0))
    );
  }

  ngOnInit() {}
} 