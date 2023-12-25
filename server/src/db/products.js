import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_name: String,
  product_type: String,
  clean_ingreds: [String],
  price: Number,
  quantity: Number,
  image_url: String,
});

const productModel = mongoose.model("products", productSchema);

export const GetAllProducts = async () => {
  try {
    const users = await productModel.find({});
    return users;
  } catch (error) {
    console.error(error);
  }
};
export const getProductById = async (id) => {
  try {
    const product = await productModel.findById(id);
    return product;
  } catch (e) {
    console.error(e);
  }
};

export const addNewProduct = async (product) => {
  try {
    const newProduct = new productModel(product);
    await newProduct.save();
    return newProduct;
  } catch (e) {
    console.error(e);
  }
};

export const updateProduct = async (productId, product) => {
  try {
    const updatedProduct = productModel.findByIdAndUpdate(productId, product, {
      new: true,
    });
    return updatedProduct;
  } catch (e) {
    console.error(e);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const deletedProduct = productModel.findByIdAndDelete(productId);
    return deletedProduct;
  } catch (e) {
    console.error(e);
  }
};

// async function updateCleanIngreds() {
//   try {
//     // Find documents where clean_ingreds field is a string containing an array
//     const documentsToUpdate = await productModel.find({
//       clean_ingreds: { $regex: /\['.*'\]/ },
//     });

//     // let test = documentsToUpdate[0];

//     // const newArray = test.clean_ingreds[0]
//     //   .replace(/'/g, "")
//     //   .slice(1, -1)
//     //   .split(", ")
//     //   .map((item) => item.trim());
//     // console.log(newArray);

//     for (const document of documentsToUpdate) {
//       // Convert the string to an array
//       const newArray = document.clean_ingreds[0]
//         .replace(/'/g, "")
//         .slice(1, -1)
//         .split(", ")
//         .map((item) => item.trim());

//       // Update the document with the new array
//       document.clean_ingreds = newArray;
//       console.log(document.clean_ingreds);

//       // Save the updated document
//       await document.save();
//     }

//     console.log("Documents updated successfully");
//   } catch (error) {
//     console.error("Error updating documents:", error);
//   }
// }

// updateCleanIngreds();
