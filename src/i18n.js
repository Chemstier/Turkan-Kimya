// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        products: "Products",
        offer: "Offer",
        contact: "Contact",
      },
      home: {
        title: "Welcome to Our Company",
        subtitle: "We provide quality products for your needs",
        cta: "See Products",
      },
      about: {
        title: "About Us",
        description: "We are a leading company providing top-notch solutions for our clients.",
      },
      products: {
        title: "Our Products",
        description: "Explore our wide range of products by category.",
      },
      offer: {
        title: "Request a Quote",
        name: "Name",
        email: "Email",
        phone: "Phone",
        message: "Message",
        send: "Send Request",
        productSelection: "Select Products",
        selectedCount: "selected",
        validation: {
          name: "Please enter your name",
          email: "Please enter a valid email",
          phone: "Please enter a valid phone number",
          message: "Please enter a message",
          products: "Please select at least one product",
        },
        successTitle: "Request Sent Successfully!",
        successMessage: "Thank you! We will contact you shortly.",
      },
      contact: {
        title: "Contact Us",
        phoneLabel: "Phone",
        emailLabel: "Email",
        hoursLabel: "Working Hours",
        hours: "09:00 - 18:00",
        addressLabel: "Address",
        address: "Istanbul, Turkey",
      },
    },
  },
  tr: {
    translation: {
      nav: {
        home: "Ana Sayfa",
        about: "Hakkımızda",
        products: "Ürünler",
        offer: "Teklif",
        contact: "İletişim",
      },
      home: {
        title: "Hoşgeldiniz",
        subtitle: "İhtiyaçlarınız için kaliteli ürünler sunuyoruz",
        cta: "Ürünleri Gör",
      },
      about: {
        title: "Hakkımızda",
        description: "Müşterilerimize en iyi çözümleri sunan lider bir şirketiz.",
      },
      products: {
        title: "Ürünlerimiz",
        description: "Kategorilere göre geniş ürün yelpazemizi keşfedin.",
      },
      offer: {
        title: "Teklif Talebi",
        name: "İsim",
        email: "E-Posta",
        phone: "Telefon",
        message: "Mesaj",
        send: "Talebi Gönder",
        productSelection: "Ürün Seçimi",
        selectedCount: "seçildi",
        validation: {
          name: "Lütfen isminizi girin",
          email: "Lütfen geçerli bir e-posta girin",
          phone: "Lütfen geçerli bir telefon numarası girin",
          message: "Lütfen bir mesaj girin",
          products: "Lütfen en az bir ürün seçin",
        },
        successTitle: "Talebiniz Başarıyla Gönderildi!",
        successMessage: "Teşekkürler! En kısa sürede sizinle iletişime geçeceğiz.",
      },
      contact: {
        title: "İletişim",
        phoneLabel: "Telefon",
        emailLabel: "E-Posta",
        hoursLabel: "Çalışma Saatleri",
        hours: "09:00 - 18:00",
        addressLabel: "Adres",
        address: "İstanbul, Türkiye",
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "tr", // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
