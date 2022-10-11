var fetchNode = require("node-fetch");
const express = require("express");
const { text, response } = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const productList = [
  {
    id: 1,
    productName: "Apple",
    price: 1,
    username: "cole",
    password: "123",
  },
];

app.post("/product-register", (req, res) => {
  const product = registerProduct(
    req.body.productName,
    req.body.price,
    req.body.username,
    req.body.password
  );
  res.send(product);
});

function registerProduct(productName, price, username, password) {
  const user = checkLogin(productName, price, username, password);
}

function checkLogin(username, password) {
  fetchNode("http://localhost:3000/user-list")
    .then((res) => res.text())
    .then((text) => {
      if (text) {
        const userList = JSON.parse(text);
        const user = userList.find(
          (user) => user.username === username && user.password === password
        );
        if (user) {
          return user;
        } else {
          return "User not found";
        }
      } else {
        return "User not found";
      }
    });
}

app.get("/product-list", (req, res) => {
  res.send(productList);
});

app.listen(port, () => {
  console.log(`Server B running on port ${port}`);
});
