import { ProductProperties, Staff } from "../types";

export const products: ProductProperties[] = [
  { "name": "Local Sugar 250g", "inventory": 4, "reorderLevel": 2 },
  { "name": "Kabras Sugar 500g", "inventory": 20, "reorderLevel": 12 },
  { "name": "Kabras Sugar 1kg", "inventory": 15, "reorderLevel": 10 },
  { "name": "Kabras Sugar 2kg", "inventory": 10, "reorderLevel": 5 },
  { "name": "Kabras Sugar 5kg", "inventory": 10, "reorderLevel": 5 }
]

export const staff: Staff[] = [
  { name: "Julius Mutie", role: "WAREHOUSE", id: 1111, password: "password" },
  { name: "Jackline Mwende", role: "RETAILER", id: 2222, password: "password" },
]