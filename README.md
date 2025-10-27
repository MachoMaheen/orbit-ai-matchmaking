# 🚀 Orbit RFM Pro - Revolutionary University Matching Platform

## Revolutionary Features (Not in Orbit AI)

### 1. **Predictive Success Probability (ML-Powered)**
- Graduation likelihood prediction
- Employment within 6 months probability
- Salary range prediction
- Student satisfaction score
- Career trajectory prediction

### 2. **Real-Time Peer Benchmarking Dashboard**
- Live "Students Like You" analytics
- Real success stories from admitted students
- Anonymized comparison with peers
- Success rate by demographics
- Interactive peer network

### 3. **Intelligent Gap Analysis with Action Plans**
- Personalized improvement roadmap
- Test retake ROI calculator
- Timeline to bridge gaps
- Alternative university pathways
- Resource recommendations

### 4. **40-Year Career ROI Simulator**
- Interactive career earnings projections
- "What-if" salary scenarios
- Loan repayment calculator
- Break-even analysis
- NPV calculations
- Lifetime ROI comparison

### 5. **Scholarship Maximizer Engine**
- AI matching across 10,000+ scholarships
- Probability scoring for each scholarship
- Total funding potential calculator
- Application difficulty rating
- Deadline priority system

### 6. **Holistic Admissions Simulator**
- Essays strength analysis
- Extracurricular impact scoring
- Work experience weighted calculation
- Diversity factor evaluation
- Admissions committee perspective simulation

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **State Management**: TanStack Query

## 📦 Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL

# Push database schema
npm run db:push

# Seed database with sample universities
npm run db:seed

# Start development server
npm run dev
```

Visit http://localhost:3000

## 🗄️ Database Setup

1. Create a PostgreSQL database
2. Update `DATABASE_URL` in `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/orbit_rfm"
```

3. Run migrations:
```bash
npm run db:push
npm run db:seed
```

## 🎯 Key Features

### 5D Matching Algorithm
- **Academic Fit**: Test scores, GPA, work experience
- **Financial Fit**: Budget alignment, scholarships, ROI
- **Career Fit**: Employment rates, salary potential
- **Cultural Fit**: Location, campus culture, diversity
- **Success Probability**: ML-powered predictions

### Advanced Analytics
- Admission probability calculation
- Success prediction models
- 40-year ROI projections
- Scholarship matching engine
- Gap analysis with recommendations

## 📁 Project Structure

```
orbit-rfm-pro/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── match/             # Matching form
│   ├── results/           # Results dashboard
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── match/            # Matching form components
│   └── results/          # Results components
├── lib/                   # Core logic
│   ├── algorithms/       # Matching algorithms
│   ├── db/               # Database client
│   └── utils/            # Utilities
├── prisma/               # Database schema
└── types/                # TypeScript types
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables
Set these in your deployment platform:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Random secret for NextAuth
- `NEXTAUTH_URL`: Your deployment URL

## 📊 API Endpoints

- `POST /api/match` - Generate university matches
- `GET /api/universities` - List all universities
- `POST /api/success-prediction` - Predict success metrics
- `POST /api/scholarships` - Match scholarships
- `POST /api/gap-analysis` - Analyze application gaps

## 🎨 Customization

### Adding Universities
Edit `prisma/seed.ts` and run:
```bash
npm run db:seed
```

### Modifying Algorithms
Core algorithms are in `lib/algorithms/`:
- `matching-algorithm.ts` - 5D matching logic
- `roi-calculator.ts` - ROI calculations
- `success-predictor.ts` - ML predictions
- `scholarship-matcher.ts` - Scholarship matching
- `gap-analyzer.ts` - Gap analysis

## 📝 License

MIT License - feel free to use for your projects!

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 📧 Support

For questions or issues, please open a GitHub issue.

---

Built with ❤️ using Next.js, TypeScript, and Prisma
