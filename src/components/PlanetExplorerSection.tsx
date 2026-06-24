/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Planet = {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  appearance: string;
  populationTitle: string;
  rulerTitle: string;
  hub: string;
  color: string;
};

const planets: Planet[] = [
  {
    id: "crysalis",
    name: "Crysalis",
    subtitle: "O Mundo Congelado",
    image: "/assets/planets/Crysalis.png",
    appearance: "Planeta azul-claro coberto por gelo e cristais gigantes.",
    populationTitle: "Crysalianos",
    rulerTitle: "Rainha Frostara",
    hub: "Cidadela Glacial",
    color: "from-cyan-300 to-blue-500",
  },
  {
    id: "lumina",
    name: "Lúmina Prime",
    subtitle: "O Planeta dos Cristais Astrais",
    image: "/assets/planets/lumina.png",
    appearance: "Planeta azul-turquesa iluminado por cristais energéticos gigantes.",
    populationTitle: "Luminaris",
    rulerTitle: "Rei Solaris Orion",
    hub: "Crystal City",
    color: "from-cyan-300 to-violet-500",
  },
  {
    id: "lunaris",
    name: "Lunaris",
    subtitle: "O Mundo Lunar",
    image: "/assets/planets/lunaris.png",
    appearance: "Planeta prateado com crateras brilhantes e névoa azulada.",
    populationTitle: "Lunarianos",
    rulerTitle: "Rainha Selene",
    hub: "Templo Selênico",
    color: "from-slate-200 to-blue-300",
  },
  {
    id: "mors",
    name: "Mors Astra",
    subtitle: "O Planeta Sombrio",
    image: "/assets/planets/morts.png",
    appearance: "Planeta escuro, rochoso, com rachaduras vermelhas e energia sombria.",
    populationTitle: "Vorgaths",
    rulerTitle: "Imperador Vorgath",
    hub: "Trono Obsidiano",
    color: "from-red-500 to-purple-900",
  },
  {
    id: "nebulon",
    name: "Nebulon-X7",
    subtitle: "O Mundo Tecnológico",
    image: "/assets/planets/nebulonx7.png",
    appearance: "Planeta cercado por anéis luminosos e cidades suspensas.",
    populationTitle: "Lumibot Astra",
    rulerTitle: "Arquimestre Nexon",
    hub: "Núcleo Neon",
    color: "from-blue-400 to-cyan-400",
  },
  {
    id: "ocearis",
    name: "Ocearis",
    subtitle: "O Planeta Oceânico",
    image: "/assets/planets/ocearis.png",
    appearance: "Planeta azul profundo com ilhas verdes, nuvens brancas e mares infinitos.",
    populationTitle: "Ocearianos",
    rulerTitle: "Rei Marinor",
    hub: "Atlântida Astra",
    color: "from-blue-500 to-emerald-400",
  },
  {
    id: "prismara",
    name: "Prismara",
    subtitle: "O Planeta das Formas",
    image: "/assets/planets/prismara.png",
    appearance: "Planeta colorido e cristalino, cheio de energia viva e mutável.",
    populationTitle: "Prismorfos",
    rulerTitle: "Mestre Morphos",
    hub: "Palácio Prisma",
    color: "from-pink-400 to-purple-500",
  },
  {
    id: "solarys",
    name: "Solarys",
    subtitle: "O Planeta Solar",
    image: "/assets/planets/Solarys.png",
    appearance: "Planeta dourado e quente, iluminado por energia solar intensa.",
    populationTitle: "Solaryanos",
    rulerTitle: "Rei Hélios",
    hub: "Coroa Solar",
    color: "from-yellow-300 to-orange-500",
  },
  {
    id: "verdantia",
    name: "Verdantia",
    subtitle: "O Mundo Verde",
    image: "/assets/planets/verdantia.png",
    appearance: "Planeta verde com florestas gigantes, cachoeiras e árvores colossais.",
    populationTitle: "Verdantianos",
    rulerTitle: "Rainha Florenna",
    hub: "Jardim Colossal",
    color: "from-emerald-300 to-green-700",
  },
];

export default function PlanetExplorerSection() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet>(planets[1]);

  return (
    <section className="relative h-screen max-h-screen overflow-hidden bg-[#0d141a] px-5 py-6 text-white md:px-10 flex flex-col justify-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,209,255,0.12),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.12),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_30%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-col h-full justify-between py-4 lg:py-8">
        <header className="mb-4 text-center shrink-0">
          {/* <span className="text-cyan-400 drop-shadow-[0_0_18px_rgba(34,211,238,0.55)]">
           Descubra
          </span> */}
          <motion.h2
            className="text-3xl font-black tracking-tight md:text-5xl"
            initial={{ opacity: 0, y: -18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Asterion Nexus{" "}

          </motion.h2>

          <motion.p
            className="mt-2 text-xs text-cyan-100/80 md:text-sm"
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Explore os diversos mundos da galáxia. Clique em um planeta para
            decodificar seus segredos.
          </motion.p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[330px_1fr] items-stretch min-h-0 overflow-hidden">
          <motion.aside
            className="flex flex-row gap-4 overflow-x-auto pb-4 pr-1 lg:flex-col lg:overflow-y-auto lg:pb-0 lg:pl-3 lg:pr-0 lg:[direction:rtl] scrollbar-custom min-h-0"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {planets.map((planet) => {
              const isActive = selectedPlanet.id === planet.id;

              return (
                <button
                  key={planet.id}
                  onClick={() => setSelectedPlanet(planet)}
                  className={[
                    "group flex w-[285px] shrink-0 lg:w-full items-center gap-5 rounded-2xl border p-4 text-left transition duration-300 lg:[direction:ltr]",
                    "bg-white/[0.025] shadow-[0_0_40px_rgba(0,0,0,0.16)] backdrop-blur-md",
                    isActive
                      ? "border-cyan-400 shadow-[0_0_28px_rgba(34,211,238,0.28)]"
                      : "border-white/8 hover:border-cyan-300/50 hover:bg-white/[0.04]",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br",
                      planet.color,
                      "shadow-[0_0_24px_rgba(255,255,255,0.12)]",
                    ].join(" ")}
                  >
                    <img
                      src={planet.image}
                      alt={planet.name}
                      className="h-12 w-12 rounded-full object-contain drop-shadow-[0_0_14px_rgba(255,255,255,0.25)] transition duration-300 group-hover:scale-110"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-black text-white">
                      {planet.name}
                    </h3>
                    <p className="mt-0.5 text-xs font-semibold text-white/60">
                      {planet.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </motion.aside>

          <motion.div
            key={selectedPlanet.id}
            className="grid gap-6 rounded-[2rem] border border-white/10 bg-[#101920]/80 p-6 shadow-[0_0_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-8 lg:grid-cols-[1fr_0.95fr] min-h-0 overflow-hidden"
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center justify-center min-h-0">
              <div className="relative grid aspect-square w-full max-w-[280px] lg:max-w-[320px] place-items-center overflow-hidden rounded-3xl border border-violet-400/80 bg-black/35 shadow-[0_0_30px_rgba(168,85,247,0.45)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(168,85,247,0.28),transparent_28%),radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_45%)]" />

                <motion.img
                  src={selectedPlanet.image}
                  alt={selectedPlanet.name}
                  className="relative z-10 h-[72%] w-[72%] object-contain drop-shadow-[0_0_55px_rgba(168,85,247,0.72)]"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center min-h-0 overflow-y-auto pr-2 scrollbar-custom">
              <p className="text-xs font-black uppercase tracking-wider text-violet-400">
                Planetary Intel
              </p>

              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                {selectedPlanet.name}
              </h2>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <p className="text-xs font-black uppercase text-white/65">
                  Primary Hub
                </p>
                <p className="mt-1 text-xl font-black text-violet-400">
                  {selectedPlanet.hub}
                </p>
              </div>

              <p className="mt-4 max-w-md text-sm font-semibold leading-6 text-white/65">
                {selectedPlanet.appearance} Lar dos{" "}
                <span className="text-white/85">
                  {selectedPlanet.populationTitle}
                </span>
                , governado por{" "}
                <span className="text-white/85">
                  {selectedPlanet.rulerTitle}
                </span>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}