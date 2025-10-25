import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => {
      return import('./shopping-cart/components/shopping-cart-example/shopping-cart-example.component').then((m) => m.ShoppingCartExampleComponent);
    },
      data: {
      name: 'Shopping cart example',
    },
  },
  {
    path: 'cart',
    loadComponent: () => {
      return import('./shopping-cart/components/cart/cart.component').then((m) => m.CartComponent);
    },
  },
];

