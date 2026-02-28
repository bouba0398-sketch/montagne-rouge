import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const niveaux = [
  {
    num: "01",
    label: "Maternelle",
    age: "3 – 5 ans",
    desc: "Un cadre bienveillant pour les premiers apprentissages et l'éveil de la curiosité.",
    classes: "PS · MS · GS",
    img: "/niveaux-maternelle.jpg",
    imgAlt: "Jeunes enfants en activité d'éveil à Montagne Rouge",
  },
  {
    num: "02",
    label: "Primaire",
    age: "6 – 11 ans",
    desc: "Acquisition des fondamentaux avec une pédagogie active et des méthodes innovantes.",
    classes: "CP · CE1 · CE2 · CM1 · CM2",
    img: "/niveaux-primaire.jpg",
    imgAlt: "Élève du primaire lisant avec curiosité",
  },
  {
    num: "03",
    label: "Collège",
    age: "12 – 15 ans",
    desc: "Accompagnement individualisé pour préparer les élèves à l'excellence au lycée.",
    classes: "6ème · 5ème · 4ème · 3ème",
    img: "/niveaux-college.jpg",
    imgAlt: "Élèves du collège collaborant sur un projet",
  },
  {
    num: "04",
    label: "Lycée",
    age: "16 – 18 ans",
    desc: "Préparation intensive au Baccalauréat avec un suivi personnalisé de chaque élève.",
    classes: "2nde · 1ère · Terminale",
    img: "/niveaux-lycee.jpg",
    imgAlt: "Lycéens en remise de diplômes — ambition et réussite",
  },
];

export default function Niveaux() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/30 mb-3">
              Formation
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-black leading-tight"
              style={{ fontSize: "clamp(28px,3.5vw,42px)" }}
            >
              De la maternelle au lycée
            </h2>
          </div>
          <Link
            href="/pedagogie"
            className="inline-flex items-center gap-1 text-sm font-medium text-black/35 hover:text-black transition-colors self-start sm:self-auto"
          >
            Notre pédagogie
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {niveaux.map((n, i) => (
            <Reveal key={n.num} delay={i * 70}>
              <div className="group bg-white border border-black/8 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-rouge/20 hover:shadow-xl hover:shadow-black/6 cursor-pointer h-full flex flex-col">

                {/* Image header */}
                <div className="relative aspect-[16/9] overflow-hidden shrink-0">
                  <Image
                    src={n.img}
                    alt={n.imgAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col flex-1">
                  {/* Number */}
                  <div
                    className="font-display italic text-rouge/22 group-hover:text-rouge/55 transition-colors duration-300 leading-none mb-4 tabular-nums"
                    style={{ fontSize: "clamp(36px,3.5vw,48px)" }}
                  >
                    {n.num}
                  </div>

                  {/* Title & age */}
                  <h3 className="font-semibold text-black text-[18px] mb-1">
                    {n.label}
                  </h3>
                  <p className="text-xs text-rouge font-bold tracking-wide uppercase mb-4">
                    {n.age}
                  </p>

                  {/* Separator */}
                  <div className="w-8 h-px bg-black/10 group-hover:w-full group-hover:bg-rouge/20 transition-all duration-500 mb-4" />

                  <p className="text-sm text-black/45 leading-relaxed mb-4">
                    {n.desc}
                  </p>
                  <p className="text-[11px] text-black/25 font-medium tracking-wide mt-auto">
                    {n.classes}
                  </p>
                </div>

              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
