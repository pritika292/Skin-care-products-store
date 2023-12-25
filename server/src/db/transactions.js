import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    orderId: { type: String, required: true },
    orderData: { type: Array, required: true, default: [] },
    date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;