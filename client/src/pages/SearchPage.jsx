import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ProductsGrid from "../components/Search/products";
import { CiShoppingBasket } from "react-icons/ci";
import Search from "../components/Search/search";

function SearchPage() {
  const [products, setProducts] = useState();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  const [searchInput, setSearchInput] = useState();
  const [minPriceInput, setMinPriceInput] = useState();
  const [maxPriceInput, setMaxPriceInput] = useState();
  const [typeValue, setTypeValue] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPRoducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
        setMaxPage(Math.ceil(data.length / 10));
        setTimeout(() => {
          setLoading(false);
        }, 900);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchPRoducts();
  }, []);
  const handleLeft = () => {
    if (page === 1) {
      setPage(maxPage);
    } else setPage((prev) => prev - 1);
  };
  const handleRight = () => {
    if (page == maxPage) {
      setPage(1);
    } else setPage((prev) => prev + 1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`/api/products?userInput=${searchInput}`);
      const data = await response.json();
      setProducts(data);
      setPage(1);
      setMaxPage(Math.ceil(data.length / 10));
      setTimeout(() => {
        setLoading(false);
      }, 900);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let apiUri = '/api/products?'
      if(searchInput) {
        apiUri+=`userInput=${searchInput}&`
      }
      if(minPriceInput && parseFloat(minPriceInput) > 0) {
        apiUri+=`minPrice=${minPriceInput}&`
      } 
      if(maxPriceInput && parseFloat(maxPriceInput) > 0) {
        apiUri+=`maxPrice=${maxPriceInput}&`
      } 
      if(typeValue != 'Category') {
        apiUri+=`type=${typeValue}&`
      } 
      const response = await fetch(apiUri);
      const data = await response.json();
      setProducts(data);
      setPage(1);
      setMaxPage(Math.ceil(data.length / 10));
      setTimeout(() => {
        setLoading(false);
      }, 900);
    } catch (e) {
      console.log(e.message);
    }
  };
  
  
  return (
    <>
      <Header />
      <main className="tw-h-[calc(100vh-3.5rem)]">
        <Search handleSubmit={handleSubmit} setSearchInput={setSearchInput} setMinPriceInput={setMinPriceInput} setMaxPriceInput={setMaxPriceInput} setTypeValue={setTypeValue} handleFilter={handleFilter}/>
        {loading ? (
          <div className="tw-flex tw-h-[calc(100vh-14rem)] tw-items-center tw-justify-center tw--mt-5">
            <CiShoppingBasket className="tw-animate-pulse tw-w-[20rem] tw-h-[20rem]" />
          </div>
        ) : (
          <ProductsGrid
            Products={products}
            handleLeft={handleLeft}
            handleRight={handleRight}
            Page={page}
          />
        )}
        <Footer />
      </main>
    </>
  );
}

export default SearchPage;
