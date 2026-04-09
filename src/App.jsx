import React, { useMemo, useState } from "react";
import logo from "./assets/HandyBro logo.png";
import sweden from "./assets/SV.png";
import uk from "./assets/GB.png";
import {
  Wrench,
  Hammer,
  Paintbrush,
  Trees,
  Sparkles,
  Phone,
  Mail,
  Globe,
  X,
  Menu,
  Check,
  Calendar,
  MapPin,
  User,
  ClipboardList,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const translations = {
  sv: {
    nav: { home: "Hem", services: "Tjänster", book: "Boka tid", contact: "Kontakt" },
    heroTitle: "Alltid redo att hjälpa till hemma, i trädgården och på jobbet",
    heroText:
      "Praktisk hjälp för små reparationer, montering, målning, trädgårdsarbete och vardagliga fix. Snabbt, smidigt och professionellt.",
    ctaPrimary: "Boka en tjänst",
    ctaSecondary: "Se våra tjänster",
    servicesTitle: "Våra Tjänster",
    bookTitle: "Boka en Tjänst",
    bookSubtitle: "Beskriv vad du behöver hjälp med så återkommer vi så snart som möjligt.",
    guarantees: [
      "Prisförslag inom 24 timmar",
      "Flexibel hjälp hemma eller på plats",
      "Tydlig kommunikation och snabb återkoppling",
    ],
    form: {
      name: "Namn",
      phone: "Telefonnummer",
      email: "E-post",
      address: "Adress",
      service: "Välj tjänst",
      datetime: "Önskad tid",
      message: "Beskriv arbetet",
      attachments: "Du kan bifoga bilder eller ritningar senare via e-post.",
      send: "Skicka förfrågan",
    },
    contactTitle: "Kontakta Oss",
    website: "Webbplats",
    footer: "HandyBro Sverige – tjänster erbjuds i Sverige enligt gällande lag.",
    rot: "Glöm inte ROT-avdraget! Upp till 30 % avdrag.",
    serviceNames: {
      repairs: "Små reparationer",
      assembly: "Montering",
      painting: "Målning & väggar",
      garden: "Trädgård & uteplats",
      construction: "Bygg & ombyggnation",
      cleaning: "Rengöring & fix",
    },
    serviceDescriptions: {
      repairs:
        "Vi fixar läckande kranar, lösa handtag, trasiga luckor och andra små problem i hemmet.",
      assembly:
        "Montering av möbler, hyllor, gardinskenor, TV-fästen och andra praktiska lösningar.",
      painting:
        "Målning av väggar och tak, enklare spackling samt hjälp med förberedelser före renovering.",
      garden:
        "Gräsklippning, häcktrimning, plantering, städning av uteplats och enklare trädgårdsfix.",
      construction:
        "Hjälp med renovering, ombyggnation, snickeri, målning och andra byggrelaterade tjänster.",
      cleaning:
        "Rensning, städning, förrådshjälp och små fix som gör stor skillnad i vardagen.",
    },
  },
  en: {
    nav: { home: "Home", services: "Services", book: "Book now", contact: "Contact" },
    heroTitle: "Always ready to help at home, in the garden and at work",
    heroText:
      "Practical help for small repairs, assembly, painting, gardening and everyday tasks. Fast, smooth and professional.",
    ctaPrimary: "Book a service",
    ctaSecondary: "View services",
    servicesTitle: "Our Services",
    bookTitle: "Book a Service",
    bookSubtitle: "Describe what you need help with and we will get back to you as soon as possible.",
    guarantees: [
      "Quote within 24 hours",
      "Flexible help at home or on site",
      "Clear communication and quick response",
    ],
    form: {
      name: "Name",
      phone: "Phone number",
      email: "Email",
      address: "Address",
      service: "Select service",
      datetime: "Preferred time",
      message: "Describe the job",
      attachments: "You can attach images or drawings later by email.",
      send: "Send request",
    },
    contactTitle: "Contact Us",
    website: "Website",
    footer: "HandyBro Sweden – services are offered in Sweden in accordance with applicable law.",
    rot: "Don’t forget the ROT deduction! Up to 30% deduction.",
    serviceNames: {
      repairs: "Small repairs",
      assembly: "Assembly",
      painting: "Painting & walls",
      garden: "Garden & outdoor",
      construction: "Construction & renovation",
      cleaning: "Cleaning & fixes",
    },
    serviceDescriptions: {
      repairs:
        "We fix leaking taps, loose handles, damaged cabinet doors and other small issues at home.",
      assembly:
        "Assembly of furniture, shelves, curtain rails, TV mounts and other practical installations.",
      painting:
        "Painting of walls and ceilings, light filling work and help preparing before renovation.",
      garden:
        "Lawn mowing, hedge trimming, planting, patio cleanup and simple garden maintenance.",
      construction:
        "Help with renovations, remodeling, carpentry, painting, and other construction-related services.",
      cleaning:
        "Decluttering, storage cleanup and small practical fixes that make everyday life easier.",
    },
  },
};

const serviceConfig = [
  { key: "repairs", icon: Wrench },
  { key: "assembly", icon: Hammer },
  { key: "painting", icon: Paintbrush },
  { key: "garden", icon: Trees },
  { key: "construction", icon: Hammer },
  { key: "cleaning", icon: Sparkles },
];

function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center transition ${className}`}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [lang, setLang] = useState("sv");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const t = translations[lang];

  const services = useMemo(
    () =>
      serviceConfig.map((item) => ({
        ...item,
        title: t.serviceNames[item.key],
        description: t.serviceDescriptions[item.key],
      })),
    [t]
  );

  const openBooking = (service = "") => {
    setSelectedService(service);
    setBookingOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const service = form.get("service") || selectedService;

    const body = [
      `${t.form.name}: ${form.get("name") || ""}`,
      `${t.form.phone}: ${form.get("phone") || ""}`,
      `${t.form.email}: ${form.get("email") || ""}`,
      `${t.form.address}: ${form.get("address") || ""}`,
      `${t.form.service}: ${service || ""}`,
      `${t.form.datetime}: ${form.get("datetime") || ""}`,
      "",
      `${t.form.message}:`,
      `${form.get("message") || ""}`,
    ].join("\n");

    window.location.href = `mailto:handybrosverige@gmail.com?subject=${encodeURIComponent(
      "HandyBro booking request"
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f7f5] text-slate-800">
      <div className="fixed inset-x-0 top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:gap-6 md:px-6">
          <a href="#home" className="flex shrink-0 items-center">
            <img
              src={logo}
              alt="HandyBro"
              className="h-12 w-auto max-w-[150px] object-contain sm:h-16 sm:max-w-[190px] md:h-28 md:max-w-[320px]"
            />
          </a>

          <nav className="hidden items-center gap-8 text-[15px] font-medium md:flex">
            <a href="#home" className="transition hover:text-[#f39a3f]">
              {t.nav.home}
            </a>
            <a href="#services" className="transition hover:text-[#f39a3f]">
              {t.nav.services}
            </a>
            <button onClick={() => openBooking()} className="transition hover:text-[#f39a3f]">
              {t.nav.book}
            </button>
            <a href="#contact" className="transition hover:text-[#f39a3f]">
              {t.nav.contact}
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
              <button
                onClick={() => setLang("sv")}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition ${lang === "sv"
                  ? "bg-[#0f2242] text-white"
                  : "text-slate-600 hover:bg-slate-100"
                  }`}
              >
                <img
                  src={sweden}
                  alt="Swedish"
                  className="h-4 w-6 rounded-sm object-cover"
                />
                SV
              </button>

              <button
                onClick={() => setLang("en")}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition ${lang === "en"
                  ? "bg-[#0f2242] text-white"
                  : "text-slate-600 hover:bg-slate-100"
                  }`}
              >
                <img
                  src={uk}
                  alt="English"
                  className="h-4 w-6 rounded-sm object-cover"
                />
                EN
              </button>
            </div>
          </div>

          <button
            className="rounded-xl border border-slate-200 p-2 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border-t border-slate-100 bg-white px-4 pb-4 md:hidden"
            >
              <div className="flex flex-col gap-3 py-4 text-sm font-medium">
                <a href="#home" onClick={() => setMenuOpen(false)}>
                  {t.nav.home}
                </a>
                <a href="#services" onClick={() => setMenuOpen(false)}>
                  {t.nav.services}
                </a>
                <button
                  className="text-left"
                  onClick={() => {
                    setMenuOpen(false);
                    openBooking();
                  }}
                >
                  {t.nav.book}
                </button>
                <a href="#contact" onClick={() => setMenuOpen(false)}>
                  {t.nav.contact}
                </a>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setLang("sv")}
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${lang === "sv" ? "bg-[#0f2242] text-white" : "bg-slate-100 text-slate-700"
                    }`}
                >
                  <img
                    src={sweden}
                    alt="Swedish"
                    className="h-4 w-6 rounded-sm object-cover"
                  />
                  SV
                </button>

                <button
                  onClick={() => setLang("en")}
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${lang === "en" ? "bg-[#0f2242] text-white" : "bg-slate-100 text-slate-700"
                    }`}
                >
                  <img
                    src={uk}
                    alt="English"
                    className="h-4 w-6 rounded-sm object-cover"
                  />
                  EN
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <section id="home" className="relative overflow-hidden pt-20 md:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(243,154,63,0.18),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(15,34,66,0.1),_transparent_28%)]" />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 md:px-6 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <div className="mb-4 inline-flex rounded-full border border-[#f39a3f]/20 bg-[#f39a3f]/10 px-4 py-2 text-sm font-semibold text-[#af5e0f]">
              HandyBro • Sverige
            </div>

            <h1 className="max-w-full text-[2.4rem] font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:text-4xl md:max-w-xl md:text-6xl">
              {t.heroTitle}
            </h1>

            <p className="mt-5 max-w-full text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 md:max-w-xl">
              {t.heroText}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => openBooking()}
                className="h-12 rounded-2xl bg-[#f39a3f] px-6 text-base font-semibold text-white hover:bg-[#df8530]"
              >
                {t.ctaPrimary}
              </Button>

              <a
                href="#services"
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 text-base font-semibold"
              >
                {t.ctaSecondary}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10"
          >
            <div className="rounded-[32px] border border-white/60 bg-white p-4 shadow-[0_20px_80px_rgba(15,34,66,0.12)]">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[28px] bg-[#0f2242] p-6 text-white sm:col-span-2">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-2xl bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
                      HandyBro
                    </div>
                    <div className="rounded-full bg-[#f39a3f] px-3 py-1 text-xs font-semibold text-white">
                      2026
                    </div>
                  </div>

                  <div className="text-2xl font-bold md:text-3xl">{t.bookTitle}</div>
                  <p className="mt-3 max-w-md text-sm leading-7 text-white/80">{t.bookSubtitle}</p>
                </div>

                {t.guarantees.map((item) => (
                  <div key={item} className="rounded-[24px] border border-slate-200 bg-[#fffaf4] p-5">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-[#f39a3f]/15 p-2 text-[#f39a3f]">
                        <Check className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-medium leading-6 text-slate-700">{item}</p>
                    </div>
                  </div>
                ))}

                <div className="rounded-[24px] border border-slate-200 bg-white p-5 sm:col-span-2">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="text-sm text-slate-500">Email</div>
                      <div className="break-words text-lg font-bold text-slate-900 sm:text-xl">
                        handybrosverige@gmail.com
                      </div>
                    </div>

                    <Button
                      onClick={() => openBooking()}
                      className="rounded-2xl bg-slate-950 px-5 py-2 text-white hover:bg-slate-800"
                    >
                      {t.ctaPrimary}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <div className="mb-10 text-center md:mb-14">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#af5e0f]">
            HandyBro
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
            {t.servicesTitle}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="h-full"
              >
                <div className="group flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,34,66,0.08)] sm:p-7">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#f39a3f] text-white shadow-sm">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 flex-1 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                    {service.description}
                  </p>

                  <Button
                    onClick={() => openBooking(service.title)}
                    className="mt-5 w-fit rounded-2xl px-0 text-base font-semibold text-[#af5e0f] hover:text-[#8b4d0d]"
                  >
                    {t.ctaPrimary}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-8">
        <div className="rounded-[36px] bg-[#fff4e7] px-5 py-8 shadow-sm md:px-10 md:py-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
                {t.bookTitle}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                {t.bookSubtitle}
              </p>
            </div>

            <div className="space-y-3 rounded-[28px] bg-white p-5 shadow-sm sm:p-6">
              {t.guarantees.map((item) => (
                <div key={item} className="flex items-start gap-3 text-slate-700">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-[#f39a3f]" />
                  <span className="text-base leading-7">{item}</span>
                </div>
              ))}

              <Button
                onClick={() => openBooking()}
                className="mt-3 h-12 w-full rounded-2xl bg-[#f39a3f] text-base font-semibold text-white hover:bg-[#df8530]"
              >
                {t.ctaPrimary}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="mb-10 text-center md:mb-14">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#af5e0f]">
            HandyBro
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
            {t.contactTitle}
          </h2>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              label: t.form.phone,
              value: (
                <div className="flex flex-col gap-2">
                  <a
                    href="tel:0700182132"
                    className="rounded-lg bg-gray-100 px-3 py-2 text-sm transition hover:bg-gray-200"
                  >
                    📞 070 018 21 32
                  </a>
                  <a
                    href="tel:0736160832"
                    className="rounded-lg bg-gray-100 px-3 py-2 text-sm transition hover:bg-gray-200"
                  >
                    📞 073 616 08 32
                  </a>
                </div>
              ),
              icon: Phone,
            },
            {
              label: t.form.email,
              value: "handybrosverige@gmail.com",
              icon: Mail,
              href: "mailto:handybrosverige@gmail.com",
            },
            {
              label: t.website,
              value: "handybro.site",
              icon: Globe,
              href: "https://handybro.site",
            },
            {
              label: "Instagram",
              value: "@handybro.se",
              icon: Globe,
              href: "https://instagram.com/handybro.se",
            },
            {
              label: "LinkedIn",
              value: "Handy Bro",
              icon: Globe,
              href: "https://www.linkedin.com/in/handybro-handybro-651814397/",
            },
            {
              label: "Facebook",
              value: "Handy Bro",
              icon: Globe,
              href: "https://www.facebook.com/profile.php?id=61572114503757",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="group rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#f39a3f]/40 hover:shadow-[0_20px_40px_rgba(15,34,66,0.08)] sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-[#f39a3f] text-white transition duration-300 group-hover:scale-105 group-hover:bg-[#df8530]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-slate-500 sm:text-base">{item.label}</div>

                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href?.startsWith("http") ? "_blank" : undefined}
                        rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="break-words text-lg font-bold tracking-tight text-slate-950 transition group-hover:text-[#f39a3f] sm:text-xl"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="break-words text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
                        {item.value}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="mt-8 bg-[#0f2242] px-4 py-12 text-center text-white md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex justify-center">
            <img
              src={logo}
              alt="HandyBro"
              className="h-14 w-auto max-w-[180px] object-contain md:h-20 md:max-w-[280px]"
            />
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/75">{t.footer}</p>
          <div className="mt-6 text-sm text-white/50">© 2026 HandyBro. All rights reserved.</div>
        </div>
      </footer>

      <button
        onClick={() => openBooking()}
        className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 rounded-2xl bg-[#e88d35] px-4 py-6 text-sm font-bold text-white shadow-[0_12px_30px_rgba(232,141,53,0.35)] transition hover:bg-[#d67d28] lg:block"
        style={{ writingMode: "vertical-rl" }}
      >
        {t.nav.book}
      </button>

      <div className="fixed bottom-3 right-3 z-30 max-w-[220px] rounded-2xl bg-[#eba154] px-4 py-3 text-sm font-medium leading-6 text-white shadow-[0_10px_30px_rgba(235,161,84,0.35)] md:bottom-4 md:right-4 md:max-w-[320px] md:rounded-full md:px-6 md:py-4 md:text-base md:leading-7">
        {t.rot}
      </div>

      <AnimatePresence>
        {bookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-3 sm:p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[28px] bg-white shadow-[0_30px_120px_rgba(0,0,0,0.24)] sm:rounded-[32px]"
            >
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white px-5 py-4 sm:px-6 sm:py-5 md:px-8">
                <div className="min-w-0">
                  <h3 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                    {t.bookTitle}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{t.bookSubtitle}</p>
                </div>

                <button
                  onClick={() => setBookingOpen(false)}
                  className="shrink-0 rounded-2xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8">
                <div className="mb-8 grid gap-3 md:grid-cols-3">
                  {t.guarantees.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#fff7ee] p-4">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#f39a3f]" />
                      <span className="text-sm font-medium leading-6 text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">{t.form.name}</label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <input
                          name="name"
                          required
                          className="h-14 w-full rounded-2xl border border-slate-200 pl-12 pr-4 text-base outline-none focus:border-[#f39a3f]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">{t.form.phone}</label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <input
                          name="phone"
                          className="h-14 w-full rounded-2xl border border-slate-200 pl-12 pr-4 text-base outline-none focus:border-[#f39a3f]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">{t.form.email}</label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <input
                          name="email"
                          type="email"
                          required
                          className="h-14 w-full rounded-2xl border border-slate-200 pl-12 pr-4 text-base outline-none focus:border-[#f39a3f]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">{t.form.address}</label>
                      <div className="relative">
                        <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <input
                          name="address"
                          className="h-14 w-full rounded-2xl border border-slate-200 pl-12 pr-4 text-base outline-none focus:border-[#f39a3f]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">{t.form.service}</label>
                      <div className="relative">
                        <ClipboardList className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <select
                          name="service"
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-base outline-none focus:border-[#f39a3f]"
                        >
                          <option value="">{t.form.service}</option>
                          {services.map((service) => (
                            <option key={service.key} value={service.title}>
                              {service.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">{t.form.datetime}</label>
                      <div className="relative">
                        <Calendar className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <input
                          name="datetime"
                          type="datetime-local"
                          className="h-14 w-full rounded-2xl border border-slate-200 pl-12 pr-4 text-base outline-none focus:border-[#f39a3f]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">{t.form.message}</label>
                    <textarea
                      name="message"
                      required
                      className="min-h-[150px] w-full rounded-3xl border border-slate-200 p-4 text-base outline-none focus:border-[#f39a3f]"
                    />
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
                    {t.form.attachments}
                  </div>

                  <Button
                    type="submit"
                    className="h-14 w-full rounded-2xl bg-[#f39a3f] text-base font-semibold text-white hover:bg-[#df8530]"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {t.form.send}
                  </Button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}