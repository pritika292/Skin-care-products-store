import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; 

function Footer() {
  return (
    <div className="tw-w-full tw-bg-[#eae6aded] tw-py-2 tw-text-center sm:hidden">
      <div className="tw-flex tw-justify-center tw-gap-4">
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="tw-w-6 tw-h-6 tw-text-gray-600 hover:tw-text-blue-500" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="tw-w-6 tw-h-6 tw-text-gray-600 hover:tw-text-blue-400" />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="tw-w-6 tw-h-6 tw-text-gray-600 hover:tw-text-pink-500" />
        </a>
      </div>
      <p className="tw-mt-1 tw-text-gray-600">
        &copy; {2023} Skin Care Hub
      </p>
    </div>
  );
}

export default Footer;
