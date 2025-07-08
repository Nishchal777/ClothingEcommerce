import React from "react";
import Link from "next/link";

function TopNav() {
  return (
    <div className="hidden top-0 left-0 w-full z-50 h-10 lg:flex flex-col lg:flex-row  lg:justify-around  bg-orange-500 p-2 text-white  md:text-xs text-xs font-semibold">
      <ul className=" flex flex-row flex-wrap items-center justify-center text-xs  opacity-90 gap-3 md:gap-5 px-4 mb-2 lg:mb-0">
        <li className="flex items-center gap-1 ">
          <a href="/about">
            <div className="flex flex-row gap-1">About Us</div>
          </a>
        </li>
        <li className="text-white hidden md:inline">|</li>
        <li className="flex items-center gap-1">
          <a href="/#">
            <div className="flex flex-row gap-1">
              <button className="cursor-pointer">FAQ's</button>
            </div>
          </a>
        </li>
        <li className="text-white hidden md:inline">|</li>
        <li className="flex items-center gap-1">
          <Link href="#" target="_blank">
            Blog
          </Link>
        </li>
      </ul>
      <ul className=" flex flex-row flex-wrap items-center justify-center text-xs  opacity-90 gap-3 md:gap-5 px-4 mb-2 lg:mb-0">
        <li className="flex items-center gap-1 ">
          <a href="">
            <div className="flex flex-row gap-1">
              Customer Services: +9864832535
            </div>
          </a>
        </li>
        <li className="text-white hidden md:inline">|</li>
        <li className="flex items-center gap-1">
          <a href="mailto:info@nischal.com">
            <div className="flex flex-row gap-1">
              <button className="cursor-pointer">info@nischal.com</button>
            </div>
          </a>
        </li>
        <li className="text-white hidden md:inline">|</li>
        <li className="flex items-center gap-1">
          <Link
            href="https://maps.app.goo.gl/irBNRaEVVndgTpUx9"
            target="_blank"
          >
            Kathmandu, Nepal
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default TopNav;
