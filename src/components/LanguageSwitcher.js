import React, { useEffect, useRef, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { changeLanguage, SUPPORTED_LANGUAGES } from "../i18n";

const LABELS = { tr: "TR", en: "EN", de: "DE", ar: "AR" };

const LanguageSwitcher = ({ className = "" }) => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const current = (i18n.resolvedLanguage || i18n.language || "tr").split("-")[0];

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const selectLanguage = (lang) => {
    changeLanguage(lang);
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className={`language-switcher ${className}`.trim()}
      dir="ltr"
    >
      <button
        type="button"
        className="language-switcher-toggle"
        aria-label={t("nav.language")}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <FaGlobe aria-hidden="true" />
      </button>
      {open && (
        <ul className="language-switcher-menu" role="menu">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <li key={lang} role="none">
              <button
                type="button"
                role="menuitem"
                className={current === lang ? "active" : ""}
                onClick={() => selectLanguage(lang)}
                lang={lang}
              >
                {LABELS[lang] || lang.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
