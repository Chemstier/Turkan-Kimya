import React from "react";
import { company } from "../data/company";

const AboutSection = () => (
  <section id="about" className="about-section">
    <img
      src="/about_us.jpg"
      alt="Hakkımızda"
      className="about-section-image"
      loading="lazy"
    />
    <div className="about-section-content">
      <h2>Hakkımızda</h2>
      <p>
        <span className="about-highlight">{company.shortName}</span> olarak,
        sektördeki 20+ yıllık tecrübemiz ve yenilikçi yaklaşımımız ile
        müşterilerimize en kaliteli ürünleri sunuyoruz.
        <br />
        <br />
        Modern tesislerimizde, sürdürülebilirlik ve güvenliği ön planda tutarak,
        çevre dostu ve yüksek performanslı çözümler geliştiriyoruz.
        <br />
        <br />
        Müşteri memnuniyeti ve güven odaklı hizmet anlayışımız ile, iş
        ortaklarımızın ihtiyaçlarına özel çözümler üretiyor, sektörde fark
        yaratıyoruz.
        <br />
        <br />
        <span className="about-cta">
          Bize katılın, geleceği birlikte şekillendirelim.
        </span>
      </p>
    </div>
  </section>
);

export default AboutSection;
