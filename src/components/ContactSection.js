import React from "react";
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { company } from "../data/company";

const ContactSection = () => (
  <section id="contact" className="section contact-section">
    <h2>İletişim</h2>
    <div className="contact-card">
      <div className="contact-card-info">
        <div className="contact-card-row">
          <FaPhone className="contact-card-icon" aria-hidden="true" />
          <span className="contact-card-label">Telefon:</span>
          <a className="contact-card-value" href={company.phoneHref}>
            {company.phone}
          </a>
        </div>
        <div className="contact-card-row">
          <FaEnvelope className="contact-card-icon" aria-hidden="true" />
          <span className="contact-card-label">E-Posta:</span>
          <a
            className="contact-card-value"
            href={`mailto:${company.email}`}
          >
            {company.email}
          </a>
        </div>
        <div className="contact-card-row">
          <FaClock className="contact-card-icon" aria-hidden="true" />
          <span className="contact-card-label">Çalışma Saatleri:</span>
          <span className="contact-card-value">{company.hours}</span>
        </div>
        <div className="contact-card-row">
          <FaMapMarkerAlt className="contact-card-icon" aria-hidden="true" />
          <span className="contact-card-label">Adres:</span>
          <span className="contact-card-value">{company.address}</span>
        </div>
      </div>
      <div className="contact-card-map">
        <iframe
          title="Firma Konumu"
          src={company.mapEmbedUrl}
          width="100%"
          height="220"
          style={{ border: 0, borderRadius: "12px" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </section>
);

export default ContactSection;
