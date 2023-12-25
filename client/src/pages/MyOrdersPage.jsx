import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { getFormattedDate } from "../utills/DateUtility.js"

function MyOrdersPage() {

  const user = useSelector((state) => state.user);
  const [transactions, setTransactions] = useState();
  const navigate = useNavigate();

  const viewOrder = (id) => {
    navigate(`/order/${id}`);
  };

  const renderMyOrders = () =>
    transactions
      ? transactions.map((transaction, index) => {
        return (
          <div
            key={`${transaction._id}`}
            className="tw-pt-5 tw-pb-5"
          >
            <div className="tw-rounded-md tw-shadow-lg tw-relative">
              <div className="tw-px-6 tw-py-4 tw-bg-white">

                <div className=" tw-mt-2 lg:tw-mt-0">
                  <span className="tw-inline-block tw-rounded-full tw-px-4 tw-py-2 tw-text-sm md:tw-text-base tw-font-semibold tw-mr-2">
                    Order# {transaction.orderId}
                  </span>
                </div>

                <div className="tw-w-auto">
                  <span className="tw-inline-block tw-rounded-full tw-px-4  tw-text-sm md:tw-text-base tw-font-semibold tw-mr-2">
                    Date {getFormattedDate(transaction.date)}
                  </span>
                </div>

                <div className="tw-w-full tw-text-sm md:tw-text-base tw-font-semibold tw-pl-4 tw-mt-2">
                  $ {transaction.orderData[0].purchase_units[0].amount.value}
                </div>


              </div>

              <button className="tw-mx-8 tw-mb-6 tw-py-2 lg:tw-px-4 tw-bg-blue-500 tw-hover:bg-blue-700 tw-text-sm md:tw-text-xs tw-text-white tw-font-bold tw-rounded-md content-center tw-px-3"
                onClick={() => viewOrder(transaction._id)}
              >
                View Details
              </button>
            </div>
          </div>
        );
      })
      : null;

  useEffect(() => {
    const getTransactions = async () => {
      if (!user) {
        return false;
      }
      try {
        const response = await fetch(`/api/transaction/myorders/${user.user._id}`, {
          method: "GET",
        });
        const data = await response.json();
        setTransactions(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    getTransactions();
  }, []);

  return (
    <>
      <Header />
      <main className="tw-h-[calc(92vh-3.5rem)] tw-min-h-screen">
        {transactions ?
          <>
            <div className="tw-h-20 tw-flex tw-flex-row tw-justify-center">
              <div className="tw-text-base lg:tw-text-2xl md:tw-text-xl tw-font-bold tw-pt-10">
                Purchase History
              </div>
            </div>
            <div className="tw-h-auto">
              <div className="tw-flex tw-justify-center lg:tw-gap-3">
                <section className="tw-flex  tw-items-center tw-justify-center tw-text-xl">
                  <div>
                    {transactions ? renderMyOrders() : null}
                  </div>
                </section>
              </div>
            </div>
          </>
          : null}
      </main>
      <Footer />
    </>
  );
}

export default MyOrdersPage;
