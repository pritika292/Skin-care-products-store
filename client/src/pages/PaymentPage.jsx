import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PaymentPage() {
  const user = useSelector((state) => state.user);
  const [items, setItems] = useState();
  const navigate = useNavigate();

  const initialOptions = {
    clientId:
      "Aeku9GKbX-rcwq4iczmH8JLGJOtGfZ0NxGhll6_-C2b4tjop8QIWsTFvf-QywNbld0x0GL6bAtAKnVhO",
    currency: "USD",
    disableFunding: "credit,card",
  };

  const renderItems = () =>
    items != "undefined" && items.cart != "undefined"
      ? items.map((product, index) => {
          return (
            <div
              key={`${product.product._id}`}
              className="tw-pt-5 tw-pb-5 lg:tw-w-[37rem] tw-w-[17rem] md:tw-w-[30rem]"
            >
              <div className="tw-overflow-hidden tw-rounded-md tw-shadow-lg tw-w-25 tw-relative">
                <div className="tw-flex-initial tw-absolute tw-top-2 tw--left-1 ">
                  <span className="tw-inline-block tw-rounded-full tw-px-4 tw-py-2 tw-text-sm md:tw-text-base tw-font-semibold tw-mr-2">
                    ${product.product.price.toFixed(2)}
                  </span>
                </div>
                <div className="tw-flex tw-flex-col lg:tw-flex-row tw-px-6 tw-py-12 tw-bg-white">
                  <img
                    className="tw-flex-none tw-w-60 tw-h-60 tw-object-cover  tw-ml-3"
                    src={product.product.image_url}
                    alt={product.product.product_name}
                  />
                  <div className="tw-flex-initial tw-w-70 tw-mt-2 lg:tw-mt-0">
                    <div className="tw-font-bold tw-text-xl tw-mb-2 tw-text-gray-800">
                      {product.product.product_name}
                    </div>
                    <p className="tw-text-gray-600 tw-text-base">
                      {product.product.product_type}
                    </p>
                  </div>
                </div>
                <div className="tw-flex tw-justify-between tw-items-center tw-px-6 tw-py-2 tw-text-white">
                  <div className="tw-flex-initial tw-w-70"></div>
                </div>
              </div>
            </div>
          );
        })
      : null;

  const getPrice = () => {
    let price = 0;
    items
      ? items.map((item, index) => {
          price = price + item.quantity * item.product.price;
        })
      : null;
    return price.toFixed(2);
  };

  const getQuantity = () => {
    let quantity = 0;
    items
      ? items.map((item, index) => {
          quantity = quantity + item.quantity;
        })
      : null;
    return quantity;
  };

  const generateUnits = () =>
    [
      {
        description: "Skin-Care Products",
        amount: {
          currency_code: "USD",
          value: getPrice(),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: getPrice(),
            },
          },
        },
        items: generateItems(),
      },
    ];

  const generateItems = () => {
    if (items) {
      let itemslist = items.map((item) => ({
        unit_amount: {
          currency_code: "USD",
          value: item.product.price,
        },
        quantity: item.quantity,
        name: item.product.product_name,
      }));
      return itemslist;
    } else {
      return null;
    }
  };

  const onApprove = async (data) => {
    if (!user) {
      return false;
    }
    try {
      const response = await fetch("/api/transaction/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: user, orderID: data.orderID }),
      });
      if (response.ok) {
        toast.success("Order Placed Successfully!");
        navigate(`/myorders/${user.user._id}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getCart = async () => {
      if (!user) {
        return false;
      }
      try {
        const response = await fetch(`/api/cart/mycart/${user.user._id}`, {
          method: "GET",
        });
        const data = await response.json();
        setItems(data.items);
      } catch (e) {
        console.log(e.message);
      }
    };
    getCart();
  }, []);

  return (
    <>
      <Header />

      {items && (
        <>
          <div className="tw-h-20 tw-w-full tw-flex tw-flex-row tw-justify-center">
            <div className="tw-text-base lg:tw-text-2xl md:tw-text-xl tw-font-bold tw-pt-10">
              Review Order
            </div>
          </div>
          <div className=" tw-h-auto tw-max-w-[1440px]  tw-mx-auto">
            <div className="tw-flex tw-flex-col lg:tw-flex-row tw-justify-center lg:tw-gap-3">
              <section className="tw-flex tw-mx-auto tw-items-center tw-justify-center tw-text-xl tw-h-auto">
                <div>{items ? renderItems() : null}</div>
              </section>

              <section className="tw-flex tw-pb-12 lg:tw-pr-2 tw-items-center tw-mt-[5rem] tw-justify-center tw-h-[20rem] tw-text-3/4 tw-mr-10">
                <div className="tw-ml-10 tw-pt-5 tw-pb-5 lg:tw-w-[20rem] tw-w-[16rem] md:tw-w-[18rem] tw-border tw-border-gray-200 tw-rounded-none md:tw-rounded-md">
                  <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                    <PayPalScriptProvider
                      options={initialOptions}
                      className="tw-w-3/4"
                    >
                      <PayPalButtons
                        className="tw-mb-3"
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: generateUnits(),
                          });
                        }}
                        onApprove={onApprove}
                      />
                    </PayPalScriptProvider>
                  </div>
                  <hr className="tw-divide-y tw-divide-gray-50 tw-dark:divide-gray-50" />
                  <div className="tw-flex tw-flex-row px-6 py-2 my-1 tw-mt-2">
                    <div className="tw-basis-1/12"></div>
                    <div className="tw-font-bold tw-text-lg mb-2 tw-basis-3/4">
                      Subtotal ({getQuantity()} items)
                    </div>
                    <div className="tw-font-bold tw-text-lg mb-2 tw-basis-1/4 tw-mr-3">
                      ${getPrice()}
                    </div>
                  </div>
                {/* </div> */}
                <div className="tw-flex tw-flex-row px-6 pb-2 pt-0">
                  <div className="tw-basis-1/12"></div>
                  <div className="tw-text-base mb-2 tw-basis-3/4">Shipping</div>
                  <div className="tw-font-bold tw-text-base mb-2 tw-basis-1/4 tw-text-green-600">
                    Free
                  </div>
                </div>
                <hr className="tw-divide-y tw-divide-gray-50 tw-dark:divide-gray-50" />
                <div className="tw-flex tw-flex-row px-6 py-2 tw-mt-3">
                  <div className="tw-basis-1/12"></div>
                  <div className="tw-font-bold tw-text-lg mb-2 tw-basis-3/4">
                    Estimated Total
                  </div>
                  <div className="tw-font-bold tw-text-lg mb-2 tw-basis-1/4 tw-mr-3">
                    ${getPrice()}
                  </div>
                </div>
              </div>
              </section>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}

export default PaymentPage;
