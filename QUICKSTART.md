# 🚀 Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- npm or yarn package manager

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd orbit-rfm-pro
npm install
```

### 2. Setup Database

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL if not already installed
# Create a database
createdb orbit_rfm
```

**Option B: Cloud Database (Recommended)**
- [Neon](https://neon.tech) - Free PostgreSQL
- [Supabase](https://supabase.com) - Free PostgreSQL
- [Railway](https://railway.app) - Free PostgreSQL

### 3. Configure Environment

```bash
# Copy example env file
cp .env.example .env

# Edit .env and update DATABASE_URL
# Example for local:
DATABASE_URL="postgresql://postgres:password@localhost:5432/orbit_rfm"

# Example for Neon:
DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/orbit_rfm"
```

### 4. Setup Database Schema

```bash
# Push schema to database
npm run db:push

# Seed with sample universities
npm run db:seed
```

You should see:
```
✅ Created Harvard Business School
✅ Created Stanford Graduate School of Business
✅ Created Wharton School - University of Pennsylvania
✅ Created MIT Sloan School of Management
✅ Created Columbia Business School
🎉 Seeding completed!
```

### 5. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## 🎯 Test the Application

### 1. Home Page
- Visit http://localhost:3000
- You should see the landing page with features

### 2. Start Matching
- Click "Start Matching"
- Fill in the form:
  - **GPA**: 3.5
  - **GMAT**: 700 (or GRE scores)
  - **Work Experience**: 48 months (4 years)
  - **Target Program**: MBA
  - **Budget**: $150,000
  - **Preferred Locations**: California, Massachusetts

### 3. View Results
- Submit the form
- See matched universities with:
  - Fit scores (Academic, Financial, Career, Cultural)
  - Admission probability
  - ROI calculations
  - Scholarship matches
  - Gap analysis

## 📊 Sample Test Data

### Profile 1: Strong Candidate
```json
{
  "gpa": 3.8,
  "gmatScore": 740,
  "workExperienceMonths": 60,
  "targetProgram": "MBA",
  "industry": "Technology",
  "budgetMax": 200000,
  "preferredLocations": ["California", "Massachusetts"]
}
```

### Profile 2: Average Candidate
```json
{
  "gpa": 3.4,
  "gmatScore": 680,
  "workExperienceMonths": 36,
  "targetProgram": "MBA",
  "industry": "Finance",
  "budgetMax": 120000,
  "preferredLocations": ["New York"]
}
```

### Profile 3: Reach Candidate
```json
{
  "gpa": 3.2,
  "greVerbal": 160,
  "greQuant": 165,
  "workExperienceMonths": 24,
  "targetProgram": "MBA",
  "industry": "Healthcare",
  "budgetMax": 100000
}
```

## 🔧 Troubleshooting

### Database Connection Error
```bash
# Check if PostgreSQL is running
pg_isready

# Test connection
psql -d orbit_rfm
```

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Prisma Client Error
```bash
# Regenerate Prisma client
npx prisma generate

# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset
npm run db:seed
```

## 📦 Production Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables in Vercel dashboard
# - DATABASE_URL
# - NEXTAUTH_SECRET
# - NEXTAUTH_URL
```

### Deploy to Railway

1. Push code to GitHub
2. Visit [railway.app](https://railway.app)
3. Create new project from GitHub repo
4. Add PostgreSQL database
5. Set environment variables
6. Deploy!

## 🎨 Next Steps

1. **Add More Universities**: Edit `prisma/seed.ts`
2. **Customize Algorithms**: Modify files in `lib/algorithms/`
3. **Add Authentication**: Implement NextAuth.js
4. **Add More Features**: 
   - Essay analyzer
   - Interview practice
   - Family collaboration
   - Peer benchmarking

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

## 🆘 Need Help?

- Check the main README.md
- Open an issue on GitHub
- Review the code comments

---

Happy coding! 🚀
