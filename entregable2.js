const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.filePath, data, "utf8");
  }

  generateId() {
    return "_" + Math.random().toString(36).slice(2, 11);
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, code, stock) {
    if (!title || !description || !price || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    if (!this.products.some((p) => p.code === code)) {
      let newProduct = {
        id: this.generateId(),
        title,
        description,
        price,
        code,
        stock,
      };

      this.products.push(newProduct);
      this.saveProducts();
      console.log(`El producto ${title} fue agregado correctamente`);
    } else {
      console.log(`Ya existe un producto con el código ${code}`);
    }
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((p) => p.id === id);

    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      this.saveProducts();
      console.log(`Producto con ID ${id} eliminado correctamente`);
    } else {
      console.log(`No existe ningún producto con el ID ${id}`);
    }
  }
}

const filePath = "productos.json";
const productManager = new ProductManager(filePath);

console.log("---------");
console.log(productManager.getProducts());

console.log("---------");
productManager.addProduct("Toyota Hilux ", "4x4 srx", 5000, "hh", 12);

console.log("---------");
console.log(productManager.getProducts());

console.log("---------");
productManager.deleteProduct(productManager.getProducts()[0].id);
console.log(productManager.getProducts());
