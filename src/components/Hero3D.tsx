import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { ChevronDown, Shield, Sparkles, Compass } from 'lucide-react';
import { BRAND_LOGOS } from '../data/content';
import { CountdownTimer } from './CountdownTimer';
import { soundEngine } from '../utils/audio';

interface Hero3DProps {
  onOpenApply: () => void;
}

const GEOPOLITICAL_QUOTES = [
  {
    author: "Dr. S. Jaishankar",
    text: "Diplomacy is about managing national interest in a world of volatile multipolarity.",
    color: "gold"
  },
  {
    author: "Otto von Bismarck",
    text: "Politics is the art of the possible, the attainable—the art of the next best.",
    color: "purple"
  },
  {
    author: "Lee Kuan Yew",
    text: "Leadership in a crisis requires swift, pragmatic execution over ideological rhetoric.",
    color: "gold"
  },
  {
    author: "Winston Churchill",
    text: "Diplomacy is the art of telling people to go to hell in such a way that they ask for directions.",
    color: "purple"
  },
  {
    author: "Kofi Annan",
    text: "Diplomacy is not just talking; it is mobilizing institutional power and bureaucratic resolve.",
    color: "gold"
  },
  {
    author: "Chanakya (Kautilya)",
    text: "A state is maintained by intelligence, strategic alliances, and unyielding treasury strength.",
    color: "purple"
  },
  {
    author: "Dag Hammarskjöld",
    text: "The UN was not created to take mankind to heaven, but to save humanity from hell.",
    color: "gold"
  },
  {
    author: "Angela Merkel",
    text: "Multilateral consensus is slow, but it remains the ultimate anchor against global anarchy.",
    color: "purple"
  },
  {
    author: "Henry Kissinger",
    text: "Foreign policy must balance national security with global equilibrium.",
    color: "gold"
  },
  {
    author: "Sun Tzu",
    text: "The supreme art of war is to subdue the enemy without fighting.",
    color: "purple"
  },
  {
    author: "Jawaharlal Nehru",
    text: "Peace is not a relationship of nations; it is a condition of mind brought about by serenity.",
    color: "gold"
  },
  {
    author: "Margaret Thatcher",
    text: "Being powerful is like being a lady. If you have to tell people you are, you aren't.",
    color: "purple"
  },
  {
    author: "Charles de Gaulle",
    text: "Politics is too serious a matter to be left to the politicians.",
    color: "gold"
  },
  {
    author: "Woodrow Wilson",
    text: "The seed of revolution is repression; institutions must adapt or crumble.",
    color: "purple"
  }
];

export const Hero3D: React.FC<Hero3DProps> = ({ onOpenApply }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  const taglines = [
    "Where Justice Finds Identity",
    "Leadership Is Not Given. It Is Earned.",
    "Diplomacy Beyond Boundaries",
    "Ideas Become Movements"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [taglines.length]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x141414, 0.006);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 8, 28);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // Group for Palace Hall Architecture
    const palaceGroup = new THREE.Group();

    // Floor - Polished Red Sandstone Marble Reflection Grid
    const floorGeo = new THREE.PlaneGeometry(140, 260);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x221316,
      roughness: 0.1,
      metalness: 0.88,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -6;
    palaceGroup.add(floor);

    // Gupta Vindhyan Sandstone & Antique Gold Materials
    const sandstoneMat = new THREE.MeshStandardMaterial({
      color: 0xC87A49, // Mathura / Red Vindhyan Sandstone
      roughness: 0.35,
      metalness: 0.2,
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xE5B83B, // Antique Imperial Gold Leaf
      roughness: 0.22,
      metalness: 0.85,
    });
    const sculptureMat = new THREE.MeshStandardMaterial({
      color: 0xD9A774, // Aged Sandstone Sculpture
      roughness: 0.4,
      metalness: 0.15,
    });

    // GUPTA PURNA-KUMBHA LOTUS PILLARS (Nagara Style Colonnade)
    const pillarsCount = 14;
    for (let i = 0; i < pillarsCount; i++) {
      const zPos = -48 + i * 8.5;

      const createGuptaPillar = (xPos: number) => {
        const pillarGroup = new THREE.Group();

        // 1. Plinth Base (Adhisthana)
        const baseGeo = new THREE.BoxGeometry(2.2, 1.2, 2.2);
        const base = new THREE.Mesh(baseGeo, sandstoneMat);
        base.position.y = -5.4;
        pillarGroup.add(base);

        // 2. Octagonal / Round Shaft (Stambha)
        const shaftGeo = new THREE.CylinderGeometry(0.75, 0.95, 15, 16);
        const shaft = new THREE.Mesh(shaftGeo, sandstoneMat);
        shaft.position.y = 2.7;
        pillarGroup.add(shaft);

        // Decorative Carved Rings (Mala-Bandha)
        const ringGeo = new THREE.TorusGeometry(0.85, 0.12, 12, 24);
        const ring1 = new THREE.Mesh(ringGeo, goldMat);
        ring1.rotation.x = Math.PI / 2;
        ring1.position.y = 4.5;
        pillarGroup.add(ring1);

        const ring2 = new THREE.Mesh(ringGeo, goldMat);
        ring2.rotation.x = Math.PI / 2;
        ring2.position.y = 1.0;
        pillarGroup.add(ring2);

        // 3. Purna-Kumbha Capital (Lotus Pot of Plenty - Classic Gupta Motif)
        const kumbhaGeo = new THREE.SphereGeometry(1.15, 16, 16);
        const kumbha = new THREE.Mesh(kumbhaGeo, sandstoneMat);
        kumbha.scale.set(1.0, 0.75, 1.0);
        kumbha.position.y = 10.6;
        pillarGroup.add(kumbha);

        // Lotus Foliage Lip around Pot
        const lipGeo = new THREE.TorusGeometry(1.05, 0.18, 12, 24);
        const lip = new THREE.Mesh(lipGeo, goldMat);
        lip.rotation.x = Math.PI / 2;
        lip.position.y = 10.8;
        pillarGroup.add(lip);

        // 4. Abacus Capital with Sculpted Brackets
        const abacusGeo = new THREE.BoxGeometry(2.4, 0.7, 2.4);
        const abacus = new THREE.Mesh(abacusGeo, sandstoneMat);
        abacus.position.y = 11.5;
        pillarGroup.add(abacus);

        // 5. Brass Lamp / Diya Sphere
        const diyaGeo = new THREE.SphereGeometry(0.38, 16, 16);
        const diyaMat = new THREE.MeshBasicMaterial({ color: 0xFFD700 });
        const diya = new THREE.Mesh(diyaGeo, diyaMat);
        diya.position.set(xPos > 0 ? -1.2 : 1.2, 3.5, 0);
        pillarGroup.add(diya);

        pillarGroup.position.set(xPos, 0, zPos);
        return pillarGroup;
      };

      palaceGroup.add(createGuptaPillar(-11.5));
      palaceGroup.add(createGuptaPillar(11.5));

      // Golden Diya / Torch Point Light along hallway
      if (i % 2 === 0) {
        const torchLightL = new THREE.PointLight(0xFFB84D, 1.8, 22);
        torchLightL.position.set(-9.8, 4.0, zPos);
        palaceGroup.add(torchLightL);

        const torchLightR = new THREE.PointLight(0xFFB84D, 1.8, 22);
        torchLightR.position.set(9.8, 4.0, zPos);
        palaceGroup.add(torchLightR);
      }
    }

    // GUPTA IMPERIAL ASSEMBLY HALL PORTAL & DHARMA CHAKRA TORANA (Replacing tomb with assembly throne portal)
    const assemblyPortalGroup = new THREE.Group();
    assemblyPortalGroup.position.set(0, 0, -56);

    // 1. Grand Imperial Torana Arch Pillars (Flanking Portal)
    const archPillarGeo = new THREE.BoxGeometry(2.4, 18, 2.4);
    const portalPillarL = new THREE.Mesh(archPillarGeo, sandstoneMat);
    portalPillarL.position.set(-8.5, 4, 0);
    assemblyPortalGroup.add(portalPillarL);

    const portalPillarR = new THREE.Mesh(archPillarGeo, sandstoneMat);
    portalPillarR.position.set(8.5, 4, 0);
    assemblyPortalGroup.add(portalPillarR);

    // Ornate Gold Capitals on Portal Pillars
    const pCapitalGeo = new THREE.BoxGeometry(3.2, 1.2, 3.2);
    const pCapL = new THREE.Mesh(pCapitalGeo, goldMat);
    pCapL.position.set(-8.5, 13, 0);
    assemblyPortalGroup.add(pCapL);

    const pCapR = new THREE.Mesh(pCapitalGeo, goldMat);
    pCapR.position.set(8.5, 13, 0);
    assemblyPortalGroup.add(pCapR);

    // 2. Triple Carved Torana Cross-Beams (Classical Sanchi / Gupta Gateway Architrave)
    for (let b = 0; b < 3; b++) {
      const beamGeo = new THREE.BoxGeometry(22, 1.1, 1.8);
      const beam = new THREE.Mesh(beamGeo, sandstoneMat);
      beam.position.set(0, 14.5 + b * 2.2, 0);
      assemblyPortalGroup.add(beam);

      // Gold Rosette Trims on Beams
      const trimGeo = new THREE.BoxGeometry(22.4, 0.25, 1.9);
      const trim = new THREE.Mesh(trimGeo, goldMat);
      trim.position.set(0, 14.5 + b * 2.2 + 0.6, 0);
      assemblyPortalGroup.add(trim);

      // Decorative Lotus Medallions along cross-beams
      for (let m = -3; m <= 3; m++) {
        if (m === 0) continue;
        const medallionGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.2, 16);
        const medallion = new THREE.Mesh(medallionGeo, goldMat);
        medallion.rotation.x = Math.PI / 2;
        medallion.position.set(m * 2.8, 14.5 + b * 2.2, 1.0);
        assemblyPortalGroup.add(medallion);
      }
    }

    // 3. Central Glowing Golden Dharma Chakra / Ashoka Wheel of Justice
    const chakraRimGeo = new THREE.TorusGeometry(3.2, 0.35, 16, 32);
    const chakraRim = new THREE.Mesh(chakraRimGeo, goldMat);
    chakraRim.position.set(0, 7.5, 0.5);
    assemblyPortalGroup.add(chakraRim);

    const chakraCenterGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.4, 24);
    const chakraCenter = new THREE.Mesh(chakraCenterGeo, goldMat);
    chakraCenter.rotation.x = Math.PI / 2;
    chakraCenter.position.set(0, 7.5, 0.5);
    assemblyPortalGroup.add(chakraCenter);

    // 24 Spokes of the Chakra Wheel
    for (let s = 0; s < 24; s++) {
      const spokeGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.8, 8);
      const spoke = new THREE.Mesh(spokeGeo, goldMat);
      const angle = (s / 24) * Math.PI * 2;
      spoke.position.set(
        Math.cos(angle) * 1.6,
        7.5 + Math.sin(angle) * 1.6,
        0.5
      );
      spoke.rotation.z = angle + Math.PI / 2;
      assemblyPortalGroup.add(spoke);
    }

    // Inner Glowing Backdrop Light behind Chakra
    const chakraLight = new THREE.PointLight(0xFFD700, 3.5, 30);
    chakraLight.position.set(0, 7.5, -1.0);
    assemblyPortalGroup.add(chakraLight);

    // 4. Imperial Assembly Podium / Speaker's Throne (Rajya Asana)
    const podiumBaseGeo = new THREE.BoxGeometry(10, 1.8, 4);
    const podiumBase = new THREE.Mesh(podiumBaseGeo, sandstoneMat);
    podiumBase.position.set(0, -4.2, 2);
    assemblyPortalGroup.add(podiumBase);

    const daisStepGeo = new THREE.BoxGeometry(12, 1.0, 6);
    const daisStep = new THREE.Mesh(daisStepGeo, sandstoneMat);
    daisStep.position.set(0, -5.2, 3);
    assemblyPortalGroup.add(daisStep);

    // Gold Trim on Podium Base
    const pTrimGeo = new THREE.BoxGeometry(10.2, 0.25, 4.2);
    const pTrim = new THREE.Mesh(pTrimGeo, goldMat);
    pTrim.position.set(0, -3.3, 2);
    assemblyPortalGroup.add(pTrim);

    // Sculpted Imperial Lion Capitals (Sinha Motifs flanking Podium)
    const createSinhaStatue = (xPos: number) => {
      const g = new THREE.Group();
      // Body Base
      const baseGeo = new THREE.BoxGeometry(1.4, 2.2, 1.4);
      const base = new THREE.Mesh(baseGeo, sculptureMat);
      base.position.y = -2.2;
      g.add(base);

      // Lion Head / Crown
      const headGeo = new THREE.SphereGeometry(0.8, 12, 12);
      const head = new THREE.Mesh(headGeo, goldMat);
      head.position.y = -0.6;
      g.add(head);

      g.position.set(xPos, 0, 3.5);
      return g;
    };

    assemblyPortalGroup.add(createSinhaStatue(-4.8));
    assemblyPortalGroup.add(createSinhaStatue(4.8));

    // Lotus Relief Panels on Portal Wings
    for (let m = 0; m < 6; m++) {
      const lotusGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.25, 16);
      const lotus = new THREE.Mesh(lotusGeo, goldMat);
      lotus.rotation.x = Math.PI / 2;
      lotus.position.set(-11.4, 3 + m * 2, -40 + m * 8);
      palaceGroup.add(lotus);

      const lotusR = lotus.clone();
      lotusR.position.x = 11.4;
      palaceGroup.add(lotusR);
    }

    palaceGroup.add(assemblyPortalGroup);

    // Floating Golden & Royal Purple Particles (Volumetric Dust)
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color(0xFFD700);
    const purpleColor = new THREE.Color(0x8A52ED);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 45;
      particlePos[i * 3 + 1] = Math.random() * 22 - 2;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 70;

      const mixColor = Math.random() > 0.4 ? goldColor : purpleColor;
      particleColors[i * 3] = mixColor.r;
      particleColors[i * 3 + 1] = mixColor.g;
      particleColors[i * 3 + 2] = mixColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    palaceGroup.add(particles);

    scene.add(palaceGroup);

    // High Quality Lighting
    const ambientLight = new THREE.AmbientLight(0xF5F3ED, 0.95);
    scene.add(ambientLight);

    const mainDirectional = new THREE.DirectionalLight(0xFFE8B0, 1.8);
    mainDirectional.position.set(0, 30, 20);
    scene.add(mainDirectional);

    // Key Golden Spotlight cutting through palace corridor
    const mainSpot = new THREE.SpotLight(0xC9A34E, 6.0);
    mainSpot.position.set(0, 28, 12);
    mainSpot.angle = Math.PI / 3.5;
    mainSpot.penumbra = 0.7;
    scene.add(mainSpot);

    // Royal Purple Fill Light
    const purpleLight = new THREE.PointLight(0x7C3AED, 4.0, 60);
    purpleLight.position.set(0, 0, -15);
    scene.add(purpleLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.001;
      mouseY = (e.clientY - windowHalfY) * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Scroll Reactive Camera Position with smooth Lerp interpolation
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Ultra-smooth mouse camera drift lerp
      targetX += (mouseX - targetX) * 0.035;
      targetY += (mouseY - targetY) * 0.035;

      // Ultra-smooth lerp for camera scroll depth
      currentScrollY += (targetScrollY - currentScrollY) * 0.045;

      // Scroll camera zoom depth with smooth falloff
      const scrollOffset = currentScrollY * 0.018;
      camera.position.z = Math.max(10, 28 - scrollOffset);
      camera.position.x = targetX * 8;
      camera.position.y = 8 + targetY * 4 - scrollOffset * 0.12;
      camera.lookAt(0, 2, -10);

      // Rotate particles smoothly
      particles.rotation.y = elapsedTime * 0.025;

      // Pulse main spotlight smoothly
      mainSpot.intensity = 3.5 + Math.sin(elapsedTime * 1.2) * 0.6;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Window Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#141414]">
      {/* 3D WebGL Canvas Layer */}
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-55" />

      {/* Atmospheric Overlays - Adjusted for high visibility and rich depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/30 via-transparent to-[#141414]/85 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_#141414_95%)] z-10 pointer-events-none" />

      {/* Hero Foreground Content */}
      <div className="relative z-20 w-full pt-28 pb-16 flex flex-col items-center">
        
        {/* Top Centered Content Wrapper */}
        <div className="max-w-6xl mx-auto px-6 text-center flex flex-col items-center w-full">
          {/* Emblem Reveal - High Precision Brand Alliance */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-6 md:gap-10 mb-8"
          >
            {/* Aequitas Emblem */}
            <div className="group relative flex flex-col items-center">
              <div className="relative p-1 rounded-full bg-gradient-to-b from-[#C9A34E]/60 via-[#8A6743]/30 to-transparent shadow-[0_0_35px_rgba(201,163,78,0.3)] group-hover:shadow-[0_0_50px_rgba(201,163,78,0.5)] transition-all duration-500">
                <img
                  src={BRAND_LOGOS.aequitas}
                  alt="Aequitas Symbol"
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover mix-blend-screen"
                />
              </div>
              <span className="mt-2 font-label-caps text-[10px] text-[#C9A34E] tracking-widest uppercase opacity-80">
                Aequitas
              </span>
            </div>

            {/* Fusion Cross Symbol */}
            <div className="flex flex-col items-center justify-center h-20 md:h-28">
              <span className="font-serif-luxury text-2xl md:text-3xl text-[#C9A34E] gold-gradient-text animate-pulse">
                ×
              </span>
            </div>

            {/* Aastitva Emblem */}
            <div className="group relative flex flex-col items-center">
              <div className="relative p-1 rounded-full bg-gradient-to-b from-[#4B2D8A]/70 via-[#2A1852]/40 to-transparent shadow-[0_0_35px_rgba(75,45,138,0.4)] group-hover:shadow-[0_0_50px_rgba(75,45,138,0.6)] transition-all duration-500">
                <img
                  src={BRAND_LOGOS.aastitva}
                  alt="Aastitva Symbol"
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover mix-blend-screen"
                />
              </div>
              <span className="mt-2 font-label-caps text-[10px] text-[#E6DEFF] tracking-widest uppercase opacity-80">
                Aastitva
              </span>
            </div>
          </motion.div>

          {/* Institutional Badge Line & Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#141414]/80 border border-[#C9A34E]/30 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-[#C9A34E]" />
              <span className="font-label-caps text-[11px] text-[#D9D7D2] tracking-widest uppercase">
                The Flagship Indian Youth Diplomatic Assembly
              </span>
            </div>

            <CountdownTimer targetDate="2026-11-14T09:00:00+05:30" />
          </motion.div>

          {/* Dynamic Assembling Serif Headline */}
          <div className="min-h-[120px] md:min-h-[160px] flex items-center justify-center mb-6">
            <motion.h1
              key={currentTaglineIndex}
              initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -25, filter: 'blur(8px)' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F3ED] text-glow-gold max-w-4xl leading-[1.15]"
            >
              {taglines[currentTaglineIndex]}
            </motion.h1>
          </div>

          {/* Subtitle Manifesto */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-sans text-base sm:text-lg md:text-xl text-[#D9D7D2]/80 max-w-2xl mx-auto leading-relaxed mb-12 font-light"
          >
            Where Indian royal heritage meets global diplomacy. We empower young negotiators, parliamentarians, and policy thinkers to shape the world order.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-5 justify-center mb-10"
          >
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenApply();
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-[#4B2D8A] via-[#351E63] to-[#141414] text-[#F5F3ED] font-label-caps text-xs tracking-[0.2em] uppercase font-bold rounded-none border border-[#C9A34E]/50 shadow-[0_0_35px_rgba(75,45,138,0.5)] hover:shadow-[0_0_50px_rgba(201,163,78,0.5)] hover:border-[#C9A34E] transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <Sparkles className="w-4 h-4 text-[#C9A34E] group-hover:rotate-12 transition-transform" />
              <span>Take Your Seat</span>
            </button>

            <a
              href="#purpose"
              onClick={() => soundEngine.playClick()}
              onMouseEnter={() => soundEngine.playHover()}
              className="w-full sm:w-auto px-9 py-4 bg-transparent text-[#D9D7D2] hover:text-[#F5F3ED] font-label-caps text-xs tracking-[0.2em] uppercase font-bold rounded-none border border-white/20 hover:border-[#C9A34E]/60 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
            >
              Enter The Assembly
            </a>
          </motion.div>
        </div>

        {/* FULL-WIDTH GEOPOLITICAL LEADERSHIP & BUREAUCRACY ANIMATED RIBBON */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="w-screen relative left-1/2 -translate-x-1/2 my-3 bg-gradient-to-r from-[#0C0812] via-[#1B1229] to-[#0C0812] border-y border-[#C9A34E]/60 py-2.5 overflow-hidden shadow-[0_0_25px_rgba(201,163,78,0.2)]"
        >
          {/* Subtle Ribbon Accent Lines */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-80" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-80" />

          {/* Continuous Ticker Track */}
          <div className="animate-marquee font-sans text-xs md:text-sm text-[#F5F3ED] tracking-wide flex items-center whitespace-nowrap">
            {[0, 1].map((batchIndex) => (
              <div
                key={batchIndex}
                className="flex shrink-0 items-center gap-10 pr-10"
                aria-hidden={batchIndex === 1}
              >
                {GEOPOLITICAL_QUOTES.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <span className="inline-flex items-center gap-2">
                      <span
                        className={`font-bold uppercase font-label-caps text-[11px] md:text-xs tracking-wider px-2 py-0.5 border ${
                          item.color === 'gold'
                            ? 'text-[#FFD700] bg-[#C9A34E]/20 border-[#C9A34E]/40'
                            : 'text-[#E6DEFF] bg-[#7C3AED]/20 border-[#7C3AED]/40'
                        }`}
                      >
                        {item.author}:
                      </span>
                      <span className="italic font-light text-[#D9D7D2] text-xs md:text-sm">
                        "{item.text}"
                      </span>
                    </span>
                    <span className="text-[#C9A34E] text-xs">❖</span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Centered Scroll Indicator */}
        <div className="max-w-6xl mx-auto px-6 text-center flex flex-col items-center w-full">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
            className="mt-8 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer group"
            onClick={() => {
              const purposeEl = document.getElementById('purpose');
              if (purposeEl) {
                purposeEl.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' });
              }
            }}
          >
            <span className="font-label-caps text-[9px] text-[#C9A34E] tracking-[0.25em] uppercase font-semibold group-hover:text-[#F5F3ED] transition-colors">
              Scroll To Begin Chapter I
            </span>
            <div className="p-1 rounded-full border border-[#C9A34E]/30 group-hover:border-[#C9A34E] transition-colors">
              <ChevronDown className="w-4 h-4 text-[#C9A34E] group-hover:translate-y-0.5 transition-transform" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
