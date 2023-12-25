import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    image: "/Images/00001Image.png",
    title: "Moisturiser",
    to: "/search",
  },
  {
    image: "/Images/00008Image.png",
    title: "Serum",
    to: "/search",
  },
  {
    image: "/Images/00009Image.png",
    title: "Oil",
    to: "/search",
  },
  {
    image: "/Images/00007Image.png",
    title: "Mist",
    to: "/search",
  },
  {
    image: "/Images/00006Image.png",
    title: "Balm",
    to: "/search",
  },
  {
    image: "/Images/00005Image.png",
    title: "Mask",
    to: "/search",
  },
  {
    image: "/Images/00004Image.png",
    title: "Peel",
    to: "/search",
  },
  {
    image: "/Images/00003Image.png",
    title: "Eye Care",
    to: "/search",
  },
  {
    image: "/Images/00002Image.png",
    title: "Cleanser",
    to: "/search",
  },
  {
    image: "/Images/00014Image.png",
    title: "Toner",
    to: "/search",
  },
  {
    image: "/Images/00013Image.png",
    title: "Exfoliator",
    to: "/search",
  },
  {
    image: "/Images/00012Image.png",
    title: "Bath Salts",
    to: "/search",
  },
  {
    image: "/Images/00011Image.png",
    title: "Body Wash",
    to: "/search",
  },
  {
    image: "/Images/00010Image.png",
    title: "Bath Oil",
    to: "/search",
  },
];

const CategoryTile = ({ image, title, to }) => {
  return (
    <div className="tw-w-40 tw-h-40 tw-flex tw-flex-col tw-justify-center tw-items-center tw-bg-white tw-rounded-lg tw-shadow-md">
      <Link to={to} className="tw-text-gray-600 hover:tw-text-green-500 tw-no-underline ">
        <img
            src={image}
            alt={title}
            className="tw-w-full tw-h-24 tw-object-cover tw-rounded-t-lg"
        />
        <h3 className="tw-text-base tw-font-semibold tw-text-center mt-4">{title}</h3>
    </Link>
    </div>
  );
};

const Categories = () => {
    return (
      <div className="tw-bg-red-300 tw-py-12 tw-px-4">
        <h2 className="tw-text-2xl tw-font-bold tw-text-center tw-mb-8">Explore Categories</h2>
        <div className="tw-grid lg:tw-grid-cols-7 md:tw-grid-cols-7 sm:tw-grid-cols-2 tw-gap-4">
          {categories.map((category, index) => {
              return (
                <div className="tw-flex tw-items-center tw-justify-center tw-mb-4" key={index}>
                  <CategoryTile key={category.title} {...category} />
                </div>
              );
           
          })}
        </div>
      </div>
    );  
};

export default Categories;
