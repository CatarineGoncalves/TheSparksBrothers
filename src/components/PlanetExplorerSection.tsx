"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

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
  glow: string;
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
    glow: "rgba(103, 232, 249, 0.7)",
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
    glow: "rgba(167, 139, 250, 0.72)",
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
    glow: "rgba(191, 219, 254, 0.66)",
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
    glow: "rgba(239, 68, 68, 0.7)",
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
    glow: "rgba(34, 211, 238, 0.7)",
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
    glow: "rgba(45, 212, 191, 0.68)",
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
    glow: "rgba(244, 114, 182, 0.7)",
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
    glow: "rgba(251, 191, 36, 0.72)",
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
    glow: "rgba(52, 211, 153, 0.68)",
  },
];

function PlanetVisual({ planet }: { planet: Planet }) {
  const visualRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(visualRef, { amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 170, damping: 22 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 170, damping: 22 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    tiltX.set(y * -10);
    tiltY.set(x * 10);
  }

  function resetTilt() {
    tiltX.set(0);
    tiltY.set(0);
  }

  const shouldAnimate = isInView && !reduceMotion;

  return (
    <div
      ref={visualRef}
      className="relative grid aspect-square w-full max-w-[300px] place-items-center overflow-hidden rounded-3xl border border-white/15 bg-black/35 shadow-[0_0_35px_rgba(0,0,0,0.42)] [perspective:900px] lg:max-w-[360px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
    >
      <div
        aria-hidden="true"
        className="absolute inset-[15%] rounded-full opacity-60 blur-3xl"
        style={{ background: planet.glow }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.12),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_45%)]"
      />

      <motion.div
        className="relative z-10 h-[86%] w-[86%] [transform-style:preserve-3d] will-change-transform"
        style={{ rotateX: smoothTiltX, rotateY: smoothTiltY }}
        animate={shouldAnimate ? { y: [0, -10, 0] } : { y: 0 }}
        transition={{
          duration: 5,
          repeat: shouldAnimate ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        <Image
          src={planet.image}
          alt={`Ilustração do planeta ${planet.name}`}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 300px, 82vw"
          className="select-none object-contain"
          draggable={false}
          style={{ filter: `drop-shadow(0 0 34px ${planet.glow})` }}
        />
      </motion.div>
    </div>
  );
}

export default function PlanetExplorerSection() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet>(planets[1]);

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#0d141a] px-5 py-10 text-white md:px-10 lg:h-screen lg:max-h-screen lg:py-6">
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
                  aria-pressed={isActive}
                  aria-controls="planet-intel"
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
                    <Image
                      src={planet.image}
                      alt=""
                      aria-hidden="true"
                      width={56}
                      height={56}
                      sizes="56px"
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
            id="planet-intel"
            key={selectedPlanet.id}
            className="grid gap-6 rounded-[2rem] border border-white/10 bg-[#101920]/80 p-6 shadow-[0_0_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-8 lg:grid-cols-[1fr_0.95fr] min-h-0 overflow-hidden"
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center justify-center min-h-0">
              <PlanetVisual planet={selectedPlanet} />
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
