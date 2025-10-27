# 🚀 Deployment Guide - Orbit RFM Pro

## Quick Deploy to Vercel (5 Minutes)

### Prerequisites
- GitHub account
- Vercel account (free)
- PostgreSQL database (Neon.tech recommended - free)

### Step 1: Setup Database

1. Go to [Neon.tech](https://neon.tech)
2. Sign up for free account
3. Create new project
4. Copy the connection string (looks like: `postgresql://user:pass@host/db`)

### Step 2: Push to GitHub

```bash
cd orbit-rfm-pro

# Initialize git if not already done
git init
git add .
git commit -m "feat: Orbit RFM Pro - Complete Implementation"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/orbit-rfm-pro.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. Add Environment Variables:
   ```
   DATABASE_URL=your_neon_connection_string
   NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
   NEXTAUTH_URL=https://your-app.vercel.app
   ```

6. Click "Deploy"

### Step 4: Setup Database Schema

After deployment, run these commands locally:

```bash
# Set your production DATABASE_URL
export DATABASE_URL="your_neon_connection_string"

# Push schema
npx prisma db push

# Seed data
npx prisma db seed
```

### Step 5: Test Your Deployment

Visit: `https://your-app.vercel.app`

Test the flow:
1. Click "Start Matching"
2. Fill in the form
3. Submit and view results

---

## Alternative: Deploy to Railway

### Step 1: Setup Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"

### Step 2: Add PostgreSQL

1. Click "New" → "Database" → "PostgreSQL"
2. Railway will automatically create and connect the database
3. Copy the `DATABASE_URL` from the database settings

### Step 3: Configure Environment

Add these variables in Railway:
```
DATABASE_URL=${{Postgres.DATABASE_URL}}
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=${{RAILWAY_PUBLIC_DOMAIN}}
```

### Step 4: Deploy

Railway will automatically:
- Install dependencies
- Build the project
- Deploy to production

---

## Environment Variables Explained

### Required

**DATABASE_URL**
```
postgresql://user:password@host:5432/database
```
Your PostgreSQL connection string from Neon, Railway, or other provider.

**NEXTAUTH_SECRET**
```bash
# Generate with:
openssl rand -base64 32
```
Secret key for NextAuth.js session encryption.

**NEXTAUTH_URL**
```
https://your-app.vercel.app
```
Your production URL.

### Optional

**REDIS_URL** (for caching)
```
redis://default:password@host:6379
```

**SMTP_*** (for email notifications)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

---

## Post-Deployment Checklist

- [ ] Database schema pushed
- [ ] Sample data seeded
- [ ] Home page loads
- [ ] Match form works
- [ ] Results page displays
- [ ] API endpoints respond
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Dark mode works

---

## Troubleshooting

### Build Fails

**Error: Cannot find module '@prisma/client'**
```bash
# Solution: Generate Prisma client
npx prisma generate
```

**Error: Database connection failed**
```bash
# Solution: Check DATABASE_URL format
# Must be: postgresql://user:pass@host:5432/db
```

### Runtime Errors

**Error: No universities found**
```bash
# Solution: Seed the database
npx prisma db seed
```

**Error: Session error**
```bash
# Solution: Set NEXTAUTH_SECRET
openssl rand -base64 32
```

---

## Performance Optimization

### Enable Caching

Add Redis for caching:
```typescript
// lib/db/cache.ts
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 3600
): Promise<T> {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  
  const data = await fetcher();
  await redis.setex(key, ttl, JSON.stringify(data));
  return data;
}
```

### Database Optimization

Add indexes:
```prisma
@@index([programType, acceptanceRate])
@@index([avgGmat, avgGpa])
```

### CDN for Static Assets

Vercel automatically handles this!

---

## Monitoring

### Vercel Analytics

Enable in Vercel dashboard:
- Web Analytics
- Speed Insights
- Error tracking

### Database Monitoring

Neon provides:
- Query performance
- Connection pooling
- Automatic backups

---

## Scaling

### Horizontal Scaling

Vercel automatically scales based on traffic.

### Database Scaling

Neon offers:
- **Free**: 0.5 GB storage, 1 compute unit
- **Pro**: 10 GB storage, autoscaling
- **Enterprise**: Unlimited

### Caching Strategy

1. Cache university data (rarely changes)
2. Cache match results (user-specific, 1 hour)
3. Cache peer data (daily updates)

---

## Security

### Environment Variables

Never commit:
- `.env` files
- Database credentials
- API keys

### Rate Limiting

Add to API routes:
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

### Input Validation

Already implemented with Zod schemas!

---

## Backup Strategy

### Database Backups

Neon provides:
- Automatic daily backups
- Point-in-time recovery
- Manual snapshots

### Code Backups

GitHub provides:
- Version control
- Branch protection
- Automated backups

---

## Custom Domain

### Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records
4. SSL automatically configured

### Railway

1. Go to Settings → Domains
2. Add custom domain
3. Update DNS CNAME
4. SSL automatically configured

---

## Cost Estimation

### Free Tier (Perfect for MVP)

- **Vercel**: Free (100GB bandwidth, unlimited requests)
- **Neon**: Free (0.5GB storage, 1 compute unit)
- **Total**: $0/month

### Production (1000 users/month)

- **Vercel Pro**: $20/month
- **Neon Pro**: $19/month
- **Total**: $39/month

### Scale (10,000 users/month)

- **Vercel Pro**: $20/month
- **Neon Scale**: $69/month
- **Redis**: $10/month
- **Total**: $99/month

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Neon Docs**: https://neon.tech/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://prisma.io/docs

---

**You're ready to deploy! 🚀**

Any issues? Check the troubleshooting section or open a GitHub issue.
