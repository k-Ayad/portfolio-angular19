# 📁 Portfolio Project Structure Guide

## Overview
This document explains the complete folder structure and purpose of each file in the Angular 19 portfolio project.

---

## 📂 Root Level Files

### `angular.json`
- Angular CLI configuration
- Defines build, serve, and test configurations
- Specifies SCSS as the default style preprocessor
- Configures standalone components as default

### `package.json`
- Project dependencies and metadata
- npm scripts for development
- Angular 19 dependencies

### `tsconfig.json`
- TypeScript compiler configuration
- Path aliases (@core, @shared, @features, @layout)
- Strict mode enabled for type safety

### `README.md`
- Project documentation
- Setup instructions
- Feature overview

---

## 📂 src/ Directory

### `main.ts`
- Application bootstrap file
- Initializes Angular application
- Applies app configuration

### `index.html`
- Main HTML file
- SEO meta tags
- Google Fonts integration
- favicon reference

### `styles/`
Global styling architecture:

#### `abstracts/`
- `_variables.scss` - All CSS variables (colors, spacing, typography)
- `_mixins.scss` - Reusable SCSS mixins (media queries, animations, flex utilities)

#### `base/`
- `_reset.scss` - CSS reset/normalize
- `_typography.scss` - Typography styles (headings, paragraphs, links)

#### `components/`
- `_animations.scss` - Animation utilities and keyframes

#### `styles.scss`
- Main stylesheet that imports all partials
- Global utility classes
- Container and section styles

---

## 📂 app/ Directory Structure

### **Core Module** (`core/`)
Singleton services used throughout the app:

#### `services/`
- `projects.service.ts` - Manages project data and API calls
- `seo.service.ts` - Handles meta tags and SEO optimization
- `animation.service.ts` - Scroll animations and transitions

#### `guards/`
- Route guards (to be added)

#### `interceptors/`
- HTTP interceptors (to be added)

---

### **Shared Module** (`shared/`)
Reusable components across the application:

#### `components/`
- `loading-spinner/` - Loading indicator component
- `button/` - Reusable button component with variants

#### `directives/`
- Custom directives (to be added)

#### `pipes/`
- Custom pipes (to be added)

---

### **Features Module** (`features/`)
Page-level components:

#### `home/`
Main landing page with sections:
- `home.component.ts` - Main home page container
- `home.component.html` - Template with all sections
- `home.component.scss` - Page-level styles

**Home Sections** (`components/`):

1. **hero/**
   - Hero section with welcome message
   - CTA buttons
   - Background effects

2. **about/**
   - Professional background
   - Skills showcase
   - Education/experience timeline

3. **projects-carousel/**
   - Featured projects carousel
   - Project filtering
   - Navigation controls

4. **contact/**
   - Contact form with validation
   - Email integration ready
   - Form error handling

5. **clients-feedback/**
   - Client testimonials
   - Rating system
   - Testimonial carousel

#### `portfolio/`
- `portfolio.component.ts` - All projects page
- `portfolio.component.html` - Projects grid/list
- `portfolio.component.scss` - Portfolio page styles

#### `project-details/`
- `project-details.component.ts` - Individual project showcase
- `project-details.component.html` - Project details template
- `project-details.component.scss` - Project details styles

---

### **Layout Module** (`layout/`)
Application-wide layout components:

#### `header/`
- Navigation bar
- Logo and menu
- Mobile responsive

#### `footer/`
- Footer content
- Social links
- Copyright

#### `main-layout/`
- Overall page structure
- Header + Content + Footer wrapper

---

### **App Root Files**

#### `app.component.ts`
- Root component
- Router outlet

#### `app.routes.ts`
- Application routing configuration
- Lazy loading setup
- Route titles

#### `app.config.ts`
- Application-wide configuration
- Provider setup
- HTTP client configuration
- Animations provider

---

## 📂 assets/ Directory

### `images/`
- Project screenshots
- Profile photos
- Background images
- Icons and logos

### `icons/`
- SVG icons
- Favicon files

### `data/`
- JSON data files
- Mock data for development

---

## 🎯 Component Architecture

### Standalone Components
All components use Angular 19 standalone architecture:

```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
```

### Benefits:
- ✅ No NgModule required
- ✅ Explicit imports
- ✅ Better tree-shaking
- ✅ Improved performance
- ✅ Easier testing

---

## 🎨 SCSS Architecture

### Naming Convention
- BEM methodology for CSS classes
- Descriptive, semantic names
- Component-scoped styles

### File Organization
```scss
// Component SCSS structure
.component-name {
  // Main styles
  
  .component-name__element {
    // Element styles
  }
  
  .component-name--modifier {
    // Modifier styles
  }
}
```

---

## 🚀 Routing Strategy

### Lazy Loading
All feature routes are lazy loaded:

```typescript
{
  path: 'portfolio',
  loadComponent: () => import('./features/portfolio/portfolio.component')
    .then(m => m.PortfolioComponent)
}
```

### Benefits:
- Faster initial load
- Better performance
- Code splitting
- On-demand loading

---

## 📊 Data Flow

```
Service (projects.service.ts)
    ↓
Component (portfolio.component.ts)
    ↓
Template (portfolio.component.html)
    ↓
User Interface
```

---

## 🔧 Path Aliases

Configured in `tsconfig.json`:

```typescript
"paths": {
  "@core/*": ["src/app/core/*"],
  "@shared/*": ["src/app/shared/*"],
  "@features/*": ["src/app/features/*"],
  "@layout/*": ["src/app/layout/*"],
  "@assets/*": ["src/assets/*"]
}
```

### Usage:
```typescript
import { ProjectsService } from '@core/services/projects.service';
import { ButtonComponent } from '@shared/components/button/button.component';
```

---

## 📝 Next Steps

1. **Phase 1**: Design Implementation
   - Upload section screenshots
   - Implement UI for each section
   - Add animations

2. **Phase 2**: Functionality
   - Connect services
   - Add form handling
   - Implement data fetching

3. **Phase 3**: Optimization
   - Performance testing
   - SEO optimization
   - Accessibility improvements

4. **Phase 4**: Deployment
   - Build production
   - Deploy to hosting
   - Configure domain

---

**Status**: ✅ Structure Complete - Ready for Design Implementation
