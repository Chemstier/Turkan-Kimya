import React from "react";
import { company } from "../data/company";

const Footer = () => (
  <footer className="footer">
    <p>
      ©{new Date().getFullYear()} | {company.shortName} | Tüm hakları saklıdır.
    </p>
  </footer>
);

export default Footer;
