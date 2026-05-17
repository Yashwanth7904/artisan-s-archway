# 🪨 Shilpa-Kala Showcase
### *Ancient Art for the Modern Buyer*

**Shilpa-Kala Showcase** is a verified digital gallery that bridges the gap between India's living master shilpis (traditional stone and wood carvers) and collectors worldwide. Rooted in the rich artisan enclave of Shivarapatna, Karnataka, this platform preserves generational heritage and crafts by connecting modern buyers directly to the workshops where ancient temple-carving traditions live on.

---

## 🏛️ Project Vision & Purpose

In ancient villages like **Shivarapatna**, multi-generational stone carvers have shaped black granite deities using precise Hoysala and Dravidian iconographic codes for centuries. However, without access to modern digital markets, this priceless heritage is at risk of fading within a generation. 

**Shilpa-Kala Showcase** acts as a "truth and verification" platform:
*   **Direct Access:** Connects global art collectors and temple trustees directly with master sculptors (like Ramachandra Shilpi & Venkatesh Acharya).
*   **Verification:** Displays authentic documentation of the carving process, including raw quarry blocks, rough roughing phases, and finalized details.
*   **Inquiry System:** Built-in WhatsApp inquiry generation that automatically pre-fills highly detailed specifications for custom commissions.
*   **Heritage Education:** Interactive editorial features highlighting the Hoysala, Pallava, Dravidian, and Mysore Wood architectural traditions.

---

## ✨ Features

- **🏺 Premium Stone & Wood Gallery:** Cataloged view of heirloom stone (granite, sandstone) and wood (rosewood, sandalwood) carvings.
- **🛠️ Transparent Work-in-Progress Timelines:** Step-by-step documentation showing how raw materials are consecrated, blocked, and hand-chiseled into dynamic deities.
- **🎨 Artisan Profiles:** Rich portfolios highlighting the experience (up to 40+ years), specialties, awards, and the exact signature of each master shilpi.
- **💬 Direct-to-Workshop Inquiries:** Deep-linked WhatsApp integrations that format precise specifications (Product ID, Style, Dimensions, Material) for custom requests.
- **📖 Curated Heritage Hub:** Interactive articles exploring deep histories, unique characteristics, and famous examples of regional sculpture traditions.
- **🚀 Ultra-fast SSR Architecture:** High-performance, SEO-optimized routing using the cutting-edge TanStack Start framework.

---

## 🛠️ Tech Stack & Architecture

This application is built using a modern, server-side rendered (SSR), and highly responsive front-end stack:

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [TanStack Start](https://tanstack.com/router) (React 19) | Multi-page SSR, SEO Optimization, & file-based routing |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + CSS Variables | Glassmorphism, custom heritage serif grids, and premium animations |
| **Icons** | [Lucide React](https://lucide.dev/) | Sleek, modern icon assets |
| **Build & Dev Tooling** | [Vite 7](https://vitejs.dev/) | Ultra-fast local compilation, bundling, and hot-reload |
| **Path Mapping** | `vite-tsconfig-paths` | Standardized `@/` imports pointing directly to `./src/*` |
| **Serverless Deployment**| `@cloudflare/vite-plugin` + Wrangler | Deployment on Cloudflare Pages/Workers using the V8 runtime (`workerd`) |

---

## 📁 Repository Structure

```
artisan-s-archway/
├── public/                # Static public assets (robots.txt, etc.)
├── src/
│   ├── assets/            # High-fidelity artwork & artisan photographs
│   ├── components/        # Reusable UI elements (Navigation, Cards, Forms)
│   ├── hooks/             # Custom React Hooks
│   ├── lib/
│   │   ├── data.ts        # Mock database with rich artisan & sculpture content
│   │   ├── error-capture.ts # Out-of-band SSR error handling
│   │   └── error-page.ts  # Catch-all catastrophic error templates
│   ├── routes/            # File-based routes for pages (Start/Router)
│   │   ├── __root.tsx     # Shell, layout, and Global HTML wrapper
│   │   ├── index.tsx      # Main Showcase landing page
│   │   ├── gallery.tsx    # Master gallery search/filter page
│   │   ├── artisans.tsx   # Meet the Shilpis list
│   │   ├── artisans.$id.tsx # Single artisan profile detail page
│   │   └── heritage.tsx   # Heritage articles index
│   ├── server.ts          # SSR application entry point (Cloudflare-ready)
│   ├── start.ts           # Hydration entry point (runs on client)
│   └── styles.css         # Styling system built with Tailwind CSS v4 variables
├── wrangler.jsonc         # Cloudflare Wrangler project layout configuration
├── package.json           # Installed node packages and deployment scripts
└── tsconfig.json          # Strict TypeScript compiler presets
```

---

## 🚀 Getting Started

### 📋 Prerequisites

To run this application locally, you will need:
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher is recommended)
- `npm` or `yarn`

### 💻 Local Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Secy6969/artisan-s-archway.git
    cd artisan-s-archway
    ```

2.  **Install Dependencies:**
    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    The application will spin up locally. Open `http://localhost:3000` (or the console-printed port) in your browser to view the showcase!

4.  **Production Build:**
    ```bash
    npm run build
    ```

---

## ☁️ Cloudflare Deployment

This project comes pre-configured with Cloudflare Workers/Pages deployment capabilities.

1.  **Integrate Wrangler:**
    Authenticate with your Cloudflare account:
    ```bash
    npx wrangler login
    ```

2.  **Verify Configuration:**
    Review `wrangler.jsonc` and adjust the `name` or `compatibility_date` variables if required.

3.  **Deploy Application:**
    ```bash
    npm run build
    npx wrangler deploy
    ```
    Wrangler will package the assets, bundle the SSR routes, and publish the app to a custom `*.workers.dev` or `*.pages.dev` subdomain automatically.

---

## 📜 Code Guidelines & Best Practices

- **Strict Path Resolution:** Always use `@/` path mapping for internal imports to ensure stability during build-time path bundling.
- **Tailwind v4 Integration:** All styles are defined dynamically inside `src/styles.css`. Ad-hoc tailwind utility overrides should be avoided in favor of CSS variable design tokens.
- **Component Tagger:** Built entirely branding-free;