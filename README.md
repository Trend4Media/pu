# Space Conquest - Browser Game

A comprehensive text-based space conquest browser game built with modern web technologies. Command your fleet, explore the galaxy, build alliances, and conquer the universe!

## Features

### 🌌 Core Game Systems
- **Procedural Universe Generation**: Hundreds of unique planets with varying resources and characteristics
- **Race System**: 5 unique races with distinct bonuses and special technologies
- **Resource Management**: 8 different resources (Iron, Silicon, Carbon, Titan, Uranium, Water, Gold, Copper)
- **Fleet Management**: Build and command various ship types with different capabilities
- **Research Tree**: Advance through technology trees for weapons, drives, and special tech
- **Colony System**: Establish colonies and manage planetary resources
- **Alliance System**: Form alliances and meta-alliances for galactic domination
- **Trading System**: Dynamic resource trading with other players
- **Political System**: Choose focus areas that affect your empire's development

### 🚀 Race Characteristics

#### Humans
- **Bonuses**: +15% Research Speed, +10% Cargo Capacity, +5% Ship Speed
- **Special Tech**: Diplomacy, Trade Networks
- **Best for**: New players, balanced gameplay

#### Zephyrians
- **Bonuses**: +20% Weapon Damage, +15% Ship Speed
- **Special Tech**: Plasma Weapons, Stealth Technology
- **Best for**: Aggressive military players

#### Crystalline
- **Bonuses**: +25% Research Speed, +5% Cargo Capacity
- **Special Tech**: Crystal Technology, Energy Shields
- **Best for**: Research-focused players

#### Mechanoids
- **Bonuses**: +15% Weapon Damage, +15% Cargo Capacity, +10% Research Speed
- **Special Tech**: Automation, Repair Bots
- **Best for**: Industrial players

#### Void Born
- **Bonuses**: +25% Weapon Damage, +20% Ship Speed
- **Special Tech**: Void Manipulation, Dark Energy
- **Best for**: Advanced aggressive players

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with HTTP-only cookies
- **UI Components**: Lucide React icons, custom space-themed components

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn package manager

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd space-conquest-game
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
```bash
# Create PostgreSQL database
createdb space_conquest_game

# Copy environment variables
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL="postgresql://username:password@localhost:5432/space_conquest_game"
# JWT_SECRET="your-super-secure-jwt-secret-key-here"
```

### 4. Initialize Database
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed the database with initial data
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to access the game!

## Game Mechanics

### Resources
- **Iron**: Basic construction material
- **Silicon**: Electronics and computer systems
- **Carbon**: Life support and organic systems
- **Titan**: Advanced alloys and armor
- **Uranium**: Energy generation and weapons
- **Water**: Life support and fuel
- **Gold**: Advanced electronics and trade
- **Copper**: Basic electronics and wiring

### Ship Types
- **Fighter**: Fast, light attack ships
- **Corvette**: Balanced small ships
- **Frigate**: Medium combat vessels
- **Destroyer**: Heavy combat ships
- **Cruiser**: Large multi-role ships
- **Battleship**: Massive combat platforms
- **Dreadnought**: Ultimate warships
- **Carrier**: Fleet support and fighter deployment
- **Transport**: Cargo and troop transport
- **Mining Vessel**: Resource extraction ships

### Political Focuses
- **Balanced**: No bonuses or penalties
- **Fleet Build**: +25% ship build speed, -10% research speed
- **Ground Troops**: +30% troop training, -15% ship build speed
- **Resource Mining**: +35% resource production, -10% ship build, -5% research
- **Research**: +40% research speed, -15% resource production, -10% ship build

## Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:migrate   # Run database migrations
npm run db:generate  # Generate Prisma client
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database with initial data

# Code Quality
npm run lint         # Run ESLint
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── game/              # Game pages
│   ├── globals.css        # Global styles
│   └── page.tsx           # Landing page
├── components/            # React components
├── lib/                   # Utility libraries
│   ├── auth.ts           # Authentication utilities
│   ├── database.ts       # Database connection
│   └── universe-generator.ts # Universe generation
├── types/                 # TypeScript type definitions
└── middleware.ts          # Next.js middleware

prisma/
├── schema.prisma         # Database schema
└── seed.ts              # Database seeding script
```

## Game Features Status

### ✅ Completed
- [x] User authentication and registration
- [x] Race selection system with bonuses
- [x] Procedural universe generation
- [x] Planet exploration and viewing
- [x] Resource management display
- [x] Basic game dashboard
- [x] Responsive UI design

### 🚧 In Development
- [ ] Colony management system
- [ ] Fleet building and management
- [ ] Research tree implementation
- [ ] Alliance system
- [ ] Trading system
- [ ] Combat system
- [ ] Admin tools

### 📋 Planned Features
- [ ] Real-time notifications
- [ ] Battle reports
- [ ] Leaderboards
- [ ] Event system
- [ ] Mobile app
- [ ] API documentation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions, issues, or feature requests, please open an issue on GitHub or contact the development team.

---

**Ready to conquer the galaxy? Start your journey today!** 🚀