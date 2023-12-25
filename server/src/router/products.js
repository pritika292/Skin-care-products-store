import express from "express";
import {
  addNewProduct,
  updateProduct,
  deleteProduct,
  GetAllProducts, getProductById,
} from "../db/products.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const userInput = req.query.userInput || "";
  const minPrice = parseFloat(req.query.minPrice) || 0;
  const maxPrice = parseFloat(req.query.maxPrice) || Infinity;
  const type = req.query.type || "";

  let products = await GetAllProducts();
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  shuffleArray(products);

  let filteredProducts = products;
  if (userInput) {
    filteredProducts = filteredProducts.filter((product) => {
      return (
        product.product_name.toLowerCase().includes(userInput.toLowerCase()) ||
        product.product_type.toLowerCase().includes(userInput.toLowerCase()) ||
        product.clean_ingreds
          .map((item) => item.toLowerCase())
          .includes(userInput.toLowerCase())
      );
    });
  }

  if (minPrice > 0) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.price >= minPrice;
    });
  }

  if (maxPrice < Infinity) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.price <= maxPrice;
    });
  }

  if (type && type != "Category" && type != "undefined") {
    filteredProducts = filteredProducts.filter((product) => {
      return product.product_type.toLowerCase() === type.toLowerCase();
    });
  }
  return res.status(200).json(filteredProducts);
});

// router.get("/categories", async (req, res) => {
//   try {
//     let products = await GetAllProducts();
//     const categories = [...new Set(products.map((product) => product.product_type))];
//     res.status(200).json(categories);
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Add new product
router.post("/", isAdmin, async (req, res) => {
  try {
    const {
      product_name,
      product_type,
      clean_ingreds,
      price,
      image_url,
      quantity,
    } = req.body;
    const newProduct = {
      product_name,
      product_type,
      clean_ingreds,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      image_url,
    };
    const insertedProduct = await addNewProduct(newProduct);
    res.status(201).json({ message: "Added product successfully" });
  } catch (err) {
    console.error("Error adding new product :", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update existing product
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const {
      product_name,
      product_type,
      clean_ingreds,
      price,
      image_url,
      quantity,
    } = req.body;
    const newProduct = {
      product_name,
      product_type,
      clean_ingreds,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      image_url,
    };

    const updatedProduct = await updateProduct(id, newProduct);

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Updated product successfully" });
  } catch (err) {
    console.error("Error updating product :", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a product
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await deleteProduct(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Deleted product successfully" });
  } catch (err) {
    console.error("Error deleting product :", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Middleware to check if user is an admin
function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user && req.user.isAdmin) {
    return next();
  }
  res.status(403).json({ error: "Unauthorized access" });
}


router.get("/:id", async (req, res) => {
  let product = await getProductById(req.params.id);
  return res.status(200).json(product);
})

router.post("/", () => { });
export default router;
