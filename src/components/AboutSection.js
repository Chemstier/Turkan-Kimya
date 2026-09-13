import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { company } from "../data/company";

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="about-section">
      <img
        src={`${process.env.PUBLIC_URL}/about_us.jpg`}
        alt={t("about.alt")}
        className="about-section-image"
        loading="lazy"
      />
      <div className="about-section-content">
        <h2>{t("about.title")}</h2>
        <p>
          <Trans
            i18nKey="about.p1"
            values={{ name: company.shortName }}
            components={{ highlight: <span className="about-highlight" /> }}
          />
          <br />
          <br />
          {t("about.p2")}
          <br />
          <br />
          {t("about.p3")}
          <br />
          <br />
          <span className="about-cta">{t("about.cta")}</span>
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
