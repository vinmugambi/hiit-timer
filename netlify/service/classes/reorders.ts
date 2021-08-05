import { Order, Reorder } from "../types"
import { compare } from "../utils";
import stockManager from "./stock-manager";

const reorderManager = {
    orders: [],
    create(productName: string, qty = 20): void {
        let exists = this.orders.find(function (order:Reorder) {
            return compare(order.productName, productName) && (order.status === "UNPROCESSED")
        })
        if(!exists) this.orders.unshift({ productName, qty, status: "UNPROCESSED" });
    },
    dispatch(productName: string): void {
        let order = this.orders.find(function (order: Reorder) { order.productName === productName });
        if (!order) throw new Error("Order not found");
        order.status = "PROCESSED";
        stockManager.restock(order.productName, order.qty)
    },
    list(): [] | Order[] {
        if (this.orders.length === 0) return []
        return this.orders.map(function (order: Reorder) {
            return { ...order, product: stockManager.get(order.productName) }
        })
    }
}

export default reorderManager;