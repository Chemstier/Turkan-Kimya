import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaClipboardList,
  FaCommentDots,
} from "react-icons/fa";
import { categories } from "../data/categories";
import { company } from "../data/company";

const maxLength = 600;

const OfferForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    selectedProducts: [],
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (categoryName) => {
    setExpandedCategory((prev) =>
      prev === categoryName ? null : categoryName
    );
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "İsim gerekli";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Geçerli e-posta gerekli";
    }
    if (!form.phone.trim() || !/^[0-9+\s()-]{7,}$/.test(form.phone)) {
      newErrors.phone = "Telefon gerekli";
    }
    if (!form.message.trim()) newErrors.message = "Mesaj gerekli";
    if (form.selectedProducts.length === 0) {
      newErrors.selectedProducts = "En az bir ürün seçmelisiniz";
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
      setSubmitError(
        "Form henüz yapılandırılmadı. Formspree form ID'sini ekleyin."
      );
      return;
    }

    const selectedProductDetails = categories
      .flatMap((cat) =>
        cat.products
          .filter((p) => form.selectedProducts.includes(p.id))
          .map((p) => `- ${p.name} (${cat.name})`)
      )
      .join("\n");

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(company.formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          products: selectedProductDetails,
          _subject: "Teklif Talebi — Türkan Kimya",
          _replyto: form.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setSent(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        selectedProducts: [],
      });
      setExpandedCategory(null);
    } catch {
      setSubmitError(
        "Gönderim başarısız oldu. Lütfen daha sonra tekrar deneyin veya doğrudan e-posta gönderin."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="offer" className="section offer-section">
      <h2>Teklif Al</h2>
      <div className="offer-form-section">
        <img
          src="/Offer.jpg"
          alt="Teklif"
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
              <div className="offer-form-row">
                <label className="offer-form-label" htmlFor="offer-name">
                  <FaUser className="offer-form-icon" aria-hidden="true" />
                  <span>Adınız Soyadınız</span>
                </label>
                <input
                  id="offer-name"
                  type="text"
                  name="name"
                  placeholder="Adınız Soyadınız"
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? "error" : ""}
                />
                {errors.name && (
                  <span className="offer-form-error">{errors.name}</span>
                )}
              </div>
              <div className="offer-form-row">
                <label className="offer-form-label" htmlFor="offer-email">
                  <FaEnvelope className="offer-form-icon" aria-hidden="true" />
                  <span>E-posta</span>
                </label>
                <input
                  id="offer-email"
                  type="email"
                  name="email"
                  placeholder="E-posta"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <span className="offer-form-error">{errors.email}</span>
                )}
              </div>
              <div className="offer-form-row">
                <label className="offer-form-label" htmlFor="offer-phone">
                  <FaPhone className="offer-form-icon" aria-hidden="true" />
                  <span>Telefon</span>
                </label>
                <input
                  id="offer-phone"
                  type="tel"
                  name="phone"
                  placeholder="Telefon"
                  value={form.phone}
                  onChange={handleChange}
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && (
                  <span className="offer-form-error">{errors.phone}</span>
                )}
              </div>
              <div className="offer-form-row">
                <label className="offer-form-label" htmlFor="offer-message">
                  <FaCommentDots
                    className="offer-form-icon"
                    aria-hidden="true"
                  />
                  <span>Mesajınız</span>
                </label>
                <textarea
                  id="offer-message"
                  name="message"
                  placeholder="Mesajınız"
                  value={form.message}
                  onChange={handleChange}
                  className={errors.message ? "error" : ""}
                  style={{ resize: "none", height: "120px" }}
                />
                <div className="char-counter">
                  {remainingChars} karakter kaldı
                </div>
                {errors.message && (
                  <span className="offer-form-error">{errors.message}</span>
                )}
              </div>
              <button
                type="submit"
                className="offer-form-btn"
                disabled={submitting}
              >
                {submitting ? "Gönderiliyor..." : "Gönder"}
              </button>
              {submitError && (
                <span className="offer-form-error offer-submit-error">
                  {submitError}
                </span>
              )}
            </form>
          </div>
          <div className="offer-products-card">
            <div className="offer-form-label">
              <FaClipboardList className="offer-form-icon" aria-hidden="true" />
              <span>Ürün Seçimi</span>
              {form.selectedProducts.length > 0 && (
                <span className="selected-count">
                  ({form.selectedProducts.length} seçildi)
                </span>
              )}
            </div>
            <div className="offer-products-scroll-container">
              <div className="offer-products-scroll-list">
                {categories.map((category) => (
                  <div key={category.id} className="product-category-section">
                    <button
                      type="button"
                      className="product-category-header"
                      onClick={() => toggleCategory(category.name)}
                      aria-expanded={expandedCategory === category.name}
                    >
                      <span>{category.name}</span>
                      <span className="category-expand-icon">
                        {expandedCategory === category.name ? "−" : "+"}
                      </span>
                    </button>
                    <div
                      className={`product-category-content ${
                        expandedCategory === category.name ? "expanded" : ""
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
              <span className="offer-form-error">{errors.selectedProducts}</span>
            )}
          </div>
        </div>
        {sent && (
          <div className="offer-success" role="status">
            <h3>Talebiniz başarıyla iletildi!</h3>
            <p>En kısa sürede sizinle iletişime geçeceğiz.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OfferForm;
