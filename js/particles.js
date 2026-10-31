/**
 * ============================================================================
 * PHARMACEUTICAL SMALL MOLECULES BACKGROUND ENGINE (PURE SILVER EDITION)
 * Designed for Bevin Joy G - B.Tech Pharmaceutical Technology & AI
 * ============================================================================
 * Features:
 *   - Authentic 3D tumbling Small Molecules rendered in Pure Liquid Silver & Chrome.
 *   - Chemical scaffolds: Benzene/Phenyl rings, Indoles, Pyridines,
 *     Aliphatic chains, and Triatomic bio-clusters.
 *   - Silver atom nodes with 3D radial metallic specular chrome shine.
 *   - Liquid silver bonds with parallel double-bond indicators.
 *   - Intermolecular proximity hydrogen-bonding interactions in silver starlight.
 *   - Front page (Hero): Pure solid black, zero animation on the hero section.
 *   - Next page onwards: Smoothly fades in and floats behind About, Skills,
 *     Projects, Experience, Certifications, and Contact.
 *   - Interactive: Cursor creates gentle 3D molecular parallax tilt & fluid drift.
 *   - Clean: Zero UI switcher options or buttons.
 * ============================================================================
 */

(function () {
  'use strict';

  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrameId = null;
  let time = 0;
  let scrollY = 0;
  let scrollOpacity = 0;
  let lastScrollY = window.pageYOffset || 0;
  let scrollVelocity = 0;
  let scrollTilt = 0;

  // 3D Perspective settings
  const FOCAL_LENGTH = 500;

  // Mouse & 3D tilt tracking
  const mouse = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    tiltX: 0,
    tiltY: 0,
    active: false
  };

  // Color palettes - PURE SILVER & CHROME EDITION (10% OPACITY AMBIENT)
  const PALETTES = {
    dark: {
      bondPrimary: 'rgba(203, 213, 225, ',   // Liquid Silver Chrome (#cbd5e1)
      bondSecondary: 'rgba(248, 250, 252, ', // Specular White Silver (#f8fafc)
      hBond: 'rgba(203, 213, 225, 0.10)',    // Translucent Silver Dotted Line (10% opacity)
      atomLight: '#ffffff',                  // Pure Chrome Specular Highlight
      atomMid: '#cbd5e1',                    // Polished Silver Core
      atomDark: '#64748b',                   // Metallic Rim Shadow
      atomGlow: 'rgba(226, 232, 240, 0.04)', // Ambient Silver Halo
      bgTint: 'rgba(4, 5, 8, 0.45)',
      dustColor: 'rgba(226, 232, 240, '      // Shimmering Silver Dust
    },
    light: {
      bondPrimary: 'rgba(71, 85, 105, ',     // Polished Gunmetal & Dark Silver (#475569)
      bondSecondary: 'rgba(100, 116, 139, ', // Steel Chrome Accent (#64748b)
      hBond: 'rgba(100, 116, 139, 0.08)',    // Subtle Platinum-Slate Dotted Line
      atomLight: '#94a3b8',                  // Architectural Silver Highlight
      atomMid: '#475569',                    // Deep Gunmetal Core
      atomDark: '#1e293b',                   // Deep Shadow Rim
      atomGlow: 'rgba(100, 116, 139, 0.03)', // Soft Platinum Glow
      bgTint: 'rgba(248, 250, 252, 0.45)',
      dustColor: 'rgba(100, 116, 139, '      // Subtle Slate-Silver Dust
    }
  };

  let isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';

  // ============================================================================
  // 3D SMALL MOLECULE ARCHITECTURE
  // ============================================================================
  class SmallMolecule {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = (Math.random() - 0.5) * width * 1.25;
      this.y = initial ? (Math.random() - 0.5) * height * 1.3 : height * 0.7;
      this.z = (Math.random() - 0.5) * 450;

      // Gentle drifting velocities in solution
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = -(Math.random() * 0.45 + 0.2);
      this.vz = (Math.random() - 0.5) * 0.2;

      // 3D Rotational dynamics (tumbling molecules)
      this.rotX = Math.random() * Math.PI * 2;
      this.rotY = Math.random() * Math.PI * 2;
      this.rotZ = Math.random() * Math.PI * 2;
      this.vRotX = (Math.random() - 0.5) * 0.012;
      this.vRotY = (Math.random() - 0.5) * 0.015;
      this.vRotZ = (Math.random() - 0.5) * 0.010;

      // Molecule Type (Authentic pharmaceutical small molecule motifs)
      const types = ['benzene', 'indole', 'pyridine', 'aliphatic', 'triatomic'];
      this.type = types[Math.floor(Math.random() * types.length)];

      this.nodes = [];
      this.bonds = [];
      // Miniaturized molecular scale (subtle, delicate micro-molecules)
      this.scale = Math.random() * 0.18 + 0.48;
      // Scroll parallax depth variation
      this.speedScale = Math.random() * 0.45 + 0.8;

      this.buildStructure();
    }

    buildStructure() {
      const s = this.scale;

      if (this.type === 'benzene') {
        // Aromatic 6-membered phenyl ring with functional branch
        const r = 13.5 * s;
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI) / 3;
          this.nodes.push({ x: r * Math.cos(a), y: r * Math.sin(a), z: 0, isTerminal: false });
          this.bonds.push({ u: i, v: (i + 1) % 6, order: i % 2 === 0 ? 2 : 1 });
        }
        // Attached functional group branch
        this.nodes.push({ x: r * 1.65, y: 0, z: 3 * s, isTerminal: false });
        this.bonds.push({ u: 0, v: 6, order: 1 });
        this.nodes.push({ x: r * 2.15, y: 4.5 * s, z: 5 * s, isTerminal: true });
        this.bonds.push({ u: 6, v: 7, order: 1 });
      }
      else if (this.type === 'indole') {
        // Fused 6-member + 5-member bicyclic core (Tryptophan / Kinase inhibitor motif)
        const r = 11.5 * s;
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI) / 3;
          this.nodes.push({ x: r * Math.cos(a), y: r * Math.sin(a), z: 0, isTerminal: false });
          this.bonds.push({ u: i, v: (i + 1) % 6, order: i === 0 ? 2 : 1 });
        }
        // 5-membered ring fused onto bond 1-2
        this.nodes.push({ x: r * 1.55, y: r * 0.45, z: 3 * s, isTerminal: false });
        this.nodes.push({ x: r * 1.55, y: -r * 0.45, z: -3 * s, isTerminal: false });
        this.bonds.push({ u: 1, v: 6, order: 1 });
        this.bonds.push({ u: 6, v: 7, order: 2 });
        this.bonds.push({ u: 7, v: 2, order: 1 });
      }
      else if (this.type === 'pyridine') {
        // 6-membered heterocyclic ring with attached methyl
        const r = 12.5 * s;
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI) / 3;
          this.nodes.push({
            x: r * Math.cos(a),
            y: r * Math.sin(a),
            z: (i % 2 === 0 ? 2 : -2) * s,
            isTerminal: false
          });
          this.bonds.push({ u: i, v: (i + 1) % 6, order: i % 2 === 1 ? 2 : 1 });
        }
        this.nodes.push({ x: -r * 1.6, y: 0, z: 0, isTerminal: true });
        this.bonds.push({ u: 3, v: 6, order: 1 });
      }
      else if (this.type === 'aliphatic') {
        // Small drug fragment chain (zig-zag backbone)
        const step = 9 * s;
        for (let i = 0; i < 5; i++) {
          const y = (i % 2 === 0 ? 5 : -5) * s;
          const z = (i % 2 === 0 ? 2.5 : -2.5) * s;
          this.nodes.push({
            x: (i - 2) * step,
            y: y,
            z: z,
            isTerminal: i === 4
          });
          if (i > 0) {
            this.bonds.push({ u: i - 1, v: i, order: 1 });
          }
        }
        // Carbonyl =O
        this.nodes.push({ x: -step, y: -11 * s, z: 3 * s, isTerminal: false });
        this.bonds.push({ u: 1, v: 5, order: 2 });
      }
      else {
        // Small Triatomic Bio-ligand cluster
        const r = 8 * s;
        this.nodes.push({ x: 0, y: 0, z: 0, isTerminal: false });
        this.nodes.push({ x: r * 0.85, y: r * 0.65, z: 2 * s, isTerminal: true });
        this.nodes.push({ x: -r * 0.85, y: r * 0.65, z: -2 * s, isTerminal: true });
        this.bonds.push({ u: 0, v: 1, order: 1 });
        this.bonds.push({ u: 0, v: 2, order: 1 });
      }
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.z += this.vz;

      this.rotX += this.vRotX;
      this.rotY += this.vRotY;
      this.rotZ += this.vRotZ;

      // Wrap around screen boundaries with scroll continuity
      const boundX = width * 0.68;
      const boundY = height * 0.78;
      if (this.x < -boundX) this.x = boundX;
      if (this.x > boundX) this.x = -boundX;
      if (this.y < -boundY) {
        this.y = boundY;
        this.x = (Math.random() - 0.5) * width * 1.25;
      } else if (this.y > boundY) {
        this.y = -boundY;
        this.x = (Math.random() - 0.5) * width * 1.25;
      }
      if (this.z < -250 || this.z > 250) this.vz *= -1;
    }
  }

  // Shimmering Silver Stardust
  class MicroAtom {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = (Math.random() - 0.5) * width * 1.3;
      this.y = initial ? (Math.random() - 0.5) * height * 1.3 : height * 0.7;
      this.z = (Math.random() - 0.5) * 450;
      this.radius = Math.random() * 0.9 + 0.35;
      this.vy = -(Math.random() * 0.35 + 0.12);
      this.driftFreq = Math.random() * 0.02 + 0.01;
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.y += this.vy;
      this.x += Math.sin(time * this.driftFreq) * 0.35;
      if (this.y < -height * 0.78) {
        this.y = height * 0.78;
        this.x = (Math.random() - 0.5) * width * 1.3;
      } else if (this.y > height * 0.78) {
        this.y = -height * 0.78;
        this.x = (Math.random() - 0.5) * width * 1.3;
      }
    }
  }

  let molecules = [];
  let microAtoms = [];

  function initMolecules() {
    molecules = [];
    microAtoms = [];
    const molCount = width < 768 ? 24 : 40;
    for (let i = 0; i < molCount; i++) {
      molecules.push(new SmallMolecule());
    }
    const dustCount = width < 768 ? 25 : 55;
    for (let i = 0; i < dustCount; i++) {
      microAtoms.push(new MicroAtom());
    }
  }

  // ============================================================================
  // 3D MATH PROJECTION
  // ============================================================================
  function projectPoint(x, y, z, cx, cy, rotY, rotX) {
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const x1 = x * cosY + z * sinY;
    const z1 = -x * sinY + z * cosY;

    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;

    const scale = FOCAL_LENGTH / (FOCAL_LENGTH + z2 + 350);
    const projX = cx + x1 * scale;
    const projY = cy + y2 * scale;
    const depthFactor = Math.max(0.15, Math.min(1.3, (z2 + 300) / 480));

    return { x: projX, y: projY, z: z2, scale: scale, depthFactor: depthFactor };
  }

  // ============================================================================
  // RESIZE & SCROLL TRACKING
  // ============================================================================
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);
    initMolecules();
  }

  function updateScroll() {
    const currentY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const dy = currentY - lastScrollY;
    lastScrollY = currentY;
    scrollY = currentY;

    // Capture downward/upward scroll impulse for fluid molecular drift
    if (Math.abs(dy) > 0.5) {
      scrollVelocity += dy * 0.14;
      scrollVelocity = Math.max(-28, Math.min(28, scrollVelocity));
      scrollTilt += dy * 0.003;
      scrollTilt = Math.max(-0.25, Math.min(0.25, scrollTilt));
    }

    const heroSection = document.getElementById('hero');
    const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;

    // Smooth fade in: 0 on hero page, fully visible on About section downwards
    const fadeStart = heroHeight * 0.22;
    const fadeEnd = heroHeight * 0.85;

    if (scrollY <= fadeStart) {
      scrollOpacity = 0;
    } else if (scrollY >= fadeEnd) {
      scrollOpacity = 1;
    } else {
      scrollOpacity = (scrollY - fadeStart) / (fadeEnd - fadeStart);
    }

    canvas.style.opacity = String(scrollOpacity);
  }

  // ============================================================================
  // RENDER ANIMATION FRAME (PURE SILVER & CHROME)
  // ============================================================================
  function drawSmallMolecules() {
    if (scrollOpacity <= 0.01) return;

    ctx.clearRect(0, 0, width, height);

    const palette = PALETTES[isLightTheme ? 'light' : 'dark'];
    const cx = width / 2;
    const cy = height / 2;

    // Smooth tilt interpolation
    mouse.tiltX += (mouse.targetX - mouse.tiltX) * 0.05;
    mouse.tiltY += (mouse.targetY - mouse.tiltY) * 0.05;
    const rotY = mouse.tiltX * 0.35;
    const rotX = (mouse.tiltY * 0.25) + scrollTilt;

    // Fluid damping of scroll velocity (creates organic liquid inertia on scroll)
    scrollVelocity *= 0.91;
    scrollTilt *= 0.92;
    const scrollDelta = scrollVelocity;

    const projectedCenters = [];

    // 1. Draw and update Small Molecules in Liquid Silver
    for (let m = 0; m < molecules.length; m++) {
      const mol = molecules[m];

      // Smooth scroll motion: scrolling down moves molecules gently upward in 3D parallax
      mol.y -= scrollDelta * mol.speedScale;
      mol.rotX += scrollDelta * 0.0006;

      mol.update();

      const molCenter = projectPoint(mol.x, mol.y, mol.z, cx, cy, rotY, rotX);
      projectedCenters.push(molCenter);

      // Precalculate 3D rotation matrices for local molecule atoms
      const cosX = Math.cos(mol.rotX), sinX = Math.sin(mol.rotX);
      const cosY = Math.cos(mol.rotY), sinY = Math.sin(mol.rotY);
      const cosZ = Math.cos(mol.rotZ), sinZ = Math.sin(mol.rotZ);

      const projNodes = [];
      for (let n = 0; n < mol.nodes.length; n++) {
        const node = mol.nodes[n];

        // 3D Rotation of atom relative to molecule center
        const x1 = node.x * cosZ - node.y * sinZ;
        const y1 = node.x * sinZ + node.y * cosZ;

        const x2 = x1 * cosY + node.z * sinY;
        const z2 = -x1 * sinY + node.z * cosY;

        const y3 = y1 * cosX - z2 * sinX;
        const z3 = y1 * sinX + z2 * cosX;

        // Project relative to transformed molecule center
        const worldX = mol.x + x2;
        const worldY = mol.y + y3;
        const worldZ = mol.z + z3;

        const proj = projectPoint(worldX, worldY, worldZ, cx, cy, rotY, rotX);
        projNodes.push({ ...proj, isTerminal: node.isTerminal });
      }

      const alpha = molCenter.depthFactor * scrollOpacity;

      // Draw Liquid Silver Chemical Bonds
      for (let b = 0; b < mol.bonds.length; b++) {
        const bond = mol.bonds[b];
        const p1 = projNodes[bond.u];
        const p2 = projNodes[bond.v];
        if (!p1 || !p2) continue;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = palette.bondPrimary + (0.10 * alpha) + ')';
        ctx.lineWidth = Math.max(0.4, 1.15 * p1.scale);
        ctx.stroke();

        // Double bond parallel representation
        if (bond.order === 2) {
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          if (len > 0) {
            const offset = 2.2 * p1.scale;
            const nx = (-dy / len) * offset;
            const ny = (dx / len) * offset;
            ctx.beginPath();
            ctx.moveTo(p1.x + nx, p1.y + ny);
            ctx.lineTo(p2.x + nx, p2.y + ny);
            ctx.strokeStyle = palette.bondSecondary + (0.08 * alpha) + ')';
            ctx.lineWidth = Math.max(0.35, 0.75 * p1.scale);
            ctx.stroke();
          }
        }
      }

      // Draw Atom Nodes (Spheres with 10% Ambient Opacity Silver Styling)
      for (let n = 0; n < projNodes.length; n++) {
        const p = projNodes[n];
        const r = Math.max(0.8, (p.isTerminal ? 1.4 : 2.1) * p.scale);

        // Soft outer silver glow halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = palette.atomGlow;
        ctx.fill();

        // Atom sphere with radial metallic chrome gradient
        const grad = ctx.createRadialGradient(
          p.x - r * 0.35, p.y - r * 0.35, r * 0.1,
          p.x, p.y, r
        );
        grad.addColorStop(0, palette.atomLight);
        grad.addColorStop(0.45, palette.atomMid);
        grad.addColorStop(1, palette.atomDark);

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.globalAlpha = Math.min(0.12, alpha * 0.10);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // 2. Intermolecular Proximity Hydrogen-Bonds (Liquid Silver Dotted Lines, 10% opacity)
    const maxInteractDist = width < 768 ? 55 : 85;
    const len = projectedCenters.length;
    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const c1 = projectedCenters[i];
        const c2 = projectedCenters[j];
        const dx = c1.x - c2.x;
        const dy = c1.y - c2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxInteractDist) {
          const depthAlpha = (c1.depthFactor + c2.depthFactor) / 2;
          const hAlpha = (1 - dist / maxInteractDist) * 0.08 * depthAlpha * scrollOpacity;

          ctx.save();
          ctx.beginPath();
          ctx.setLineDash([3, 4]); // Dotted line for authentic hydrogen bonding
          ctx.moveTo(c1.x, c1.y);
          ctx.lineTo(c2.x, c2.y);
          ctx.strokeStyle = palette.bondSecondary + hAlpha + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    // 3. Shimmering Silver Stardust & Micro-Photons (10% Ambient Opacity)
    for (let d = 0; d < microAtoms.length; d++) {
      const atom = microAtoms[d];
      atom.y -= scrollDelta * 0.7;
      atom.update();
      const p = projectPoint(atom.x, atom.y, atom.z, cx, cy, rotY, rotX);
      if (p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) continue;

      const r = Math.max(0.6, atom.radius * p.scale);

      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = palette.dustColor + (atom.alpha * p.depthFactor * scrollOpacity * 0.10) + ')';
      ctx.fill();
    }
  }

  // ============================================================================
  // ANIMATION LOOP
  // ============================================================================
  function animate() {
    time += 1;
    drawSmallMolecules();
    animationFrameId = requestAnimationFrame(animate);
  }

  // ============================================================================
  // LISTENERS & THEME ADAPTATION
  // ============================================================================
  window.updateParticleTheme = function (theme) {
    isLightTheme = theme === 'light';
  };

  window.addEventListener('resize', () => {
    resize();
    updateScroll();
  });

  window.addEventListener('scroll', updateScroll, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX / width - 0.5) * 2;
    mouse.targetY = (e.clientY / height - 0.5) * 2;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.targetX = 0;
    mouse.targetY = 0;
    mouse.active = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.targetX = (e.touches[0].clientX / width - 0.5) * 2;
      mouse.targetY = (e.touches[0].clientY / height - 0.5) * 2;
      mouse.active = true;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.targetX = 0;
    mouse.targetY = 0;
    mouse.active = false;
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animate();
    }
  });

  // Ensure legacy switcher element is removed
  const legacySwitcher = document.getElementById('bg-anim-switcher');
  if (legacySwitcher) legacySwitcher.remove();

  // Initialize
  resize();
  updateScroll();
  animate();
})();
