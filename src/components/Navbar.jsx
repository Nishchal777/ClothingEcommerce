"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";
import Image from "next/image";

export default function Navbar({ topNavHeight = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const navbarRef = useRef(null);
  const menuRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navLinks = [
    {
      name: "Mens",
      href: "/mens",
      categories: [
        {
          title: "Topwear",
          items: ["T-Shirts", "Shirts", "Polos", "Kurtas", "Tank Tops"],
        },
        {
          title: "Bottomwear",
          items: ["Jeans", "Shorts", "Trousers", "Joggers"],
        },
        {
          title: "Footwear",
          items: ["Sneakers", "Sandals", "Loafers"],
        },
        {
          title: "Accessories",
          items: ["Wallets", "Watches", "Belts", "Caps"],
        },
      ],
    },
    {
      name: "Womens",
      href: "/womens",
      categories: [
        {
          title: "Topwear",
          items: ["Blouses", "Crop Tops", "Kurtis", "T-Shirts", "Shawls"],
        },
        {
          title: "Bottomwear",
          items: ["Skirts", "Trousers", "Jeans", "Palazzo", "Leggings"],
        },
        {
          title: "Ethnic",
          items: ["Sarees", "Lehengas", "Salwars"],
        },
        {
          title: "Accessories",
          items: ["Jewelry", "Bags", "Scarves"],
        },
      ],
    },
    {
      name: "Kids",
      href: "/kids",
      categories: [
        {
          title: "Boys",
          items: ["T-Shirts", "Shorts", "Sets", "Sweaters"],
        },
        {
          title: "Girls",
          items: ["Frocks", "Leggings", "Tops", "Gowns"],
        },
        {
          title: "Infants",
          items: ["Newborn Sets", "Softwear", "Bibs"],
        },
      ],
    },
    {
      name: "New Arrivals",
      href: "/new-arrivals",
      categories: [
        {
          title: "Mens",
          items: ["New Tees", "Latest Jeans", "Seasonal Jackets"],
        },
        {
          title: "Womens",
          items: ["Fresh Kurtis", "Trend Dresses", "Chic Bags"],
        },
        {
          title: "Kids",
          items: ["Cartoon Sets", "Festive Wear"],
        },
      ],
    },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeFixed = window.scrollY >= topNavHeight;
      if (shouldBeFixed !== isFixed) {
        setIsFixed(shouldBeFixed);
        window.dispatchEvent(new Event("navbar-change"));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [topNavHeight, isFixed]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!isClient) return null;

  return (
    <>
      {isFixed && (
        <div
          style={{
            height: `${navbarRef.current?.offsetHeight}px`,
            visibility: "hidden",
          }}
          aria-hidden="true"
        />
      )}
      <nav
        ref={navbarRef}
        className={`w-full shadow-sm bg-white text-gray-800 font-medium z-40
          ${isFixed ? "fixed top-0 left-0 right-0 animate-fadeIn" : "relative"}
          flex justify-between items-center px-4 md:px-10 lg:px-20 gap-4 transition-all duration-300`}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo1.png"
            alt="Brand Logo"
            width={180}
            height={50}
            className="object-contain py-1"
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex  text-sm uppercase relative  ">
          {navLinks.map((link) => (
            <li
              key={link.name}
              className="relative py-7 px-4 hover:text-orange-600 cursor-pointer"
              onMouseEnter={() => setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className={` transition font-bold ${
                  pathname === link.href ? "text-orange-600" : ""
                }`}
              >
                {link.name}
              </Link>

              {/* Dropdown */}
              {activeDropdown === link.name && (
                <div
                  className="absolute left-1/2 top-full transform -translate-x-1/2 bg-white shadow-md z-50 border border-gray-200 rounded-md animate-slideDown "
                  style={{ minWidth: "700px" }}
                >
                  <div className="px-8 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                      {link.categories.map((cat) => (
                        <div key={cat.title}>
                          <h4 className="text-base font-bold text-gray-800 mb-4">
                            {cat.title}
                          </h4>
                          <ul className="space-y-4 text-sm font-semibold text-gray-600">
                            {cat.items.map((item) => (
                              <li key={item}>
                                <Link
                                  href={`/${link.name.toLowerCase()}/${item
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`}
                                  className="hover:text-orange-600 transition"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Right: Search + Icons */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 pl-10 py-2 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <FaSearch className="absolute top-2.5 left-3 text-gray-400 text-sm" />
          </div>
          <Link
            href="/login"
            className="text-gray-700 text-2xl hover:text-orange-600"
          >
            <FaUser />
          </Link>
          <Link
            href="/cart"
            className="text-gray-700 text-2xl hover:text-orange-600"
          >
            <FaShoppingCart />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden text-2xl text-black"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg flex flex-col pt-20 space-y-6 lg:hidden z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          top: `${navbarHeight}px`,
          height: `calc(100vh - ${navbarHeight}px)`,
        }}
      >
        <button
          className="absolute top-5 right-5 text-3xl text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes />
        </button>
        <ul className="flex flex-col px-6 space-y-5 text-black text-base w-full">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`${
                  pathname === link.href ? "font-semibold" : ""
                } hover:text-orange-600`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/login" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          </li>
          <li>
            <Link href="/cart" onClick={() => setIsOpen(false)}>
              Cart
            </Link>
          </li>
        </ul>
        <div className="px-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 outline-none"
          />
        </div>
      </div>
    </>
  );
}
