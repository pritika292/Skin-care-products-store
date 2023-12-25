import React from "react";
import { FaCaretSquareLeft, FaCaretSquareRight } from "react-icons/fa";
import ProductCard from "./productCard";

function products({ Products, handleLeft, handleRight, Page }) {
  return (
    <div className="tw-flex tw-flex-col tw-items-stretch tw-justify-between tw-container tw-mx-auto tw-mt-6 tw-min-h-[calc(100vh-14rem)] ">
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 xl:tw-grid-cols-3 tw-gap-8 tw-place-items-center ">
        {Products?.slice(Page * 10 - 10, Page * 10).map(
          ({ image_url, product_name, price, _id, quantity }) => (
            <ProductCard
              key={_id}
              product_name={product_name}
              image_url={image_url}
              price={price}
              id={_id}
              quantity={quantity}
            />
          )
        )}
      </div>
      <div className="tw-flex tw-justify-center tw-mt-9 tw-text-2xl tw-gap-4 tw-items-center">
        <button
          className="hover:tw-scale-90 tw-cursor-pointer tw-duration-500"
          onClick={handleLeft}
        >
          <FaCaretSquareLeft />
        </button>
        <span className="tw-text-[1.15rem]">{Page}</span>{" "}
        <button
          className="hover:tw-scale-90 tw-cursor-pointer tw-duration-500"
          onClick={handleRight}
        >
          <FaCaretSquareRight />
        </button>
      </div>
    </div>
  );
}

export default products;
