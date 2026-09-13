import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { categories } from "./categories";

export function useCatalog() {
  const { t, i18n } = useTranslation();

  return useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        name: t(`catalog.${category.id}.name`),
        products: category.products.map((product) => ({
          ...product,
          name: t(`catalog.${category.id}.products.${product.id}.name`),
          description: t(
            `catalog.${category.id}.products.${product.id}.description`,
            { defaultValue: "" }
          ),
        })),
      })),
    [t, i18n.language]
  );
}
