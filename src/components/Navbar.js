import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinkIds = [
  { href: "#home", id: "home" },
  { href: "#about", id: "about" },
  { href: "#products", id: "products" },
  { href: "#offer", id: "offer" },
  { href: "#contact", id: "contact" },
];

const Navbar = ({ activeSection, transparent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`navbar ${transparent ? "transparent" : ""} ${isOpen ? "nav-open" : ""}`}
    >
      <div className="navbar-container">
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt={t("nav.logoAlt")}
          className="navbar-logo"
        />

        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          {navLinkIds.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={activeSection === link.id ? "active" : ""}
                onClick={closeMenu}
              >
                {t(`nav.${link.id}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <LanguageSwitcher />
          <button
            type="button"
            className="mobile-menu-icon"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={isOpen}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
