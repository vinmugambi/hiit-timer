const product: import("../types").ProductMethods = {
    remove(qty) {
        if (this.inventory >= qty) {
            this.inventory -= qty;
        } else throw new Error("Low stock");
    },
    add(qty) {
        this.inventory += qty;
    }
}

export default product;