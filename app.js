/**
 * App Logic - Static Multi-Page Editorial Portfolio
 * Drives interactivity, custom cursor, scroll progress, and dynamic data rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  // 1. Page Intro Animation (850ms reveal on Home)
  const introEl = document.getElementById('page-intro');
  if (introEl) {
    setTimeout(() => {
      introEl.style.opacity = '0';
      introEl.style.transition = 'opacity 0.45s ease-out';
      setTimeout(() => introEl.remove(), 460);
    }, 850);
  }

  // 2. Scroll Progress Bar (2px Burgundy)
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total > 0 && progressBar) {
      const pct = (window.scrollY / total) * 100;
      progressBar.style.width = `${pct}%`;
    }
  }, { passive: true });

  // 3. Desktop Custom Cursor
  const cursor = document.getElementById('custom-cursor');
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  if (cursor && !isTouch) {
    window.addEventListener('mousemove', (e) => {
      cursor.style.opacity = '1';
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;

      const target = e.target;
      if (!target) return;

      if (target.closest('[data-cursor="view"]')) {
        cursor.className = 'view';
      } else if (target.closest('a, button, [role="button"], input')) {
        cursor.className = 'hover';
      } else {
        cursor.className = '';
      }
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });
  }

  // 4. Floating Navbar Scroll Blur & Active Link Detection
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('bg-[#F8F3EE]/85', 'backdrop-blur-md', 'border-b', 'border-[#6F1D2B]/10', 'py-3.5');
        header.classList.remove('py-6', 'bg-transparent');
      } else {
        header.classList.remove('bg-[#F8F3EE]/85', 'backdrop-blur-md', 'border-b', 'border-[#6F1D2B]/10', 'py-3.5');
        header.classList.add('py-6', 'bg-transparent');
      }
    }
  }, { passive: true });

  // Automatic Active Link Matching
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
      link.classList.add('text-[#4A101C]', 'font-semibold', 'border-b-[1.5px]', 'border-[#6F1D2B]');
      link.classList.remove('text-[#766C6D]');
    }
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // 5. Interactive 3D Canvas Rotating Globe (Hero - Right Side)
  function initHeroGlobe() {
    const canvas = document.getElementById('hero-globe-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coordsEl = document.getElementById('globe-coords');
    let width = 0, height = 0, dpr = 1;
    let radius = 0, cx = 0, cy = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      radius = Math.min(width, height) * 0.43;
      cx = width / 2;
      cy = height / 2;
    }
    resize();
    window.addEventListener('resize', resize);

    // Generate Landmass & Cluster Surface Points
    const points = [];
    const landClusters = [
      // North America (US, Canada, Mexico)
      { minLat: 15, maxLat: 62, minLon: -130, maxLon: -65, count: 90 },
      // South America
      { minLat: -52, maxLat: 12, minLon: -80, maxLon: -35, count: 50 },
      // Europe
      { minLat: 36, maxLat: 65, minLon: -10, maxLon: 40, count: 60 },
      // Africa
      { minLat: -34, maxLat: 36, minLon: -18, maxLon: 52, count: 70 },
      // Asia & India
      { minLat: 8, maxLat: 65, minLon: 45, maxLon: 140, count: 110 },
      // Australia
      { minLat: -42, maxLat: -12, minLon: 112, maxLon: 154, count: 35 },
      // Sparse Ocean Points
      { minLat: -75, maxLat: 75, minLon: -180, maxLon: 180, count: 60 }
    ];

    landClusters.forEach(cluster => {
      for (let i = 0; i < cluster.count; i++) {
        const lat = cluster.minLat + Math.random() * (cluster.maxLat - cluster.minLat);
        const lon = cluster.minLon + Math.random() * (cluster.maxLon - cluster.minLon);
        points.push({
          lat: (lat * Math.PI) / 180,
          lon: (lon * Math.PI) / 180
        });
      }
    });

    // Main Station Pin: Rolla, MO (Missouri S&T)
    const primaryPin = {
      lat: (37.95 * Math.PI) / 180,
      lon: (-91.77 * Math.PI) / 180,
      label: 'MO·S&T'
    };

    let theta = 0.8; // Longitude rotation angle
    const tilt = 0.38; // ~22 deg axial tilt
    let isDragging = false;
    let dragStartX = 0;
    let dragStartTheta = 0;
    let velocity = 0.007;
    let pingPhase = 0;

    // Pointer Drag Interaction
    const container = canvas.parentElement;
    if (container) {
      container.addEventListener('pointerdown', (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartTheta = theta;
        velocity = 0;
        container.setPointerCapture(e.pointerId);
      });

      container.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const delta = e.clientX - dragStartX;
        const targetTheta = dragStartTheta + delta * 0.012;
        velocity = (targetTheta - theta) * 0.35;
        theta = targetTheta;
      });

      const onPointerUp = (e) => {
        if (!isDragging) return;
        isDragging = false;
        try { container.releasePointerCapture(e.pointerId); } catch (_) {}
      };
      container.addEventListener('pointerup', onPointerUp);
      container.addEventListener('pointercancel', onPointerUp);
    }

    // 3D Point Projection Helper
    function project(lat, lon) {
      // Rotate around Y axis (longitude)
      const x = radius * Math.cos(lat) * Math.sin(lon + theta);
      const y = -radius * Math.sin(lat);
      const z = radius * Math.cos(lat) * Math.cos(lon + theta);

      // Rotate around X axis (axial tilt)
      const yRot = y * Math.cos(tilt) - z * Math.sin(tilt);
      const zRot = y * Math.sin(tilt) + z * Math.cos(tilt);

      return {
        x: cx + x,
        y: cy + yRot,
        z: zRot,
        visible: zRot > 0
      };
    }

    // Main 60fps Render Loop
    function render() {
      if (!isDragging) {
        // Friction dampening on drag release, settling to cruising speed
        if (Math.abs(velocity - 0.007) > 0.0001) {
          velocity += (0.007 - velocity) * 0.04;
        }
        theta += velocity;
      }
      pingPhase = (pingPhase + 0.035) % 1;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // 1. Atmosphere Glow & Outer Rim
      const aura = ctx.createRadialGradient(cx, cy, radius * 0.75, cx, cy, radius * 1.08);
      aura.addColorStop(0, 'rgba(239, 230, 223, 0)');
      aura.addColorStop(0.85, 'rgba(111, 29, 43, 0.04)');
      aura.addColorStop(1, 'rgba(111, 29, 43, 0.08)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Outer Silhouette Ring
      ctx.strokeStyle = 'rgba(111, 29, 43, 0.22)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Latitude Rings (Parallels: -60, -30, 0, 30, 60)
      [-60, -30, 0, 30, 60].forEach(deg => {
        const phi = (deg * Math.PI) / 180;
        const steps = 64;
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const lambda = (i / steps) * Math.PI * 2;
          const pt = project(phi, lambda - theta);
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = deg === 0 ? 'rgba(111, 29, 43, 0.2)' : 'rgba(111, 29, 43, 0.09)';
        ctx.lineWidth = deg === 0 ? 1 : 0.75;
        ctx.stroke();
      });

      // 3. Longitude Rings (Meridians: every 45 deg)
      for (let deg = 0; deg < 360; deg += 45) {
        const lambda = (deg * Math.PI) / 180;
        const steps = 48;
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const phi = -Math.PI / 2 + (i / steps) * Math.PI;
          const pt = project(phi, lambda);
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = 'rgba(111, 29, 43, 0.08)';
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      // 4. Back-facing Landmass Points (translucent depth)
      points.forEach(p => {
        const pt = project(p.lat, p.lon);
        if (!pt.visible) {
          ctx.fillStyle = 'rgba(201, 138, 148, 0.15)';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 5. Front-facing Landmass Points (crisp burgundy)
      points.forEach(p => {
        const pt = project(p.lat, p.lon);
        if (pt.visible) {
          const depthRatio = pt.z / radius; // 0 (edge) to 1 (front center)
          const alpha = 0.25 + depthRatio * 0.7;
          const ptRadius = 1.0 + depthRatio * 1.2;

          ctx.fillStyle = `rgba(111, 29, 43, ${alpha.toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, ptRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 6. Active Station Marker (Missouri S&T)
      const pinPt = project(primaryPin.lat, primaryPin.lon);
      if (pinPt.visible) {
        const depth = pinPt.z / radius;

        // Animated Radar Ripple Ping
        const pingRadius = 4 + pingPhase * 16;
        const pingAlpha = (1 - pingPhase) * 0.75;
        ctx.strokeStyle = `rgba(111, 29, 43, ${pingAlpha.toFixed(2)})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(pinPt.x, pinPt.y, pingRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Pin Core Dot
        ctx.fillStyle = '#6F1D2B';
        ctx.beginPath();
        ctx.arc(pinPt.x, pinPt.y, 3.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#F8F3EE';
        ctx.beginPath();
        ctx.arc(pinPt.x, pinPt.y, 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Label Pill
        if (depth > 0.3) {
          ctx.font = '600 9px "Geist Mono", monospace';
          ctx.fillStyle = '#4A101C';
          ctx.fillText(primaryPin.label, pinPt.x + 8, pinPt.y - 4);
        }
      }

      ctx.restore();

      // 7. Live Coordinate Readout Update
      if (coordsEl) {
        const degE = ((((-theta * 180) / Math.PI) % 360) + 360) % 360;
        const lonStr = degE <= 180 ? `${degE.toFixed(0)}°W` : `${(360 - degE).toFixed(0)}°E`;
        coordsEl.textContent = `37.95°N, ${lonStr}`;
      }

      requestAnimationFrame(render);
    }

    render();
  }
  initHeroGlobe();

  // 6. 02 / Expertise Strip Dynamic Render & Tabs (if present)
  const expertiseTabsContainer = document.getElementById('expertise-tabs');
  const expertiseContent = document.getElementById('expertise-content');

  function renderExpertiseCategory(categoryId) {
    const item = data.expertise.find(e => e.id === categoryId) || data.expertise[0];
    
    document.querySelectorAll('.expertise-btn').forEach(btn => {
      const active = btn.getAttribute('data-category') === categoryId;
      btn.className = `expertise-btn px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
        active 
          ? 'bg-[#6F1D2B] text-[#F8F3EE] font-semibold shadow-sm' 
          : 'bg-[#EFE6DF]/50 hover:bg-[#EFE6DF] text-[#766C6D] hover:text-[#4A101C]'
      }`;
    });

    if (expertiseContent) {
      expertiseContent.innerHTML = `
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300">
          <div class="max-w-md">
            <span class="font-mono text-[11px] text-[#6F1D2B] tracking-wider uppercase">Focus Area</span>
            <p class="font-serif text-xl sm:text-2xl text-[#252122] mt-1 italic leading-snug">
              ${item.summary}
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-2 max-w-xl">
            ${item.skills.map(skill => `
              <span class="px-3 py-1.5 rounded-md text-xs font-mono bg-[#EFE6DF]/80 border border-[#6F1D2B]/10 text-[#4A101C] transition-colors hover:border-[#6F1D2B]/30">
                ${skill}
              </span>
            `).join('')}
          </div>
        </div>
      `;
    }
  }

  if (expertiseTabsContainer) {
    expertiseTabsContainer.innerHTML = data.expertise.map(item => `
      <button data-category="${item.id}" class="expertise-btn px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer">
        ${item.title}
      </button>
    `).join('');

    expertiseTabsContainer.querySelectorAll('.expertise-btn').forEach(btn => {
      const id = btn.getAttribute('data-category');
      btn.addEventListener('click', () => renderExpertiseCategory(id));
      btn.addEventListener('mouseenter', () => renderExpertiseCategory(id));
    });

    renderExpertiseCategory(data.expertise[0].id);
  }

  // 7. 03 / Featured Projects Alternating Render (on projects.html)
  const projectsContainer = document.getElementById('featured-projects-list');
  if (projectsContainer) {
    projectsContainer.innerHTML = data.featuredProjects.map((project, idx) => {
      const isReversed = idx % 2 !== 0;
      return `
        <article class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <!-- Copy -->
          <div class="lg:col-span-6 space-y-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}">
            <div class="flex items-center gap-3">
              <span class="font-serif text-4xl text-[#6F1D2B] italic font-normal">
                ${project.number}
              </span>
              <div class="h-3 w-[1px] bg-[#6F1D2B]/20"></div>
              <span class="font-mono text-xs text-[#766C6D] uppercase tracking-wider font-medium">
                ${project.category}
              </span>
            </div>

            <div>
              <h3 class="font-serif text-3xl sm:text-4xl text-[#252122] font-normal tracking-tight">
                ${project.title}
              </h3>
              <p class="text-base font-serif italic text-[#6F1D2B] mt-2">
                &ldquo;${project.headline}&rdquo;
              </p>
            </div>

            <p class="text-sm text-[#766C6D] leading-relaxed font-normal">
              ${project.description}
            </p>

            <div class="flex flex-wrap gap-2 pt-2">
              ${project.technologies.map(t => `
                <span class="px-2.5 py-1 rounded text-[11px] font-mono text-[#4A101C] bg-[#EFE6DF]/80 border border-[#6F1D2B]/10">
                  ${t}
                </span>
              `).join('')}
            </div>

            <div class="pt-4 flex items-center gap-5">
              <button data-spec-trigger="${project.id}" class="spec-btn group inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#4A101C] hover:text-[#6F1D2B] transition-colors cursor-pointer bg-transparent border-0 p-0">
                <span>Read Architecture Spec</span>
                <span class="text-[#6F1D2B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </button>
              <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#6F1D2B] hover:text-[#4A101C] transition-colors underline underline-offset-4 decoration-[#6F1D2B]/30 hover:decoration-[#6F1D2B]">
                <span>GitHub Repository</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <!-- Architecture Visual Card -->
          <div data-cursor="view" data-spec-trigger="${project.id}" class="spec-card-trigger lg:col-span-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}">
            <div class="group relative rounded-2xl bg-[#EFE6DF]/60 border border-[#6F1D2B]/15 p-6 sm:p-8 hover:border-[#6F1D2B]/40 hover:bg-[#EFE6DF] transition-all duration-300 shadow-[0_4px_24px_-8px_rgba(111,29,43,0.06)] overflow-hidden cursor-pointer">
              
              <div class="flex items-center justify-between pb-4 mb-6 border-b border-[#6F1D2B]/10">
                <div class="flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-[#6F1D2B]/30 group-hover:bg-[#6F1D2B] transition-colors"></span>
                  <span class="font-mono text-[10px] text-[#766C6D] uppercase tracking-wider">
                    ARCHITECTURE PIPELINE // ${project.id}
                  </span>
                </div>
                <span class="font-mono text-[10px] text-[#6F1D2B] bg-[#E3BDC3]/40 px-2 py-0.5 rounded font-semibold">
                  VERIFIED
                </span>
              </div>

              <div class="space-y-3 py-4">
                ${project.flowSteps.map((step, sIdx) => `
                  <div class="flex items-center gap-3">
                    <div class="w-6 h-6 rounded-md bg-[#F8F3EE] border border-[#6F1D2B]/20 flex items-center justify-center font-mono text-[10px] text-[#4A101C] font-semibold">
                      0${sIdx + 1}
                    </div>
                    <div class="flex-1 bg-[#F8F3EE]/90 border border-[#6F1D2B]/10 rounded-lg px-3.5 py-2 flex items-center justify-between group-hover:border-[#6F1D2B]/25 transition-colors">
                      <span class="font-mono text-xs text-[#252122] font-medium">
                        ${step}
                      </span>
                      ${sIdx < project.flowSteps.length - 1 ? `<span class="text-xs font-mono text-[#6F1D2B]/50">↓</span>` : `<span class="text-[10px] font-mono font-semibold text-[#6F1D2B] bg-[#E3BDC3]/50 px-2 py-0.5 rounded">OUTPUT</span>`}
                    </div>
                  </div>
                `).join('')}
              </div>

              <div class="mt-6 pt-4 border-t border-[#6F1D2B]/10 flex items-center justify-between text-[11px] font-mono text-[#766C6D]">
                <span>Status: Production Verified</span>
                <span class="text-[#6F1D2B] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Inspect Spec ↗
                </span>
              </div>

            </div>
          </div>
        </article>
      `;
    }).join('');

    // Wire up modal triggers
    document.querySelectorAll('[data-spec-trigger]').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-spec-trigger');
        if (id) openSpecModal(id);
      });
    });
  }

  // Architecture Spec Modal handlers
  const specModal = document.getElementById('architecture-modal');
  const modalBody = document.getElementById('modal-body');
  const modalCategory = document.getElementById('modal-project-category');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCloseBottom = document.getElementById('modal-close-bottom');

  function openSpecModal(projectId) {
    const project = data.featuredProjects.find(p => p.id === projectId);
    if (!project || !specModal || !modalBody) return;

    if (modalCategory) {
      modalCategory.textContent = `${project.number} // ${project.category}`;
    }

    const spec = project.spec || {
      tagline: project.headline,
      metrics: [],
      problem: project.description,
      solution: '',
      invariants: []
    };

    modalBody.innerHTML = `
      <div class="space-y-2 border-b border-[#6F1D2B]/10 pb-5">
        <span class="font-mono text-xs text-[#6F1D2B] font-semibold tracking-wider uppercase">${project.category}</span>
        <h3 class="font-serif text-3xl sm:text-4xl text-[#252122] font-normal leading-tight">${project.title}</h3>
        <p class="font-serif text-lg text-[#6F1D2B] italic">&ldquo;${spec.tagline}&rdquo;</p>
      </div>

      <!-- Key Metrics Strip -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${(spec.metrics || []).map(m => `
          <div class="p-3.5 rounded-xl bg-[#EFE6DF]/50 border border-[#6F1D2B]/10">
            <span class="font-mono text-[10px] text-[#766C6D] uppercase block">${m.label}</span>
            <span class="font-mono text-xs font-semibold text-[#4A101C] mt-1 block">${m.value}</span>
          </div>
        `).join('')}
      </div>

      <!-- Problem & Solution -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[#766C6D] leading-relaxed">
        <div class="p-5 rounded-xl bg-[#EFE6DF]/30 border border-[#6F1D2B]/10 space-y-2">
          <span class="font-mono text-[11px] font-semibold text-[#6F1D2B] uppercase tracking-wider block">Operational Problem</span>
          <p>${spec.problem}</p>
        </div>
        <div class="p-5 rounded-xl bg-[#EFE6DF]/30 border border-[#6F1D2B]/10 space-y-2">
          <span class="font-mono text-[11px] font-semibold text-[#6F1D2B] uppercase tracking-wider block">Engineered Solution</span>
          <p>${spec.solution}</p>
        </div>
      </div>

      <!-- System Invariants -->
      ${spec.invariants && spec.invariants.length > 0 ? `
        <div class="space-y-2 pt-2 border-t border-[#6F1D2B]/10">
          <span class="font-mono text-[11px] font-semibold text-[#6F1D2B] uppercase tracking-wider block">Production Invariants & Safety Bounds</span>
          <ul class="space-y-1.5">
            ${spec.invariants.map(inv => `
              <li class="flex items-start gap-2.5 text-xs text-[#252122]">
                <span class="font-serif text-[#6F1D2B] text-sm mt-0.5">▪</span>
                <span>${inv}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}

      <!-- Tech Stack Badges & GitHub Link -->
      <div class="pt-4 border-t border-[#6F1D2B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex flex-wrap gap-1.5">
          ${project.technologies.map(t => `
            <span class="px-2.5 py-1 rounded text-[10px] font-mono text-[#4A101C] bg-[#EFE6DF] border border-[#6F1D2B]/10 font-medium">
              ${t}
            </span>
          `).join('')}
        </div>
        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#6F1D2B] hover:bg-[#4A101C] text-[#F8F3EE] font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-[0_2px_10px_-2px_rgba(111,29,43,0.3)] shrink-0 self-start sm:self-auto">
          <span>Open on GitHub</span>
          <span class="text-[#E3BDC3] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </a>
      </div>
    `;

    specModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeSpecModal() {
    if (specModal) {
      specModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeSpecModal);
  if (modalCloseBottom) modalCloseBottom.addEventListener('click', closeSpecModal);
  if (specModal) {
    specModal.addEventListener('click', (e) => {
      if (e.target === specModal) closeSpecModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSpecModal();
  });

  // 8. 04 / Project Explorer Filter & List (on projects.html)
  const explorerList = document.getElementById('explorer-projects-list');
  const filterButtons = document.querySelectorAll('.explorer-filter-btn');

  function renderExplorer(filter) {
    const list = filter === 'ALL' 
      ? data.explorerProjects 
      : data.explorerProjects.filter(p => p.category === filter);

    if (explorerList) {
      explorerList.innerHTML = list.map(item => `
        <div class="group py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#EFE6DF]/40 -mx-4 px-4 rounded-xl transition-colors cursor-pointer">
          <div class="space-y-1.5 max-w-xl">
            <div class="flex items-center gap-3">
              <span class="font-mono text-xs font-semibold text-[#6F1D2B]">${item.name}</span>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-[#EFE6DF] border border-[#6F1D2B]/10 text-[#766C6D]">${item.category}</span>
            </div>
            <p class="text-xs text-[#766C6D] leading-relaxed">${item.description}</p>
          </div>
          <div class="flex items-center justify-between sm:justify-end gap-6 text-xs font-mono text-[#766C6D]">
            <div class="hidden md:flex items-center gap-2">
              ${item.techStack.map(t => `<span class="text-[#4A101C] bg-[#EFE6DF]/50 px-2 py-0.5 rounded text-[11px]">${t}</span>`).join('')}
            </div>
            <span>${item.year}</span>
            <a href="${item.github}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded border border-[#6F1D2B]/15 hover:border-[#6F1D2B]/40 text-[#6F1D2B] hover:text-[#4A101C] font-mono text-[11px] transition-colors inline-flex items-center gap-1">
              <span>GitHub</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      `).join('');
    }
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-[#6F1D2B]', 'text-[#F8F3EE]', 'font-semibold');
        b.classList.add('text-[#766C6D]');
      });
      btn.classList.add('bg-[#6F1D2B]', 'text-[#F8F3EE]', 'font-semibold');
      btn.classList.remove('text-[#766C6D]');
      renderExplorer(btn.getAttribute('data-filter'));
    });
  });
  if (explorerList) renderExplorer('ALL');

  // 9. 05 / Experience / Career Journey (on experience.html)
  const expNav = document.getElementById('experience-nav');
  const expDetail = document.getElementById('experience-detail');

  function renderExperienceItem(id) {
    const item = data.experience.find(e => e.id === id) || data.experience[0];

    document.querySelectorAll('.exp-nav-btn').forEach(btn => {
      const active = btn.getAttribute('data-id') === id;
      btn.className = `exp-nav-btn text-left p-5 rounded-xl border transition-all cursor-pointer w-full min-w-[240px] md:min-w-0 ${
        active 
          ? 'bg-[#EFE6DF] border-[#6F1D2B]/30 shadow-[0_4px_16px_-6px_rgba(111,29,43,0.1)]' 
          : 'bg-[#F8F3EE] border-[#6F1D2B]/10 hover:border-[#6F1D2B]/20 hover:bg-[#EFE6DF]/40'
      }`;
    });

    if (expDetail) {
      expDetail.innerHTML = `
        <div class="p-8 rounded-2xl bg-[#EFE6DF]/50 border border-[#6F1D2B]/15 space-y-6 animate-fadeIn">
          <div class="border-b border-[#6F1D2B]/10 pb-6 space-y-2">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <h3 class="font-serif text-2xl sm:text-3xl text-[#252122] font-normal">${item.role}</h3>
              <span class="font-mono text-xs px-2.5 py-1 rounded bg-[#F8F3EE] border border-[#6F1D2B]/15 text-[#6F1D2B] font-semibold">${item.period}</span>
            </div>
            <div class="flex flex-wrap items-center gap-4 text-xs font-mono text-[#766C6D]">
              <span class="font-semibold text-[#4A101C]">${item.company}</span>
              <span>•</span>
              <span>${item.location}</span>
            </div>
          </div>

          <p class="text-sm text-[#766C6D] leading-relaxed font-normal">${item.summary}</p>

          <div class="space-y-3 pt-2">
            <span class="font-mono text-xs font-semibold text-[#6F1D2B] uppercase tracking-wider block">Key Accomplishments</span>
            <ul class="space-y-2.5">
              ${item.accomplishments.map(acc => `
                <li class="flex items-start gap-3 text-xs sm:text-sm text-[#252122] leading-relaxed">
                  <span class="font-serif text-[#6F1D2B] text-sm mt-0.5">▪</span>
                  <span>${acc}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="pt-4 border-t border-[#6F1D2B]/10 space-y-2">
            <span class="font-mono text-[11px] uppercase tracking-wider text-[#766C6D] block">Core Technologies</span>
            <div class="flex flex-wrap gap-2">
              ${item.technologies.map(tech => `
                <span class="px-2.5 py-1 rounded text-xs font-mono bg-[#F8F3EE] border border-[#6F1D2B]/15 text-[#4A101C]">${tech}</span>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }
  }

  if (expNav) {
    expNav.innerHTML = data.experience.map(item => `
      <button data-id="${item.id}" class="exp-nav-btn text-left p-5 rounded-xl border transition-all cursor-pointer w-full min-w-[240px] md:min-w-0">
        <div class="flex items-center justify-between text-[11px] font-mono mb-1.5">
          <span class="font-semibold text-[#6F1D2B]">${item.period}</span>
        </div>
        <div class="font-serif text-xl font-normal text-[#252122]">${item.company}</div>
        <div class="text-xs font-mono text-[#766C6D] mt-0.5">${item.role}</div>
      </button>
    `).join('');

    expNav.querySelectorAll('.exp-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => renderExperienceItem(btn.getAttribute('data-id')));
    });

    renderExperienceItem(data.experience[0].id);
  }

  // 10. 06 / System Toolbox (on skills.html)
  const clustersContainer = document.getElementById('skill-clusters-container');
  const skillInspector = document.getElementById('skill-inspector-content');

  function showSkillDetail(name, usage) {
    if (skillInspector) {
      skillInspector.innerHTML = `
        <h4 class="font-serif text-2xl text-[#252122] font-normal">${name}</h4>
        <div class="h-[1px] w-8 bg-[#6F1D2B]/20"></div>
        <p class="text-xs sm:text-sm text-[#766C6D] leading-relaxed font-normal">${usage}</p>
      `;
    }
  }

  if (clustersContainer) {
    clustersContainer.innerHTML = data.skillClusters.map(cluster => `
      <div class="p-6 rounded-2xl bg-[#EFE6DF]/40 border border-[#6F1D2B]/10 space-y-4">
        <div class="flex items-center justify-between border-b border-[#6F1D2B]/10 pb-2">
          <h3 class="font-mono text-xs uppercase font-semibold text-[#4A101C] tracking-wider">${cluster.category}</h3>
          <span class="text-[11px] font-mono text-[#766C6D]">${cluster.description}</span>
        </div>
        <div class="flex flex-wrap gap-2">
          ${cluster.skills.map(s => `
            <button class="skill-node-btn px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border bg-[#F8F3EE] hover:bg-[#EFE6DF] text-[#252122] border-[#6F1D2B]/15 hover:border-[#6F1D2B]/35" data-name="${s.name}" data-usage="${s.usage}">
              ${s.name}
            </button>
          `).join('')}
        </div>
      </div>
    `).join('');

    clustersContainer.querySelectorAll('.skill-node-btn').forEach(btn => {
      const name = btn.getAttribute('data-name');
      const usage = btn.getAttribute('data-usage');
      btn.addEventListener('click', () => showSkillDetail(name, usage));
      btn.addEventListener('mouseenter', () => showSkillDetail(name, usage));
    });

    const first = data.skillClusters[0].skills[0];
    showSkillDetail(first.name, first.usage);
  }

  // 11. 08 / Currently Exploring (on skills.html)
  const exploringPills = document.getElementById('exploring-pills');
  const exploringCallout = document.getElementById('exploring-callout');

  function showExploring(item) {
    document.querySelectorAll('.exploring-btn').forEach(btn => {
      const active = btn.getAttribute('data-id') === item.id;
      btn.className = `exploring-btn px-5 py-2.5 rounded-full text-xs font-mono transition-all cursor-pointer border flex items-center gap-2 ${
        active 
          ? 'bg-[#6F1D2B] text-[#F8F3EE] border-[#6F1D2B] shadow-sm font-semibold' 
          : 'bg-[#EFE6DF]/60 hover:bg-[#EFE6DF] text-[#4A101C] border-[#6F1D2B]/15 hover:border-[#6F1D2B]/35'
      }`;
    });

    if (exploringCallout) {
      exploringCallout.innerHTML = `
        <div class="space-y-1">
          <div class="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#6F1D2B] font-semibold">
            <span>${item.tag} // ${item.topic}</span>
          </div>
          <p class="font-serif text-lg sm:text-xl text-[#252122] italic leading-snug">
            &ldquo;${item.explanation}&rdquo;
          </p>
        </div>
      `;
    }
  }

  if (exploringPills) {
    exploringPills.innerHTML = data.exploring.map(item => `
      <button data-id="${item.id}" class="exploring-btn px-5 py-2.5 rounded-full text-xs font-mono transition-all cursor-pointer border flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-[#6F1D2B]/40"></span>
        <span>${item.topic}</span>
      </button>
    `).join('');

    exploringPills.querySelectorAll('.exploring-btn').forEach(btn => {
      const id = btn.getAttribute('data-id');
      const item = data.exploring.find(x => x.id === id);
      if (item) {
        btn.addEventListener('click', () => showExploring(item));
        btn.addEventListener('mouseenter', () => showExploring(item));
      }
    });

    showExploring(data.exploring[0]);
  }

  // 12. Copy Email Function
  window.copyEmail = () => {
    navigator.clipboard.writeText(data.socials.email).then(() => {
      const toast = document.getElementById('global-toast');
      if (toast) {
        toast.innerHTML = `<span>✓</span> <span>Copied to clipboard: ${data.socials.email}</span>`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2800);
      }
    });
  };

  // Back to top action
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
