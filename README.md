<div align="center">
  <img src="./public/images/logo.png" alt="Logo" width="80" height="80" />
  
  # Tawchiful Islam — Portfolio
  
  **A premium, high-performance portfolio crafted with Next.js 15 and Framer Motion.**

[![Live Demo](https://shields.io)](https://tawchif.vercel.app)
[![Vercel](https://shields.io)](https://vercel.com)
[![License](https://shields.io)](LICENSE)

</div>

---

## 📖 Overview

This repository contains the source code for my professional portfolio website.
The goal was to build a highly interactive, minimalist, and recruiter-friendly
experience that reflects my skills as a Frontend Developer.

### 🌟 Key Features

- **Next.js 15 Power:** Utilizing the latest App Router and Server Components
  for optimal performance.
- **Glassmorphism UI:** A sleek, modern dark-themed aesthetic with subtle glow
  effects and backdrop blurs.
- **Motion Orchestration:** Complex scroll-triggered animations and page
  transitions using Framer Motion.
- **Dynamic Active Section:** Real-time navigation highlighting based on user
  scroll position.
- **Clean Architecture:** Modular, reusable component structure for easy
  scalability.
- **Accessibility:** Semantic HTML and optimized for SEO and screen readers.

---

## 🛠️ Tech Stack

| Category       | Technologies                         |
| -------------- | ------------------------------------ |
| **Framework**  | Next.js 15 (App Router), React 19    |
| **Styling**    | Tailwind CSS v4, Glassmorphism UI    |
| **Animations** | Framer Motion                        |
| **Icons**      | Lucide React, React Icons            |
| **Forms**      | EmailJS (Direct Client-Side Mailing) |
| **Deployment** | Vercel (CI/CD Pipeline)              |

---

## 📁 Architecture

```bash
src/
├── app/               # Next.js App Router (Layouts, Pages, Globals)
├── components/
│   ├── layout/        # Shared components (Navbar, Footer)
│   ├── sections/      # Home page sections (Hero, About, Projects, etc.)
│   └── ui/            # Reusable UI primitives (Cards, Badges, Buttons)
├── hooks/             # Custom React hooks (useScroll, useActiveSection)
├── lib/               # Business logic (Constants, Content Data, Utils)
└── public/            # Static assets (Images, Resume)
```

---

## 🚀 Installation & Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/tawchifulislam/portfolio.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Environment Variables:** Create a `.env.local` file and add your EmailJS
   keys:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
   ```
4. **Run the dev server:**
   ```bash
   npm run dev
   ```

---

## 🤝 Contributing

Contributions are always welcome! If you have any ideas to improve the design or
code, feel free to fork the repository and create a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🔗 Connect With Me

<div align="left">
  <a href="https://github.com/tawchifulislam" target="_blank">
    <img src="https://shields.io" alt="GitHub" />
  </a>
  <a href="https://linkedin.com/in/tawchiful-islam" target="_blank">
    <img src="https://shields.io" alt="LinkedIn" />
  </a>
  <a href="https://x.com/tawchifulislam" target="_blank">
    <img src="https://shields.io" alt="Twitter" />
  </a>
</div>

<p align="center" style="margin-top: 40px;">
  Developed with 💜 by <strong>Tawchiful Islam</strong>
</p>
