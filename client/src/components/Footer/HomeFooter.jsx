import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function HomeFooter() {
  return (
    <div className="tw-bg-[#eae6aded] tw-py-20 tw-px-10 md:tw-px-20 tw-text-center tw-grid md:tw-grid-cols-3">

      <div className="tw-flex tw-flex-col tw-items-center tw-mb-4">
        <a href="/home" className="tw-text-gray-600 hover:tw-text-green-500 tw-no-underline tw-justify-center">
          <img src="logo.jpg" alt="Logo" className="tw-w-60 tw-h-60 tw-mb-2" />
          <h2 className="tw-mb-2">Skin Care Hub</h2>
        </a>
      </div>

      <div className="tw-flex tw-flex-col tw-justify-evenly">
        <a href="/register" className="tw-text-gray-600 hover:tw-text-green-500 tw-mb-1">
          Register
        </a>
        <a href="/login" className="tw-text-gray-600 hover:tw-text-green-500">
          Login
        </a>
        <a href="/" className="tw-text-gray-600 hover:tw-text-green-500 tw-mb-2">
          Privacy Policy
        </a>
        <a href="/" className="tw-text-gray-600 hover:tw-text-green-500">
          Terms & Conditions
        </a>
      </div>

      <div className="tw-flex tw-flex-col tw-justify-evenly">
        <a href="/learn-more" className="tw-text-gray-600 hover:tw-text-green-500 tw-mb-2">
          Learn More
        </a>
        <a href="/" className="tw-text-gray-600 hover:tw-text-green-500">
          Contact Us
        </a>
        <a href="/" className="tw-text-gray-600 hover:tw-text-green-500">
          Countries & Regions
        </a>
        <a href="/" className="tw-text-gray-600 hover:tw-text-green-500">
          FAQ
        </a>
      </div>

      <div className="tw-w-full tw-flex tw-flex-col md:flex-row tw-justify-center tw-items-center tw-mt-4 md:mt-0">
        <div className="tw-flex tw-gap-4">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="tw-w-6 tw-h-6 tw-text-gray-600 hover:tw-text-blue-500" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="tw-w-6 tw-h-6 tw-text-gray-600 hover:tw-text-blue-300" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="tw-w-6 tw-h-6 tw-text-gray-600 hover:tw-text-pink-500" />
          </a>
        </div>

        <p className="tw-mt-2 tw-text-gray-600">
          &copy; {2023} Skin Care Hub
        </p>
      </div>
    </div>
  );
}

export default HomeFooter;
