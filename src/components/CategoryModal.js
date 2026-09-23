import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const CategoryModal = ({ category, onClose }) => {
  const closeButtonRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;

    body.classList.add("modal-open");
    html.classList.add("modal-open");
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    closeButtonRef.current?.focus();

    const isInsideModalList = (target) => {
      const scrollable = document.querySelector(".category-modal-list-scroll");
      return Boolean(
        scrollable && (scrollable === target || scrollable.contains(target))
      );
    };

    const preventBackgroundScroll = (event) => {
      if (!isInsideModalList(event.target)) {
        event.preventDefault();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("touchmove", preventBackgroundScroll, {
      passive: false,
    });
    document.addEventListener("wheel", preventBackgroundScroll, {
      passive: false,
    });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      body.classList.remove("modal-open");
      html.classList.remove("modal-open");
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
      document.removeEventListener("touchmove", preventBackgroundScroll);
      document.removeEventListener("wheel", preventBackgroundScroll);
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
