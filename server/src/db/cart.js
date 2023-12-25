import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    items: [{
        product: {type: Object, required: true},
        quantity: { type: Number, required: true }
    }]   
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;