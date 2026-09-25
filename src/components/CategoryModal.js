import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function canScrollElement(element, deltaY) {
  if (!element) return false;
  const { scrollTop, scrollHeight, clientHeight } = element;
  if (scrollHeight <= clientHeight + 1) return false;
  if (deltaY < 0 && scrollTop > 0) return true;
  if (deltaY > 0 && scrollTop + clientHeight < scrollHeight - 1) return true;
  return false;
}

const CategoryModal = ({ category, onClose }) => {
  const closeButtonRef = useRef(null);
  const listRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const { t } = useTranslation();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyLeft = body.style.left;
    const previousBodyRight = body.style.right;
    const previousBodyWidth = body.style.width;
    const previousBodyTouchAction = body.style.touchAction;

    body.classList.add("modal-open");
    html.classList.add("modal-open");
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.touchAction = "none";

    closeButtonRef.current?.focus();

    const preventIfBackground = (event, deltaY) => {
      const list = listRef.current;
      const target = event.target;
      const insideList = Boolean(list && (list === target || list.contains(target)));

      // Allow scrolling only when the product list can still move in that direction.
      if (insideList && canScrollElement(list, deltaY)) {
        return;
      }

      event.preventDefault();
    };

    const handleWheel = (event) => {
      preventIfBackground(event, event.deltaY);
    };

    let lastTouchY = 0;
    const handleTouchStart = (event) => {
      if (event.touches.length === 1) {
        lastTouchY = event.touches[0].clientY;
      }
    };

    const handleTouchMove = (event) => {
      if (event.touches.length !== 1) {
        event.preventDefault();
        return;
      }
      const currentY = event.touches[0].clientY;
      const deltaY = lastTouchY - currentY;
      lastTouchY = currentY;
      preventIfBackground(event, deltaY);
    };

    const handleKeyDown = (event) => {
      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      if (keys.includes(event.key)) {
        const list = listRef.current;
        const active = document.activeElement;
        const insideList = Boolean(
          list && (list === active || list.contains(active) || list.contains(event.target))
        );
        if (!insideList) {
          event.preventDefault();
        }
      }
      if (event.key === "Escape") onCloseRef.current();
    };

    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      body.classList.remove("modal-open");
      html.classList.remove("modal-open");
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.left = previousBodyLeft;
      body.style.right = previousBodyRight;
      body.style.width = previousBodyWidth;
      body.style.touchAction = previousBodyTouchAction;
      window.scrollTo(0, scrollY);
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className="category-modal-overlay"
      onClick={() => onCloseRef.current()}
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
          onClick={() => onCloseRef.current()}
          aria-label={t("modal.close")}
        >
          ×
        </button>
        <h2 id="category-modal-title">{category.name}</h2>
        <div ref={listRef} className="category-modal-list-scroll" tabIndex={0}>
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
