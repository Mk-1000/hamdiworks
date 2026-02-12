# Hamdi Mokni - Full-Stack .NET Engineer Portfolio

A modern, creative, and responsive portfolio website built with React, Tailwind CSS, and Motion (Framer Motion).

## 🌟 Features

- **Modern Design**: Clean, minimalist design with smooth animations and transitions
- **Dark/Light Mode**: Toggle between dark and light themes with smooth transitions
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Interactive Animations**: Smooth scroll animations, parallax effects, and micro-interactions
- **Performance Optimized**: Fast loading times and efficient rendering
- **SEO Ready**: Semantic HTML structure for better search engine visibility

## 📋 Sections

1. **Hero Section**: Animated greeting with particle background and floating tech stack icons
2. **About Me**: Professional summary with highlighted achievements and statistics
3. **Skills**: Interactive skill cards with proficiency indicators organized by category
4. **Projects**: Featured projects with hover effects and detailed information
5. **Experience**: Interactive timeline showcasing professional journey
6. **Certifications**: Professional certificates and notable achievements
7. **Contact**: Contact form with validation and social media links

## 🛠️ Technologies Used

- **React 18.3.1**: Modern React with hooks
- **Tailwind CSS 4**: Utility-first CSS framework
- **Motion (Framer Motion)**: Smooth animations and transitions
- **Lucide React**: Beautiful icon library
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or download the files
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and visit `http://localhost:5173`

## 📝 Customization Guide

### Adding More Projects

To add more projects, edit `/src/app/components/Projects.tsx`:

```typescript
const projects = [
  // Add your project here
  {
    title: 'Your Project Name',
    description: 'Detailed description of your project...',
    image: 'https://your-image-url.com/image.jpg',
    tech: ['Technology 1', 'Technology 2', 'Technology 3'],
    impact: 'Impact description',
    github: 'https://github.com/your-repo',
    demo: 'https://your-demo-url.com',
  },
  // ... existing projects
];
```

### Updating Personal Information

Edit the following files to update your personal information:

- **Hero Section**: `/src/app/components/Hero.tsx`
  - Name, title, tagline, location, email, phone
  - Social media links (GitHub, LinkedIn)

- **About Section**: `/src/app/components/About.tsx`
  - Professional summary
  - Years of experience
  - Statistics

- **Skills Section**: `/src/app/components/Skills.tsx`
  - Add/remove skill categories
  - Update skill levels and years of experience

- **Experience Section**: `/src/app/components/Experience.tsx`
  - Add/edit work experience entries
  - Update achievements and technologies

- **Certifications Section**: `/src/app/components/Certifications.tsx`
  - Add/remove certifications
  - Update achievements list

### Changing Colors

The portfolio uses a gradient color scheme (blue to purple). To change the colors:

1. Update gradient classes in components from `from-blue-600 to-purple-600` to your preferred colors
2. Update Tailwind color classes throughout the components

### Customizing Animations

Animation settings can be adjusted in each component:

- **Duration**: Change `duration: 0.5` values
- **Delay**: Adjust `delay: 0.1` values
- **Transitions**: Modify `transition` properties in motion components

## 📦 Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The optimized files will be generated in the `dist` folder.

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect the configuration
5. Deploy!

### Option 2: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Deploy!

### Option 3: GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/your-repo-name",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Option 4: Custom Server

1. Build the project: `npm run build`
2. Upload the contents of the `dist` folder to your server
3. Configure your web server (Nginx, Apache, etc.) to serve the static files

## 🔧 Advanced Customization

### Adding a Blog Section

Create a new component `/src/app/components/Blog.tsx` and add it to the main App.tsx:

```typescript
import { Blog } from './components/Blog';

// Add to App component
<Blog />
```

### Adding Google Analytics

Add your Google Analytics tracking code to `/index.html` in the `<head>` section:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Form Submission Backend

The contact form currently shows a success message without actually sending emails. To connect it to a backend:

1. **Option A - Email Service (EmailJS)**:
   ```bash
   npm install @emailjs/browser
   ```

2. **Option B - Backend API**:
   Update the `handleSubmit` function in `/src/app/components/Contact.tsx` to send data to your API endpoint.

3. **Option C - Serverless Function**:
   Use Vercel Functions or Netlify Functions to handle form submissions.

## 📱 Progressive Web App (PWA)

To convert this into a PWA:

1. Install Vite PWA plugin:
   ```bash
   npm install vite-plugin-pwa -D
   ```

2. Configure in `vite.config.ts`
3. Add manifest.json and service worker

## 🐛 Troubleshooting

### Dark mode not working
- Check if `localStorage` is available
- Verify that the theme classes are applied to the root element

### Animations not smooth
- Reduce the number of particles in the Hero section
- Disable animations on lower-end devices using `prefers-reduced-motion`

### Images not loading
- Ensure image URLs are accessible
- Check CORS settings if loading from external domains
- Use the ImageWithFallback component for better error handling

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For questions or issues:
- Email: hamdimokni712@gmail.com
- GitHub: [@Mk-1000](https://github.com/Mk-1000)
- LinkedIn: [mokni-hamdi712](https://linkedin.com/in/mokni-hamdi712)

## 🎨 Credits

- Icons: [Lucide Icons](https://lucide.dev)
- Images: [Unsplash](https://unsplash.com)
- Animations: [Motion](https://motion.dev)
- Framework: [React](https://react.dev)
- Styling: [Tailwind CSS](https://tailwindcss.com)

---

Made with ❤️ by Hamdi Mokni
