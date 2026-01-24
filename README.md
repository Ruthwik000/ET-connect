# ET Connect

A mobile-first web application that helps Indian users understand how news affects them personally through AI-powered impact analysis.

## Features

- **Home Tab**: Personalized news feed with impact scores and summaries
- **Explore Tab**: Full-screen flip-style news browsing with detailed impact analysis
- **Ask AI Tab**: Contextual chatbot for personalized news insights
- **Profile Tab**: User personalization and privacy controls
- **Saved News**: Bookmark and access your saved articles
- **Notifications**: Stay updated with high-impact news alerts
- **Personal Impact Reports**: Detailed financial impact analysis
- **Future Scenarios**: AI-powered wealth projection strategies

## Tech Stack

- React 18 + JavaScript
- React Router for navigation
- Tailwind CSS for styling
- Vite for build tooling
- Lucide React for icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Vite and deploy

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

The `vercel.json` configuration is already set up for optimal deployment.

## Design Principles

- Mobile-first responsive design
- Clean, professional UI with minimal animations
- Trust-focused with clear data presentation
- Number-driven impact scores (0-10 scale)
- Calm, informational tone (not alarming)

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── BottomNav.jsx
│   ├── TopNav.jsx
│   ├── Layout.jsx
│   ├── NewsCard.jsx
│   └── ImpactScore.jsx
├── pages/          # Main app screens
│   ├── Home.jsx
│   ├── Explore.jsx
│   ├── AskAI.jsx
│   ├── Profile.jsx
│   ├── Notifications.jsx
│   ├── SavedNews.jsx
│   ├── ForYou.jsx
│   ├── PersonalImpact.jsx
│   └── FutureScenarios.jsx
├── utils/          # Helper functions
│   └── helpers.js
└── App.jsx         # Main app component
```

## Key Features

### Home Page
- Auto-sliding carousel of high-impact news
- Quick impact summary cards
- Recommended news section with personalized content

### Explore Page
- Full-screen news cards with images
- Page-flip animation for smooth navigation
- Impact scores and personal/future impact buttons
- Save/bookmark functionality

### Ask AI
- Context-aware chatbot
- Suggested questions
- Collapsible context cards
- Professional chat interface

### Profile
- Quick access to saved news and notifications
- Personalization settings (age, profession, income, goals)
- Privacy-focused design

## License

Private - All rights reserved
