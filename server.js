let products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
  { id: 4, name: "Product 4", price: 400 },
];

const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

// Routes

// Get all products
app.get("/products", (req, res) => {
  res.json(products);
});

// Get one product
app.get("/products/:id", (req, res) => {
  const prod = products.find((p) => p.id === parseInt(req.params.id));
  if (!prod) res.status(404).json({ message: "Product not found" });
  res.json(prod);
});

// Add new product
app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body,
  };
  products.push(newProduct);
  res.json(newProduct);
});

//Edit a product
app.put("/products/:id", (req, res) => {
  const prodExist = products.find((p) => p.id === parseInt(req.params.id));
  if (!prodExist) {
    res.send("Product not found");
  }
  console.log(prodExist);

  products = products.map((p) =>
    p.id === parseInt(req.params.id) ? { ...p, ...req.body } : { ...p }
  );
  console.log(products);
  res.send("Updating products...");
});

// Delete a product
app.delete("/products/:id", (req, res) => {
  const prodExist = products.find((p) => p.id === parseInt(req.params.id));
  if (!prodExist) {
    res.send("Product not found");
  }
  products = products.filter((p) => p.id !== parseInt(req.params.id));
  console.log(products);
  res.status(202).json(products);
});

app.listen(3000);
console.log("Listening on port 3000...");
