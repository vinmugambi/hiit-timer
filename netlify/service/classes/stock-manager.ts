import { ProductProperties, Product } from "../types";
import { compare } from "../utils";
import productMethods from "./product";
import reorderManager from "./reorders";

const stockManager = {
    products: [],
    create(product: ProductProperties): void {
        this.products.unshift(Object.assign(product, productMethods));
    },
    get(productName: string): Product | undefined {
        return this.products.find(function (product: Product) { return compare(product.name, productName) })
    },
    list(): Product[] | [] {
        return this.products;
    },
    sell(productName: string, qty = 1) {
        let product = this.get(productName);
        if (!product) throw new Error("Product not found")
        product.remove(qty);
        if (product.inventory <= product.reorderLevel) {
            reorderManager.create(product.name)
        }
    },
    restock(productName: string, qty = 10) {
        let product = this.get(productName);
        if (!product) throw new Error("Product not found")
        product.add(qty)
    },
}

export default stockManager;