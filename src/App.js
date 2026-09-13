import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import useScreenSize from "./useScreenSize";
import { BrowserView, MobileView } from 'react-device-detect';
import { 
  FaUser, FaEnvelope, FaPhone, FaClipboardList, FaCommentDots, 
  FaClock, FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn,
  FaBars, FaTimes // Added these icons
} from "react-icons/fa";

// --- DATA ---
const categories = [
  {
    id: "cat1", name: "Nişastalar", image: "/Starches.jpg",
    products: [
      { id: 1, name: "Mısır Nişastası", description: "" },
      { id: 2, name: "Buğday Nişastası", description: "" },
      { id: 3, name: "Glutensiz Buğday Nişastası", description: "" },
      { id: 4, name: "Patates Nişastası", description: "" },
      { id: 5, name: "Tapyoka Nişasta", description: "" },
      { id: 6, name: "Waxy Tapyoka Nişasta", description: "" },
      { id: 7, name: "Prejel Nişasta", description: "" },
      { id: 8, name: "Modifiye Nişasta", description: "" }
    ]
  },
  {
    id: "cat2", name: "Tatlandırıcılar", image: "/Sweeteners.avif",
    products: [
      { id: 51, name: "Aspartam", description: "" },
      { id: 52, name: "Asesülfam K", description: "" },
      { id: 53, name: "Sodyum Siklamat", description: "" },
      { id: 54, name: "Sodyum Sakkarin", description: "" },
      { id: 55, name: "Sükraloz", description: "" },
      { id: 56, name: "Ksilitol", description: "" },
      { id: 57, name: "Maltitol", description: "" },
      { id: 58, name: "Mannitol", description: "" },
      { id: 59, name: "Sorbitol %70", description: "" },
      { id: 60, name: "Sorbitol Toz", description: "" },
      { id: 61, name: "Fruktoz", description: "" },
      { id: 62, name: "Monc Fruit", description: "" },
      { id: 63, name: "Eritritol", description: "" },
      { id: 64, name: "Stevia", description: "" },
      { id: 65, name: "Tatlandırıcı Mix", description: "" },
      { id: 66, name: "Maltodekstrin", description: "" },
      { id: 67, name: "Dextroz", description: "" },
      { id: 68, name: "Polidextroz", description: "" },
      { id: 69, name: "Toz Fruktoz", description: "" }
    ]
  },
  {
    id: "cat3", name: "Jelleştirici ve Kıvam Vericiler", image: "Thickener.jpg",
    products: [
      { id: 101, name: "Sodyum Aljinat", description: "" },
      { id: 102, name: "Agar Agar", description: "" },
      { id: 103, name: "Jelatin", description: "" },
      { id: 104, name: "Karragenan", description: "" },
      { id: 105, name: "Locust Bean Gum", description: "" },
      { id: 106, name: "Guar Gum", description: "" },
      { id: 107, name: "Gum Arabik", description: "" },
      { id: 108, name: "Pektin", description: "" },
      { id: 109, name: "Ksantan Gum", description: "" },
      { id: 110, name: "Karboksi metil Selüloz", description: "CMC" },
      { id: 111, name: "Metil Selüloz", description: "" },
      { id: 112, name: "Hidroksi Propil Metil Selüloz", description: "" },
      { id: 113, name: "Konjac Gum", description: "" }
    ]
  },
  {
    id: "cat4", name: "Sentetik Renklendiriciler", image: "Colorant.jpg",
    products: [
      { id: 151, name: "Tartrazin", description: "" },
      { id: 152, name: "Quinoline Yellow", description: "" },
      { id: 153, name: "Sunset Yellow", description: "" },
      { id: 154, name: "Karmozin", description: "" },
      { id: 155, name: "Ponceau 4R", description: "" },
      { id: 156, name: "Eritrozin", description: "" },
      { id: 157, name: "Allura Red", description: "" },
      { id: 158, name: "İndigo Karmin", description: "" },
      { id: 159, name: "Brilliant Blue", description: "" },
      { id: 160, name: "Pea Green", description: "" },
      { id: 161, name: "Black Pn", description: "" },
      { id: 162, name: "Chocolate Brown", description: "" },
      { id: 163, name: "Dark Brown", description: "" },
      { id: 164, name: "Titanyum Dioksit", description: "" }
    ]
  },
  {
    id: "cat5", name: "Doğal Renklendiriciler", image: "Natural_Colorant.jpg",
    products: [
      { id: 201, name: "Beta Karoten", description: "" },
      { id: 202, name: "Turmerik", description: "" },
      { id: 203, name: "Karmin", description: "" },
      { id: 204, name: "Bakır Klorofil", description: "" },
      { id: 205, name: "Karamel Sıvı/Toz", description: "" },
      { id: 206, name: "Carbon Black", description: "" },
      { id: 207, name: "Paprika Oleoresin", description: "" },
      { id: 208, name: "Annatto", description: "" },
      { id: 209, name: "Likopen", description: "" },
      { id: 210, name: "Lutein", description: "" },
      { id: 211, name: "Red Beet", description: "" },
      { id: 212, name: "Black Carrot", description: "" },
      { id: 213, name: "Hibiscus", description: "" }
    ]
  },
  {
    id: "cat6", name: "Koruyucular", image: "Preservatives.jpg",
    products: [
      { id: 251, name: "Sodyum Silikat", description: "" },
      { id: 252, name: "Metil Paraben", description: "" },
      { id: 253, name: "Propil Paraben", description: "" },
      { id: 254, name: "Povidon İyot", description: "" },
      { id: 255, name: "Triklosan", description: "" },
      { id: 256, name: "Klorheksidin", description: "" },
      { id: 257, name: "Kalsiyum Propiyonat", description: "" },
      { id: 258, name: "Enkapsül Sorbik Asit", description: "" },
      { id: 259, name: "Sorbik Asit", description: "" },
      { id: 260, name: "Malik Asit", description: "" },
      { id: 261, name: "Sodyum Benzoat", description: "" },
      { id: 262, name: "Potasyum Sorbat", description: "" },
      { id: 263, name: "Sitrik Asit", description: "" },
      { id: 264, name: "Sodyum Metabisülfit", description: "" },
      { id: 265, name: "Sodyum Diasetat", description: "" }
    ]
  },
  {
    id: "cat7", name: "Asitler", image: "Acidifiers.jpg",
    products: [
      { id: 301, name: "Coco Yağı Asiti", description: "" },
      { id: 302, name: "Fosforik Asit", description: "" },
      { id: 303, name: "Formik Asit", description: "" },
      { id: 304, name: "Fosforuz Asit", description: "" },
      { id: 305, name: "Hidroklorik Asit", description: "" },
      { id: 306, name: "Hidrojen Peroksit (%35, %50)", description: "" },
      { id: 307, name: "Nitrik Asit", description: "" },
      { id: 308, name: "Oksalik Asit", description: "" },
      { id: 309, name: "Oleik Asit", description: "" },
      { id: 310, name: "Steraik Asit", description: "" },
      { id: 311, name: "Salisilik Asit", description: "" },
      { id: 312, name: "Tartarik Asit", description: "" },
      { id: 313, name: "Naftalen Sülfonat", description: "" },
      { id: 314, name: "LABSA", description: "" }
    ]
  },
  {
    id: "cat8", name: "Emülgatörler ve Yüzey Aktifler", image: "Emulsifiers.png",
    products: [
      { id: 351, name: "PEG 40-60-6000", description: "" },
      { id: 352, name: "Polisorbat 20-60-80", description: "" },
      { id: 353, name: "GMS 45-60-90", description: "" },
      { id: 354, name: "Hint Yağı", description: "" },
      { id: 355, name: "SLES %70", description: "" },
      { id: 356, name: "BETAİN %35 - %45", description: "" },
      { id: 357, name: "Cocodiethanolamide", description: "" },
      { id: 358, name: "Cocomonoethanolamide", description: "" },
      { id: 359, name: "Sedef", description: "" },
      { id: 360, name: "Opaklaştırıcı", description: "" },
      { id: 361, name: "Decyl Glucoside", description: "" },
      { id: 362, name: "NP 10", description: "" },
      { id: 363, name: "Köpük Kesiciler Sıvı-Toz", description: "" },
      { id: 364, name: "Ayçiçek Lestin", description: "" },
      { id: 365, name: "Soya Lestin", description: "" },
      { id: 366, name: "Sorbitan Tri Stearat", description: "" },
      { id: 367, name: "Polyglycerol Polyricinoleate", description: "PGPR" }
    ]
  },
  {
    id: "cat9", name: "Kakao Ürünleri", image: "Cocoa.avif",
    products: [
      { id: 401, name: "Naturel Kakao Tozu", description: "" },
      { id: 402, name: "Alkalize Kakao Tozu", description: "" },
      { id: 403, name: "Kakao Yağı", description: "" },
      { id: 404, name: "Kakao Kitlesi/Likörü", description: "" }
    ]
  },
  {
    id: "cat10", name: "Ekstraktlar", image: "Extract.webp",
    products: [
      { id: 451, name: "Yaban Mersini Ekstraktı", description: "" },
      { id: 452, name: "Siyah Çay Ekstraktı", description: "" },
      { id: 453, name: "Sarımsak Ekstraktı", description: "" },
      { id: 454, name: "Üzüm Çekirdeği Ekstraktı", description: "" },
      { id: 455, name: "Yeşil Fasulye Ekstraktı", description: "" },
      { id: 456, name: "Guarana Ekstraktı", description: "" },
      { id: 457, name: "Maya Ekstraktı", description: "" },
      { id: 458, name: "Pancar Kökü Ekstraktı", description: "" },
      { id: 459, name: "Capaicum Oleoresin", description: "" },
      { id: 460, name: "Ginseng Panax", description: "" }
    ]
  },
  {
    id: "cat11", name: "Süt Ürünleri", image: "Dairy.png",
    products: [
      { id: 501, name: "Yağsız Süt Tozu", description: "" },
      { id: 502, name: "Tam Yağlı Süt Tozu", description: "" },
      { id: 503, name: "PST", description: "" },
      { id: 504, name: "Demineralize PST %70", description: "DSPT %70" },
      { id: 505, name: "Laktoz", description: "" },
      { id: 506, name: "Stabilizör", description: "" },
      { id: 507, name: "Küf-maya-mantar önleyici", description: "" }
    ]
  },
  {
    id: "cat12", name: "Diğer", image: "Other.jpg",
    products: [
      { id: 521, name: "Kafein", description: "" },
      { id: 522, name: "Yumurta Akı Tozu", description: "" },
      { id: 523, name: "Yumurta Sarısı Tozu", description: "" },
      { id: 524, name: "Bütün Yumurta Tozu", description: "" },
      { id: 525, name: "MCT Oil", description: "" },
      { id: 526, name: "Kakao", description: "" },
      { id: 527, name: "Kahve Kreması", description: "" },
      { id: 528, name: "Yarım Yağlı Süt Tozu", description: "" },
      { id: 529, name: "DPST", description: "" },
      { id: 530, name: "Laktoz Monohidrat", description: "" },
      { id: 531, name: "PVP K30", description: "" },
      { id: 532, name: "PVP K90", description: "" },
      { id: 533, name: "PVP VA 64", description: "" },
      { id: 534, name: "Lanolin", description: "" },
      { id: 535, name: "D-Limonen", description: "" },
      { id: 536, name: "Capomer", description: "" }
    ]
  }
];

// --- COMPONENTS ---

// Mobile Navbar: Compact design with hamburger menu
const MobileNavbar = ({ activeSection, transparent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`mobile-navbar ${transparent ? "transparent" : ""} ${isOpen ? "nav-open" : ""}`}>
      <div className="mobile-navbar-container">
        <img src="/logo.png" alt="Firma Logosu" className="mobile-navbar-logo" />
        
        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`mobile-nav-menu ${isOpen ? "active" : ""}`}>
          <li>
            <a href="#home" className={activeSection === "home" ? "active" : ""} onClick={closeMenu}>Ana Sayfa</a>
          </li>
          <li>
            <a href="#about" className={activeSection === "about" ? "active" : ""} onClick={closeMenu}>Hakkımızda</a>
          </li>
          <li>
            <a href="#products" className={activeSection === "products" ? "active" : ""} onClick={closeMenu}>Ürünler</a>
          </li>
          <li>
            <a href="#offer" className={activeSection === "offer" ? "active" : ""} onClick={closeMenu}>Teklif Al</a>
          </li>
          <li>
            <a href="#contact" className={activeSection === "contact" ? "active" : ""} onClick={closeMenu}>İletişim</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// Navbar: Includes Mobile Toggle Logic
const Navbar = ({ activeSection, transparent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${transparent ? "transparent" : ""} ${isOpen ? "nav-open" : ""}`}>
      <div className="navbar-container">
        <img src="/logo.png" alt="Firma Logosu" className="navbar-logo" />
        
        <div className="mobile-menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li>
            <a href="#home" className={activeSection === "home" ? "active" : ""} onClick={closeMenu}>Ana Sayfa</a>
          </li>
          <li>
            <a href="#about" className={activeSection === "about" ? "active" : ""} onClick={closeMenu}>Hakkımızda</a>
          </li>
          <li>
            <a href="#products" className={activeSection === "products" ? "active" : ""} onClick={closeMenu}>Ürünler</a>
          </li>
          <li>
            <a href="#offer" className={activeSection === "offer" ? "active" : ""} onClick={closeMenu}>Teklif Al</a>
          </li>
          <li>
            <a href="#contact" className={activeSection === "contact" ? "active" : ""} onClick={closeMenu}>İletişim</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const HomeSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  const handleScrollToProducts = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="section home-section">
      <div className="home-bg-video-wrapper">
        <video
          ref={videoRef}
          className="home-bg-video"
          src="/bg_video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="home-content">
        <h1 className="home-title animate-fade-in">Türkan Gıda ve Kimya Ürünleri</h1>
        <p className="home-subtext animate-fade-in-delay">
          Sektörde güvenin ve kalitenin adresi.
        </p>
        <button className="scroll-products-btn" onClick={handleScrollToProducts}>
          Ürünlerimiz
        </button>
      </div>
    </section>
  );
};

const MobileHomeSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  const handleScrollToProducts = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="section home-section mobile-home">
      <div className="home-bg-video-wrapper">
        <video
          ref={videoRef}
          className="home-bg-video"
          src="/bg_video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="home-content mobile-home-content">
        <h1 className="home-title animate-fade-in mobile-home-title">Türkan Gıda ve Kimya Ürünleri</h1>
        <p className="home-subtext animate-fade-in-delay mobile-home-subtext">
          Sektörde güvenin ve kalitenin adresi.
        </p>
        <button className="scroll-products-btn mobile-scroll-btn" onClick={handleScrollToProducts}>
          Ürünlerimiz
        </button>
      </div>
    </section>
  );
};

const Section = ({ id, title, children, className = "" }) => (
  <section id={id} className={`section ${className}`}>
    <h2>{title}</h2>
    <div className="section-body">
      {children}
    </div>
  </section>
);

const CategoryModal = ({ category, onClose }) => {
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, []);

  return (
    <div className="category-modal-overlay" onClick={onClose}>
      <div className="category-modal" onClick={e => e.stopPropagation()}>
        <button className="category-modal-close" onClick={onClose}>×</button>
        <h2>{category.name}</h2>
        <div className="category-modal-list-scroll">
          <ul className="category-product-list">
            {category.products.map(product => (
              <li key={product.id} className="category-product-item">
                <span className="category-product-name">{product.name}</span>
                <span className="category-product-desc">{product.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ProductsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const closeModal = () => {
    setSelectedCategory(null);
  };

  return (
    <section id="products" className="section products-section">
      <h2>Ürünlerimiz</h2>
      <p className="products-section-desc">
        12 farklı kategoride modern ve kaliteli ürünlerimizle hizmetinizdeyiz.
      </p>
      <div className="categories-grid">
        {categories.map(category => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="category-image-wrapper">
              <img src={category.image} alt={category.name} className="category-image" />
            </div>
            <div className="category-name">{category.name}</div>
          </div>
        ))}
      </div>
      {selectedCategory && (
        <CategoryModal category={selectedCategory} onClose={closeModal} />
      )}
    </section>
  );
};

const MobileProductsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const preventScroll = (e) => {
      // Allow scrolling inside the modal list
      const scrollableElement = document.querySelector('.category-modal-list-scroll');
      if (scrollableElement && scrollableElement.contains(e.target)) {
        return; // Allow scrolling
      }
      e.preventDefault();
    };

    if (selectedCategory) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.removeEventListener('touchmove', preventScroll);
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const closeModal = () => {
    setSelectedCategory(null);
  };

  return (
    <section id="products" className="section products-section mobile-products">
      <h2 className="mobile-section-title">Ürünlerimiz</h2>
      <p className="products-section-desc mobile-products-desc">
        12 farklı kategoride modern ve kaliteli ürünlerimizle hizmetinizdeyiz.
      </p>
      <div className="mobile-categories-list">
        {categories.map(category => (
          <div
            key={category.id}
            className="mobile-category-card"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="mobile-category-image-wrapper">
              <img src={category.image} alt={category.name} className="mobile-category-image" />
            </div>
            <div className="mobile-category-name">{category.name}</div>
          </div>
        ))}
      </div>
      {selectedCategory && (
        <CategoryModal category={selectedCategory} onClose={closeModal} />
      )}
    </section>
  );
};

const allProducts = categories.flatMap(cat =>
  cat.products.map(product => ({
    ...product,
    category: cat.name
  }))
);

const OfferForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    selectedProducts: []
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => {
      // If clicking the same category, toggle it off
      if (prev[categoryId]) {
        const newState = { ...prev };
        delete newState[categoryId];
        return newState;
      }
      // Otherwise, close all and open only this one (accordion behavior)
      return { [categoryId]: true };
    });
  };

  const productsByCategory = React.useMemo(() => {
    return allProducts.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "İsim gerekli";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Geçerli e-posta gerekli";
    if (!form.phone.trim() || !/^[0-9+\s()-]{7,}$/.test(form.phone)) newErrors.phone = "Telefon gerekli";
    if (!form.message.trim()) newErrors.message = "Mesaj gerekli";
    if (form.selectedProducts.length === 0) newErrors.selectedProducts = "En az bir ürün seçmelisiniz";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const maxLength = 600;
  const remainingChars = maxLength - form.message.length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > maxLength) return;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleProductToggle = (productId) => {
    setForm((prev) => {
      const alreadySelected = prev.selectedProducts.includes(productId);
      return {
        ...prev,
        selectedProducts: alreadySelected
          ? prev.selectedProducts.filter(id => id !== productId)
          : [...prev.selectedProducts, productId]
      };
    });
    setErrors({ ...errors, selectedProducts: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const mail = "info@turkankimya.com.tr";
    const subject = encodeURIComponent("Teklif Talebi");
    const selectedProductDetails = allProducts
      .filter(p => form.selectedProducts.includes(p.id))
      .map(p => `- ${p.name} (${p.category})`)
      .join("\n");
    const body = encodeURIComponent(
      `İsim: ${form.name}\nE-posta: ${form.email}\nTelefon: ${form.phone}\nMesaj: ${form.message}\n\nSeçilen Ürünler:\n${selectedProductDetails}`
    );
    window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="offer-form-section">
      <img src="/Offer.jpg" alt="Teklif" className="offer-image" />
      <div className="offer-forms-container">
        <div className="offer-form-card">
          <form className="offer-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="offer-form-row">
              <label className="offer-form-label">
                <FaUser className="offer-form-icon" />
                <span>Adınız Soyadınız</span>
              </label>
              <input type="text" name="name" placeholder="Adınız Soyadınız" value={form.name} onChange={handleChange} className={errors.name ? "error" : ""} />
              {errors.name && <span className="offer-form-error">{errors.name}</span>}
            </div>
            <div className="offer-form-row">
              <label className="offer-form-label">
                <FaEnvelope className="offer-form-icon" />
                <span>E-posta</span>
              </label>
              <input type="email" name="email" placeholder="E-posta" value={form.email} onChange={handleChange} className={errors.email ? "error" : ""} />
              {errors.email && <span className="offer-form-error">{errors.email}</span>}
            </div>
            <div className="offer-form-row">
              <label className="offer-form-label">
                <FaPhone className="offer-form-icon" />
                <span>Telefon</span>
              </label>
              <input type="text" name="phone" placeholder="Telefon" value={form.phone} onChange={handleChange} className={errors.phone ? "error" : ""} />
              {errors.phone && <span className="offer-form-error">{errors.phone}</span>}
            </div>
            <div className="offer-form-row">
              <label className="offer-form-label">
                <FaCommentDots className="offer-form-icon" />
                <span>Mesajınız</span>
              </label>
              <textarea name="message" placeholder="Mesajınız" value={form.message} onChange={handleChange} className={errors.message ? "error" : ""} style={{ resize: "none", height: "120px" }} />
              <div className="char-counter">{remainingChars} karakter kaldı</div>
              {errors.message && <span className="offer-form-error">{errors.message}</span>}
            </div>
            <button type="submit" className="offer-form-btn">Gönder</button>
          </form>
        </div>
        <div className="offer-products-card">
          <label className="offer-form-label">
            <FaClipboardList className="offer-form-icon" />
            <span>Ürün Seçimi</span>
            {form.selectedProducts.length > 0 && <span className="selected-count">({form.selectedProducts.length} seçildi)</span>}
          </label>
          <div className="offer-products-scroll-container">
            <div className="offer-products-scroll-list">
              {Object.entries(productsByCategory).map(([category, products]) => (
                <div key={category} className="product-category-section">
                  <div className="product-category-header" onClick={() => toggleCategory(category)}>
                    <span>{category}</span>
                    <span className="category-expand-icon">{expandedCategories[category] ? '−' : '+'}</span>
                  </div>
                  <div className={`product-category-content ${expandedCategories[category] ? 'expanded' : ''}`}>
                    {products.map(product => (
                      <label key={product.id} className="offer-product-checkbox">
                        <input type="checkbox" checked={form.selectedProducts.includes(product.id)} onChange={() => handleProductToggle(product.id)} />
                        <div className="offer-product-info">
                          <span className="offer-product-name">{product.name}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {errors.selectedProducts && <span className="offer-form-error">{errors.selectedProducts}</span>}
        </div>
      </div>
      {sent && (
        <div className="offer-success">
          <h3>Talebiniz başarıyla iletildi!</h3>
          <p>En kısa sürede sizinle iletişime geçeceğiz.</p>
        </div>
      )}
    </div>
  );
};

const ContactSection = () => (
  <section id="contact" className="section contact-section">
    <h2>İletişim</h2>
    <div className="contact-card">
      <div className="contact-card-info">
        <div className="contact-card-row"><FaPhone className="contact-card-icon" /><span className="contact-card-label">Telefon:</span><span className="contact-card-value">+90 553 690 72 91</span></div>
        <div className="contact-card-row"><FaEnvelope className="contact-card-icon" /><span className="contact-card-label">E-Posta:</span><span className="contact-card-value">info@turkankimya.com.tr</span></div>
        <div className="contact-card-row"><FaClock className="contact-card-icon" /><span className="contact-card-label">Çalışma Saatleri:</span><span className="contact-card-value">09:00 - 18:00</span></div>
        <div className="contact-card-row"><span className="contact-card-icon" style={{fontSize: "1.3rem", color: "#ff8c00"}}>📍</span><span className="contact-card-label">Adres:</span><span className="contact-card-value">Adil Mah. Said Nursi Cad. No:31/A, Sultanbeyli/İstanbul</span></div>
      </div>
      <div className="contact-card-map">
        <iframe title="Firma Konumu" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1506.0971474950236!2d29.256321250338463!3d40.977226141851204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cad040ba7f98a3%3A0x67b5463cd413fbc8!2sAdil%2C%20Said%20Nursi%20Cd.%20NO%3A31%2C%2034935%20Sultanbeyli%2F%C4%B0stanbul!5e0!3m2!1sen!2str!4v1758461148510!5m2!1sen!2str" width="100%" height="220" style={{ border: 0, borderRadius: "12px" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </div>
  </section>
);

const MobileContactSection = () => (
  <section id="contact" className="mobile-contact-section">
    <h2 className="mobile-section-title">İletişim</h2>
    <div className="mobile-contact-card">
      <div className="mobile-contact-info">
        <div className="mobile-contact-row">
          <FaPhone className="mobile-contact-icon" />
          <div className="mobile-contact-text">
            <span className="mobile-contact-label">Telefon</span>
            <span className="mobile-contact-value">+90 553 690 72 91</span>
          </div>
        </div>
        <div className="mobile-contact-row">
          <FaEnvelope className="mobile-contact-icon" />
          <div className="mobile-contact-text">
            <span className="mobile-contact-label">E-Posta</span>
            <span className="mobile-contact-value">info@turkankimya.com.tr</span>
          </div>
        </div>
        <div className="mobile-contact-row">
          <FaClock className="mobile-contact-icon" />
          <div className="mobile-contact-text">
            <span className="mobile-contact-label">Çalışma Saatleri</span>
            <span className="mobile-contact-value">09:00 - 18:00</span>
          </div>
        </div>
        <div className="mobile-contact-row">
          <span className="mobile-contact-icon" style={{fontSize: "1.3rem", color: "#ff8c00"}}>📍</span>
          <div className="mobile-contact-text">
            <span className="mobile-contact-label">Adres</span>
            <span className="mobile-contact-value">Adil Mah. Said Nursi Cad. No:31/A, Sultanbeyli/İstanbul</span>
          </div>
        </div>
      </div>
      <div className="mobile-contact-map">
        <iframe title="Firma Konumu" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1506.0971474950236!2d29.256321250338463!3d40.977226141851204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cad040ba7f98a3%3A0x67b5463cd413fbc8!2sAdil%2C%20Said%20Nursi%20Cd.%20NO%3A31%2C%2034935%20Sultanbeyli%2F%C4%B0stanbul!5e0!3m2!1sen!2str!4v1758461148510!5m2!1sen!2str" width="100%" height="250" style={{ border: 0, borderRadius: "12px" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </div>
  </section>
);

const SocialButtons = () => (
  <div className="social-buttons">
    <a href="https://www.facebook.com/turkan.kimya/" target="_blank" rel="noopener noreferrer" className="social-button facebook"><FaFacebookF /></a>
    <a href="https://www.linkedin.com/in/t%C3%BCrkan-kimya-ve-gida-san-tic-ltd-%C5%9Fti-610b4a256/" target="_blank" rel="noopener noreferrer" className="social-button linkedin"><FaLinkedinIn /></a>
    <a href="https://wa.me/905536907291" target="_blank" rel="noopener noreferrer" className="social-button whatsapp"><FaWhatsapp /></a>
  </div>
);

const MobileOfferSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    selectedProducts: []
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => {
      // If clicking the same category, toggle it off
      if (prev[categoryId]) {
        const newState = { ...prev };
        delete newState[categoryId];
        return newState;
      }
      // Otherwise, close all and open only this one (accordion behavior)
      return { [categoryId]: true };
    });
  };

  const productsByCategory = React.useMemo(() => {
    return allProducts.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "İsim gerekli";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Geçerli e-posta gerekli";
    if (!form.phone.trim() || !/^[0-9+\s()-]{7,}$/.test(form.phone)) newErrors.phone = "Telefon gerekli";
    if (!form.message.trim()) newErrors.message = "Mesaj gerekli";
    if (form.selectedProducts.length === 0) newErrors.selectedProducts = "En az bir ürün seçmelisiniz";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const maxLength = 600;
  const remainingChars = maxLength - form.message.length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > maxLength) return;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleProductToggle = (productId) => {
    setForm((prev) => {
      const alreadySelected = prev.selectedProducts.includes(productId);
      return {
        ...prev,
        selectedProducts: alreadySelected
          ? prev.selectedProducts.filter(id => id !== productId)
          : [...prev.selectedProducts, productId]
      };
    });
    setErrors({ ...errors, selectedProducts: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const mail = "info@turkankimya.com.tr";
    const subject = encodeURIComponent("Teklif Talebi");
    const selectedProductDetails = allProducts
      .filter(p => form.selectedProducts.includes(p.id))
      .map(p => `- ${p.name} (${p.category})`)
      .join("\n");
    const body = encodeURIComponent(
      `İsim: ${form.name}\nE-posta: ${form.email}\nTelefon: ${form.phone}\nMesaj: ${form.message}\n\nSeçilen Ürünler:\n${selectedProductDetails}`
    );
    window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="offer" className="mobile-offer-section">
      <h2 className="mobile-section-title">Teklif Al</h2>
      <div className="mobile-offer-container">
        <form className="mobile-offer-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="mobile-form-group">
            <label className="mobile-form-label">
              <FaUser className="mobile-form-icon" />
              <span>Adınız Soyadınız</span>
            </label>
            <input type="text" name="name" placeholder="Adınız Soyadınız" value={form.name} onChange={handleChange} className={errors.name ? "error" : ""} />
            {errors.name && <span className="mobile-form-error">{errors.name}</span>}
          </div>

          <div className="mobile-form-group">
            <label className="mobile-form-label">
              <FaEnvelope className="mobile-form-icon" />
              <span>E-posta</span>
            </label>
            <input type="email" name="email" placeholder="E-posta" value={form.email} onChange={handleChange} className={errors.email ? "error" : ""} />
            {errors.email && <span className="mobile-form-error">{errors.email}</span>}
          </div>

          <div className="mobile-form-group">
            <label className="mobile-form-label">
              <FaPhone className="mobile-form-icon" />
              <span>Telefon</span>
            </label>
            <input type="text" name="phone" placeholder="Telefon" value={form.phone} onChange={handleChange} className={errors.phone ? "error" : ""} />
            {errors.phone && <span className="mobile-form-error">{errors.phone}</span>}
          </div>

          <div className="mobile-form-group">
            <label className="mobile-form-label">
              <FaCommentDots className="mobile-form-icon" />
              <span>Mesajınız</span>
            </label>
            <textarea name="message" placeholder="Mesajınız" value={form.message} onChange={handleChange} className={errors.message ? "error" : ""} style={{ resize: "none", height: "100px" }} />
            <div className="mobile-char-counter">{remainingChars} karakter kaldı</div>
            {errors.message && <span className="mobile-form-error">{errors.message}</span>}
          </div>

          <button type="submit" className="mobile-submit-btn">Gönder</button>
        </form>

        <div className="mobile-products-card">
          <label className="mobile-form-label mobile-products-label">
            <FaClipboardList className="mobile-form-icon" />
            <span>Ürün Seçimi {form.selectedProducts.length > 0 && <span className="mobile-selected-count">({form.selectedProducts.length} seçildi)</span>}</span>
          </label>
          <div className="mobile-products-list">
            {Object.entries(productsByCategory).map(([category, products]) => (
              <div key={category} className="mobile-product-category">
                <div className="mobile-category-header" onClick={() => toggleCategory(category)}>
                  <span>{category}</span>
                  <span className="mobile-expand-icon">{expandedCategories[category] ? '−' : '+'}</span>
                </div>
                <div className={`mobile-category-products ${expandedCategories[category] ? 'expanded' : ''}`}>
                  {products.map(product => (
                    <label key={product.id} className="mobile-product-checkbox">
                      <input type="checkbox" checked={form.selectedProducts.includes(product.id)} onChange={() => handleProductToggle(product.id)} />
                      <span className="mobile-product-name">{product.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {errors.selectedProducts && <span className="mobile-form-error">{errors.selectedProducts}</span>}
        </div>

        {sent && (
          <div className="mobile-success-message">
            <h3>Talebiniz başarıyla iletildi!</h3>
            <p>En kısa sürede sizinle iletişime geçeceğiz.</p>
          </div>
        )}
      </div>
    </section>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [navbarTransparent, setNavbarTransparent] = useState(true);
  const { isMobile } = useScreenSize();

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.6 };
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarTransparent(window.scrollY < 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* DESKTOP VERSION */}
      <BrowserView>
        <Navbar activeSection={activeSection} transparent={navbarTransparent} />
        <HomeSection />
        <section id="about" className="about-section">
          <img src="/about_us.jpg" alt="Hakkımızda" className="about-section-image" />
          <div className="about-section-content">
            <h2>Hakkımızda</h2>
            <p>
              <span className="about-highlight">Türkan Kimya</span> olarak, sektördeki 20+ yıllık tecrübemiz ve yenilikçi yaklaşımımız ile müşterilerimize en kaliteli ürünleri sunuyoruz.<br /><br />
              Modern tesislerimizde, sürdürülebilirlik ve güvenliği ön planda tutarak, çevre dostu ve yüksek performanslı çözümler geliştiriyoruz.<br /><br />
              Müşteri memnuniyeti ve güven odaklı hizmet anlayışımız ile, iş ortaklarımızın ihtiyaçlarına özel çözümler üretiyor, sektörde fark yaratıyoruz.<br /><br />
              <span style={{ color: "#ff8c00", fontWeight: "bold" }}>Bize katılın, geleceği birlikte şekillendirelim.</span>
            </p>
          </div>
        </section>
        <ProductsSection />
        <Section id="offer" title="Teklif Al">
          <OfferForm />
        </Section>
        <div className="wave-divider">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path fill="#fff9de" d="M0,40 C240,60 480,20 720,40 C960,60 1200,20 1440,40 L1440,120 L0,120 Z" />
          </svg>
        </div>
        <ContactSection />
        <SocialButtons />
        <footer className="footer"><p>©2025 | Türkan Kimya | Tüm hakları saklıdır.</p></footer>
      </BrowserView>

      {/* MOBILE VERSION */}
      <MobileView>
        <MobileNavbar activeSection={activeSection} transparent={navbarTransparent} />
        <MobileHomeSection />
        <section id="about" className="mobile-about-section">
          <div className="mobile-about-content">
            <h2 className="mobile-section-title">Hakkımızda</h2>
            <img src="/about_us.jpg" alt="Hakkımızda" className="mobile-about-image" />
            <p className="mobile-about-text">
              <span className="about-highlight">Türkan Kimya</span> olarak, sektördeki 20+ yıllık tecrübemiz ve yenilikçi yaklaşımımız ile müşterilerimize en kaliteli ürünleri sunuyoruz.<br /><br />
              Modern tesislerimizde, sürdürülebilirlik ve güvenliği ön planda tutarak, çevre dostu ve yüksek performanslı çözümler geliştiriyoruz.<br /><br />
              Müşteri memnuniyeti ve güven odaklı hizmet anlayışımız ile, iş ortaklarımızın ihtiyaçlarına özel çözümler üretiyor, sektörde fark yaratıyoruz.<br /><br />
              <span style={{ color: "#ff8c00", fontWeight: "bold" }}>Bize katılın, geleceği birlikte şekillendirelim.</span>
            </p>
          </div>
        </section>
        <MobileProductsSection />
        <MobileOfferSection />
        <MobileContactSection />
        <SocialButtons />
        <footer className="footer"><p>©2025 | Türkan Kimya | Tüm hakları saklıdır.</p></footer>
      </MobileView>
    </div>
  );
}

export default App;