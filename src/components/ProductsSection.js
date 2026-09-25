import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCatalog } from "../data/useCatalog";
import CategoryModal from "./CategoryModal";

const ProductsSection = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const { t } = useTranslation();
  const catalog = useCatalog();
  const selectedCategory =
    catalog.find((category) => category.id === selectedCategoryId) || null;
  const closeModal = useCallback(() => setSelectedCategoryId(null), []);

  return (
    <section id="products" className="section products-section">
      <h2>{t("products.title")}</h2>
      <div className="categories-grid">
        {catalog.map((category) => (
          <button
            type="button"
            key={category.id}
            className="category-card"
            onClick={() => setSelectedCategoryId(category.id)}
          >
            <div className="category-image-wrapper">
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
                loading="lazy"
              />
            </div>
            <div className="category-name">{category.name}</div>
          </button>
        ))}
      </div>
      {selectedCategory && (
        <CategoryModal
          category={selectedCategory}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default ProductsSection;
