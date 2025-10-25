import { Product } from '@ngneat/falso';

export interface CartItem extends Product {
  quantity: number;
}
