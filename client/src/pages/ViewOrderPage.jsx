import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function ViewOrderPage() {

    const [transaction, setTransaction] = useState();
    const { id } = useParams();

    const renderMyOrder = () =>
        transaction.orderData[0].purchase_units[0].items ?
            transaction.orderData[0].purchase_units[0].items.map((item, index) => {
                return (
                    <div
                      key={`${index}`}
                      className="tw-pt-5 tw-pb-5 lg:tw-w-[37rem] tw-w-[17rem] md:tw-w-[30rem] lg:tw-w-[25rem] tw-w-[20rem] md:tw-w-[23rem]"
                    >
                      <div className="tw-overflow-hidden tw-rounded-md tw-shadow-lg tw-w-25 tw-relative">
                        <div className="tw-flex tw-flex-row lg:tw-flex-row tw-px-2 tw-py-4 tw-bg-white tw-justify-center">
                            <div className="tw-basis-1/3 tw-font-bold tw-mb-2 tw-px-4 tw-text-gray-800">
                                    ${item.unit_amount.value}
                            </div>
                            <div className="tw-basis-1/3 tw-font-bold tw-mb-2 tw-px-4 tw-text-gray-800">
                                {item.name}
                            </div>
                            <div className="tw-basis-1/3 tw-font-bold tw-mb-2 tw-px-4 tw-text-gray-800">
                                {item.quantity}
                            </div> 
                        </div>
                      </div>
                    </div>
                );
            })
            
        : null;
  
    useEffect(() => {
        const getOrder = async () => {
          try {
            const response = await fetch(`/api/transaction/order/${id}`, {
              method: "GET",
            });
            const data = await response.json();
            setTransaction(data);
          } catch (e) {
            console.log(e.message);
          }
        };
        getOrder();
      }, []);

  return (
    <>
      <Header />
      
      {transaction ?
      <>
      <div className="tw-h-20 tw-w-full tw-flex tw-flex-row tw-justify-center tw-pb-20 tw-pt-20">
        <div className="tw-text-base lg:tw-text-2xl md:tw-text-xl tw-font-bold ">
            Order# {transaction.orderId}
        </div>
      </div>
      <div className="tw-min-h-screen tw-h-auto tw-max-w-[1440px] tw-mx-auto tw-my-auto tw-text-center lg:tw-w-[25rem] tw-w-[20rem] md:tw-w-[23rem] tw-justify-center">
        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-justify-center lg:tw-gap-3">
          <section className="tw-flex tw-mx-auto tw-items-center tw-justify-center tw-text-xl tw-h-auto">
            <div>
            <div className="tw-overflow-hidden tw-rounded-md tw-shadow-lg tw-w-25 tw-relative">
                        <div className="tw-flex tw-flex-row lg:tw-flex-row tw-px-2 tw-py-4 tw-bg-white tw-justify-center">
                            <div className="tw-basis-1/3 tw-font-bold tw-mb-2 tw-px-4 tw-text-gray-800 ">
                                    Price
                            </div>
                            <div className="tw-basis-1/3 tw-font-bold tw-mb-2 tw-px-4 tw-text-gray-800">
                                Product
                            </div>
                            <div className="tw-basis-1/3 tw-font-bold tw-mb-2 tw-px-4 tw-text-gray-800">
                                Quantity
                            </div>
                        </div>
                      </div>
              {transaction ? renderMyOrder() : null}
            </div>
          </section>
        </div>

        <div className="tw-w-full tw-flex tw-flex-row tw-justify-center tw-pb-10 tw-pt-10">
          <div className="tw-text-base lg:tw-text-2xl md:tw-text-xl tw-font-bold ">
          Payment Information
            </div>
        </div>

        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-justify-center lg:tw-gap-3">
          <section className="tw-flex lg:tw-pr-2 tw-items-center tw-justify-center tw-text-3/4 tw-pb-20 ">
            <div className="lg:tw-w-[25rem] tw-w-[20rem] md:tw-w-[23rem] tw-border tw-border-gray-200 tw-rounded-none md:tw-rounded-md">
              <div className="tw-flex tw-flex-row px-6 py-2 my-1">
                <div className="tw-font-bold tw-text-lg mb-2 tw-basis-1/2">
                  Total Amount
                </div>
                <div className="tw-font-bold tw-text-lg mb-2 tw-basis-1/2">
                  ${transaction.orderData[0].purchase_units[0].amount.value}
                </div>
              </div>
              <div className="tw-flex tw-flex-row tw-justify-center">
                <div className="tw-font-bold tw-text-base mb-2 tw-basis-1/2 tw-justify-center">Shipping</div>
                <div className="tw-font-bold tw-text-base mb-2 tw-basis-1/2 tw-text-green-600 tw-justify-center">
                  Free
                </div>
              </div>

              <hr className="tw-divide-y tw-divide-gray-50 tw-dark:divide-gray-50" />
              <div className="tw-flex tw-flex-row tw-justify-center">
                <div className="tw-flex tw-flex-col tw-justify-center">
                    <div className="tw-font-bold tw-text-lg mb-2 tw-basis-3/4 tw-justify-center">
                        Shipping Address 
                    </div>
                    <div className="tw-text-lg mb-2 tw-basis-1/4 tw-justify-center">
                        {transaction.orderData[0].purchase_units[0].shipping.address.address_line_1}
                    </div>
                    <div className="tw-text-lg mb-2 tw-basis-1/4 tw-justify-center"> 
                        {transaction.orderData[0].purchase_units[0].shipping.address.admin_area_1}, {transaction.orderData[0].purchase_units[0].shipping.address.admin_area_2} 
                    </div>
                    <div className="tw-text-lg mb-2 tw-basis-1/4 tw-justify-center" >
                        {transaction.orderData[0].purchase_units[0].shipping.address.country_code}, {transaction.orderData[0].purchase_units[0].shipping.address.postal_code}
                    </div>
                </div>
                
              </div>
            </div>
          </section>
        </div>
      </div>
        </>
      : null}  
      
      <Footer />
    </>
  );
}

export default ViewOrderPage;
