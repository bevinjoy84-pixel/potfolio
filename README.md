# BEVIN JOY G — Personal Portfolio Website
### Modern Royal Style | B.Tech Pharmaceutical Technology | AI & Drug Discovery

A luxurious, futuristic, royal-themed personal portfolio website created for **BEVIN JOY G**, 3rd-year B.Tech Pharmaceutical Technology student at **Shree Venkateshwara Hi-Tech Engineering College (Anna University)**.

---

## 🌟 Visual Theme & Design Language
- **Palette**: Deep Obsidian Black (`#050811`), Royal Midnight Navy (`#090e1f`), and Subtle Champagne Gold (`#d4af37`, `#f6e27a`) with refined biotech cyan accents (`#38bdf8`).
- **Interactive Background**: Dynamic HTML5 Canvas particle system simulating molecular lattice bonds and neural constellations with mouse attraction and touch support.
- **Glassmorphism**: High-translucency cards with multi-layered radial glow, 1px gold borders, and soft shadows.
- **Typography**: Google Fonts `Cinzel` (Royal serif headings) paired with `Plus Jakarta Sans` (Modern high-legibility interface font) and `JetBrains Mono` (computational data).
- **Responsive**: Pixel-perfect layout tailored for desktop, tablet, and mobile displays.

---

## 🔬 Core Highlights & Features
1. **Hero Section**:
   - Royal monogram emblem `[BJ]` with glowing orbital animations.
   - Verified profile photograph in an animated orbital gold frame with floating status chips.
   - Dynamic typewriter effect cycling through key specializations:
     - *Artificial Intelligence & Pharmaceutical Research*
     - *Computational Drug Discovery & In-Silico Screening*
     - *Bioinformatics, Molecular Docking & SwissADME*
     - *Pharmacovigilance & Adverse Drug Reaction Surveillance*
   - Direct download link for `Bevin_Joy_Resume.pdf`, Contact CTA, and social links (LinkedIn, GitHub, Email, Phone).

2. **About Me**:
   - Authentic narrative highlighting academic progression at Anna University, passionate focus on computational biology, and wet-lab vaccine/manufacturing exposure.
   - Interactive 4-pillar grid: AI & Machine Learning, In-Silico Drug Discovery, Pharmacovigilance, and Pharmaceutical Technology & cGMP.

3. **Education**:
   - **B.Tech Pharmaceutical Technology** (2024–2028), Shree Venkateshwara Hi-Tech Engineering College, Anna University.
   - Authentic CGPA (7.5) and breakdown of core coursework modules.

4. **Technical Skills**:
   - 10 core competencies with dual-tone animated progress meters (gold-to-cyan gradient) and interactive filter tabs:
     - *Pharmaceutical Technology* (90%)
     - *Bioinformatics* (85%)
     - *Machine Learning Fundamentals* (80%)
     - *Pharmacovigilance* (88%)
     - *Drug Discovery* (84%)
     - *SwissADME* (88%)
     - *Molecular Docking* (80%)
     - *HTML5* (88%)
     - *JavaScript* (82%)
     - *Database Fundamentals* (76%)

5. **Featured Projects**:
   - **Project 1: AI-Based Drug Candidate Screening and Prediction System**
     - Web-based preliminary screening platform using molecular descriptors and Lipinski's Rule of Five.
     - **Includes a Live In-Browser Lipinski Screener Widget**: test preset drugs (Aspirin, Paracetamol, Ibuprofen, Atorvastatin, Remdesivir) or custom MW, LogP, HBD, HBA, and RotB with real-time rule compliance calculation!
     - Direct GitHub repository link: [AI_drug_screening](https://github.com/bevinjoy84-pixel/AI_drug_screening).
   - **Project 2: AI Pharmacovigilance Dashboard**
     - Adverse drug reaction reporting, case management, and MedDRA severity categorization.
     - Direct GitHub repository link: [AI-Pharmacoviglance-deshboard](https://github.com/bevinjoy84-pixel/AI-Pharmacoviglance-deshboard).
   - **Project 3: SwissADME Drug Analysis**
     - Computational pharmacokinetic profiling, GI absorption, BBB permeation, and bioavailability radar.
     - GitHub profile link: [bevinjoy84-pixel](https://github.com/bevinjoy84-pixel).
   - **Bonus Project: mediqr-ai**
     - Multilingual AI-powered QR medicine accessibility platform with voice assistance: [mediqr-ai](https://github.com/bevinjoy84-pixel/mediqr-ai).

6. **Professional Experience Timeline**:
   - **Pasteur Institute of India, Coonoor**: Vaccine production workflows, aseptic cleanrooms, QA/QC bioassays, cGMP documentation.
   - **SPM Drugs Pvt. Ltd.**: Commercial formulation, in-process quality control (IPQC), and industrial SOPs.
   - **Grad Guru**: Certified pharmacovigilance curriculum, ADR intake, MedDRA coding hierarchy, and ICSR management.

7. **Certifications & Achievements**:
   - Certificate showcase cards with full details modal popup (issuer, date, credential ID, and demonstrated competencies).

8. **Contact Section**:
   - Interactive direct contact channels with one-click **"Copy to Clipboard"** buttons for Phone (`9342773656`) and Email (`bevinjoy1019@gmail.com`).
   - Validated contact inquiry form with feedback toast notifications and automatic mail client launch.

---

## 📁 Project Directory Structure
```
bevin.portfolio/
├── index.html                 # Main portfolio HTML with semantic markup & SEO metadata
├── Dockerfile                 # Production Nginx Alpine container setup
├── docker-compose.yml         # One-command container orchestration
├── nginx.conf                 # Production web server config with Gzip & security headers
├── .dockerignore              # Clean build context exclusion rules
├── css/
│   └── style.css              # Custom styling, luxury theme, glassmorphism & responsive rules
├── js/
│   ├── main.js                # Typewriter, Lipinski screener, modals, navigation & toast
│   └── particles.js           # Interactive molecular canvas particle network
├── assets/
│   ├── Bevin_Joy_Resume.pdf   # Real resume ready for one-click download
│   └── images/
│       ├── bevin_profile.png  # Authentic profile headshot of Bevin Joy G
│       └── molecule_3d.jpg    # 3D molecular background accent
├── vercel.json                # Vercel deployment configuration & caching headers
├── netlify.toml               # Netlify configuration & security headers
└── README.md                  # Project documentation & guide
```

---

## 🚀 How to Run Locally

Since this project is built entirely with modern standard **HTML5, CSS3, and Vanilla JavaScript** (no Python or Node backend required for runtime):

1. **Option A: Direct Browser Opening**
   - Simply double-click `index.html` in your file explorer, or right-click `index.html` → "Open with Google Chrome" / "Microsoft Edge".

2. **Option B: VS Code Live Server**
   - Open the `bevin.portfolio` folder in VS Code.
   - Right-click `index.html` and click **"Open with Live Server"**.

3. **Option C: Docker Container (Production Grade)**
   - Run with Docker Compose:
     ```powershell
     docker compose up -d --build
     ```
     Access the site at `http://localhost:8080`.
   - Or build & run with standard Docker CLI:
     ```powershell
     docker build -t bevin-portfolio:latest .
     docker run -d -p 8080:80 --name bevin-portfolio bevin-portfolio:latest
     ```
   - To stop the container:
     ```powershell
     docker compose down
     ```

4. **Option D: Python HTTP Server (Quick local preview)**
   ```powershell
   cd c:\Users\Hp\Downloads\bevin.portfolio
   python -m http.server 3000
   ```
   Open `http://localhost:3000` in your web browser.

---

## 🌐 Deployment to Vercel or Netlify

### To Deploy on Vercel:
1. Push your project to GitHub (or upload the folder to your GitHub repository `Portfolio`).
2. Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
3. Click **"Add New Project"** and select `Portfolio` (or `bevin.portfolio`).
4. Keep the default settings (Framework Preset: "Other", Root Directory: `./`).
5. Click **"Deploy"**. Your site will go live in under 30 seconds!

### To Deploy on Netlify:
1. Go to [netlify.com](https://app.netlify.com/).
2. Drag and drop the `bevin.portfolio` folder directly into the Netlify "Sites" drop area, or link your GitHub repository.
3. Netlify will detect `netlify.toml` and deploy immediately.

---

## ✏️ How to Easily Update Sections
- **Update Profile Photo**: Replace `assets/images/bevin_profile.png` with any new high-resolution photo of yourself.
- **Update Resume**: Replace `assets/Bevin_Joy_Resume.pdf` with your updated resume PDF keeping the same filename.
- **Add New Certificates**: In `js/main.js`, find the `certData` object to add or edit credentials, and duplicate a `.cert-card` in `index.html`.
- **Add New Projects**: In `index.html`, duplicate one of the `.project-card` blocks inside `<div class="projects-grid">`.
