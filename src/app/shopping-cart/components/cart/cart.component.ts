// cart.component.ts
import { CurrencyPipe, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../types/cart.type';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  template: `
    <button (click)="goBack()" class="btn btn-ghost m-2">
      <!-- Back Button -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
      Back
    </button>
    <div class="card bg-base-100 shadow-xl p-4 max-w-2xl mx-auto">
      <h2 class="text-2xl font-bold mb-4">Shopping Cart</h2>

      <!-- Loop through cart items -->
      @for(item of cartService.cartItems(); track item.id) {
      <div class="flex gap-4 mb-4 items-center">
        <img
          [src]="item.image"
          alt="{{ item.title }}"
          class="w-24 h-24 object-cover rounded-lg"
        />
        <div class="flex-1">
          <h3 class="font-bold">{{ item.title }}</h3>
          <!-- Quantity Adjustment Controls -->
          <div class="join mt-1">
            <button
              class="btn btn-sm join-item"
              (click)="decrementQuantity(item)"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              class="input input-bordered input-sm join-item w-16 text-center"
              [value]="item.quantity"
              (change)="updateCartQuantity(item, $event)"
            />
            <button
              class="btn btn-sm join-item"
              (click)="incrementQuantity(item)"
            >
              +
            </button>
          </div>
        </div>
        <div class="flex flex-col items-end">
          <!-- Item Line Total -->
          <div class="text-lg font-bold mb-2">
            {{ price(item) * item.quantity | currency }}
          </div>
          <!-- Remove Button -->
          <button
            class="btn btn-ghost btn-sm text-error"
            (click)="cartService.removeItem(item.id)"
          >
            Remove
          </button>
        </div>
      </div>
      } @empty() {
      <div class="text-center p-8">Your cart is empty</div>
      }

      <!-- Cart Summary and Checkout -->
      @if(cartService.cartItems().length > 0) {
      <div class="border-t pt-4 mt-4">
        <div class="flex justify-between text-xl font-bold">
          <span>Total:</span>
          <span>{{ cartService.totalPrice() | currency }}</span>
        </div>
        <button (click)="checkout()" class="btn btn-primary btn-block mt-4">
          Checkout
        </button>
      </div>
      }
    </div>
  `,
  styles: [
    `
      /* Basic card layout styles */
    `,
  ], // Minimal styles
})
export class CartComponent {
  cartService = inject(CartService);
  location = inject(Location); // For 'back' functionality

  /** Handles direct quantity input change */
  updateCartQuantity(item: CartItem, event: Event) {
    const input = event.target as HTMLInputElement;
    const quantity = Number(input.value);
    this.cartService.updateQuantity(item.id, quantity); // Delegate to service
  }

  /** Increments quantity via service */
  incrementQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.quantity + 1); // Delegate
  }

  price(item: CartItem) {
    return Number(item.price);
  }

  /** Decrements quantity via service */
  decrementQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.quantity - 1); // Delegate
  }

  /** Navigates back using Angular's Location service */
  goBack() {
    this.location.back();
  }

  /** Placeholder checkout action - clears the cart via the service */
  checkout() {
    alert('Checkout successful! (Cart cleared)');
    this.cartService.clearCart(); // Delegate to service
  }
}
