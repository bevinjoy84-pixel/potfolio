/**
 * BEVIN JOY G - Royal Portfolio JavaScript
 * Modern Vanilla JS with Dual Theme Engine (Dark & White Theme),
 * Interactive Lipinski Screener, and Real Certificate Image Modal Viewer
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. PRELOADER
     ========================================================================== */
  const preloader = document.getElementById('preloader');
  const hidePreloader = () => {
    if (preloader && !preloader.classList.contains('loaded')) {
      preloader.classList.add('loaded');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 700);
    }
  };

  window.addEventListener('load', hidePreloader);
  setTimeout(hidePreloader, 1800);


  /* ==========================================================================
     2. DUAL THEME ENGINE (ROYAL DARK & ROYAL WHITE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeLabelText = document.querySelector('.theme-label-text');

  const getPreferredTheme = () => {
    const saved = localStorage.getItem('bevin_portfolio_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const applyTheme = (theme, showToastNotification = false) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bevin_portfolio_theme', theme);

    if (themeLabelText) {
      themeLabelText.textContent = theme === 'light' ? 'White Theme' : 'Dark Theme';
    }

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('title', theme === 'light' ? 'Switch to Royal Dark Theme' : 'Switch to Royal White Theme');
      themeToggleBtn.setAttribute('aria-label', theme === 'light' ? 'Switch to Royal Dark Theme' : 'Switch to Royal White Theme');
    }

    // Notify particle system
    if (typeof window.updateParticleTheme === 'function') {
      window.updateParticleTheme(theme);
    }

    if (showToastNotification) {
      showToast(theme === 'light' ? '✨ Switched to Royal White Theme' : '🌙 Switched to Royal Dark Theme', true);
    }
  };

  // Initialize theme
  const currentInitialTheme = getPreferredTheme();
  applyTheme(currentInitialTheme, false);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme, true);
    });
  }


  /* ==========================================================================
     3. NAVBAR SCROLL & MOBILE MENU
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      menuToggle.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.classList.toggle('no-scroll', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // Active link highlighter using IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));


  /* ==========================================================================
     4. TYPEWRITER ANIMATION (HERO)
     ========================================================================== */
  const typingElements = [
    document.getElementById('typing-text'),
    document.getElementById('typing-text-mobile')
  ].filter(Boolean);

  if (typingElements.length > 0) {
    const phrases = [
      'Artificial Intelligence & Pharmaceutical Research',
      'Computational Drug Discovery & In-Silico Screening',
      'Bioinformatics, Molecular Docking & SwissADME',
      'Pharmacovigilance & Adverse Drug Reaction Surveillance',
      'Bridging Machine Learning with Pharmaceutical Sciences'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 70;

    const updateTypingDisplay = (text) => {
      typingElements.forEach(el => {
        el.textContent = text;
      });
    };

    const type = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        updateTypingDisplay(currentPhrase.substring(0, charIndex - 1));
        charIndex--;
        typeSpeed = 35;
      } else {
        updateTypingDisplay(currentPhrase.substring(0, charIndex + 1));
        charIndex++;
        typeSpeed = 65;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2200;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 450;
      }

      setTimeout(type, typeSpeed);
    };

    setTimeout(type, 800);
  }


  /* ==========================================================================
     5. SKILLS PROGRESS & FILTERING
     ========================================================================== */
  const skillBars = document.querySelectorAll('.skill-progress-bar');
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-progress') || '80%';
        bar.style.width = width;
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.25 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // Skills Category Filter Tabs
  const skillTabs = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  if (skillTabs.length > 0) {
    skillTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        skillTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-filter');

        skillCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
            card.style.animation = 'fadeInUp 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }


  /* ==========================================================================
     6. INTERACTIVE LIPINSKI RULE OF FIVE SCREENER (PROJECT 1 LIVE DEMO)
     ========================================================================== */
  const runScreenerBtn = document.getElementById('run-lipinski-btn');
  const drugPresetSelect = document.getElementById('drug-preset-select');
  const inputMW = document.getElementById('lipinski-mw');
  const inputLogP = document.getElementById('lipinski-logp');
  const inputHBD = document.getElementById('lipinski-hbd');
  const inputHBA = document.getElementById('lipinski-hba');
  const inputRotB = document.getElementById('lipinski-rotb');
  const resultVerdict = document.getElementById('lipinski-verdict');
  const resultSummary = document.getElementById('lipinski-summary');
  const resultBadges = document.getElementById('lipinski-badges');

  const drugDatabase = {
    aspirin: { mw: 180.16, logp: 1.19, hbd: 1, hba: 3, rotb: 2, name: 'Aspirin (Acetylsalicylic Acid)' },
    paracetamol: { mw: 151.16, logp: 0.46, hbd: 2, hba: 2, rotb: 1, name: 'Paracetamol (Acetaminophen)' },
    atorvastatin: { mw: 558.64, logp: 5.7, hbd: 4, hba: 5, rotb: 12, name: 'Atorvastatin (Lipitor)' },
    metformin: { mw: 129.16, logp: -1.43, hbd: 3, hba: 2, rotb: 2, name: 'Metformin' },
    ibuprofen: { mw: 206.28, logp: 3.5, hbd: 1, hba: 2, rotb: 4, name: 'Ibuprofen' },
    remdesivir: { mw: 602.58, logp: 1.9, hbd: 4, hba: 12, rotb: 13, name: 'Remdesivir' }
  };

  if (drugPresetSelect) {
    drugPresetSelect.addEventListener('change', (e) => {
      const selected = drugDatabase[e.target.value];
      if (selected) {
        if (inputMW) inputMW.value = selected.mw;
        if (inputLogP) inputLogP.value = selected.logp;
        if (inputHBD) inputHBD.value = selected.hbd;
        if (inputHBA) inputHBA.value = selected.hba;
        if (inputRotB) inputRotB.value = selected.rotb;
        evaluateLipinski();
      }
    });
  }

  function evaluateLipinski() {
    if (!inputMW || !inputLogP || !inputHBD || !inputHBA) return;

    const mw = parseFloat(inputMW.value) || 0;
    const logp = parseFloat(inputLogP.value) || 0;
    const hbd = parseInt(inputHBD.value, 10) || 0;
    const hba = parseInt(inputHBA.value, 10) || 0;
    const rotb = parseInt(inputRotB ? inputRotB.value : 0, 10) || 0;

    let violations = 0;
    let badgeHtml = '';

    // Rule 1: MW <= 500 Da
    if (mw <= 500) {
      badgeHtml += `<span class="badge rule-pass"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> MW ≤ 500 (${mw})</span>`;
    } else {
      violations++;
      badgeHtml += `<span class="badge rule-fail"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> MW > 500 (${mw})</span>`;
    }

    // Rule 2: LogP <= 5
    if (logp <= 5) {
      badgeHtml += `<span class="badge rule-pass"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> LogP ≤ 5 (${logp})</span>`;
    } else {
      violations++;
      badgeHtml += `<span class="badge rule-fail"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> LogP > 5 (${logp})</span>`;
    }

    // Rule 3: HBD <= 5
    if (hbd <= 5) {
      badgeHtml += `<span class="badge rule-pass"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> HBD ≤ 5 (${hbd})</span>`;
    } else {
      violations++;
      badgeHtml += `<span class="badge rule-fail"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> HBD > 5 (${hbd})</span>`;
    }

    // Rule 4: HBA <= 10
    if (hba <= 10) {
      badgeHtml += `<span class="badge rule-pass"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> HBA ≤ 10 (${hba})</span>`;
    } else {
      violations++;
      badgeHtml += `<span class="badge rule-fail"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> HBA > 10 (${hba})</span>`;
    }

    // Veber's Rule: Rotatable Bonds <= 10
    if (rotb <= 10) {
      badgeHtml += `<span class="badge rule-pass"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> RotB ≤ 10 (${rotb})</span>`;
    } else {
      badgeHtml += `<span class="badge rule-warn"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> RotB > 10 (${rotb})</span>`;
    }

    if (resultBadges) resultBadges.innerHTML = badgeHtml;

    if (resultVerdict) {
      if (violations === 0) {
        resultVerdict.className = 'screener-verdict pass';
        resultVerdict.innerHTML = '<span class="verdict-icon">✓</span> High Oral Drug-Likeness (0 Violations)';
        if (resultSummary) resultSummary.textContent = 'Compound exhibits optimal physicochemical parameters with high likelihood of favorable oral bioavailability under Lipinski\'s Rule of Five.';
      } else if (violations === 1) {
        resultVerdict.className = 'screener-verdict moderate';
        resultVerdict.innerHTML = '<span class="verdict-icon">⚠</span> Moderate Drug-Likeness (1 Violation - Acceptable)';
        if (resultSummary) resultSummary.textContent = 'Permissible under standard medicinal chemistry thresholds (max 1 violation allowed by Lipinski criteria). Potential oral candidate with target formulation optimization.';
      } else {
        resultVerdict.className = 'screener-verdict fail';
        resultVerdict.innerHTML = `<span class="verdict-icon">✕</span> Low Oral Drug-Likeness (${violations} Violations)`;
        if (resultSummary) resultSummary.textContent = 'Fails Lipinski criteria with multiple parameter violations. May suffer from poor gastrointestinal absorption or membrane permeability unless modified.';
      }
    }
  }

  if (runScreenerBtn) {
    runScreenerBtn.addEventListener('click', evaluateLipinski);
    evaluateLipinski();
  }


  /* ==========================================================================
     7. CERTIFICATE MODAL PREVIEW WITH REAL IMAGES
     ========================================================================== */
  const certModal = document.getElementById('cert-modal');
  const certModalClose = document.getElementById('cert-modal-close');
  const certModalBackdrop = document.getElementById('cert-modal-backdrop');
  const certDetailBtns = document.querySelectorAll('.view-cert-btn');

  // Authentic Certificate Database matching Bevin's actual documents
  const certData = {
    pasteur: {
      title: 'Vaccine Production & Testing Internship',
      issuer: 'Pasteur Institute of India (PIIC), Coonoor',
      issuerSub: 'Autonomous Institute under Ministry of Health & Family Welfare, Govt. of India',
      date: '15/12/2025 to 31/12/2025',
      credId: 'PIIC/TRN/2025-DTP',
      badge: 'Govt. Apex Institute • Vaccine Production',
      image: 'assets/certificates/pasteur_institute_certificate.jpg',
      description: 'Underwent intensive in-plant internship and training at Pasteur Institute of India, Coonoor. Directly observed production and quality control testing procedures for the DTP (Diphtheria, Tetanus, Pertussis) group of vaccines, cleanroom aseptic standards, and biological qualification.',
      skills: ['DTP Vaccine Production', 'Vaccine Quality Control', 'Aseptic Processing', 'Class A/B Cleanroom Protocols', 'Biological Assays']
    },
    spm: {
      title: 'In-Plant Training in Pharmaceutical Manufacturing & QA/QC',
      issuer: 'SPM Drugs (P) Ltd., Bhavani',
      issuerSub: 'Commercial Pharmaceutical Formulation & Bulk Manufacturing',
      date: '20.07.2026 to 04.08.2026 (15 Days)',
      credId: 'Student Reg: 732524PT006 / SPM-2026',
      badge: 'Commercial Plant Experience',
      image: 'assets/certificates/spm_drugs_certificate.jpg',
      description: 'Underwent devoted in-plant industrial training at SPM Drugs (P) Ltd., Bhavani, working diligently across key functional departments: Quality Assurance (QA), Quality Control (QC), Dosage Production, and Raw Material Stores.',
      skills: ['Quality Assurance (QA)', 'Quality Control (QC)', 'Industrial Production', 'Raw Material Stores', 'Schedule M / cGMP']
    },
    gradguru_internship: {
      title: 'Certificate of Internship: Pharmacovigilance using AI',
      issuer: 'Grad Guru LMS Platform',
      issuerSub: 'In Collaboration with Executive81 HR Solutions',
      date: 'Two Months Program (June to July 2026)',
      credId: 'GGCERTIC1509',
      badge: 'Verified Industrial Internship',
      image: 'assets/certificates/gradguru_internship_certificate.jpg',
      description: 'Successfully completed an intensive two-month internship program in "Pharmacovigilance using AI", gaining deep hands-on expertise in Adverse Drug Reaction (ADR) reporting workflows, AI-assisted safety classification, and drug safety case management.',
      skills: ['Pharmacovigilance using AI', 'ADR Case Reporting', 'Safety Severity Classification', 'Executive81 Collaboration', 'ICSR Case Processing']
    },
    gradguru_course: {
      title: 'Certificate of Course Completion: Pharmacovigilance using AI',
      issuer: 'Grad Guru Professional Education',
      issuerSub: 'Accredited Pharmacovigilance Specialized Curriculum',
      date: 'Two Months Program (June to July 2026)',
      credId: 'GGCERTIC1883',
      badge: 'Accredited Course Certification',
      image: 'assets/certificates/gradguru_course_certificate.jpg',
      description: 'Completed comprehensive certified curriculum in Pharmacovigilance with AI applications, mastering MedDRA dictionary hierarchy coding, ICSR data entry, signal detection, and regulatory pharmacovigilance surveillance with verified QR credential.',
      skills: ['MedDRA Coding', 'Signal Detection', 'WHO-UMC Causality', 'ICSR Safety Reports', 'AI Drug Safety Workflows']
    },
    alison_coding: {
      title: 'Medical Billing and Coding: ICD 10 and 11',
      issuer: 'Alison & The CPD Certification Service',
      issuerSub: 'Continuing Professional Development (CPD) Certified Qualification',
      date: '11th July, 2026',
      credId: 'Cert ID: 6310-47895222 / alison.com/verify/00b25f9751',
      badge: 'CPD Certified Standard',
      image: 'assets/certificates/alison_medical_coding_certificate.png',
      description: 'Accredited professional certification in international medical classification systems, mastering ICD-10 and ICD-11 coding conventions, healthcare billing regulations, diagnosis/procedure documentation, and international clinical data standards.',
      skills: ['ICD-10 Coding', 'ICD-11 Nomenclature', 'Medical Billing', 'Healthcare Classification', 'CPD Certified Standard']
    },
    skillcourse_powerbi: {
      title: '30 Days Power BI Micro Course',
      issuer: 'SkillCourse (ISO 9001:2015 Certified)',
      issuerSub: 'Business Intelligence & Data Analytics Certification',
      date: '01/08/2026',
      credId: 'ISO 9001:2015 Reg: INQ/AN-20622/127512/1025',
      badge: 'ISO 9001:2015 Certified Course',
      image: 'assets/certificates/skillcourse_power_bi_certificate.jpg',
      description: 'Completed comprehensive 30-day intensive curriculum in Microsoft Power BI, mastering data transformation, DAX queries, healthcare & pharmaceutical data modeling, interactive dashboard design, and business intelligence reporting.',
      skills: ['Microsoft Power BI', 'Data Analytics', 'Interactive Dashboards', 'DAX Expressions', 'Healthcare Data Modeling']
    }
  };

  const openCertModal = (certKey) => {
    const data = certData[certKey];
    if (!data || !certModal) return;

    document.getElementById('modal-cert-title').textContent = data.title;
    document.getElementById('modal-cert-issuer').textContent = data.issuer;
    document.getElementById('modal-cert-date').textContent = data.date;
    document.getElementById('modal-cert-id').textContent = data.credId;
    document.getElementById('modal-cert-desc').textContent = data.description;
    document.getElementById('modal-cert-badge').textContent = data.badge;

    // Actual Certificate Image Preview
    const modalImg = document.getElementById('modal-cert-img');
    const modalLink = document.getElementById('modal-cert-link');
    if (modalImg && data.image) {
      modalImg.src = data.image;
      modalImg.alt = `${data.title} - Official Certificate`;
    }
    if (modalLink && data.image) {
      modalLink.href = data.image;
    }

    const skillsContainer = document.getElementById('modal-cert-skills');
    if (skillsContainer) {
      skillsContainer.innerHTML = data.skills
        .map(skill => `<span class="badge">${skill}</span>`)
        .join('');
    }

    certModal.classList.add('active');
    document.body.classList.add('no-scroll');
  };

  const closeCertModal = () => {
    if (certModal) {
      certModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  };

  certDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certKey = btn.getAttribute('data-cert');
      openCertModal(certKey);
    });
  });

  if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
  if (certModalBackdrop) certModalBackdrop.addEventListener('click', closeCertModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
      closeCertModal();
    }
  });


  /* ==========================================================================
     8. CONTACT FORM, COPY TO CLIPBOARD & TOAST NOTIFICATION
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  function showToast(message, isSuccess = true) {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.className = `toast show ${isSuccess ? 'success' : 'error'}`;
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', false);
        return;
      }

      const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject || 'New Message from ' + name}`);
      const mailtoBody = encodeURIComponent(`Sender: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoLink = `mailto:bevinjoy1019@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      showToast(`Thank you, ${name}! Launching email client to send your message to Bevin Joy G...`, true);

      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 1000);

      contactForm.reset();
    });
  }

  // Copy to clipboard helper
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
        btn.classList.add('copied');
        showToast(`Copied "${textToCopy}" to clipboard!`, true);

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('copied');
        }, 2200);
      }).catch(() => {
        showToast('Failed to copy. Please copy manually.', false);
      });
    });
  });


  /* ==========================================================================
     9. SCROLL TO TOP WITH CIRCULAR PROGRESS RING
     ========================================================================== */
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  const progressRing = document.getElementById('scroll-progress-ring');
  const circumference = 2 * Math.PI * 18;

  if (progressRing) {
    progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
    progressRing.style.strokeDashoffset = circumference;
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollY / docHeight : 0;

    if (progressRing) {
      const offset = circumference - (scrollPercent * circumference);
      progressRing.style.strokeDashoffset = offset;
    }

    if (scrollTopBtn) {
      if (scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* ==========================================================================
     10. 3D CARD HOVER TILT EFFECT (VANILLA JS)
     ========================================================================== */
  const tiltCards = document.querySelectorAll('.tilt-card');
  if (window.innerWidth > 992) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5.5;
        const rotateY = ((x - centerX) / centerX) * 5.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }


  /* ==========================================================================
     11. SCROLL REVEAL & SECTION TRANSITION SEAMS (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal, .section-transition-seam');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
});
