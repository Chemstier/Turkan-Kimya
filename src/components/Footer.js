import React from "react";
import { useTranslation } from "react-i18next";
import { company } from "../data/company";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <p>
        {t("footer.copyright", {
          year: new Date().getFullYear(),
          name: company.shortName,
        })}
      </p>
    </footer>
  );
};

export default Footer;
