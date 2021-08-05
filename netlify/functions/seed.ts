import { default as stockManager } from "../service/classes/stock-manager";
import reorderManager from "../service/classes/reorders";
import { products } from "../service/seeds/index";
import { ProductProperties } from "../service/types";

export const handler = async function name() {
  products.forEach(function (product: ProductProperties) {
    if (!stockManager.get(product.name)) stockManager.create(product)
  });
  stockManager.sell("Local Sugar 250g", 2)
  console.log(reorderManager.list());
  return {
    statusCode: 200, body: JSON.stringify({
      success: true, products: stockManager.list()
    })
  }
};

