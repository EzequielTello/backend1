const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = this.loadProducts();
    this.id = 1;
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

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);

    if (product) {
      return product;
    } else {
      console.log(`Producto con ID ${id} no encontrado (NOT FOUND)`);
      return null;
    }
  }

  updateProduct(id, updatedProduct) {
    const productIndex = this.products.findIndex((p) => p.id === id);

    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedProduct,
      };
      this.saveProducts();
      console.log(`Producto con ID ${id} actualizado correctamente`);
    } else {
      console.log(`No existe ningún producto con el ID ${id}`);
    }
  }

  addProduct(title, description, price, code, stock) {
    if (!title || !description || !price || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    if (!this.products.some((p) => p.code === code)) {
      let newProduct = {
        id: this.id++,
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
productManager.addProduct("Toyota Corolla ", "sedan 1.8 xei", 3000, "cc", 10);

console.log("---------");
console.log(productManager.getProducts());

console.log("---------");
const productId = productManager.getProducts()[0].id;
console.log("Obtener producto por ID existente:");
console.log(productManager.getProductById(productId));

console.log("---------");
const nonExistentProductId = "unIDQueNoExiste";
console.log("Obtener producto por ID no existente:");
console.log(productManager.getProductById(nonExistentProductId));

console.log("---------");
productManager.updateProduct(productId, {
  title: "Nuevo Toyota Hilux",
  description: "4x4 3.2 full",
  price: 6000,
  code: "nhh",
  stock: 15,
});

console.log("---------");
productManager.deleteProduct(productManager.getProducts()[0].id);
console.log(productManager.getProducts());
