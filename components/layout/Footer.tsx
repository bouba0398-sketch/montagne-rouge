import Link from "next/link";

const WHATSAPP = "https://wa.me/221770000000";

const WHATSAPP_ICON = (
  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="font-semibold text-lg mb-3">
              Montagne <span className="text-rouge">Rouge</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-8">
              L&apos;école internationale privée de référence à Dakar,
              formant les leaders de demain depuis plus de 15 ans.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-medium px-5 py-3 rounded-full hover:bg-[#1fba58] transition-colors"
            >
              {WHATSAPP_ICON}
              Contacter sur WhatsApp
            </a>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-white/25 mb-5">
              Navigation
            </h3>
            <ul className="space-y-3.5">
              {[
                ["/", "Accueil"],
                ["/ecole", "L'École"],
                ["/pedagogie", "Pédagogie"],
                ["/admissions", "Admissions"],
                ["/galerie", "Galerie"],
                ["/alumni", "Alumni"],
                ["/videos", "Vidéos"],
                ["/actualites", "Actualités"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/40 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-white/25 mb-5">
              Contact
            </h3>
            <ul className="space-y-3.5 text-sm text-white/40">
              <li>Dakar, Sénégal</li>
              <li>
                <a
                  href="tel:+221770000000"
                  className="hover:text-white transition-colors"
                >
                  +221 77 000 00 00
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@montagnerouge.sn"
                  className="hover:text-white transition-colors"
                >
                  contact@montagnerouge.sn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Montagne Rouge. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link
              href="/mentions-legales"
              className="text-xs text-white/25 hover:text-white/60 transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/confidentialite"
              className="text-xs text-white/25 hover:text-white/60 transition-colors"
            >
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
