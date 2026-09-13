import React, { useState, useEffect } from "react";
import "./App.css";
import "./i18n";
import Navbar from "./components/Navbar";
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import ProductsSection from "./components/ProductsSection";
import OfferForm from "./components/OfferForm";
import ContactSection from "./components/ContactSection";
import SocialButtons from "./components/SocialButtons";
import Footer from "./components/Footer";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [navbarTransparent, setNavbarTransparent] = useState(true);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarTransparent(window.scrollY < 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app">
      <Navbar activeSection={activeSection} transparent={navbarTransparent} />
      <HomeSection />
      <AboutSection />
      <ProductsSection />
      <OfferForm />
      <div className="wave-divider">
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="#fff9de"
            d="M0,40 C240,60 480,20 720,40 C960,60 1200,20 1440,40 L1440,120 L0,120 Z"
          />
        </svg>
      </div>
      <ContactSection />
      <SocialButtons />
      <Footer />
    </div>
  );
}

export default App;
