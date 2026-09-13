import React, { useState } from "react";
import { categories } from "../data/categories";
import CategoryModal from "./CategoryModal";

const ProductsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <section id="products" className="section products-section">
      <h2>Ürünlerimiz</h2>
      <p className="products-section-desc">
        12 farklı kategoride modern ve kaliteli ürünlerimizle hizmetinizdeyiz.
      </p>
      <div className="categories-grid">
        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            className="category-card"
            onClick={() => setSelectedCategory(category)}
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
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </section>
  );
};

export default ProductsSection;
