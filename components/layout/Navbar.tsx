"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/ecole",      label: "L'École",    num: "01" },
  { href: "/pedagogie",  label: "Pédagogie",  num: "02" },
  { href: "/inscriptions", label: "Inscriptions", num: "03" },
  { href: "/galerie",    label: "Galerie",    num: "04" },
  { href: "/actualites", label: "Actualités", num: "05" },
  { href: "/contact",    label: "Contact",    num: "06" },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [ctaHovered,  setCtaHovered]  = useState(false);
  const pathname = usePathname();
  const isHome   = pathname === "/";

  /*
    transparent = only on homepage at top.
    On all other pages or after scroll → glass.
  */
  const transparent = isHome && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const solidBg  = "rgba(255,255,255,0.88)";
  const openBg   = "rgba(255,255,255,1)";
  const solidBdr = "rgba(0,0,0,0.055)";
  const logoDark = "#0a0a0a";
  const barColor = "#0a0a0a";

  return (
    <header
      suppressHydrationWarning
      style={{
        position:             "fixed",
        top: 0, left: 0, right: 0,
        zIndex:               50,
        transition:           "background 0.55s ease, backdrop-filter 0.55s ease, box-shadow 0.55s ease, border-color 0.55s ease",
        background:           transparent ? "transparent" : menuOpen ? openBg : solidBg,
        backdropFilter:       transparent ? "none" : "blur(24px) saturate(180%)",
        WebkitBackdropFilter: transparent ? "none" : "blur(24px) saturate(180%)",
        borderBottom:         transparent ? "1px solid rgba(255,255,255,0)" : `1px solid ${solidBdr}`,
        boxShadow:            (!transparent && scrolled)
                                ? "0 1px 36px rgba(0,0,0,0.07)"
                                : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Main bar ── */}
        <div className="flex items-center h-[68px] lg:h-[76px]">

          {/* Logo — left third */}
          <div className="flex-1">
            <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label="Montagne Rouge — Accueil">
              <span className="block w-[7px] h-[7px] rounded-full bg-rouge flex-shrink-0 transition-transform duration-300 group-hover:scale-125" />
              <span
                className="font-semibold text-[15px] tracking-tight"
                style={{
                  color:      transparent ? "rgba(255,255,255,0.95)" : logoDark,
                  transition: "color 0.5s ease",
                }}
              >
                Montagne{" "}
                <span className="text-rouge">Rouge</span>
              </span>
            </Link>
          </div>

          {/* Desktop nav — centre third, truly centered */}
          <nav
            className="hidden lg:flex flex-1 justify-center items-center gap-8"
            aria-label="Navigation principale"
          >
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${transparent ? "nav-transparent" : "nav-solid"} ${active ? "nav-active" : ""}`}
                >
                  {link.label}
                  <span className="nav-dot" aria-hidden />
                </Link>
              );
            })}
          </nav>

          {/* Right third — CTA + hamburger */}
          <div className="flex-1 flex items-center justify-end gap-3">

            {/* Desktop CTA */}
            <Link
              href="/inscriptions"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-full text-[13px] font-semibold px-5 py-2.5"
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              style={
                transparent
                  ? {
                      border:     "1px solid rgba(255,255,255," + (ctaHovered ? "0.55" : "0.32") + ")",
                      color:       ctaHovered ? "rgba(255,255,255,1)"   : "rgba(255,255,255,0.88)",
                      background:  ctaHovered ? "rgba(255,255,255,0.12)" : "transparent",
                      transition:  "all 0.3s ease",
                    }
                  : {
                      border:      "1px solid transparent",
                      color:       "#ffffff",
                      background:  ctaHovered ? "#7A0014" : "#960018",
                      boxShadow:   ctaHovered ? "0 4px 18px rgba(150,0,24,0.32)" : "none",
                      transform:   ctaHovered ? "translateY(-1px)" : "none",
                      transition:  "all 0.25s ease",
                    }
              }
            >
              Inscriptions
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            {/* Hamburger */}
            <button
              className="lg:hidden p-1.5 -mr-1.5 flex flex-col justify-center gap-[5px]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
            >
              {[
                menuOpen ? "rotate(45deg) translateY(6.5px)"  : "none",
                undefined,
                menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none",
              ].map((transform, i) =>
                i === 1 ? (
                  <span
                    key={i}
                    className="block h-[1.5px]"
                    style={{
                      width:      "22px",
                      background:  transparent ? "rgba(255,255,255,0.90)" : barColor,
                      opacity:     menuOpen ? 0 : 1,
                      transform:   menuOpen ? "scaleX(0)" : "scaleX(1)",
                      transition:  "opacity 0.2s ease, transform 0.2s ease, background 0.5s ease",
                    }}
                  />
                ) : (
                  <span
                    key={i}
                    className="block h-[1.5px] origin-center"
                    style={{
                      width:      "22px",
                      background:  transparent ? "rgba(255,255,255,0.90)" : barColor,
                      transform,
                      transition:  "transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.5s ease",
                    }}
                  />
                )
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <div
          className="lg:hidden overflow-hidden"
          style={{
            maxHeight:  menuOpen ? "640px" : "0px",
            opacity:    menuOpen ? 1 : 0,
            transition: "max-height 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease",
          }}
        >
          <nav
            className="border-t pt-1 pb-8 border-black/6"
            aria-label="Menu mobile"
          >

            {links.map((link, i) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between py-[15px] px-1 border-b last:border-b-0 group border-black/5"
                  style={{
                    opacity:          menuOpen ? 1 : 0,
                    transform:        menuOpen ? "none" : "translateY(8px)",
                    transition:       `opacity 0.4s ease ${i * 35}ms, transform 0.4s ease ${i * 35}ms`,
                  }}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className="font-mono text-[10px] font-semibold w-5"
                      style={{ color: active ? "#960018" : "rgba(10,10,10,0.22)" }}
                    >
                      {link.num}
                    </span>
                    <span
                      className="text-[15px] font-medium transition-colors duration-200"
                      style={{ color: active ? "#0a0a0a" : "rgba(10,10,10,0.58)" }}
                    >
                      {link.label}
                    </span>
                  </div>
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    style={{ color: active ? "#960018" : "rgba(10,10,10,0.18)" }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })}

            {/* Mobile CTA */}
            <div
              className="pt-6 space-y-2"
              style={{
                opacity:    menuOpen ? 1 : 0,
                transform:  menuOpen ? "none" : "translateY(8px)",
                transition: "opacity 0.4s ease 210ms, transform 0.4s ease 210ms",
              }}
            >
              <Link
                href="/inscriptions"
                className="flex items-center justify-center gap-2 w-full bg-rouge text-white text-[14px] font-semibold py-4 rounded-2xl hover:bg-rouge-dark transition-colors duration-200"
              >
                Démarrer une inscription
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <p className="text-center text-[11px] tracking-wide pt-1 text-black/25">
                Ouakam – Cité Avion · Dakar, Sénégal
              </p>
            </div>

          </nav>
        </div>

      </div>
    </header>
  );
}
