# 🚀 Space Conquest Game - Live Deployment Guide

## 🌐 Play the Game Online

**Live URL:** `https://project-universe-[your-deployment].vercel.app`

## 🔧 Deployment Setup (For Developers)

### 1. **Database Setup (Neon PostgreSQL)**

1. Go to [Neon Console](https://console.neon.tech/)
2. Create a free account
3. Create a new project: "ProjectUniverse"
4. Copy the connection string from the dashboard
5. It will look like: `postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require`

### 2. **Vercel Deployment**

#### Option A: Deploy via GitHub (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import from GitHub: `Trend4Media/ProjectUniverse`
4. Configure environment variables:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string
   - `JWT_SECRET`: Generate a random 32+ character string
5. Click "Deploy"

#### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL
vercel env add JWT_SECRET

# Redeploy with environment variables
vercel --prod
```

### 3. **Database Migration**

After deployment, run database migrations:

```bash
# Install dependencies locally
npm install

# Set your production DATABASE_URL in .env
echo "DATABASE_URL=your-neon-connection-string" > .env

# Run migrations
npx prisma migrate deploy

# Seed the database with initial data
npx prisma db seed
```

### 4. **Environment Variables**

Set these in your Vercel dashboard under Project Settings → Environment Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://...` | Neon PostgreSQL connection string |
| `JWT_SECRET` | Random 32+ chars | JWT token signing secret |
| `NODE_ENV` | `production` | Environment mode |

## 🎮 Game Features Available Online

### ✅ **Fully Functional:**
- **User Registration & Login**
- **Character Creation (5 Races)**
- **Universe Exploration (500+ Planets)**
- **Resource Management**
- **Game Dashboard**
- **Planet Search & Filtering**
- **Responsive Mobile UI**

### 🚧 **Ready for Extension:**
- Colony Management
- Fleet Building
- Research Trees
- Alliance System
- Trading System
- Combat System

## 🔒 **Security Notes**

- All passwords are hashed with bcrypt
- JWT tokens are HTTP-only cookies
- Database connections use SSL
- Environment variables are encrypted
- CORS is properly configured

## 🚀 **Performance**

- **Server-Side Rendering** with Next.js
- **Static Assets** cached by Vercel CDN
- **Database Connection Pooling** via Prisma
- **Optimized Images** and lazy loading
- **Mobile-First** responsive design

## 📊 **Monitoring**

Monitor your deployment:
- **Vercel Analytics:** Built-in performance metrics
- **Database Metrics:** Available in Neon dashboard
- **Error Tracking:** Check Vercel function logs

## 🆘 **Troubleshooting**

### Common Issues:

**1. Database Connection Error:**
```
Error: P1001: Can't reach database server
```
**Solution:** Check DATABASE_URL format and network connectivity

**2. JWT Secret Missing:**
```
Error: JWT_SECRET environment variable is required
```
**Solution:** Add JWT_SECRET to Vercel environment variables

**3. Migration Failed:**
```
Error: Migration failed to apply cleanly
```
**Solution:** Reset database and run migrations again

### **Support Commands:**

```bash
# Check database connection
npx prisma db pull

# View database in browser
npx prisma studio

# Reset database (CAUTION: Deletes all data)
npx prisma migrate reset

# Generate Prisma client
npx prisma generate
```

## 🌟 **Next Steps**

After successful deployment:

1. **Test all game features** in production
2. **Set up monitoring** for performance tracking
3. **Configure custom domain** (optional)
4. **Implement additional game features**
5. **Set up CI/CD pipeline** for automatic deployments

## 📞 **Support**

For deployment issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review [Neon Documentation](https://neon.tech/docs)
- Check project GitHub issues

---

**🎮 Ready to conquer the universe online!** 🌌