#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Space Conquest Game - Deployment Script');
console.log('==========================================\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: package.json not found. Please run this script from the project root.');
  process.exit(1);
}

// Check if Vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'ignore' });
  console.log('✅ Vercel CLI found');
} catch (error) {
  console.log('📦 Installing Vercel CLI...');
  try {
    execSync('npm install -g vercel', { stdio: 'inherit' });
    console.log('✅ Vercel CLI installed');
  } catch (installError) {
    console.error('❌ Failed to install Vercel CLI. Please install manually: npm install -g vercel');
    process.exit(1);
  }
}

// Check if user is logged in to Vercel
try {
  execSync('vercel whoami', { stdio: 'ignore' });
  console.log('✅ Logged in to Vercel');
} catch (error) {
  console.log('🔐 Please log in to Vercel...');
  execSync('vercel login', { stdio: 'inherit' });
}

// Deploy to Vercel
console.log('\n🚀 Deploying to Vercel...');
try {
  const output = execSync('vercel --prod --yes', { encoding: 'utf8' });
  console.log(output);
  
  // Extract the deployment URL
  const urlMatch = output.match(/https:\/\/[^\s]+/);
  if (urlMatch) {
    const deploymentUrl = urlMatch[0];
    console.log(`\n🎉 Deployment successful!`);
    console.log(`🌐 Your game is live at: ${deploymentUrl}`);
    console.log(`\n📋 Next steps:`);
    console.log(`1. Set up your database at: https://console.neon.tech/`);
    console.log(`2. Add environment variables in Vercel dashboard`);
    console.log(`3. Run database migrations`);
    console.log(`4. Start playing! 🎮`);
    
    // Save deployment URL to file
    fs.writeFileSync('.vercel-url', deploymentUrl);
  }
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}

console.log('\n✨ Deployment script completed!');