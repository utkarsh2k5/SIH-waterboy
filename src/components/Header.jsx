import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between items-center py-4 px-4 lg:px-20">
      <h1
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
        className="text-3xl md:text-4xl lg:text-5xl font-light m-0"
      >
        WATERBOY
      </h1>

      {/* Desktop navigation */}
      <nav
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1000"
        className="hidden md:flex items-center gap-12"
      >
        <a
          className="text-base tracking-wider transition-colors hover:text-gray-300"
          href="#"
        >
          HOME
        </a>
        <a
          className="text-base tracking-wider transition-colors hover:text-gray-300"
          href="#"
        >
          ABOUT
        </a>
        <a
          className="text-base tracking-wider transition-colors hover:text-gray-300"
          href="#"
        >
          CONTACT
        </a>
        <a
          className="text-base tracking-wider transition-colors hover:text-gray-300"
          href="#"
        >
          GITHUB
        </a>
      </nav>

      {/* Sign-in and login buttons (desktop only) */}
      <div className="hidden md:flex gap-2">
        <button className="bg-[#a7a7a7] text-black py-3 px-8 rounded-full font-medium transition-all duration-500 hover:bg-white cursor-pointer">
          SIGN-IN
        </button>
        <button className="bg-[#a7a7a7] text-black py-3 px-8 rounded-full font-medium transition-all duration-500 hover:bg-white cursor-pointer">
          LOGIN
        </button>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden text-3xl p-2 z-50"
      >
        <i className={`bx ${isMenuOpen ? "bx-x" : "bx-menu"}`}></i>
      </button>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed top-16 bottom-0 right-0 left-0 p-5 md:hidden z-40 bg-black bg-opacity-70 backdrop-blur-md">
          <nav className="flex flex-col gap-6 items-center">
            <a
              className="text-base tracking-wider transition-colors hover:text-gray-300"
              href="#"
            >
              HOME
            </a>
            <a
              className="text-base tracking-wider transition-colors hover:text-gray-300"
              href="#"
            >
              ABOUT
            </a>
            <a
              className="text-base tracking-wider transition-colors hover:text-gray-300"
              href="#"
            >
              CONTACT
            </a>
            <a
              className="text-base tracking-wider transition-colors hover:text-gray-300"
              href="#"
            >
              GIT-HUB
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
