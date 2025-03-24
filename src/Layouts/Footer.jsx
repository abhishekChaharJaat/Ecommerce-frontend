import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-4">ShopSphere</h2>
            <p className="text-sm text-gray-300">
              Your one-stop shop for the latest trends in fashion, electronics,
              and more.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/products"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/categories"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="/deals"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Deals
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="mailto:support@shopsphere.com"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                <FaEnvelope className="w-6 h-6" />
              </a>
            </div>
            <p className="text-sm text-gray-300">
              Contact: support@shopsphere.com
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ShopSphere. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
