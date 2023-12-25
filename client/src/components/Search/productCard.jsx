import React from "react";
import { useNavigate } from "react-router-dom";

function productCard({ id, product_name, price, image_url, quantity }) {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/search/${id}`);
  };
  return (
    <div
      onClick={() => handleClick(id)}
      className={`${quantity<=0 && 'tw-opacity-30'} tw-p-10 tw-m-3 tw-cursor-pointer tw-relative hover:tw-ring-2 hover:tw-ring-gray-400 tw-bg-white tw-border tw-border-gray-200 tw-rounded-lg tw-shadow md:tw-w-[24rem] lg:tw-w-[24rem] tw-h-[20rem] tw-flex-col tw-flex tw-gap-2 tw-justify-center tw-items-center`}
    >
      <div className="tw-absolute tw-font-bold tw-text-lg tw-top-2 tw-right-4">{`$${price.toFixed(2)}`}</div>
      <h2 className="tw-mb-2 tw-text-[1.34rem] tw-font-bold tw-tracking-tight tw-text-gray-900">
        {product_name}
      </h2>
      <img src={image_url} className="tw-w-[10rem] tw-h-[10rem]" />
    </div>
  );
}

export default productCard;
