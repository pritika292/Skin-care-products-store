import express from "express";
import Cart from '../db/cart.js';

const router = express.Router();

router.get("/mycart/:id", async (req, res) => {
    const user = req.params.id;
    const cart = await Cart.findOne({ userId: user });
    if(cart){
        return res.status(200).json(cart);
    }else {
        res.status(404).json({ error: "Cart not found" });
    }
});

router.post("/add", async(req, res) => {
    const user = req.body.user.user._id;
    const item = {
        product: req.body.product,
        quantity: req.body.quantity
    }
    let found = false;
    const cart = await Cart.findOne({ userId: user })
    .then((cart) => {
        if(cart){
            cart.items.map((item) => {

                if(item.product._id == req.body.product._id){
                    found = true;
                }
            })
            if(found == true){
                cart.items.map((item) => {
                    if(item.product._id == req.body.product._id){
                        item.quantity = item.quantity + 1;
                    }
                })
            }else{
                cart.items.push(item);
            }
            
            cart.save().then(() => res.status(200).json(cart));
        } else{
            Cart.create({
                userId: user,
                items: [item]
            })
            .then(() => res.end());
        }
        
    });
});

router.post("/delete", async(req, res) => {
    const user = req.body.user.user._id;
    await Cart.findOne({ userId: user })
    .then((cart) => {
        if(cart){
            cart.items.map((item, index) => {

                if(item.product._id == req.body.product._id){
                    item.quantity = item.quantity - 1;
                }

                if(item.quantity == 0){
                    cart.items.splice(index, 1);
                }
            })
            cart.save().then(() => res.status(200).json(cart));
        } else{
            Cart.create({
                userId: user,
                items: [item]
            })
            .then(() => res.end());
        }
        
    });
});

export default router;