#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🗄️  Space Conquest Game - Database Setup');
console.log('========================================\n');

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function setupDatabase() {
  console.log('This script will help you set up your production database.\n');
  
  // Get database URL
  const databaseUrl = await askQuestion('📝 Enter your Neon PostgreSQL connection string: ');
  
  if (!databaseUrl || !databaseUrl.startsWith('postgresql://')) {
    console.error('❌ Invalid database URL. Please provide a valid PostgreSQL connection string.');
    process.exit(1);
  }
  
  // Create .env file for local database operations
  const envContent = `DATABASE_URL="${databaseUrl}"\nJWT_SECRET="production-jwt-secret-${Math.random().toString(36).substring(2)}"\n`;
  fs.writeFileSync('.env', envContent);
  console.log('✅ Created .env file');
  
  try {
    // Generate Prisma client
    console.log('\n📦 Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    // Deploy migrations
    console.log('\n🔄 Deploying database migrations...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    
    // Seed database
    console.log('\n🌱 Seeding database with initial data...');
    execSync('npx prisma db seed', { stdio: 'inherit' });
    
    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📋 What was created:');
    console.log('• 5 unique races with bonuses');
    console.log('• 500+ procedurally generated planets');
    console.log('• Complete technology trees');
    console.log('• Ship types and modules');
    console.log('• Resource systems');
    
    console.log('\n🚀 Your game is ready to play!');
    
  } catch (error) {
    console.error('\n❌ Database setup failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your database connection string');
    console.log('2. Ensure your database is accessible');
    console.log('3. Try running commands manually:');
    console.log('   npx prisma migrate deploy');
    console.log('   npx prisma db seed');
    process.exit(1);
  }
  
  rl.close();
}

setupDatabase();