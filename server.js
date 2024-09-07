const products = [
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
app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body,
  };
  products.push(newProduct);
  res.json(newProduct);
});

app.put("/products", (req, res) => {
  res.send("Updating products...");
});

app.delete("/products", (req, res) => {
  res.send("Deleting products...");
});

app.get("/products/:id", (req, res) => {
  const prod = products.find((p) => p.id === parseInt(req.params.id));
  if (!prod) res.status(404).json({ message: "Product not found" });
  res.json(prod);
});

app.listen(3000);
console.log("Listening on port 3000...");
