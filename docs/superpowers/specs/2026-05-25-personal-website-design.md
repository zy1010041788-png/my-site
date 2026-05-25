# Personal Website Design Spec

**Date**: 2026-05-25
**Status**: Approved
**Stack**: Vue 3 + Vite

## Overview

Multi-page personal website showcasing resume, projects, articles, and photography. Chinese/English bilingual with top navigation bar. Static site deployed to GitHub Pages, designed for easy migration to dynamic backend later.

## Pages & Routes

| Route | Page | Content |
|-------|------|---------|
| `/` | Home / About | Avatar, name, role tag, bio (2-3 paragraphs), skill tags, interests |
| `/articles` | Articles | Article cards (title, date, summary, tags), click to detail page |
| `/articles/:id` | Article Detail | Markdown-rendered article content |
| `/projects` | Projects | Project card grid (screenshot, name, description, tech tags), expandable or external link |
| `/resume` | Resume | Education timeline, work experience timeline, skill bars |
| `/photography` | Photography | Photo gallery with lazy loading and lightbox viewer, optional category filter |

## Design System

### Colors
- Background: `#FAFAFA`
- Primary text: `#09090B`
- Primary surface: `#18181B`
- Secondary surface: `#3F3F46`
- Accent (CTA): `#2563EB`

### Typography
- Headings: Caveat (handwritten, warm)
- Body: Quicksand (rounded, modern, readable)
- Source: Google Fonts

### Effects
- Scroll-triggered entrance animations (Intersection Observer)
- Card hover: subtle scale + shadow (300-400ms)
- Page transitions: smooth crossfade
- Parallax: light 3-5 layer on hero section
- `prefers-reduced-motion` respected

### Icons
- Lucide SVG icons (consistent 24x24)
- No emoji as icons

## Tech Stack

| Layer | Choice | Purpose |
|-------|--------|---------|
| Framework | Vue 3 (Composition API) | Component-based UI |
| Build | Vite | Fast dev server and production build |
| Routing | Vue Router | Multi-page navigation |
| i18n | vue-i18n | Chinese/English switching |
| Styling | Tailwind CSS | Utility-first CSS, matches uipro recommendation |
| Deployment | GitHub Pages | Free static hosting |

## Navigation

Top navigation bar, fixed on scroll. Items: Home, Articles, Projects, Resume, Photography. Language toggle in the top-right corner.

## Dynamic Migration Path

The entire site is a static SPA. To make it dynamic later:
- Vue components and styles remain unchanged
- Replace local static data with API calls (fetch/axios)
- Add a backend (any language) or use a BaaS (Supabase, Firebase)
- No frontend rewrite needed

## Pre-Delivery Checklist

- [ ] No emojis as icons (use Lucide SVG)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode text contrast >= 4.5:1
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] Chinese and English translations complete
