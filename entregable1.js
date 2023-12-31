class ProductManager {
  constructor() {
    this.products = [];
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
      console.log(`El auto ${title} fue agregado correctamente`);
    } else {
      console.log(`Ya existe un auto con el codigo ${code}`);
    }
  }
  getProductByCode(code) {
    let product = this.products.find((p) => p.code === code);

    if (product == undefined) {
      console.log(`No existe ningun auto con el codigo ${code}`);
    } else {
      console.log(product);
    }
  }
  getProductById(id) {
    let product = this.products.find((p) => p.id === id);

    if (product === undefined) {
      console.log(`No existe ningún auto con el ID ${id}`);
    } else {
      console.log(product);
    }
  }

  updateProduct(id, updatedFields) {
    let productIndex = this.products.findIndex((p) => p.id === id);

    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedFields,
      };

      console.log(`Producto con ID ${id} actualizado correctamente`);
    } else {
      console.log(`No existe ningún producto con el ID ${id}`);
    }
  }

  deleteProduct(id) {
    let productIndex = this.products.findIndex((p) => p.id === id);

    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      console.log(`Producto con ID ${id} eliminado correctamente`);
    } else {
      console.log(`No existe ningún producto con el ID ${id}`);
    }
  }
}

const product = new ProductManager();

product.addProduct("Toyota Corolla", "Sedan 1.8", 3000, "cc", 5);
product.addProduct("Toyota Yaris", "Hatchback 1.5", 2000, "yy", 10);
product.addProduct("Toyota Etios", "Economico 3 puertas", 1000, "ee", 15);

console.log("---------");
product.addProduct("Toyota Yaris", "Hatchback 1.5", 2000, "yy", 10);

console.log("---------");
console.log(product.getProducts());

console.log("---------");
product.getProductByCode("yy");
product.getProductByCode("aa");

console.log("---------");
product.getProductById(product.getProducts()[0].id);
product.getProductById("aaaaa");

console.log("---------");
product.updateProduct(product.getProducts()[0].id, {
  price: 2500,
});
console.log(product.getProducts());

console.log("---------");
product.deleteProduct(product.getProducts()[0].id);
console.log(product.getProducts());
