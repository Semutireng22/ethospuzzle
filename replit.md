# Overview

This is a full-stack web application featuring a retro-styled cryptocurrency memory matching game called "ETHEREUM OS CRYPTO MATCHER". The game combines classic Windows 95/98 aesthetics with modern web technologies, allowing players to match cryptocurrency symbols across multiple difficulty levels.

The application follows a monorepo structure with a React frontend, Express backend, and PostgreSQL database integration. It includes features like scoring, hints, multiple levels, and audio feedback, all wrapped in a nostalgic retro interface.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Styling**: TailwindCSS for utility-first styling with custom retro CSS for Windows 95/98 aesthetics
- **UI Components**: Comprehensive component library using Radix UI primitives for accessibility
- **State Management**: Zustand for lightweight, flexible state management across game logic and audio systems
- **3D Graphics**: React Three Fiber ecosystem (@react-three/fiber, @react-three/drei, @react-three/postprocessing) for potential 3D enhancements
- **Data Fetching**: TanStack Query for server state management and caching

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Build Process**: esbuild for fast production bundling
- **Middleware**: Request logging, JSON parsing, and error handling

## Data Layer
- **Database**: PostgreSQL with Neon Database serverless integration
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Session Storage**: connect-pg-simple for PostgreSQL-backed session storage
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

## Game Logic
- **Game State**: Multi-phase game system (ready, playing, ended) with level progression
- **Audio System**: HTML5 Audio with mute/unmute functionality and sound effect management
- **Game Mechanics**: Memory matching with cryptocurrency symbols, scoring system, hint system, and multiple difficulty levels
- **Visual Design**: Retro Windows 95/98 interface with CSS animations and custom styling

## Development Tools
- **Build System**: Vite with React plugin and runtime error overlay for Replit
- **Type Safety**: Comprehensive TypeScript configuration with path aliases
- **Styling**: PostCSS with TailwindCSS and custom retro stylesheets
- **Asset Handling**: Support for 3D models (GLTF/GLB) and audio files (MP3/OGG/WAV)
- **GLSL Support**: Shader support for potential visual effects

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe ORM with PostgreSQL dialect support

## UI and Styling
- **Radix UI**: Comprehensive accessible component primitives for dialogs, menus, forms, and navigation
- **TailwindCSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Inter font family via Fontsource

## Development and Build Tools
- **Vite**: Fast build tool with React plugin support
- **esbuild**: Fast JavaScript bundler for production builds
- **TypeScript**: Static type checking and compilation
- **Replit Integration**: Runtime error modal plugin for development

## Game Enhancement Libraries
- **React Three Fiber**: 3D graphics rendering capabilities
- **Zustand**: Lightweight state management
- **TanStack Query**: Server state management and caching
- **Date-fns**: Date manipulation utilities
- **clsx/cva**: Conditional CSS class management

## Audio and Media
- **HTML5 Audio API**: For sound effects and background music
- **GLSL Shader Support**: For potential visual effects and animations

The architecture prioritizes type safety, developer experience, and performance while maintaining a clean separation between frontend game logic, backend API services, and data persistence layers.