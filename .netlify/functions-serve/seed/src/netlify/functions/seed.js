var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};

// netlify/functions/seed.ts
__export(exports, {
  handler: () => handler
});

// netlify/service/utils.ts
function compare(word1, word2) {
  return word1.toLowerCase() === word2.toLowerCase();
}

// netlify/service/classes/product.ts
var product = {
  remove(qty) {
    if (this.inventory >= qty) {
      this.inventory -= qty;
    } else
      throw new Error("Low stock");
  },
  add(qty) {
    this.inventory += qty;
  }
};
var product_default = product;

// netlify/service/classes/reorders.ts
var reorderManager = {
  orders: [],
  create(productName, qty = 20) {
    let exists = this.orders.find(function(order) {
      return compare(order.productName, productName) && order.status === "UNPROCESSED";
    });
    if (!exists)
      this.orders.unshift({ productName, qty, status: "UNPROCESSED" });
  },
  dispatch(productName) {
    let order = this.orders.find(function(order2) {
      order2.productName === productName;
    });
    if (!order)
      throw new Error("Order not found");
    order.status = "PROCESSED";
    stock_manager_default.restock(order.productName, order.qty);
  },
  list() {
    if (this.orders.length === 0)
      return [];
    return this.orders.map(function(order) {
      return __spreadProps(__spreadValues({}, order), { product: stock_manager_default.get(order.productName) });
    });
  }
};
var reorders_default = reorderManager;

// netlify/service/classes/stock-manager.ts
var stockManager = {
  products: [],
  create(product2) {
    this.products.unshift(Object.assign(product2, product_default));
  },
  get(productName) {
    return this.products.find(function(product2) {
      return compare(product2.name, productName);
    });
  },
  list() {
    return this.products;
  },
  sell(productName, qty = 1) {
    let product2 = this.get(productName);
    if (!product2)
      throw new Error("Product not found");
    product2.remove(qty);
    if (product2.inventory <= product2.reorderLevel) {
      reorders_default.create(product2.name);
    }
  },
  restock(productName, qty = 10) {
    let product2 = this.get(productName);
    if (!product2)
      throw new Error("Product not found");
    product2.add(qty);
  }
};
var stock_manager_default = stockManager;

// netlify/service/seeds/index.ts
var products = [
  { "name": "Local Sugar 250g", "inventory": 4, "reorderLevel": 2 },
  { "name": "Kabras Sugar 500g", "inventory": 20, "reorderLevel": 12 },
  { "name": "Kabras Sugar 1kg", "inventory": 15, "reorderLevel": 10 },
  { "name": "Kabras Sugar 2kg", "inventory": 10, "reorderLevel": 5 },
  { "name": "Kabras Sugar 5kg", "inventory": 10, "reorderLevel": 5 }
];

// netlify/functions/seed.ts
var handler = async function name() {
  products.forEach(function(product2) {
    if (!stock_manager_default.get(product2.name))
      stock_manager_default.create(product2);
  });
  stock_manager_default.sell("Local Sugar 250g", 2);
  console.log(reorders_default.list());
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      products: stock_manager_default.list()
    })
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=seed.js.map
