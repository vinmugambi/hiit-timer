export type ProductProperties = {
    name: string;
    inventory: number;
    reorderLevel: number;
}

export type Product = ProductProperties & ProductMethods;

export type ProductMethods = {
    add: (qty: number) => void;
    remove: (qty: number) => void;
}

export type Staff = {
    role: "RETAILER" | "WAREHOUSE",
    name: string,
    id: number,
    password: string,
}

export type Reorder = {
    productName: string,
    status: "UNPROCESSED" | "PROCESSED",
    qty: number
}

export type Order = Reorder & { product: Product }