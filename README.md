# Chandrima Ganguly, Ph.D. — Personal Website

> AI Innovation with Intention

Personal website and consulting practice platform for Dr. Chandrima Ganguly, specializing in responsible AI consulting for startups, social enterprises, NGOs, and government bodies.

## Tech Stack

- **Framework:** [Astro](https://astro.build/) 4.x
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **Hosting:** GitHub Pages
- **Forms:** Formspree (configure your form ID)
- **Calendar:** Cal.com (configure your booking link)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/chandrimaganguly/chandrimaganguly.github.io.git
cd chandrimaganguly.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

### Build

```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Configuration

### Contact Form (Formspree)

1. Create an account at [formspree.io](https://formspree.io)
2. Create a new form
3. Replace `YOUR_FORM_ID` in `src/pages/contact.astro` with your form ID

### Calendar (Cal.com)

1. Create an account at [cal.com](https://cal.com)
2. Set up a "Discovery Call" event type
3. Update the `data-cal-link` attribute in `src/pages/contact.astro`
4. Add the Cal.com embed script to the page

### Substack Integration

The Insights page links to your Substack. For dynamic RSS integration, you can add a build-time RSS fetch in `src/pages/insights.astro`.

## Deployment

This site is configured for GitHub Pages deployment via GitHub Actions.

1. Push to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Site will be live at `chandrimaganguly.github.io`

### Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings

## Project Structure

```
├── public/
│   ├── images/
│   │   └── professional_photo.jpg
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ServiceCard.astro
│   │   └── SectionHeader.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── services.astro
│   │   ├── case-studies.astro
│   │   ├── insights.astro
│   │   └── contact.astro
│   └── styles/
│       └── global.css
├── .github/
│   └── workflows/
│       └── deploy.yml
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Brand Guidelines

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Forest Deep | `#2D4739` | Primary, headers, trust |
| Sage | `#87A878` | Secondary, growth, sustainability |
| Terracotta | `#C4745A` | Accent, warmth, humanity |
| Morning Gold | `#D4A84B` | CTAs, highlights, optimism |
| Soft Cream | `#FAF8F5` | Backgrounds |
| Warm Stone | `#E8E0D5` | Cards, borders |
| Deep Earth | `#3D3D3D` | Body text |

### Typography

- **Headings:** Fraunces (serif, Google Fonts)
- **Body:** Source Sans 3 (sans-serif, Google Fonts)
- **Accent:** Caveat (handwritten, for quotes)

### Tagline

> AI Innovation with Intention

Use "innovation with intention" as a callback phrase throughout the site.

## License

All rights reserved. This website design and content are proprietary.

---

Built with intention.
