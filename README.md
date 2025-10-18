# Kemono Web Application

A modern web application built with Next.js and TypeScript that provides a clean, user-friendly interface for interacting with the Kemono API.

## Features

- 🎨 Modern, responsive UI with Tailwind CSS
- 📱 Mobile-friendly design
- 🔍 Browse posts (popular and random)
- 👥 Discover creators
- ⭐ Favorites management
- 🔍 Search functionality
- 🌙 Dark mode support
- 📊 Real-time API integration

## Pages & Features

### Home Page
- Quick navigation to all sections
- Popular posts preview
- Clean, intuitive interface

### Posts
- Browse popular posts
- Get random post recommendations
- Filter and sort options
- Post details with thumbnails and metadata

### Creators
- Discover random creators
- View creator statistics and information
- Favorite creators
- Browse creator posts

### Favorites
- Manage favorite posts and creators
- Quick access to saved content

### Search
- Search for specific content
- File hash lookup
- Advanced filtering options

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **UI Components**: Headless UI

## API Integration

The application integrates with the Kemono API and supports:

- Posts API (popular, random, comments)
- Creators API (discovery, posts, links)
- Favorites API (add/remove posts and creators)
- Discord API (channel posts, lookup)
- File Search API (hash lookup)
- Authentication API
- Account management

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd kemono-web-app
   ```

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

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Setup

The application uses the Kemono API at `https://kemono.cr/api`. No additional environment variables are required for basic functionality.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   ├── posts/          # Posts section
│   ├── creators/       # Creators section
│   ├── favorites/      # Favorites section
│   └── search/         # Search section
├── components/         # Reusable React components
│   └── Navbar.tsx     # Navigation component
└── services/          # API service layer
    └── api.ts         # API client and endpoints
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- Functional components with hooks
- Tailwind CSS for styling
- Consistent error handling
- Responsive design patterns

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## API Documentation

For detailed API documentation, visit: https://kemono.cr/documentation/api

## License

This project is licensed under the MIT License.

## Disclaimer

This application is a third-party client for the Kemono API and is not officially affiliated with the Kemono project.
