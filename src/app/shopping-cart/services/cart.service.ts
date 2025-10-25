// cart.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { Product } from '@ngneat/falso'; // Assuming Product type is shared
import { CartItem } from '../types/cart.type';

@Injectable({ providedIn: 'root' }) // Global singleton service
export class CartService {
  // --- State ---
  // Private signal holding the array of CartItems. Initialized empty.
  private _cartItems = signal<CartItem[]>([]);

  // --- Selectors (Public Signals) ---
  // Read-only signal exposing the current cart items.
  public cartItems = this._cartItems.asReadonly();

  // Computed signal that calculates the total price whenever items change (Read Only).
  public totalPrice = computed(() =>
    this.cartItems().reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    )
  );

  // Computed signal that calculates the total number of individual items.
  public itemCount = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  // --- Actions (Public Methods) ---

  /** Adds a product to the cart or increments quantity if it exists. */
  public addItem(productToAdd: Product) {
    this._cartItems.update((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) => item.id === productToAdd.id
      );
      if (existingItemIndex > -1) {
        // Increment quantity immutably
        const updatedItems = [...currentItems];
        const currentItem = updatedItems[existingItemIndex];
        updatedItems[existingItemIndex] = {
          ...currentItem,
          quantity: currentItem.quantity + 1,
        };
        return updatedItems;
      } else {
        // Add as new item
        return [...currentItems, { ...productToAdd, quantity: 1 }];
      }
    });
  }

  /** Removes an item entirely from the cart by its ID. */
  public removeItem(itemIdToRemove: string) {
    this._cartItems.update(
      (currentItems) =>
        currentItems.filter((item) => item.id !== itemIdToRemove) // Create new array excluding the item
    );
  }

  /** Updates the quantity of a specific item in the cart. Removes if quantity < 1. */
  public updateQuantity(itemId: string, newQuantity: number) {
    if (newQuantity < 1) {
      // Handle removal if quantity drops below 1
      this.removeItem(itemId);
      return;
    }
    this._cartItems.update((currentItems) =>
      currentItems.map(
        (item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item // Update quantity immutably
      )
    );
  }

  /** Clears all items from the cart. */
  public clearCart() {
    this._cartItems.set([]); // Reset state to an empty array
  }
}
