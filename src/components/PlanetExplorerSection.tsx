/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";

type Planet = {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  appearance: string;
  populationTitle: string;
  rulerTitle: string;
  gallery: string[];
  top: string;
  left: string;
  size: number;
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
    gallery: ["/assets/planets/Crysalis.png"],
    top: "18%",
    left: "12%",
    size: 72,
  },
  {
    id: "lumina",
    name: "Lúmina Prime",
    subtitle: "O Planeta dos Cristais Astrais",
    image: "/assets/planets/lumina.png",
    appearance: "Planeta azul-turquesa iluminado por cristais energéticos gigantes.",
    populationTitle: "Luminaris",
    rulerTitle: "Rei Solaris Orion",
    gallery: ["/assets/planets/lumina.png"],
    top: "34%",
    left: "24%",
    size: 88,
  },
  {
    id: "lunaris",
    name: "Lunaris",
    subtitle: "O Mundo Lunar",
    image: "/assets/planets/lunaris.png",
    appearance: "Planeta prateado com crateras brilhantes e névoa azulada.",
    populationTitle: "Lunarianos",
    rulerTitle: "Rainha Selene",
    gallery: ["/assets/planets/lunaris.png"],
    top: "16%",
    left: "42%",
    size: 70,
  },
  {
    id: "mors",
    name: "Mors Astra",
    subtitle: "O Planeta Sombrio",
    image: "/assets/planets/morts.png",
    appearance: "Planeta escuro, rochoso, com rachaduras vermelhas e energia sombria.",
    populationTitle: "Vorgaths",
    rulerTitle: "Imperador Vorgath",
    gallery: ["/assets/planets/morts.png"],
    top: "58%",
    left: "13%",
    size: 82,
  },
  {
    id: "nebulon",
    name: "Nebulon-X7",
    subtitle: "O Mundo Tecnológico",
    image: "/assets/planets/nebulonx7.png",
    appearance: "Planeta cercado por anéis luminosos e cidades suspensas.",
    populationTitle: "Lumibot Astra",
    rulerTitle: "Arquimestre Nexon",
    gallery: ["/assets/planets/nebulonx7.png"],
    top: "48%",
    left: "43%",
    size: 92,
  },
  {
    id: "ocearis",
    name: "Ocearis",
    subtitle: "O Planeta Oceânico",
    image: "/assets/planets/ocearis.png",
    appearance: "Planeta azul profundo com ilhas verdes, nuvens brancas e mares infinitos.",
    populationTitle: "Ocearianos",
    rulerTitle: "Rei Marinor",
    gallery: ["/assets/planets/ocearis.png"],
    top: "25%",
    left: "66%",
    size: 78,
  },
  {
    id: "prismara",
    name: "Prismara",
    subtitle: "O Planeta das Formas",
    image: "/assets/planets/prismara.png",
    appearance: "Planeta colorido e cristalino, cheio de energia viva e mutável.",
    populationTitle: "Prismorfos",
    rulerTitle: "Mestre Morphos",
    gallery: ["/assets/planets/prismara.png"],
    top: "62%",
    left: "68%",
    size: 86,
  },
  {
    id: "solarys",
    name: "Solarys",
    subtitle: "O Planeta Solar",
    image: "/assets/planets/Solarys.png",
    appearance: "Planeta dourado e quente, iluminado por energia solar intensa.",
    populationTitle: "Solaryanos",
    rulerTitle: "Rei Hélios",
    gallery: ["/assets/planets/Solarys.png"],
    top: "12%",
    left: "82%",
    size: 76,
  },
  {
    id: "verdantia",
    name: "Verdantia",
    subtitle: "O Mundo Verde",
    image: "/assets/planets/verdantia.png",
    appearance: "Planeta verde com florestas gigantes, cachoeiras e árvores colossais.",
    populationTitle: "Verdantianos",
    rulerTitle: "Rainha Florenna",
    gallery: ["/assets/planets/verdantia.png"],
    top: "72%",
    left: "84%",
    size: 80,
  },
];

export default function PlanetExplorerSection() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  const shaderCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const threeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useNebulaShader(shaderCanvasRef);
  useThreeUniverse(threeCanvasRef);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
       {!selectedPlanet && (
        <div className="absolute left-1/2 top-10 z-20 w-full max-w-3xl -translate-x-1/2 px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.45em] text-cyan-200">
            The Sparks Brothers
          </p>

          <h2 className="mt-3 text-4xl font-black md:text-6xl">
            Explore a Galáxia
          </h2>

          <p className="mt-3 text-sm text-white/65 md:text-base">
            Clique em um planeta para descobrir seus povos, cidades e governantes.
          </p>
        </div>
      )}
      <canvas
        ref={shaderCanvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

      <canvas
        ref={threeCanvasRef}
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
      />

      <div className="absolute inset-0 z-[3] bg-black/45" />
      <div className="absolute inset-0 z-[4] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22),transparent_45%)]" />
      <div className="absolute inset-0 z-[4] bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.16),transparent_35%)]" />

     

      <div className="relative z-10 h-screen w-full">
        <AnimatePresence>
          {!selectedPlanet &&
            planets.map((planet, index) => (
              <motion.button
                key={planet.id}
                onClick={() => setSelectedPlanet(planet)}
                className="group absolute cursor-pointer rounded-full border-none bg-transparent p-0"
                style={{
                  top: planet.top,
                  left: planet.left,
                  width: planet.size,
                  height: planet.size,
                }}
                whileHover={{ scale: 1.18, zIndex: 30 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{ delay: index * 0.05 }}
              >
                <motion.img
                  src={planet.image}
                  alt={planet.name}
                  className="h-full w-full object-contain drop-shadow-[0_0_18px_rgba(125,211,252,0.75)]"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 3, 0, -3, 0],
                  }}
                  transition={{
                    duration: 4 + index * 0.25,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <span className="pointer-events-none absolute left-1/2 top-full mt-3 min-w-max -translate-x-1/2 rounded-full border border-white/15 bg-black/60 px-4 py-1.5 text-xs font-bold text-white opacity-0 shadow-xl backdrop-blur-md transition group-hover:opacity-100">
                  {planet.name}
                </span>
              </motion.button>
            ))}
        </AnimatePresence>

        <AnimatePresence>
          {selectedPlanet && (
            <motion.div
              className="absolute inset-0 z-20 grid grid-cols-1 items-center gap-8 px-6 py-10 lg:grid-cols-[420px_1fr]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className="flex justify-center">
                <motion.img
                  src={selectedPlanet.image}
                  alt={selectedPlanet.name}
                  className="h-[280px] w-[280px] object-contain drop-shadow-[0_0_80px_rgba(125,211,252,0.65)] md:h-[420px] md:w-[420px]"
                  initial={{ scale: 0.4, x: -120 }}
                  animate={{
                    scale: 1,
                    x: 0,
                    rotate: 360,
                  }}
                  exit={{ scale: 0.4, x: -120 }}
                  transition={{
                    rotate: {
                      duration: 24,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    scale: { duration: 0.7 },
                    x: { duration: 0.7 },
                  }}
                />
              </motion.div>

              <motion.div
                className="max-h-[84vh] overflow-y-auto rounded-3xl border border-white/20 bg-black/75 p-5 shadow-2xl backdrop-blur-xl md:p-7"
                initial={{ opacity: 0, x: 90 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 90 }}
              >
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
                  {selectedPlanet.subtitle}
                </p>

                <h2 className="mb-5 text-4xl font-black md:text-5xl">
                  {selectedPlanet.name}
                </h2>

                <div className="mb-6 flex gap-4 overflow-x-auto pb-3">
                  {selectedPlanet.gallery.map((image, index) => (
                    <div
                      key={image}
                      className="h-36 min-w-60 overflow-hidden rounded-2xl border border-white/15 bg-white/10"
                    >
                      <img
                        src={image}
                        alt={`${selectedPlanet.name} imagem ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <InfoCard title="🌍 Aparência" text={selectedPlanet.appearance} />

                  <InfoCard
                    title="👥 População"
                    text={`${selectedPlanet.populationTitle}`}
                  />

                  <InfoCard title="👑 Governante" text={selectedPlanet.rulerTitle} />
                </div>

                <button
                  onClick={() => setSelectedPlanet(null)}
                  className="mt-7 rounded-full bg-white px-7 py-3 font-bold text-black transition hover:scale-105"
                >
                  Voltar ao universo
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-5">
      <h3 className="mb-3 text-xl font-bold">{title}</h3>
      <p className="text-sm leading-relaxed text-white/80">{text}</p>
    </div>
  );
}

function useNebulaShader(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const activeCanvas: HTMLCanvasElement = canvas;
    const activeGl: WebGLRenderingContext = gl;

    let animationId = 0;

    const vertexShaderSource = `
      attribute vec2 a_position;

      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;

      uniform float u_time;
      uniform vec2 u_resolution;

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.y, u_resolution.x);

        float t = u_time * 0.1;

        vec3 color = vec3(0.02, 0.01, 0.05);

        float purple = smoothstep(0.4, 0.8, noise(p * 0.5 + t));
        color += vec3(0.18, 0.0, 0.32) * purple * (0.5 + 0.5 * sin(p.x + p.y + t));

        float blue = smoothstep(0.3, 0.9, noise(p * 0.8 - t * 0.5));
        color += vec3(0.0, 0.14, 0.28) * blue * (0.5 + 0.5 * cos(p.x - p.y + t * 0.7));

        float stars = pow(noise(p * 50.0), 20.0);
        stars += pow(noise(p * 100.0 + 10.0), 30.0) * 0.5;

        color += vec3(stars);

        color *= 1.0 - length(uv - 0.5) * 0.7;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function createShader(type: number, source: string) {
      const shader = activeGl.createShader(type);
      if (!shader) return null;

      activeGl.shaderSource(shader, source);
      activeGl.compileShader(shader);

      if (!activeGl.getShaderParameter(shader, activeGl.COMPILE_STATUS)) {
        console.error(activeGl.getShaderInfoLog(shader));
        activeGl.deleteShader(shader);
        return null;
      }

      return shader;
    }

    const vertexShader = createShader(activeGl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(activeGl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    const program = activeGl.createProgram();
    if (!program) return;

    activeGl.attachShader(program, vertexShader);
    activeGl.attachShader(program, fragmentShader);
    activeGl.linkProgram(program);

    if (!activeGl.getProgramParameter(program, activeGl.LINK_STATUS)) {
      console.error(activeGl.getProgramInfoLog(program));
      return;
    }

    activeGl.useProgram(program);

    const buffer = activeGl.createBuffer();
    activeGl.bindBuffer(activeGl.ARRAY_BUFFER, buffer);

    activeGl.bufferData(
      activeGl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      activeGl.STATIC_DRAW
    );

    const positionLocation = activeGl.getAttribLocation(program, "a_position");
    activeGl.enableVertexAttribArray(positionLocation);
    activeGl.vertexAttribPointer(positionLocation, 2, activeGl.FLOAT, false, 0, 0);

    const timeLocation = activeGl.getUniformLocation(program, "u_time");
    const resolutionLocation = activeGl.getUniformLocation(program, "u_resolution");

    function resize() {
      const width = activeCanvas.clientWidth || window.innerWidth;
      const height = activeCanvas.clientHeight || window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      activeCanvas.width = width * ratio;
      activeCanvas.height = height * ratio;

      activeGl.viewport(0, 0, activeCanvas.width, activeCanvas.height);
    }

    function render(time: number) {
      resize();

      if (timeLocation) {
        activeGl.uniform1f(timeLocation, time * 0.001);
      }

      if (resolutionLocation) {
        activeGl.uniform2f(resolutionLocation, activeCanvas.width, activeCanvas.height);
      }

      activeGl.drawArrays(activeGl.TRIANGLE_STRIP, 0, 4);

      animationId = requestAnimationFrame(render);
    }

    render(0);

    return () => {
      cancelAnimationFrame(animationId);
      activeGl.deleteProgram(program);
      activeGl.deleteShader(vertexShader);
      activeGl.deleteShader(fragmentShader);
      activeGl.deleteBuffer(buffer);
    };
  }, [canvasRef]);
}

function useThreeUniverse(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const activeCanvas: HTMLCanvasElement = canvas;

    let animationId = 0;
    let mouseX = 0;
    let mouseY = 0;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({
      canvas: activeCanvas,
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const sunGeo = new THREE.IcosahedronGeometry(1.5, 15);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xffcc33,
      transparent: true,
      opacity: 0.8,
      wireframe: true,
    });

    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    const glowGeo = new THREE.SphereGeometry(1.8, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.2,
    });

    const sunGlow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(sunGlow);

    function createRing(radius: number, color: number) {
      const geometry = new THREE.RingGeometry(radius, radius + 0.02, 96);
      const material = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.26,
      });

      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = Math.PI / 2;

      return ring;
    }

    const rings = [
      createRing(3, 0x00ffff),
      createRing(5, 0xff00ff),
      createRing(7, 0xffff00),
    ];

    rings.forEach((ring) => scene.add(ring));

    const particlesCount = 350;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 24;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    function resize() {
      const width = activeCanvas.clientWidth || window.innerWidth;
      const height = activeCanvas.clientHeight || window.innerHeight;

      renderer.setSize(width, height, false);

      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    }

    function onMouseMove(event: MouseEvent) {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    }

    function animate() {
      animationId = requestAnimationFrame(animate);

      sun.rotation.y += 0.005;
      sun.rotation.z += 0.002;

      sunGlow.scale.setScalar(1 + Math.sin(Date.now() * 0.002) * 0.05);

      particles.rotation.y += 0.001;

      rings.forEach((ring, index) => {
        ring.rotation.z += 0.0008 + index * 0.0004;
      });

      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;

      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    resize();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);

      renderer.dispose();

      sunGeo.dispose();
      sunMat.dispose();

      glowGeo.dispose();
      glowMat.dispose();

      rings.forEach((ring) => {
        ring.geometry.dispose();

        if (Array.isArray(ring.material)) {
          ring.material.forEach((material) => material.dispose());
        } else {
          ring.material.dispose();
        }
      });

      particlesGeo.dispose();
      particlesMat.dispose();
    };
  }, [canvasRef]);
}