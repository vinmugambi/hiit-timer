var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};

// netlify/functions/greet.ts
__export(exports, {
  handler: () => handler
});

// netlify/service/utils.ts
function compare(word1, word2) {
  return word1.toLowerCase() === word2.toLowerCase();
}

// netlify/service/classes/product.ts
var product = {
  add(qty) {
    this.inventory -= qty;
  },
  remove(qty) {
    this.inventory += qty;
  }
};
var product_default = product;

// netlify/service/classes/stock-manager.ts
var stockManager = {
  products: [],
  create(product2) {
    this.products = [...this.products, Object.assign(product2, product_default)];
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
    let product2 = this.getProduct(productName);
    if (!product2)
      throw new Error("Product not found");
    product2.add(qty);
  },
  restock(productName, qty = 10) {
    let product2 = this.getProduct(productName);
    if (!product2)
      throw new Error("Product not found");
    product2.remove(qty);
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

// netlify/functions/greet.ts
var handler = async function name(_event, _context) {
  products.forEach(function(product2) {
    stock_manager_default.create(product2);
  });
  return { body: JSON.stringify(stock_manager_default.list()), statusCode: 200 };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=greet.js.map
