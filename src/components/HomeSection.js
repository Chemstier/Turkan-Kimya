import React, { useEffect, useRef } from "react";
import { company } from "../data/company";

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
        <h1 className="home-title animate-fade-in">{company.name}</h1>
        <p className="home-subtext animate-fade-in-delay">
          Sektörde güvenin ve kalitenin adresi.
        </p>
        <button
          type="button"
          className="scroll-products-btn"
          onClick={handleScrollToProducts}
        >
          Ürünlerimiz
        </button>
      </div>
    </section>
  );
};

export default HomeSection;
