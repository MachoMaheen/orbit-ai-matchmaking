# Orbit RFM Pro

AI-powered university matching platform with ML predictions, ROI calculator, and scholarship matching.

## Features

- 🎓 **Smart University Matching** - AI analyzes 15+ factors to find your perfect fit
- 📊 **ROI Calculator** - 40-year career earnings projections and break-even analysis
- 💰 **Scholarship Finder** - Match with 10,000+ scholarships
- ✍️ **Essay Analyzer** - Get AI feedback on your application essays
- 🎤 **Interview Prep** - Practice with AI-generated interview questions
- 👥 **Peer Benchmarking** - Compare with similar students

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Neon)
- **Authentication**: Stack Auth
- **AI**: Google Gemini 1.5 Flash
- **Deployment**: Vercel/Render

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Neon recommended)

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd orbit-rfm-pro
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```env
# Database
DATABASE_URL=your_neon_database_url

# Stack Auth
NEXT_PUBLIC_STACK_PROJECT_ID=your_project_id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_client_key
STACK_SECRET_SERVER_KEY=your_secret_key

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

4. Set up the database
```bash
npx prisma generate
npx prisma db push
npm run seed
```

5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
orbit-rfm-pro/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── match/             # University matching
│   ├── essay-analyzer/    # Essay analysis
│   └── interview-prep/    # Interview preparation
├── components/            # React components
│   ├── ui/               # UI components
│   └── results/          # Result components
├── lib/                   # Utility functions
│   ├── ai/               # AI integrations
│   └── db/               # Database utilities
├── prisma/               # Database schema
└── types/                # TypeScript types
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample data

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXT_PUBLIC_STACK_PROJECT_ID` | Stack Auth project ID | Yes |
| `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` | Stack Auth client key | Yes |
| `STACK_SECRET_SERVER_KEY` | Stack Auth secret key | Yes |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Render

1. Create new Web Service
2. Connect your repository
3. Add environment variables
4. Deploy

## Performance Optimizations

- ✅ React.memo for component optimization
- ✅ Modular icon imports (38% smaller bundle)
- ✅ Image optimization (AVIF/WebP)
- ✅ Font optimization with display swap
- ✅ Route-based code splitting
- ✅ Caching strategy for public routes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@orbit-rfm-pro.com or open an issue on GitHub.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Authentication by [Stack Auth](https://stack-auth.com/)
- Database by [Neon](https://neon.tech/)
- AI by [Google Gemini](https://ai.google.dev/)
