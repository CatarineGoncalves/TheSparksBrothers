# 🌌 The Sparks Brothers - Landing Page & Planet Explorer

Bem-vindo ao repositório de **The Sparks Brothers**, uma experiência web cinematográfica e interativa desenvolvida com Next.js, Tailwind CSS e Framer Motion. 

Explore o universo, descubra planetas distantes, suas populações únicas e seus governantes nesta landing page altamente imersiva.

---

## 🚀 Funcionalidades Principais

*   **Painel Cinematográfico (CinematicHero):** Uma introdução impactante com foco na estética visual e narrativa do universo de *The Sparks Brothers*.
*   **Seção de História (VoltStorySection):** Mergulhe na lore e na jornada do universo, apresentando os segredos e mistérios de "Volt".
*   **Explorador Interativo de Planetas (PlanetExplorerSection):**
    *   Navegue por um mapa estelar com 9 planetas interativos.
    *   Animações fluidas de flutuação e rotação usando `framer-motion`.
    *   Painel de detalhes dinâmico para cada planeta mostrando **Aparência**, **População** (título/raça) e **Governante**, além de uma galeria visual integrada.
    *   Efeitos visuais avançados como gradientes de luz dinâmicos e sombreamentos realistas.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído usando o ecossistema moderno do React e Next.js:

*   **[Next.js 15+](https://nextjs.org/)** (App Router)
*   **[React](https://react.dev/)**
*   **[Tailwind CSS](https://tailwindcss.com/)** - Para estilização moderna e responsiva.
*   **[Framer Motion](https://www.framer.com/motion/)** - Para animações fluidas e interações premium.
*   **[Three.js](https://threejs.org/)** & **WebGL** - Integrações gráficas integradas aos efeitos do universo.
*   **TypeScript** - Garantia de tipagem forte e desenvolvimento escalável.

---

## 📂 Estrutura de Pastas Relevantes

```bash
├── app/
│   ├── layout.tsx         # Estrutura principal e importação de fontes/estilos globais
│   ├── page.tsx           # Página principal importando as seções
│   └── globals.css        # Configurações globais de CSS
├── src/
│   └── components/
│       ├── CinematicHero.tsx          # Seção hero de abertura
│       ├── VoltStorySection.tsx       # Seção narrativa/lore
│       └── PlanetExplorerSection.tsx  # O explorador de planetas e universo interativo
└── public/
    └── assets/
        └── planets/                   # Assets visuais dos planetas e do universo
```

---

## 💻 Como Executar Localmente

Siga os passos abaixo para rodar o projeto em seu ambiente local:

### 1. Clonar o Repositório
```bash
git clone https://github.com/CatarineGoncalves/TheSparksBrothers.git
cd cinema-landing
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Executar o Servidor de Desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação funcionando.

### 4. Build de Produção
Para gerar a versão otimizada de produção:
```bash
npm run build
npm run start
```
