import { PrismaClient, ResearchCategory } from '@prisma/client';
import { UniverseGenerator } from '../src/lib/universe-generator';

const prisma = new PrismaClient();

async function seedResearchTechs() {
  const researchTechs = [
    // WEAPONS Category
    {
      name: 'Basic Weaponry',
      category: ResearchCategory.WEAPONS,
      level: 1,
      description: 'Improves basic weapon systems by 10%',
      prerequisiteIds: [],
      ironCost: 100,
      siliconCost: 50,
      copperCost: 25,
      researchTime: 2,
      effects: JSON.stringify({ shipAttack: 10 })
    },
    {
      name: 'Advanced Weaponry',
      category: ResearchCategory.WEAPONS,
      level: 2,
      description: 'Improves weapon systems by 25%',
      prerequisiteIds: ['basic-weaponry'],
      ironCost: 300,
      siliconCost: 150,
      titanCost: 50,
      copperCost: 75,
      researchTime: 6,
      effects: JSON.stringify({ shipAttack: 25 })
    },
    {
      name: 'Plasma Weapons',
      category: ResearchCategory.WEAPONS,
      level: 3,
      description: 'Unlocks plasma weapon technology, +50% weapon damage',
      prerequisiteIds: ['advanced-weaponry'],
      ironCost: 800,
      siliconCost: 400,
      titanCost: 200,
      uraniumCost: 100,
      copperCost: 150,
      researchTime: 16,
      effects: JSON.stringify({ shipAttack: 50, unlockShipType: 'PLASMA_CRUISER' })
    },

    // DRIVES Category
    {
      name: 'Improved Engines',
      category: ResearchCategory.DRIVES,
      level: 1,
      description: 'Increases ship speed by 15%',
      prerequisiteIds: [],
      ironCost: 75,
      siliconCost: 100,
      carbonCost: 50,
      researchTime: 2,
      effects: JSON.stringify({ shipSpeed: 15 })
    },
    {
      name: 'Fusion Drives',
      category: ResearchCategory.DRIVES,
      level: 2,
      description: 'Advanced fusion propulsion, +30% speed',
      prerequisiteIds: ['improved-engines'],
      ironCost: 250,
      siliconCost: 300,
      carbonCost: 150,
      uraniumCost: 25,
      researchTime: 8,
      effects: JSON.stringify({ shipSpeed: 30 })
    },
    {
      name: 'Quantum Drives',
      category: ResearchCategory.DRIVES,
      level: 3,
      description: 'Quantum propulsion technology, +75% speed',
      prerequisiteIds: ['fusion-drives'],
      ironCost: 600,
      siliconCost: 800,
      carbonCost: 400,
      uraniumCost: 200,
      goldCost: 50,
      researchTime: 20,
      effects: JSON.stringify({ shipSpeed: 75, unlockShipType: 'QUANTUM_SCOUT' })
    },

    // DEFENSE Category
    {
      name: 'Reinforced Hulls',
      category: ResearchCategory.DEFENSE,
      level: 1,
      description: 'Improves ship defense by 20%',
      prerequisiteIds: [],
      ironCost: 150,
      titanCost: 25,
      researchTime: 3,
      effects: JSON.stringify({ shipDefense: 20 })
    },
    {
      name: 'Energy Shields',
      category: ResearchCategory.DEFENSE,
      level: 2,
      description: 'Advanced shielding technology, +40% defense',
      prerequisiteIds: ['reinforced-hulls'],
      ironCost: 400,
      siliconCost: 200,
      titanCost: 100,
      uraniumCost: 50,
      researchTime: 10,
      effects: JSON.stringify({ shipDefense: 40 })
    },

    // SPECIAL_TECH Category
    {
      name: 'Cargo Optimization',
      category: ResearchCategory.SPECIAL_TECH,
      level: 1,
      description: 'Increases ship cargo capacity by 25%',
      prerequisiteIds: [],
      siliconCost: 100,
      carbonCost: 75,
      researchTime: 4,
      effects: JSON.stringify({ cargoCapacity: 25 })
    },
    {
      name: 'Advanced Mining',
      category: ResearchCategory.SPECIAL_TECH,
      level: 1,
      description: 'Improves resource extraction by 30%',
      prerequisiteIds: [],
      ironCost: 200,
      siliconCost: 150,
      copperCost: 100,
      researchTime: 6,
      effects: JSON.stringify({ miningEfficiency: 30 })
    },
    {
      name: 'Automation Systems',
      category: ResearchCategory.SPECIAL_TECH,
      level: 2,
      description: 'Reduces build times by 20%',
      prerequisiteIds: ['advanced-mining'],
      siliconCost: 400,
      carbonCost: 200,
      copperCost: 150,
      goldCost: 25,
      researchTime: 12,
      effects: JSON.stringify({ buildSpeedBonus: 20 })
    },

    // ECONOMICS Category
    {
      name: 'Trade Networks',
      category: ResearchCategory.ECONOMICS,
      level: 1,
      description: 'Improves trade efficiency and reduces costs by 15%',
      prerequisiteIds: [],
      siliconCost: 75,
      carbonCost: 50,
      goldCost: 10,
      researchTime: 3,
      effects: JSON.stringify({ tradeBonus: 15 })
    },
    {
      name: 'Economic Planning',
      category: ResearchCategory.ECONOMICS,
      level: 2,
      description: 'Increases cash generation by 25%',
      prerequisiteIds: ['trade-networks'],
      siliconCost: 200,
      carbonCost: 150,
      goldCost: 50,
      researchTime: 8,
      effects: JSON.stringify({ cashGeneration: 25 })
    }
  ];

  for (const tech of researchTechs) {
    await prisma.researchTech.upsert({
      where: { name: tech.name },
      update: tech,
      create: tech,
    });
  }

  console.log('Seeded research technologies');
}

async function main() {
  console.log('Starting database seed...');

  // Seed research technologies
  await seedResearchTechs();

  // Generate universe
  const universeGenerator = new UniverseGenerator({
    universeSize: parseInt(process.env.UNIVERSE_SIZE || '1000'),
    maxPlanets: parseInt(process.env.MAX_PLANETS || '500'),
    pirateBasePercentage: parseInt(process.env.PIRATE_BASE_PERCENTAGE || '5'),
  });

  await universeGenerator.generateUniverse();

  // Display stats
  const stats = await universeGenerator.getPlanetStats();
  console.log('Universe generation complete:');
  console.log(`- Total planets: ${stats.totalPlanets}`);
  console.log(`- Pirate bases: ${stats.pirateBases}`);
  console.log('- Planet types:', stats.planetTypes);

  console.log('Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });