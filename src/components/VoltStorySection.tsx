"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Scene = {
  name: string;
  subtitle: string;
  planet: string;
  species: string;
  age: string;
  power: string;
  framesPath: string;
  totalFrames: number;
  side: "left" | "right" | "center";
  story: string;
};

const scenes: Scene[] = [
  {
    name: "Volt Orion Spark",
    subtitle: "Guardião das Estrelas",
    planet: "Lúmina Prime",
    species: "Humano Evoluído",
    age: "13 anos terrestres",
    power: "Energia astral e velocidade cósmica",
    framesPath: "/frames/theboy",
    totalFrames: 90,
    side: "left",
    story:
      "Volt nasceu em Lúmina Prime, um planeta iluminado pelos Cristais Astrais. Curioso e corajoso desde pequeno, ele encontrou o Núcleo Tempestade durante uma expedição proibida e despertou uma energia azul capaz de transformar seu destino para sempre.",
  },
  {
    name: "Byte Spark",
    subtitle: "Gênio Tecnológico Cósmico",
    planet: "Nebulon-X7",
    species: "Lumibot Astra",
    age: "12 anos cósmicos",
    power: "Tecnologia, portais e leitura de códigos antigos",
    framesPath: "/frames/thealien1",
    totalFrames: 96,
    side: "right",
    story:
      "Byte nasceu em Nebulon-X7, um mundo cercado por anéis luminosos e cidades suspensas entre cristais energéticos. Desde pequeno, entendia máquinas, códigos e invenções impossíveis, tornando-se o parceiro tecnológico perfeito para as missões intergalácticas.",
  },
  {
    name: "Zigg Morpho Spark",
    subtitle: "Metamorfo de Prismara",
    planet: "Prismara",
    species: "Morpho Prismariano",
    age: "11 anos cósmicos",
    power: "Mudar de forma: bola, quadrado, triângulo e muito mais",
    framesPath: "/frames/thealien3",
    totalFrames: 76,
    side: "left",
    story:
      "Zigg nasceu em Prismara, um planeta onde ninguém possui forma fixa. Enquanto outros habitantes aprendiam poucas transformações, Zigg mudava de forma o tempo todo, rolando como bola, virando quadrado, triângulo e criando novas maneiras de escapar, brincar e proteger seus amigos.",
  },
];

function getFrame(path: string, frame: number) {
  return `${path}/frame_${String(frame).padStart(4, "0")}.webp`;
}

export default function VoltStorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentScene = scenes[activeScene];

  const currentFrame = useMemo(() => {
    const frame = Math.floor(progress * (currentScene.totalFrames - 1)) + 1;
    return Math.min(currentScene.totalFrames, Math.max(1, frame));
  }, [progress, currentScene]);

  useEffect(() => {
    const updateScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const totalProgress = Math.min(Math.max(-rect.top / scrollable, 0), 1);

      const sceneRaw = totalProgress * scenes.length;
      const sceneIndex = Math.min(scenes.length - 1, Math.floor(sceneRaw));
      const localProgress = sceneRaw - sceneIndex;

      setActiveScene(sceneIndex);
      setProgress(localProgress);
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[900vh] bg-black text-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* NEBULOSA */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.45),transparent_32%),radial-gradient(circle_at_75%_25%,rgba(168,85,247,0.35),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.25),transparent_38%),linear-gradient(to_bottom,#020617,#000)]" />

        <div className="absolute inset-0 opacity-40 blur-3xl animate-pulse bg-[conic-gradient(from_180deg_at_50%_50%,rgba(59,130,246,0.35),rgba(168,85,247,0.3),rgba(34,211,238,0.25),rgba(59,130,246,0.35))]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:42px_42px] opacity-20" />

        {/* CONTEÚDO */}
        <div
          className={`relative z-10 flex h-full items-center gap-12 px-10 transition-all duration-700 ${
            currentScene.side === "right"
              ? "flex-row-reverse"
              : currentScene.side === "center"
              ? "justify-center"
              : ""
          }`}
        >
          {/* FRAME */}
          <div
            className={`relative aspect-[9/16] overflow-hidden rounded-[2rem] border border-blue-300/30 bg-white/5 shadow-[0_0_90px_rgba(59,130,246,0.45)] ${
              currentScene.side === "center" ? "w-[36vw]" : "w-[34vw]"
            }`}
            style={{
              transform: `translateY(${progress * -35}px) scale(${
                0.96 + progress * 0.08
              })`,
            }}
          >
            <img
              src={getFrame(currentScene.framesPath, currentFrame)}
              alt={currentScene.name}
              className="h-full w-full object-cover"
              draggable={false}
            />

            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.45),transparent_45%,rgba(255,255,255,0.08))]" />
          </div>

          {/* TEXTO */}
          <div
            className={`max-w-xl ${
              currentScene.side === "center" ? "absolute left-12" : ""
            }`}
            style={{
              transform: `translateY(${80 - progress * 160}px)`,
              opacity: 0.35 + progress * 0.65,
            }}
          >
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.5em] text-blue-300">
              Arquivo Cósmico 0{activeScene + 1}
            </p>

            <h2 className="text-5xl font-black uppercase leading-none text-blue-100 drop-shadow-[0_0_30px_rgba(96,165,250,0.95)] md:text-7xl">
              {currentScene.name}
            </h2>

            <p className="mt-3 text-xl font-bold text-cyan-300">
              {currentScene.subtitle}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
              <Info label="Planeta" value={currentScene.planet} />
              <Info label="Espécie" value={currentScene.species} />
              <Info label="Idade" value={currentScene.age} />
              <Info label="Poder" value={currentScene.power} />
            </div>

            <p className="mt-8 text-lg leading-8 text-white/80">
              {currentScene.story}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#000_0%,transparent_22%,transparent_76%,#000_100%)]" />
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
      <p className="text-xs uppercase tracking-[0.25em] text-blue-300">
        {label}
      </p>
      <p className="mt-2 font-semibold text-white">{value}</p>
    </div>
  );
}