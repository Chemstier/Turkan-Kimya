import React, { useRef, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaClipboardList,
  FaCommentDots,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useCatalog } from "../data/useCatalog";
import { company } from "../data/company";
import TurnstileWidget from "./TurnstileWidget";

const maxLength = 600;

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
  selectedProducts: [],
};

const OfferForm = () => {
  const { t, i18n } = useTranslation();
  const catalog = useCatalog();
  const turnstileRef = useRef(null);
  const [form, setForm] = useState(emptyForm);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const turnstileEnabled = Boolean(company.turnstileSiteKey);

  const toggleCategory = (categoryId) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "name";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "email";
    }
    if (!form.phone.trim() || !/^[0-9+\s()-]{7,}$/.test(form.phone)) {
      newErrors.phone = "phone";
    }
    if (!form.message.trim()) newErrors.message = "message";
    if (form.selectedProducts.length === 0) {
      newErrors.selectedProducts = "selectedProducts";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const remainingChars = maxLength - form.message.length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > maxLength) return;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitError("");
  };

  const handleProductToggle = (productId) => {
    setForm((prev) => {
      const alreadySelected = prev.selectedProducts.includes(productId);
      return {
        ...prev,
        selectedProducts: alreadySelected
          ? prev.selectedProducts.filter((id) => id !== productId)
          : [...prev.selectedProducts, productId],
      };
    });
    setErrors((prev) => ({ ...prev, selectedProducts: undefined }));
    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (
      !company.formspreeEndpoint ||
      company.formspreeEndpoint.includes("YOUR_FORM_ID")
    ) {
      setSubmitError("notConfigured");
      return;
    }

    const gotchaValue = (
      honeypot ||
      (e.target.elements.namedItem("_gotcha")?.value ?? "")
    ).trim();

    if (gotchaValue) {
      setSent(true);
      setForm(emptyForm);
      setHoneypot("");
      setExpandedCategory(null);
      return;
    }

    if (turnstileEnabled && !turnstileToken) {
      setSubmitError("captchaRequired");
      return;
    }

    const selectedProductDetails = catalog
      .flatMap((cat) =>
        cat.products
          .filter((p) => form.selectedProducts.includes(p.id))
          .map((p) => `- ${p.name} (${cat.name})`)
      )
      .join("\n");

    setSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        products: selectedProductDetails,
        _subject: t("offer.subject"),
        _replyto: form.email,
        _gotcha: "",
      };

      if (turnstileEnabled) {
        payload["cf-turnstile-response"] = turnstileToken;
      }

      const response = await fetch(company.formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let details = "";
        try {
          details = JSON.stringify(await response.json()).toLowerCase();
        } catch {
          details = "";
        }
        if (
          details.includes("turnstile") ||
          details.includes("captcha") ||
          details.includes("cf-turnstile")
        ) {
          setSubmitError("captchaFailed");
        } else {
          setSubmitError("submitFailed");
        }
        turnstileRef.current?.reset();
        return;
      }

      setSent(true);
      setForm(emptyForm);
      setHoneypot("");
      setTurnstileToken("");
      setExpandedCategory(null);
      turnstileRef.current?.reset();
    } catch {
      setSubmitError("submitFailed");
      turnstileRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="offer" className="section offer-section">
      <h2>{t("offer.title")}</h2>
      <div className="offer-form-section">
        <img
          src={`${process.env.PUBLIC_URL}/Offer.jpg`}
          alt={t("offer.alt")}
          className="offer-image"
          loading="lazy"
        />
        <div className="offer-forms-container">
          <div className="offer-form-card">
            <form
              className="offer-form"
              onSubmit={handleSubmit}
              autoComplete="off"
              noValidate
            >
              <div className="offer-hp" aria-hidden="true" inert>
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>
              <div className="offer-form-row">
                <label className="offer-form-label" htmlFor="offer-name">
                  <FaUser className="offer-form-icon" aria-hidden="true" />
                  <span>{t("offer.name")}</span>
                </label>
                <input
                  id="offer-name"
                  type="text"
                  name="name"
                  placeholder={t("offer.name")}
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? "error" : ""}
                />
                {errors.name && (
                  <span className="offer-form-error">
                    {t(`offer.errors.${errors.name}`)}
                  </span>
                )}
              </div>
              <div className="offer-form-row">
                <label className="offer-form-label" htmlFor="offer-email">
                  <FaEnvelope className="offer-form-icon" aria-hidden="true" />
                  <span>{t("offer.email")}</span>
                </label>
                <input
                  id="offer-email"
                  type="email"
                  name="email"
                  placeholder={t("offer.email")}
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <span className="offer-form-error">
                    {t(`offer.errors.${errors.email}`)}
                  </span>
                )}
              </div>
              <div className="offer-form-row">
                <label className="offer-form-label" htmlFor="offer-phone">
                  <FaPhone className="offer-form-icon" aria-hidden="true" />
                  <span>{t("offer.phone")}</span>
                </label>
                <input
                  id="offer-phone"
                  type="tel"
                  name="phone"
                  placeholder={t("offer.phone")}
                  value={form.phone}
                  onChange={handleChange}
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && (
                  <span className="offer-form-error">
                    {t(`offer.errors.${errors.phone}`)}
                  </span>
                )}
              </div>
              <div className="offer-form-row">
                <label className="offer-form-label" htmlFor="offer-message">
                  <FaCommentDots
                    className="offer-form-icon"
                    aria-hidden="true"
                  />
                  <span>{t("offer.message")}</span>
                </label>
                <textarea
                  id="offer-message"
                  name="message"
                  placeholder={t("offer.message")}
                  value={form.message}
                  onChange={handleChange}
                  className={errors.message ? "error" : ""}
                  style={{ resize: "none", height: "120px" }}
                />
                <div className="char-counter">
                  {t("offer.charsRemaining", { count: remainingChars })}
                </div>
                {errors.message && (
                  <span className="offer-form-error">
                    {t(`offer.errors.${errors.message}`)}
                  </span>
                )}
              </div>
              {turnstileEnabled && (
                <TurnstileWidget
                  ref={turnstileRef}
                  siteKey={company.turnstileSiteKey}
                  language={(i18n.resolvedLanguage || i18n.language || "auto").split("-")[0]}
                  onToken={setTurnstileToken}
                />
              )}
              <button
                type="submit"
                className="offer-form-btn"
                disabled={submitting}
              >
                {submitting ? t("offer.submitting") : t("offer.submit")}
              </button>
              {submitError && (
                <span className="offer-form-error offer-submit-error">
                  {t(`offer.${submitError}`)}
                </span>
              )}
            </form>
          </div>
          <div className="offer-products-card">
            <div className="offer-form-label">
              <FaClipboardList className="offer-form-icon" aria-hidden="true" />
              <span>{t("offer.productSelect")}</span>
              {form.selectedProducts.length > 0 && (
                <span className="selected-count">
                  {t("offer.selectedCount", {
                    count: form.selectedProducts.length,
                  })}
                </span>
              )}
            </div>
            <div className="offer-products-scroll-container">
              <div className="offer-products-scroll-list">
                {catalog.map((category) => (
                  <div key={category.id} className="product-category-section">
                    <button
                      type="button"
                      className="product-category-header"
                      onClick={() => toggleCategory(category.id)}
                      aria-expanded={expandedCategory === category.id}
                    >
                      <span>{category.name}</span>
                      <span className="category-expand-icon">
                        {expandedCategory === category.id ? "−" : "+"}
                      </span>
                    </button>
                    <div
                      className={`product-category-content ${
                        expandedCategory === category.id ? "expanded" : ""
                      }`}
                    >
                      {category.products.map((product) => (
                        <label
                          key={product.id}
                          className="offer-product-checkbox"
                        >
                          <input
                            type="checkbox"
                            checked={form.selectedProducts.includes(product.id)}
                            onChange={() => handleProductToggle(product.id)}
                          />
                          <div className="offer-product-info">
                            <span className="offer-product-name">
                              {product.name}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {errors.selectedProducts && (
              <span className="offer-form-error">
                {t(`offer.errors.${errors.selectedProducts}`)}
              </span>
            )}
          </div>
        </div>
        {sent && (
          <div className="offer-success" role="status">
            <h3>{t("offer.successTitle")}</h3>
            <p>{t("offer.successBody")}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OfferForm;
