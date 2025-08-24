import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const [
      totalPlanets,
      totalPlayers,
      totalAlliances,
      pirateBases,
      colonizedPlanets,
      activeFleets,
      planetTypes
    ] = await Promise.all([
      prisma.planet.count(),
      prisma.player.count(),
      prisma.alliance.count(),
      prisma.planet.count({ where: { isPirateBase: true } }),
      prisma.planet.count({
        where: {
          colonies: {
            some: {}
          }
        }
      }),
      prisma.fleet.count(),
      prisma.planet.groupBy({
        by: ['type'],
        _count: true,
      })
    ]);

    const planetTypeStats: Record<string, number> = {};
    planetTypes.forEach(group => {
      planetTypeStats[group.type] = group._count;
    });

    return NextResponse.json({
      universe: {
        totalPlanets,
        pirateBases,
        colonizedPlanets,
        planetTypes: planetTypeStats,
      },
      players: {
        totalPlayers,
        totalAlliances,
        activeFleets,
      }
    });
  } catch (error) {
    console.error('Get universe stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}