import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

function CartDetails(items) {

    const user = useSelector(state => state.user);
    const removeItem = () => {
        
    }

    const handleAddToCart = async (product) => {
        if(!user){
          return false;
        }
        try {
          const response = await fetch("/api/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({user: user, product: product, quantity: 1}),
          });
        } catch (e) {
          console.log(e)
        }
      };

      useEffect(() => {
        const getCart = async () => {
            if(!user){
                return false;
              }
          try {
                const response = await fetch(`/api/cart/mycart/${user.user._id}`, {
                method: "GET"
            });
            const data = await response.json();
            setItems(data.items);
          } catch (e) {
            console.log(e.message);
          }
        };
        getCart();
      }, []);

    const renderItems = () => (
            items != 'undefined' && items.cart != 'undefined' ? 
            items.cart.map((product, index) => (
                <div  key={`${product.product._id}${index}`} className='tw-pt-5 tw-pb-5'>
                    <div className="tw-overflow-hidden tw-rounded-md tw-shadow-lg">
                        
                        <div className="tw-flex tw-flex-row tw-px-6 tw-py-4 tw-bg-white">
                            <img className="tw-flex-none tw-w-60 tw-h-60 tw-object-cover" src={product.product.image_url} alt={product.product.product_name} />
                            <div className='tw-flex-initial tw-w-70'>
                                <div className="tw-font-bold tw-text-xl tw-mb-2 tw-text-gray-800">{product.product.product_name}</div>
                                <p className="tw-text-gray-600 tw-text-base">{product.product.product_type}</p>
                            </div>
                            <div className='tw-flex-initial tw-w-20'>
                                <span className="tw-inline-block tw-rounded-full tw-px-3 tw-py-1 tw-text-sm tw-font-semibold tw-mr-2">
                                ${product.product.price}
                                </span>
                            </div>
                        </div>
                        <div className="tw-flex tw-justify-between tw-items-center tw-px-6 tw-py-4 tw-text-white">
                            <div className='tw-flex-initial tw-w-70'></div>
                            <span className="tw-bg-green-500 tw-rounded-full tw-px-3 tw-py-1 tw-text-sm tw-font-semibold">
                                <div className='tw-flex tw-flex-row'>
                                    <button className='tw-flex-none tw-w-10'>-</button>
                                    <span className='tw-flex-none tw-items-center'>{product.quantity}</span>
                                    <button className='tw-flex-none tw-w-10' onClick={() => handleAddToCart(product.product)}>+</button>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            ))
        : null
        
    )

    return(
        <div>
            {renderItems()}
        </div>
    )
}

export default CartDetails;