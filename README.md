# The First Chapter

The First Chapter is the public website for **The First Chapter Corp.**, a registered non-profit organization based in the Greater Toronto Area, Ontario.

This repository represents one of my major projects: building the nonprofit's digital presence while also helping set up the organization itself. The goal of the website is to explain the mission clearly, present the nonprofit's programs professionally, and give visitors a direct path to learn, volunteer, donate, or connect.

Live site: [thefirstchapternpo.org](https://www.thefirstchapternpo.org/)

## About the Nonprofit

The First Chapter is a student-led nonprofit focused on supporting children through education access, health and wellbeing, and community care. The organization is built around the belief that every child deserves the tools, encouragement, and support needed to begin their own first chapter.

The website communicates several core initiatives:

- **Education access:** school supplies, educational kits, and learning resources for children who may not have consistent access to them.
- **Care Kits:** donation-funded packages assembled for children navigating hospital stays, shelters, or transitional living situations.
- **Community action:** outreach, volunteering, awareness campaigns, and local partnerships across the GTA.
- **Responsible fundraising:** building a transparent foundation before scaling larger programs.

## Project Purpose

This project was more than a standard website build. I used it as a way to combine software development, design, nonprofit operations, communication, and project leadership.

From a technical perspective, the site needed to feel polished and trustworthy while remaining easy to maintain as the nonprofit grows. From an organizational perspective, the website had to present the mission in a way that university recruiters, donors, volunteers, and community partners could understand quickly.

## What I Built

- A responsive React website for the nonprofit's homepage, about page, and care kit pages.
- A mission-driven homepage with a full-screen image hero, animated slide transitions, program sections, and volunteer calls to action.
- An about page explaining the nonprofit's vision, mission, purpose, founders, and focus areas.
- A care kits experience with donation information, kit descriptions, process steps, and a dedicated educational kit page.
- A scroll-driven educational kit animation using a pre-rendered WebP frame sequence and canvas rendering.
- A dynamic reading list section that fetches child education, health, and wellbeing articles through a serverless API endpoint.
- Volunteer interest form integration through Formspree.
- Mobile-responsive navigation, layout, typography, and interactive states.

## Technical Stack

**Languages**

- JavaScript
- JSX
- HTML
- CSS

**Frameworks and Tooling**

- React 19
- Vite
- React Router
- ESLint
- PostCSS
- Tailwind CSS dependency support

**Libraries and Modules**

- `framer-motion` for page transitions, scroll reveals, hover states, carousel animation, and motion effects.
- `react-router-dom` for client-side routing between the home, about, care kits, and education kit pages.
- `lucide-react` for accessible iconography across navigation, program cards, buttons, and UI elements.
- `gsap` and `@gsap/react` for animation support.
- `three`, `@react-three/fiber`, and `@react-three/drei` for 3D/interactive visual experimentation in the component system.
- Browser APIs such as `fetch`, `localStorage`, `canvas`, `Image`, `requestAnimationFrame`, and `AbortController`.

## Implementation Highlights

### Frontend Architecture

The app is structured with reusable React components for major sections such as the hero, about content, program cards, care kits, reading list, join form, footer, and navigation. Routing is handled in `src/main.jsx`, with dedicated routes for:

- `/`
- `/about`
- `/care-kits`
- `/care-kits/education`

This helped me practice organizing a site as a real application instead of a single static page.

### Motion and Interaction Design

I used Framer Motion throughout the project to create smooth but purposeful interactions:

- hero image carousel transitions
- scroll-triggered content reveals
- hover animations on program and kit cards
- animated buttons and floating donation prompts
- rotating headline words on the care kit pages

The challenge was balancing visual polish with readability and performance, especially on mobile devices.

### Dynamic Reading List

The reading list uses a serverless API route in `api/reading-list.js` to gather and filter articles related to children, education, health, and wellbeing. It includes topic filtering, duplicate removal, image enrichment, timeout handling, daily rotation, and caching headers.

On the frontend, the section uses `fetch`, `localStorage`, loading states, carousel controls, and image validation to keep the homepage connected to current issues without making the page depend entirely on a third-party feed.

### Care Kit Animation

The educational kit page includes a scroll-based animation built from 144 optimized WebP frames. The implementation preloads frames, adjusts behavior for mobile devices, renders through a canvas, and uses `requestAnimationFrame` to keep the animation smooth.

This was one of the more technically challenging parts of the project because it required thinking about performance, image loading, device pixel ratio, frame selection, scroll progress, and fallback behavior.

### Responsive Design

The site uses responsive grids, CSS custom properties, `clamp()` typography, mobile navigation behavior, and conditional React state for viewport-specific interactions. I had to account for desktop, tablet, and mobile layouts while keeping the nonprofit's visual identity consistent.

## Skills Demonstrated

- React component architecture
- Client-side routing
- Responsive web design
- UI/UX design for a mission-driven organization
- Animation and interaction design
- Serverless API development
- Fetching, filtering, and caching external data
- Form integration
- Asset optimization and image-heavy page design
- Canvas-based animation
- Accessibility basics such as semantic links, labels, alt text, and button labels
- Project organization and maintainability
- Translating a nonprofit mission into clear digital communication

## What I Learned

This project pushed me to think beyond just writing code. I had to make technical decisions that supported the nonprofit's credibility, message, and future growth.

Some of the biggest learning areas were:

- creating a polished React application from scratch with Vite
- organizing a growing component-based codebase
- designing pages that feel professional without losing warmth or purpose
- building animations that enhance the experience without overwhelming the content
- working with real nonprofit language, calls to action, and trust-building content
- handling external data carefully so the site stays reliable
- optimizing visual assets for a media-rich website
- connecting software development with community impact and organizational setup

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Notes

The site is actively tied to the growth of The First Chapter Corp. As the nonprofit develops new partnerships, programs, and fundraising work, the website can be expanded with additional program pages, impact reporting, donor flows, and volunteer management features.
