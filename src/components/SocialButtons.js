import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { company } from "../data/company";

const SocialButtons = () => (
  <div className="social-buttons">
    <a
      href={company.social.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="social-button instagram"
      aria-label="Instagram"
    >
      <FaInstagram />
    </a>
    <a
      href={company.social.facebook}
      target="_blank"
      rel="noopener noreferrer"
      className="social-button facebook"
      aria-label="Facebook"
    >
      <FaFacebookF />
    </a>
    <a
      href={company.social.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="social-button linkedin"
      aria-label="LinkedIn"
    >
      <FaLinkedinIn />
    </a>
    <a
      href={company.social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="social-button whatsapp"
      aria-label="WhatsApp"
    >
      <FaWhatsapp />
    </a>
  </div>
);

export default SocialButtons;
