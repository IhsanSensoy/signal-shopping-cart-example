// products-list.component.ts (ui-lib)
import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Product } from '@ngneat/falso';

@Component({
  selector: 'lib-products-list',
  imports: [CurrencyPipe],
  template: ` <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    @for(product of products(); track product.id) {
    <!-- Use product.id for tracking -->
    <div class="card bg-base-200 shadow-xl">
      <figure class="px-4 pt-4">
        <img
          [src]="product.image"
          alt="{{ product.title }}"
          class="rounded-xl h-48 object-cover"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ product.title }}</h2>
        <p>{{ product.description }}</p>
        <div class="card-actions justify-between items-center mt-4">
          <div class="text-xl font-bold">{{ product.price | currency }}</div>
          <!-- Emit product object on button click -->
          <button class="btn btn-primary" (click)="addToCart.emit(product)">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    } @empty {
    <p class="col-span-full text-center p-4">No products found.</p>
    <!-- Added empty state -->
    }
  </div>`,
  styles: ``,
})
export class ProductsListComponent {
  // Input: Receives the list of products to display. Required.
  products = input.required<Product[]>();
  // Output: Emits the Product object when the user wants to add it.
  addToCart = output<Product>();
}
