# Harmony Records - Artist Portal

A modern record label website with artist login and royalty tracking functionality. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Landing Page**: Professional record label website with modern design
- **Artist Authentication**: Secure login system for artists
- **Dashboard**: Overview of artist statistics and recent activity
- **Royalty Tracking**: Detailed royalty reports and payment history
- **Profile Management**: Artist profile editing and management
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Demo Credentials

You can use these demo accounts to test the application:

### Account 1

- **Email**: alex@example.com
- **Password**: password123
- **Username**: alexj

### Account 2

- **Email**: sarah@example.com
- **Password**: password123
- **Username**: sarahc

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Backend**: Express.js with SQLite database
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **State Management**: React Context API
- **Authentication**: bcryptjs for password hashing

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd record-label-website
```

2. Install dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
npm run server
```

4. In a new terminal, start the frontend development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server
- `npm run start` - Build and start production server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navbar.tsx      # Navigation component
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── pages/              # Page components
│   ├── LandingPage.tsx # Homepage
│   ├── LoginPage.tsx   # Login page
│   ├── Dashboard.tsx   # Artist dashboard
│   ├── RoyaltiesPage.tsx # Royalty tracking
│   └── ProfilePage.tsx # Profile management
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## Features Overview

### Landing Page

- Professional record label branding
- Feature highlights and benefits
- Call-to-action for artist login
- Responsive design with modern UI

### Authentication

- Secure login system with SQLite database
- Password hashing with bcryptjs
- Password change functionality
- Persistent login state
- Protected routes

### Dashboard

- Key performance metrics
- Recent activity feed
- Quick action buttons
- Upcoming events calendar

### Royalty Tracking

- Detailed royalty breakdown by platform
- Payment history
- Filtering and sorting options
- Export functionality
- Revenue analytics

### Profile Management

- Artist profile editing
- Password change functionality
- Social media links
- Bio and personal information
- Avatar upload (UI only)

## Customization

### Styling

The application uses Tailwind CSS for styling. You can customize the design by modifying:

- `tailwind.config.js` - Theme configuration
- `src/index.css` - Global styles and custom components

### Data

The application now uses a SQLite database with Express.js backend:

1. User data is stored securely in SQLite database
2. Passwords are hashed using bcryptjs
3. API endpoints for authentication and profile management
4. Real-time data persistence

### Authentication

The application now includes server-side authentication:

1. SQLite database for user storage
2. Password hashing with bcryptjs
3. Secure API endpoints
4. Password change functionality
5. Session management with localStorage

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure build settings if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.

---

Built with ❤️ for the music industry
# Recordlabelwebsite
