import { createContext } from "react";
import type { Product } from "../interfaces/Product";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
}

export const CartContext = createContext<CartContextType | null>(null);