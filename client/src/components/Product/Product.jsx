import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Product({
  id,
  name,
  type,
  price,
  img,
  quantity,
  ingredients,
  handleAddToCart
}) {
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const user = useSelector(state => state.user.exist);
  const navigate = useNavigate();
  const [userQuantity, setUserQuantity] = useState(1);
  const handleDeleteProduct = async () => {
    try {
      const response = await fetch("/api/products/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      toast.success("Deleted product successfully.");
      navigate("/search");
    } catch (e) {
      console.log(e);
    }
  }
  const handleEditProduct = () => {
    navigate("/products/edit/" + id);
  }

  const incrementQuantity = () => {
    setUserQuantity(userQuantity + 1);
  }
  const decrementQuantity = () => {
    if (userQuantity > 1) {
      setUserQuantity(userQuantity - 1);
    }
  }


  return (
    <div className="tw-h-[calc(90vh-3.5rem)] tw-overflow-y-scroll tw-overflow-x-hidden">
      <div className="tw-flex tw-justify-end tw-mt-4 tw-mr-4">
        {isAdmin && <span className="tw-flex tw-flex-row tw-items-start tw-mt-4 tw-space-x-4 ">
          <button
            className="tw-flex tw-items-center tw-text-white tw-w-[2rem] tw-bg-yellow-400 hover:tw-bg-yellow-500 focus:tw-outline-none focus:tw-ring-yellow-200 tw-font-medium tw-rounded-lg tw-text-md"
            onClick={handleEditProduct}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="currentColor" class="bi bi-pencil-fill tw-mr-2 tw-ml-2" viewBox="0 0 16 16">
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
            </svg>
          </button>
          <button
            className="tw-flex tw-items-center tw-text-white tw-w-[2rem] tw-bg-red-700 hover:tw-bg-red-800 focus:tw-outline-none focus:tw-ring-red-300 tw-font-medium tw-rounded-lg tw-text-md"
            onClick={handleDeleteProduct}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="currentColor" class="bi bi-trash3-fill tw-mr-2 tw-ml-2" viewBox="0 0 16 16">
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
            </svg>
          </button>
        </span>
        }
      </div>

      <div className="tw-flex tw-flex-col md:tw-flex-row tw-w-full tw-ml-4 tw-mr-4 tw-mx-auto tw-overflow-hidden tw-rounded-md tw-relative">
        {/* Product Image */}
        <div className="lg:tw-w-1/3 tw-flex">
          <img className="tw-w-full tw-h-auto tw-object-cover tw-justify-center" src={img} alt={name} />
        </div>


        {/* Product Information and Ingredients */}
        <div className="lg:tw-w-2/3 tw-px-6 tw-py-4 tw-bg-white">
          <div className="tw-font-bold tw-text-xl tw-mb-2 tw-text-gray-800">{name}</div>
          <p className="tw-text-gray-600 tw-text-base">{type}</p>

          {/* Ingredients Section */}
          <div className="tw-mt-4">
            <h3 className="tw-font-bold tw-text-lg">Ingredients: </h3>
            <p className="tw-text-gray-600">
              {ingredients.join(', ')}
            </p>
          </div>

          {/* Price */}
          <div className="tw-flex tw-justify-left tw-items-center tw-mt-6">
            <span className="tw-inline-block tw-font-bold tw-text-2xl tw-mr-2">
              ${price}
            </span>
          </div>

          <div className="tw-flex tw-justify-between tw-items-evenly tw-mt-4 tw-mr-12">

            {
              (quantity > 0 && !isAdmin) &&
              <div class="tw-flex tw-items-center tw-border tw-border-gray-300 tw-rounded-md">
                <button onClick={decrementQuantity} class="tw-w-7 tw-h-7 tw-flex tw-items-center tw-justify-center tw-bg-gray-200 tw-rounded-md tw-hover:bg-gray-300" data-action="decrement">
                  <span class="tw-text-sm tw-font-bold">-</span>
                </button>
                <input class="tw-w-12 tw-text-center tw-border-none tw-focus:outline-none tw-focus:ring-1 tw-focus:ring-blue-500 tw-appearance-none" type="number" min="1" value={userQuantity} />
                <button onClick={incrementQuantity} class="tw-w-7 tw-h-7 tw-flex tw-items-center tw-justify-center tw-bg-gray-200 tw-rounded-md tw-hover:bg-gray-300" data-action="increment">
                  <span class="tw-text-sm tw-font-bold">+</span>
                </button>
              </div>

            }

            {
              (quantity < 1) &&
              <div class="tw-flex tw-items-center tw-border tw-border-gray-300 tw-rounded-md">
                <button class="tw-w-7 tw-h-7 tw-flex tw-items-center tw-justify-center tw-bg-gray-100 tw-rounded-md tw-hover:bg-gray-200" data-action="decrement">
                  <span class="tw-text-sm tw-font-bold tw-text-gray-400">-</span>
                </button>
                <input class="tw-w-12 tw-text-center tw-border-none tw-focus:outline-none tw-text-gray-400 tw-appearance-none" type="number" min="1" value="0" />
                <button class="tw-w-7 tw-h-7 tw-flex tw-items-center tw-justify-center tw-bg-gray-100 tw-rounded-md tw-hover:bg-gray-200" data-action="increment">
                  <span class="tw-text-sm tw-font-bold tw-text-gray-400">+</span>
                </button>
              </div>

            }

            {quantity > 0 ? (
              <span className="tw-inline-block tw-bg-gray-100 tw-rounded-full tw-border tw-border-gray-10 tw-px-3 tw-py-1 tw-text-sm tw-font-semibold">
                <span class="tw-text-green-500">✓</span> In Stock
              </span>
            ) : (
              <span class="tw-inline-block tw-bg-red-400 tw-rounded-full tw-px-3 tw-py-1 tw-text-sm tw-font-semibold">
                Out of Stock
              </span>
            )}
          </div>

          <div className="tw-flex tw-justify-between tw-items-evenly tw-mt-4 tw-mr-12">

            {
              (user && !isAdmin && quantity > 0) && <button
                className="tw-flex tw-items-center tw-justify-center tw-text-white tw-end-2.5 tw-bottom-2.5 tw-bg-blue-600 hover:tw-bg-blue-700 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-blue-200 tw-font-medium tw-rounded-lg tw-text-sm tw-px-4 tw-py-2" type="button"
                onClick={() => { handleAddToCart(userQuantity) }}
              >
                Add to cart
              </button>
            }
            {
              ((!user && !isAdmin) || (user && quantity < 1)) &&
              <button className="tw-flex tw-items-center tw-justify-center tw-text-white tw-end-2.5 tw-bottom-2.5 tw-bg-blue-400 tw-font-medium tw-rounded-lg tw-text-sm tw-px-4 tw-py-2" type="button"
              >
                Add to cart
              </button>

            }
          </div>

          <div className="tw-mt-4">
            {isAdmin && <span className="tw-font-semibold tw-text-md">Available quantity : {quantity}</span>}
          </div>

        </div>
      </div>

    </div>
  );
}

export default Product