import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const CategoryModal = ({ category, onClose }) => {
  const closeButtonRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    document.body.classList.add("modal-open");
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="category-modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="category-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-modal-title"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="category-modal-close"
          onClick={onClose}
          aria-label={t("modal.close")}
        >
          ×
        </button>
        <h2 id="category-modal-title">{category.name}</h2>
        <div className="category-modal-list-scroll">
          <ul className="category-product-list">
            {category.products.map((product) => (
              <li key={product.id} className="category-product-item">
                <span className="category-product-name">{product.name}</span>
                {product.description ? (
                  <span className="category-product-desc">
                    {product.description}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
