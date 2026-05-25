# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 5-page bilingual (zh/en) personal website with Vue 3 + Vite + Tailwind CSS, deployed to GitHub Pages.

**Architecture:** Single-page application with Vue Router (hash mode for GitHub Pages). Each page is a view component under `src/views/`. Reusable UI pieces (NavBar, Footer, cards) live in `src/components/`. Content data (articles, projects, resume) stored as JSON files for easy migration to a backend API later. Internationalization via vue-i18n with lazy-loaded locale messages.

**Tech Stack:** Vue 3 (Composition API), Vite, Vue Router, vue-i18n, Tailwind CSS v3, Lucide icons

---

## File Structure (Final State)

```
D:/网站开发/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.js                  # App entry, register router + i18n
│   ├── App.vue                  # Root layout: NavBar + router-view + Footer
│   ├── style.css                # Tailwind directives + global styles
│   ├── router/
│   │   └── index.js             # Route definitions (hash mode)
│   ├── i18n/
│   │   ├── index.js             # vue-i18n setup
│   │   ├── zh.json              # Chinese translations
│   │   └── en.json              # English translations
│   ├── components/
│   │   ├── NavBar.vue           # Top nav + mobile hamburger menu
│   │   ├── Footer.vue           # Social links + copyright
│   │   ├── LanguageToggle.vue   # zh/en switch button
│   │   ├── ProjectCard.vue      # Single project card
│   │   ├── ArticleCard.vue      # Single article card
│   │   ├── Timeline.vue         # Resume timeline (education + work)
│   │   ├── Lightbox.vue         # Photo lightbox viewer
│   │   └── ScrollReveal.vue     # Scroll-triggered entrance animation wrapper
│   ├── views/
│   │   ├── Home.vue             # About me landing page
│   │   ├── Projects.vue         # Project grid
│   │   ├── Articles.vue         # Article list
│   │   ├── ArticleDetail.vue    # Single article (Markdown rendered)
│   │   ├── Resume.vue           # Education + work timeline
│   │   └── Photography.vue      # Photo gallery + lightbox
│   └── data/
│       ├── projects.json        # Project entries
│       ├── articles.json        # Article entries
│       └── resume.json          # Education + work entries
├── public/
│   └── photos/                  # User adds their photos here
└── docs/
    └── superpowers/
        ├── specs/2026-05-25-personal-website-design.md
        └── plans/2026-05-25-personal-website-plan.md
```

---

### Task 1: Scaffold Vite + Vue project

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.js`
- Create: `src/main.js`
- Create: `src/App.vue`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "personal-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

- [ ] **Step 2: Create index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Personal Website</title>
  </head>
  <body class="bg-[#FAFAFA] text-[#09090B]">
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

- [ ] **Step 3: Create vite.config.js**

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',
})
```

- [ ] **Step 4: Create src/main.js**

```js
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

const app = createApp(App)
app.mount('#app')
```

- [ ] **Step 5: Create src/App.vue (placeholder)**

```vue
<template>
  <div>Hello, it works!</div>
</template>
```

- [ ] **Step 6: Install base dependencies**

```bash
npm install
```

Expected: installs vue and vite

- [ ] **Step 7: Install Vite Vue plugin**

```bash
npm install -D @vitejs/plugin-vue
```

- [ ] **Step 8: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite dev server running on http://localhost:5173. Open and see "Hello, it works!". Stop with Ctrl+C.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + Vue project"
```

---

### Task 2: Install remaining dependencies

- [ ] **Step 1: Install all dependencies in one command**

```bash
npm install vue-router@4 vue-i18n@10 lucide-vue-next marked
```

Expected: installs vue-router, vue-i18n, lucide-vue-next, and marked (for Markdown rendering in articles)

- [ ] **Step 2: Install dev dependencies**

```bash
npm install -D tailwindcss@3 postcss autoprefixer
```

Expected: installs Tailwind CSS v3 with PostCSS and Autoprefixer

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install dependencies (vue-router, vue-i18n, lucide, marked, tailwind)"
```

---

### Task 3: Configure Tailwind CSS

**Files:**
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Modify: `src/style.css`

- [ ] **Step 1: Create tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Caveat', 'cursive'],
        body: ['Quicksand', 'sans-serif'],
      },
      colors: {
        primary: '#18181B',
        secondary: '#3F3F46',
        accent: '#2563EB',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Create postcss.config.js**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 3: Overwrite src/style.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Quicksand', sans-serif;
}

h1, h2, h3, .font-heading {
  font-family: 'Caveat', cursive;
}
```

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.js postcss.config.js src/style.css
git commit -m "feat: configure Tailwind CSS with design system colors and fonts"
```

---

### Task 4: Set up Vue Router

**Files:**
- Create: `src/router/index.js`
- Modify: `src/main.js`
- Modify: `src/App.vue`

- [ ] **Step 1: Create src/router/index.js**

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('../views/Articles.vue'),
  },
  {
    path: '/articles/:id',
    name: 'ArticleDetail',
    component: () => import('../views/ArticleDetail.vue'),
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/Projects.vue'),
  },
  {
    path: '/resume',
    name: 'Resume',
    component: () => import('../views/Resume.vue'),
  },
  {
    path: '/photography',
    name: 'Photography',
    component: () => import('../views/Photography.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
```

- [ ] **Step 2: Update src/main.js to register router**

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

- [ ] **Step 3: Update src/App.vue to use router-view**

```vue
<template>
  <router-view />
</template>
```

- [ ] **Step 4: Create placeholder view files for all routes**

Create each of these with minimal content:

`src/views/Home.vue`:
```vue
<template>
  <div class="p-8"><h1 class="text-3xl font-heading">Home / About</h1></div>
</template>
```

`src/views/Articles.vue`:
```vue
<template>
  <div class="p-8"><h1 class="text-3xl font-heading">Articles</h1></div>
</template>
```

`src/views/ArticleDetail.vue`:
```vue
<template>
  <div class="p-8"><h1 class="text-3xl font-heading">Article Detail</h1></div>
</template>
```

`src/views/Projects.vue`:
```vue
<template>
  <div class="p-8"><h1 class="text-3xl font-heading">Projects</h1></div>
</template>
```

`src/views/Resume.vue`:
```vue
<template>
  <div class="p-8"><h1 class="text-3xl font-heading">Resume</h1></div>
</template>
```

`src/views/Photography.vue`:
```vue
<template>
  <div class="p-8"><h1 class="text-3xl font-heading">Photography</h1></div>
</template>
```

- [ ] **Step 5: Run dev server and verify navigation**

```bash
npm run dev
```

In browser, navigate to:
- `http://localhost:5173/#/` — Home
- `http://localhost:5173/#/articles` — Articles
- `http://localhost:5173/#/projects` — Projects
- `http://localhost:5173/#/resume` — Resume
- `http://localhost:5173/#/photography` — Photography

Expected: each route shows its placeholder heading. Stop with Ctrl+C.

- [ ] **Step 6: Commit**

```bash
git add src/router/ src/main.js src/App.vue src/views/
git commit -m "feat: add Vue Router with hash mode and all route placeholders"
```

---

### Task 5: Set up vue-i18n (Internationalization)

**Files:**
- Create: `src/i18n/zh.json`
- Create: `src/i18n/en.json`
- Create: `src/i18n/index.js`
- Modify: `src/main.js`

- [ ] **Step 1: Create src/i18n/zh.json**

```json
{
  "nav": {
    "home": "首页",
    "articles": "文章",
    "projects": "项目",
    "resume": "简历",
    "photography": "摄影"
  },
  "home": {
    "greeting": "你好，我是",
    "role": "开发者 / 设计师",
    "bio": "这里是关于我的介绍。热爱技术、设计与摄影。",
    "skills": "技能",
    "interests": "兴趣爱好"
  },
  "articles": {
    "title": "文章",
    "readMore": "阅读更多",
    "back": "返回文章列表",
    "publishedOn": "发布于"
  },
  "projects": {
    "title": "项目作品",
    "viewProject": "查看项目",
    "techUsed": "技术栈"
  },
  "resume": {
    "title": "简历",
    "education": "教育经历",
    "experience": "工作经历",
    "skills": "专业技能"
  },
  "photography": {
    "title": "摄影作品",
    "all": "全部"
  },
  "footer": {
    "copyright": "版权所有",
    "builtWith": "使用 Vue + Tailwind CSS 构建"
  }
}
```

- [ ] **Step 2: Create src/i18n/en.json**

```json
{
  "nav": {
    "home": "Home",
    "articles": "Articles",
    "projects": "Projects",
    "resume": "Resume",
    "photography": "Photography"
  },
  "home": {
    "greeting": "Hi, I'm",
    "role": "Developer / Designer",
    "bio": "About me. Passionate about technology, design, and photography.",
    "skills": "Skills",
    "interests": "Interests"
  },
  "articles": {
    "title": "Articles",
    "readMore": "Read More",
    "back": "Back to Articles",
    "publishedOn": "Published on"
  },
  "projects": {
    "title": "Projects",
    "viewProject": "View Project",
    "techUsed": "Tech Stack"
  },
  "resume": {
    "title": "Resume",
    "education": "Education",
    "experience": "Experience",
    "skills": "Skills"
  },
  "photography": {
    "title": "Photography",
    "all": "All"
  },
  "footer": {
    "copyright": "All rights reserved",
    "builtWith": "Built with Vue + Tailwind CSS"
  }
}
```

- [ ] **Step 3: Create src/i18n/index.js**

```js
import { createI18n } from 'vue-i18n'
import zh from './zh.json'
import en from './en.json'

const savedLocale = localStorage.getItem('locale') || 'zh'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'zh',
  messages: { zh, en },
})

export default i18n
```

- [ ] **Step 4: Update src/main.js to register i18n**

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './style.css'

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')
```

- [ ] **Step 5: Commit**

```bash
git add src/i18n/ src/main.js
git commit -m "feat: add vue-i18n with zh/en translations"
```

---

### Task 6: Build NavBar component

**Files:**
- Create: `src/components/NavBar.vue`
- Create: `src/components/LanguageToggle.vue`

- [ ] **Step 1: Create src/components/LanguageToggle.vue**

```vue
<template>
  <button
    @click="toggleLocale"
    class="px-3 py-1 text-sm border border-gray-300 rounded-full hover:border-accent hover:text-accent transition-colors duration-200 cursor-pointer"
  >
    {{ locale === 'zh' ? 'EN' : '中文' }}
  </button>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function toggleLocale() {
  const next = locale.value === 'zh' ? 'en' : 'zh'
  locale.value = next
  localStorage.setItem('locale', next)
}
</script>
```

- [ ] **Step 2: Create src/components/NavBar.vue**

```vue
<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <router-link to="/" class="text-xl font-heading font-bold text-primary hover:text-accent transition-colors duration-200">
        {{ siteName }}
      </router-link>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-8">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="text-sm text-secondary hover:text-accent transition-colors duration-200"
          active-class="text-accent font-semibold"
        >
          {{ item.label }}
        </router-link>
        <LanguageToggle />
      </div>

      <!-- Mobile hamburger -->
      <button
        @click="menuOpen = !menuOpen"
        class="md:hidden p-2 text-secondary hover:text-primary transition-colors duration-200 cursor-pointer"
        aria-label="Toggle menu"
      >
        <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-if="menuOpen" class="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="text-sm text-secondary hover:text-accent transition-colors duration-200"
        active-class="text-accent font-semibold"
        @click="menuOpen = false"
      >
        {{ item.label }}
      </router-link>
      <LanguageToggle />
    </div>
  </nav>

  <!-- Spacer to prevent content from hiding behind fixed navbar -->
  <div class="h-16"></div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageToggle from './LanguageToggle.vue'

const { t, locale } = useI18n()
const menuOpen = ref(false)

const siteName = computed(() => locale.value === 'zh' ? '我的主页' : 'My Site')

const navItems = computed(() => [
  { path: '/', label: t('nav.home') },
  { path: '/articles', label: t('nav.articles') },
  { path: '/projects', label: t('nav.projects') },
  { path: '/resume', label: t('nav.resume') },
  { path: '/photography', label: t('nav.photography') },
])
</script>
```

- [ ] **Step 3: Update src/App.vue to use NavBar**

```vue
<template>
  <NavBar />
  <main class="min-h-screen">
    <router-view />
  </main>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Expected: Navigation bar visible at the top. Links navigate between pages. Hamburger menu works on narrow screens (resize browser < 768px). Language toggle works.

- [ ] **Step 5: Commit**

```bash
git add src/components/NavBar.vue src/components/LanguageToggle.vue src/App.vue
git commit -m "feat: add NavBar with mobile hamburger menu and LanguageToggle"
```

---

### Task 7: Build ScrollReveal component

**Files:**
- Create: `src/components/ScrollReveal.vue`

- [ ] **Step 1: Create src/components/ScrollReveal.vue**

```vue
<template>
  <div ref="el" :class="[isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']" class="transition-all duration-700 ease-out">
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const el = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.15 }
  )

  if (el.value) observer.observe(el.value)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ScrollReveal.vue
git commit -m "feat: add ScrollReveal component with reduced-motion support"
```

---

### Task 8: Build Home page

**Files:**
- Modify: `src/views/Home.vue`

- [ ] **Step 1: Overwrite src/views/Home.vue**

```vue
<template>
  <div class="max-w-3xl mx-auto px-6 py-20">
    <ScrollReveal>
      <div class="flex flex-col items-center text-center mb-12">
        <div class="w-32 h-32 rounded-full bg-gray-200 mb-6 overflow-hidden">
          <!-- Replace src with your avatar image -->
          <img v-if="avatarSrc" :src="avatarSrc" alt="Avatar" class="w-full h-full object-cover" />
        </div>
        <h1 class="text-4xl md:text-5xl font-heading text-primary mb-3">
          {{ $t('home.greeting') }} <span class="text-accent">{{ name }}</span>
        </h1>
        <p class="text-lg text-secondary mb-6">{{ $t('home.role') }}</p>
        <p class="text-secondary leading-relaxed max-w-xl">{{ $t('home.bio') }}</p>
      </div>
    </ScrollReveal>

    <ScrollReveal>
      <section class="mb-12">
        <h2 class="text-2xl font-heading text-primary mb-4">{{ $t('home.skills') }}</h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="skill in skills"
            :key="skill"
            class="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-secondary hover:border-accent hover:text-accent transition-colors duration-200"
          >
            {{ skill }}
          </span>
        </div>
      </section>
    </ScrollReveal>

    <ScrollReveal>
      <section>
        <h2 class="text-2xl font-heading text-primary mb-4">{{ $t('home.interests') }}</h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="interest in interests"
            :key="interest"
            class="px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm"
          >
            {{ interest }}
          </span>
        </div>
      </section>
    </ScrollReveal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ScrollReveal from '../components/ScrollReveal.vue'

const name = ref('Your Name')
const avatarSrc = ref('')
const skills = ref(['Vue.js', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Python', 'Git'])
const interests = ref(['摄影 Photography', '开源 Open Source', '设计 Design', '写作 Writing'])
</script>
```

- [ ] **Step 2: Verify in browser**

Run `npm run dev`, go to `http://localhost:5173/#/`. Expected: Home page with avatar placeholder, name, role, skills, and interests. Scroll animations trigger on scroll.

- [ ] **Step 3: Commit**

```bash
git add src/views/Home.vue
git commit -m "feat: build Home page with skills and interests sections"
```

---

### Task 9: Build Projects page

**Files:**
- Create: `src/data/projects.json`
- Create: `src/components/ProjectCard.vue`
- Modify: `src/views/Projects.vue`

- [ ] **Step 1: Create src/data/projects.json**

```json
[
  {
    "id": 1,
    "title": "示例项目",
    "titleEn": "Sample Project",
    "summary": "这是一个示例项目描述。",
    "summaryEn": "A sample project description.",
    "tags": ["Vue", "Tailwind"],
    "image": "",
    "link": "https://github.com"
  }
]
```

- [ ] **Step 2: Create src/components/ProjectCard.vue**

```vue
<template>
  <div class="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
    <div class="aspect-video bg-gray-100 overflow-hidden">
      <img
        v-if="project.image"
        :src="project.image"
        :alt="projectTitle"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
      </div>
    </div>
    <div class="p-5">
      <h3 class="font-heading text-xl text-primary mb-2">{{ projectTitle }}</h3>
      <p class="text-sm text-secondary mb-3 line-clamp-2">{{ projectSummary }}</p>
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="px-2 py-0.5 bg-gray-100 text-xs text-secondary rounded"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    <a
      v-if="project.link"
      :href="project.link"
      target="_blank"
      rel="noopener noreferrer"
      class="block px-5 pb-5"
    >
      <span class="text-sm text-accent hover:underline">{{ $t('projects.viewProject') }} &rarr;</span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  project: { type: Object, required: true },
})

const { locale } = useI18n()

const projectTitle = computed(() => locale.value === 'zh' ? props.project.title : (props.project.titleEn || props.project.title))
const projectSummary = computed(() => locale.value === 'zh' ? props.project.summary : (props.project.summaryEn || props.project.summary))
</script>
```

- [ ] **Step 3: Overwrite src/views/Projects.vue**

```vue
<template>
  <div class="max-w-6xl mx-auto px-6 py-20">
    <ScrollReveal>
      <h1 class="text-4xl font-heading text-primary mb-10 text-center">{{ $t('projects.title') }}</h1>
    </ScrollReveal>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ScrollReveal v-for="project in projects" :key="project.id">
        <ProjectCard :project="project" />
      </ScrollReveal>
    </div>

    <div v-if="projects.length === 0" class="text-center text-secondary py-20">
      <p>No projects yet. Add them to <code class="bg-gray-100 px-1 rounded">src/data/projects.json</code></p>
    </div>
  </div>
</template>

<script setup>
import ScrollReveal from '../components/ScrollReveal.vue'
import ProjectCard from '../components/ProjectCard.vue'
import projects from '../data/projects.json'
</script>
```

- [ ] **Step 4: Verify in browser**

Go to `http://localhost:5173/#/projects`. Expected: Project grid with sample project card. Hover effects work.

- [ ] **Step 5: Commit**

```bash
git add src/data/projects.json src/components/ProjectCard.vue src/views/Projects.vue
git commit -m "feat: build Projects page with ProjectCard grid"
```

---

### Task 10: Build Articles page + Article Detail

**Files:**
- Create: `src/data/articles.json`
- Create: `src/components/ArticleCard.vue`
- Modify: `src/views/Articles.vue`
- Modify: `src/views/ArticleDetail.vue`

- [ ] **Step 1: Create src/data/articles.json**

```json
[
  {
    "id": 1,
    "title": "示例文章标题",
    "titleEn": "Sample Article Title",
    "summary": "这是文章的摘要。",
    "summaryEn": "This is the article summary.",
    "date": "2026-05-25",
    "tags": ["技术", "Vue"],
    "content": "## 这是标题\n\n这是文章正文内容。支持 **Markdown** 格式。",
    "contentEn": "## This is a heading\n\nThis is the article body. Supports **Markdown** format."
  }
]
```

- [ ] **Step 2: Create src/components/ArticleCard.vue**

```vue
<template>
  <router-link
    :to="`/articles/${article.id}`"
    class="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
  >
    <div class="flex flex-wrap gap-2 mb-3">
      <span
        v-for="tag in article.tags"
        :key="tag"
        class="px-2 py-0.5 bg-gray-100 text-xs text-secondary rounded"
      >
        {{ tag }}
      </span>
    </div>
    <h3 class="font-heading text-xl text-primary mb-2">{{ articleTitle }}</h3>
    <p class="text-sm text-secondary mb-4 line-clamp-2">{{ articleSummary }}</p>
    <time class="text-xs text-gray-400">{{ article.date }}</time>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  article: { type: Object, required: true },
})

const { locale } = useI18n()

const articleTitle = computed(() => locale.value === 'zh' ? props.article.title : (props.article.titleEn || props.article.title))
const articleSummary = computed(() => locale.value === 'zh' ? props.article.summary : (props.article.summaryEn || props.article.summary))
</script>
```

- [ ] **Step 3: Overwrite src/views/Articles.vue**

```vue
<template>
  <div class="max-w-3xl mx-auto px-6 py-20">
    <ScrollReveal>
      <h1 class="text-4xl font-heading text-primary mb-10 text-center">{{ $t('articles.title') }}</h1>
    </ScrollReveal>

    <div class="flex flex-col gap-4">
      <ScrollReveal v-for="article in articles" :key="article.id">
        <ArticleCard :article="article" />
      </ScrollReveal>
    </div>

    <div v-if="articles.length === 0" class="text-center text-secondary py-20">
      <p>No articles yet. Add them to <code class="bg-gray-100 px-1 rounded">src/data/articles.json</code></p>
    </div>
  </div>
</template>

<script setup>
import ScrollReveal from '../components/ScrollReveal.vue'
import ArticleCard from '../components/ArticleCard.vue'
import articles from '../data/articles.json'
</script>
```

- [ ] **Step 4: Overwrite src/views/ArticleDetail.vue**

```vue
<template>
  <div class="max-w-3xl mx-auto px-6 py-20">
    <div v-if="article">
      <router-link
        to="/articles"
        class="inline-flex items-center gap-1 text-sm text-secondary hover:text-accent transition-colors duration-200 mb-8"
      >
        &larr; {{ $t('articles.back') }}
      </router-link>

      <ScrollReveal>
        <h1 class="text-3xl md:text-4xl font-heading text-primary mb-4">{{ articleTitle }}</h1>
      </ScrollReveal>

      <ScrollReveal>
        <div class="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-400">
          <time>{{ $t('articles.publishedOn') }} {{ article.date }}</time>
          <div class="flex gap-1.5">
            <span v-for="tag in article.tags" :key="tag" class="px-2 py-0.5 bg-gray-100 text-xs text-secondary rounded">
              {{ tag }}
            </span>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <article
          class="prose prose-gray max-w-none"
          v-html="renderedContent"
        ></article>
      </ScrollReveal>
    </div>

    <div v-else class="text-center text-secondary py-20">
      <p>Article not found.</p>
      <router-link to="/articles" class="text-accent hover:underline">{{ $t('articles.back') }}</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { marked } from 'marked'
import ScrollReveal from '../components/ScrollReveal.vue'
import articles from '../data/articles.json'

const route = useRoute()
const { locale } = useI18n()

const article = computed(() => {
  return articles.find(a => a.id === Number(route.params.id)) || null
})

const articleTitle = computed(() => {
  if (!article.value) return ''
  return locale.value === 'zh' ? article.value.title : (article.value.titleEn || article.value.title)
})

const renderedContent = computed(() => {
  if (!article.value) return ''
  const content = locale.value === 'zh' ? article.value.content : (article.value.contentEn || article.value.content)
  return marked(content)
})
</script>
```

- [ ] **Step 5: Verify in browser**

Go to `http://localhost:5173/#/articles`. Click the sample article. Expected: Article detail renders Markdown as HTML. Back link works.

- [ ] **Step 6: Commit**

```bash
git add src/data/articles.json src/components/ArticleCard.vue src/views/Articles.vue src/views/ArticleDetail.vue
git commit -m "feat: build Articles list and ArticleDetail with Markdown rendering"
```

---

### Task 11: Build Resume page

**Files:**
- Create: `src/data/resume.json`
- Create: `src/components/Timeline.vue`
- Modify: `src/views/Resume.vue`

- [ ] **Step 1: Create src/data/resume.json**

```json
{
  "education": [
    {
      "period": "2020 - 2024",
      "school": "某某大学",
      "schoolEn": "Example University",
      "degree": "计算机科学 学士",
      "degreeEn": "B.S. in Computer Science",
      "description": "主修计算机科学与技术。",
      "descriptionEn": "Major in Computer Science and Technology."
    }
  ],
  "experience": [
    {
      "period": "2024 - Present",
      "company": "某某公司",
      "companyEn": "Example Company",
      "role": "前端开发工程师",
      "roleEn": "Frontend Developer",
      "description": "负责Web前端开发。",
      "descriptionEn": "Responsible for frontend web development."
    }
  ],
  "skills": [
    { "name": "Vue.js", "level": 80 },
    { "name": "JavaScript", "level": 75 },
    { "name": "HTML/CSS", "level": 85 },
    { "name": "Python", "level": 60 }
  ]
}
```

- [ ] **Step 2: Create src/components/Timeline.vue**

```vue
<template>
  <div class="relative pl-8 border-l-2 border-gray-200">
    <div v-for="(item, index) in items" :key="index" class="mb-10 last:mb-0 relative">
      <div class="absolute -left-[2.15rem] top-1 w-3 h-3 rounded-full bg-accent border-2 border-white"></div>
      <span class="text-xs text-accent font-semibold tracking-wide">{{ item.period }}</span>
      <h3 class="text-lg font-heading text-primary mt-1">{{ itemHeading(item) }}</h3>
      <p class="text-sm text-secondary mt-1">{{ itemSubheading(item) }}</p>
      <p v-if="itemDescription(item)" class="text-sm text-gray-400 mt-2">{{ itemDescription(item) }}</p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const props = defineProps({
  items: { type: Array, required: true },
  type: { type: String, default: 'education' },
})

const { locale } = useI18n()

function itemHeading(item) {
  if (props.type === 'education') return locale.value === 'zh' ? item.school : (item.schoolEn || item.school)
  return locale.value === 'zh' ? item.company : (item.companyEn || item.company)
}

function itemSubheading(item) {
  if (props.type === 'education') return locale.value === 'zh' ? item.degree : (item.degreeEn || item.degree)
  return locale.value === 'zh' ? item.role : (item.roleEn || item.role)
}

function itemDescription(item) {
  return locale.value === 'zh' ? item.description : (item.descriptionEn || item.description)
}
</script>
```

- [ ] **Step 3: Overwrite src/views/Resume.vue**

```vue
<template>
  <div class="max-w-3xl mx-auto px-6 py-20">
    <ScrollReveal>
      <h1 class="text-4xl font-heading text-primary mb-12 text-center">{{ $t('resume.title') }}</h1>
    </ScrollReveal>

    <ScrollReveal>
      <section class="mb-14">
        <h2 class="text-2xl font-heading text-primary mb-6">{{ $t('resume.education') }}</h2>
        <Timeline :items="resumeData.education" type="education" />
      </section>
    </ScrollReveal>

    <ScrollReveal>
      <section class="mb-14">
        <h2 class="text-2xl font-heading text-primary mb-6">{{ $t('resume.experience') }}</h2>
        <Timeline :items="resumeData.experience" type="experience" />
      </section>
    </ScrollReveal>

    <ScrollReveal>
      <section>
        <h2 class="text-2xl font-heading text-primary mb-6">{{ $t('resume.skills') }}</h2>
        <div class="space-y-4">
          <div v-for="skill in resumeData.skills" :key="skill.name">
            <div class="flex justify-between text-sm text-secondary mb-1">
              <span>{{ skill.name }}</span>
              <span>{{ skill.level }}%</span>
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                class="h-full bg-accent rounded-full transition-all duration-1000"
                :style="{ width: skill.level + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  </div>
</template>

<script setup>
import ScrollReveal from '../components/ScrollReveal.vue'
import Timeline from '../components/Timeline.vue'
import resumeData from '../data/resume.json'
</script>
```

- [ ] **Step 4: Verify in browser**

Go to `http://localhost:5173/#/resume`. Expected: Education timeline, experience timeline, skill bars. Timelines have dots on the left. Skill bars animate.

- [ ] **Step 5: Commit**

```bash
git add src/data/resume.json src/components/Timeline.vue src/views/Resume.vue
git commit -m "feat: build Resume page with Timeline and skill bars"
```

---

### Task 12: Build Photography page

**Files:**
- Create: `src/components/Lightbox.vue`
- Modify: `src/views/Photography.vue`

- [ ] **Step 1: Create src/components/Lightbox.vue**

```vue
<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center cursor-pointer"
      @click="$emit('close')"
      @keydown.escape="$emit('close')"
    >
      <button
        class="absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
        @click="$emit('close')"
        aria-label="Close lightbox"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <button
        v-if="hasPrev"
        class="absolute left-4 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
        @click.stop="$emit('prev')"
        aria-label="Previous photo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>

      <button
        v-if="hasNext"
        class="absolute right-4 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
        @click.stop="$emit('next')"
        aria-label="Next photo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      <img
        :src="src"
        :alt="alt"
        class="max-h-[90vh] max-w-[90vw] object-contain"
        @click.stop
      />
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, required: true },
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  hasPrev: { type: Boolean, default: false },
  hasNext: { type: Boolean, default: false },
})

defineEmits(['close', 'prev', 'next'])
</script>
```

- [ ] **Step 2: Overwrite src/views/Photography.vue**

```vue
<template>
  <div class="max-w-6xl mx-auto px-6 py-20">
    <ScrollReveal>
      <h1 class="text-4xl font-heading text-primary mb-10 text-center">{{ $t('photography.title') }}</h1>
    </ScrollReveal>

    <!-- Category filter tabs -->
    <ScrollReveal>
      <div class="flex justify-center gap-3 mb-10 flex-wrap">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          :class="[
            'px-4 py-1.5 rounded-full text-sm transition-colors duration-200 cursor-pointer',
            activeCategory === cat
              ? 'bg-primary text-white'
              : 'bg-white border border-gray-200 text-secondary hover:border-accent hover:text-accent'
          ]"
        >
          {{ cat === 'all' ? $t('photography.all') : cat }}
        </button>
      </div>
    </ScrollReveal>

    <!-- Photo grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <ScrollReveal v-for="(photo, index) in filteredPhotos" :key="index">
        <div
          class="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group"
          @click="openLightbox(index)"
        >
          <img
            :src="photo.src"
            :alt="photo.alt"
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </ScrollReveal>
    </div>

    <div v-if="filteredPhotos.length === 0" class="text-center text-secondary py-20">
      <p>Add your photos to <code class="bg-gray-100 px-1 rounded">public/photos/</code> and list them in this component.</p>
    </div>

    <!-- Lightbox -->
    <Lightbox
      :visible="lightboxVisible"
      :src="currentPhoto?.src || ''"
      :alt="currentPhoto?.alt || ''"
      :hasPrev="lightboxIndex > 0"
      :hasNext="lightboxIndex < filteredPhotos.length - 1"
      @close="lightboxVisible = false"
      @prev="lightboxIndex--"
      @next="lightboxIndex++"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ScrollReveal from '../components/ScrollReveal.vue'
import Lightbox from '../components/Lightbox.vue'

const activeCategory = ref('all')
const lightboxVisible = ref(false)
const lightboxIndex = ref(0)

// Photos list — add your photos here or load from a JSON file
// Images should be placed in public/photos/ directory
const photos = ref([
  // Example:
  // { src: '/photos/photo1.jpg', alt: 'Description', category: '风景' },
  // { src: '/photos/photo2.jpg', alt: 'Description', category: '城市' },
  // { src: '/photos/photo3.jpg', alt: 'Description', category: '风景' },
])

const categories = computed(() => {
  const cats = new Set(photos.value.map(p => p.category))
  return ['all', ...Array.from(cats)]
})

const filteredPhotos = computed(() => {
  if (activeCategory.value === 'all') return photos.value
  return photos.value.filter(p => p.category === activeCategory.value)
})

const currentPhoto = computed(() => filteredPhotos.value[lightboxIndex] || null)

function openLightbox(index) {
  lightboxIndex.value = index
  lightboxVisible.value = true
}
</script>
```

- [ ] **Step 3: Verify in browser**

Go to `http://localhost:5173/#/photography`. Expected: Photo gallery page renders. Empty state message shown since no photos added yet. Add a test photo to `public/photos/` to verify grid and lightbox work.

- [ ] **Step 4: Commit**

```bash
git add src/components/Lightbox.vue src/views/Photography.vue
git commit -m "feat: build Photography page with gallery grid and lightbox"
```

---

### Task 13: Build Footer component

**Files:**
- Create: `src/components/Footer.vue`
- Modify: `src/App.vue`

- [ ] **Step 1: Create src/components/Footer.vue**

```vue
<template>
  <footer class="border-t border-gray-200 bg-white mt-20">
    <div class="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <!-- GitHub -->
        <a
          v-if="links.github"
          :href="links.github"
          target="_blank"
          rel="noopener noreferrer"
          class="text-secondary hover:text-primary transition-colors duration-200"
          aria-label="GitHub"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        </a>

        <!-- Email -->
        <a
          v-if="links.email"
          :href="'mailto:' + links.email"
          class="text-secondary hover:text-primary transition-colors duration-200"
          aria-label="Email"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>
      </div>

      <p class="text-xs text-gray-400">
        &copy; {{ year }} {{ name }}. {{ $t('footer.builtWith') }}.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const year = new Date().getFullYear()
const name = ref('Your Name')
const links = ref({
  github: 'https://github.com/your-username',
  email: 'your-email@example.com',
})
</script>
```

- [ ] **Step 2: Update src/App.vue to include Footer**

```vue
<template>
  <NavBar />
  <main class="min-h-screen">
    <router-view />
  </main>
  <Footer />
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
</script>
```

- [ ] **Step 3: Verify in browser**

Run `npm run dev`. Expected: Footer visible on all pages with social links and copyright.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.vue src/App.vue
git commit -m "feat: add Footer with social links and copyright"
```

---

### Task 14: GitHub Pages deploy configuration

**Files:**
- Modify: `vite.config.js`
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Update vite.config.js with base path**

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',
})
```

Note: `base: './'` is already set from Task 1. If the repo name is `my-site`, you could also use `base: '/my-site/'` for absolute paths. The `./` relative path works for both custom domains and `username.github.io/repo-name/`.

- [ ] **Step 2: Create .github/workflows/deploy.yml**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - run: npm ci
      - run: npm run build

      - uses: actions/configure-pages@v4

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Commit**

```bash
git add vite.config.js .github/workflows/deploy.yml
git commit -m "ci: add GitHub Pages deploy workflow"
```

---

### Task 15: Git init and build verification

- [ ] **Step 1: Initialize git repository**

```bash
git init
```

- [ ] **Step 2: Create .gitignore**

```bash
echo "node_modules/
dist/
.DS_Store
.superpowers/
.claude/" > .gitignore
```

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Expected: Build succeeds without errors. Output in `dist/` folder.

- [ ] **Step 4: Preview the production build**

```bash
npm run preview
```

Open the preview URL in browser. Navigate all pages, test language toggle, test mobile menu. Verify everything works in production mode. Stop with Ctrl+C.

- [ ] **Step 5: Stage all files and create initial commit**

```bash
git add -A
git commit -m "feat: complete personal website — Vue 3 + Tailwind CSS, bilingual (zh/en), 5 pages"
```

- [ ] **Step 6: Create GitHub repository and push**

1. Go to GitHub.com, create a new repository
2. Follow GitHub's instructions to add the remote and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

- [ ] **Step 7: Enable GitHub Pages**

Go to the repository on GitHub → Settings → Pages → Source: "GitHub Actions". The site will be deployed automatically on the next push.

---

## After Implementation

The user should:
1. Replace `"Your Name"`, avatar, and personal text in `src/views/Home.vue`
2. Replace social links in `src/components/Footer.vue`
3. Add real projects to `src/data/projects.json`
4. Add real articles to `src/data/articles.json`
5. Add real resume entries to `src/data/resume.json`
6. Add photos to `public/photos/` and list them in `src/views/Photography.vue`
