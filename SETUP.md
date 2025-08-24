# Space Conquest Game - Setup Guide

This guide will walk you through setting up the Space Conquest game on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **PostgreSQL** (version 14 or higher)
- **npm** or **yarn** package manager
- **Git** (for cloning the repository)

## Step-by-Step Setup

### 1. Database Setup

First, create a PostgreSQL database for the game:

```bash
# Connect to PostgreSQL as superuser
sudo -u postgres psql

# Create database and user
CREATE DATABASE space_conquest_game;
CREATE USER game_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE space_conquest_game TO game_user;

# Exit PostgreSQL
\q
```

### 2. Project Setup

```bash
# Clone the repository (replace with actual repo URL)
git clone <repository-url>
cd space-conquest-game

# Install dependencies
npm install
```

### 3. Environment Configuration

```bash
# Copy the environment template
cp .env.example .env
```

Edit the `.env` file with your settings:

```env
# Database Configuration
DATABASE_URL="postgresql://game_user:your_secure_password@localhost:5432/space_conquest_game"

# JWT Secret (generate a secure random string)
JWT_SECRET="your-super-secure-jwt-secret-key-minimum-32-characters"

# Next.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="another-secure-secret-for-nextauth"

# Game Configuration
UNIVERSE_SIZE=1000
MAX_PLANETS=500
PIRATE_BASE_PERCENTAGE=5
```

### 4. Database Initialization

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations to create tables
npm run db:migrate

# Seed the database with initial data (planets, research tech, etc.)
npm run db:seed
```

### 5. Start the Development Server

```bash
# Start the development server
npm run dev
```

The game will be available at `http://localhost:3000`

## Verification Steps

### 1. Check Database Connection
```bash
# Open Prisma Studio to verify database setup
npm run db:studio
```

This opens a web interface at `http://localhost:5555` where you can view your database tables.

### 2. Test the Application
1. Open `http://localhost:3000` in your browser
2. Click "Start Playing" to create an account
3. Register with an email and username
4. Create a character by selecting a race
5. Verify you can access the game dashboard

### 3. Verify Universe Generation
- Navigate to the "Universe" section
- You should see a list of procedurally generated planets
- Check that different planet types and resources are displayed

## Common Issues and Solutions

### Database Connection Issues

**Error**: `Error: P1001: Can't reach database server`

**Solution**: 
- Verify PostgreSQL is running: `sudo systemctl status postgresql`
- Check your DATABASE_URL in `.env`
- Ensure the database and user exist

### Migration Issues

**Error**: `Migration failed`

**Solution**:
```bash
# Reset the database (WARNING: This deletes all data)
npm run db:migrate reset

# Or manually drop and recreate the database
dropdb space_conquest_game
createdb space_conquest_game
npm run db:migrate
npm run db:seed
```

### Seed Script Issues

**Error**: Seed script fails to run

**Solution**:
```bash
# Check if the database tables exist
npm run db:studio

# If tables are missing, run migrations first
npm run db:migrate

# Then run seed again
npm run db:seed
```

### Port Already in Use

**Error**: `Port 3000 is already in use`

**Solution**:
```bash
# Kill process using port 3000
sudo lsof -t -i:3000 | xargs kill -9

# Or start on a different port
npm run dev -- -p 3001
```

## Production Deployment

For production deployment, additional steps are required:

### 1. Build the Application
```bash
npm run build
```

### 2. Set Production Environment Variables
```env
NODE_ENV=production
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
NEXTAUTH_URL="https://yourdomain.com"
```

### 3. Database Migration in Production
```bash
# Run migrations in production
npm run db:migrate deploy

# Seed production database (optional)
npm run db:seed
```

### 4. Start Production Server
```bash
npm run start
```

## Development Tools

### Database Management
```bash
# Open Prisma Studio
npm run db:studio

# Reset database (development only)
npm run db:migrate reset

# Generate new migration
npx prisma migrate dev --name your_migration_name
```

### Code Quality
```bash
# Run linting
npm run lint

# Format code (if prettier is configured)
npm run format
```

## Next Steps

After successful setup:

1. **Create your first character** - Choose a race and start exploring
2. **Explore the universe** - Browse planets and their resources
3. **Plan your strategy** - Decide on colonization and research priorities
4. **Join the community** - Look for other players and alliances

## Getting Help

If you encounter issues:

1. Check this setup guide first
2. Look at the main README.md for additional information
3. Check the console for error messages
4. Open an issue on GitHub with:
   - Your operating system
   - Node.js version (`node --version`)
   - PostgreSQL version
   - Complete error message
   - Steps to reproduce the issue

## Security Notes

- Never commit your `.env` file to version control
- Use strong, unique passwords for your database
- Generate secure JWT secrets (at least 32 characters)
- In production, use environment variables instead of `.env` files
- Keep your dependencies updated

---

**Happy gaming! May your empire span the galaxy!** 🌌