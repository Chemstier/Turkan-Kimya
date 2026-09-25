import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import tr from "./locales/tr.json";
import en from "./locales/en.json";
import ar from "./locales/ar.json";
import de from "./locales/de.json";

export const SUPPORTED_LANGUAGES = ["tr", "en", "de", "ar"];
export const RTL_LANGUAGES = ["ar"];
export const DEFAULT_LANGUAGE = "tr";
const STORAGE_KEY = "turkan-lang";

export function getLanguageFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  return SUPPORTED_LANGUAGES.includes(lang) ? lang : null;
}

export function detectLanguage() {
  // Priority: explicit ?lang= → saved preference → Turkish default.
  // Never use browser/OS language so first visits stay Turkish.
  const fromUrl = getLanguageFromUrl();
  if (fromUrl) return fromUrl;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED_LANGUAGES.includes(stored)) return stored;
  } catch {
    // ignore unavailable storage
  }

  return DEFAULT_LANGUAGE;
}

function applyDocumentLanguage(lang) {
  const direction = RTL_LANGUAGES.includes(lang) ? "rtl" : "ltr";
  document.documentElement.lang = lang;
  document.documentElement.dir = direction;
  document.title = i18n.t("meta.title");
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute("content", i18n.t("meta.description"));
  }
}

export function persistLanguage(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore unavailable storage
  }

  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.replaceState(
    null,
    "",
    `${url.pathname}${url.search}${url.hash}`
  );
}

export function changeLanguage(lang) {
  if (!SUPPORTED_LANGUAGES.includes(lang)) return Promise.resolve();
  persistLanguage(lang);
  return i18n.changeLanguage(lang);
}

const initialLanguage =
  typeof window !== "undefined" ? detectLanguage() : DEFAULT_LANGUAGE;

i18n.use(initReactI18next).init({
  resources: {
    tr: { translation: tr },
    en: { translation: en },
    de: { translation: de },
    ar: { translation: ar },
  },
  lng: initialLanguage || DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  nonExplicitSupportedLngs: true,
  load: "languageOnly",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lang) => {
  applyDocumentLanguage(lang);
});

if (typeof window !== "undefined") {
  applyDocumentLanguage(i18n.language);
  const urlLang = getLanguageFromUrl();
  if (urlLang) {
    try {
      localStorage.setItem(STORAGE_KEY, urlLang);
    } catch {
      // ignore unavailable storage
    }
  }
}

export default i18n;
