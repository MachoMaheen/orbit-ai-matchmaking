# 🏗️ Orbit RFM Pro - System Architecture

## 📐 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  Next.js 15 App Router + React 18 + TypeScript                  │
│  ├── Public Pages (Marketing, Landing)                          │
│  ├── Protected Pages (Dashboard, Results, Profile)              │
│  ├── AI Tools (Essay Analyzer, Interview Prep)                  │
│  └── Real-time Features (Chat, Notifications)                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│  Stack Auth (@stackframe/stack@2.7.30)                          │
│  ├── JWT Token Management (Cookie-based)                        │
│  ├── OAuth Providers (Google, GitHub)                           │
│  ├── Session Management                                         │
│  └── Role-Based Access Control (Student, Counselor, Admin)      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      API LAYER (Next.js)                         │
├─────────────────────────────────────────────────────────────────┤
│  REST API Routes (/api/*)                                        │
│  ├── /api/match          → University Matching                  │
│  ├── /api/universities   → University Data                      │
│  ├── /api/scholarships   → Scholarship Matching                 │
│  ├── /api/ai/*          → AI Services                           │
│  │   ├── /analyze-essay                                         │
│  │   ├── /interview-prep                                        │
│  │   └── /chat                                                  │
│  └── /api/user/*        → User Profile & Preferences            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│  Core Algorithms (lib/algorithms/)                              │
│  ├── Matching Algorithm (5D Scoring)                            │
│  │   ├── Academic Fit (GPA, Test Scores)                        │
│  │   ├── Financial Fit (Budget, Scholarships)                   │
│  │   ├── Career Fit (ROI, Employment)                           │
│  │   ├── Cultural Fit (Location, Campus)                        │
│  │   └── Success Probability (ML Model)                         │
│  ├── ROI Calculator (40-year projections)                       │
│  ├── Success Predictor (ML-based)                               │
│  ├── Scholarship Matcher (AI-powered)                           │
│  └── Gap Analyzer (Improvement roadmap)                         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      AI SERVICES LAYER                           │
├─────────────────────────────────────────────────────────────────┤
│  Google Gemini AI Integration                                   │
│  ├── Essay Analysis (Clarity, Uniqueness, Impact)               │
│  ├── Interview Question Generation                              │
│  ├── Conversational Advisor (Match Q&A)                         │
│  └── Profile Text Enhancement                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      DATA ACCESS LAYER                           │
├─────────────────────────────────────────────────────────────────┤
│  Prisma ORM                                                      │
│  ├── Type-safe Database Queries                                 │
│  ├── Migrations & Schema Management                             │
│  ├── Connection Pooling                                         │
│  └── Query Optimization                                         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL (Neon - Serverless)                                 │
│  ├── Users & Authentication                                     │
│  ├── Universities (15+ with full data)                          │
│  ├── Scholarships (10,000+ records)                             │
│  ├── User Profiles & Preferences                                │
│  ├── Match History & Results                                    │
│  ├── Essays & Interview Sessions                                │
│  └── Analytics & Peer Data                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 User Flow Architecture

### **1. ONBOARDING FLOW** (First-Time Users)

```
Landing Page
    ↓
Sign Up (Stack Auth)
    ↓
Welcome Screen
    ↓
Profile Setup Wizard (Multi-Step)
    ├── Step 1: Basic Info (Name, Email)
    ├── Step 2: Academic Profile (GPA, Test Scores)
    ├── Step 3: Work Experience (Months, Industry)
    ├── Step 4: Preferences (Program, Budget, Location)
    └── Step 5: Holistic Factors (Leadership, Activities)
    ↓
Profile Strength Score (0-100%)
    ↓
Dashboard (Personalized)
```

### **2. MATCHING FLOW** (Core Feature)

```
Dashboard
    ↓
"Find Matches" Button
    ↓
Review/Edit Profile
    ↓
AI Processing (Loading Animation)
    ├── Analyzing 15 universities
    ├── Calculating fit scores
    ├── Predicting success rates
    └── Matching scholarships
    ↓
Results Page (Interactive)
    ├── Overview Cards
    │   ├── Total Matches (7 schools)
    │   ├── Avg Admission Chance (68%)
    │   ├── Best ROI School (Stanford)
    │   └── Total Scholarship Potential ($150K)
    ├── Filter Tabs
    │   ├── All Matches
    │   ├── Safety (3)
    │   ├── Target (2)
    │   └── Reach (2)
    ├── University Cards (Expandable)
    │   ├── Fit Scores (Academic, Financial, Career, Cultural)
    │   ├── Admission Probability
    │   ├── ROI Calculator (Interactive)
    │   ├── Matched Scholarships
    │   └── Gap Analysis
    └── Actions
        ├── Save to Favorites
        ├── Compare (Select 2-3)
        ├── Export PDF
        └── Share with Family
```

### **3. AI TOOLS FLOW**

#### **Essay Analyzer**
```
Dashboard → AI Tools → Essay Analyzer
    ↓
Paste Essay (Min 50 chars)
    ↓
AI Analysis (8-10 seconds)
    ↓
Results Dashboard
    ├── Scores (Clarity, Uniqueness, Impact, Overall)
    ├── Strengths (Green highlights)
    ├── Weaknesses (Orange highlights)
    ├── Improvements (Actionable suggestions)
    ├── Clichés to Avoid (Red badges)
    └── Actions
        ├── Download Report
        ├── Rewrite with AI
        └── Analyze Another
```

#### **Interview Prep**
```
Dashboard → AI Tools → Interview Prep
    ↓
Select University + Program
    ↓
AI Generation (5-8 seconds)
    ↓
Question Bank (10 questions)
    ├── Question Card (Expandable)
    │   ├── Category Badge (Behavioral/Technical)
    │   ├── Question Text
    │   ├── Approach Tips
    │   └── Sample Answer
    └── Actions
        ├── Practice Mode (Record answers)
        ├── Download PDF
        └── Generate More
```

### **4. COMPARISON FLOW**

```
Results Page → Select 2-3 Universities → Compare
    ↓
Side-by-Side Comparison Table
    ├── Academic Metrics
    ├── Financial Breakdown
    ├── Career Outcomes
    ├── Campus Life
    └── Your Fit Scores
    ↓
Interactive ROI Chart (40-year projection)
    ↓
Decision Helper
    ├── Pros/Cons for each
    ├── AI Recommendation
    └── Export Comparison
```

### **5. PROFILE MANAGEMENT FLOW**

```
Dashboard → Profile
    ↓
Profile Overview
    ├── Completion Score (85%)
    ├── Strength Indicators
    └── Missing Fields Alert
    ↓
Edit Sections
    ├── Academic Info
    ├── Work Experience
    ├── Preferences
    ├── Holistic Factors
    └── Documents (Essays, Resume)
    ↓
Save & Re-Match
```

---

## 🎨 UX Improvements

### **Navigation Structure**

```
┌─────────────────────────────────────────────────────────────┐
│  Logo    Home  Dashboard  AI Tools▼  Profile  [UserButton]  │
└─────────────────────────────────────────────────────────────┘
                      ↓
              AI Tools Dropdown:
              ├── Essay Analyzer
              ├── Interview Prep
              └── Match Advisor (Chat)
```

### **Dashboard Layout** (After Sign In)

```
┌─────────────────────────────────────────────────────────────┐
│  Welcome back, [Name]! 👋                                    │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Profile      │  │ Matches      │  │ Scholarships │      │
│  │ 85% Complete │  │ 7 Schools    │  │ $150K Found  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
├─────────────────────────────────────────────────────────────┤
│  Quick Actions:                                              │
│  [Find Matches] [Analyze Essay] [Interview Prep]            │
├─────────────────────────────────────────────────────────────┤
│  Recent Activity:                                            │
│  • Matched with 7 universities (2 hours ago)                 │
│  • Analyzed essay "Why MBA?" (Yesterday)                     │
│  • Generated interview questions for Harvard (2 days ago)    │
├─────────────────────────────────────────────────────────────┤
│  Recommended Next Steps:                                     │
│  1. ✓ Complete your profile                                 │
│  2. → Review your matches                                    │
│  3. → Apply for scholarships                                 │
│  4. → Practice interviews                                    │
└─────────────────────────────────────────────────────────────┘
```

### **Results Page Layout** (After Matching)

```
┌─────────────────────────────────────────────────────────────┐
│  Your University Matches                    [Export] [Share] │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ 7 Schools│ │ 68% Avg  │ │ Stanford │ │ $150K    │       │
│  │ Matched  │ │ Admission│ │ Best ROI │ │ Potential│       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
├─────────────────────────────────────────────────────────────┤
│  [All] [Safety: 3] [Target: 2] [Reach: 2] [Scholarships]   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 🎓 Harvard Business School          SAFETY  89%     │    │
│  │ Boston, MA • MBA • $110K/year                       │    │
│  │                                                      │    │
│  │ Fit Scores: Academic 90 | Financial 85 | Career 92  │    │
│  │                                                      │    │
│  │ [View Details] [Compare] [Save] [Apply]             │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 🎓 Stanford GSB                     TARGET  68%     │    │
│  │ ...                                                  │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### **Matching Algorithm Flow**

```
User Input
    ↓
Validation & Normalization
    ↓
Parallel Processing:
    ├── Academic Fit Calculation
    ├── Financial Fit Calculation
    ├── Career Fit Calculation
    ├── Cultural Fit Calculation
    └── Success Probability (ML)
    ↓
Aggregate Scores
    ↓
Category Assignment (Safety/Target/Reach)
    ↓
Scholarship Matching (Parallel)
    ↓
ROI Calculation (Parallel)
    ↓
Gap Analysis (Parallel)
    ↓
Sort & Rank Results
    ↓
Cache Results (Session Storage)
    ↓
Return to Client
```

### **AI Services Flow**

```
User Request
    ↓
Rate Limiting Check
    ↓
Input Validation
    ↓
Gemini API Call
    ├── Retry Logic (3 attempts)
    ├── Timeout (30 seconds)
    └── Error Handling
    ↓
Response Parsing (JSON extraction)
    ↓
Data Transformation
    ↓
Cache Response (Optional)
    ↓
Return to Client
```

---

## 📊 Database Schema (Optimized)

### **Core Tables**

1. **users** - Authentication & basic info
2. **user_profiles** - Academic & professional data
3. **universities** - University master data
4. **scholarships** - Scholarship opportunities
5. **match_searches** - User search history
6. **essays** - Essay submissions & analysis
7. **interview_sessions** - Interview practice data
8. **notifications** - User notifications
9. **peer_data** - Benchmarking data

### **Indexes for Performance**

```sql
-- Fast university lookups
CREATE INDEX idx_universities_program ON universities(programType);
CREATE INDEX idx_universities_ranking ON universities(overallRanking);

-- Fast scholarship matching
CREATE INDEX idx_scholarships_gpa ON scholarships(minGpa);
CREATE INDEX idx_scholarships_deadline ON scholarships(deadline);

-- Fast user queries
CREATE INDEX idx_user_profiles_user_id ON user_profiles(userId);
CREATE INDEX idx_match_searches_user_id ON match_searches(userId);
```

---

## 🚀 Performance Optimizations

### **Frontend**
- ✅ Code splitting (Next.js automatic)
- ✅ Image optimization (next/image)
- ✅ Lazy loading (React.lazy)
- ✅ Memoization (useMemo, useCallback)
- ✅ Virtual scrolling (for long lists)

### **Backend**
- ✅ Database connection pooling
- ✅ Query optimization (Prisma)
- ✅ Caching (Session storage)
- ✅ Parallel processing (Promise.all)
- ✅ Rate limiting (AI APIs)

### **Deployment**
- ✅ Vercel Edge Network (CDN)
- ✅ Serverless functions (Auto-scaling)
- ✅ Database connection pooling (Neon)
- ✅ Environment-based configs

---

## 🔒 Security Architecture

### **Authentication**
- ✅ JWT tokens (HTTP-only cookies)
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ Session management

### **Data Protection**
- ✅ Input validation (Zod)
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection (React)
- ✅ HTTPS only

### **API Security**
- ✅ API key rotation
- ✅ Request signing
- ✅ Rate limiting
- ✅ Error masking

---

## 📈 Scalability Plan

### **Current (MVP)**
- 100 concurrent users
- 15 universities
- 1,000 scholarships

### **Phase 2 (Growth)**
- 1,000 concurrent users
- 50 universities
- 10,000 scholarships
- Redis caching layer

### **Phase 3 (Scale)**
- 10,000+ concurrent users
- 500+ universities
- 100,000+ scholarships
- Microservices architecture
- Dedicated AI service
- Real-time collaboration

---

## 🎯 Success Metrics

### **User Engagement**
- Profile completion rate: >80%
- Match generation rate: >90%
- Return user rate: >60%
- Time to first match: <5 minutes

### **Technical Performance**
- Page load time: <2 seconds
- API response time: <500ms
- Match generation: <10 seconds
- AI analysis: <15 seconds

### **Business Metrics**
- User satisfaction: >4.5/5
- Feature adoption: >70%
- Conversion rate: >40%
- Retention rate: >50%

---

**This architecture is production-ready, scalable, and optimized for the best user experience! 🚀**
