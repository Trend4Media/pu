import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const player = await prisma.player.findUnique({
      where: { userId },
      include: {
        colonies: {
          include: {
            planet: true,
          }
        },
        fleets: {
          include: {
            ships: true,
            planet: true,
          }
        },
        allianceMember: {
          include: {
            alliance: true,
          }
        },
        research: {
          include: {
            tech: true,
          }
        }
      }
    });

    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    // Update last active timestamp
    await prisma.player.update({
      where: { id: player.id },
      data: { lastActive: new Date() }
    });

    return NextResponse.json({
      player: {
        id: player.id,
        name: player.name,
        race: player.race,
        level: player.level,
        experience: player.experience,
        cash: player.cash,
        resources: {
          iron: player.iron,
          silicon: player.silicon,
          carbon: player.carbon,
          titan: player.titan,
          uranium: player.uranium,
          water: player.water,
          gold: player.gold,
          copper: player.copper,
        },
        politicalFocus: player.politicalFocus,
        colonies: player.colonies,
        fleets: player.fleets,
        alliance: player.allianceMember?.alliance,
        research: player.research,
        lastActive: player.lastActive,
      }
    });
  } catch (error) {
    console.error('Get player error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}