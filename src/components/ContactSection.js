import React from "react";
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { company } from "../data/company";

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="section contact-section">
      <h2>{t("contact.title")}</h2>
      <div className="contact-card">
        <div className="contact-card-info">
          <div className="contact-card-row">
            <FaPhone className="contact-card-icon" aria-hidden="true" />
            <span className="contact-card-label">{t("contact.phone")}</span>
            <a className="contact-card-value" href={company.phoneHref}>
              {company.phone}
            </a>
          </div>
          <div className="contact-card-row">
            <FaEnvelope className="contact-card-icon" aria-hidden="true" />
            <span className="contact-card-label">{t("contact.email")}</span>
            <a
              className="contact-card-value"
              href={`mailto:${company.email}`}
            >
              {company.email}
            </a>
          </div>
          <div className="contact-card-row">
            <FaClock className="contact-card-icon" aria-hidden="true" />
            <span className="contact-card-label">{t("contact.hours")}</span>
            <span className="contact-card-value" dir="ltr">{company.hours}</span>
          </div>
          <div className="contact-card-row">
            <FaMapMarkerAlt className="contact-card-icon" aria-hidden="true" />
            <span className="contact-card-label">{t("contact.address")}</span>
            <span className="contact-card-value" dir="ltr">{company.address}</span>
          </div>
        </div>
        <div className="contact-card-map">
          <iframe
            title={t("contact.mapTitle")}
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
};

export default ContactSection;
