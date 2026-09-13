import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { href: "#home", id: "home", label: "Ana Sayfa" },
  { href: "#about", id: "about", label: "Hakkımızda" },
  { href: "#products", id: "products", label: "Ürünler" },
  { href: "#offer", id: "offer", label: "Teklif Al" },
  { href: "#contact", id: "contact", label: "İletişim" },
];

const Navbar = ({ activeSection, transparent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`navbar ${transparent ? "transparent" : ""} ${isOpen ? "nav-open" : ""}`}
    >
      <div className="navbar-container">
        <img src="/logo.png" alt="Türkan Kimya logosu" className="navbar-logo" />

        <button
          type="button"
          className="mobile-menu-icon"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={activeSection === link.id ? "active" : ""}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
