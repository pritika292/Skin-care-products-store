import React from "react";
import { FaBars } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";
import { FaCartShopping, FaClockRotateLeft } from "react-icons/fa6";
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { offsetUser } from "../../redux/features/auth/userSlice";
import { useNavigate } from "react-router-dom";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { useEffect } from 'react';
import logo from "../../assets/logo.jpg";
import { setItemCount } from "../../redux/features/auth/cartSlice";

function Header({ pageBG }) {
  const [Open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const user = useSelector((state) => state.user.exist);
  const currentUser = useSelector((state) => state.user.user);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const count = useSelector((state) => state.cart.itemCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "GET",
        credentials: "same-origin",
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(offsetUser());
        navigate("/");
        toast.success("LOGGED OUT");
      } else {
        console.error("Logout failed");
      }
    } catch (e) {
      console.error("Error logging out:", e);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const getCart = async () => {
      if(!user || isAdmin){
          return false;
        }
    try {
          const response = await fetch(`/api/cart/mycart/${currentUser._id}`, {
          method: "GET"
      });
      const data = await response.json();
      let total = 0;
      data.items.map((item) => {
        total += item.quantity;
      })
      dispatch(setItemCount({ itemCount: total}));
    } catch (e) {
      console.log(e.message);
    }
  };
  getCart();
  }, [])
  return (
    <>
      <div className="tw-h-14 tw-py-2 tw-px-5 tw-flex tw-justify-between tw-border-b tw-bg-[#eae6aded]">
        <div className="tw-text-green-50 tw-flex tw-items-center tw-justify-center">
            <div className="tw-flex tw-items-center" onClick={() => navigate("/")}>
              <img
                src={logo}
                className="tw-w-[3.5rem] tw-h-[3.5rem] tw-bg-white"
              />
              <h1 className="tw-ml-5 tw-text-xl tw-font-bold tw-text-gray-600 hover:tw-cursor-pointer tw-no-underline">Skin Care Hub</h1>
            </div>
          </div>
          {user && !isMobile && (
            <div className="tw-flex tw-items-center tw-justify-center">
              <span className="tw-text-center tw-text-xl tw-font-semibold tw-italic tw-text-gray-600">
                Hi, {currentUser.username} !
              </span>
            </div>
          )}
        
      {/* </div> */}
        <button
          className="sm:tw-hidden hover:tw-scale-110 tw-duration-700"
          onClick={() => setOpen(!Open)}
          title="Menu"
        >
          {Open ? (
            <AiFillCloseSquare className="tw-w-[1.5rem] tw-h-[1.5rem]" />
          ) : (
            <FaBars className="tw-w-[1.5rem] tw-h-[1.5rem]" />
          )}
        </button>
        <nav className="tw-hidden sm:tw-block tw-items-center">
          <ul className="tw-flex tw-items-center tw-gap-6 tw-justify-between tw-h-full">
            <li className="tw-p-2 tw-cursor-pointer hover:tw-scale-125 tw-duration-700" title="Search">
              <Link to="/search" className="tw-text-black ">
                <HiMiniSquares2X2 className="tw-w-[1.5rem] tw-h-[1.5rem]" />
              </Link>
            </li>
            {
              (user && !isAdmin) && <li className="tw-p-2 tw-cursor-pointer hover:tw-scale-125 tw-duration-700"
              title="Cart">
                <Link to={`/mycart/${currentUser._id}`} className="tw-text-black tw-relative">
                  <FaCartShopping className="tw-w-[1.5rem] tw-h-[1.5rem]" />
                  <span className="tw-absolute tw-top-0 tw-right-0 tw-bg-red-500 tw-rounded-full tw-text-white tw-w-2.5 tw-h-2.5 tw-flex tw-items-center tw-justify-center" style={{fontSize: "6px"}}>{count}</span>
                </Link>
                </li>
            }
            {
              (user && !isAdmin) && <li className="tw-p-2 tw-cursor-pointer hover:tw-scale-125 tw-duration-700" title="Orders">
                  <Link to={`/myorders/${currentUser._id}`} className="tw-text-black">
                    <FaClockRotateLeft className="tw-w-[1.5rem] tw-h-[1.5rem]" />
                  </Link> 
                </li>
            }
            
            <li className="tw-p-2 tw-cursor-pointer hover:tw-scale-125 tw-duration-700" title="Login/Logout">
              {user ? (
                <button onClick={handleLogout}>
                  <FiLogOut className="tw-w-[1.5rem] tw-h-[1.5rem]" />
                </button>
              ) : (
                <Link to="/auth" className="tw-text-black">
                  <FiLogIn className="tw-w-[1.5rem] tw-h-[1.5rem]" />
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <div className={`${pageBG}`}>
        <Transition
          show={Open}
          enter="tw-transition tw-ease-out tw-duration-700 tw-transform"
          enterFrom="tw--translate-y-full tw-opacity-0"
          enterTo="tw-translate-y-0 tw-opacity-100"
          leave="tw-transition tw-ease-in tw-duration-500 tw-transform"
          leaveFrom="tw-translate-y-0 tw-opacity-100"
          leaveTo="tw--translate-y-full tw-opacity-0"
          className="tw-pt-4 "
        >
          <nav className="tw-mx-auto tw-w-[18rem] tw-rounded-lg tw-border-gray-200">
            <ul className="tw-mb-0">
              {
                user && <li className="tw-flex tw-gap-2 tw-items-center tw-justify-start tw-pl-5 tw-p-2 tw-cursor-pointer hover:tw-bg-gray-400 tw-bg-gradient-to-r tw-from-green-300 tw-to-blue-300 hover:tw-from-sky-300 hover:tw-to-teal-300 tw-font-bold tw-border-b tw-border-gray-200 tw-rounded-t-lg"
                title="Username"
                >
                  Hi, {currentUser.username}
                  <FiUser />
                </li>
              }
              <Link to="/auth" className="tw-text-black tw-no-underline" onClick={user && {handleLogout}}>
                <li className={`${!user && 'tw-rounded-t-lg'} tw-flex tw-gap-2 tw-items-center tw-justify-start tw-pl-5 tw-p-2 tw-cursor-pointer hover:tw-bg-gray-400 tw-bg-gradient-to-r tw-from-green-300 tw-to-blue-300 hover:tw-from-sky-300 hover:tw-to-teal-300 tw-font-bold tw-border-b tw-border-gray-200`}
                title="Login/Logout"
                >
                  Login/Logout
                  <FiLogIn />
                </li>
              </Link>
              <Link to="/search" className="tw-text-black tw-no-underline">
                <li className="tw-flex tw-gap-2 tw-items-center tw-justify-start tw-pl-5 tw-p-2 tw-cursor-pointer hover:tw-bg-gray-400 tw-bg-gradient-to-r tw-from-green-300 tw-to-blue-300 hover:tw-from-sky-300 hover:tw-to-teal-300 tw-font-bold tw-border-b tw-border-gay-200"
                title="Products"
                >
                  Products
                  <HiMiniSquares2X2 />
                </li>
              </Link>
              {(user && !isAdmin) && 
                <Link to={`/mycart/${currentUser._id}`} className="tw-text-black tw-no-underline">
                  <li className="tw-flex tw-gap-2 tw-items-center tw-justify-start tw-pl-5 tw-p-2 tw-cursor-pointer hover:tw-bg-gray-400 tw-bg-gradient-to-r tw-from-green-300 tw-to-blue-300 hover:tw-from-sky-300 hover:tw-to-teal-300 tw-font-bold tw-border-b tw-border-gay-200"
                  title="Cart">
                  Cart <FaCartShopping />
                  </li>
                </Link>
              }
              {(user && !isAdmin) && 
                <Link to={`/myorders/${currentUser._id}`} className="tw-text-black tw-no-underline">
                  <li className="tw-flex tw-gap-2 tw-items-center tw-justify-start tw-pl-5 tw-p-2 tw-cursor-pointer hover:tw-bg-gray-400 tw-bg-gradient-to-r tw-from-green-300 tw-to-blue-300 hover:tw-from-sky-300 hover:tw-to-teal-300 tw-font-bold tw-rounded-b-lg"
              title="Orders"
              >
                Orders <FaClockRotateLeft />
                </li>
              </Link>
              }
            </ul>
          </nav>
        </Transition>
      </div>
    </>
  );
}

export default Header;
